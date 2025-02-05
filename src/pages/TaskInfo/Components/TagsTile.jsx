import React from 'react';
import TagList from './TagList';

const TagsTile = ({task}) => {
    return (
        <div className="task-description">
      <h2>Tags</h2>
      <TagList task={task}
      />
    </div>
    );
};

export default TagsTile;