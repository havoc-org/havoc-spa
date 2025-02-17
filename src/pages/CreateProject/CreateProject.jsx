import React, { useState } from 'react';

import useProjectService from '../../hooks/useProjectService.js';
import './CreateProject.css';
import useAuth from '../../hooks/useAuth.js';
import { useNavigate, Link } from 'react-router-dom';

export default function CreateProject() {
  const { user } = useAuth();
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [email, setEmail] = useState('');
  const roles = ['Owner', 'Manager', 'Developer'];
  const [role, setRole] = useState(roles[0]);
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const projectService = useProjectService();
  const navigate = useNavigate();
  const ExitIcon = () => (
    <svg className='taskbar-button' width="43" height="43" viewBox="0 0 47 46" fill="currentColor">
      <path d="M32.0573 4H27.0382C20.8608 4 17 7.77667 17 13.8193V21.4671H29.0651C29.8566 21.4671 30.5129 22.1091 30.5129 22.8833C30.5129 23.6576 29.8566 24.2996 29.0651 24.2996H17V31.9473C17 37.99 20.8608 41.7667 27.0382 41.7667H32.0379C38.2153 41.7667 42.0761 37.99 42.0761 31.9473V13.8193C42.0954 7.77667 38.2346 4 32.0573 4Z" fill="currentColor" />
      <path d="M8.80325 21.2437L12.7992 17.3348C13.0888 17.0516 13.2239 16.6928 13.2239 16.334C13.2239 15.9752 13.0888 15.5976 12.7992 15.3332C12.2394 14.7856 11.3128 14.7856 10.753 15.3332L4.28608 21.6591C3.72626 22.2067 3.72626 23.1131 4.28608 23.6607L10.753 29.9867C11.3128 30.5343 12.2394 30.5343 12.7992 29.9867C13.359 29.439 13.359 28.5326 12.7992 27.985L8.80325 24.0762H17.3743V21.2437H8.80325Z" fill="currentColor" />
    </svg>
  );

  const handleCreateProject = async (e) => {
    e.preventDefault();

    if (!projectName) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (projectName.length > 25) {
      setErrorMessage('Project name cannot exceed 25 characters.');
      return;
    }

    if (description.length > 200) {
      setErrorMessage('Description cannot exceed 200 characters.');
      return;
    }

    setErrorMessage('');

    const participations = users.map(({ email, role }) => ({ email, role }));

    const newProject = {
      name: projectName,
      description: description || null,
      background: null,
      creatorId: user?.id,
      start: startDate || null,
      deadline: deadline || null,
      projectStatus: {
        name: 'New',
      },
      participations,
    };

    setIsLoading(true);
    try {
      const response = await projectService.createProject(newProject);
      if (response.message) {
        setErrorMessage(response.message);
        return;
      }
      console.log('Project created successfully', response);
      setUsers([]);
      setDescription('');
      setProjectName('');
      navigate('/projects');
    } catch (error) {
      console.error('Error creating project:', error.message);
      setErrorMessage('Failed to create project.');
    } finally {
      setIsLoading(false);
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleInvite = () => {
    setEmailErrorMessage('');

    if (email === '' || email === user.email || !validateEmail(email)) {
      setEmailErrorMessage('Please enter a valid email address.');
      return;
    }

    if (users.some((user) => user.email === email)) {
      setEmailErrorMessage('You have already sent an invitation to this email');
      return;
    }

    setUsers((prevUsers) => [...prevUsers, { email, role }]);
    console.log(`Invite sent to: ${email} with role: ${role}`);
    setEmail('');
    setErrorMessage('');
  };

  const handleDeleteUser = (index) => {
    setUsers((prevUsers) => prevUsers.filter((_, i) => i !== index));
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
        <button className="create-button" onClick={handleCreateProject} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Create'}
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
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="role-select-create"
          >
            <option value="Manager">Manager</option>
            <option value="Owner">Owner</option>
            <option value="Developer">Developer</option>
          </select>
          <button className="invite-button" onClick={handleInvite}>
            Invite
          </button>
        </div>
        {emailErrorMessage && <p className="error-message">{emailErrorMessage}</p>}
        <div className="user-list">
          {users.map(({ email, role }, index) => (
            <div key={index} className="user-item">
              {email} ({role})
              <button
                className="delete-button"
                onClick={() => handleDeleteUser(index)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
      <Exit/>
    </div>
  );

  function Exit() {
    return (
      <Link replace to="/projects">
        <ExitIcon />
      </Link>
    );
  }
}