import { Card } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Field } from "./Field";
import { ItemToolbar } from "./ItemToolbar";
import { BulletsEditor } from "./BulletsEditor";
import type { WorkExperience } from "@/shared/lib/resume-types";

export function ExperienceCard({ exp, index, total, onChange, onDelete, onMove, limits }: {
  exp: WorkExperience; index: number; total: number; limits: { bullets: number, maxBulletsCharLength: number };
  onChange: (e: WorkExperience) => void; onDelete: () => void; onMove: (dir: -1 | 1) => void;
}) {
  return (
    <Card className="p-3 space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-2 sm:border-none sm:pb-0">
        <div className="text-sm font-medium truncate min-w-0">{exp.role || "New role"} {exp.company && <span className="text-muted-foreground">· {exp.company}</span>}</div>
        <ItemToolbar index={index} total={total} onMove={onMove} onDelete={onDelete} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Role"><Input value={exp.role} onChange={(e) => onChange({ ...exp, role: e.target.value })} /></Field>
        <Field label="Company"><Input value={exp.company} onChange={(e) => onChange({ ...exp, company: e.target.value })} /></Field>
        <Field label="Location"><Input value={exp.location} onChange={(e) => onChange({ ...exp, location: e.target.value })} /></Field>
        <div className="grid grid-cols-2 gap-2">
          <Field label="Start (YYYY-MM)"><Input value={exp.startDate} onChange={(e) => onChange({ ...exp, startDate: e.target.value })} placeholder="2022-03" /></Field>
          <Field label="End (YYYY-MM)"><Input disabled={exp.current} value={exp.endDate} onChange={(e) => onChange({ ...exp, endDate: e.target.value })} placeholder="2024-08" /></Field>
        </div>
        <label className="flex items-center gap-2 text-sm sm:col-span-2 cursor-pointer">
          <input type="checkbox" className="rounded border-input text-primary focus:ring-primary" checked={exp.current} onChange={(e) => onChange({ ...exp, current: e.target.checked, endDate: e.target.checked ? "" : exp.endDate })} />
          Current role
        </label>
      </div>
      <Field label="Bullets"><BulletsEditor maxBullets={limits.bullets} maxChar={limits.maxBulletsCharLength} bullets={exp.bullets} onChange={(b) => onChange({ ...exp, bullets: b })} /></Field>
    </Card>
  );
}
