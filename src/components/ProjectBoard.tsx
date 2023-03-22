import { useContext } from "react";
import { AppContext } from "~/context/app";
import { api } from "~/utils/api";
import TaskCard from "./TaskCard";
import CreateTask from "./CreateTask";

const ProjectBoard = () => {
  const { state, dispatch } = useContext(AppContext);

  if (!state.projectId)
    return <p>please select a project or create a new one</p>;

  // Get Project
  const { data: project } = api.project.getProjectById.useQuery({
    projectId: state.projectId,
  });

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
    <div className="flex-1 bg-slate-200">
      <header className="flex h-16 items-center justify-between px-2">
        <h2 className="text-xl font-semibold">{project?.title}</h2>
        <button>+ New Task</button>
      </header>
      <div className="grid grid-cols-3">
        <div className="px-2">
          <p className="text-sm font-semibold uppercase">todo</p>
          <ul className="max-w-xs">
            {tasks?.map((task) => (
              <li key={task.id}>
                <TaskCard task={task} subtasks={task.subtasks} />
              </li>
            ))}
          </ul>
        </div>
        <div className="px-2">
          <p className="text-sm font-semibold uppercase">doing</p>
          <ul></ul>
        </div>
        <div className="px-2">
          <p className="text-sm font-semibold uppercase">done</p>
          <ul></ul>
        </div>
      </div>
    </div>
  );
};

export default ProjectBoard;
