import type { ResumeProfile } from "@/shared/lib/resume-types";
import { ResumeDocument } from "@/components/templates/ResumeDocument";

function filterProfile(p: ResumeProfile): ResumeProfile {
    const vis = p.sectionVisibility || {};

    return {
        ...p,
        skills: vis.skills !== false
            ? p.skills
            : [],
        experience: vis.experience !== false
            ? p.experience
                .filter(e => !e.hidden)
                .map(e => ({ ...e, bullets: e.bullets.filter((b, i) => b && !e.hiddenBullets?.includes(i)) }))
            : [],
        projects: vis.projects !== false
            ? p.projects
                .filter(pr => !pr.hidden)
                .map(pr => ({ ...pr, bullets: pr.bullets.filter((b, i) => b && !pr.hiddenBullets?.includes(i)) }))
            : [],
        education: vis.education !== false ? (p.education || []).filter(ed => !ed.hidden) : [],
        achievements: vis.achievements !== false ? (p.achievements || []).filter(ach => !ach.hidden) : [],
        certificates: vis.certificates !== false ? (p.certificates || []).filter(c => !c.hidden) : [],
    };
}

export function TemplateRenderer({ profile }: { profile: ResumeProfile }) {
    const filtered = filterProfile(profile);
    return <ResumeDocument p={filtered} />;
}