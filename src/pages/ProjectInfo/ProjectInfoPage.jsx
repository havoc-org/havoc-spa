import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useProjectService from '../../hooks/useProjectService';
import useAuth from '../../hooks/useAuth';
import useParticipationService from '../../hooks/useParticipationService';
import ProjectForm from './Components/ProjectForm';
import ParticipantsManager from './Components/ParticipantsManager';
import './ProjectInfo.css';
import exitButton from '../../assets/projectexit.svg';

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

    const updatedProject = {
      name: projectData.name,
      description: projectData.description || null,
      startDate: projectData.startDate ? `${projectData.startDate}T00:00:00Z` : null,
      deadline: projectData.deadline ? `${projectData.deadline}T23:59:59Z` : null,
    };

    setIsUpdating(true);
    try {
      await memoizedProjectService.updateProject(projectId, updatedProject);
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

    try {
      await memoizedParticipationService.addParticipation(projectId, [{ projectId, email, role }]);
      const updatedParticipants = await memoizedParticipationService.getParticipations(projectId);
      setParticipants(updatedParticipants);
    } catch (error) {
      setParticipants(participants.filter(p => p.user.userId !== tempParticipant.user.userId));
      setEmailError('Failed to add participant');
    }
  };

  const handleRemoveParticipant = async (userId) => {
    const originalParticipants = [...participants];
    setParticipants(participants.filter((p) => p.user.userId !== userId));

    try {
      await memoizedParticipationService.deleteParticipation(projectId, userId);
      const updatedParticipants = await memoizedParticipationService.getParticipations(projectId);
      setParticipants(updatedParticipants);
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
      <Link replace to="/tasks">
        <img className="buttons" src={exitButton} alt="Exit Project" />
      </Link>
    );
  }
}