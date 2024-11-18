import React from 'react';

// Компонент, который принимает два пропса: backgroundColor, text и borderRadius
const Tag = ({ backgroundColor, text}) => {
  const style = {
    backgroundColor: backgroundColor || 'transparent', // Цвет фона
    padding: '10px',  // Отступы вокруг текста
    borderRadius: '5 px', // Радиус скругления углов (передается как пропс)
    color: 'black', // Цвет текста по умолчанию
  };

  return (
    <div style={style}>
      {text}
    </div>
  );
  
};
export default Tag;