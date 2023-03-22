import type { Subtask, Task } from "@prisma/client";

interface TaskCardProps {
  task: Task;
  subtasks: Subtask[];
}

const TaskCard = ({ task, subtasks }: TaskCardProps) => {
  const totalSubtasks = subtasks.length;
  const completedSubtasks = subtasks.filter((s) => s.isComplete).length;

  return (
    <div className="rounded bg-white px-4 py-2 shadow">
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm text-slate-600">{task.description}</p>
      <p className="text-xs text-slate-400">
        {completedSubtasks} of {totalSubtasks} subtasks
      </p>
    </div>
  );
};

export default TaskCard;
