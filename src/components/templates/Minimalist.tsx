import type { ResumeProfile } from "@/shared/lib/resume-types";
import { formatDate, dateRange, joinContact, SkillLines, Section } from "./shared";

export function Minimalist({ p }: { p: ResumeProfile }) {
  return (
    <div className="font-sans-modern text-[10.5pt] text-black leading-relaxed">
      <header>
        <h1 className="text-[24pt] font-semibold tracking-tight">{p.personalInfo.fullName || "Your Name"}</h1>
        {p.personalInfo.title && <div className="text-[12pt] text-neutral-700 mt-0.5">{p.personalInfo.title}</div>}
        <div className="mt-2 text-[9.5pt] text-neutral-700">{joinContact(p)}</div>
      </header>
      {p.personalInfo.summary && (
        <Section title="Summary" variant="minimalist"><p>{p.personalInfo.summary}</p></Section>
      )}
      {p.experience.length > 0 && (
      <Section title="Experience" variant="minimalist">
        {p.experience.map((e) => (
          <div key={e.id} className="mb-3 break-inside-avoid">
            <div className="flex justify-between">
              <div className="font-semibold">{e.role}</div>
              <div className="text-neutral-600">{dateRange(e.startDate, e.endDate, e.current)}</div>
            </div>
            <div className="text-neutral-700">{e.company}{e.location ? ` · ${e.location}` : ""}</div>
            <ul className="list-disc ml-5 mt-1">{e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
          </div>
        ))}
      </Section>
    )}
      {p.projects.length > 0 && (
      <Section title="Projects" variant="minimalist">
        {p.projects.map((pr) => (
          <div key={pr.id} className="mb-2 break-inside-avoid">
            <div className="flex justify-between">
              <div className="font-semibold">{pr.name}</div>
              <div className="text-neutral-600">{pr.link}</div>
            </div>
            {pr.tech && <div className="text-neutral-700">{pr.tech}</div>}
            <ul className="list-disc ml-5">{pr.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
          </div>
        ))}
      </Section>
    )}
      <Section title="Skills" variant="minimalist"><SkillLines p={p} /></Section>
      {p.education.length > 0 && (
      <Section title="Education" variant="minimalist">
        {p.education.map((ed) => (
          <div key={ed.id} className="mb-2 break-inside-avoid">
            <div className="flex justify-between">
              <div className="font-semibold">{ed.school}</div>
              <div className="text-neutral-600">{dateRange(ed.startDate, ed.endDate, false)}</div>
            </div>
            <div>{ed.degree}{ed.location ? ` · ${ed.location}` : ""}</div>
            {ed.details && <div className="text-neutral-700">{ed.details}</div>}
          </div>
        ))}
      </Section>
    )}
      {p.achievements?.length > 0 && (
        <Section title="Achievements" variant="minimalist">
          {p.achievements.map((ach) => (
            <div key={ach.id} className="mb-2 break-inside-avoid">
              <div className="flex justify-between">
                <div className="font-semibold">{ach.title}</div>
                <div className="text-neutral-600">{formatDate(ach.date)}</div>
              </div>
              {ach.description && <div className="text-neutral-700">{ach.description}</div>}
            </div>
          ))}
        </Section>
      )}
      {p.certificates?.length > 0 && (
        <Section title="Certificates" variant="minimalist">
          {p.certificates.map((cert) => (
            <div key={cert.id} className="mb-2 break-inside-avoid">
              <div className="flex justify-between">
                <div className="font-semibold">{cert.title}</div>
                <div className="text-neutral-600">{formatDate(cert.date)}</div>
              </div>
              <div className="text-neutral-700">{cert.issuer}{cert.link ? ` · ${cert.link}` : ""}</div>
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}

