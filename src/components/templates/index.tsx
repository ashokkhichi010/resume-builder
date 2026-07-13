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

export function TemplateRenderer({ profile }: { profile: ResumeProfile }) {
  switch (profile.selectedTemplateId as TemplateId) {
    case "classic": return <Classic p={profile} />;
    case "techlead": return <TechLead p={profile} />;
    case "executive": return <Executive p={profile} />;
    case "startup": return <Startup p={profile} />;
    case "atlas": return <Atlas p={profile} />;
    case "nexus": return <Nexus p={profile} />;
    case "prisma": return <Prisma p={profile} />;
    case "nova": return <Nova p={profile} />;
    case "ridge": return <Ridge p={profile} />;
    case "minimalist":
    default: return <Minimalist p={profile} />;
  }
}