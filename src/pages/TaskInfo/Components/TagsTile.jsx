import React from 'react';
import TagList from './TagList';

const TagsTile = ({task}) => {
    return (
        <div className="tag-list-container">
      <TagList task={task}
      />
    </div>
    );
};

export default TagsTile;