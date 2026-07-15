import type { ResumeProfile } from "@/shared/lib/resume-types";
export function SummarySection({ p }: { p: ResumeProfile }) {
  if (!p.personalInfo.summary) return null;
  return (
    <section className="resume-section resume-section--summary">
      <h2 className="section-title">Summary</h2>
      <p className="summary-text">{p.personalInfo.summary}</p>
    </section>
  );
}