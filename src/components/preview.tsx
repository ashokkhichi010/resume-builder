import { TemplateRenderer } from "./templates";
import { useResume } from "@/Providers/resume-provider";

export function ResumePreview() {
  const { active } = useResume();
  return (
    <div className="resume-page-wrap">
      <div id="resume-print-root" className="resume-page">
        <TemplateRenderer profile={active} />
      </div>
    </div>
  );
}