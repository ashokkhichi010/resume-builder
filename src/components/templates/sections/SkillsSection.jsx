export function SkillsSection({ p }) {
  const rows = [
    ["Languages", p.skills.languages],
    ["Frameworks", p.skills.frameworks],
    ["Tools", p.skills.tools],
    ["Databases", p.skills.databases],
    ["Other", p.skills.other],
  ].filter(([, v]) => v.trim().length > 0);

  if (rows.length === 0) return null;

  return (
    <section className="resume-section resume-section--skills">
      <h2 className="section-title">Skills</h2>
      <div className="skill-list">
        {rows.map(([k, v]) => (
          <div key={k} className="skill-row">
            <span className="skill-label">{k}: </span>
            <span className="skill-value">{v}</span>
          </div>
        ))}
      </div>
    </section>
  );
}