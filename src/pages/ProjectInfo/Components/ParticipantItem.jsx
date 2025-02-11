import React, { useState } from 'react';
import './ParticipantsManager.css';

export default function ParticipantItem({
    participant,
    user,
    editingRole,
    setEditingRole,
    onUpdateRole,
    onRemove
}) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const isEditing = editingRole.userId === participant.user.userId;
    const isCurrentUser = user?.id === participant.user.userId;

    const handleDelete = () => {
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        setShowDeleteConfirm(false);
        onRemove(participant.user.userId);
    };

    const cancelDelete = () => {
        setShowDeleteConfirm(false);
    };

    return (
        <div className="participant-card">
            {showDeleteConfirm && (
                <div className="confirmation-modal">
                    <div className="modal-content">
                        <p>Are you sure you want to delete this member?</p>
                        <div className="modal-buttons">
                            <button className="confirm-btn-popup" onClick={confirmDelete}>Yes</button>
                            <button className="cancel-btn-popup" onClick={cancelDelete}>No</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="participant-info">
                <span className="participant-email">{participant.user.firstName} {participant.user.lastName}</span>

                {!isEditing && (
                    <span className={`participant-role ${participant.user.role.name.toLowerCase()}`}>
                        {participant.user.role.name}
                    </span>
                )}
            </div>

            {!isCurrentUser && (
                <div className="participant-actions">
                    {isEditing ? (
                        <div className="role-edit-form">
                            <select
                                value={editingRole.role}
                                onChange={(e) => setEditingRole(prev => ({
                                    ...prev,
                                    role: e.target.value
                                }))}
                                className="role-select"
                            >
                                <option value="Manager">Manager</option>
                                <option value="Developer">Developer</option>
                                <option value="Owner">Owner</option>
                            </select>

                            <div className="edit-buttons">
                                <button
                                    className="action-btn save-btn"
                                    onClick={() => onUpdateRole(participant.user.userId)}
                                >
                                    Save
                                </button>
                                <button
                                    className="action-btn cancel-btn"
                                    onClick={() => setEditingRole({ userId: null, role: '' })}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {!participant.isPending && (
                                <div className="action-buttons">
                                    <button
                                        className="action-btn edit-btn"
                                        onClick={() => setEditingRole({
                                            userId: participant.user.userId,
                                            role: participant.user.role.name
                                        })}
                                    >
                                        Edit Role
                                    </button>
                                    <button
                                        className="action-btn remove-btn"
                                        onClick={handleDelete}
                                    >
                                        Delete Member
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}