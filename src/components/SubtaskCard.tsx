import type { Subtask } from "@prisma/client";
import { api } from "~/utils/api";

const SubtaskCard = ({
  taskId,
  subtask,
}: {
  taskId: string;
  subtask: Subtask;
}) => {
  // updater function for updating query cache after mutation
  const updateFn = (oldData: Subtask[] | undefined) => {
    const newData = oldData?.map((s) => {
      if (s.id === subtask.id) return { ...s, isComplete: !s.isComplete };
      else return s;
    });
    return newData;
  };

  // api mutation: update subtask
  const utils = api.useContext();
  const { mutate: updateSubtask } = api.subtask.updateSubtask.useMutation({
    onSuccess() {
      // update cache
      void utils.subtask.getSubtasks.setData({ taskId }, updateFn);
      // invalidate task query
      void utils.task.getTaskByTaskId.invalidate({ taskId });
    },
  });

  const handleUpdateSubtask = () => {
    updateSubtask({
      subtaskId: subtask.id,
      subtaskStatus: !subtask.isComplete,
    });
  };

  return (
    <li className="flex cursor-grab items-center gap-2 rounded-md bg-slate-100 p-2 shadow-inner active:cursor-grabbing dark:bg-slate-800">
      <input
        type="checkbox"
        checked={subtask.isComplete}
        onChange={handleUpdateSubtask}
        className="peer h-5 w-5 rounded border-slate-200 transition-colors checked:bg-indigo-400 hover:checked:bg-indigo-500 focus:ring-indigo-400 focus:ring-offset-slate-100 focus:checked:bg-indigo-400 dark:border-slate-600 dark:bg-slate-800 dark:checked:bg-indigo-500 dark:hover:checked:bg-indigo-600 dark:focus:ring-indigo-500 dark:focus:ring-offset-slate-800 dark:focus:checked:bg-indigo-500"
      />
      <p className="text-sm font-normal text-slate-500 transition-colors peer-checked:text-slate-400 peer-checked:line-through dark:text-slate-400 dark:peer-checked:text-slate-500">
        {subtask.title}
      </p>
    </li>
  );
};

export default SubtaskCard;
