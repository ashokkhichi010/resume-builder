export function ProjectsSection({ p }) {
  if (p.projects.length === 0) return null;
  return (
    <section className="resume-section resume-section--projects">
      <h2 className="section-title">Projects</h2>
      {p.projects.map((pr) => (
        <div key={pr.id} className="entry">
          <div className="entry-header">
            {
              pr.link
                ? <span className="entry-title"><a href={pr.link} target="_blank">{pr.name}</a></span>
                : <span className="entry-title">{pr.name}</span>
            }
            {pr.tech && <span className="entry-subtitle">{pr.tech}</span>}
          </div>
          <ul className="bullet-list">
            {pr.bullets.filter(Boolean).map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
