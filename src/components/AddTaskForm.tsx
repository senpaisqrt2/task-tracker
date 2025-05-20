import React, { useState } from 'react';

// Пропсы для компонента формы добавления задачи
type AddTaskFormProps = {
  onAddTask: (text: string) => void;  // Функция для добавления задачи
};

// Компонент формы добавления задачи
export const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  // Состояние для текста задачи
  const [text, setText] = useState('');

  // Обработчик отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();  // Предотвращаем стандартное поведение формы
    if (text.trim()) {   // Проверяем, что текст не пустой
      onAddTask(text);   // Вызываем функцию добавления
      setText('');       // Очищаем поле ввода
    }
  };

  return (
    // Форма с обработчиком onSubmit
    <form className="add-task" onSubmit={handleSubmit}>
      {/* Поле ввода текста задачи */}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}  // Обновляем состояние при изменении
        placeholder="Введите задачу..."
      />
      {/* Кнопка отправки формы */}
      <button type="submit">
          Добавить
      </button>
    </form>
  );
};