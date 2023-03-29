import { useContext } from "react";
import { AppContext } from "~/context/app";
import { api } from "~/utils/api";
import CreateTask from "./CreateTask";
import TaskList from "./TaskList";
import UpdateProject from "./UpdateProject";
import { Loader2 } from "lucide-react";

const ProjectBoard = () => {
  const { state } = useContext(AppContext); // selected project

  if (!state.projectId)
    return (
      <div className="grid w-full place-content-center text-2xl font-semibold text-slate-400 dark:text-slate-600">
        <p>Please select a project or create a new one.</p>
      </div>
    );

  // Get Project
  const { data: project, isLoading: projectLoading } =
    api.project.getProjectById.useQuery({
      projectId: state.projectId,
    });

  // Get all tasks query
  const { data: tasks, isLoading: tasksLoading } =
    api.task.getTasksByProjectId.useQuery({
      projectId: state.projectId,
    });

  return (
    <div className="w-full">
      <header className="flex h-16 items-center justify-between bg-slate-100 px-4 dark:bg-slate-700">
        {projectLoading ? (
          <p className="animate-pulse text-xl font-bold text-slate-300 transition-transform dark:text-slate-400">
            loading...
          </p>
        ) : (
          <div className="flex items-center gap-2">
            <UpdateProject projectId={state.projectId} />
            <h2 className="text-xl font-bold dark:text-slate-50">
              {project?.title}
            </h2>
          </div>
        )}

        <CreateTask />
      </header>

      {tasksLoading ? (
        <Loader2
          className="mx-auto my-32 animate-spin text-teal-300 transition-transform dark:text-teal-400"
          size={128}
        />
      ) : (
        tasks && (
          <div className="mx-4 grid grid-cols-3 gap-4">
            <TaskList tasks={tasks} status="TODO" />
            <TaskList tasks={tasks} status="DOING" />
            <TaskList tasks={tasks} status="DONE" />
          </div>
        )
      )}
    </div>
  );
};

export default ProjectBoard;
