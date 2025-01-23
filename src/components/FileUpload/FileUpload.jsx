import React from 'react';
import './FileUpload.css';

function FileUpload({ files, setFiles }) {
  const handleFileUpload = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles([...files, ...newFiles]);
  };

  const handleFileRemove = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="file-upload-section">
      <h3>Attach file</h3>
      <label className="file-upload-button">
        Choose File
        <input type="file" multiple onChange={handleFileUpload} />
      </label>
      <ul className="file-list">
        {files.map((file, index) => (
          <li className="file-item" key={index}>
            <span className="file-name">{file.name}</span>
            <button className="file-remove-button" onClick={() => handleFileRemove(index)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileUpload;
