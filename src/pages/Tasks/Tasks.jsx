import useTaskService from '../../hooks/useTaskService.js';
import { useState, useEffect, useContext } from 'react';
import './Tasks.css';
import { ProjectContext } from '../../contexts/ProjectContext.jsx';
import TaskList from './Components/TaskList.jsx';
import { DragDropContext } from 'react-beautiful-dnd';
import TaskToolBar from './Components/TaskToolBar.jsx';

export default function Tasks() {
  const projectContext = useContext(ProjectContext);
  const [tasks, setTasks] = useState([]);
  const project = projectContext.currentProject;
  const taskService = useTaskService();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {

    const storedProjectId = localStorage.getItem('currentProjectId');

    async function fetchData() {
      
      const result = await taskService.getTasks(parseInt(storedProjectId, 10));

      setTasks(result.tasks);
      projectContext.setStatuses(result.statuses);
      
    }
    if (storedProjectId !== null) 
      fetchData();
    
    setIsLoading(false);
    console.log({ projectContext });
  }, []);

  
  const onDragEnd = (result) => {
    console.log({ result });
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    const updatedTasks = [...tasks];
    if (destination.droppableId !== source.droppableId) {
      
      const newStatus=projectContext.statuses.find((status)=>status.taskStatusId==destination.droppableId);
      const task = updatedTasks.find(
        (task) => task.taskId == result.draggableId);
        console.log({task});
        task.taskStatus=newStatus;
        
        setTasks(updatedTasks);

        async function fetchData() {
          const patchStatus={
            taskId: task.taskId,
            name: newStatus.name
          };
          const result = await taskService.editStatus(patchStatus);
          console.log({result});
        }
        fetchData();
      }
    
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log("projectContext.role: ",projectContext.role);
  
  return (
    <div>
      <TaskToolBar />
      <DragDropContext onDragEnd={onDragEnd}>
        <TaskList tasks={tasks}></TaskList>
      </DragDropContext>
    </div>
  );
}
