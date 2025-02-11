import React from 'react';

// Функция для вычисления яркости цвета
const getBrightness = (color) => {
  if (!color) return 255; // Если цвета нет, считаем, что фон светлый
  let r, g, b;

  // Если передан HEX-код
  if (color.startsWith("#")) {
    const hex = color.length === 7 ? color.slice(1) : color.slice(1).split("").map(c => c + c).join(""); // Поддержка короткого HEX
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  } 
  // Если передан rgb() формат
  else if (color.startsWith("rgb")) {
    const values = color.match(/\d+/g).map(Number);
    [r, g, b] = values;
  }

  // Рассчитываем яркость (по формуле WCAG)
  return (r * 0.299 + g * 0.587 + b * 0.114);
};

const Tag = ({ backgroundColor, text }) => {
  const brightness = getBrightness(backgroundColor);
  const textColor = brightness < 128 ? 'white' : 'black'; // Если яркость < 128 — считаем цвет тёмным

  const style = {
    display: 'flex',
    padding: '0px 15px',
    width: 'fit-content',
    backgroundColor: backgroundColor || 'transparent',
    color: textColor, // Цвет текста
    borderRadius: '30px',
  };

  const displayText = text.length > 10 ? `${text.slice(0, 10)}...` : text;

  return <p style={style} className='tag-name'>#{displayText}</p>;
};

export default Tag;
