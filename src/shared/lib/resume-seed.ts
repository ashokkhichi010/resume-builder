import type { ResumeProfile, AppState } from "./resume-types";
import { DEFAULT_SECTION_ORDER } from "./resume-types";

export function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

export function emptyProfile(name = "Untitled Resume"): ResumeProfile {
  return {
    id: uid(),
    profileName: name,
    role: "general",
    updatedAt: Date.now(),
    selectedTemplateId: "minimalist",
    pageCount: 1,
    sectionOrder: [...DEFAULT_SECTION_ORDER],
    personalInfo: {
      fullName: "",
      title: "",
      summary: "",
      contacts: [],
    },
    skills: { languages: "", frameworks: "", tools: "", databases: "", other: "" },
    experience: [],
    projects: [],
    education: [],
    achievements: [],
    certificates: [],
  };
}

export function seedProfile(): ResumeProfile {
  return {
    id: uid(),
    profileName: "Full Stack Track",
    role: "engineering",
    updatedAt: Date.now(),
    selectedTemplateId: "minimalist",
    pageCount: 1,
    sectionOrder: [...DEFAULT_SECTION_ORDER],
    personalInfo: {
      fullName: "Alex Morgan",
      title: "Senior Full Stack Engineer",
      summary:
        "Full-stack engineer with 7+ years shipping performant web applications across React, Node.js, and cloud infrastructure. Led teams of 4-8 engineers, cut p95 latency 62% at Northwind, and mentored six engineers to senior promotion.",
      contacts: [
        { id: uid(), title: "San Francisco, CA", link: "" },
        { id: uid(), title: "+1 (415) 555-0142", link: "tel:+14155550142" },
        { id: uid(), title: "alex.morgan@example.com", link: "mailto:alex.morgan@example.com" },
        { id: uid(), title: "alexmorgan.dev", link: "https://alexmorgan.dev" },
        { id: uid(), title: "linkedin.com/in/alexmorgan", link: "https://linkedin.com/in/alexmorgan" },
        { id: uid(), title: "github.com/alexmorgan", link: "https://github.com/alexmorgan" },
      ],
    },
    skills: {
      languages: "TypeScript, JavaScript, Python, Go, SQL",
      frameworks: "React, Next.js, Node.js, Express, FastAPI, TanStack",
      tools: "Docker, Kubernetes, Terraform, AWS, GitHub Actions, Vercel",
      databases: "PostgreSQL, Redis, DynamoDB, MongoDB",
      other: "gRPC, GraphQL, OpenTelemetry, System Design, Team Leadership",
    },
    experience: [
      {
        id: uid(),
        company: "Northwind Labs",
        role: "Senior Full Stack Engineer",
        location: "San Francisco, CA",
        startDate: "2022-03",
        endDate: "",
        current: true,
        bullets: [
          "Led migration of a 400k-LOC monolith to a modular TypeScript service mesh, reducing p95 API latency by 62%.",
          "Designed a multi-tenant billing subsystem handling $18M ARR with 99.99% uptime over 14 months.",
          "Mentored 6 engineers; 4 promoted to senior within 18 months through structured design reviews.",
        ],
      },
      {
        id: uid(),
        company: "Kestrel Analytics",
        role: "Full Stack Engineer",
        location: "Remote",
        startDate: "2019-06",
        endDate: "2022-02",
        current: false,
        bullets: [
          "Built real-time dashboards on React + WebSockets consumed by 12k daily active analysts.",
          "Owned CI/CD on GitHub Actions and Terraform, shrinking deploy time from 22 min to 4 min.",
          "Introduced end-to-end typed API contracts with tRPC, eliminating a class of runtime bugs.",
        ],
      },
      {
        id: uid(),
        company: "Beacon Software",
        role: "Software Engineer",
        location: "Austin, TX",
        startDate: "2017-07",
        endDate: "2019-05",
        current: false,
        bullets: [
          "Shipped the customer portal (Next.js, PostgreSQL) used by 60k SMB customers.",
          "Cut error rates 47% by introducing Sentry, structured logs, and SLO-based alerting.",
        ],
      },
    ],
    projects: [
      {
        id: uid(),
        name: "Loomstack",
        tech: "TypeScript, Node, Postgres, Redis",
        link: "github.com/alexmorgan/loomstack",
        bullets: [
          "Open-source background job runner (1.4k GitHub stars) with at-least-once semantics.",
          "Benchmarked at 24k jobs/sec on a single 4-core worker.",
        ],
      },
      {
        id: uid(),
        name: "Paperlane",
        tech: "React, Vite, IndexedDB",
        link: "paperlane.app",
        bullets: [
          "Offline-first markdown editor with CRDT sync, 8k monthly active users.",
        ],
      },
    ],
    education: [
      {
        id: uid(),
        school: "University of Michigan",
        degree: "B.S. Computer Science",
        location: "Ann Arbor, MI",
        startDate: "2013-09",
        endDate: "2017-05",
        details: "Graduated with Honors. Minor in Mathematics.",
      },
    ],
    achievements: [],
    certificates: [],
  };
}

export function seedState(): AppState {
  const primary = seedProfile();
  const backend: ResumeProfile = {
    ...seedProfile(),
    id: uid(),
    profileName: "Backend Engineer Track",
    selectedTemplateId: "techlead",
    personalInfo: {
      ...primary.personalInfo,
      title: "Senior Backend Engineer",
      summary:
        "Backend engineer focused on distributed systems, event pipelines, and API platforms. Shipped services processing 3B+ events/day at Northwind. Deep expertise in Go, PostgreSQL, and Kubernetes.",
    },
  };
  return { profiles: [primary, backend], activeProfileId: primary.id };
}

export function migrateProfile(profile: any): ResumeProfile {
  if (!profile.personalInfo.contacts) {
    const contacts = [];
    const p = profile.personalInfo;
    if (p.location) contacts.push({ id: uid(), title: p.location, link: "" });
    if (p.phone) contacts.push({ id: uid(), title: p.phone, link: `tel:${p.phone.replace(/[^0-9+]/g, '')}` });
    if (p.email) contacts.push({ id: uid(), title: p.email, link: `mailto:${p.email}` });
    if (p.website) contacts.push({ id: uid(), title: p.website, link: p.website.startsWith('http') ? p.website : `https://${p.website}` });
    if (p.linkedin) contacts.push({ id: uid(), title: p.linkedin, link: p.linkedin.startsWith('http') ? p.linkedin : `https://${p.linkedin}` });
    if (p.github) contacts.push({ id: uid(), title: p.github, link: p.github.startsWith('http') ? p.github : `https://${p.github}` });

    // Delete legacy fields
    delete p.location;
    delete p.phone;
    delete p.email;
    delete p.website;
    delete p.linkedin;
    delete p.github;

    p.contacts = contacts;
  }
  if (!profile.role) {
    profile.role = "general";
  }
  if (!profile.updatedAt) {
    profile.updatedAt = Date.now();
  }
  return profile as ResumeProfile;
}