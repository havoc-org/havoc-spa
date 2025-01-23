import { React, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useTaskService from '../../hooks/useTaskService.js';
import './TaskInfo.css';
import useProject from '../../hooks/useProject.js';
import useAuth from '../../hooks/useAuth.js';
import Description from './Components/Description.jsx';
import AttachmentsList from './Components/AttachmentsList.jsx';
import Comments from './Components/Comments.jsx';
import useCommentService from '../../hooks/useCommentsService.js';
import TaskInfoToolbar from './Components/TaskInfoToolbar.jsx';
import DatePickerSection from '../../components/DatePickerSection/DatePickerSection';
import FileUpload from '../../components/FileUpload/FileUpload';
import TagsSection from '../../components/TagsSection/TagsSection';
import useFileUpload from '../../hooks/useFileUpload';
import useAttachmentService from '../../hooks/useAttachmentService';
import useTagService from '../../hooks/useTagService';

const TaskInfoPage = () => {
  const projectContext = useProject();
  const user = useAuth().user;
  const { id } = useParams();
  const navigate = useNavigate();

  const taskService = useTaskService();
  const commentService = useCommentService();
  const attachmentService = useAttachmentService();
  const tagService = useTagService();

  const [isLoading, setIsLoading] = useState(true);

  const [taskFiles, setTaskFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [comments, setComments] = useState([]);
  const [task, setTask] = useState({});
  const [selectedTags, setSelectedTags] = useState([]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [deadline, setDeadline] = useState('');

  const [hasChanges, setHasChanges] = useState(false);

  const [showFilePopup, setShowFilePopup] = useState(false);
  const [showTagPopup, setShowTagPopup] = useState(false);

  const { uploadFile, uploading, uploadError } = useFileUpload();

  useEffect(() => {
    async function fetchData() {
      try {
        const commentsResult = await commentService.getAllComments(id);
        const filesResult = await taskService.getAllAttachments(id);
        const taskResult = await taskService.getTaskById(id);

        setComments(commentsResult);
        setTaskFiles(filesResult);
        setTask(taskResult.task);

        setName(taskResult.task.name || '');
        setDescription(taskResult.task.description || '');
        setStartDate(taskResult.task.start || '');
        setDeadline(taskResult.task.deadline || '');

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching task:', error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    if (
      name !== task.name ||
      description !== task.description ||
      startDate !== task.start ||
      deadline !== task.deadline
    ) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }
  }, [name, description, startDate, deadline, task]);

  async function handleAddComment(content) {
    const commentPOST = {
      content: content,
      taskId: id,
      projectId: projectContext.currentProject.projectId,
    };
    try {
      const response = await commentService.createComment(commentPOST, task.taskId);
      if (response) {
        setComments([...comments, response]);
      }
    } catch (error) {
      console.error('Error creating Comment:', error.message);
    }
  }

  async function handleDeleteTask() {
    try {
      const response = await taskService.deleteTask(id);
      console.log(response);
      navigate('/tasks');
    } catch (error) {
      console.error('Error deleting Task:', error.message);
    }
  }

  async function handleSaveChanges() {
    const updatedTask = {
      taskId: id,
      name,
      description,
      start: startDate || null,
      deadline: deadline || null,
    };
    try {
      const response = await taskService.editTask(updatedTask);
      if (response) {
        console.log('Task updated successfully:', response);
        setTask((prev) => ({ ...prev, ...updatedTask }));
        alert('Changes saved successfully!');
        setHasChanges(false);
      }
    } catch (error) {
      console.error('Error updating task:', error.message);
      alert('Failed to save changes.');
    }
  }

  async function handleAddFiles() {
    try {
      const attachments = [];
      for (const file of selectedFiles) {
        const url = await uploadFile(file);
        attachments.push({ fileLink: url });
      }

      await attachmentService.addAttachments(attachments, projectContext.currentProject.projectId, id);

      const updatedFiles = await taskService.getAllAttachments(id);
      setTaskFiles(updatedFiles);

      setSelectedFiles([]);
      setShowFilePopup(false);
    } catch (error) {
      console.error('Error uploading attachments:', error);
    }
  }

  async function handleAddTags() {
    try {
      await tagService.addtags(selectedTags, projectContext.currentProject.projectId, id);

      setSelectedTags([]);
      setShowTagPopup(false);
    } catch (error) {
      console.error('Error adding tags:', error);
      alert('Failed to add tags.');
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <TaskInfoToolbar handleDeleteTask={handleDeleteTask} />
      <div className="task-page">
        <div className="task-main">
          <input
            type="text"
            className="task-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Description
            description={description}
            setDescription={setDescription}
          />
          <DatePickerSection
            startDate={startDate}
            setStartDate={setStartDate}
            deadline={deadline}
            setDeadline={setDeadline}
            className="task-info-datepicker"
          />
  
          <button
            className={`save-button ${hasChanges ? 'active' : 'disabled'}`}
            onClick={handleSaveChanges}
            disabled={!hasChanges}
          >
            Save Changes
          </button>
  
          <AttachmentsList files={taskFiles} />
  
          <Comments comments={comments} handleAddComment={handleAddComment} />
        </div>
  
        <div className="task-sidebar">
          <button className="sidebar-button">Members</button>
          <button
            className="sidebar-button"
            onClick={() => setShowTagPopup(true)}
          >
            Tags
          </button>
          <button
            className="sidebar-button"
            onClick={() => setShowFilePopup(true)}
          >
            Files
          </button>
        </div>
      </div>
  
      {showFilePopup && (
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
      )}
  
      {showTagPopup && (
        <div className="popup-taskinfo-overlay">
          <div className="popup-taskinfo-content">
            <TagsSection tags={selectedTags} setTags={setSelectedTags} />
            <div className="popup-taskinfo-footer">
              <button
                className="close-button"
                onClick={() => setShowTagPopup(false)}
              >
                Close
              </button>
              <button
                className="add-button"
                onClick={handleAddTags}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default TaskInfoPage;
