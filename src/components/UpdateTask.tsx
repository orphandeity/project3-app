import * as Popover from "@radix-ui/react-popover";
import { MoreVertical } from "lucide-react";
import { api } from "~/utils/api";

const UpdateTask = ({ taskId }: { taskId: string }) => {
  const utils = api.useContext();

  // api mutation: delete task
  const { mutate: deleteTask } = api.task.deleteTaskByTaskId.useMutation({
    onSuccess() {
      void utils.task.getTasksByProjectId.invalidate();
    },
  });

  // api mutation: delete subtasks
  const { mutate: deleteSubtasks } =
    api.subtask.deleteSubtasksByTaskId.useMutation({
      onSuccess() {
        void utils.subtask.getSubtasks.invalidate();
      },
    });

  function handleDeleteTask() {
    deleteSubtasks({ taskId });
    deleteTask({ taskId });
  }

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <MoreVertical className="cursor-pointer text-slate-300 transition-colors hover:text-slate-400 active:text-slate-400" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content side="right" sideOffset={8}>
          <div className="rounded-md bg-white p-4 text-sm shadow-md dark:bg-slate-200">
            <button
              className="text-red-400 hover:text-red-500"
              onClick={handleDeleteTask}
            >
              Delete Task
            </button>
          </div>
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default UpdateTask;
