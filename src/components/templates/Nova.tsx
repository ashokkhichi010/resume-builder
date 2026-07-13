import type { ResumeProfile } from "@/shared/lib/resume-types";
import { formatDate, dateRange, joinContact, SkillLines, Section } from "./shared";

export function Nova({ p }: { p: ResumeProfile }) {
  return (
    <div className="font-classic text-[10pt] text-neutral-900 leading-tight">
      <header className="text-center mb-5">
        <h1 className="text-[24pt] font-semibold tracking-wide">{p.personalInfo.fullName || "Your Name"}</h1>
        {p.personalInfo.title && <div className="text-[11pt] italic text-neutral-600 mt-1">{p.personalInfo.title}</div>}
        <div className="mt-2 text-[9pt] text-neutral-500 uppercase tracking-widest">{joinContact(p, " | ")}</div>
      </header>
      {p.personalInfo.summary && (
        <Section title="Profile" variant="nova"><p className="text-justify">{p.personalInfo.summary}</p></Section>
      )}
      <Section title="Experience" variant="nova">
        {p.experience.map((e) => (
          <div key={e.id} className="mb-3 break-inside-avoid">
            <div className="flex justify-between items-baseline mb-0.5">
              <div className="font-semibold text-[11pt]">{e.company}</div>
              <div className="text-neutral-500 text-[9pt] uppercase tracking-wider">{dateRange(e.startDate, e.endDate, e.current)}</div>
            </div>
            <div className="italic text-neutral-700 mb-1">{e.role}{e.location ? ` — ${e.location}` : ""}</div>
            <ul className="list-disc ml-4 space-y-0.5 text-neutral-800">{e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
          </div>
        ))}
      </Section>
      <Section title="Projects" variant="nova">
        {p.projects.map((pr) => (
          <div key={pr.id} className="mb-3 break-inside-avoid">
            <div className="flex justify-between items-baseline mb-0.5">
              <div className="font-semibold text-[11pt]">{pr.name}</div>
              <div className="text-neutral-500 text-[9pt] uppercase tracking-wider">{pr.link}</div>
            </div>
            {pr.tech && <div className="italic text-neutral-700 mb-1">{pr.tech}</div>}
            <ul className="list-disc ml-4 space-y-0.5 text-neutral-800">{pr.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
          </div>
        ))}
      </Section>
      <Section title="Expertise" variant="nova"><SkillLines p={p} /></Section>
      <Section title="Education" variant="nova">
        {p.education.map((ed) => (
          <div key={ed.id} className="mb-2 break-inside-avoid">
            <div className="flex justify-between items-baseline mb-0.5">
              <div className="font-semibold text-[11pt]">{ed.school}</div>
              <div className="text-neutral-500 text-[9pt] uppercase tracking-wider">{dateRange(ed.startDate, ed.endDate, false)}</div>
            </div>
            <div className="italic text-neutral-800">{ed.degree}{ed.location ? ` — ${ed.location}` : ""}</div>
            {ed.details && <div className="text-neutral-600 mt-0.5">{ed.details}</div>}
          </div>
        ))}
      </Section>
      {p.achievements?.length > 0 && (
        <Section title="Achievements" variant="nova">
          {p.achievements.map((ach) => (
            <div key={ach.id} className="mb-2 break-inside-avoid">
              <div className="flex justify-between items-baseline mb-0.5">
                <div className="font-semibold text-[11pt]">{ach.title}</div>
                <div className="text-neutral-500 text-[9pt] uppercase tracking-wider">{formatDate(ach.date)}</div>
              </div>
              {ach.description && <div className="text-neutral-600 mt-0.5">{ach.description}</div>}
            </div>
          ))}
        </Section>
      )}
      {p.certificates?.length > 0 && (
        <Section title="Certificates" variant="nova">
          {p.certificates.map((cert) => (
            <div key={cert.id} className="mb-2 break-inside-avoid">
              <div className="flex justify-between items-baseline mb-0.5">
                <div className="font-semibold text-[11pt]">{cert.title}</div>
                <div className="text-neutral-500 text-[9pt] uppercase tracking-wider">{formatDate(cert.date)}</div>
              </div>
              <div className="text-neutral-600 mt-0.5">{cert.issuer}{cert.link ? ` · ${cert.link}` : ""}</div>
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}

