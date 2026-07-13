import { useResume } from "@/Providers/resume-provider";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Button } from "@/shared/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui/accordion";
import { Plus, AlertCircle } from "lucide-react";
import { uid } from "@/shared/lib/resume-seed";
import { PAGE_LIMITS, type ResumeProfile } from "@/shared/lib/resume-types";
import { cn } from "@/shared/lib/utils";

import { Field } from "./Field";
import { ExperienceCard } from "./ExperienceCard";
import { ProjectCard } from "./ProjectCard";
import { EducationCard } from "./EducationCard";
import { AchievementCard } from "./AchievementCard";
import { CertificateCard } from "./CertificateCard";

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

  const pageCount = p.pageCount || 1;
  const limits = {
    bullets: PAGE_LIMITS.bullets[pageCount],
    totalBullets: PAGE_LIMITS.totalBullets[pageCount],
    sections: PAGE_LIMITS.sections[pageCount],
    maxBulletsCharLength: PAGE_LIMITS.bulletsCharLength[pageCount],
    maxSummaryCharLength: PAGE_LIMITS.summaryCharLength[pageCount],
    maxDetailsCharLength: PAGE_LIMITS.detailsCharLength[pageCount],
  };

  const totalBullets =
    p.experience.reduce((acc, e) => acc + e.bullets.length, 0) +
    p.projects.reduce((acc, e) => acc + e.bullets.length, 0);

  const sectionCount =
    1 + // Personal Info
    (Object.values(p.skills).some(v => v.trim()) ? 1 : 0) +
    (p.experience.length > 0 ? 1 : 0) +
    (p.projects.length > 0 ? 1 : 0) +
    (p.education.length > 0 ? 1 : 0) +
    ((p.achievements && p.achievements.length > 0) ? 1 : 0) +
    ((p.certificates && p.certificates.length > 0) ? 1 : 0);

  const errors = [];
  if (sectionCount > limits.sections) {
    errors.push(`Too many sections (${sectionCount}/${limits.sections}). Remove a section or increase page count.`);
  }
  if (totalBullets > limits.totalBullets) {
    errors.push(`Too many total bullets (${totalBullets}/${limits.totalBullets}).`);
  }

  const hasOverlongBullets =
    p.experience.some(e => e.bullets.some(b => b.length > limits.maxBulletsCharLength)) ||
    p.projects.some(pr => pr.bullets.some(b => b.length > limits.maxBulletsCharLength));

  if (hasOverlongBullets) {
    errors.push(`One or more bullets exceed the maximum character limit (${limits.maxBulletsCharLength} chars).`);
  }

  const summaryLength = p.personalInfo.summary.length;
  if (summaryLength > limits.maxSummaryCharLength) {
    errors.push(`Summary exceeds maximum character limit (${limits.maxSummaryCharLength} chars).`);
  }

  const hasOverlongDetails = p.education.some(ed => ed.details.length > limits.maxDetailsCharLength);
  if (hasOverlongDetails) {
    errors.push(`One or more education details exceed the maximum character limit (${limits.maxDetailsCharLength} chars).`);
  }

  return (
    <div className="space-y-4">
      {errors.length > 0 && (
        <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-lg flex flex-col gap-1 border border-destructive/20">
          {errors.map((e, i) => (
            <div key={i} className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{e}</span>
            </div>
          ))}
        </div>
      )}

      <Accordion type="multiple" defaultValue={["personal", "experience"]} className="space-y-3">
        <AccordionItem value="personal" className="border rounded-lg bg-card">
          <AccordionTrigger className="px-4 py-3 text-sm font-semibold">Personal Info</AccordionTrigger>
          <AccordionContent className="px-4 pb-4 grid gap-3 sm:grid-cols-2">
            <Field label="Full name"><Input value={p.personalInfo.fullName} onChange={(e) => setPI({ fullName: e.target.value })} /></Field>
            <Field label="Headline / Title"><Input value={p.personalInfo.title} onChange={(e) => setPI({ title: e.target.value })} /></Field>
            <Field label="Email"><Input value={p.personalInfo.email} onChange={(e) => setPI({ email: e.target.value })} /></Field>
            <Field label="Phone"><Input value={p.personalInfo.phone} onChange={(e) => setPI({ phone: e.target.value })} /></Field>
            <Field label="Location"><Input value={p.personalInfo.location} onChange={(e) => setPI({ location: e.target.value })} /></Field>
            <Field label="Website"><Input value={p.personalInfo.website} onChange={(e) => setPI({ website: e.target.value })} /></Field>
            <Field label="LinkedIn"><Input value={p.personalInfo.linkedin} onChange={(e) => setPI({ linkedin: e.target.value })} /></Field>
            <Field label="GitHub"><Input value={p.personalInfo.github} onChange={(e) => setPI({ github: e.target.value })} /></Field>
            <div className="sm:col-span-2">
              <Field label="Summary">
                <Textarea 
                  rows={4} 
                  value={p.personalInfo.summary} 
                  className={cn(summaryLength > limits.maxSummaryCharLength && "border-destructive focus-visible:ring-destructive")}
                  onChange={(e) => setPI({ summary: e.target.value })} 
                />
                <div className={cn("text-xs text-right mt-1", summaryLength > limits.maxSummaryCharLength ? "text-destructive font-medium" : "text-muted-foreground")}>
                  {summaryLength} / {limits.maxSummaryCharLength} chars
                </div>
              </Field>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="skills" className="border rounded-lg bg-card">
          <AccordionTrigger className="px-4 py-3 text-sm font-semibold">Skills</AccordionTrigger>
          <AccordionContent className="px-4 pb-4 grid gap-3">
            {(["languages", "frameworks", "tools", "databases", "other"] as const).map(k => (
              <Field key={k} label={k}>
                <Input value={p.skills[k]} onChange={(e) => setSkills({ [k]: e.target.value })} placeholder="Comma-separated" />
              </Field>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="experience" className="border rounded-lg bg-card">
          <AccordionTrigger className="px-4 py-3 text-sm font-semibold">
            Work Experience
            <span className="ml-2 text-xs font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              {p.experience.reduce((acc, e) => acc + e.bullets.length, 0)} bullets
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 space-y-3">
            {p.experience.map((e, i) => (
              <ExperienceCard key={e.id} exp={e} index={i} total={p.experience.length} limits={limits}
                onChange={(next) => updateActive({ experience: p.experience.map(x => x.id === e.id ? next : x) })}
                onDelete={() => updateActive({ experience: p.experience.filter(x => x.id !== e.id) })}
                onMove={(dir) => updateActive({ experience: move(p.experience, i, dir) })}
              />
            ))}
            <Button variant="outline" size="sm" onClick={() => updateActive({
              experience: [...p.experience, { id: uid(), company: "", role: "", location: "", startDate: "", endDate: "", current: false, bullets: [""] }],
            })}>
              <Plus className="h-4 w-4" /> Add experience
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="projects" className="border rounded-lg bg-card">
          <AccordionTrigger className="px-4 py-3 text-sm font-semibold">
            Projects
            <span className="ml-2 text-xs font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              {p.projects.reduce((acc, e) => acc + e.bullets.length, 0)} bullets
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 space-y-3">
            {p.projects.map((pr, i) => (
              <ProjectCard key={pr.id} project={pr} index={i} total={p.projects.length} limits={limits}
                onChange={(next) => updateActive({ projects: p.projects.map(x => x.id === pr.id ? next : x) })}
                onDelete={() => updateActive({ projects: p.projects.filter(x => x.id !== pr.id) })}
                onMove={(dir) => updateActive({ projects: move(p.projects, i, dir) })}
              />
            ))}
            <Button variant="outline" size="sm" onClick={() => updateActive({
              projects: [...p.projects, { id: uid(), name: "", tech: "", link: "", bullets: [""] }],
            })}>
              <Plus className="h-4 w-4" /> Add project
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="education" className="border rounded-lg bg-card">
          <AccordionTrigger className="px-4 py-3 text-sm font-semibold">Education</AccordionTrigger>
          <AccordionContent className="px-4 pb-4 space-y-3">
            {p.education.map((ed, i) => (
              <EducationCard key={ed.id} ed={ed} index={i} total={p.education.length} limits={limits}
                onChange={(next) => updateActive({ education: p.education.map(x => x.id === ed.id ? next : x) })}
                onDelete={() => updateActive({ education: p.education.filter(x => x.id !== ed.id) })}
                onMove={(dir) => updateActive({ education: move(p.education, i, dir) })}
              />
            ))}
            <Button variant="outline" size="sm" onClick={() => updateActive({
              education: [...p.education, { id: uid(), school: "", degree: "", location: "", startDate: "", endDate: "", details: "" }],
            })}>
              <Plus className="h-4 w-4" /> Add education
            </Button>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="achievements" className="border rounded-lg bg-card">
          <AccordionTrigger className="px-4 py-3 text-sm font-semibold">Achievements</AccordionTrigger>
          <AccordionContent className="px-4 pb-4 space-y-3">
            {p.achievements?.map((ach, i) => (
              <AchievementCard key={ach.id} ach={ach} index={i} total={p.achievements.length}
                onChange={(next) => updateActive({ achievements: p.achievements.map(x => x.id === ach.id ? next : x) })}
                onDelete={() => updateActive({ achievements: p.achievements.filter(x => x.id !== ach.id) })}
                onMove={(dir) => updateActive({ achievements: move(p.achievements, i, dir) })}
              />
            ))}
            <Button variant="outline" size="sm" onClick={() => updateActive({
              achievements: [...(p.achievements || []), { id: uid(), title: "", date: "", description: "" }],
            })}>
              <Plus className="h-4 w-4" /> Add achievement
            </Button>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="certificates" className="border rounded-lg bg-card">
          <AccordionTrigger className="px-4 py-3 text-sm font-semibold">Certificates</AccordionTrigger>
          <AccordionContent className="px-4 pb-4 space-y-3">
            {p.certificates?.map((cert, i) => (
              <CertificateCard key={cert.id} cert={cert} index={i} total={p.certificates.length}
                onChange={(next) => updateActive({ certificates: p.certificates.map(x => x.id === cert.id ? next : x) })}
                onDelete={() => updateActive({ certificates: p.certificates.filter(x => x.id !== cert.id) })}
                onMove={(dir) => updateActive({ certificates: move(p.certificates, i, dir) })}
              />
            ))}
            <Button variant="outline" size="sm" onClick={() => updateActive({
              certificates: [...(p.certificates || []), { id: uid(), title: "", issuer: "", date: "", link: "" }],
            })}>
              <Plus className="h-4 w-4" /> Add certificate
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
