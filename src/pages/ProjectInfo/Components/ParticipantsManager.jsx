import React from 'react';
import AddParticipantForm from './AddParticipantForm';
import ParticipantItem from './ParticipantItem';
import InvitationLink from './InvitationLink'; 
import './ParticipantsManager.css';

export default function ParticipantsManager({
    participants,
    email,
    setEmail,
    role,
    setRole,
    emailError,
    user,
    editingRole,
    setEditingRole,
    onAddParticipant,
    onRemoveParticipant,
    onUpdateRole,
    inviteCode
}) {
    const sortedParticipants = [...participants].sort((a, b) => {
        const aIsCurrent = a.user.userId === user?.id;
        const bIsCurrent = b.user.userId === user?.id;

        if (aIsCurrent && !bIsCurrent) return -1;
        if (!aIsCurrent && bIsCurrent) return 1;
        return 0;
    });

    return (
        <div className="participants-manager">
            <h2>Members of the Project</h2>

            <AddParticipantForm
                email={email}
                setEmail={setEmail}
                role={role}
                setRole={setRole}
                error={emailError}
                onAdd={onAddParticipant}
            />

            <InvitationLink inviteCode={inviteCode}/>

            <div className="participants-list">
                {sortedParticipants.map(participant => (
                    <ParticipantItem
                        key={participant.user.userId}
                        participant={participant}
                        user={user}
                        editingRole={editingRole}
                        setEditingRole={setEditingRole}
                        onUpdateRole={onUpdateRole}
                        onRemove={onRemoveParticipant}
                    />
                ))}
            </div>
        </div>
    );
}