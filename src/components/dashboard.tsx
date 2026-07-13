import { useResume } from "@/Providers/resume-provider";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/routes/paths";

interface EditorHeaderProps {
  showPreview?: boolean;
  togglePreview?: () => void;
}

export function Dashboard({ showPreview, togglePreview }: EditorHeaderProps) {
  const { active, renameProfile } = useResume();
  const navigate = useNavigate();

  const goToDashboard = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(PATHS.DASHBOARD);
  };

  return (
    <header className="no-print sticky top-0 z-20 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/70">
      <div className="px-4 py-3 flex items-center justify-between gap-4">
        {/* Left: Logo & Back */}
        <div onClick={goToDashboard} className="cursor-pointer flex min-w-0 items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-black shadow-sm">R</div>
          <div className="hidden sm:block min-w-0">
            <div className="text-xs uppercase tracking-widest text-muted-foreground/80 font-medium">Resume Builder</div>
            <div className="truncate text-sm font-semibold">Dashboard</div>
          </div>
        </div>

        {/* Center: Resume Name */}
        <div className="flex-1 max-w-md">
          <Input
            value={active.profileName}
            onChange={(e) => renameProfile(active.id, e.target.value)}
            placeholder="Resume title / role target (e.g. Backend Engineer Track)"
            className="h-9 w-full bg-muted/50 border-transparent hover:border-input focus:bg-background transition-colors"
          />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {togglePreview && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={togglePreview}
              className="hidden lg:flex items-center gap-2"
            >
              {showPreview ? (
                <>
                  <EyeOff className="h-4 w-4" />
                  <span className="hidden xl:inline">Hide Preview</span>
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  <span className="hidden xl:inline">Show Preview</span>
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}