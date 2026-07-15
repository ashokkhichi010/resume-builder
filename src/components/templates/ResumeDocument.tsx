import type { ResumeProfile, SectionKey } from "@/shared/lib/resume-types";
import { DEFAULT_SECTION_ORDER } from "@/shared/lib/resume-types";

import { SummarySection } from './sections/SummarySection';
import { SkillsSection } from './sections/SkillsSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { EducationSection } from './sections/EducationSection';
import { AchievementsSection } from './sections/AchievementsSection';
import { CertificatesSection } from './sections/CertificatesSection';

// Vite imports CSS as strings when appending ?raw
import classicCss from "./themes/classic.css?raw";
import minimalistCss from "./themes/minimalist.css?raw";
import techleadCss from "./themes/techlead.css?raw";
import executiveCss from "./themes/executive.css?raw";
import startupCss from "./themes/startup.css?raw";
import atlasCss from "./themes/atlas.css?raw";
import nexusCss from "./themes/nexus.css?raw";
import prismaCss from "./themes/prisma.css?raw";
import novaCss from "./themes/nova.css?raw";
import ridgeCss from "./themes/ridge.css?raw";

const themes: Record<string, string> = {
  classic: classicCss,
  minimalist: minimalistCss,
  techlead: techleadCss,
  executive: executiveCss,
  startup: startupCss,
  atlas: atlasCss,
  nexus: nexusCss,
  prisma: prismaCss,
  nova: novaCss,
  ridge: ridgeCss,
};

export function ResumeDocument({ p }: { p: ResumeProfile }) {
  const css = themes[p.selectedTemplateId] || themes.minimalist;

  const sectionMap: Record<SectionKey, React.ReactNode> = {
    summary: <SummarySection key="summary" p={p} />,
    skills: <SkillsSection key="skills" p={p} />,
    experience: <ExperienceSection key="experience" p={p} />,
    projects: <ProjectsSection key="projects" p={p} />,
    education: <EducationSection key="education" p={p} />,
    achievements: <AchievementsSection key="achievements" p={p} />,
    certificates: <CertificatesSection key="certificates" p={p} />,
  };

  const order = p.sectionOrder || DEFAULT_SECTION_ORDER;

  return (
    <div className={`resume-document theme-${p.selectedTemplateId}`}>
      <style dangerouslySetInnerHTML={{ __html: `@scope (.theme-${p.selectedTemplateId}) { ${css} }` }} />
      <header className="resume-header">
        <div className="resume-name-title">
          <span className="resume-name">{p.personalInfo.fullName || "Your Name"}</span>
          {p.personalInfo.title && <div className="resume-title">{p.personalInfo.title}</div>}
        </div>
        <div className="resume-contact">
          {p.personalInfo.contacts?.map((contact, i) => (
            <span key={contact.id} className="contact-item">
              {
                contact.link
                  ? <a href={contact.link} target="_blank" rel="noreferrer" className="contact-link">{contact.title}</a>
                  : <span>{contact.title}</span>
              }
              {i < p.personalInfo.contacts.length - 1 && <span className="contact-separator">{"  ·  "}</span>}
            </span>
          ))}
        </div>
      </header>

      <div className="resume-body">
        {order.map((key) => sectionMap[key])}
      </div>
    </div>
  );
}
