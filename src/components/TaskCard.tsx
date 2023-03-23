import type { Subtask, Task } from "@prisma/client";

export interface TaskCardProps {
  task: Task;
  subtasks: Subtask[];
}

const TaskCard = ({ task, subtasks }: TaskCardProps) => {
  const totalSubtasks = subtasks.length;
  const completedSubtasks = subtasks.filter((s) => s.isComplete).length;

  return (
    <div className="rounded bg-slate-600 px-4 py-2 shadow-md">
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm text-slate-400">{task.description}</p>
      <p className="text-xs text-slate-800">
        {completedSubtasks} of {totalSubtasks} subtasks
      </p>
    </div>
  );
};

export default TaskCard;
