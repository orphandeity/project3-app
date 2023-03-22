import { useContext } from "react";
import { AppContext } from "~/context/app";
import { api } from "~/utils/api";

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
    <>
      <h2 className="text-sm font-semibold uppercase">
        All Boards <span>({projects.length})</span>
      </h2>
      <ul className="flex max-w-md flex-col gap-2">
        {projects.map((project) => (
          <li
            key={project.id}
            className="cursor-pointer rounded border bg-white p-2"
            onClick={() => handleSelectProject(project.id)}
          >
            <p>{project.title}</p>
          </li>
        ))}
        <li className="cursor-pointer rounded border bg-white p-2">
          + Add New Board
        </li>
      </ul>
    </>
  );
};

export default ProjectList;
