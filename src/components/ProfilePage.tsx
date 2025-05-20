import React, { useState } from 'react';
import { User } from '../App'; // Добавляем импорт типа

type ProfilePageProps = {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
};

export const ProfilePage: React.FC<ProfilePageProps> = ({ user, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User>({ ...user });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prev: User) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdateUser(editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser({ ...user });
    setIsEditing(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setEditedUser((prev: User) => ({ ...prev, avatar: event.target?.result as string }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="profile-page">
      <h1>Профиль пользователя</h1>
      
      {!isEditing ? (
        <div className="profile-view">
          <div className="profile-info">
            <div className="avatar">
              {user.avatar ? (
                <img src={user.avatar} alt="Аватар" />
              ) : (
                <div className="avatar-placeholder">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="details">
              <h2>{user.name}</h2>
              <p>Email: {user.email}</p>
              <p>Дата регистрации: {user.registrationDate}</p>
            </div>
          </div>
          <button 
            className="edit-btn"
            onClick={() => setIsEditing(true)}
          >
            Редактировать профиль
          </button>
        </div>
      ) : (
        <div className="profile-edit">
          <div className="avatar-edit">
            <div className="avatar-preview">
              {editedUser.avatar ? (
                <img src={editedUser.avatar} alt="Аватар" />
              ) : (
                <div className="avatar-placeholder">
                  {editedUser.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <label className="avatar-upload">
              Изменить аватар
              <input 
                type="file" 
                accept="image/*"
                onChange={handleAvatarChange}
                hidden
              />
            </label>
          </div>
          
          <div className="form-group">
            <label>Имя</label>
            <input
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-actions">
            <button className="save-btn" onClick={handleSave}>
              Сохранить
            </button>
            <button className="cancel-btn" onClick={handleCancel}>
              Отмена
            </button>
          </div>
        </div>
      )}
    </div>
  );
};