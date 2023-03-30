import { api } from "~/utils/api";
import SubtaskCard from "./SubtaskCard";
import { Loader2 } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import type { Subtask } from "@prisma/client";

const SubtaskList = ({ taskId }: { taskId: string }) => {
  // api query: get subtasks
  const { data: subtasks, isLoading } = api.subtask.getSubtasks.useQuery({
    taskId,
  });

  // dnd-kit
  const [items, setItems] = useState<Subtask[]>([]);

  useEffect(() => {
    if (subtasks) {
      setItems(subtasks);
    }
  }, [subtasks]);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  // subtask stats
  const subtasksComplete = subtasks?.filter(
    (subtask) => subtask.isComplete
  ).length;

  if (isLoading)
    return (
      <Loader2
        className="mx-auto my-8 animate-spin text-teal-200 transition-transform dark:text-teal-300"
        size={64}
      />
    );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col gap-1">
        <p className="text-xs font-bold text-slate-600 dark:text-slate-400">
          Subtasks ({subtasksComplete} of {subtasks?.length})
        </p>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <ul className="flex flex-col gap-2">
            {items?.map((s) => (
              <SubtaskCard key={s.id} subtask={s} taskId={taskId} />
            ))}
          </ul>
        </SortableContext>
      </div>
    </DndContext>
  );
};

export default SubtaskList;
