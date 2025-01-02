import { createContext,useContext, useState, useEffect } from 'react';
import useProjectService from '../hooks/useProjectService';
import { AuthContext } from './AuthContext';
export const ProjectContext = createContext({});

export const ProjectProvider = ({ children }) => {
  const authContext = useContext(AuthContext);
  const [currentProject, setCurrentProject] = useState({});
  const [statuses, setStatuses] = useState([]);
  const projectService = useProjectService();
  const [role, setRole] = useState({});

  useEffect(() => {
    const storedProjectId = localStorage.getItem('currentProjectId');
    let currentProjectId = null;

    async function fetchData() {
      const result = await projectService.getProjectById(currentProjectId);
      setProject(result);
    }

    if (storedProjectId !== null) {
      currentProjectId = parseInt(storedProjectId, 10);
      fetchData();
    }
  }, []);

   function setProject(project) {
    setCurrentProject(project);
    setRole(getUserRole(project));

    localStorage.setItem('currentProjectId', project.projectId);
  }

   function getUserRole(project) {
    if (!project || !project.participations) return null;
    const userParticipation = project.participations.find(
      (participation) => participation.user.email === authContext.user.email
    );
    return userParticipation ? userParticipation.user.role.name : null;
  }

  function leaveProject() {
    setCurrentProject(null);
    setRole(null);
    // Удаляем проект из localStorage
    localStorage.removeItem('currentProjectId');
  }

  // Используем useEffect для обновления localStorage при изменении currentProject
  // useEffect(() => {
  //   if (currentProject) {
  //     localStorage.setItem('currentProjectId', JSON.stringify(project.projectId));
  //   } else {
  //     localStorage.removeItem('currentProjectId');
  //   }
  // }, [currentProject]);

  return (
    <ProjectContext.Provider
      value={{
        currentProject,
        statuses,
        role,
        setProject,
        leaveProject,
        setStatuses,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
