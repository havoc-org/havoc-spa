import React from 'react';
import { Link } from 'react-router-dom';
import useProject from '../../../hooks/useProject';


import TagsTile from './TagsTile.jsx';

const ExitIcon = () => (
  <svg
    className="navbar-button"
    width="24"
    height="24"
    viewBox="0 0 40 40"
    fill="currentColor"
  >
    <path d="M29.0573 0H24.0382C17.8608 0 14 3.77667 14 9.81933V17.4671H26.0651C26.8566 17.4671 27.5129 18.1091 27.5129 18.8833C27.5129 19.6576 26.8566 20.2996 26.0651 20.2996H14V27.9473C14 33.99 17.8608 37.7667 24.0382 37.7667H29.0379C35.2153 37.7667 39.0761 33.99 39.0761 27.9473V9.81933C39.0954 3.77667 35.2346 0 29.0573 0Z"  />
    <path d="M5.80325 17.2437L9.79921 13.3348C10.0888 13.0516 10.2239 12.6928 10.2239 12.334C10.2239 11.9752 10.0888 11.5976 9.79921 11.3332C9.23939 10.7856 8.31279 10.7856 7.75297 11.3332L1.28608 17.6591C0.726256 18.2067 0.726256 19.1131 1.28608 19.6607L7.75297 25.9867C8.31279 26.5343 9.23939 26.5343 9.79921 25.9867C10.359 25.439 10.359 24.5326 9.79921 23.985L5.80325 20.0762H14.3743V17.2437H5.80325Z" />
  </svg>
);



const TaskInfoToolbar = ({ task, handleDeleteTask }) => {

  const perm = useProject();
  if (perm.isDeveloper()) {
    return (<div className="task-toolbar">
      <Exit />

      <TagsTile task={task} />
    </div>);
  } else if (perm.isManager() || perm.isOwner()) {
    return (
      <div className="task-toolbar">
        <Exit />

        <TagsTile task={task} />
        <button className="delete-button" onClick={handleDeleteTask}>Delete task</button>
      </div>
    );
  }

};
function Exit() {
  return (
    <Link replace={true} to="/tasks">
      <button className="tab-button">
        <ExitIcon />
      </button>
    </Link>
  );
}

export default TaskInfoToolbar;