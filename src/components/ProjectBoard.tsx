import { useContext } from "react";
import { AppContext } from "~/context/app";
import { api } from "~/utils/api";
import CreateTask from "./CreateTask";
import TaskList from "./TaskList";
import UpdateProject from "./UpdateProject";

const ProjectBoard = () => {
  const { state, dispatch } = useContext(AppContext);

  if (!state.projectId)
    return (
      <div className="grid w-full place-content-center text-2xl font-semibold text-slate-400 dark:text-slate-600">
        <p>Please select a project or create a new one.</p>
      </div>
    );

  // Get Project
  const { data: project } = api.project.getProjectById.useQuery(
    {
      projectId: state.projectId,
    },
    { refetchOnMount: true }
  );

  // Get all tasks query
  const { data: tasks } = api.task.getTasksByProjectId.useQuery({
    projectId: state.projectId,
  });

  return (
    <div className="w-full">
      <header className="flex h-16 items-center justify-between bg-slate-100 px-4 dark:bg-slate-700">
        <div className="flex items-center gap-2">
          <UpdateProject projectId={state.projectId} />
          <h2 className="text-xl font-bold dark:text-slate-50">
            {project?.title}
          </h2>
        </div>
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
