import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useResume } from "@/Providers/resume-provider";
import { PATHS } from "@/routes/paths";
import type { ResumeProfile } from "@/shared/lib/resume-types";
import { ROLE_STYLES } from "../shared/utils";
import { ResumeCard } from "../components/dashboard/ResumeCard";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { DashboardToolbar } from "../components/dashboard/DashboardToolbar";
import { EmptyState } from "../components/dashboard/EmptyState";
import { DeleteConfirmDialog } from "../components/dashboard/DeleteConfirmDialog";
import { ToastNotification } from "../components/dashboard/ToastNotification";

export default function DashboardPage() {
  const { state, createProfile, cloneProfile, deleteProfile, setActive, renameProfile } = useResume();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('updated');
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftName, setDraftName] = useState('');
  
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ResumeProfile | null>(null);
  
  const [toast, setToast] = useState<{message: string, onUndo?: () => void} | null>(null);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const toastTimerRef = useRef<any>(null);
  const deleteCancelBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (editingId && nameInputRef.current) {
      nameInputRef.current.focus();
      nameInputRef.current.select();
    }
  }, [editingId]);

  useEffect(() => {
    if (deleteTarget && deleteCancelBtnRef.current) {
      deleteCancelBtnRef.current.focus();
    }
  }, [deleteTarget]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== 'Escape') return;
      if (deleteTarget) { setDeleteTarget(null); return; }
      if (menuOpenId) { setMenuOpenId(null); return; }
      if (editingId) { setEditingId(null); return; }
      if (sortMenuOpen) { setSortMenuOpen(false); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [deleteTarget, menuOpenId, editingId, sortMenuOpen]);

  useEffect(() => {
    if (!menuOpenId && !sortMenuOpen) return undefined;
    function onClick(e: MouseEvent) {
      if (menuOpenId && !(e.target as Element).closest('.rd-menu-wrap')) setMenuOpenId(null);
      if (sortMenuOpen && !(e.target as Element).closest('.rd-sort-wrap')) setSortMenuOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [menuOpenId, sortMenuOpen]);

  useEffect(() => () => { if (toastTimerRef.current) clearTimeout(toastTimerRef.current); }, []);

  function showToast(message: string, onUndo?: () => void) {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ message, onUndo });
    toastTimerRef.current = setTimeout(() => setToast(null), 4500);
  }

  function handleStartRename(r: ResumeProfile) {
    setMenuOpenId(null);
    setEditingId(r.id);
    setDraftName(r.profileName);
  }

  function handleCommitRename() {
    setEditingId((currentId) => {
      if (!currentId) return currentId;
      const trimmed = draftName.trim();
      if (trimmed) {
        renameProfile(currentId, trimmed);
      }
      return null;
    });
  }

  function handleCancelRename() {
    setEditingId(null);
  }

  function handleDuplicate(r: ResumeProfile) {
    setMenuOpenId(null);
    cloneProfile(r.id);
    showToast(`Duplicated "${r.profileName}"`);
  }

  function handleRequestDelete(r: ResumeProfile) {
    setMenuOpenId(null);
    setDeleteTarget(r);
  }

  function handleConfirmDelete() {
    if (!deleteTarget) return;
    deleteProfile(deleteTarget.id);
    showToast(`Deleted "${deleteTarget.profileName}"`);
    setDeleteTarget(null);
  }

  function handleCreateNew() {
    createProfile();
    showToast("Created a new resume. Click to edit!");
  }

  function handleOpen(r: ResumeProfile) {
    if (editingId === r.id) return;
    setActive(r.id);
    navigate(PATHS.EDITOR);
  }

  const resumes = state.profiles;

  const filtered = useMemo(() => {
    return resumes.filter((r) => {
      const q = query.trim().toLowerCase();
      if (!q) return true;
      const roleLabel = ROLE_STYLES[r.role || 'general']?.label.toLowerCase() || '';
      return r.profileName.toLowerCase().includes(q) || roleLabel.includes(q);
    });
  }, [resumes, query]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortBy === 'name') return a.profileName.localeCompare(b.profileName);
      return (b.updatedAt || 0) - (a.updatedAt || 0);
    });
  }, [filtered, sortBy]);

  const sortLabel = sortBy === 'name' ? 'Name (A–Z)' : 'Last edited';

  return (
    <div className="min-h-screen bg-[#EEF1F5] text-[#1E2A45] p-6 md:px-8 md:py-10 pb-20 font-sans-modern transition-colors">
      <div className="max-w-[1080px] mx-auto">
        <DashboardHeader
          resumesCount={resumes.length}
          onCreateNew={handleCreateNew}
          onNavigateHome={() => navigate(PATHS.HOME)}
        />

        <DashboardToolbar
          query={query}
          setQuery={setQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortMenuOpen={sortMenuOpen}
          setSortMenuOpen={setSortMenuOpen}
          sortLabel={sortLabel}
          matchCount={sorted.length}
          isSearching={query.length > 0}
        />

        {sorted.length === 0 ? (
          <EmptyState
            isSearching={query.length > 0}
            query={query}
            onClearSearch={() => setQuery('')}
            onCreateNew={handleCreateNew}
          />
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(268px,1fr))] gap-5">
            {sorted.map((r, i) => (
              <ResumeCard
                key={r.id}
                resume={r}
                index={i}
                isEditing={editingId === r.id}
                draftName={draftName}
                onOpen={handleOpen}
                onStartRename={handleStartRename}
                onDraftChange={setDraftName}
                onCommitRename={handleCommitRename}
                onCancelRename={handleCancelRename}
                onDuplicate={handleDuplicate}
                onRequestDelete={handleRequestDelete}
                isMenuOpen={menuOpenId === r.id}
                onToggleMenu={(id) => setMenuOpenId((cur) => (cur === id ? null : id))}
                inputRef={editingId === r.id ? nameInputRef : null}
              />
            ))}
          </div>
        )}
      </div>

      <DeleteConfirmDialog
        deleteTarget={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        cancelBtnRef={deleteCancelBtnRef}
      />

      <ToastNotification
        toast={toast}
        onDismiss={() => setToast(null)}
      />
    </div>
  );
}
