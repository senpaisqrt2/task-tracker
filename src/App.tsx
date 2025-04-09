import React, { useState } from 'react';
import './App.css';
import { Column } from './components/Column';
import { AddTaskForm } from './components/AddTaskForm';

export type TaskStatus = 'todo' | 'in-progress' | 'done';

export type Task = {
  id: number;
  text: string;
  status: TaskStatus;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Сделать To-Do лист", status: "todo" },
    { id: 2, text: "Написать бэкенд", status: "in-progress" },
    { id: 3, text: "Задеплоить проект", status: "done" },
  ]);

  const moveTask = (taskId: number, newStatus: TaskStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const addTask = (text: string) => {
    const newTask: Task = {
      id: tasks.length + 1,
      text,
      status: "todo",
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="app">
      <h1>Трекер задач</h1>
      <AddTaskForm onAddTask={addTask} />
      <div className="board">
        <Column 
          title="To-Do" 
          tasks={tasks.filter(t => t.status === "todo")} 
          onMoveTask={moveTask}
          onDeleteTask={deleteTask}
          nextStatus="in-progress"
        />
        <Column 
          title="In Progress" 
          tasks={tasks.filter(t => t.status === "in-progress")} 
          onMoveTask={moveTask}
          onDeleteTask={deleteTask}
          nextStatus="done"
          prevStatus="todo"
        />
        <Column 
          title="Done" 
          tasks={tasks.filter(t => t.status === "done")} 
          onMoveTask={moveTask}
          onDeleteTask={deleteTask}
          prevStatus="in-progress"
        />
      </div>
    </div>
  );
}

export default App;