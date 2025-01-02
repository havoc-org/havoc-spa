import TaskTile from './TaskTile';
import Tile from '../../../components/Tile/Tile';
import { Droppable } from 'react-beautiful-dnd';
import { useContext, useEffect, useState } from 'react';
import { ProjectContext } from '../../../contexts/ProjectContext.jsx';
import addButton from '../../../assets/add-circle.svg';
import AddStatusPopup from './AddStatusPopup.jsx';

const TaskListComponent = ({ tasks }) => {
  const context = useContext(ProjectContext);
  const [showedStatuses, setShowedStatuses] = useState([]);

  const getStatusesWithTasks = () => {
    return context.statuses.filter((status) => {
      return tasks.some((task) => task.taskStatus.taskStatusId === status.taskStatusId);
    });
  };

  const getStatusesWithoutTasks = () => {
    return context.statuses.filter((status) => {
      return !showedStatuses.some((showedStatus) => showedStatus.taskStatusId === status.taskStatusId);
    });
  };
  
  useEffect(() => {
    const statuses = getStatusesWithTasks();
    setShowedStatuses(statuses);
  }, [tasks]);

  const handleAddStatus = (status) => {
    
    setShowedStatuses((prevStatuses) => {
      const filteredStatuses = prevStatuses.filter(
        (s) => tasks.some((task) => task.taskStatus.taskStatusId === s.taskStatusId)
      );
      const updatedStatuses = [...filteredStatuses, status]; 
      return updatedStatuses.sort((a, b) => a.taskStatusId - b.taskStatusId);
    });
  };

  

  return (
    <div className="task-lists-container">
      {showedStatuses.map((status) => {
        const tasksForStatus = tasks.filter(
          (task) => task.taskStatus.taskStatusId === status.taskStatusId
        );

        return (
          <Droppable key={status.taskStatusId} droppableId={String(status.taskStatusId)}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Tile className="status-section">
                  <h2>{status.name}</h2>
                  {tasksForStatus.map((task, index) => (
                    <TaskTile key={task.taskId} task={task} index={index} />
                  ))}
                  {provided.placeholder}
                </Tile>
              </div>
            )}
          </Droppable>
        );
      })}

      <Tile className="add-status-section">
        <h2>Add new status</h2>
        <AddStatusPopup
          items={getStatusesWithoutTasks()}
          onItemClick={handleAddStatus}
          trigger={
            <div className="add-image-container">
              <img src={addButton} className="add-image" alt="Add new" />
            </div>
          }
        />
      </Tile>
    </div>
  );
};

export default TaskListComponent;
