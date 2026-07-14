import { Card } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Field } from "./Field";
import { ItemToolbar } from "./ItemToolbar";
import { BulletsEditor } from "./BulletsEditor";
import type { Project } from "@/shared/lib/resume-types";

export function ProjectCard({ project, index, total, onChange, onDelete, onMove, limits }: {
  project: Project; index: number; total: number; limits: { bullets: number, maxBulletsCharLength: number };
  onChange: (e: Project) => void; onDelete: () => void; onMove: (dir: -1 | 1) => void;
}) {
  return (
    <Card className={`p-3 space-y-3 transition-opacity duration-200 ${project.hidden ? 'opacity-50' : ''}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-2 sm:border-none sm:pb-0">
        <div className="text-sm font-medium truncate min-w-0">{project.name || "New project"}</div>
        <ItemToolbar index={index} total={total} onMove={onMove} onDelete={onDelete} hidden={project.hidden} onToggleHide={() => onChange({ ...project, hidden: !project.hidden })} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Name"><Input value={project.name} onChange={(e) => onChange({ ...project, name: e.target.value })} /></Field>
        <Field label="Link"><Input value={project.link} onChange={(e) => onChange({ ...project, link: e.target.value })} /></Field>
        <div className="sm:col-span-2"><Field label="Tech"><Input value={project.tech} onChange={(e) => onChange({ ...project, tech: e.target.value })} /></Field></div>
      </div>
      <Field label="Bullets">
        <BulletsEditor 
          maxBullets={limits.bullets} 
          maxChar={limits.maxBulletsCharLength} 
          bullets={project.bullets} 
          onChange={(b) => onChange({ ...project, bullets: b })} 
          hiddenBullets={project.hiddenBullets}
          onToggleHide={(idx) => {
            const arr = project.hiddenBullets || [];
            const next = arr.includes(idx) ? arr.filter(i => i !== idx) : [...arr, idx];
            onChange({ ...project, hiddenBullets: next });
          }}
        />
      </Field>
    </Card>
  );
}
