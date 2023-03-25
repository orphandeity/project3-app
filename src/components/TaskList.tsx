import type { Task } from "@prisma/client";
import TaskModal from "./TaskModal";
import clsx from "clsx";

interface TaskListProps {
  tasks: Task[];
  status: string;
}

const TaskList: React.FunctionComponent<TaskListProps> = ({
  tasks,
  status,
}) => {
  const statusColor = (status: string) => {
    switch (status) {
      case "TODO":
        return "bg-cyan-400";
      case "DOING":
        return "bg-indigo-400";
      case "DONE":
        return "bg-teal-400";
      default:
        return "bg-cyan-400";
    }
  };

  const filteredTasks = tasks.filter((task) => task.status === status);

  return (
    <div>
      <div className="flex items-center gap-2">
        <div className={clsx(["h-4 w-4 rounded-full", statusColor(status)])} />
        <p
          id={status}
          className="my-4 text-xs font-bold uppercase text-slate-600 dark:text-slate-400"
        >
          {status} ({filteredTasks.length})
        </p>
      </div>
      <ul className="flex max-w-xs flex-col gap-4" aria-describedby={status}>
        {filteredTasks.map((task) => (
          <TaskModal key={task.id} taskId={task.id} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
