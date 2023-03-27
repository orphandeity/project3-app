import type { Subtask } from "@prisma/client";
import { useCallback } from "react";
import { api } from "~/utils/api";

const SubtaskCard = ({
  taskId,
  subtask,
}: {
  taskId: string;
  subtask: Subtask;
}) => {
  // api mutation: update subtask
  const utils = api.useContext();
  const { mutate: updateSubtask } = api.subtask.updateSubtask.useMutation({
    onSuccess() {
      void utils.subtask.getSubtasks.invalidate({ taskId });
    },
  });

  const handleUpdateSubtask = useCallback(() => {
    updateSubtask({
      subtaskId: subtask.id,
      subtaskStatus: !subtask.isComplete,
    });
  }, [subtask.id, subtask.isComplete, updateSubtask]);

  return (
    <li className="flex items-center gap-2 rounded-md bg-slate-100 p-2 shadow-inner dark:bg-slate-800">
      <input
        type="checkbox"
        id={subtask.id}
        checked={subtask.isComplete}
        onChange={handleUpdateSubtask}
        className="peer h-5 w-5 rounded border-slate-200 transition-colors checked:bg-indigo-400 hover:checked:bg-indigo-500 focus:ring-indigo-400 focus:ring-offset-slate-100 focus:checked:bg-indigo-400 dark:border-slate-600 dark:bg-slate-800 dark:checked:bg-indigo-500 dark:hover:checked:bg-indigo-600 dark:focus:ring-indigo-500 dark:focus:ring-offset-slate-800 dark:focus:checked:bg-indigo-500"
      />
      <label
        htmlFor={subtask.id}
        className="text-sm font-normal text-slate-500 transition-colors peer-checked:text-slate-400 peer-checked:line-through dark:text-slate-400 dark:peer-checked:text-slate-500"
      >
        {subtask.title}
      </label>
    </li>
  );
};

export default SubtaskCard;
