import { api } from "~/utils/api";
import SubtaskCard from "./SubtaskCard";
import { Loader2 } from "lucide-react";

const SubtaskList = ({ taskId }: { taskId: string }) => {
  // api query: get subtasks
  const { data: subtasks, isLoading } = api.subtask.getSubtasks.useQuery({
    taskId,
  });

  if (!subtasks || isLoading) {
    return (
      <Loader2
        className="mx-auto my-8 animate-spin text-teal-200 transition-transform dark:text-teal-300"
        size={64}
      />
    );
  }

  // subtask stats
  const subtasksComplete = subtasks.filter(
    (subtask) => subtask.isComplete
  ).length;

  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-bold text-slate-600 dark:text-slate-400">
        Subtasks ({subtasksComplete} of {subtasks.length})
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
