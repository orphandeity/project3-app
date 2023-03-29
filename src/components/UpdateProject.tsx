import * as Popover from "@radix-ui/react-popover";
import { MoreVertical } from "lucide-react";
import { useContext, useState } from "react";
import { AppContext } from "~/context/app";
import { api } from "~/utils/api";

const UpdateProject = ({ projectId }: { projectId: string }) => {
  const [open, setOpen] = useState(false);

  // update selected project
  const { state, dispatch } = useContext(AppContext);

  const utils = api.useContext();

  // api mutation: delete project
  const { mutate: deleteProject } = api.project.deleteProject.useMutation({
    onSuccess() {
      void utils.project.invalidate();
    },
  });

  // api mutation: delete tasks
  const { mutate: deleteTasks } = api.task.deleteTasksByProjectId.useMutation({
    onSuccess() {
      void utils.task.invalidate();
    },
  });

  // api mutation: delete subtasks
  const { mutate: deleteSubtasks } =
    api.subtask.deleteSubtasksByProjectId.useMutation({
      onSuccess() {
        void utils.subtask.invalidate();
      },
    });

  // api query: get first project
  const { data: project } = api.project.getProjectByUserId.useQuery();

  function handleDeleteProject() {
    deleteSubtasks({ projectId });
    deleteTasks({ projectId });
    deleteProject({ projectId });
    // reset selected project
    if (project && project.id !== state.projectId) {
      dispatch({
        type: "UPDATE_PROJECTID",
        payload: { projectId: project.id },
      });
    } else {
      dispatch({ type: "UPDATE_PROJECTID", payload: { projectId: undefined } });
    }
    setOpen(false);
  }

  return (
    <Popover.Root open={open} onOpenChange={() => setOpen(true)}>
      <Popover.Trigger asChild>
        <MoreVertical className="cursor-pointer text-slate-300 transition-colors hover:text-slate-400 active:text-slate-400" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content side="bottom" sideOffset={8}>
          <div className="flex flex-col gap-2 rounded-md bg-white p-4 text-sm shadow-md dark:bg-slate-200">
            <button
              className="text-red-400 hover:text-red-500"
              onClick={handleDeleteProject}
            >
              Delete Project
            </button>
          </div>
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default UpdateProject;
