import type { ResumeProfile, TemplateId } from "@/shared/lib/resume-types";
import type { ReactNode } from "react";

function formatDate(d: string) {
  if (!d) return "";
  const [y, m] = d.split("-");
  if (!y) return d;
  if (!m) return y;
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const idx = parseInt(m, 10) - 1;
  return `${months[idx] ?? m} ${y}`;
}

function dateRange(a: string, b: string, current: boolean) {
  const s = formatDate(a);
  const e = current ? "Present" : formatDate(b);
  if (!s && !e) return "";
  return `${s}${s && e ? " – " : ""}${e}`;
}

function joinContact(p: ResumeProfile) {
  return [
    p.personalInfo.location,
    p.personalInfo.phone,
    p.personalInfo.email,
    p.personalInfo.website,
    p.personalInfo.linkedin,
    p.personalInfo.github,
  ]
    .filter(Boolean)
    .join(" · ");
}

function SkillLines({ p }: { p: ResumeProfile }) {
  const rows: Array<[string, string]> = [
    ["Languages", p.skills.languages],
    ["Frameworks", p.skills.frameworks],
    ["Tools", p.skills.tools],
    ["Databases", p.skills.databases],
    ["Other", p.skills.other],
  ].filter(([, v]) => v.trim().length > 0) as Array<[string, string]>;
  return (
    <div className="space-y-1">
      {rows.map(([k, v]) => (
        <div key={k} className="leading-snug">
          <span className="font-semibold">{k}: </span>
          <span>{v}</span>
        </div>
      ))}
    </div>
  );
}

// ---------- 1. Classic Corporate ----------
function Classic({ p }: { p: ResumeProfile }) {
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
    </div>
  );
}

// ---------- 2. Modern Minimalist ----------
function Minimalist({ p }: { p: ResumeProfile }) {
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
      <Section title="Skills" variant="minimalist"><SkillLines p={p} /></Section>
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
    </div>
  );
}

// ---------- 3. Tech Lead ----------
function TechLead({ p }: { p: ResumeProfile }) {
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
          {(["languages","frameworks","tools","databases","other"] as const).map(k => {
            const v = p.skills[k]; if (!v) return null;
            return (
              <div key={k} className="flex gap-2 flex-wrap items-baseline">
                <span className="font-bold uppercase text-[9pt] w-24">{k}</span>
                <span className="flex flex-wrap gap-1">
                  {tags(v).map((t,i) => (
                    <span key={i} className="font-mono text-[9pt] border border-black px-1">{t}</span>
                  ))}
                </span>
              </div>
            );
          })}
        </div>
      </Section>
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
    </div>
  );
}

// ---------- 4. Executive Sleek ----------
function Executive({ p }: { p: ResumeProfile }) {
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
    </div>
  );
}

// ---------- 5. Startup Builder ----------
function Startup({ p }: { p: ResumeProfile }) {
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
    </div>
  );
}

function Section({
  title, children, variant,
}: { title: string; children: ReactNode; variant: TemplateId }) {
  const cls: Record<TemplateId, string> = {
    classic: "mt-4 text-[12pt] font-bold uppercase tracking-wider text-center border-b border-black pb-1 mb-2",
    minimalist: "mt-4 text-[11pt] font-semibold uppercase tracking-[0.15em] text-neutral-800 mb-1.5",
    techlead: "mt-4 text-[11pt] font-black uppercase mb-1 border-b-2 border-black pb-0.5",
    executive: "mt-3 text-[10pt] font-bold uppercase tracking-[0.2em] text-[#1f2a44] border-b border-[#1f2a44] pb-0.5 mb-1.5",
    startup: "mt-4 text-[11pt] font-bold mb-1 flex items-center gap-2 before:content-[''] before:h-px before:w-4 before:bg-black",
  };
  return (
    <section>
      <h2 className={cls[variant]}>{title}</h2>
      <div>{children}</div>
    </section>
  );
}

export function TemplateRenderer({ profile }: { profile: ResumeProfile }) {
  switch (profile.selectedTemplateId as TemplateId) {
    case "classic": return <Classic p={profile} />;
    case "techlead": return <TechLead p={profile} />;
    case "executive": return <Executive p={profile} />;
    case "startup": return <Startup p={profile} />;
    case "minimalist":
    default: return <Minimalist p={profile} />;
  }
}