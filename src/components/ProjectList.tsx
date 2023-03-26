import { useContext } from "react";
import { AppContext } from "~/context/app";
import { api } from "~/utils/api";
import { Layout } from "lucide-react";
import { clsx } from "clsx";
import CreateProject from "./CreateProject";

const ProjectList = () => {
  const { state, dispatch } = useContext(AppContext);

  // Get All Projects
  const {
    data: projects,
    isError,
    error,
    isLoading,
  } = api.project.getAllProjects.useQuery();

  if (isLoading) {
    return <p className="animate-pulse text-emerald-400">loading...</p>;
  }

  if (isError) {
    console.error(error);
    return <p className="animate-pulse text-red-400">there was an error</p>;
  }

  function handleSelectProject(projectId: string) {
    dispatch({ type: "UPDATE_PROJECTID", payload: { projectId } });
  }

  return (
    <div>
      <p className="p-4 text-xs font-bold uppercase text-slate-600 dark:text-slate-500">
        All Boards <span>({projects.length})</span>
      </p>
      <ul className="mr-4 flex max-w-md flex-col">
        {projects.map((project) => (
          <li
            key={project.id}
            className={clsx([
              "flex cursor-pointer items-center gap-2 rounded-r-full px-4 py-4 text-sm font-medium",
              project.id === state.projectId
                ? "bg-indigo-400 text-slate-50 dark:bg-indigo-500"
                : "text-slate-500 hover:bg-indigo-100 dark:text-slate-400 dark:hover:bg-indigo-700/20 dark:hover:text-slate-300",
            ])}
            onClick={() => handleSelectProject(project.id)}
          >
            <Layout size={16} />
            <p className="transition-colors">{project.title}</p>
          </li>
        ))}
        <CreateProject />
      </ul>
    </div>
  );
};

export default ProjectList;
