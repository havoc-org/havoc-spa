import { React, useState } from 'react';
import useAssignmentService from '../../../../hooks/useAssignmentService';
import AssignUsers from '../AssignUsers';
import './MembersPopup.css';
const MembersPopup = ({ currentProject, task, setShowMembersPopup }) => {
  const [newAssignedUsers, setNewAssignedUsers] = useState([]);
  const [removedUsers, setRemovedUsers] = useState([]);
  const assignmentService = useAssignmentService();
  async function handleConfirmAsignments() {
    try {
      if (newAssignedUsers.length > 0) {
        console.log({ newAssignedUsers });
        const formattedNewAssignedUsers = newAssignedUsers.map(user => ({
          UserId: user.id,
          Description: user.comment || null,
        }));
        await assignmentService.addAssignments(
          formattedNewAssignedUsers,
          currentProject.projectId,
          task.taskId
        );
        window.location.reload();
      }
      if (removedUsers.length > 0) {
        console.log({ removedUsers });
        const formattedRemovedUsers = removedUsers.map(user => ({
          UserId: user.id
        }));
        console.log({ formattedRemovedUsers });
        await assignmentService.deleteAssignments(
          formattedRemovedUsers,
          task.taskId,
          currentProject.projectId
        );
        window.location.reload();
      }
      setNewAssignedUsers([]);
      setRemovedUsers([]);
      setShowMembersPopup(false);
    } catch (error) {
      console.error('Error adding assignments:', error);
      alert('Failed to add assignments.');
    }
  }

  return (
    <div className="popup-taskinfo-overlay">
      <div className="popup-taskinfo-content">
        <AssignUsers
          newUsers={newAssignedUsers}
          removedUsers={removedUsers}
          setNewUsers={setNewAssignedUsers}
          setRemovedUsers={setRemovedUsers}
          currentProject={currentProject}
          task={task}
        />

        <div className="popup-taskinfo-footer">
          <button
            className="close-button"
            onClick={() => setShowMembersPopup(false)}
          >
            Cancel
          </button>
          <button className="add-button" onClick={handleConfirmAsignments}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default MembersPopup;
