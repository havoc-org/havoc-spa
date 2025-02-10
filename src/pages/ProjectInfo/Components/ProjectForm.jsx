import React from 'react';
import './ProjectForm.css';

export default function ProjectForm({
  projectData,
  setProjectData,
  handleSubmit,
  errorMessage,
  successMessage,
  isUpdating
}) {
  const handleChange = (e) => {
    setProjectData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="project-form">
      <h1>Edit Project</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
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
      </form>
    </div>
  );
}