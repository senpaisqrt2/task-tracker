import React, { useState } from 'react';

type AddTaskFormProps = {
  onAddTask: (text: string, deadline?: Date) => void;
};

export const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  const [text, setText] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      const deadlineDate = deadline ? new Date(deadline) : undefined;
      onAddTask(text, deadlineDate);
      setText('');
      setDeadline('');
    }
  };

  return (
    <form className="add-task" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите задачу..."
        required
      />
      <div className="deadline-input">
        <label htmlFor="deadline">Дедлайн:</label>
        <input
          type="datetime-local"
          id="deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>
      <button type="submit">Добавить</button>
    </form>
  );
};