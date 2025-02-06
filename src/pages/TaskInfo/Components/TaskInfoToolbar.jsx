import React from 'react';
import {  Link } from 'react-router-dom';
import useProject from '../../../hooks/useProject';
import exitButton from '../../../assets/projectexit.svg';

import TagsTile from './TagsTile.jsx';
const TaskInfoToolbar = ({task,handleDeleteTask}) => {
    
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
        <img className="buttons" src={exitButton} alt="Create Task" />
      </Link>
    );
  }

export default TaskInfoToolbar;