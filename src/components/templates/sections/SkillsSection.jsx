export function SkillsSection({ p }) {
  if (!p.skills || p.skills.length === 0) return null;

  const visibleSkills = p.skills.filter(s => s.items.trim().length > 0);
  if (visibleSkills.length === 0) return null;

  return (
    <section className="resume-section resume-section--skills">
      <h2 className="section-title">Skills</h2>
      <div className="skill-list">
        {visibleSkills.map((skill) => (
          <div key={skill.id} className="skill-row">
            {skill.name && <span className="skill-label">{skill.name}: </span>}
            <span className="skill-value">{skill.items}</span>
          </div>
        ))}
      </div>
    </section>
  );
}