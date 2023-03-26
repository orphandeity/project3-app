import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import TaskCard from "./TaskCard";
import { api } from "~/utils/api";
import UpdateTask from "./UpdateTask";

// TODO: prevent query invalidation
// currently, queries are invalidated after all mutations &
// this is causing subtasks to change order on update.

interface TaskModalProps {
  taskId: string;
}

const TaskModal: React.FunctionComponent<TaskModalProps> = ({ taskId }) => {
  const utils = api.useContext();

  // api query: get task
  const { data: task } = api.task.getTaskByTaskId.useQuery({ taskId });

  // api mutation: update subtask
  const { mutate: updateSubtask } = api.subtask.updateSubtask.useMutation({
    onSuccess() {
      void utils.task.getTaskByTaskId.invalidate();
    },
  });

  // api mutation: update task status
  const { mutate: updateTaskStatus } = api.task.updateTaskStatus.useMutation({
    onSuccess() {
      void utils.task.getTaskByTaskId.invalidate();
    },
  });

  if (!task) return null;

  // subtask stats
  const subtasksComplete = task.subtasks.filter(
    (subtask) => subtask.isComplete
  ).length;
  const subtasksTotal = task.subtasks.length;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <li>
          <TaskCard taskId={task.id} />
        </li>
      </DialogTrigger>
      <DialogOverlay className="fixed top-0 left-0 right-0 bottom-0 grid place-content-center overflow-y-auto bg-black/10 backdrop-blur-sm dark:bg-black/20">
        <DialogContent className="flex w-[384px] flex-col gap-4 rounded-md bg-slate-50 p-8 shadow-2xl dark:bg-slate-700">
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-2">
              <DialogTitle asChild>
                <h1 className="flex-1 text-xl font-bold dark:text-slate-50">
                  {task.title}
                </h1>
              </DialogTitle>
              <UpdateTask taskId={taskId} />
            </div>
            <DialogDescription>
              <p className="text-sm text-slate-400">{task.description}</p>
            </DialogDescription>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs font-bold text-slate-600 dark:text-slate-400">
              Subtasks ({subtasksComplete} of {subtasksTotal})
            </p>
            <ul className="flex flex-col gap-2">
              {task.subtasks.map((s) => (
                <li
                  key={s.id}
                  className="flex items-center gap-2 rounded-md bg-slate-100 p-2 shadow-inner dark:bg-slate-800"
                >
                  <input
                    type="checkbox"
                    checked={s.isComplete}
                    onChange={() =>
                      updateSubtask({
                        subtaskId: s.id,
                        subtaskStatus: !s.isComplete,
                      })
                    }
                    className="peer rounded border-slate-200 transition-colors checked:bg-indigo-400 hover:checked:bg-indigo-500 focus:ring-indigo-400 focus:ring-offset-slate-100 focus:checked:bg-indigo-400 dark:border-slate-600 dark:bg-slate-800 dark:checked:bg-indigo-500 dark:hover:checked:bg-indigo-600 dark:focus:ring-indigo-500 dark:focus:ring-offset-slate-800 dark:focus:checked:bg-indigo-500"
                  />
                  <p className="text-sm text-slate-500 transition-colors peer-checked:text-slate-400 peer-checked:line-through dark:text-slate-400 dark:peer-checked:text-slate-500">
                    {s.title}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              onChange={(e) =>
                updateTaskStatus({
                  taskId: task.id,
                  taskStatus: e.target.value,
                })
              }
              className="rounded-md border-slate-200 bg-slate-50 text-sm text-slate-500 focus:border-slate-200 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:focus:border-slate-600 dark:focus:ring-indigo-500 dark:focus:ring-offset-slate-700"
            >
              <option value="TODO">Todo</option>
              <option value="DOING">Doing</option>
              <option value="DONE">Done</option>
            </select>
          </div>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default TaskModal;
