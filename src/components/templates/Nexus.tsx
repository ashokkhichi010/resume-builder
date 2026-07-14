import type { ResumeProfile } from "@/shared/lib/resume-types";
import { formatDate, dateRange, joinContact, SkillLines, Section } from "./shared";

export function Nexus({ p }: { p: ResumeProfile }) {
  return (
    <div className="font-sans-modern text-[10.5pt] text-black leading-normal">
      <header className="bg-[#0f172a] text-white -mx-8 -mt-8 px-8 py-8 mb-6">
        <h1 className="text-[24pt] font-semibold tracking-wide">{p.personalInfo.fullName || "Your Name"}</h1>
        {p.personalInfo.title && <div className="text-[12pt] text-slate-300 mt-1">{p.personalInfo.title}</div>}
        <div className="mt-3 text-[9.5pt] text-slate-400">{joinContact(p)}</div>
      </header>
      {p.personalInfo.summary && (
        <Section title="Summary" variant="nexus"><p>{p.personalInfo.summary}</p></Section>
      )}
      {p.experience.length > 0 && (
      <Section title="Experience" variant="nexus">
        {p.experience.map((e) => (
          <div key={e.id} className="mb-4 break-inside-avoid border-l-2 border-slate-200 pl-4 -ml-4">
            <div className="flex justify-between">
              <div className="font-semibold text-slate-900">{e.role}</div>
              <div className="text-slate-500 text-[9.5pt]">{dateRange(e.startDate, e.endDate, e.current)}</div>
            </div>
            <div className="text-slate-700">{e.company}{e.location ? ` · ${e.location}` : ""}</div>
            <ul className="list-disc ml-5 mt-1 text-slate-800">{e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
          </div>
        ))}
      </Section>
    )}
      {p.projects.length > 0 && (
      <Section title="Projects" variant="nexus">
        {p.projects.map((pr) => (
          <div key={pr.id} className="mb-3 break-inside-avoid border-l-2 border-slate-200 pl-4 -ml-4">
            <div className="flex justify-between">
              <div className="font-semibold text-slate-900">{pr.name}</div>
              <div className="text-slate-500 text-[9.5pt]">{pr.link}</div>
            </div>
            {pr.tech && <div className="text-slate-700">{pr.tech}</div>}
            <ul className="list-disc ml-5 mt-1 text-slate-800">{pr.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
          </div>
        ))}
      </Section>
    )}
      <Section title="Skills" variant="nexus"><SkillLines p={p} /></Section>
      {p.education.length > 0 && (
      <Section title="Education" variant="nexus">
        {p.education.map((ed) => (
          <div key={ed.id} className="mb-2 break-inside-avoid">
            <div className="flex justify-between">
              <div className="font-semibold text-slate-900">{ed.school}</div>
              <div className="text-slate-500 text-[9.5pt]">{dateRange(ed.startDate, ed.endDate, false)}</div>
            </div>
            <div className="text-slate-800">{ed.degree}{ed.location ? ` · ${ed.location}` : ""}</div>
            {ed.details && <div className="text-slate-600">{ed.details}</div>}
          </div>
        ))}
      </Section>
    )}
      {p.achievements?.length > 0 && (
        <Section title="Achievements" variant="nexus">
          {p.achievements.map((ach) => (
            <div key={ach.id} className="mb-2 break-inside-avoid">
              <div className="flex justify-between">
                <div className="font-semibold text-slate-900">{ach.title}</div>
                <div className="text-slate-500 text-[9.5pt]">{formatDate(ach.date)}</div>
              </div>
              {ach.description && <div className="text-slate-600">{ach.description}</div>}
            </div>
          ))}
        </Section>
      )}
      {p.certificates?.length > 0 && (
        <Section title="Certificates" variant="nexus">
          {p.certificates.map((cert) => (
            <div key={cert.id} className="mb-2 break-inside-avoid">
              <div className="flex justify-between">
                <div className="font-semibold text-slate-900">{cert.title}</div>
                <div className="text-slate-500 text-[9.5pt]">{formatDate(cert.date)}</div>
              </div>
              <div className="text-slate-600">{cert.issuer}{cert.link ? ` · ${cert.link}` : ""}</div>
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}

