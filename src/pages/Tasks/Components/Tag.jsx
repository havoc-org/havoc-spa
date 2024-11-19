import React from 'react';

// Компонент, который принимает два пропса: backgroundColor, text и borderRadius
const Tag = ({ backgroundColor, text}) => {
  const style = {
    display: 'flex',
    padding: '0px 5px',
    width: 'fit-content',
    backgroundColor: backgroundColor || 'transparent', // Цвет фона
      // Отступы вокруг текста
    borderRadius: '30px', // Радиус скругления углов (передается как пропс)
    color: 'black', // Цвет текста по умолчанию
  };

  const displayText = text.length > 7 ? `${text.slice(0, 7)}...` : text;

  return (
      <p style={style} className='name'>{displayText}</p>
  );
  
};
export default Tag;