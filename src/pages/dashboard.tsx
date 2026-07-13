import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResume } from "@/Providers/resume-provider";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Plus, Trash2, Copy, Edit3, FolderOpen, ArrowLeft } from "lucide-react";
import { PATHS } from "@/routes/paths";
import { TemplateRenderer } from "@/components/templates";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/ui/alert-dialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

export default function DashboardPage() {
  const { state, createProfile, cloneProfile, deleteProfile, setActive, renameProfile } = useResume();
  const navigate = useNavigate();

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [renameData, setRenameData] = useState<{ id: string; name: string } | null>(null);
  const [newNameInput, setNewNameInput] = useState("");

  const handleCreate = () => {
    createProfile();
    navigate(PATHS.EDITOR);
  };

  const handleEdit = (id: string) => {
    setActive(id);
    navigate(PATHS.EDITOR);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteProfile(deleteId);
      setDeleteId(null);
    }
  };

  const openRenameDialog = (id: string, currentName: string) => {
    setRenameData({ id, name: currentName });
    setNewNameInput(currentName);
  };

  const confirmRename = () => {
    if (renameData && newNameInput.trim()) {
      renameProfile(renameData.id, newNameInput.trim());
      setRenameData(null);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 p-6 md:p-12 transition-colors duration-500">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Top Navigation */}
        <nav className="flex items-center justify-between gap-2 mb-[-1rem] w-full pb-10">
          <Button variant="ghost" size="sm" onClick={() => navigate(PATHS.HOME)} className="text-muted-foreground hover:text-foreground gap-2 -ml-3">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          <Button
            onClick={handleCreate}
            size="lg"
            className="relative z-10 gap-2 h-14 px-8 rounded-full shadow-lg hover:shadow-primary/25 hover:-translate-y-1 transition-all group"
          >
            <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20 group-hover:animate-none"></div>
            <Plus className="h-5 w-5" />
            <span className="font-semibold text-base">Create New Resume</span>
          </Button>
        </nav>
        {/* Resumes Grid */}
        {state.profiles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {state.profiles.map((profile) => (
              <div
                key={profile.id}
                className="group bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
              >
                {/* Preview Thumbnail Area */}
                <div
                  className="h-48 bg-muted/30 border-b flex items-start justify-center cursor-pointer overflow-hidden relative p-4"
                  onClick={() => handleEdit(profile.id)}
                >
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors z-10" />

                  {/* Miniature Resume Preview */}
                  <div className="w-[8.5in] h-[11in] bg-white shadow-sm origin-top scale-[0.7] pointer-events-none group-hover:scale-[0.6] transition-transform duration-500 ease-out">
                    <TemplateRenderer profile={profile} />
                  </div>

                  {/* Overlay Action */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/20 backdrop-blur-[2px] z-20">
                    <Button variant="default" className="shadow-lg rounded-full px-6 font-semibold shadow-primary/20">Open Editor</Button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col flex-1 relative bg-card">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-lg truncate pr-2 text-foreground group-hover:text-primary transition-colors" title={profile.profileName}>
                      {profile.profileName}
                    </h3>
                  </div>

                  <div className="text-xs font-medium text-muted-foreground mb-6 uppercase tracking-wider">
                    Template: <span className="text-foreground">{profile.selectedTemplateId || "Classic"}</span>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-1 pt-4 border-t border-border/50">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                      onClick={() => openRenameDialog(profile.id, profile.profileName)}
                      title="Rename"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>

                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-full text-muted-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors"
                        onClick={() => cloneProfile(profile.id)}
                        title="Duplicate"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                        onClick={() => setDeleteId(profile.id)}
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
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center p-12 py-24 text-center border-2 border-dashed rounded-3xl bg-card/50">
            <div className="h-20 w-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
              <FolderOpen className="h-10 w-10" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No Resumes Yet</h2>
            <p className="text-muted-foreground max-w-sm mb-8">It looks like you haven't created any resumes. Click the button below to get started and land your dream job!</p>
            <Button onClick={handleCreate} size="lg" className="gap-2 h-12 rounded-full px-8 shadow-md">
              <Plus className="h-5 w-5" />
              Create Your First Resume
            </Button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your resume and remove your data from local storage.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full">
              Delete Resume
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Rename Dialog */}
      <Dialog open={!!renameData} onOpenChange={(open) => !open && setRenameData(null)}>
        <DialogContent className="sm:max-w-[425px] rounded-2xl">
          <DialogHeader>
            <DialogTitle>Rename Resume</DialogTitle>
            <DialogDescription>
              Enter a new name or job target for this resume.
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <Input
              id="name"
              value={newNameInput}
              onChange={(e) => setNewNameInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') confirmRename();
              }}
              className="col-span-3 h-12"
              placeholder="e.g. Backend Engineer Track"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameData(null)} className="rounded-full">
              Cancel
            </Button>
            <Button onClick={confirmRename} className="rounded-full">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
