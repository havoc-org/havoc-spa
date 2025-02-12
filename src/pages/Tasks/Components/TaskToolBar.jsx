import React from 'react';
import { Link } from 'react-router-dom';
import createButton from '../../../assets/AddNewTask.svg';
import exitButton from '../../../assets/projectexit.svg';
import useProject from '../../../hooks/useProject';
import { left } from '@cloudinary/url-gen/qualifiers/textAlignment';

const TaskToolBar = ({ sortValue, setSortValue }) => {
  const handleSortChange = (event) => {
    setSortValue(event.target.value);
  };
  const perm = useProject();
  
  if (perm.isDeveloper()) {
    return (
    <div className="task-toolbar"> 
      <Sort sortValue={sortValue} handleSortChange={handleSortChange} />
      <Exit />
    </div>
  );
  } else if (perm.isManager()) {
    return (
      <div className="task-toolbar">
        <div style={{display: "flex"}}>
        <Create />
        <Sort sortValue={sortValue} handleSortChange={handleSortChange}/>
        </div>
        <Exit />
      </div>
    );
  }
  else if (perm.isOwner()) {
    return (
      <div className="task-toolbar">
        <div style={{display: "flex"}}>
        <Create />
        <Sort sortValue={sortValue} handleSortChange={handleSortChange}/>
        </div>
        <div className="task-toolbar">
        <Link to="edit">
            <button className="yes-button">Edit Project</button>
          </Link>
          <Exit />
        </div>
      </div>
    );
  }
};

function Sort({ sortValue, handleSortChange }) {
  return (
    <div className="sort-container" style={{display: "flex"}}>
      <label>Sort By:</label>
      <select value={sortValue} onChange={handleSortChange}>
        <option value="deadline">Deadline</option>
        <option value="startDate">Start date</option>
        <option value="name">Name(a-z)</option>
      </select>
    </div>
  );
}

function Exit() {
    return (
    <Link replace={true} to="/projects">
        <img className="buttons" src={exitButton} alt="Create Task" />
      </Link>
    );
  }
function Create() {
  return (
    <div >
        <div>
          <Link to="create">
            <img className="buttons" src={createButton} alt="Create Task" />
          </Link>
        </div>
      </div>
  );
}

export default TaskToolBar;
