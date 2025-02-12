import React, { useState } from 'react';
import './AssignMembers.css';

export default function AssignMembers({ assignedUsers, setAssignedUsers, currentProject }) {
  const initialUsers = currentProject?.participations.map((p) => ({
    id: p.user.userId,
    name: p.user.firstName,
    surname: p.user.lastName,
    email: p.user.email,
    role: p.user.role.name,
  })) || [];

  const [availableUsers, setAvailableUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedUserComment, setSelectedUserComment] = useState('');

  const handleAddAssignment = () => {
    if (selectedUser) {
      const userToAdd = availableUsers.find((user) => user.id === Number(selectedUser));
      if (userToAdd) {
        const userWithComment = {
          ...userToAdd,
          comment: selectedUserComment || '',
        };
        setAssignedUsers([...assignedUsers, userWithComment]);
        setAvailableUsers(availableUsers.filter((user) => user.id !== userToAdd.id));
        setSelectedUser('');
        setSelectedUserComment('');
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

  return (
    <div className="members-section">
      <h3>Assign to</h3>
      <div className="assign-input-group">
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
        <input
          type="text"
          className="input-field"
          placeholder="max 200 characters"
          value={selectedUserComment}
          onChange={(e) => {
            if (e.target.value.length <= 200) {
              setSelectedUserComment(e.target.value);
            }
          }}
        />
        <button className="add-button" onClick={handleAddAssignment}>
          Add
        </button>
      </div>

      <h3>Assigned Members</h3>
      <ul className="assigned-users-list">
        {assignedUsers.map((user) => (
          <li key={user.id} className="assigned-user-item">
            <div className="user-info">
              <span className="user-name">
                {user.name} {user.surname}
              </span>
              <span className="user-email">{user.email}</span>
              <span className="user-comment">Comment: {user.comment}</span>
            </div>
            <button className="remove-button" onClick={() => handleRemoveAssignment(user.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
