import React, { useState, useRef } from 'react';
import './AddParticipantForm.css';

export default function AddParticipantForm({
    email,
    setEmail,
    role,
    setRole,
    error,
    onAdd
}) {
    const [localError, setLocalError] = useState('');
    const emailListRef = useRef([]);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        if (!emailRegex.test(newEmail)) {
            setLocalError('Invalid email');
        } else if (emailListRef.current.includes(newEmail)) {
            setLocalError('Email is already in use');
        } else {
            setLocalError('');
        }
    };

    const handleAdd = () => {
        if (!emailRegex.test(email)) {
            setLocalError('Invalid email');
            return;
        }
        if (emailListRef.current.includes(email)) {
            setLocalError('Email is already in use');
            return;
        }
        emailListRef.current.push(email);
        onAdd();
    };

    return (
        <div className="add-participant-form">
            <input
                type="email"
                placeholder="Enter email..."
                value={email}
                onChange={handleEmailChange}
            />

            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="Manager">Manager</option>
                <option value="Developer">Developer</option>
                <option value="Owner">Owner</option>
            </select>

            <button onClick={handleAdd} className="add-button" disabled={!!localError}>
                Add Member
            </button>

            {(error || localError) && <div className="error-message">{error || localError}</div>}
        </div>
    );
}
