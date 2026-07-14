import type { ResumeProfile } from "@/shared/lib/resume-types";
import { formatDate, dateRange, SkillLines, Section } from "./shared";

export function Prisma({ p }: { p: ResumeProfile }) {
  return (
    <div className="font-sans-modern text-[10.5pt] text-black leading-snug">
      <header className="mb-4">
        <h1 className="text-[26pt] font-light text-teal-700 tracking-tight">{p.personalInfo.fullName || "Your Name"}</h1>
        {p.personalInfo.title && <div className="text-[11pt] font-medium text-teal-800 mt-1 uppercase tracking-widest">{p.personalInfo.title}</div>}
        <div className="mt-2 text-[9.5pt] text-neutral-500 flex flex-wrap gap-x-3 gap-y-1">
          {[p.personalInfo.location, p.personalInfo.phone, p.personalInfo.email, p.personalInfo.website, p.personalInfo.linkedin, p.personalInfo.github].filter(Boolean).map((item, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <span className="w-1 h-1 rounded-full bg-teal-300 inline-block"></span>}
              {item}
            </span>
          ))}
        </div>
      </header>
      {p.personalInfo.summary && (
        <Section title="Summary" variant="prisma"><p>{p.personalInfo.summary}</p></Section>
      )}
      {p.experience.length > 0 && (
      <Section title="Experience" variant="prisma">
        {p.experience.map((e) => (
          <div key={e.id} className="mb-3 break-inside-avoid">
            <div className="flex justify-between items-end">
              <div className="font-semibold text-lg">{e.role}</div>
              <div className="text-teal-700 font-medium text-[9.5pt]">{dateRange(e.startDate, e.endDate, e.current)}</div>
            </div>
            <div className="text-neutral-600 font-medium mb-1">{e.company}{e.location ? ` · ${e.location}` : ""}</div>
            <ul className="list-disc ml-5 text-neutral-800 space-y-0.5">{e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
          </div>
        ))}
      </Section>
    )}
      {p.projects.length > 0 && (
      <Section title="Projects" variant="prisma">
        {p.projects.map((pr) => (
          <div key={pr.id} className="mb-3 break-inside-avoid">
            <div className="flex justify-between items-end">
              <div className="font-semibold text-lg">{pr.name}</div>
              <div className="text-teal-700 font-medium text-[9.5pt]">{pr.link}</div>
            </div>
            {pr.tech && <div className="text-neutral-600 font-medium mb-1">{pr.tech}</div>}
            <ul className="list-disc ml-5 text-neutral-800 space-y-0.5">{pr.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
          </div>
        ))}
      </Section>
    )}
      <Section title="Skills" variant="prisma"><SkillLines p={p} /></Section>
      {p.education.length > 0 && (
      <Section title="Education" variant="prisma">
        {p.education.map((ed) => (
          <div key={ed.id} className="mb-2 break-inside-avoid">
            <div className="flex justify-between items-end">
              <div className="font-semibold text-lg">{ed.school}</div>
              <div className="text-teal-700 font-medium text-[9.5pt]">{dateRange(ed.startDate, ed.endDate, false)}</div>
            </div>
            <div className="text-neutral-800">{ed.degree}{ed.location ? ` · ${ed.location}` : ""}</div>
            {ed.details && <div className="text-neutral-600 mt-1">{ed.details}</div>}
          </div>
        ))}
      </Section>
    )}
      {p.achievements?.length > 0 && (
        <Section title="Achievements" variant="prisma">
          {p.achievements.map((ach) => (
            <div key={ach.id} className="mb-2 break-inside-avoid">
              <div className="flex justify-between items-end">
                <div className="font-semibold text-lg">{ach.title}</div>
                <div className="text-teal-700 font-medium text-[9.5pt]">{formatDate(ach.date)}</div>
              </div>
              {ach.description && <div className="text-neutral-600 mt-1">{ach.description}</div>}
            </div>
          ))}
        </Section>
      )}
      {p.certificates?.length > 0 && (
        <Section title="Certificates" variant="prisma">
          {p.certificates.map((cert) => (
            <div key={cert.id} className="mb-2 break-inside-avoid">
              <div className="flex justify-between items-end">
                <div className="font-semibold text-lg">{cert.title}</div>
                <div className="text-teal-700 font-medium text-[9.5pt]">{formatDate(cert.date)}</div>
              </div>
              <div className="text-neutral-600 mt-1">{cert.issuer}{cert.link ? ` · ${cert.link}` : ""}</div>
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}

