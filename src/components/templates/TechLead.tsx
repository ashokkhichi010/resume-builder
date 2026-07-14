import type { ResumeProfile } from "@/shared/lib/resume-types";
import { formatDate, dateRange, joinContact, Section } from "./shared";

export function TechLead({ p }: { p: ResumeProfile }) {
  const tags = (s: string) =>
    s.split(",").map(t => t.trim()).filter(Boolean);
  return (
    <div className="font-sans-modern text-[10.5pt] text-black leading-snug">
      <header>
        <h1 className="text-[22pt] font-black uppercase tracking-tight">{p.personalInfo.fullName || "Your Name"}</h1>
        {p.personalInfo.title && <div className="font-mono text-[10.5pt] mt-0.5">// {p.personalInfo.title}</div>}
        <div className="mt-1 font-mono text-[9pt]">{joinContact(p)}</div>
      </header>
      {p.personalInfo.summary && (
        <Section title="Summary" variant="techlead"><p>{p.personalInfo.summary}</p></Section>
      )}
      <Section title="Stack" variant="techlead">
        <div className="space-y-1">
          {(["languages", "frameworks", "tools", "databases", "other"] as const).map(k => {
            const v = p.skills[k]; if (!v) return null;
            return (
              <div key={k} className="flex gap-2 flex-wrap items-baseline">
                <span className="font-bold uppercase text-[9pt] w-24">{k}</span>
                <span className="flex flex-wrap gap-1">
                  {tags(v).map((t, i) => (
                    <span key={i} className="font-mono text-[9pt] border border-black px-1">{t}</span>
                  ))}
                </span>
              </div>
            );
          })}
        </div>
      </Section>
      {p.experience.length > 0 && (
      <Section title="Experience" variant="techlead">
        {p.experience.map((e) => (
          <div key={e.id} className="mb-3 break-inside-avoid">
            <div className="flex justify-between">
              <div className="font-bold">{e.role} @ {e.company}</div>
              <div className="font-mono text-[9.5pt]">{dateRange(e.startDate, e.endDate, e.current)}</div>
            </div>
            {e.location && <div className="font-mono text-[9pt]">{e.location}</div>}
            <ul className="list-disc ml-5 mt-1">{e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
          </div>
        ))}
      </Section>
    )}
      {p.projects.length > 0 && (
      <Section title="Projects" variant="techlead">
        {p.projects.map((pr) => (
          <div key={pr.id} className="mb-2 break-inside-avoid">
            <div className="flex justify-between">
              <div className="font-bold">{pr.name}</div>
              <div className="font-mono text-[9pt]">{pr.link}</div>
            </div>
            {pr.tech && <div className="font-mono text-[9pt]">[{pr.tech}]</div>}
            <ul className="list-disc ml-5">{pr.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
          </div>
        ))}
      </Section>
    )}
      {p.education.length > 0 && (
      <Section title="Education" variant="techlead">
        {p.education.map((ed) => (
          <div key={ed.id} className="mb-2 break-inside-avoid">
            <div className="flex justify-between">
              <div className="font-bold">{ed.school}</div>
              <div className="font-mono text-[9.5pt]">{dateRange(ed.startDate, ed.endDate, false)}</div>
            </div>
            <div>{ed.degree}{ed.location ? ` · ${ed.location}` : ""}</div>
            {ed.details && <div>{ed.details}</div>}
          </div>
        ))}
      </Section>
    )}
      {p.achievements?.length > 0 && (
        <Section title="Achievements" variant="techlead">
          {p.achievements.map((ach) => (
            <div key={ach.id} className="mb-2 break-inside-avoid">
              <div className="flex justify-between">
                <div className="font-bold">{ach.title}</div>
                <div className="font-mono text-[9.5pt]">{formatDate(ach.date)}</div>
              </div>
              {ach.description && <div>{ach.description}</div>}
            </div>
          ))}
        </Section>
      )}
      {p.certificates?.length > 0 && (
        <Section title="Certificates" variant="techlead">
          {p.certificates.map((cert) => (
            <div key={cert.id} className="mb-2 break-inside-avoid">
              <div className="flex justify-between">
                <div className="font-bold">{cert.title}</div>
                <div className="font-mono text-[9.5pt]">{formatDate(cert.date)}</div>
              </div>
              <div>{cert.issuer}{cert.link ? ` · ${cert.link}` : ""}</div>
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}

