import { React, useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import useTaskService from '../../hooks/useTaskService.js';
import './TaskInfo.css';
import useProject from '../../hooks/useProject.js';
import useAuth from '../../hooks/useAuth.js';
import Description from './Components/Description.jsx';
import AttachmentsList from './Components/AttachmentsList.jsx';
import Comments from './Components/Comments.jsx';
import useCommentService from '../../hooks/useCommentsService.js';
import TaskInfoToolbar from './Components/TaskInfoToolbar.jsx';

const TaskInfoPage = () => {
  const projectContext=useProject();
  const user=useAuth().user;
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const taskService = useTaskService();
  const commentService=useCommentService();
  const [task, setTask] = useState({});
  const [files, setFiles] = useState([]); 
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const commentsResult = await commentService.getAllComments(id);
        const filesResult=await taskService.getAllAttachments(id);
        const taskResult = await taskService.getTaskById(id);
        console.log('Fetched result:', commentsResult);
        setComments(commentsResult);
        setFiles(filesResult);
        setTask(taskResult.task);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching task:', error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id]);
  
  async function handleAddComment(content){
     const commentPOST={
      content:content,
      taskId:id,
      projectId:projectContext.currentProject.projectId
     }
     try {
      const response = await commentService.createComment(commentPOST,task.taskId);
      if (response) {
        setComments([...comments, response]);
      }
    } catch (error) {
      console.error('Error creating Comment:', error.message);
    }
  }

  async function handleDeleteTask(){
    try {
      const response = await taskService.deleteTask(id);
      console.log(response);
      navigate('/tasks');
    } catch (error) {
      console.error('Error deleting Comment:', error.message);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <TaskInfoToolbar handleDeleteTask={handleDeleteTask}/>
    <div className="task-page">
      <div className="task-main">
        <input type="text" className="task-name" placeholder={task.name} defaultValue={task.name} />
        <Description description={task.description}/>
        <AttachmentsList files={files}/>
        <Comments comments={comments} handleAddComment={handleAddComment}/>
      </div>
      <div className="task-sidebar">
        <button className="sidebar-button" >Members</button>
        <button className="sidebar-button" >Tags</button>
        <button className="sidebar-button" >Files</button>
        <button className="sidebar-button" >Dates</button>
      </div>
    </div>
    </div>
  );
  
  // function Menu() {
  //   return (
  //     <div className="task-info-menu">
  //       <div className="task-info-menu-item" onClick={() => {}}>
  //         <h3>Members</h3>
  //       </div>
  //       <div className="task-info-menu-item" onClick={() => {}}>
  //         <h3>Tags</h3>
  //       </div>
  //       <div className="task-info-menu-item" onClick={() => {}}>
  //         <h3>Files</h3>
  //       </div>
  //     </div>
  //   );
  // }
};

export default TaskInfoPage;
