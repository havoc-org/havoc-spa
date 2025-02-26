import { React, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useTaskService from '../../hooks/useTaskService.js';
import useCommentService from '../../hooks/useCommentsService.js';
import './TaskInfo.css';
import useProject from '../../hooks/useProject.js';
import useAuth from '../../hooks/useAuth.js';
import Description from './Components/Description.jsx';
import AttachmentsList from './Components/AttachmentsList.jsx';
import Comments from './Components/Comments.jsx';
import TaskInfoToolbar from './Components/TaskInfoToolbar.jsx';
import DatePickerSection from '../../components/DatePickerSection/DatePickerSection';
import MembersPopup from './Components/Pop-Ups/MembersPopup.jsx';
import TagPopup from './Components/Pop-Ups/TagPopup.jsx';
import FilePopup from './Components/Pop-Ups/FilePopup.jsx';
import MembersList from './Components/MembersList.jsx';

const TaskInfoPage = () => {
  const projectContext = useProject();
  const isDeveloper=projectContext.isDeveloper();
  const { id } = useParams();
  const navigate = useNavigate();

  const taskService = useTaskService();
  const commentService = useCommentService();

  const [isLoading, setIsLoading] = useState(true);

  const [taskFiles, setTaskFiles] = useState([]);
  const [comments, setComments] = useState([]);
  const [task, setTask] = useState({});

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [deadline, setDeadline] = useState('');

  const [hasChanges, setHasChanges] = useState(false);

  const [showMembersPopup, setShowMembersPopup] = useState(false);
  const [showFilePopup, setShowFilePopup] = useState(false);
  const [showTagPopup, setShowTagPopup] = useState(false);

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
      const response = await commentService.createComment(
        commentPOST,
        task.taskId
      );
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
      if (deadline && startDate && new Date(deadline) < new Date(startDate)) {
        alert('Deadline cannot be before Start Date.');
        return;
      }
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log({ task });
  return (
    <div>
      
      <TaskInfoToolbar task={task} handleDeleteTask={handleDeleteTask}/>
      <div className="task-page">
        <div className="task-main">
          <input
            type="text"
            className="task-name"
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 25))}
          />
          <Description
            description={description}
            setDescription={(val) => setDescription(val.slice(0, 200))}
          />
          <DatePickerSection
            startDate={startDate}
            setStartDate={setStartDate}
            deadline={deadline}
            setDeadline={setDeadline}
            className="task-info-datepicker"
          />
          {!isDeveloper && (
          <button
            className={`save-button ${hasChanges ? 'active' : 'disabled'}`}
            onClick={handleSaveChanges}
            disabled={!hasChanges}
          >
            Save Changes
          </button>
        )}

          <AttachmentsList
            files={taskFiles}
            setFiles={setTaskFiles}
            taskId={id}
            projectId={projectContext.currentProject.projectId}
          />

          <Comments comments={comments} handleAddComment={handleAddComment} />
        </div>

        <div className="task-sidebar">
        {!isDeveloper ? (
            <>
              <button
                className="sidebar-button"
                onClick={() => setShowMembersPopup(true)}
              >
                Members
              </button>
              <button
                className="sidebar-button"
                onClick={() => setShowTagPopup(true)}
              >
                Add tags
              </button>
              <button
                className="sidebar-button"
                onClick={() => setShowFilePopup(true)}
              >
                Add files
              </button>
            </>
          ) : (
            <>
            <button
                className="sidebar-button"
                onClick={() => setShowFilePopup(true)}
              >
                Add files
              </button>
            <MembersList assignments={task.assignments} /> 
            </>
          )}
        </div>
      </div>

      {showMembersPopup && (
        <MembersPopup
          currentProject={projectContext.currentProject}
          task={task}
          setShowMembersPopup={setShowMembersPopup}
        />
      )}

      {showFilePopup && (
        <FilePopup
          projectId={projectContext.currentProject.projectId}
          taskId={id}
          setShowFilePopup={setShowFilePopup}
          setTaskFiles={setTaskFiles}
        />
      )}

      { showTagPopup && (
        <TagPopup
          projectId={projectContext.currentProject.projectId}
          setShowTagPopup={setShowTagPopup}
          task={task}
        />
      )}
    </div>
  );
};

export default TaskInfoPage;
