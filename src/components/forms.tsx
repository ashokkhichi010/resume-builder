import { useResume } from "@/Providers/resume-provider";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui/accordion";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { uid } from "@/shared/lib/resume-seed";
import type { Education, Project, ResumeProfile, WorkExperience } from "@/shared/lib/resume-types";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function move<T>(arr: T[], i: number, dir: -1 | 1): T[] {
  const j = i + dir;
  if (j < 0 || j >= arr.length) return arr;
  const copy = arr.slice();
  [copy[i], copy[j]] = [copy[j], copy[i]];
  return copy;
}

export function Forms() {
  const { active, updateActive } = useResume();
  const p = active;
  const setPI = (patch: Partial<ResumeProfile["personalInfo"]>) =>
    updateActive({ personalInfo: { ...p.personalInfo, ...patch } });
  const setSkills = (patch: Partial<ResumeProfile["skills"]>) =>
    updateActive({ skills: { ...p.skills, ...patch } });

  return (
    <Accordion type="multiple" defaultValue={["personal", "experience"]} className="space-y-3">
      <AccordionItem value="personal" className="border rounded-lg bg-card">
        <AccordionTrigger className="px-4 py-3 text-sm font-semibold">Personal Info</AccordionTrigger>
        <AccordionContent className="px-4 pb-4 grid gap-3 sm:grid-cols-2">
          <Field label="Full name"><Input value={p.personalInfo.fullName} onChange={(e)=>setPI({fullName:e.target.value})}/></Field>
          <Field label="Headline / Title"><Input value={p.personalInfo.title} onChange={(e)=>setPI({title:e.target.value})}/></Field>
          <Field label="Email"><Input value={p.personalInfo.email} onChange={(e)=>setPI({email:e.target.value})}/></Field>
          <Field label="Phone"><Input value={p.personalInfo.phone} onChange={(e)=>setPI({phone:e.target.value})}/></Field>
          <Field label="Location"><Input value={p.personalInfo.location} onChange={(e)=>setPI({location:e.target.value})}/></Field>
          <Field label="Website"><Input value={p.personalInfo.website} onChange={(e)=>setPI({website:e.target.value})}/></Field>
          <Field label="LinkedIn"><Input value={p.personalInfo.linkedin} onChange={(e)=>setPI({linkedin:e.target.value})}/></Field>
          <Field label="GitHub"><Input value={p.personalInfo.github} onChange={(e)=>setPI({github:e.target.value})}/></Field>
          <div className="sm:col-span-2">
            <Field label="Summary">
              <Textarea rows={4} value={p.personalInfo.summary} onChange={(e)=>setPI({summary:e.target.value})}/>
            </Field>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="skills" className="border rounded-lg bg-card">
        <AccordionTrigger className="px-4 py-3 text-sm font-semibold">Skills</AccordionTrigger>
        <AccordionContent className="px-4 pb-4 grid gap-3">
          {(["languages","frameworks","tools","databases","other"] as const).map(k => (
            <Field key={k} label={k}>
              <Input value={p.skills[k]} onChange={(e)=>setSkills({[k]:e.target.value})} placeholder="Comma-separated"/>
            </Field>
          ))}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="experience" className="border rounded-lg bg-card">
        <AccordionTrigger className="px-4 py-3 text-sm font-semibold">Work Experience</AccordionTrigger>
        <AccordionContent className="px-4 pb-4 space-y-3">
          {p.experience.map((e, i) => (
            <ExperienceCard key={e.id} exp={e} index={i} total={p.experience.length}
              onChange={(next) => updateActive({ experience: p.experience.map(x => x.id === e.id ? next : x) })}
              onDelete={() => updateActive({ experience: p.experience.filter(x => x.id !== e.id) })}
              onMove={(dir) => updateActive({ experience: move(p.experience, i, dir) })}
            />
          ))}
          <Button variant="outline" size="sm" onClick={() => updateActive({
            experience: [...p.experience, { id: uid(), company: "", role: "", location: "", startDate: "", endDate: "", current: false, bullets: [""] }],
          })}>
            <Plus className="h-4 w-4"/> Add experience
          </Button>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="projects" className="border rounded-lg bg-card">
        <AccordionTrigger className="px-4 py-3 text-sm font-semibold">Projects</AccordionTrigger>
        <AccordionContent className="px-4 pb-4 space-y-3">
          {p.projects.map((pr, i) => (
            <ProjectCard key={pr.id} project={pr} index={i} total={p.projects.length}
              onChange={(next) => updateActive({ projects: p.projects.map(x => x.id === pr.id ? next : x) })}
              onDelete={() => updateActive({ projects: p.projects.filter(x => x.id !== pr.id) })}
              onMove={(dir) => updateActive({ projects: move(p.projects, i, dir) })}
            />
          ))}
          <Button variant="outline" size="sm" onClick={() => updateActive({
            projects: [...p.projects, { id: uid(), name: "", tech: "", link: "", bullets: [""] }],
          })}>
            <Plus className="h-4 w-4"/> Add project
          </Button>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="education" className="border rounded-lg bg-card">
        <AccordionTrigger className="px-4 py-3 text-sm font-semibold">Education</AccordionTrigger>
        <AccordionContent className="px-4 pb-4 space-y-3">
          {p.education.map((ed, i) => (
            <EducationCard key={ed.id} ed={ed} index={i} total={p.education.length}
              onChange={(next) => updateActive({ education: p.education.map(x => x.id === ed.id ? next : x) })}
              onDelete={() => updateActive({ education: p.education.filter(x => x.id !== ed.id) })}
              onMove={(dir) => updateActive({ education: move(p.education, i, dir) })}
            />
          ))}
          <Button variant="outline" size="sm" onClick={() => updateActive({
            education: [...p.education, { id: uid(), school: "", degree: "", location: "", startDate: "", endDate: "", details: "" }],
          })}>
            <Plus className="h-4 w-4"/> Add education
          </Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function ItemToolbar({ index, total, onMove, onDelete }: {
  index: number; total: number; onMove: (dir: -1 | 1) => void; onDelete: () => void;
}) {
  return (
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="icon" onClick={() => onMove(-1)} disabled={index === 0}><ArrowUp className="h-4 w-4"/></Button>
      <Button variant="ghost" size="icon" onClick={() => onMove(1)} disabled={index === total - 1}><ArrowDown className="h-4 w-4"/></Button>
      <Button variant="ghost" size="icon" onClick={onDelete}><Trash2 className="h-4 w-4"/></Button>
    </div>
  );
}

function BulletsEditor({ bullets, onChange }: { bullets: string[]; onChange: (b: string[]) => void }) {
  return (
    <div className="space-y-2">
      {bullets.map((b, i) => (
        <div key={i} className="flex gap-2">
          <Textarea rows={2} value={b} onChange={(e) => {
            const next = bullets.slice(); next[i] = e.target.value; onChange(next);
          }}/>
          <Button variant="ghost" size="icon" onClick={() => onChange(bullets.filter((_, idx) => idx !== i))}>
            <Trash2 className="h-4 w-4"/>
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={() => onChange([...bullets, ""])}>
        <Plus className="h-4 w-4"/> Add bullet
      </Button>
    </div>
  );
}

function ExperienceCard({ exp, index, total, onChange, onDelete, onMove }: {
  exp: WorkExperience; index: number; total: number;
  onChange: (e: WorkExperience) => void; onDelete: () => void; onMove: (dir: -1 | 1) => void;
}) {
  return (
    <Card className="p-3 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="text-sm font-medium truncate min-w-0">{exp.role || "New role"} {exp.company && <span className="text-muted-foreground">· {exp.company}</span>}</div>
        <ItemToolbar index={index} total={total} onMove={onMove} onDelete={onDelete}/>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Role"><Input value={exp.role} onChange={(e)=>onChange({...exp, role:e.target.value})}/></Field>
        <Field label="Company"><Input value={exp.company} onChange={(e)=>onChange({...exp, company:e.target.value})}/></Field>
        <Field label="Location"><Input value={exp.location} onChange={(e)=>onChange({...exp, location:e.target.value})}/></Field>
        <div className="grid grid-cols-2 gap-2">
          <Field label="Start (YYYY-MM)"><Input value={exp.startDate} onChange={(e)=>onChange({...exp, startDate:e.target.value})} placeholder="2022-03"/></Field>
          <Field label="End (YYYY-MM)"><Input disabled={exp.current} value={exp.endDate} onChange={(e)=>onChange({...exp, endDate:e.target.value})} placeholder="2024-08"/></Field>
        </div>
        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input type="checkbox" checked={exp.current} onChange={(e)=>onChange({...exp, current:e.target.checked, endDate: e.target.checked ? "" : exp.endDate})}/>
          Current role
        </label>
      </div>
      <Field label="Bullets"><BulletsEditor bullets={exp.bullets} onChange={(b)=>onChange({...exp, bullets:b})}/></Field>
    </Card>
  );
}

function ProjectCard({ project, index, total, onChange, onDelete, onMove }: {
  project: Project; index: number; total: number;
  onChange: (e: Project) => void; onDelete: () => void; onMove: (dir: -1 | 1) => void;
}) {
  return (
    <Card className="p-3 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="text-sm font-medium truncate min-w-0">{project.name || "New project"}</div>
        <ItemToolbar index={index} total={total} onMove={onMove} onDelete={onDelete}/>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Name"><Input value={project.name} onChange={(e)=>onChange({...project, name:e.target.value})}/></Field>
        <Field label="Link"><Input value={project.link} onChange={(e)=>onChange({...project, link:e.target.value})}/></Field>
        <div className="sm:col-span-2"><Field label="Tech"><Input value={project.tech} onChange={(e)=>onChange({...project, tech:e.target.value})}/></Field></div>
      </div>
      <Field label="Bullets"><BulletsEditor bullets={project.bullets} onChange={(b)=>onChange({...project, bullets:b})}/></Field>
    </Card>
  );
}

function EducationCard({ ed, index, total, onChange, onDelete, onMove }: {
  ed: Education; index: number; total: number;
  onChange: (e: Education) => void; onDelete: () => void; onMove: (dir: -1 | 1) => void;
}) {
  return (
    <Card className="p-3 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="text-sm font-medium truncate min-w-0">{ed.school || "New school"}</div>
        <ItemToolbar index={index} total={total} onMove={onMove} onDelete={onDelete}/>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="School"><Input value={ed.school} onChange={(e)=>onChange({...ed, school:e.target.value})}/></Field>
        <Field label="Degree"><Input value={ed.degree} onChange={(e)=>onChange({...ed, degree:e.target.value})}/></Field>
        <Field label="Location"><Input value={ed.location} onChange={(e)=>onChange({...ed, location:e.target.value})}/></Field>
        <div className="grid grid-cols-2 gap-2">
          <Field label="Start"><Input value={ed.startDate} onChange={(e)=>onChange({...ed, startDate:e.target.value})} placeholder="2013-09"/></Field>
          <Field label="End"><Input value={ed.endDate} onChange={(e)=>onChange({...ed, endDate:e.target.value})} placeholder="2017-05"/></Field>
        </div>
        <div className="sm:col-span-2"><Field label="Details"><Input value={ed.details} onChange={(e)=>onChange({...ed, details:e.target.value})}/></Field></div>
      </div>
    </Card>
  );
}