import { useContext } from "react";
import { AppContext } from "~/context/app";
import { api } from "~/utils/api";
import TaskCard from "./TaskCard";
import CreateTask from "./CreateTask";

const ProjectBoard = () => {
  const { state, dispatch } = useContext(AppContext);

  if (!state.projectId)
    return <p>please select a project or create a new one</p>;

  // Get all tasks query
  const {
    data: tasks,
    isError,
    error,
    isLoading,
  } = api.task.getTasksByProjectId.useQuery({
    projectId: state.projectId,
  });

  return (
    <div>
      <p>selected project: {state.projectId}</p>
      <CreateTask />
      <ul>
        {tasks?.map((task) => (
          <li key={task.id}>
            <TaskCard task={task} subtasks={task.subtasks} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectBoard;
