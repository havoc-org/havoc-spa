import React, { useState } from 'react';
import './TagsSection.css';

function TagsSection({ tags, setTags }) {
  const [tagName, setTagName] = useState('');
  const [tagColor, setTagColor] = useState('#ffffff');

  const handleAddTag = () => {
    if (tagName.trim() && tagColor) {
      if(tagName.length>20){
        alert('Tag name should be less than 20 characters');
        return;
      }
      setTags([...tags, { name: tagName.trim(), colorHex: tagColor }]);
      setTagName('');
      setTagColor('#ffffff');
    }
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="tags-section">
      <h3>Add Tags</h3>
      <div className="tag-input-group">
        <input
          type="text"
          className="input-field"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          placeholder="Tag name"
        />
        <input
          type="color"
          className="color-picker"
          value={tagColor}
          onChange={(e) => setTagColor(e.target.value)}
          style={{ backgroundColor: tagColor }}
        />
        <button className="add-tag-button" onClick={handleAddTag}>
          Add Tag
        </button>
      </div>

      <ul className="tag-list">
        {tags.map((tag, index) => (
          <li
            key={index}
            className="tag-item"
            style={{ backgroundColor: tag.colorHex }}
          >
            <span className="tag-name">{tag.name}</span>
            <button className="remove-button" onClick={() => handleRemoveTag(index)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TagsSection;