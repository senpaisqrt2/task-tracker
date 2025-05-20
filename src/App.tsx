import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import { Column } from './components/Column';
import { AddTaskForm } from './components/AddTaskForm';
import { ProfilePage } from './components/ProfilePage';
import { OtherBoardsPage } from './components/OtherBoardsPage';

export type TaskStatus = 'todo' | 'in-progress' | 'done';

export type Task = {
  id: number;
  text: string;
  status: TaskStatus;
};

export type Board = {
  id: string;
  name: string;
  tasks: Task[];
};

// Добавляем тип для пользователя
export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  registrationDate: string;
};

function App() {
  const [currentBoardId, setCurrentBoardId] = useState('main');
  const [boards, setBoards] = useState<Record<string, Board>>({
    main: {
      id: 'main',
      name: 'Основная доска',
      tasks: [
        { id: 1, text: "Сделать To-Do лист", status: "todo" },
        { id: 2, text: "Написать бэкенд", status: "in-progress" },
        { id: 3, text: "Задеплоить проект", status: "done" },
      ],
    },
    work: {
      id: 'work',
      name: 'Рабочие задачи',
      tasks: [
        { id: 1, text: "Провести митинг", status: "todo" },
        { id: 2, text: "Написать отчёт", status: "in-progress" },
      ],
    },
  });

  // Добавляем состояние пользователя
  const [user, setUser] = useState<User>({
    id: 'user-1',
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    avatar: '',
    registrationDate: '01.01.2023',
  });

  const currentBoard = boards[currentBoardId];

  const moveTask = (taskId: number, newStatus: TaskStatus) => {
    setBoards({
      ...boards,
      [currentBoardId]: {
        ...currentBoard,
        tasks: currentBoard.tasks.map(task => 
          task.id === taskId ? { ...task, status: newStatus } : task
        ),
      },
    });
  };

  const deleteTask = (taskId: number) => {
    setBoards({
      ...boards,
      [currentBoardId]: {
        ...currentBoard,
        tasks: currentBoard.tasks.filter(task => task.id !== taskId),
      },
    });
  };

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      status: "todo",
    };
    setBoards({
      ...boards,
      [currentBoardId]: {
        ...currentBoard,
        tasks: [...currentBoard.tasks, newTask],
      },
    });
  };

  const createNewBoard = (name: string) => {
    const newBoardId = `board-${Date.now()}`;
    setBoards({
      ...boards,
      [newBoardId]: {
        id: newBoardId,
        name,
        tasks: [],
      },
    });
    return newBoardId;
  };

  return (
    <Router>
      <div className="app">
        <nav className="app-navigation">
          <ul>
            <li><Link to="/">Главная</Link></li>
            <li><Link to="/profile">Профиль</Link></li>
            <li><Link to="/boards">Другие доски</Link></li>
          </ul>
          
          <div className="board-switcher">
            <select 
              value={currentBoardId} 
              onChange={(e) => setCurrentBoardId(e.target.value)}
            >
              {Object.values(boards).map(board => (
                <option key={board.id} value={board.id}>{board.name}</option>
              ))}
            </select>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <>
              <h1>{currentBoard.name}</h1>
              <AddTaskForm onAddTask={addTask} />
              <div className="board">
                <Column 
                  title="To-Do" 
                  tasks={currentBoard.tasks.filter(t => t.status === "todo")} 
                  onMoveTask={moveTask}
                  onDeleteTask={deleteTask}
                  nextStatus="in-progress"
                />
                <Column 
                  title="In Progress" 
                  tasks={currentBoard.tasks.filter(t => t.status === "in-progress")} 
                  onMoveTask={moveTask}
                  onDeleteTask={deleteTask}
                  nextStatus="done"
                  prevStatus="todo"
                />
                <Column 
                  title="Done" 
                  tasks={currentBoard.tasks.filter(t => t.status === "done")} 
                  onMoveTask={moveTask}
                  onDeleteTask={deleteTask}
                  prevStatus="in-progress"
                />
              </div>
            </>
          } />
          
          {/* Передаем пользователя и функцию обновления в ProfilePage */}
          <Route 
            path="/profile" 
            element={
              <ProfilePage 
                user={user} 
                onUpdateUser={setUser} 
              />
            } 
          />
          
          <Route path="/boards" element={
            <OtherBoardsPage 
              boards={boards} 
              onCreateBoard={createNewBoard}
              onSelectBoard={setCurrentBoardId}
            />
          } />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;