import { api } from "~/utils/api";
import SubtaskCard from "./SubtaskCard";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const SubtaskList = ({ taskId }: { taskId: string }) => {
  const [parent, enableAnimations] = useAutoAnimate(/** optional config */);

  // api query: get subtasks
  const { data: subtasks } = api.subtask.getSubtasks.useQuery({ taskId });

  if (!subtasks) return null;

  // subtask stats
  const subtasksComplete = subtasks.filter(
    (subtask) => subtask.isComplete
  ).length;
  const subtasksTotal = subtasks.length;

  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-bold text-slate-600 dark:text-slate-400">
        Subtasks ({subtasksComplete} of {subtasksTotal})
      </p>
      <ul ref={parent} className="flex flex-col gap-2">
        {subtasks.map((s) => (
          <SubtaskCard key={s.id} subtask={s} taskId={taskId} />
        ))}
      </ul>
    </div>
  );
};

export default SubtaskList;
