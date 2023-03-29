import { api } from "~/utils/api";
import SubtaskCard from "./SubtaskCard";

const SubtaskList = ({ taskId }: { taskId: string }) => {
  // api query: get subtasks
  const { data: subtasks } = api.subtask.getSubtasks.useQuery({ taskId });

  // subtask stats
  const subtasksComplete = subtasks?.filter(
    (subtask) => subtask.isComplete
  ).length;

  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-bold text-slate-600 dark:text-slate-400">
        Subtasks ({subtasksComplete} of {subtasks?.length})
      </p>
      <ul className="flex flex-col gap-2">
        {subtasks?.map((s) => (
          <SubtaskCard key={s.id} subtask={s} taskId={taskId} />
        ))}
      </ul>
    </div>
  );
};

export default SubtaskList;
