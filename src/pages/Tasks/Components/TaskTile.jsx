
import comments from '../../../assets/message.svg';
import calendar from '../../../assets/calendar.svg';
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
    <svg className='tasktile-icon' width="22" height="22" viewBox="0 0 47 46" fill="currentColor">
      <path d="M32.0573 4H27.0382C20.8608 4 17 7.77667 17 13.8193V21.4671H29.0651C29.8566 21.4671 30.5129 22.1091 30.5129 22.8833C30.5129 23.6576 29.8566 24.2996 29.0651 24.2996H17V31.9473C17 37.99 20.8608 41.7667 27.0382 41.7667H32.0379C38.2153 41.7667 42.0761 37.99 42.0761 31.9473V13.8193C42.0954 7.77667 38.2346 4 32.0573 4Z" fill="currentColor" />
      <path d="M8.80325 21.2437L12.7992 17.3348C13.0888 17.0516 13.2239 16.6928 13.2239 16.334C13.2239 15.9752 13.0888 15.5976 12.7992 15.3332C12.2394 14.7856 11.3128 14.7856 10.753 15.3332L4.28608 21.6591C3.72626 22.2067 3.72626 23.1131 4.28608 23.6607L10.753 29.9867C11.3128 30.5343 12.2394 30.5343 12.7992 29.9867C13.359 29.439 13.359 28.5326 12.7992 27.985L8.80325 24.0762H17.3743V21.2437H8.80325Z" fill="currentColor" />
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
          <div className="task-icon">{icon}</div> // Если это компонент, рендерим его
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