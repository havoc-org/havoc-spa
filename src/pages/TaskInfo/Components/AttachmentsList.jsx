import React from 'react';
import Attachment from './Attachment.jsx';
import folderIcon from '../../../assets/folder.svg';
import useAttachmentService from '../../../hooks/useAttachmentService';
const AttachmentsList = ({files,setFiles,taskId,projectId}) => {
  const attachmentService = useAttachmentService();
  async function handleDelete(id) {
    try {
      const response = await attachmentService.deleteAttachment(projectId,taskId,id);
      console.log({response});
      setFiles(files.filter((file) => file.attachmentId !== id));
      
    } catch (error) {
      console.error('Error deleting file:', error.message);
    }
  }
  console.log({files});
    return (
        <div className="task-files">
                  <div className="files-header">
                   <img className="icons" src={folderIcon} alt="Folder" />
                  <h2>Files</h2>
                  </div>
                  <ul className='attachments-list'>
                          {files.map((file) => (
                            <li key={file.attachmentId}>
                              <Attachment file={file} handleDelete={handleDelete}/>
                            </li>
                          ))}
                        </ul>
        </div>
    );
};

export default AttachmentsList;