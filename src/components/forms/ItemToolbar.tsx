import { Button } from "@/shared/ui/button";
import { ArrowDown, ArrowUp, Trash2, Eye, EyeOff } from "lucide-react";
import { ConfirmDialog } from "./ConfirmDialog";

export function ItemToolbar({ index, total, onMove, onDelete, hidden, onToggleHide }: {
  index: number; total: number; onMove: (dir: -1 | 1) => void; onDelete: () => void;
  hidden?: boolean; onToggleHide?: () => void;
}) {
  return (
    <div className="flex items-center gap-1 shrink-0">
      {onToggleHide && (
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={onToggleHide} title={hidden ? "Show on resume" : "Hide from resume"}>
          {hidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      )}
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onMove(-1)} disabled={index === 0}><ArrowUp className="h-4 w-4" /></Button>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onMove(1)} disabled={index === total - 1}><ArrowDown className="h-4 w-4" /></Button>
      
      <ConfirmDialog 
        onConfirm={onDelete}
        title="Are you sure?"
        description="This will remove the item from your resume. You can undo this action immediately after."
      >
        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </ConfirmDialog>
    </div>
  );
}
