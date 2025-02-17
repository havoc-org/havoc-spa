import React from 'react';

const MembersList = ({assignments}) => {
    console.log({assignments});
    return (
        <div>
      <h2>Members List</h2>
      <div className="members-container">
      <ul className="assigned-updated-users-list">
        {assignments.map((assignment, index) => (
          <li key={index} className="assigned-user-item">
            <div className="user-info">
            <div>
              <strong>Name:</strong> {assignment.user.firstName} {assignment.user.lastName}
            </div>
            <div>
              <strong>Email:</strong> {assignment.user.email}
            </div>
            <div>
              <strong>Description:</strong> {assignment.description}
            </div>
            </div>
          </li>
        ))}
      </ul>
      </div>
    </div>
    );
};

export default MembersList;