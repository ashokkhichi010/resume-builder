import type { ResumeProfile } from "@/shared/lib/resume-types";
import { formatDate, dateRange, joinContact, SkillLines, Section } from "./shared";

export function Classic({ p }: { p: ResumeProfile }) {
  return (
    <div className="font-classic text-[11pt] text-black leading-snug">
      <header className="text-center">
        <h1 className="text-[22pt] font-bold tracking-wide uppercase">{p.personalInfo.fullName || "Your Name"}</h1>
        {p.personalInfo.title && <div className="italic mt-1">{p.personalInfo.title}</div>}
        <div className="mt-1 text-[10pt]">{joinContact(p)}</div>
        <hr className="border-t border-black mt-3" />
      </header>
      {p.personalInfo.summary && (
        <Section title="Summary" variant="classic">
          <p>{p.personalInfo.summary}</p>
        </Section>
      )}
      <Section title="Skills" variant="classic"><SkillLines p={p} /></Section>
      <Section title="Experience" variant="classic">
        {p.experience.map((e) => (
          <div key={e.id} className="mb-3 break-inside-avoid">
            <div className="flex justify-between">
              <div className="font-bold">{e.role}{e.company ? `, ${e.company}` : ""}</div>
              <div className="italic">{dateRange(e.startDate, e.endDate, e.current)}</div>
            </div>
            {e.location && <div className="italic">{e.location}</div>}
            <ul className="list-disc ml-5 mt-1">
              {e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>
        ))}
      </Section>
      <Section title="Projects" variant="classic">
        {p.projects.map((pr) => (
          <div key={pr.id} className="mb-2 break-inside-avoid">
            <div className="font-bold">{pr.name}{pr.tech ? ` — ${pr.tech}` : ""}</div>
            {pr.link && <div className="italic">{pr.link}</div>}
            <ul className="list-disc ml-5">{pr.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
          </div>
        ))}
      </Section>
      <Section title="Education" variant="classic">
        {p.education.map((ed) => (
          <div key={ed.id} className="mb-2 break-inside-avoid">
            <div className="flex justify-between">
              <div className="font-bold">{ed.school}</div>
              <div className="italic">{dateRange(ed.startDate, ed.endDate, false)}</div>
            </div>
            <div>{ed.degree}{ed.location ? ` · ${ed.location}` : ""}</div>
            {ed.details && <div className="italic">{ed.details}</div>}
          </div>
        ))}
      </Section>
      {p.achievements?.length > 0 && (
        <Section title="Achievements" variant="classic">
          {p.achievements.map((ach) => (
            <div key={ach.id} className="mb-2 break-inside-avoid">
              <div className="flex justify-between">
                <div className="font-bold">{ach.title}</div>
                <div className="italic">{formatDate(ach.date)}</div>
              </div>
              {ach.description && <div>{ach.description}</div>}
            </div>
          ))}
        </Section>
      )}
      {p.certificates?.length > 0 && (
        <Section title="Certificates" variant="classic">
          {p.certificates.map((cert) => (
            <div key={cert.id} className="mb-2 break-inside-avoid">
              <div className="flex justify-between">
                <div className="font-bold">{cert.title}</div>
                <div className="italic">{formatDate(cert.date)}</div>
              </div>
              <div>{cert.issuer}{cert.link ? ` · ${cert.link}` : ""}</div>
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}

