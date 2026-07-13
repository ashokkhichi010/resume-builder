import type { ResumeProfile } from "@/shared/lib/resume-types";
import { formatDate, dateRange, joinContact, SkillLines, Section } from "./shared";

export function Atlas({ p }: { p: ResumeProfile }) {
  return (
    <div className="font-sans-modern text-[10.5pt] text-black leading-relaxed border-l-4 border-neutral-800 pl-6">
      <header className="mb-6">
        <h1 className="text-[26pt] font-bold tracking-tighter">{p.personalInfo.fullName || "Your Name"}</h1>
        {p.personalInfo.title && <div className="text-[12pt] font-medium text-neutral-600 mt-1">{p.personalInfo.title}</div>}
        <div className="mt-2 text-[9.5pt] text-neutral-500">{joinContact(p)}</div>
      </header>
      {p.personalInfo.summary && (
        <Section title="Profile" variant="atlas" index={1}><p>{p.personalInfo.summary}</p></Section>
      )}
      <Section title="Experience" variant="atlas" index={2}>
        {p.experience.map((e) => (
          <div key={e.id} className="mb-4 break-inside-avoid">
            <div className="flex justify-between items-baseline">
              <div className="font-bold text-[11pt]">{e.role}</div>
              <div className="text-neutral-500 text-[9.5pt]">{dateRange(e.startDate, e.endDate, e.current)}</div>
            </div>
            <div className="text-neutral-700 font-medium">{e.company}{e.location ? ` · ${e.location}` : ""}</div>
            <ul className="list-disc ml-5 mt-1 text-neutral-800">{e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
          </div>
        ))}
      </Section>
      <Section title="Projects" variant="atlas" index={3}>
        {p.projects.map((pr) => (
          <div key={pr.id} className="mb-3 break-inside-avoid">
            <div className="flex justify-between items-baseline">
              <div className="font-bold">{pr.name}</div>
              <div className="text-neutral-500 text-[9.5pt]">{pr.link}</div>
            </div>
            {pr.tech && <div className="text-neutral-600">{pr.tech}</div>}
            <ul className="list-disc ml-5 mt-0.5 text-neutral-800">{pr.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
          </div>
        ))}
      </Section>
      <Section title="Skills" variant="atlas" index={4}><SkillLines p={p} /></Section>
      <Section title="Education" variant="atlas" index={5}>
        {p.education.map((ed) => (
          <div key={ed.id} className="mb-2 break-inside-avoid">
            <div className="flex justify-between items-baseline">
              <div className="font-bold">{ed.school}</div>
              <div className="text-neutral-500 text-[9.5pt]">{dateRange(ed.startDate, ed.endDate, false)}</div>
            </div>
            <div className="font-medium">{ed.degree}{ed.location ? ` · ${ed.location}` : ""}</div>
            {ed.details && <div className="text-neutral-600 mt-0.5">{ed.details}</div>}
          </div>
        ))}
      </Section>
      {p.achievements?.length > 0 && (
        <Section title="Achievements" variant="atlas" index={6}>
          {p.achievements.map((ach) => (
            <div key={ach.id} className="mb-2 break-inside-avoid">
              <div className="flex justify-between items-baseline">
                <div className="font-bold">{ach.title}</div>
                <div className="text-neutral-500 text-[9.5pt]">{formatDate(ach.date)}</div>
              </div>
              {ach.description && <div className="text-neutral-600 mt-0.5">{ach.description}</div>}
            </div>
          ))}
        </Section>
      )}
      {p.certificates?.length > 0 && (
        <Section title="Certificates" variant="atlas" index={7}>
          {p.certificates.map((cert) => (
            <div key={cert.id} className="mb-2 break-inside-avoid">
              <div className="flex justify-between items-baseline">
                <div className="font-bold">{cert.title}</div>
                <div className="text-neutral-500 text-[9.5pt]">{formatDate(cert.date)}</div>
              </div>
              <div className="text-neutral-600 mt-0.5">{cert.issuer}{cert.link ? ` · ${cert.link}` : ""}</div>
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}

