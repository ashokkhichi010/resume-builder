export function CertificatesSection({ p }) {
  if (!p.certificates || p.certificates.length === 0) return null;
  return (
    <section className="resume-section resume-section--certificates">
      <h2 className="section-title">Certificates</h2>
      {p.certificates.map((cert) => (
        <div key={cert.id} className="entry">
          <div className="entry-header">
            <span className="entry-title">{cert.title}</span>
            <span className="entry-date">{formatDate(cert.date)}</span>
          </div>
          <div className="entry-subtitle">
            {cert.issuer}
            {cert.link && <span className="entry-location"> · {cert.link}</span>}
          </div>
        </div>
      ))}
    </section>
  );
}
