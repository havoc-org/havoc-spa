import React from 'react';
import './TaskDetails.css';
import '../../../TaskInfo/TaskInfo.css';

export default function TaskDetails({ taskName, setTaskName, taskStatus, setTaskStatus, statuses, description, setDescription }) {
  return (
    <>
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
          <select
            className="input-field"
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
          >
            <option value="">Select a status</option>
            {statuses.map((status) => (
              <option key={status.projectStatusId} value={status.name}>
                {status.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <h2>Description</h2>
      <div className="field-group full-width">
        <textarea
          className="description-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          rows={4}
          maxLength={200}
        />
      </div>
    </>
  );
}
