import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Task, TaskStatus } from '../App';

type CalendarPageProps = {
  tasks: Task[];
};

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const CalendarPage: React.FC<CalendarPageProps> = ({ tasks }) => {
  const [date, setDate] = useState<Value>(new Date());
  const [statusFilter, setStatusFilter] = useState<'all' | TaskStatus>('all');

  const tasksWithDeadlines = tasks.filter(task => task.deadline);
  
  const tasksForDate = tasksWithDeadlines.filter(task => {
    if (!task.deadline || !date) return false;
    const selectedDate = Array.isArray(date) ? date[0] : date;
    if (!selectedDate) return false;
    
    return (
      task.deadline.getDate() === selectedDate.getDate() &&
      task.deadline.getMonth() === selectedDate.getMonth() &&
      task.deadline.getFullYear() === selectedDate.getFullYear()
    );
  });

  const handleDateChange = (value: Value) => {
    if (value) {
      setDate(value);
    }
  };

  return (
    <div className="calendar-page">
      <h1>Календарь дедлайнов</h1>
      <div className="calendar-container">
        <Calendar
          onChange={handleDateChange}
          value={date}
          tileContent={({ date, view }) => {
            if (view !== 'month') return null;
            
            const hasDeadline = tasksWithDeadlines.some(task => {
              if (!task.deadline) return false;
              return (
                task.deadline.getDate() === date.getDate() &&
                task.deadline.getMonth() === date.getMonth() &&
                task.deadline.getFullYear() === date.getFullYear()
              );
            });
            
            return hasDeadline ? <div className="deadline-marker" /> : null;
          }}
        />
        <div className="tasks-list">
          <div className="calendar-filters">
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value as 'all' | TaskStatus)}
            >
              <option value="all">Все задачи</option>
              <option value="todo">To-Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <h2>Задачи на {
            date ? 
            (Array.isArray(date) ? 
              date[0]?.toLocaleDateString('ru-RU') || '' : 
              date.toLocaleDateString('ru-RU')) 
            : ''
          }</h2>
          {tasksForDate.filter(task => statusFilter === 'all' || task.status === statusFilter).length > 0 ? (
            <ul>
              {tasksForDate
                .filter(task => statusFilter === 'all' || task.status === statusFilter)
                .map(task => (
                  <li key={task.id} className={`task-item ${task.status}`}>
                    <span className="task-text">{task.text}</span>
                    <span className="task-time">
                      {task.deadline?.toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                      {task.status === 'done' ? ' ✅' : ''}
                    </span>
                  </li>
                ))}
            </ul>
          ) : (
            <p>Нет задач с дедлайном на эту дату</p>
          )}
        </div>
      </div>
    </div>
  );
};