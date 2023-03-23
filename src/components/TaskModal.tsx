import type { TaskCardProps } from "./TaskCard";
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import TaskCard from "./TaskCard";

/**
 *  TODO:
 *  make api routes for update task & update subtask
 */

type TaskModalProps = TaskCardProps;

const TaskModal = ({ task, subtasks }: TaskModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <li>
          <TaskCard task={task} subtasks={subtasks} />
        </li>
      </DialogTrigger>
      <DialogOverlay className="bg-black/05 fixed top-0 left-0 right-0 bottom-0 grid place-content-center overflow-y-auto backdrop-blur-sm">
        <DialogContent className="flex max-w-xs flex-col gap-2 rounded border bg-white p-8">
          <DialogTitle>
            <h1 className="text-lg font-semibold">{task.title}</h1>
          </DialogTitle>
          <DialogDescription>
            <p className="text-sm text-slate-600">{task.description}</p>
          </DialogDescription>
          <div>
            <h2 className="text-sm font-semibold leading-none">Subtasks</h2>
            <ul>
              {subtasks.map((s) => (
                <li key={s.id} className="flex items-center gap-2">
                  <input type="checkbox" checked={s.isComplete} />
                  <p className="text-sm text-slate-600">{s.title}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col">
            <label htmlFor="status">Status</label>
            <select id="status">
              <option value="TODO">TODO</option>
              <option value="DOING">DOING</option>
              <option value="DONE">DONE</option>
            </select>
          </div>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default TaskModal;