import React from 'react';
import Tag from './Tag.jsx';
const TagList = ({task}) => {

    return (
        <div className='tag-list'>
            {task.tags.map((tag, index) => (
              <Tag key={index} backgroundColor={tag.colorHex} text={tag.name} />
            ))}
        </div>
    );
};

export default TagList;