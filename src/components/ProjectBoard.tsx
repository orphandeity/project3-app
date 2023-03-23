import { useContext } from "react";
import { AppContext } from "~/context/app";
import { api } from "~/utils/api";
import CreateTask from "./CreateTask";
import TaskModal from "./TaskModal";
import TaskList from "./TaskList";

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
    <div className="flex-1">
      <header className="flex h-16 items-center justify-between border-b border-slate-300 bg-slate-200 px-4 dark:border-slate-600 dark:bg-slate-800">
        <h2 className="text-xl font-semibold">{project?.title}</h2>
        <CreateTask />
      </header>

      {tasks && (
        <div className="mx-4 grid grid-cols-3 gap-4">
          <TaskList tasks={tasks} status="TODO" />
          <TaskList tasks={tasks} status="DOING" />
          <TaskList tasks={tasks} status="DONE" />
        </div>
      )}
    </div>
  );
};

export default ProjectBoard;
