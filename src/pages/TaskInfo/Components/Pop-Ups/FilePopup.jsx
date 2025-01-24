import {React,useState} from 'react';
import useAttachmentService from '../../../../hooks/useAttachmentService';
import FileUpload from '../../../../components/FileUpload/FileUpload';
import useFileUpload from '../../../../hooks/useFileUpload';
import useTaskService from '../../../../hooks/useTaskService.js';
const FilePopup = ({projectId,taskId, setShowFilePopup, setTaskFiles}) => {
    const taskService = useTaskService();
    
    const [selectedFiles, setSelectedFiles] = useState([]);
    const attachmentService = useAttachmentService();
    const { uploadFile, uploading, uploadError } = useFileUpload();
    
    async function handleAddFiles() {
        try {
          const attachments = [];
          for (const file of selectedFiles) {
            const url = await uploadFile(file);
            attachments.push({ fileLink: url });
          }
    
          await attachmentService.addAttachments(attachments, projectId, taskId);
    
          const updatedFiles = await taskService.getAllAttachments(taskId);
          setTaskFiles(updatedFiles);
    
          setSelectedFiles([]);
          setShowFilePopup(false);
        } catch (error) {
          console.error('Error uploading attachments:', error);
        }
      }

    return (
        <div className="popup-taskinfo-overlay">
          <div className="popup-taskinfo-content">
            <FileUpload files={selectedFiles} setFiles={setSelectedFiles} />
  
            {uploading && <div>Uploading to Cloudinary...</div>}
            {uploadError && <div style={{ color: 'red' }}>{uploadError}</div>}
  
            <div className="popup-taskinfo-footer">
              <button
                className="close-button"
                onClick={() => setShowFilePopup(false)}
              >
                Close
              </button>
              <button
                className="add-button"
                onClick={handleAddFiles}
                disabled={uploading}
              >
                Add
              </button>
            </div>
          </div>
        </div>
    );
};

export default FilePopup;