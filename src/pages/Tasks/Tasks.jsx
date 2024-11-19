import { Link } from 'react-router-dom';
import useTaskService from '../../hooks/useTaskService.js';
import { useState, useEffect, useContext } from 'react';
import createButton from '../../assets/AddNewTask.svg';
import exitButton from '../../assets/projectexit.svg';
import './Tasks.css';
import { ProjectContext } from '../../contexts/ProjectContext.jsx';
import TaskList from './Components/TaskList.jsx';

export default function Tasks() {
  const projectContext = useContext(ProjectContext);
  const [tasks, setTasks] = useState([]);
  const project = projectContext.currentProject;
  const taskService = useTaskService();
  useEffect(() => {
    console.log({ projectContext });
    async function fetchData() {
      const result = await taskService.getTasks(project.projectId);
      setTasks(result);
    }
    fetchData();
    projectContext.setStatuses(tasks.statuses);
  }, []);

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
      <TaskList data={tasks}></TaskList>
    </div>
  );
}
