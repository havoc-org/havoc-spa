import React from 'react';
import deleteIcon from '../../../assets/delete-button.svg';
import '../TaskInfo.css';
import downloadIcon from '../../../assets/download.svg';

import useProject from '../../../hooks/useProject.js';
const Attachment = ({ file, handleDelete }) => {
  const projectContext = useProject();
  const isDeveloper=projectContext.isDeveloper();
  const handleClick = () => {
    window.open(file.fileLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="attachment-item">
      <div
        className="attachment-info"
        role="button"
        
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
      <div className="file-deletion-container" >
        <img className="file-download-icon" src={downloadIcon} alt="download" onClick={handleClick} />
        {!isDeveloper && (
          <img className="file-deletion-icon" src={deleteIcon} alt="delete" onClick={() => handleDelete(file.attachmentId)} />
        )}
        </div>
    </div>
  );
};

export default Attachment;
