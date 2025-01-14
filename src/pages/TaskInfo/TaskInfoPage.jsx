import { React, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useTaskService from '../../hooks/useTaskService.js';
import exitButton from '../../assets/projectexit.svg';
import './TaskInfo.css';
import useProject from '../../hooks/useProject.js';
import useAuth from '../../hooks/useAuth.js';
import Description from './Components/Description.jsx';
import AttachmentsList from './Components/AttachmentsList.jsx';
import Comments from './Components/Comments.jsx';
import useCommentService from '../../hooks/useCommentsService.js';

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
      console.log(response);
      if (response) {
        setComments([...comments, response]);
      }
    } catch (error) {
      console.error('Error creating Comment:', error.message);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Exit />
    <div className="task-page">
      <div className="task-main">
        <input type="text" className="task-name" placeholder={task.name} defaultValue={task.name} />
        <Description description={task.description}/>
        <AttachmentsList files={files}/>
        <Comments comments={comments} handleAddComment={handleAddComment}/>
      </div>
      <div className="task-sidebar">
        <button className="sidebar-button" onClick={() => {}}>Members</button>
        <button className="sidebar-button" onClick={() => {}}>Tags</button>
        <button className="sidebar-button" onClick={() => {}}>Files</button>
        <button className="sidebar-button" onClick={() => {}}>Dates</button>
      </div>
    </div>
    </div>
  );

  function Exit() {
    return (
      <Link replace={true} to="/tasks">
        <img className="buttons" src={exitButton} alt="Create Task" />
      </Link>
    );
  }
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
