import type { Subtask, Task } from "@prisma/client";

interface TaskCardProps {
  task: Task;
  subtasks: Subtask[];
}

const TaskCard = ({ task, subtasks }: TaskCardProps) => {
  return (
    <div className="rounded bg-white p-4 shadow">
      <h3>{task.title}</h3>
      <h4 className="text-sm font-semibold">Subtasks</h4>
      <ul className="text-sm text-slate-600">
        {subtasks.map((subtask) => (
          <li key={subtask.id}>{subtask.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskCard;
