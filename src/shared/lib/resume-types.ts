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
  hidden?: boolean;
  hiddenBullets?: number[];
}

export interface Project {
  id: string;
  name: string;
  tech: string;
  link: string;
  bullets: string[];
  hidden?: boolean;
  hiddenBullets?: number[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  details: string;
  hidden?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  date: string;
  description: string;
  hidden?: boolean;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  link: string;
  hidden?: boolean;
}

export interface SectionVisibility {
  summary?: boolean;
  skills?: boolean;
  experience?: boolean;
  projects?: boolean;
  education?: boolean;
  achievements?: boolean;
  certificates?: boolean;
}

export type SectionKey = "summary" | "skills" | "experience" | "projects" | "education" | "achievements" | "certificates";

export const DEFAULT_SECTION_ORDER: SectionKey[] = [
  "summary",
  "experience",
  "projects",
  "skills",
  "education",
  "achievements",
  "certificates",
];

export interface ResumeProfile {
  id: string;
  profileName: string;
  selectedTemplateId: string;
  pageCount: 1 | 2;
  sectionVisibility?: SectionVisibility;
  sectionOrder?: SectionKey[];
  personalInfo: PersonalInfo;
  skills: CategorizedSkills;
  experience: WorkExperience[];
  projects: Project[];
  education: Education[];
  achievements: Achievement[];
  certificates: Certificate[];
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
  "atlas",
  "nexus",
  "prisma",
  "nova",
  "ridge",
] as const;
export type TemplateId = (typeof TEMPLATE_IDS)[number];

export const TEMPLATE_META: Record<TemplateId, { name: string; description: string }> = {
  classic: { name: "Classic Corporate", description: "Georgia serif, centered header" },
  minimalist: { name: "Modern Minimalist", description: "Inter, left-aligned, airy" },
  techlead: { name: "Tech Lead", description: "Monospace tech tags, bold sans" },
  executive: { name: "Executive Sleek", description: "Slate navy headers, dense" },
  startup: { name: "Startup Builder", description: "Roles left, dates right" },
  atlas: { name: "Atlas", description: "Bold left border, clean sans, numbered pills" },
  nexus: { name: "Nexus", description: "Dark header band, white name, light body" },
  prisma: { name: "Prisma", description: "Teal accent color, sleek rules" },
  nova: { name: "Nova", description: "Warm minimal tones, compact elegant" },
  ridge: { name: "Ridge", description: "Editorial style, thick horizontal rules" },
};

export const PAGE_LIMITS = {
  bullets: { 1: 3, 2: 5 },
  totalBullets: { 1: 12, 2: 24 },
  sections: { 1: 7, 2: 9 },
  bulletsCharLength: { 1: 100, 2: 160 },
  summaryCharLength: { 1: 300, 2: 500 },
  detailsCharLength: { 1: 100, 2: 150 }
} as const;