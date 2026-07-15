import { formatDate } from "../shared";
import type { ResumeProfile } from "@/shared/lib/resume-types";

export function AchievementsSection({ p }: { p: ResumeProfile }) {
  if (!p.achievements || p.achievements.length === 0) return null;
  return (
    <section className="resume-section resume-section--achievements">
      <h2 className="section-title">Achievements</h2>
      {p.achievements.map((ach: any) => (
        <div key={ach.id} className="entry">
          <div className="entry-header">
            <span className="entry-title">{ach.title}</span>
            <span className="entry-date">{formatDate(ach.date)}</span>
          </div>
          {ach.description && <div className="entry-subtitle">{ach.description}</div>}
        </div>
      ))}
    </section>
  );
}