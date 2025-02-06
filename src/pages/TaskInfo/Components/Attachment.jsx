import React from 'react';
import deleteIcon from '../../../assets/delete-button.svg';
import '../TaskInfo.css';
const Attachment = ({ file, handleDelete }) => {
  const handleClick = () => {
    window.open(file.fileLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="attachment-item">
      <div
        className="attachment-info"
        role="button"
        onClick={handleClick}
      >
        <div>
        <span className="file-icon">File id:</span>
        {file.attachmentId}
        </div>
        <div>
        <span className="file-icon">Creator:</span>
        {file.user.firstName} {file.user.lastName}
        </div>
      </div>
      <div className="file-deletion-container" onClick={()=>handleDelete(file.attachmentId)}>
        <img className="file-deletion-icon" src={deleteIcon} alt="delete"  />
      </div>
    </div>
  );
};

export default Attachment;
