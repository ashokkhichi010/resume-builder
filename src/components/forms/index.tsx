import { useState } from "react";
import { useResume } from "@/Providers/resume-provider";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Button } from "@/shared/ui/button";
import { Plus, AlertCircle, ChevronLeft, ChevronRight, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
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

const STEPS = [
  { id: "personalInfo", label: "Personal Info" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Work Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "achievements", label: "Achievements" },
  { id: "certificates", label: "Certificates" },
];

export function Forms() {
  const { active, updateActive } = useResume();
  const [currentStep, setCurrentStep] = useState(0);

  const p = active;
  const setPI = (patch: Partial<ResumeProfile["personalInfo"]>) =>
    updateActive({ personalInfo: { ...p.personalInfo, ...patch } });
  const setSkills = (patch: Partial<ResumeProfile["skills"]>) =>
    updateActive({ skills: { ...p.skills, ...patch } });

  const handleDelete = <K extends keyof ResumeProfile>(key: K, id: string) => {
    const arr = p[key] as any[];
    if (!arr) return;
    const previous = [...arr];
    updateActive({ [key]: arr.filter((x: any) => x.id !== id) } as any);
    toast("Item deleted", {
      action: {
        label: "Undo",
        onClick: () => updateActive({ [key]: previous } as any)
      }
    });
  };

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

  const handleNext = () => setCurrentStep(s => Math.min(STEPS.length - 1, s + 1));
  const handlePrev = () => setCurrentStep(s => Math.max(0, s - 1));

  return (
    <div className="space-y-6">
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

      {/* Stepper Header */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {STEPS.map((step, i) => (
          <button
            key={step.id}
            onClick={() => setCurrentStep(i)}
            className={cn(
              "px-3 py-1.5 text-sm font-medium whitespace-nowrap rounded-full transition-colors border",
              currentStep === i
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-muted-foreground border-transparent hover:border-border hover:bg-muted/50"
            )}
          >
            {i + 1}. {step.label}
          </button>
        ))}
      </div>

      {/* Step Content */}
      <div className="">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-bold">{STEPS[currentStep].label}</h2>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => {
              const sectionKey = STEPS[currentStep].id as keyof ResumeProfile["sectionVisibility"];
              const currentVisibility = active.sectionVisibility?.[sectionKey];
              const isHidden = currentVisibility === false; // undefined or true means visible
              updateActive({
                sectionVisibility: {
                  ...(active.sectionVisibility || {}),
                  [sectionKey]: isHidden ? true : false // toggle between false (hidden) and true (visible)
                }
              });
            }}
            title={active.sectionVisibility?.[STEPS[currentStep].id as keyof ResumeProfile["sectionVisibility"]] === false ? "Show section on resume" : "Hide section from resume"}
          >
            {active.sectionVisibility?.[STEPS[currentStep].id as keyof ResumeProfile["sectionVisibility"]] === false ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </Button>
        </div>

        <div className="flex-1">
          {currentStep === 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
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
            </div>
          )}

          {currentStep === 1 && (
            <div className="grid gap-4">
              {(["languages", "frameworks", "tools", "databases", "other"] as const).map(k => (
                <Field key={k} label={k}>
                  <Input value={p.skills[k]} onChange={(e) => setSkills({ [k]: e.target.value })} placeholder="Comma-separated" />
                </Field>
              ))}
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground mb-2">
                Total bullets: {p.experience.reduce((acc, e) => acc + e.bullets.length, 0)}
              </div>
              {p.experience.map((e, i) => (
                <ExperienceCard key={e.id} exp={e} index={i} total={p.experience.length} limits={limits}
                  onChange={(next) => updateActive({ experience: p.experience.map(x => x.id === e.id ? next : x) })}
                  onDelete={() => handleDelete("experience", e.id)}
                  onMove={(dir) => updateActive({ experience: move(p.experience, i, dir) })}
                />
              ))}
              <Button variant="outline" className="w-full border-dashed" onClick={() => updateActive({
                experience: [...p.experience, { id: uid(), company: "", role: "", location: "", startDate: "", endDate: "", current: false, bullets: [""] }],
              })}>
                <Plus className="h-4 w-4 mr-2" /> Add Experience
              </Button>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground mb-2">
                Total bullets: {p.projects.reduce((acc, e) => acc + e.bullets.length, 0)}
              </div>
              {p.projects.map((pr, i) => (
                <ProjectCard key={pr.id} project={pr} index={i} total={p.projects.length} limits={limits}
                  onChange={(next) => updateActive({ projects: p.projects.map(x => x.id === pr.id ? next : x) })}
                  onDelete={() => handleDelete("projects", pr.id)}
                  onMove={(dir) => updateActive({ projects: move(p.projects, i, dir) })}
                />
              ))}
              <Button variant="outline" className="w-full border-dashed" onClick={() => updateActive({
                projects: [...p.projects, { id: uid(), name: "", tech: "", link: "", bullets: [""] }],
              })}>
                <Plus className="h-4 w-4 mr-2" /> Add Project
              </Button>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              {p.education.map((ed, i) => (
                <EducationCard key={ed.id} ed={ed} index={i} total={p.education.length} limits={limits}
                  onChange={(next) => updateActive({ education: p.education.map(x => x.id === ed.id ? next : x) })}
                  onDelete={() => handleDelete("education", ed.id)}
                  onMove={(dir) => updateActive({ education: move(p.education, i, dir) })}
                />
              ))}
              <Button variant="outline" className="w-full border-dashed" onClick={() => updateActive({
                education: [...p.education, { id: uid(), school: "", degree: "", location: "", startDate: "", endDate: "", details: "" }],
              })}>
                <Plus className="h-4 w-4 mr-2" /> Add Education
              </Button>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-4">
              {p.achievements?.map((ach, i) => (
                <AchievementCard key={ach.id} ach={ach} index={i} total={p.achievements.length}
                  onChange={(next) => updateActive({ achievements: p.achievements.map(x => x.id === ach.id ? next : x) })}
                  onDelete={() => handleDelete("achievements", ach.id)}
                  onMove={(dir) => updateActive({ achievements: move(p.achievements, i, dir) })}
                />
              ))}
              <Button variant="outline" className="w-full border-dashed" onClick={() => updateActive({
                achievements: [...(p.achievements || []), { id: uid(), title: "", date: "", description: "" }],
              })}>
                <Plus className="h-4 w-4 mr-2" /> Add Achievement
              </Button>
            </div>
          )}

          {currentStep === 6 && (
            <div className="space-y-4">
              {p.certificates?.map((cert, i) => (
                <CertificateCard key={cert.id} cert={cert} index={i} total={p.certificates.length}
                  onChange={(next) => updateActive({ certificates: p.certificates.map(x => x.id === cert.id ? next : x) })}
                  onDelete={() => handleDelete("certificates", cert.id)}
                  onMove={(dir) => updateActive({ certificates: move(p.certificates, i, dir) })}
                />
              ))}
              <Button variant="outline" className="w-full border-dashed" onClick={() => updateActive({
                certificates: [...(p.certificates || []), { id: uid(), title: "", issuer: "", date: "", link: "" }],
              })}>
                <Plus className="h-4 w-4 mr-2" /> Add Certificate
              </Button>
            </div>
          )}
        </div>

        {/* Stepper Navigation */}
        <div className="mt-8 pt-4 border-t flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentStep === STEPS.length - 1}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
