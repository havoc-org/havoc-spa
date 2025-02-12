import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading.jsx';
import TaskDetails from './Components/TaskDetails/TaskDetails';
import FileUpload from '../../components/FileUpload/FileUpload.jsx';
import DatePickerSection from '../../components/DatePickerSection/DatePickerSection';
import TagsSection from '../../components/TagsSection/TagsSection.jsx';
import AssignMembers from '../../components/AssignMembers/AssignMembers.jsx';
import useTaskService from '../../hooks/useTaskService';
import useProject from '../../hooks/useProject';
import useFileUpload from '../../hooks/useFileUpload';
import './CreateTask.css';

export default function CreateTaskContainer() {
  const navigate = useNavigate();
  const { currentProject, statuses } = useProject();
  const taskService = useTaskService();
  const { uploadFile } = useFileUpload();

  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [files, setFiles] = useState([]);
  const [tags, setTags] = useState([]);
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!currentProject.participations || !statuses) {
    return <Loading />;
  }

  const handleCreateTask = async () => {
    if (!taskName || !taskStatus) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const uploadedFileUrls = await Promise.all(
        files.map(async (file) => {
          const url = await uploadFile(file);
          return url;
        })
      );

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
        attachments: uploadedFileUrls.map((url) => ({ fileLink: url })),
        tags: tags,
      };

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
      setTags([]);
    } catch (error) {
      console.error('Error creating task: ', error.message);
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-task-container">
      <div className="create-task-form">
        <TaskDetails
          taskName={taskName}
          setTaskName={(value) => {
            if (value.length <= 25) setTaskName(value);
          }}
          taskStatus={taskStatus}
          setTaskStatus={setTaskStatus}
          statuses={statuses}
          description={description}
          setDescription={(value) => {
            if (value.length <= 200) setDescription(value);
          }}
        />
        <FileUpload files={files} setFiles={setFiles} />
        <DatePickerSection
          startDate={startDate}
          setStartDate={setStartDate}
          deadline={deadline}
          setDeadline={setDeadline}
        />
        <TagsSection tags={tags} setTags={setTags} />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        
        {isSubmitting ? (
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
