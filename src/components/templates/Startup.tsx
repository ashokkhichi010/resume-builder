import type { ResumeProfile } from "@/shared/lib/resume-types";
import { formatDate, dateRange, SkillLines, Section } from "./shared";

export function Startup({ p }: { p: ResumeProfile }) {
  return (
    <div className="font-sans-modern text-[10.5pt] text-black leading-normal">
      <header className="flex justify-between items-end gap-4">
        <div>
          <h1 className="text-[22pt] font-bold tracking-tight">{p.personalInfo.fullName || "Your Name"}</h1>
          {p.personalInfo.title && <div className="text-[11pt] text-neutral-700">{p.personalInfo.title}</div>}
        </div>
        <div className="text-right text-[9.5pt] leading-snug">
          {p.personalInfo.email && <div>{p.personalInfo.email}</div>}
          {p.personalInfo.phone && <div>{p.personalInfo.phone}</div>}
          {p.personalInfo.location && <div>{p.personalInfo.location}</div>}
          {p.personalInfo.website && <div>{p.personalInfo.website}</div>}
          {p.personalInfo.github && <div>{p.personalInfo.github}</div>}
        </div>
      </header>
      {p.personalInfo.summary && (
        <Section title="About" variant="startup"><p>{p.personalInfo.summary}</p></Section>
      )}
      <Section title="Experience" variant="startup">
        {p.experience.map((e) => (
          <div key={e.id} className="mb-3 break-inside-avoid">
            <div className="flex justify-between">
              <div><span className="font-bold">{e.role}</span> · {e.company}</div>
              <div className="text-neutral-600">{dateRange(e.startDate, e.endDate, e.current)}</div>
            </div>
            {e.location && <div className="flex justify-between text-neutral-600 text-[9.5pt]"><span>{e.location}</span></div>}
            <ul className="list-disc ml-5 mt-1">{e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
          </div>
        ))}
      </Section>
      <Section title="Projects" variant="startup">
        {p.projects.map((pr) => (
          <div key={pr.id} className="mb-2 break-inside-avoid">
            <div className="flex justify-between">
              <div><span className="font-bold">{pr.name}</span>{pr.tech ? ` · ${pr.tech}` : ""}</div>
              <div className="text-neutral-600">{pr.link}</div>
            </div>
            <ul className="list-disc ml-5">{pr.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
          </div>
        ))}
      </Section>
      <Section title="Skills" variant="startup"><SkillLines p={p} /></Section>
      <Section title="Education" variant="startup">
        {p.education.map((ed) => (
          <div key={ed.id} className="mb-2 break-inside-avoid">
            <div className="flex justify-between">
              <div><span className="font-bold">{ed.school}</span> · {ed.degree}</div>
              <div className="text-neutral-600">{dateRange(ed.startDate, ed.endDate, false)}</div>
            </div>
            {(ed.location || ed.details) && (
              <div className="flex justify-between text-neutral-700 text-[9.5pt]">
                <span>{ed.location}</span><span>{ed.details}</span>
              </div>
            )}
          </div>
        ))}
      </Section>
      {p.achievements?.length > 0 && (
        <Section title="Achievements" variant="startup">
          {p.achievements.map((ach) => (
            <div key={ach.id} className="mb-2 break-inside-avoid">
              <div className="flex justify-between">
                <div><span className="font-bold">{ach.title}</span></div>
                <div className="text-neutral-600">{formatDate(ach.date)}</div>
              </div>
              {ach.description && <div className="text-neutral-700 text-[9.5pt]">{ach.description}</div>}
            </div>
          ))}
        </Section>
      )}
      {p.certificates?.length > 0 && (
        <Section title="Certificates" variant="startup">
          {p.certificates.map((cert) => (
            <div key={cert.id} className="mb-2 break-inside-avoid">
              <div className="flex justify-between">
                <div><span className="font-bold">{cert.title}</span></div>
                <div className="text-neutral-600">{formatDate(cert.date)}</div>
              </div>
              <div className="text-neutral-700 text-[9.5pt]">{cert.issuer}{cert.link ? ` · ${cert.link}` : ""}</div>
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}

