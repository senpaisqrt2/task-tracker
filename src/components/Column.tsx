import React from 'react';
import { Task } from '../App';
import { TaskItem } from './Task';

type ColumnProps = {
  title: string;
  tasks: Task[];
  onMoveTask: (taskId: number, newStatus: Task['status']) => void;
  onDeleteTask: (taskId: number) => void;
  prevStatus?: Task['status'];
  nextStatus?: Task['status'];
};

export const Column: React.FC<ColumnProps> = ({ 
  title, 
  tasks, 
  onMoveTask, 
  onDeleteTask,
  prevStatus,
  nextStatus
}) => {
  return (
    <div className="column">
      <h2>{title}</h2>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onMoveTask={onMoveTask}
          onDeleteTask={onDeleteTask}
          prevStatus={prevStatus}
          nextStatus={nextStatus}
        />
      ))}
    </div>
  );
};