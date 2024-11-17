import { Link } from 'react-router-dom';
import useTaskService from '../../hooks/useTaskService.js';
import { useState, useEffect,useContext } from 'react';
import createButton from '../../assets/AddNewTask.svg';
import exitButton from '../../assets/projectexit.svg';
import './Tasks.css';
import Tile from '../../components/Tile/Tile.jsx';
import { ProjectContext } from '../../contexts/ProjcetContext.jsx';


export default function Tasks({ role, projectId }) {
  const projectContext=useContext(ProjectContext);
  const [tasks, setTasks] = useState([]);
  const project = projectContext.currentProject;
  const taskService = useTaskService();
  useEffect(() => {
    console.log({projectContext});
    async function fetchData() {
      const result = await taskService.getTasks(project.projectId);
      setTasks(result);
      setOriginal(result);
    }
    fetchData();
    return(()=>{projectContext.leaveProject();});
  }, []);

  return (
    <div>
      <div className="task-toolbar">
        <div>
          <Link to="create">
            <img
              className="buttons"
              src={createButton}
              alt="Create Task"
            />
          </Link>
        </div>
        <div className="task-toolbar">
          <Link to="edit">
            <button className="edit-project">Edit Project</button>
          </Link>
          <Link replace={true} to="/projects">
            <img
              className="buttons"
              src={exitButton}
              alt="Create Task"
            />
          </Link>
        </div>
      </div>
      <div className="status-list">
                
      </div>
    </div>
  );

  const TaskList = ({tasks}) => {
    return (
      <div>
        {tasks.map((task) => (
          <TaskCard key={task.taskId} task={task} />
        ))}
      </div>
    );
  };
  
  const TaskCard = ({ task }) => {
    return (
      <div className="task-card">
        <h3>{task.name}</h3>
        <p><strong>Tag:</strong> {task.tags[0]?.name || 'No Tag'}</p>
        <p><strong>Start:</strong> {task.start}</p>
        <p><strong>Deadline:</strong> {task.deadline}</p>
        <p><strong>Comments:</strong> {task.comments.length}</p>
        <p><strong>Assigned Users:</strong> {task.assignments.length}</p>
      </div>
    );
  };
}
