import React from 'react';
import './AddParticipantForm.css';

export default function AddParticipantForm({
    email,
    setEmail,
    role,
    setRole,
    error,
    onAdd
}) {
    return (
        <div className="add-participant-form">
            <input
                type="email"
                placeholder="Enter email.."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="Manager">Manager</option>
                <option value="Developer">Developer</option>
                <option value="Owner">Owner</option>
            </select>

            <button onClick={onAdd} className="add-button">
                Add Member
            </button>

            {error && <div className="error-message">{error}</div>}
        </div>
    );
}