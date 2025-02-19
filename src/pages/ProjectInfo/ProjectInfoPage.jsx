import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useProjectService from '../../hooks/useProjectService';
import useAuth from '../../hooks/useAuth';
import useParticipationService from '../../hooks/useParticipationService';
import ProjectForm from './Components/ProjectForm';
import ParticipantsManager from './Components/ParticipantsManager';
import './ProjectInfo.css';

export default function ProjectInfoPage() {
  const storedId = localStorage.getItem('currentProjectId');
  const projectId = storedId ? JSON.parse(storedId) : null;
  const [editingRole, setEditingRole] = useState({ userId: null, role: '' });
  const { user } = useAuth();
  const projectService = useProjectService();
  const participationService = useParticipationService();
  const navigate = useNavigate();

  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    startDate: '',
    deadline: '',
    inviteCode: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isFetching, setIsFetching] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Developer');
  const [participants, setParticipants] = useState([]);
  const [emailError, setEmailError] = useState('');

  const memoizedProjectService = useMemo(() => projectService, []);
  const memoizedParticipationService = useMemo(() => participationService, []);

  const ExitIcon = () => (
    <svg className='taskbar-button' width="43" height="43" viewBox="0 0 47 46" fill="currentColor">
      <path d="M32.0573 4H27.0382C20.8608 4 17 7.77667 17 13.8193V21.4671H29.0651C29.8566 21.4671 30.5129 22.1091 30.5129 22.8833C30.5129 23.6576 29.8566 24.2996 29.0651 24.2996H17V31.9473C17 37.99 20.8608 41.7667 27.0382 41.7667H32.0379C38.2153 41.7667 42.0761 37.99 42.0761 31.9473V13.8193C42.0954 7.77667 38.2346 4 32.0573 4Z" fill="currentColor" />
      <path d="M8.80325 21.2437L12.7992 17.3348C13.0888 17.0516 13.2239 16.6928 13.2239 16.334C13.2239 15.9752 13.0888 15.5976 12.7992 15.3332C12.2394 14.7856 11.3128 14.7856 10.753 15.3332L4.28608 21.6591C3.72626 22.2067 3.72626 23.1131 4.28608 23.6607L10.753 29.9867C11.3128 30.5343 12.2394 30.5343 12.7992 29.9867C13.359 29.439 13.359 28.5326 12.7992 27.985L8.80325 24.0762H17.3743V21.2437H8.80325Z" fill="currentColor" />
    </svg>
  );

  useEffect(() => {
    async function fetchProject() {
      try {
        if (!projectId || isNaN(Number(projectId))) {
          setErrorMessage('Invalid project ID');
          setIsFetching(false);
          return;
        }

        const projectData = await memoizedProjectService.getProjectById(projectId);
        if (projectData) {
          setProjectData({
            name: projectData.name || '',
            description: projectData.description || '',
            startDate: projectData.start ? projectData.start.substring(0, 10) : '',
            deadline: projectData.deadline ? projectData.deadline.substring(0, 10) : '',
            inviteCode: projectData.inviteCode || '',
          });
        }

        const participantsData = await memoizedParticipationService.getParticipations(projectId);
        setParticipants(participantsData);
      } catch (error) {
        setErrorMessage('Failed to load project information');
      } finally {
        setIsFetching(false);
      }
    }

    fetchProject();
  }, [projectId, memoizedProjectService, memoizedParticipationService]);

  const handleDeleteProject = async () => {
    try {
      const response = await memoizedProjectService.deleteProject(projectId);
      console.log(response);
      navigate('/projects');
    } catch (error) {
      console.error('Error deleting Project:', error.message);
    }
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();

    if (!projectData.name) {
      setErrorMessage('Please fill required fields');
      return;
    }

    
    if (projectData.deadline && projectData.startDate && new Date(projectData.deadline) < new Date(projectData.startDate)) {
      setErrorMessage('Deadline cannot be before Start Date.');
      return;
    }


    const updatedProject = {
      name: projectData.name,
      description: projectData.description || null,
      startDate: projectData.startDate ? `${projectData.startDate}T00:00:00Z` : null,
      deadline: projectData.deadline ? `${projectData.deadline}T23:59:59Z` : null,
    };


    setIsUpdating(true);
    try {
      const response = await memoizedProjectService.updateProject(projectId, updatedProject);


      setSuccessMessage('Project updated successfully');
      navigate('/tasks');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Update error');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddParticipant = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError('Invalid email');
      return;
    }

    const tempParticipant = {
      projectId: projectId,
      user: {
        userId: `temp-${Date.now()}`,
        email,
        role: { name: role },
      },
      isPending: true,
    };

    setParticipants([...participants, tempParticipant]);
    setEmail('');
    setEmailError('');


    const result = await memoizedParticipationService.addParticipation(projectId, [{ projectId, email, role }]);
    const updatedParticipants = await memoizedParticipationService.getParticipations(projectId);
    setParticipants(updatedParticipants);
    if (result.message == 'User not found') {
      setEmailError(result.message);
    } else if (result.message.includes('This participation already exists')) {
      setEmailError('This user is already in the project');
    } else if (result.message) {
      setEmailError('sadasd')
    }

  };

  const handleRemoveParticipant = async (userId) => {
    const originalParticipants = [...participants];
    setParticipants(participants.filter((p) => p.user.userId !== userId));

    try {
      await memoizedParticipationService.deleteParticipation(projectId, userId);
      const updatedParticipants = await memoizedParticipationService.getParticipations(projectId);
      setParticipants(updatedParticipants);
      window.location.reload();
    } catch (error) {
      setParticipants(originalParticipants);
    }
  };

  const handleUpdateRole = async (userId) => {
    const participant = participants.find(p => p.user.userId === userId);
    if (!participant || !editingRole.role) return;

    const originalRole = participant.user.role.name;
    const updatedParticipants = participants.map(p =>
      p.user.userId === userId
        ? { ...p, user: { ...p.user, role: { name: editingRole.role } } }
        : p
    );

    setParticipants(updatedParticipants);
    setEditingRole({ userId: null, role: '' });

    try {
      await memoizedParticipationService.updateParticipationRole(projectId, userId, editingRole.role);
      const freshParticipants = await memoizedParticipationService.getParticipations(projectId);
      setParticipants(freshParticipants);
    } catch (error) {
      const revertedParticipants = participants.map(p =>
        p.user.userId === userId
          ? { ...p, user: { ...p.user, role: { name: originalRole } } }
          : p
      );
      setParticipants(revertedParticipants);
    }
  };

  if (isFetching) return <div>Loading project information...</div>;

  return (
    <div className="project-info-container">
      <ProjectForm
        projectData={projectData}
        setProjectData={setProjectData}
        handleSubmit={handleUpdateProject}
        errorMessage={errorMessage}
        successMessage={successMessage}
        isUpdating={isUpdating}
        onDelete={handleDeleteProject}
      />

      <ParticipantsManager
        participants={participants}
        email={email}
        setEmail={setEmail}
        role={role}
        setRole={setRole}
        emailError={emailError}
        user={user}
        editingRole={editingRole}
        setEditingRole={setEditingRole}
        onAddParticipant={handleAddParticipant}
        onRemoveParticipant={handleRemoveParticipant}
        onUpdateRole={handleUpdateRole}
        inviteCode={projectData.inviteCode}
      />

      <Exit />
    </div>
  );

  function Exit() {
    return (
      <Link onClick={() =>
        (window.location.href = '/tasks')}>
        <ExitIcon />
      </Link>
    );
  }
}
