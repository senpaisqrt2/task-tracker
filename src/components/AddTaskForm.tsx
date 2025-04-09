import React, { useState } from 'react';

type AddTaskFormProps = {
  onAddTask: (text: string) => void;
};

export const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTask(text);
      setText('');
    }
  };

  return (
    <form className="add-task" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите задачу..."
      />
      <button type="submit">Добавить</button>
    </form>
  );
};