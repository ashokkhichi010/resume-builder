export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
}

export interface CategorizedSkills {
  languages: string;
  frameworks: string;
  tools: string;
  databases: string;
  other: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface Project {
  id: string;
  name: string;
  tech: string;
  link: string;
  bullets: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  details: string;
}

export interface ResumeProfile {
  id: string;
  profileName: string;
  selectedTemplateId: string;
  personalInfo: PersonalInfo;
  skills: CategorizedSkills;
  experience: WorkExperience[];
  projects: Project[];
  education: Education[];
}

export interface AppState {
  profiles: ResumeProfile[];
  activeProfileId: string;
}

export const TEMPLATE_IDS = [
  "classic",
  "minimalist",
  "techlead",
  "executive",
  "startup",
] as const;
export type TemplateId = (typeof TEMPLATE_IDS)[number];

export const TEMPLATE_META: Record<TemplateId, { name: string; description: string }> = {
  classic: { name: "Classic Corporate", description: "Georgia serif, centered header" },
  minimalist: { name: "Modern Minimalist", description: "Inter, left-aligned, airy" },
  techlead: { name: "Tech Lead", description: "Monospace tech tags, bold sans" },
  executive: { name: "Executive Sleek", description: "Slate navy headers, dense" },
  startup: { name: "Startup Builder", description: "Roles left, dates right" },
};