import { ResumeProvider } from "@/Providers/resume-provider";
import { Dashboard } from "@/components/dashboard";
import { Forms } from "@/components/forms";
import { ResumePreview } from "@/components/preview";

export default function EditorPage() {
  return (
    <ResumeProvider>
      <div className="min-h-screen bg-muted/40 flex flex-col">
        <Dashboard />
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-0">
          <section className="no-print border-r bg-background overflow-y-auto max-h-[calc(100vh-8.5rem)] lg:max-h-[calc(100vh-8.5rem)]">
            <div className="p-4 sm:p-6 max-w-2xl mx-auto">
              <Forms />
            </div>
          </section>
          <section id="print-area" className="overflow-y-auto max-h-[calc(100vh-8.5rem)] bg-muted/40">
            <ResumePreview />
          </section>
        </main>
      </div>
    </ResumeProvider>
  );
}
