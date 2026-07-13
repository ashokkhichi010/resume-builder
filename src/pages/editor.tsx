import { useState } from "react";
import { Dashboard } from "@/components/dashboard";
import { Forms } from "@/components/forms";
import { ResumePreview } from "@/components/preview";
import { Edit2, Eye, Printer } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export default function EditorPage() {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [showPreview, setShowPreview] = useState(true);

  return (
    <div className="min-h-screen bg-muted/40 flex flex-col pb-[60px] lg:pb-0 print:block print:h-auto print:bg-white">
      <Dashboard
        showPreview={showPreview}
        togglePreview={() => setShowPreview(!showPreview)}
      />
      <main className={cn(
        "flex-1 grid gap-0 relative print:block",
        showPreview ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"
      )}>
        {/* Editor Pane */}
        <section className={cn(
          "no-print border-r overflow-y-auto lg:max-h-[calc(100vh-4.1rem)] scrollbar-none",
          activeTab === "edit" ? "block" : "hidden lg:block",
          !showPreview && "lg:col-span-full border-r-0 lg:w-full"
        )}>
          <div className="p-4 sm:p-6 mx-auto">
            <Forms />
          </div>
        </section>

        {/* Preview Pane */}
        <section id="print-area" className={cn(
          "relative flex flex-col max-h-[calc(100vh-4.1rem-60px)] lg:max-h-[calc(100vh-4.1rem)]",
          activeTab === "preview" ? "block" : "hidden lg:flex",
          !showPreview && "lg:hidden"
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
        <button
          onClick={() => window.print()}
          className="flex-1 flex flex-col items-center justify-center gap-1 transition-colors text-muted-foreground hover:text-primary"
        >
          <Printer className="h-5 w-5" />
          <span className="text-[10px] font-medium uppercase tracking-wider">Print</span>
        </button>
      </div>
    </div>
  );
}
