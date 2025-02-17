import React from 'react';
import { Link } from 'react-router-dom';
import createButton from '../../../assets/AddNewTask.svg';
import exitButton from '../../../assets/projectexit.svg';
import useProject from '../../../hooks/useProject';
import { left } from '@cloudinary/url-gen/qualifiers/textAlignment';
import './TaskToolBar.css';



const ExitIcon = () => (
  <svg className='taskbar-button'  width="43" height="43" viewBox="0 0 47 46" fill="currentColor">
    <path d="M32.0573 4H27.0382C20.8608 4 17 7.77667 17 13.8193V21.4671H29.0651C29.8566 21.4671 30.5129 22.1091 30.5129 22.8833C30.5129 23.6576 29.8566 24.2996 29.0651 24.2996H17V31.9473C17 37.99 20.8608 41.7667 27.0382 41.7667H32.0379C38.2153 41.7667 42.0761 37.99 42.0761 31.9473V13.8193C42.0954 7.77667 38.2346 4 32.0573 4Z" fill="currentColor" />
    <path d="M8.80325 21.2437L12.7992 17.3348C13.0888 17.0516 13.2239 16.6928 13.2239 16.334C13.2239 15.9752 13.0888 15.5976 12.7992 15.3332C12.2394 14.7856 11.3128 14.7856 10.753 15.3332L4.28608 21.6591C3.72626 22.2067 3.72626 23.1131 4.28608 23.6607L10.753 29.9867C11.3128 30.5343 12.2394 30.5343 12.7992 29.9867C13.359 29.439 13.359 28.5326 12.7992 27.985L8.80325 24.0762H17.3743V21.2437H8.80325Z" fill="currentColor" />
  </svg>
);

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
        <div style={{ display: "flex" }}>
          <Create />
          <Sort sortValue={sortValue} handleSortChange={handleSortChange} />
        </div>
        <Exit />
      </div>
    );
  }
  else if (perm.isOwner()) {
    return (
      <div className="task-toolbar">
        <div style={{ display: "flex" }}>
          <Create />
          <Sort sortValue={sortValue} handleSortChange={handleSortChange} />
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
    <div className="sort-container" style={{ display: "flex" }}>
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
      <ExitIcon />
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
