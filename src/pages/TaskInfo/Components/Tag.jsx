import React from 'react';

import trashCanIcon from '../../../assets/trash-can.svg';
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

const Tag = ({ tag, OnDelete }) => {
  const backgroundColor = tag.colorHex;
  const brightness = getBrightness(backgroundColor);
  const textColor = brightness < 128 ? 'white' : 'black'; // Если яркость < 128 — считаем цвет тёмным

  const style = {
    display: 'flex',
    padding: '0px 15px',
    width: 'fit-content',
    backgroundColor: backgroundColor || 'transparent',
    color: textColor, // Цвет текста
    borderRadius: '30px',
    maxHeight: '35px',
  };

  const displayText = tag.name.length > 10 ? `${tag.name.slice(0, 10)}...` : tag.name;
  console.log(tag);
  return (
  <div className='task-info-tag-name' style={style}>
  <span>{tag.name}</span>
     {OnDelete && (
        <img className="small-icon" onClick={() => {OnDelete(tag.tagId);}} src={trashCanIcon} alt="trashCan" />
      )}
  </div>
  );
};

export default Tag;
