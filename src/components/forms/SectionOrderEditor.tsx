import { useResume } from "@/Providers/resume-provider";
import type { SectionKey } from "@/shared/lib/resume-types";
import { DEFAULT_SECTION_ORDER } from "@/shared/lib/resume-types";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { Button } from "@/shared/ui/button";

const SECTION_LABELS: Record<SectionKey, string> = {
  summary: "Summary",
  experience: "Experience",
  projects: "Projects",
  skills: "Skills",
  education: "Education",
  achievements: "Achievements",
  certificates: "Certificates",
};

function SortableItem({ id, label }: { id: string; label: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 bg-card border rounded-md p-3 mb-2 shadow-sm ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab hover:text-foreground text-muted-foreground active:cursor-grabbing"
      >
        <GripVertical className="h-5 w-5" />
      </div>
      <span className="font-medium text-sm">{label}</span>
    </div>
  );
}

export function SectionOrderEditor() {
  const { active, updateActive } = useResume();
  const order = active.sectionOrder || DEFAULT_SECTION_ORDER;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active: dragged, over } = event;

    if (over && dragged.id !== over.id) {
      const oldIndex = order.indexOf(dragged.id as SectionKey);
      const newIndex = order.indexOf(over.id as SectionKey);
      
      const newOrder = arrayMove(order, oldIndex, newIndex);
      updateActive({ sectionOrder: newOrder });
    }
  };

  const resetOrder = () => {
    updateActive({ sectionOrder: [...DEFAULT_SECTION_ORDER] });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Section Order</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Drag and drop to rearrange how sections appear on your resume.
        </p>
      </div>

      <div className="max-w-sm">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={order}
            strategy={verticalListSortingStrategy}
          >
            {order.map((key) => (
              <SortableItem key={key} id={key} label={SECTION_LABELS[key]} />
            ))}
          </SortableContext>
        </DndContext>
      </div>

      <div className="pt-4 border-t">
        <Button variant="outline" onClick={resetOrder}>
          Reset to Default
        </Button>
      </div>
    </div>
  );
}
