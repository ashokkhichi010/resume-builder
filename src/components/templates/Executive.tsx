import type { ResumeProfile } from "@/shared/lib/resume-types";
import { formatDate, dateRange, joinContact, SkillLines, Section } from "./shared";

export function Executive({ p }: { p: ResumeProfile }) {
  return (
    <div className="font-sans-modern text-[10pt] text-black leading-tight">
      <header className="border-b-2 border-[#1f2a44] pb-2">
        <h1 className="text-[20pt] font-bold text-[#1f2a44] tracking-wide">{p.personalInfo.fullName || "Your Name"}</h1>
        {p.personalInfo.title && <div className="text-[11pt] uppercase tracking-[0.15em] text-[#1f2a44]">{p.personalInfo.title}</div>}
        <div className="mt-1 text-[9pt]">{joinContact(p)}</div>
      </header>
      {p.personalInfo.summary && (
        <Section title="Executive Summary" variant="executive"><p>{p.personalInfo.summary}</p></Section>
      )}
      <Section title="Experience" variant="executive">
        {p.experience.map((e) => (
          <div key={e.id} className="mb-2 break-inside-avoid">
            <div className="flex justify-between">
              <div className="font-bold text-[#1f2a44]">{e.company}</div>
              <div className="text-[9pt]">{dateRange(e.startDate, e.endDate, e.current)}</div>
            </div>
            <div className="italic text-[9.5pt]">{e.role}{e.location ? ` · ${e.location}` : ""}</div>
            <ul className="list-disc ml-5 mt-0.5">{e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
          </div>
        ))}
      </Section>
      <Section title="Core Competencies" variant="executive"><SkillLines p={p} /></Section>
      <Section title="Selected Projects" variant="executive">
        {p.projects.map((pr) => (
          <div key={pr.id} className="mb-1.5 break-inside-avoid">
            <div className="flex justify-between">
              <div className="font-bold text-[#1f2a44]">{pr.name}</div>
              <div className="text-[9pt]">{pr.link}</div>
            </div>
            {pr.tech && <div className="italic text-[9.5pt]">{pr.tech}</div>}
            <ul className="list-disc ml-5">{pr.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
          </div>
        ))}
      </Section>
      <Section title="Education" variant="executive">
        {p.education.map((ed) => (
          <div key={ed.id} className="mb-1 break-inside-avoid">
            <div className="flex justify-between">
              <div className="font-bold text-[#1f2a44]">{ed.school}</div>
              <div className="text-[9pt]">{dateRange(ed.startDate, ed.endDate, false)}</div>
            </div>
            <div>{ed.degree}{ed.location ? ` · ${ed.location}` : ""}</div>
            {ed.details && <div className="italic">{ed.details}</div>}
          </div>
        ))}
      </Section>
      {p.achievements?.length > 0 && (
        <Section title="Achievements" variant="executive">
          {p.achievements.map((ach) => (
            <div key={ach.id} className="mb-1.5 break-inside-avoid">
              <div className="flex justify-between">
                <div className="font-bold text-[#1f2a44]">{ach.title}</div>
                <div className="text-[9pt]">{formatDate(ach.date)}</div>
              </div>
              {ach.description && <div className="italic text-[9.5pt]">{ach.description}</div>}
            </div>
          ))}
        </Section>
      )}
      {p.certificates?.length > 0 && (
        <Section title="Certificates" variant="executive">
          {p.certificates.map((cert) => (
            <div key={cert.id} className="mb-1.5 break-inside-avoid">
              <div className="flex justify-between">
                <div className="font-bold text-[#1f2a44]">{cert.title}</div>
                <div className="text-[9pt]">{formatDate(cert.date)}</div>
              </div>
              <div className="italic text-[9.5pt]">{cert.issuer}{cert.link ? ` · ${cert.link}` : ""}</div>
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}

