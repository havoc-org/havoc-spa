import React from 'react';
import useFileUpload from '../../../../hooks/useFileUpload';
import './FileUpload.css';

export default function FileUpload({ files, setFiles, fileUrls, setFileUrls }) {
  const { uploadFile, uploading, uploadError } = useFileUpload();

  const handleFileUpload = async (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles([...files, ...newFiles]);

    const uploadedFileUrls = await Promise.all(
      newFiles.map(async (file) => {
        const url = await uploadFile(file);
        return url;
      })
    );

    setFileUrls([...fileUrls, ...uploadedFileUrls]);
  };

  const handleFileRemove = (index) => {
    setFiles(files.filter((_, i) => i !== index));
    setFileUrls(fileUrls.filter((_, i) => i !== index));
  };

  return (
    <div className="file-upload-section">
      <h3>Attach file</h3>
      <label className="file-upload-button">
        Choose File
        <input type="file" multiple onChange={handleFileUpload} disabled={uploading} />
      </label>
      {uploading && <p>Uploading files...</p>}
      {uploadError && <p className="error-message">{uploadError}</p>}
      <ul className="file-list">
        {files.map((file, index) => (
          <li className="file-item" key={index}>
            {file.name}
            <button className="file-remove-button" onClick={() => handleFileRemove(index)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}