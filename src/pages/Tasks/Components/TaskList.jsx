import TaskTile from './TaskTile';
import Tile from '../../../components/Tile/Tile';
import { Droppable } from 'react-beautiful-dnd';
import { useContext } from 'react';
import { ProjectContext } from '../../../contexts/ProjectContext.jsx';
const TaskListComponent = ({ tasks }) => {
  if (!tasks?.length) {
    console.log({tasks})
    return <div>No data available</div>; // Отображение сообщения при отсутствии данных
  }

   const context =useContext(ProjectContext);

  return (
      <div className="task-lists-container">
        {context.statuses
          .filter((status) => {
            // Отфильтровываем статусы, у которых есть связанные задания
            const tasksForStatus = tasks.filter(
              (task) => task.taskStatus.taskStatusId === status.taskStatusId
            );
            return tasksForStatus.length > 0;
          })
          .map((status) => {
            const tasksForStatus = tasks.filter(
              (task) => task.taskStatus.taskStatusId === status.taskStatusId
            );
            return (
              <Droppable key={status.taskStatusId} droppableId={String(status.taskStatusId)}>
                {(provided)=>(
              <div ref={provided.innerRef} 
              {...provided.droppableProps}
              >    
              <Tile className="status-section"
                >
                <h3>{status.name}</h3>
                {tasksForStatus.map((task,index) => (
                  <TaskTile key={task.taskId} task={task} index={index}/>
                ))}
                {provided.placeholder}
              </Tile>
              </div>
          )}
              </Droppable>
            );
          })}
      </div>
  );
};

export default TaskListComponent;
