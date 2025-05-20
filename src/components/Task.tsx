import React from 'react';
import { Task } from '../App';

// Пропсы для компонента задачи
type TaskProps = {
  task: Task;  // Объект задачи
  onMoveTask: (taskId: number, newStatus: Task['status']) => void;  // Функция перемещения
  onDeleteTask: (taskId: number) => void;  // Функция удаления
  prevStatus?: Task['status'];  // Предыдущий статус
  nextStatus?: Task['status'];  // Следующий статус
};

// Компонент отдельной задачи
export const TaskItem: React.FC<TaskProps> = ({ 
  task, 
  onMoveTask, 
  onDeleteTask,
  prevStatus,
  nextStatus
}) => {
  return (
    <div className="task">
      {/* Текст задачи */}
      <p>{task.text}</p>
      
      {/* Контейнер для кнопок действий */}
      <div className="task-actions">
        {/* Кнопка "назад" (отображается если есть prevStatus) */}
        {prevStatus && (
          <button onClick={() => onMoveTask(task.id, prevStatus)}>← Назад</button>
        )}
        
        {/* Кнопка удаления */}
        <button 
          className="delete-btn" 
          onClick={() => onDeleteTask(task.id)}
        >
          ×
        </button>
        
        {/* Кнопка "вперёд" (отображается если есть nextStatus) */}
        {nextStatus && (
          <button onClick={() => onMoveTask(task.id, nextStatus)}>Вперёд →</button>
        )}
      </div>
    </div>
  );
};