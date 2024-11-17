import { createContext, useState} from 'react';
export const ProjectContext = createContext({});


export const ProjectProvider=({children})=>{
  const [currentProject,setCurrentProject] = useState({});

  function setProject(project){
    setCurrentProject(project);
  }
  function leaveProject(){
    setCurrentProject(null);
  }  

  return (
    <ProjectContext.Provider
      value={{ currentProject,setProject,leaveProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
}