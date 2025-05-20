import React from 'react';
import { Task } from '../App';

type TaskProps = {
  task: Task;
  onMoveTask: (taskId: number, newStatus: Task['status']) => void;
  onDeleteTask: (taskId: number) => void;
  prevStatus?: Task['status'];
  nextStatus?: Task['status'];
};

export const TaskItem: React.FC<TaskProps> = ({ 
  task, 
  onMoveTask, 
  onDeleteTask,
  prevStatus,
  nextStatus
}) => {
  // Функция для форматирования даты
  const formatDeadline = (date?: Date) => {
    if (!date) return null;
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Функция для определения срочности задачи
  const getTaskUrgencyClass = (deadline?: Date): string => {
    if (!deadline) return '';
    
    const now = new Date();
    const timeDiff = deadline.getTime() - now.getTime();
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
    
    if (daysDiff < 1) return 'task-urgent';
    if (daysDiff < 3) return 'task-due-soon';
    return '';
  };

  return (
    <div className={`task ${getTaskUrgencyClass(task.deadline)}`}>
      <p>{task.text}</p>
      {task.deadline && (
        <p className="deadline">
          ⏰ Дедлайн: {formatDeadline(task.deadline)}
        </p>
      )}
      <div className="task-actions">
        {prevStatus && (
          <button onClick={() => onMoveTask(task.id, prevStatus)}>← Назад</button>
        )}
        <button 
          className="delete-btn" 
          onClick={() => onDeleteTask(task.id)}
        >
          ×
        </button>
        {nextStatus && (
          <button onClick={() => onMoveTask(task.id, nextStatus)}>Вперёд →</button>
        )}
      </div>
    </div>
  );
};