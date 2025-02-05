import React from 'react';

// Компонент, который принимает два пропса: backgroundColor, text и borderRadius
const Tag = ({ backgroundColor, text}) => {
  const style = {
    display: 'flex',
    padding: '0px 15px',
    width: 'fit-content',
    backgroundColor: backgroundColor || 'transparent', // Цвет фона
      // Отступы вокруг текста
    borderRadius: '30px', // Радиус скругления углов (передается как пропс)
    
  };

  //const displayText = text.length > 10 ? `${text.slice(0, 10)}...` : text;

  return (
      <p style={style} className='name'>#{text}</p>
  );
  
};
export default Tag;