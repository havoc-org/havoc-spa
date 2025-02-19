import React, { useState } from 'react';
import useProject from '../../../hooks/useProject';
import { left } from '@cloudinary/url-gen/qualifiers/textAlignment';
import './TaskToolBar.css';
import useParticipationService from '../../../hooks/useParticipationService';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth.js';

const ExitIcon = () => (
  <svg className='taskbar-button' width="43" height="43" viewBox="0 0 47 46" fill="currentColor">
    <path d="M32.0573 4H27.0382C20.8608 4 17 7.77667 17 13.8193V21.4671H29.0651C29.8566 21.4671 30.5129 22.1091 30.5129 22.8833C30.5129 23.6576 29.8566 24.2996 29.0651 24.2996H17V31.9473C17 37.99 20.8608 41.7667 27.0382 41.7667H32.0379C38.2153 41.7667 42.0761 37.99 42.0761 31.9473V13.8193C42.0954 7.77667 38.2346 4 32.0573 4Z" fill="currentColor" />
    <path d="M8.80325 21.2437L12.7992 17.3348C13.0888 17.0516 13.2239 16.6928 13.2239 16.334C13.2239 15.9752 13.0888 15.5976 12.7992 15.3332C12.2394 14.7856 11.3128 14.7856 10.753 15.3332L4.28608 21.6591C3.72626 22.2067 3.72626 23.1131 4.28608 23.6607L10.753 29.9867C11.3128 30.5343 12.2394 30.5343 12.7992 29.9867C13.359 29.439 13.359 28.5326 12.7992 27.985L8.80325 24.0762H17.3743V21.2437H8.80325Z" fill="currentColor" />
  </svg>
);

const СreateIcon = () => (
  <svg className='taskbar-button' width="43" height="43" viewBox="0 0 46 46" fill="currentColor">
    <path d="M31.0305 3.83337H14.9688C7.99217 3.83337 3.83301 7.99254 3.83301 14.9692V31.0117C3.83301 38.0075 7.99217 42.1667 14.9688 42.1667H31.0113C37.988 42.1667 42.1472 38.0075 42.1472 31.0309V14.9692C42.1663 7.99254 38.0072 3.83337 31.0305 3.83337ZM30.6663 24.4375H24.4372V30.6667C24.4372 31.4525 23.7855 32.1042 22.9997 32.1042C22.2138 32.1042 21.5622 31.4525 21.5622 30.6667V24.4375H15.333C14.5472 24.4375 13.8955 23.7859 13.8955 23C13.8955 22.2142 14.5472 21.5625 15.333 21.5625H21.5622V15.3334C21.5622 14.5475 22.2138 13.8959 22.9997 13.8959C23.7855 13.8959 24.4372 14.5475 24.4372 15.3334V21.5625H30.6663C31.4522 21.5625 32.1038 22.2142 32.1038 23C32.1038 23.7859 31.4522 24.4375 30.6663 24.4375Z" fill="currentColor" />
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
        <div style={{ display: "flex" }}>
          <Sort sortValue={sortValue} handleSortChange={handleSortChange} />
        </div>
        <div className="task-toolbar">
          <Leave />
          <Exit />
        </div>
      </div>
    );
  } else if (perm.isManager()) {
    return (
      <div className="task-toolbar">
        <div style={{ display: "flex" }}>
          <Create />
          <Sort sortValue={sortValue} handleSortChange={handleSortChange} />
        </div>
        <div className="task-toolbar">
          <Leave />
          <Exit />
        </div>
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
          <Leave />
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

function Leave() {

  const navigate = useNavigate();
  const participationService = useParticipationService();
  const storedId = localStorage.getItem('currentProjectId');
  const projectId = storedId ? JSON.parse(storedId) : null;
  const { user } = useAuth();
  const [showConfirmLeave, setShowConfirmLeave] = useState(false);

  const handleLeaveProject = async () => {
    try {
      await participationService.deleteParticipation(projectId, user.id);
      console.log("Successfully left the project");
      window.location.reload();
    } catch (error) {
      console.error("Error leaving project:", error);
    }
  };

  const confirmLeave = () => {
    setShowConfirmLeave(false);
    navigate('/projects');
    handleLeaveProject();
  };

  const cancelLeave = () => {
    setShowConfirmLeave(false);
  };

  const openConfirm = (e) => {
    e.preventDefault();
    setShowConfirmLeave(true);
  };

  return (
    <div>
      {showConfirmLeave && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <p>Are you sure you want to leave this project?</p>
            <div className="modal-buttons">
              <button className="confirm-btn-popup" onClick={confirmLeave}>Yes</button>
              <button className="cancel-btn-popup" onClick={cancelLeave}>No</button>
            </div>
          </div>
        </div>
      )}
      <Link>
        <button className="yes-button" onClick={openConfirm}>
          Leave Project
        </button>
      </Link>
    </div>
  );
}

function Create() {
  return (
    <div >
      <div>
        <Link to="create">
          <СreateIcon />
        </Link>
      </div>
    </div>
  );
}

export default TaskToolBar;
