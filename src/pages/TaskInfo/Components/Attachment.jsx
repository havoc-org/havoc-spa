import React from 'react';

const Attachment = ({ file }) => {
  const handleClick = () => {
    window.open(file.fileLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="file-item" role="button" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <span className="file-icon">File</span>{file.attachmentId}
    </div>
  );
};

export default Attachment;
