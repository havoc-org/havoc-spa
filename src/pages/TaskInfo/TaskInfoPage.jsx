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

const TaskInfoPage = () => {
  const projectContext = useProject();
  const user = useAuth().user;
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const taskService = useTaskService();
  const commentService = useCommentService();
  const [task, setTask] = useState({});
  const [files, setFiles] = useState([]);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [deadline, setDeadline] = useState('');

  const [hasChanges, setHasChanges] = useState(false); // Отслеживаем изменения

  useEffect(() => {
    async function fetchData() {
      try {
        const commentsResult = await commentService.getAllComments(id);
        const filesResult = await taskService.getAllAttachments(id);
        const taskResult = await taskService.getTaskById(id);

        setComments(commentsResult);
        setFiles(filesResult);
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

  // Обновляем состояние hasChanges при изменениях
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
        setHasChanges(false); // Сбрасываем состояние изменений
      }
    } catch (error) {
      console.error('Error updating task:', error.message);
      alert('Failed to save changes.');
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
          <Description description={description} setDescription={setDescription} />
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
          <AttachmentsList files={files} />
          <Comments comments={comments} handleAddComment={handleAddComment} />
        </div>
        <div className="task-sidebar">
          <button className="sidebar-button">Members</button>
          <button className="sidebar-button">Tags</button>
          <button className="sidebar-button">Files</button>
        </div>
      </div>
    </div>
  );
};

export default TaskInfoPage;
