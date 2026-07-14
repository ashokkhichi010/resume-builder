import type { ResumeProfile, TemplateId } from "@/shared/lib/resume-types";
import { Classic } from "./Classic";
import { Minimalist } from "./Minimalist";
import { TechLead } from "./TechLead";
import { Executive } from "./Executive";
import { Startup } from "./Startup";
import { Atlas } from "./Atlas";
import { Nexus } from "./Nexus";
import { Prisma } from "./Prisma";
import { Nova } from "./Nova";
import { Ridge } from "./Ridge";

function filterProfile(p: ResumeProfile): ResumeProfile {
  const vis = p.sectionVisibility || {};

  return {
    ...p,
    skills: vis.skills !== false 
      ? p.skills 
      : { languages: "", frameworks: "", tools: "", databases: "", other: "" },
    experience: vis.experience !== false 
      ? p.experience
          .filter(e => !e.hidden)
          .map(e => ({ ...e, bullets: e.bullets.filter((b, i) => b && !e.hiddenBullets?.includes(i)) }))
      : [],
    projects: vis.projects !== false
      ? p.projects
          .filter(pr => !pr.hidden)
          .map(pr => ({ ...pr, bullets: pr.bullets.filter((b, i) => b && !pr.hiddenBullets?.includes(i)) }))
      : [],
    education: vis.education !== false ? (p.education || []).filter(ed => !ed.hidden) : [],
    achievements: vis.achievements !== false ? (p.achievements || []).filter(ach => !ach.hidden) : [],
    certificates: vis.certificates !== false ? (p.certificates || []).filter(c => !c.hidden) : [],
  };
}

export function TemplateRenderer({ profile }: { profile: ResumeProfile }) {
  const filtered = filterProfile(profile);
  
  switch (filtered.selectedTemplateId as TemplateId) {
    case "classic": return <Classic p={filtered} />;
    case "techlead": return <TechLead p={filtered} />;
    case "executive": return <Executive p={filtered} />;
    case "startup": return <Startup p={filtered} />;
    case "atlas": return <Atlas p={filtered} />;
    case "nexus": return <Nexus p={filtered} />;
    case "prisma": return <Prisma p={filtered} />;
    case "nova": return <Nova p={filtered} />;
    case "ridge": return <Ridge p={filtered} />;
    case "minimalist":
    default: return <Minimalist p={filtered} />;
  }
}