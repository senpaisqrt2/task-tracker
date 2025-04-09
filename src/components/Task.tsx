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
  return (
    <div className="task">
      <p>{task.text}</p>
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