import React from 'react';
import Attachment from './Attachment.jsx';
import useAttachmentService from '../../../hooks/useAttachmentService';

const FolderIcon = () => (
<svg width="35" height="35" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M33.201 6.89232C33.427 7.24752 33.0399 7.6613 32.6294 7.568V7.568C31.8265 7.32883 30.9381 7.20925 30.0327 7.20925H24.2178C24.0606 7.20925 23.9126 7.1353 23.8181 7.00962L21.7473 4.25383V4.25383C21.5067 3.91292 21.7341 3.41675 22.1514 3.41675H26.8552C29.5219 3.41675 31.871 4.80175 33.201 6.89232Z" fill="currentColor"/>
<path d="M34.4062 11.1726C33.6716 10.643 32.8345 10.2501 31.9291 10.028C31.3141 9.85716 30.682 9.77175 30.0328 9.77175H23.6778C22.687 9.77175 22.6187 9.68633 22.0891 8.98591L19.6974 5.80841C18.587 4.32216 17.7157 3.41675 14.9312 3.41675H10.9678C6.79949 3.41675 3.41699 6.79925 3.41699 10.9676V30.0326C3.41699 34.2009 6.79949 37.5834 10.9678 37.5834H30.0328C34.2012 37.5834 37.5837 34.2009 37.5837 30.0326V17.3226C37.5837 14.7772 36.3366 12.5392 34.4062 11.1726ZM24.5832 27.9142H16.4003C15.7341 27.9142 15.2216 27.3847 15.2216 26.7184C15.2216 26.0692 15.7341 25.5226 16.4003 25.5226H24.5832C25.2495 25.5226 25.7791 26.0692 25.7791 26.7184C25.7791 27.3847 25.2495 27.9142 24.5832 27.9142Z" fill="currentColor"/>
</svg>
)

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
                   <FolderIcon/>
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