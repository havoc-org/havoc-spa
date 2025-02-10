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
  const [sortValue, setSortValue] = useState('deadline');
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
  
  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortValue === 'deadline') {
      const dateA = a.deadline ? new Date(a.deadline) : new Date(0); // Use epoch date for null values
      const dateB = b.deadline ? new Date(b.deadline) : new Date(0);
      return dateA - dateB;
    } else if (sortValue === 'startDate') {
      const dateA = a.start ? new Date(a.start) : new Date(0); // Use epoch date for null values
      const dateB = b.start ? new Date(b.start) : new Date(0);
      return dateA - dateB;
    }
    else if (sortValue === 'name') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });
  console.log({ sortedTasks });
  return (
    <div>
      <TaskToolBar sortValue={sortValue} setSortValue={setSortValue}/>
      <DragDropContext onDragEnd={onDragEnd} >
        <TaskList tasks={sortedTasks}></TaskList>
      </DragDropContext>
    </div>
  );
}
