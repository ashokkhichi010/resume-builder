import { Card } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Field } from "./Field";
import { ItemToolbar } from "./ItemToolbar";
import type { Education } from "@/shared/lib/resume-types";
import { cn } from "@/shared/lib/utils";

export function EducationCard({ ed, index, total, onChange, onDelete, onMove, limits }: {
  ed: Education; index: number; total: number; limits: { maxDetailsCharLength: number };
  onChange: (e: Education) => void; onDelete: () => void; onMove: (dir: -1 | 1) => void;
}) {
  const detailsLength = ed.details.length;
  const detailsOverLimit = detailsLength > limits.maxDetailsCharLength;

  return (
    <Card className={`p-3 space-y-3 transition-opacity duration-200 ${ed.hidden ? 'opacity-50' : ''}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-2 sm:border-none sm:pb-0">
        <div className="text-sm font-medium truncate min-w-0">{ed.school || "New school"}</div>
        <ItemToolbar index={index} total={total} onMove={onMove} onDelete={onDelete} hidden={ed.hidden} onToggleHide={() => onChange({ ...ed, hidden: !ed.hidden })} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="School"><Input value={ed.school} onChange={(e) => onChange({ ...ed, school: e.target.value })} /></Field>
        <Field label="Degree"><Input value={ed.degree} onChange={(e) => onChange({ ...ed, degree: e.target.value })} /></Field>
        <Field label="Location"><Input value={ed.location} onChange={(e) => onChange({ ...ed, location: e.target.value })} /></Field>
        <div className="grid grid-cols-2 gap-2">
          <Field label="Start"><Input value={ed.startDate} onChange={(e) => onChange({ ...ed, startDate: e.target.value })} placeholder="2013-09" /></Field>
          <Field label="End"><Input value={ed.endDate} onChange={(e) => onChange({ ...ed, endDate: e.target.value })} placeholder="2017-05" /></Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Details">
            <Input 
              value={ed.details} 
              className={cn(detailsOverLimit && "border-destructive focus-visible:ring-destructive")}
              onChange={(e) => onChange({ ...ed, details: e.target.value })} 
            />
            <div className={cn("text-xs text-right mt-1", detailsOverLimit ? "text-destructive font-medium" : "text-muted-foreground")}>
              {detailsLength} / {limits.maxDetailsCharLength} chars
            </div>
          </Field>
        </div>
      </div>
    </Card>
  );
}
