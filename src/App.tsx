import React, { useState } from 'react';
import './App.css';
import { Column } from './components/Column';
import { AddTaskForm } from './components/AddTaskForm';

// Тип для статуса задачи
export type TaskStatus = 'todo' | 'in-progress' | 'done';

// Тип для задачи
export type Task = {
  id: number;           // Уникальный идентификатор
  text: string;         // Текст задачи
  status: TaskStatus;   // Текущий статус
};

// Основной компонент приложения
function App() {
  // Состояние для списка задач с начальными значениями
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Сделать To-Do лист", status: "todo" },
    { id: 2, text: "Написать бэкенд", status: "in-progress" },
    { id: 3, text: "Задеплоить проект", status: "done" },
  ]);

  // Функция для перемещения задачи между колонками
  const moveTask = (taskId: number, newStatus: TaskStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  // Функция для удаления задачи
  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Функция для добавления новой задачи
  const addTask = (text: string) => {
    const newTask: Task = {
      id: tasks.length + 1,  // Простое создание ID (в реальном приложении нужно что-то более надежное)
      text,
      status: "todo",       // Новые задачи всегда в "todo"
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="app">
      <h1>Трекер задач</h1>
      
      {/* Форма добавления новой задачи */}
      <AddTaskForm onAddTask={addTask} />
      
      {/* Доска с колонками */}
      <div className="board">
        {/* Колонка "To-Do" */}
        <Column 
          title="To-Do" 
          tasks={tasks.filter(t => t.status === "todo")}  // Фильтрация задач по статусу
          onMoveTask={moveTask}
          onDeleteTask={deleteTask}
          nextStatus="in-progress"  // Куда можно переместить задачу дальше
        />
        
        {/* Колонка "In Progress" */}
        <Column 
          title="In Progress" 
          tasks={tasks.filter(t => t.status === "in-progress")} 
          onMoveTask={moveTask}
          onDeleteTask={deleteTask}
          nextStatus="done"        // Можно переместить в "done"
          prevStatus="todo"        // Можно вернуть в "todo"
        />
        
        {/* Колонка "Done" */}
        <Column 
          title="Done" 
          tasks={tasks.filter(t => t.status === "done")} 
          onMoveTask={moveTask}
          onDeleteTask={deleteTask}
          prevStatus="in-progress" // Можно вернуть в "in-progress"
        />
      </div>
    </div>
  );
}

export default App;