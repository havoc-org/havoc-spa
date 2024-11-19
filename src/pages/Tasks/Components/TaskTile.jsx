import members from '../../../assets/people.svg';
import comments from '../../../assets/message.svg';
import calendar from '../../../assets/calendar.svg';
import Tag from './Tag';

const TaskTile = ({ task }) => {
    let tag = task.tags?.length > 0 ? task.tags.at(-1) : null;
   
    tag={
      name: "sadsadsASDASDASDASDSAasda",
      colorHex: "#123456"
    }

    const TaskIcon=({icon,info})=>{
      return(
        <div className='task-icon-container'>
              <img className="task-icon" src={icon} alt="task icon" />
              <p className="name">{info}</p>
            </div>
      );
    }


      const formatDateRange = (start, deadline) => {
        const formatDate = (dateString) => {
          const date = new Date(dateString);
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          return `${day}.${month}`;
        };
    
        return `${formatDate(start)}-${formatDate(deadline)}`;
      }

    return (
      <div className="task-container">
        <div className="task-info">
          <p className="name">{task.name}</p>
          <TaskIcon icon={members} info={task.attachments.length}/>
        </div>
        <div className='tag-container'>
          {tag && (
          <Tag backgroundColor={tag.colorHex} text={tag.name}></Tag>
          )}
        </div>
        <div className="task-info">
        <TaskIcon icon={calendar} info={formatDateRange(task.start,task.deadline)}/>
        <TaskIcon icon={comments} info={task.comments.length}/>
        </div>  
      </div>
    );
  };

  
  // Правильный экспорт по умолчанию
  export default TaskTile;