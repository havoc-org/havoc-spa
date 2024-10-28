import React, { useState } from 'react';
import useProjectService from '../../hooks/useProjectService.js';
import './CreateProject.css'; 
import useAuth from '../../hooks/useAuth.js';
import { Link } from 'react-router-dom';

export default function CreateProject() {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const projectService = useProjectService();
  const { user } = useAuth();

    const handleCreateProject = async () => {
    if (!projectName) {
      setErrorMessage('Please fill in all required fields.');
      return;
    } else{
      setErrorMessage('');
    }
      const newProject = {
        name: projectName,
        description: description || null,
        background: null,
        start: startDate || null,  
        deadline: deadline || null, 
        projectStatus: {
          name: "New" 
        },
        participations: [
          //Add Participation list here example: {email}, {email}, ...
        ]
      };
    
      try {
        const response = await projectService.createProject(newProject);
        console.log('USER: ', response);
        console.log('Project created successfully', user?.email);
      } catch (error) {
        console.error('Error creating project:', error.message);
      }
    };
    

  const handleInvite = () => {
    console.log(`Invite sent to: ${email}`);
  };

  return (
    
    <div className="create-project-container">
      <div className="create-project-form">
        <h1>Create new project</h1>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <label>
          <input
            className="create-project-input"
            placeholder="* Name:"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </label>
        <label>
          <input
            placeholder="Description:"
            className="create-project-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <div className="date-inputs">
          <label>
            Start:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label>
            Deadline:
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </label>
        </div>
        <button className="create-button" onClick={handleCreateProject}>
          Create
        </button>
      </div>

      <div className="invite-to-project">
        <h2>Invite to project</h2>
        <div className="invite-form">
          <input
            type="email"
            placeholder="Email:"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="invite-button" onClick={handleInvite}>
            Invite
          </button>
        </div>
        <div className="user-list">
          {users.map((user, index) => (
            <div key={index} className="user-item">
              {user}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
