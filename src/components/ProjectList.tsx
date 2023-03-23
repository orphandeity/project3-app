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
      <h2 className="px-4 text-xs font-semibold uppercase">
        All Boards <span>({projects.length})</span>
      </h2>
      <ul className="mr-4 flex max-w-md flex-col gap-2">
        {projects.map((project) => (
          <li
            key={project.id}
            className={clsx([
              "flex cursor-pointer items-center gap-2 rounded-r-full px-4 py-2 text-sm font-semibold",
              project.id === state.projectId && "bg-indigo-500",
            ])}
            onClick={() => handleSelectProject(project.id)}
          >
            <Layout size={16} />
            <p>{project.title}</p>
          </li>
        ))}
        <CreateProject />
      </ul>
    </div>
  );
};

export default ProjectList;
