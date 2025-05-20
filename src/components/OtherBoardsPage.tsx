import React, { useState } from 'react';
import { Board } from '../App';

type OtherBoardsPageProps = {
  boards: Record<string, Board>;
  onCreateBoard: (name: string) => void;
  onSelectBoard: (boardId: string) => void;
};

export const OtherBoardsPage: React.FC<OtherBoardsPageProps> = ({ 
  boards, 
  onCreateBoard,
  onSelectBoard
}) => {
  const [newBoardName, setNewBoardName] = useState('');

  const handleCreateBoard = () => {
    if (newBoardName.trim()) {
      onCreateBoard(newBoardName);
      setNewBoardName('');
    }
  };

  return (
    <div className="other-boards">
      <h1>Мои доски</h1>
      
      <div className="create-board">
        <input
          type="text"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
          placeholder="Название новой доски"
        />
        <button onClick={handleCreateBoard}>Создать доску</button>
      </div>
      
      <div className="boards-list">
        {Object.values(boards).map(board => (
          <div 
            key={board.id} 
            className="board-card"
            onClick={() => onSelectBoard(board.id)}
          >
            <h3>{board.name}</h3>
            <p>Задач: {board.tasks.length}</p>
          </div>
        ))}
      </div>
    </div>
  );
};