import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading.jsx';
import TaskDetails from './Components/TaskDetails/TaskDetails';
import FileUpload from './Components/FileUpload/FileUpload';
import DatePickerSection from './Components/DatePickerSection/DatePickerSection';
import TagsSection from './Components/TagsSection/TagsSection';
import AssignMembers from './Components/AssignMembers/AssignMembers';
import useTaskService from '../../hooks/useTaskService';
import useProject from '../../hooks/useProject';
import './CreateTask.css';

export default function CreateTaskContainer() {
  const navigate = useNavigate();
  const { currentProject, statuses } = useProject();
  const taskService = useTaskService();

  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [files, setFiles] = useState([]);
  const [fileUrls, setFileUrls] = useState([]);
  const [tags, setTags] = useState([]);
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateTask = async () => {
    if (!taskName || !taskStatus) {
      setErrorMessage('Please fill in all required fields.');
      return;
    } else {
      setErrorMessage('');
    }

    setIsLoading(true);

    const newTask = {
      name: taskName,
      description: description || null,
      taskStatus: { name: taskStatus },
      start: startDate || null,
      deadline: deadline || null,
      projectId: currentProject.projectId,
      assignments: assignedUsers.map((user) => ({
        userId: user.id,
        description: user.comment || null,
      })),
      attachments: fileUrls.map((url) => ({ fileLink: url })),
      tags: tags,
    };

    try {
      const result = await taskService.createTask(newTask);

      if (result.message) {
        setErrorMessage(result.message);
      } else {
        navigate('/tasks');
      }

      setTaskName('');
      setDescription('');
      setTaskStatus('');
      setStartDate('');
      setDeadline('');
      setAssignedUsers([]);
      setFiles([]);
      setFileUrls([]);
      setTags([]);
    } catch (error) {
      console.error('Error creating task: ', error.message);
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-task-container">
      <div className="create-task-form">
        <TaskDetails
          taskName={taskName}
          setTaskName={setTaskName}
          taskStatus={taskStatus}
          setTaskStatus={setTaskStatus}
          statuses={statuses}
          description={description}
          setDescription={setDescription}
        />
        <FileUpload
          files={files}
          setFiles={setFiles}
          fileUrls={fileUrls}
          setFileUrls={setFileUrls}
        />
        <DatePickerSection
          startDate={startDate}
          setStartDate={setStartDate}
          deadline={deadline}
          setDeadline={setDeadline}
        />
        <TagsSection tags={tags} setTags={setTags} />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        
        {isLoading ? (
          <Loading />
        ) : (
          <button className="submit-button" onClick={handleCreateTask}>
            Create Task
          </button>
        )}
      </div>
      <AssignMembers
        assignedUsers={assignedUsers}
        setAssignedUsers={setAssignedUsers}
        currentProject={currentProject}
      />
    </div>
  );
}