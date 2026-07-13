import type { ResumeProfile } from "@/shared/lib/resume-types";
import { formatDate, dateRange, SkillLines, Section } from "./shared";

export function Ridge({ p }: { p: ResumeProfile }) {
  return (
    <div className="font-sans-modern text-[10pt] text-black leading-snug">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-[28pt] font-black uppercase tracking-tighter leading-none">{p.personalInfo.fullName || "Your Name"}</h1>
          {p.personalInfo.title && <div className="text-[12pt] font-medium tracking-wide uppercase mt-2">{p.personalInfo.title}</div>}
        </div>
        <div className="text-right text-[9pt] font-medium border-l-2 border-black pl-4 py-1">
          {p.personalInfo.email && <div>{p.personalInfo.email}</div>}
          {p.personalInfo.phone && <div>{p.personalInfo.phone}</div>}
          {p.personalInfo.location && <div>{p.personalInfo.location}</div>}
          {p.personalInfo.website && <div>{p.personalInfo.website}</div>}
          {p.personalInfo.github && <div>{p.personalInfo.github}</div>}
        </div>
      </header>
      {p.personalInfo.summary && (
        <Section title="Summary" variant="ridge"><p className="font-medium">{p.personalInfo.summary}</p></Section>
      )}
      <Section title="Experience" variant="ridge">
        {p.experience.map((e) => (
          <div key={e.id} className="mb-4 break-inside-avoid">
            <div className="grid grid-cols-[120px_1fr] gap-4">
              <div className="text-[9pt] font-bold uppercase tracking-wider mt-0.5">{dateRange(e.startDate, e.endDate, e.current)}</div>
              <div>
                <div className="font-bold text-[11pt] uppercase">{e.role}</div>
                <div className="font-medium mb-1">{e.company}{e.location ? ` · ${e.location}` : ""}</div>
                <ul className="list-disc ml-4 space-y-0.5">{e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
              </div>
            </div>
          </div>
        ))}
      </Section>
      <Section title="Projects" variant="ridge">
        {p.projects.map((pr) => (
          <div key={pr.id} className="mb-4 break-inside-avoid">
            <div className="grid grid-cols-[120px_1fr] gap-4">
              <div className="text-[9pt] font-bold uppercase tracking-wider mt-0.5 break-words">{pr.link}</div>
              <div>
                <div className="font-bold text-[11pt] uppercase">{pr.name}</div>
                {pr.tech && <div className="font-medium mb-1">{pr.tech}</div>}
                <ul className="list-disc ml-4 space-y-0.5">{pr.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
              </div>
            </div>
          </div>
        ))}
      </Section>
      <Section title="Skills" variant="ridge"><SkillLines p={p} /></Section>
      <Section title="Education" variant="ridge">
        {p.education.map((ed) => (
          <div key={ed.id} className="mb-2 break-inside-avoid">
            <div className="grid grid-cols-[120px_1fr] gap-4">
              <div className="text-[9pt] font-bold uppercase tracking-wider mt-0.5">{dateRange(ed.startDate, ed.endDate, false)}</div>
              <div>
                <div className="font-bold text-[11pt] uppercase">{ed.school}</div>
                <div className="font-medium">{ed.degree}{ed.location ? ` · ${ed.location}` : ""}</div>
                {ed.details && <div className="mt-0.5">{ed.details}</div>}
              </div>
            </div>
          </div>
        ))}
      </Section>
      {p.achievements?.length > 0 && (
        <Section title="Achievements" variant="ridge">
          {p.achievements.map((ach) => (
            <div key={ach.id} className="mb-2 break-inside-avoid">
              <div className="grid grid-cols-[120px_1fr] gap-4">
                <div className="text-[9pt] font-bold uppercase tracking-wider mt-0.5">{formatDate(ach.date)}</div>
                <div>
                  <div className="font-bold text-[11pt] uppercase">{ach.title}</div>
                  {ach.description && <div className="mt-0.5">{ach.description}</div>}
                </div>
              </div>
            </div>
          ))}
        </Section>
      )}
      {p.certificates?.length > 0 && (
        <Section title="Certificates" variant="ridge">
          {p.certificates.map((cert) => (
            <div key={cert.id} className="mb-2 break-inside-avoid">
              <div className="grid grid-cols-[120px_1fr] gap-4">
                <div className="text-[9pt] font-bold uppercase tracking-wider mt-0.5">{formatDate(cert.date)}</div>
                <div>
                  <div className="font-bold text-[11pt] uppercase">{cert.title}</div>
                  <div className="mt-0.5">{cert.issuer}{cert.link ? ` · ${cert.link}` : ""}</div>
                </div>
              </div>
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}