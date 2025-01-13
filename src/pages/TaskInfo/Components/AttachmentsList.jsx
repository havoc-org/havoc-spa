import React from 'react';
import Attachment from './Attachment.jsx';
import folderIcon from '../../../assets/folder.svg';
const AttachmentsList = ({files}) => {
    return (
        <div className="task-files">
                  <div className="files-header">
                   <img className="icons" src={folderIcon} alt="Folder" />
                  <h2>Files</h2>
                  </div>
                  <ul className='attachments-list'>
                          {files.map((file) => (
                            <li key={file.attachmentId}>
                              <Attachment file={file} />
                            </li>
                          ))}
                        </ul>
        </div>
    );
};

export default AttachmentsList;