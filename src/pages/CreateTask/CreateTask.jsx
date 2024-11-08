import React, { useState } from 'react';
import useTaskService from '../../hooks/useTaskService.js';
import './CreateTask.css';
import useAuth from '../../hooks/useAuth.js';
import { Link } from 'react-router-dom';

export default function CreateTask() {
  const { user } = useAuth();
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [files, setFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const taskService = useTaskService();

  const [availableUsers, setAvailableUsers] = useState([
    { id: 1, name: 'Alice', surname: 'Johnson', email: 'alice@example.com' },
    { id: 2, name: 'Bob', surname: 'Smith', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', surname: 'Brown', email: 'charlie@example.com' }
  ]);

  const handleFileUpload = (event) => {
    setFiles([...files, ...Array.from(event.target.files)]);
  };

  const handleFileRemove = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleAddAssignment = () => {
    if (selectedUser) {
      const userToAdd = availableUsers.find((user) => user.id === Number(selectedUser));
      if (userToAdd) {
        setAssignedUsers([...assignedUsers, userToAdd]);
        setAvailableUsers(availableUsers.filter((user) => user.id !== userToAdd.id));
        setSelectedUser('');
      }
    }
  };

  const handleRemoveAssignment = (userId) => {
    const userToRemove = assignedUsers.find((user) => user.id === userId);
    if (userToRemove) {
      setAvailableUsers([...availableUsers, userToRemove]);
      setAssignedUsers(assignedUsers.filter((user) => user.id !== userId));
    }
  };

  const handleCreateTask = async () => {
    if (!taskName || !taskStatus) {
      setErrorMessage('Please fill in all required fields.');
      return;
    } else {
      setErrorMessage('');
    }

    const newTask = {
      name: taskName,
      description: description || null,
      taskStatus: { name: taskStatus },
      start: startDate || null,
      deadline: deadline || null,
      projectId: 176,
      assignments: [],
      attachments: []
    };

    try {
      const result = await taskService.createTask(newTask);

      console.log('Response from server:', result);
      setErrorMessage(result.message)

      setTaskName('');
      setDescription('');
      setTaskStatus('');
      setStartDate('');
      setDeadline('');
      setAssignedUsers([]);
      setAvailableUsers([
        { id: 1, name: 'Alice', surname: 'Johnson', email: 'alice@example.com' },
        { id: 2, name: 'Bob', surname: 'Smith', email: 'bob@example.com' },
        { id: 3, name: 'Charlie', surname: 'Brown', email: 'charlie@example.com' }
      ]);
      setFiles([]);
    } catch (error) {
      console.error('Error creating task: ', error.message);
      setErrorMessage('An unexpected error occurred. Please try again.')
    }
  
  };

  return (
    <div className="create-task-container">
      <div className="create-task-form">
        <div className="task-details-row">
          <div className="field-group">
            <h2 className="required">Task Name</h2>
            <input
              type="text"
              className="input-field"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter task name"
            />
          </div>

          <div className="field-group">
            <h2 className="required">Task Status</h2>
            <input
              type="text"
              className="input-field"
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value)}
              placeholder="Enter task status"
            />
          </div>
        </div>

        <h2>Description</h2>
        <div className="field-group full-width">
          <textarea
            className="textarea-field"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
          />
        </div>

        <div className="file-upload-section">
          <h3>Attach file</h3>
          <label className="file-upload-button">
            Choose File
            <input type="file" multiple onChange={handleFileUpload} />
          </label>
          <ul className="file-list">
            {files.map((file, index) => (
              <li className="file-item" key={index}>
                {file.name}
                <button className="file-remove-button" onClick={() => handleFileRemove(index)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="date-picker-section">
          <div className="field-group">
            <h3>Set start date</h3>
            <input
              type="datetime-local"
              className="input-field"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="field-group">
            <h3>Set deadline</h3>
            <input
              type="datetime-local"
              className="input-field"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button className="submit-button" onClick={handleCreateTask}>Create Task</button>
      </div>

      <div className="members-section">
        <h3>Assign to</h3>
        <select
          className="input-field"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Select a user</option>
          {availableUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} {user.surname}
            </option>
          ))}
        </select>
        <button className="add-button" onClick={handleAddAssignment}>Add</button>
        
        <h3>Assigned Members</h3>
        <ul className="assigned-users-list">
          {assignedUsers.map((user) => (
            <li key={user.id} className="assigned-user-item">
              <div className="user-info">
                <span className="user-name">{user.name} {user.surname}</span>
                <span className="user-email">{user.email}</span>
              </div>
              <button className="remove-button" onClick={() => handleRemoveAssignment(user.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
