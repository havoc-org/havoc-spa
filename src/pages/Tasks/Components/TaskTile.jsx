import members from '../../../assets/people.svg';
import comments from '../../../assets/message.svg';
import Tag from './Tag';

const TaskTile = ({ task }) => {
    const tag = task.tags?.length > 0 ? task.tags.at(-1) : null;

    return (
      <div className="task-container">
        <div className="task-info">
          <p className="name">{task.name}</p>
          <div className='task-icon-container'>
            <img className="task-icon" src={members} alt="Members" />
            <p>{task.attachments.length}</p>
          </div>
          {tag && (
          <Tag backgroundColor={tag.colorHex} text={tag.name}></Tag>
          )}
        </div>
      </div>
    );
  };
  
  // Правильный экспорт по умолчанию
  export default TaskTile;