import { useState } from "react";
import { ResumeProvider } from "@/Providers/resume-provider";
import { Dashboard } from "@/components/dashboard";
import { Forms } from "@/components/forms";
import { ResumePreview } from "@/components/preview";
import { Edit2, Eye } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export default function EditorPage() {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  return (
    <ResumeProvider>
      <div className="min-h-screen bg-muted/40 flex flex-col pb-[60px] lg:pb-0">
        <Dashboard />
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-0 relative">
          <section className={cn(
            "no-print border-r bg-background overflow-y-auto max-h-[calc(100vh-8.5rem-60px)] lg:max-h-[calc(100vh-8.5rem)]",
            activeTab === "edit" ? "block" : "hidden lg:block"
          )}>
            <div className="p-4 sm:p-6 max-w-2xl mx-auto">
              <Forms />
            </div>
          </section>
          <section id="print-area" className={cn(
            "overflow-y-auto max-h-[calc(100vh-8.5rem-60px)] lg:max-h-[calc(100vh-8.5rem)] bg-muted/40 transition-all",
            activeTab === "preview" ? "block" : "hidden lg:block"
          )}>
            <ResumePreview />
          </section>
        </main>

        {/* Mobile bottom tab bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 h-[60px] bg-background border-t flex z-50 no-print shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
          <button
            onClick={() => setActiveTab("edit")}
            className={cn("flex-1 flex flex-col items-center justify-center gap-1 transition-colors", activeTab === "edit" ? "text-primary" : "text-muted-foreground")}
          >
            <Edit2 className="h-5 w-5" />
            <span className="text-[10px] font-medium uppercase tracking-wider">Edit</span>
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={cn("flex-1 flex flex-col items-center justify-center gap-1 transition-colors", activeTab === "preview" ? "text-primary" : "text-muted-foreground")}
          >
            <Eye className="h-5 w-5" />
            <span className="text-[10px] font-medium uppercase tracking-wider">Preview</span>
          </button>
        </div>
      </div>
    </ResumeProvider>
  );
}
