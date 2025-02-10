import React from 'react';
import './InvitationLink.css';
import './ParticipantsManager.css';



export default function InvitationLink({ inviteCode }) {
    const handleCopy = () => {
        navigator.clipboard.writeText(inviteCode);
    };

    return (
        <div className="invitation-link-container">
            <span className="invite-span">Invitation Code:</span>
            <div className="input-wrapper">
                <input
                    type="text"
                    value={inviteCode || 'Loading...'}
                    readOnly
                    className="invitation-input"
                    placeholder="Invitation link will be here"
                />
            </div>
            <button onClick={handleCopy} className="copy-button">
                Copy
            </button>
        </div>
    );
}