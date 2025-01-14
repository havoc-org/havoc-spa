import React from 'react';
import { Link } from 'react-router-dom';
import createButton from '../../../assets/AddNewTask.svg';
import exitButton from '../../../assets/projectexit.svg';
import useProject from '../../../hooks/useProject';

const TaskToolBar = () => {
  const perm = useProject();
  if (perm.isDeveloper()) {
    return (<Exit />);
  } else if (perm.isManager()) {
    return (
      <div className="task-toolbar">
        <Exit />
        <div className="task-toolbar">
          <Create />
        </div>
      </div>
    );
  }
  else if (perm.isOwner()) {
    return (
      <div className="task-toolbar">
        <Exit />
        <div className="task-toolbar">
        <Link to="edit">
            <button className="edit-project">Edit Project</button>
          </Link>
          <Create />
        </div>
      </div>
    );
  }
};

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
