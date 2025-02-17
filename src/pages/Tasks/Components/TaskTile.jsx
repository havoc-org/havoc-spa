

import Tag from './Tag';
import { Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';

const TaskTile = ({ task, index }) => {
  let tag = task.tags?.length > 0 ? task.tags.at(-1) : null;
  const navigate = useNavigate();
  // tag={
  //   name: "sadsadsASDASDASDASDSAasda",
  //   colorHex: "#123456"
  // }

  const MemberIcon = () => (
    <svg className='tasktile-icon' width="22" height="22" viewBox="0 0 45 41" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M33.7504 12.2316C33.6379 12.2145 33.5066 12.2145 33.3941 12.2316C30.8066 12.1462 28.7441 10.2158 28.7441 7.82413C28.7441 5.38121 30.9004 3.41663 33.5816 3.41663C36.2629 3.41663 38.4191 5.3983 38.4191 7.82413C38.4004 10.2158 36.3379 12.1462 33.7504 12.2316Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M31.819 24.6683C34.3877 25.0612 37.219 24.6512 39.2065 23.4383C41.8502 21.8325 41.8502 19.2017 39.2065 17.5958C37.2002 16.3829 34.3314 15.9729 31.7627 16.3829" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M11.1941 12.2316C11.3066 12.2145 11.4379 12.2145 11.5504 12.2316C14.1379 12.1462 16.2004 10.2158 16.2004 7.82413C16.2004 5.38121 14.0441 3.41663 11.3629 3.41663C8.68164 3.41663 6.52539 5.3983 6.52539 7.82413C6.54414 10.2158 8.60664 12.1462 11.1941 12.2316Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M13.1252 24.6683C10.5564 25.0612 7.7252 24.6512 5.7377 23.4383C3.09395 21.8325 3.09395 19.2017 5.7377 17.5958C7.74395 16.3829 10.6127 15.9729 13.1814 16.3829" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M22.4994 24.993C22.3869 24.9759 22.2557 24.9759 22.1432 24.993C19.5557 24.9076 17.4932 22.9771 17.4932 20.5855C17.4932 18.1426 19.6494 16.178 22.3307 16.178C25.0119 16.178 27.1682 18.1596 27.1682 20.5855C27.1494 22.9771 25.0869 24.9247 22.4994 24.993Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M27.9559 30.3742C24.9746 28.5634 20.0434 28.5634 17.0434 30.3742C14.3996 31.9801 14.3996 34.6109 17.0434 36.2167C20.0434 38.0447 24.9559 38.0447 27.9559 36.2167" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
  const CommentsIcon = () => (
    <svg className='tasktile-icon' width="22" height="22" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.1273 13.25H14.9939C14.4198 13.25 13.8677 13.2721 13.3377 13.3383C7.39727 13.8462 4.41602 17.3575 4.41602 23.8279V32.6613C4.41602 41.4946 7.94935 43.2392 14.9939 43.2392H15.8773C16.3631 43.2392 17.0035 43.5704 17.2906 43.9458L19.9406 47.4792C21.111 49.0471 23.0102 49.0471 24.1806 47.4792L26.8306 43.9458C27.1618 43.5042 27.6918 43.2392 28.2439 43.2392H29.1273C35.5977 43.2392 39.1089 40.28 39.6168 34.3175C39.6831 33.7875 39.7052 33.2354 39.7052 32.6613V23.8279C39.7052 16.7833 36.1718 13.25 29.1273 13.25ZM14.3535 30.9167C13.1168 30.9167 12.1452 29.9229 12.1452 28.7083C12.1452 27.4938 13.1389 26.5 14.3535 26.5C15.5681 26.5 16.5618 27.4938 16.5618 28.7083C16.5618 29.9229 15.5681 30.9167 14.3535 30.9167ZM22.0606 30.9167C20.8239 30.9167 19.8523 29.9229 19.8523 28.7083C19.8523 27.4938 20.846 26.5 22.0606 26.5C23.2752 26.5 24.2689 27.4938 24.2689 28.7083C24.2689 29.9229 23.2973 30.9167 22.0606 30.9167ZM29.7898 30.9167C28.5531 30.9167 27.5814 29.9229 27.5814 28.7083C27.5814 27.4938 28.5752 26.5 29.7898 26.5C31.0043 26.5 31.9981 27.4938 31.9981 28.7083C31.9981 29.9229 31.0043 30.9167 29.7898 30.9167Z" fill="currentColor" />
      <path d="M48.5395 14.9947V23.828C48.5395 28.2447 47.1704 31.248 44.4321 32.9042C43.7696 33.3017 42.9966 32.7717 42.9966 31.9988L43.0187 23.828C43.0187 14.9947 37.9616 9.93758 29.1283 9.93758L15.6795 9.95966C14.9066 9.95966 14.3766 9.18675 14.7741 8.52425C16.4304 5.78591 19.4337 4.41675 23.8283 4.41675H37.9616C45.0062 4.41675 48.5395 7.95008 48.5395 14.9947Z" fill="currentColor" />
    </svg>
  );
  const CalendarIcon = () => (
    <svg className='tasktile-icon' width="22" height="22" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.667 3.66669V9.16669" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M29.333 3.66669V9.16669" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M6.41699 16.6649H37.5837" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M5.5 23.8517V15.5834C5.5 10.0834 8.25 6.41669 14.6667 6.41669H29.3333C35.75 6.41669 38.5 10.0834 38.5 15.5834V31.1667C38.5 36.6667 35.75 40.3334 29.3333 40.3334H14.6667C8.25 40.3334 5.5 36.6667 5.5 31.1667" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M28.7738 25.1167H28.7903" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M28.7738 30.6167H28.7903" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M21.9916 25.1167H22.008" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M21.9916 30.6167H22.008" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M15.2064 25.1167H15.2229" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M15.2064 30.6167H15.2229" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

  );

  const TaskIcon = ({ icon, info }) => {
    return (
      <div className="task-icon-container">
        {typeof icon === "string" ? (
          <img className="task-icon" src={icon} alt="task icon" />
        ) : (
          <div className="task-icon">{icon}</div>
        )}
        <p className="name">{info}</p>
      </div>
    );
  };


  const formatDateRange = (start, deadline) => {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      return `${day}.${month}`;
    };

    return `${formatDate(start)}-${formatDate(deadline)}`;
  }

  const handleDoubleClick = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };

  return (
    <Draggable draggableId={String(task.taskId)} index={index}>
      {(provided) => (
        <div className="task-container"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onDoubleClick={() => handleDoubleClick(task.taskId)}
        >
          <div className="task-info">
            <p className="name">{task.name}</p>
            <TaskIcon icon={<MemberIcon />} info={task.assignments.length} />
          </div>
          <div className='tag-container'>
            {tag && (
              <Tag backgroundColor={tag.colorHex} text={tag.name}></Tag>
            )}
          </div>
          <div className="task-info">
            <TaskIcon icon={<CalendarIcon />} info={formatDateRange(task.start, task.deadline)} />
            <TaskIcon icon={<CommentsIcon />} info={task.comments.length} />
          </div>
        </div>
      )}
    </Draggable>
  );
};


export default TaskTile;