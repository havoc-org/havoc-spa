import React from 'react';
import './DatePickerSection.css';

export default function DatePickerSection({ startDate, setStartDate, deadline, setDeadline }) {
  return (
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
  );
}