import { Link } from 'react-router-dom';
import useTaskService from '../../hooks/useTaskService.js';
import { useState, useEffect, useContext } from 'react';
import createButton from '../../assets/AddNewTask.svg';
import exitButton from '../../assets/projectexit.svg';
import './Tasks.css';
import { ProjectContext } from '../../contexts/ProjectContext.jsx';
import TaskList from './Components/TaskList.jsx';
import { DragDropContext } from 'react-beautiful-dnd';

export default function Tasks() {
  const projectContext = useContext(ProjectContext);
  const [tasks, setTasks] = useState([]);
  const project = projectContext.currentProject;
  const taskService = useTaskService();
  useEffect(() => {
    console.log({ projectContext });

    const storedProjectId = localStorage.getItem('currentProjectId');

    async function fetchData() {
      
      const result = await taskService.getTasks(parseInt(storedProjectId, 10));

      setTasks(result.tasks);
      projectContext.setStatuses(result.statuses);
    }
    if (storedProjectId !== null) 
    fetchData();
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

  return (
    <div>
      <div className="task-toolbar">
        <div>
          <Link to="create">
            <img className="buttons" src={createButton} alt="Create Task" />
          </Link>
        </div>
        <div className="task-toolbar">
          <Link to="edit">
            <button className="edit-project">Edit Project</button>
          </Link>
          <Link replace={true} to="/projects">
            <img className="buttons" src={exitButton} alt="Create Task" />
          </Link>
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <TaskList tasks={tasks}></TaskList>
      </DragDropContext>
    </div>
  );
}
