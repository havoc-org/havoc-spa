import TaskTile from "./TaskTile";
import Tile from "../../../components/Tile/Tile";

const TaskListComponent = ({data}) => {
    if (!data?.statuses?.length || !data?.tasks?.length) {
      return <div>No data available</div>; // Отображение сообщения при отсутствии данных
    }
    return (
      <div className="task-lists-container">
        {data.statuses.filter(status => {
          // Отфильтровываем статусы, у которых есть связанные задания
          const tasksForStatus = data.tasks.filter(task => task.taskStatus.taskStatusId === status.taskStatusId);
          return tasksForStatus.length > 0;
        }).map(status => {
          const tasksForStatus = data.tasks.filter(task => task.taskStatus.taskStatusId === status.taskStatusId);
          return (
            <Tile key={status.taskStatusId} className="status-section">
              <h3>{status.name}</h3>
                {tasksForStatus.map(task => (
                     <TaskTile task={task}></TaskTile>   
                ))}
            </Tile>
          );
        })}
      </div>
    );
  };

  export default TaskListComponent;