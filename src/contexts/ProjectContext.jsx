import { createContext, useState, useEffect } from 'react';
import useProjectService from '../hooks/useProjectService';
export const ProjectContext = createContext({});

export const ProjectProvider = ({ children }) => {
  const [currentProject, setCurrentProject] = useState({});

  const projectService = useProjectService();
  
  useEffect(() => {
    const storedProjectId = localStorage.getItem('currentProjectId');
    let currentProjectId = null;

    if (storedProjectId !== null) {
      currentProjectId = parseInt(storedProjectId, 10);
      console.log({storedProjectId});

      async function fetchData() {
        const result = await projectService.getProjectById(currentProjectId);
        setCurrentProject(result);
      }

      fetchData();
    }
  }, []);

  function setProject(project) {
    setCurrentProject(project);
    // Сохраняем проект в localStorage
    localStorage.setItem('currentProjectId', project.projectId);
  }

  function leaveProject() {
    setCurrentProject(null);
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
      value={{ currentProject, setProject, leaveProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
