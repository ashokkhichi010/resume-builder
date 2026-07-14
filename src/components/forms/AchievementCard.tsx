import { Card } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Field } from "./Field";
import { ItemToolbar } from "./ItemToolbar";
import { Textarea } from "@/shared/ui/textarea";
import type { Achievement } from "@/shared/lib/resume-types";

export function AchievementCard({ ach, index, total, onChange, onDelete, onMove }: {
  ach: Achievement; index: number; total: number;
  onChange: (a: Achievement) => void; onDelete: () => void; onMove: (dir: -1 | 1) => void;
}) {
  return (
    <Card className={`p-3 space-y-3 transition-opacity duration-200 ${ach.hidden ? 'opacity-50' : ''}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-2 sm:border-none sm:pb-0">
        <div className="text-sm font-medium truncate min-w-0">{ach.title || "New achievement"}</div>
        <ItemToolbar index={index} total={total} onMove={onMove} onDelete={onDelete} hidden={ach.hidden} onToggleHide={() => onChange({ ...ach, hidden: !ach.hidden })} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Title"><Input value={ach.title} onChange={(e) => onChange({ ...ach, title: e.target.value })} /></Field>
        <Field label="Date"><Input value={ach.date} onChange={(e) => onChange({ ...ach, date: e.target.value })} placeholder="2023-01" /></Field>
        <div className="sm:col-span-2">
          <Field label="Description">
            <Textarea 
              rows={2} 
              value={ach.description} 
              onChange={(e) => onChange({ ...ach, description: e.target.value })} 
            />
          </Field>
        </div>
      </div>
    </Card>
  );
}
