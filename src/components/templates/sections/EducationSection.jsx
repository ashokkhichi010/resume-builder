import { dateRange } from "../shared";

export function EducationSection({ p }) {
  if (p.education.length === 0) return null;
  return (
    <section className="resume-section resume-section--education">
      <h2 className="section-title">Education</h2>
      {p.education.map((ed) => (
        <div key={ed.id} className="entry">
          <div className="entry-header">
            <span className="entry-title">{ed.school}</span>
            <span className="entry-date">{dateRange(ed.startDate, ed.endDate, false)}</span>
          </div>
          <div className="entry-subtitle">
            {ed.degree}
            {ed.location && <span className="entry-location"> · {ed.location}</span>}
          </div>
          {ed.details && <div className="entry-details">{ed.details}</div>}
        </div>
      ))}
    </section>
  );
}
