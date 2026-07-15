import type { ResumeProfile } from "@/shared/lib/resume-types";
import { dateRange } from "../shared";

export function ExperienceSection({ p }: { p: ResumeProfile }) {
  if (p.experience.length === 0) return null;
  return (
    <section className="resume-section resume-section--experience">
      <h2 className="section-title">Experience</h2>
      {p.experience.map((e: any) => (
        <div key={e.id} className="entry">
          <div className="entry-header">
            <span className="entry-title">{e.company}</span>
            <span className="entry-date">{dateRange(e.startDate, e.endDate, e.current)}</span>
          </div>
          <div className="entry-subtitle">
            <span className="entry-role">{e.role}</span>
            {e.location && <span className="entry-location"> · {e.location}</span>}
          </div>
          <ul className="bullet-list">
            {e.bullets.filter(Boolean).map((b: any, i: number) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
