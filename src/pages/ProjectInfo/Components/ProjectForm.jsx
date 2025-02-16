import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectForm.css';

export default function ProjectForm({
  projectData,
  setProjectData,
  handleSubmit,
  errorMessage,
  successMessage,
  isUpdating,
  onDelete
}) {
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProjectData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);

  const handleDeleteClick = () => setIsDeleteConfirmVisible(true);
  const cancelDelete = () => setIsDeleteConfirmVisible(false);
  const confirmDelete = () => {
    setIsDeleteConfirmVisible(false);
    onDelete?.();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
    navigate('/tasks');
    window.location.reload();

  };

  return (
    <div className="project-form">
      <h1>Edit Project</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleFormSubmit}>
        <input
          name="name"
          className="project-input"
          placeholder="* Project Name"
          value={projectData.name}
          onChange={handleChange}
          maxLength="25"
        />

        <textarea
          name="description"
          className="project-textarea"
          placeholder="Description"
          value={projectData.description}
          onChange={handleChange}
          maxLength="200"
          rows="4"
        />

        <div className="date-group">
          <label>
            Start:
            <input
              type="date"
              name="startDate"
              value={projectData.startDate}
              onChange={handleChange}
            />
          </label>

          <label>
            Deadline:
            <input
              type="date"
              name="deadline"
              value={projectData.deadline}
              onChange={handleChange}
            />
          </label>
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={isUpdating}
        >
          {isUpdating ? 'Loading...' : 'Update Project'}
        </button>

        {isDeleteConfirmVisible && (
          <div className="confirmation-modal">
            <div className="modal-content">
              <p>Are you sure you want to delete this project?</p>
              <div className="modal-buttons">
                <button className="confirm-btn-popup" onClick={confirmDelete}>
                  Yes
                </button>
                <button className="cancel-btn-popup" onClick={cancelDelete}>
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="delete-section">
          <button
            type="button"
            className="submit-button delete"
            onClick={handleDeleteClick}
          >
            Delete Project
          </button>
        </div>
      </form>
    </div>
  );
}