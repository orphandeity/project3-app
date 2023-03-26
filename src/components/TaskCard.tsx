import { api } from "~/utils/api";

interface TaskCardProps {
  taskId: string;
}

const TaskCard: React.FunctionComponent<TaskCardProps> = ({ taskId }) => {
  // api query: get task
  const { data: task, isLoading } = api.task.getTaskByTaskId.useQuery({
    taskId,
  });

  if (!task) return null;

  // subtask stats
  const totalSubtasks = task.subtasks.length;
  const completedSubtasks = task?.subtasks.filter((s) => s.isComplete).length;

  return (
    <div className="cursor-pointer rounded bg-slate-100 p-4 shadow-md transition-all hover:scale-105 hover:shadow-lg active:scale-95 dark:bg-slate-700">
      {isLoading ? (
        <p className="animate-pulse text-red-400">loading...</p>
      ) : (
        <>
          <h3 className="font-semibold dark:text-slate-50">{task.title}</h3>
          <p className="text-xs text-slate-400">
            {completedSubtasks} of {totalSubtasks} subtasks
          </p>
        </>
      )}
    </div>
  );
};

export default TaskCard;
