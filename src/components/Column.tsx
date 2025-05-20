import React from 'react';
import { Task } from '../App';
import { TaskItem } from './Task';

// Пропсы для компонента колонки
type ColumnProps = {
  title: string;  // Заголовок колонки
  tasks: Task[];  // Список задач в колонке
  onMoveTask: (taskId: number, newStatus: Task['status']) => void;  // Функция перемещения
  onDeleteTask: (taskId: number) => void;  // Функция удаления
  prevStatus?: Task['status'];  // Предыдущий статус (для кнопки "назад")
  nextStatus?: Task['status'];  // Следующий статус (для кнопки "вперёд")
};

// Компонент колонки
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
      {/* Отображаем все задачи в колонке */}
      {tasks.map(task => (
        <TaskItem
          key={task.id}  // Уникальный ключ для React
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