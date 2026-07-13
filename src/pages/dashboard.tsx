import { useNavigate } from "react-router-dom";
import { useResume } from "@/Providers/resume-provider";
import { Button } from "@/shared/ui/button";
import { Plus, FileText, Trash2, Copy, Edit3 } from "lucide-react";
import { PATHS } from "@/routes/paths";

export default function DashboardPage() {
  const { state, createProfile, cloneProfile, deleteProfile, setActive, renameProfile } = useResume();
  const navigate = useNavigate();

  const handleCreate = () => {
    createProfile();
    navigate(PATHS.EDITOR);
  };

  const handleEdit = (id: string) => {
    setActive(id);
    navigate(PATHS.EDITOR);
  };

  const handleRename = (id: string, currentName: string) => {
    const newName = window.prompt("Enter new resume name:", currentName);
    if (newName && newName.trim()) {
      renameProfile(id, newName.trim());
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this resume?")) {
      deleteProfile(id);
    }
  };

  return (
    <div className="min-h-screen bg-muted/40 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Resumes</h1>
            <p className="text-muted-foreground mt-1">Manage, duplicate, or create new resumes.</p>
          </div>
          <Button onClick={handleCreate} size="lg" className="gap-2">
            <Plus className="h-5 w-5" />
            Create New Resume
          </Button>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {state.profiles.map((profile) => (
            <div key={profile.id} className="group relative bg-card border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
              {/* Preview Thumbnail Area */}
              <div 
                className="h-48 bg-muted border-b flex items-center justify-center cursor-pointer overflow-hidden relative"
                onClick={() => handleEdit(profile.id)}
              >
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10" />
                <FileText className="h-16 w-16 text-muted-foreground/30" strokeWidth={1} />
                
                {/* Overlay Action */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/50 backdrop-blur-sm z-20">
                  <Button variant="secondary" className="shadow-sm">Open Editor</Button>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold truncate pr-2" title={profile.profileName}>
                    {profile.profileName}
                  </h3>
                </div>
                
                <div className="text-xs text-muted-foreground mb-4">
                  Template: {profile.selectedTemplateId || "Classic"}
                </div>
                
                <div className="mt-auto flex items-center justify-between gap-1 pt-3 border-t">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-muted-foreground hover:text-primary"
                    onClick={() => handleRename(profile.id, profile.profileName)}
                    title="Rename"
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-muted-foreground hover:text-primary"
                      onClick={() => cloneProfile(profile.id)}
                      title="Duplicate"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => handleDelete(profile.id)}
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
