import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useResume } from "@/Providers/resume-provider";
import { 
  Plus, Search, X, FileText, Undo2, AlertTriangle, ArrowLeft
} from "lucide-react";
import { PATHS } from "@/routes/paths";
import type { ResumeProfile } from "@/shared/lib/resume-types";
import { ROLE_STYLES } from "./utils";
import { ResumeCard } from "./components/ResumeCard";

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
        
        {/* Header */}
        <div className="flex justify-between items-end gap-5 flex-wrap mb-7">
          <div>
            <button 
                onClick={() => navigate(PATHS.HOME)}
                className="flex items-center gap-1.5 text-sm font-semibold text-[#4B5566] hover:text-[#1E2A45] transition-colors mb-4 group cursor-pointer bg-transparent border-none p-0"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to Home
            </button>
            <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#9C6A1E] font-medium m-0 mb-2">
              Resumes
            </p>
            <h1 className="font-classic text-[34px] font-semibold m-0 mb-1.5 text-[#1E2A45] tracking-tight">
              Your resumes
            </h1>
            <p className="text-[14px] text-[#4B5566] m-0">
              {resumes.length} resume{resumes.length === 1 ? '' : 's'} · tailored for different roles
            </p>
          </div>
          <button 
            type="button" 
            className="inline-flex items-center gap-2 bg-[#9C6A1E] text-white border-none py-[11px] px-[18px] rounded-[10px] text-[14px] font-semibold cursor-pointer transition-all hover:bg-[#7F5717] active:translate-y-px outline-none focus-visible:outline-2 focus-visible:outline-[#9C6A1E] focus-visible:outline-offset-2" 
            onClick={handleCreateNew}
          >
            <Plus size={17} /> New resume
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex gap-3 items-center mb-6 flex-wrap">
          <div className="relative flex-1 min-w-[220px] max-w-full md:max-w-[360px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#98A1B0] pointer-events-none" />
            <input
              className="w-full py-2.5 pl-[34px] pr-9 rounded-[10px] border border-[#E1E5EB] bg-white text-[14px] text-[#1E2A45] outline-none transition-all placeholder:text-[#98A1B0] focus:border-[#9C6A1E] focus:ring-[3px] focus:ring-[#F6EEDD]"
              type="text"
              placeholder="Search resumes or roles…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search resumes"
            />
            {query && (
              <button 
                type="button" 
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-[#98A1B0] hover:text-[#4B5566] hover:bg-[#EEF1F5] transition-colors border-none bg-transparent cursor-pointer" 
                onClick={() => setQuery('')} 
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="relative rd-sort-wrap">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 bg-white border border-[#E1E5EB] py-2.5 px-3.5 rounded-[10px] text-[13px] text-[#4B5566] cursor-pointer transition-colors hover:border-[#98A1B0] outline-none focus-visible:outline-2 focus-visible:outline-[#9C6A1E] focus-visible:outline-offset-2"
              aria-haspopup="listbox"
              aria-expanded={sortMenuOpen}
              onClick={() => setSortMenuOpen((v) => !v)}
            >
              Sort: {sortLabel}
            </button>
            {sortMenuOpen && (
              <div className="absolute top-[calc(100%+6px)] right-0 bg-white border border-[#E1E5EB] rounded-[10px] shadow-[0_10px_30px_rgba(30,42,69,0.12)] min-w-[170px] p-1.5 z-20 animate-in fade-in zoom-in-95 duration-100 origin-top-right" role="listbox">
                <button
                  type="button"
                  className={`block w-full text-left px-2.5 py-2 rounded-[7px] text-[13px] cursor-pointer border-none bg-transparent hover:bg-[#EEF1F5] transition-colors ${sortBy === 'updated' ? 'text-[#9C6A1E] font-semibold' : 'text-[#1E2A45]'}`}
                  role="option"
                  aria-selected={sortBy === 'updated'}
                  onClick={() => { setSortBy('updated'); setSortMenuOpen(false); }}
                >
                  Last edited
                </button>
                <button
                  type="button"
                  className={`block w-full text-left px-2.5 py-2 rounded-[7px] text-[13px] cursor-pointer border-none bg-transparent hover:bg-[#EEF1F5] transition-colors ${sortBy === 'name' ? 'text-[#9C6A1E] font-semibold' : 'text-[#1E2A45]'}`}
                  role="option"
                  aria-selected={sortBy === 'name'}
                  onClick={() => { setSortBy('name'); setSortMenuOpen(false); }}
                >
                  Name (A–Z)
                </button>
              </div>
            )}
          </div>

          <span className="font-mono text-[12px] text-[#98A1B0] ml-auto">
            {query ? `${sorted.length} match${sorted.length === 1 ? '' : 'es'}` : `${sorted.length} total`}
          </span>
        </div>

        {/* Content */}
        {sorted.length === 0 ? (
          resumes.length === 0 ? (
            <div className="flex flex-col items-center text-center py-[90px] px-5 text-[#4B5566]">
              <div className="w-[52px] h-[52px] rounded-[14px] bg-[#F6EEDD] text-[#9C6A1E] flex items-center justify-center mb-4">
                <FileText size={24} />
              </div>
              <h2 className="font-classic text-[20px] font-semibold text-[#1E2A45] m-0 mb-1.5">No resumes yet</h2>
              <p className="text-[14px] m-0 mb-5 max-w-[320px]">Create your first resume to start tailoring it for a specific role.</p>
              <button type="button" className="inline-flex items-center gap-2 bg-[#9C6A1E] text-white border-none py-[11px] px-[18px] rounded-[10px] text-[14px] font-semibold cursor-pointer transition-all hover:bg-[#7F5717]" onClick={handleCreateNew}>
                <Plus size={17} /> Create your first resume
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center py-[90px] px-5 text-[#4B5566]">
              <div className="w-[52px] h-[52px] rounded-[14px] bg-[#F6EEDD] text-[#9C6A1E] flex items-center justify-center mb-4">
                <Search size={22} />
              </div>
              <h2 className="font-classic text-[20px] font-semibold text-[#1E2A45] m-0 mb-1.5">No matches for "{query}"</h2>
              <p className="text-[14px] m-0 mb-5 max-w-[320px]">Try a different name or role, or clear your search.</p>
              <button type="button" className="bg-white border border-[#E1E5EB] text-[#1E2A45] cursor-pointer py-2 px-4 rounded-[9px] text-[13.5px] font-semibold hover:bg-[#EEF1F5] transition-colors" onClick={() => setQuery('')}>
                Clear search
              </button>
            </div>
          )
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

      {/* Delete Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-[#141A29]/44 flex items-center justify-center p-5 z-50 animate-in fade-in" onMouseDown={(e) => { if (e.target === e.currentTarget) setDeleteTarget(null); }}>
          <div className="bg-white rounded-[16px] p-6 max-w-[380px] w-full shadow-[0_24px_60px_rgba(20,26,41,0.3)] animate-in fade-in zoom-in-95 duration-200" role="dialog" aria-modal="true" aria-labelledby="rd-delete-title">
            <div className="w-10 h-10 rounded-[10px] bg-[#F7E9E6] text-[#AE4438] flex items-center justify-center mb-3.5">
              <AlertTriangle size={20} />
            </div>
            <h2 className="text-[16px] font-bold m-0 mb-2 text-[#1E2A45]" id="rd-delete-title">Delete this resume?</h2>
            <p className="text-[14px] text-[#4B5566] m-0 mb-[22px] leading-relaxed">
              <strong>{deleteTarget.profileName}</strong> will be removed. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2.5">
              <button type="button" ref={deleteCancelBtnRef} className="bg-white border border-[#E1E5EB] text-[#1E2A45] py-2 px-4 rounded-[9px] text-[13.5px] font-semibold cursor-pointer hover:bg-[#EEF1F5] transition-colors" onClick={() => setDeleteTarget(null)}>
                Cancel
              </button>
              <button type="button" className="bg-[#AE4438] border-none text-white py-2 px-4 rounded-[9px] text-[13.5px] font-semibold cursor-pointer hover:bg-[#8F372D] transition-colors" onClick={handleConfirmDelete}>
                Delete resume
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed left-1/2 bottom-[26px] -translate-x-1/2 bg-[#1E2A45] text-white py-3 px-4 rounded-[11px] flex items-center gap-3 text-[13.5px] shadow-[0_16px_40px_rgba(20,26,41,0.35)] z-40 animate-in slide-in-from-bottom-5 fade-in duration-200 max-w-[calc(100vw-40px)]" role="status" aria-live="polite">
          <span>{toast.message}</span>
          {toast.onUndo && (
            <button type="button" className="inline-flex items-center gap-[5px] bg-transparent border-none text-[#F0C97E] font-semibold text-[13.5px] cursor-pointer whitespace-nowrap hover:underline" onClick={toast.onUndo}>
              <Undo2 size={14} /> Undo
            </button>
          )}
          <button type="button" className="bg-transparent border-none text-white/60 cursor-pointer flex p-0.5 hover:text-white transition-colors" onClick={() => setToast(null)} aria-label="Dismiss">
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
