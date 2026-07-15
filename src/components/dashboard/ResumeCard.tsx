import { MoreVertical, Pencil, Copy, Trash2, FileText } from "lucide-react";
import type { ResumeProfile } from "@/shared/lib/resume-types";
import { ROLE_STYLES, formatRelative } from "../../shared/utils";
import { RoleTag } from "./RoleTag";

interface ResumeCardProps {
  resume: ResumeProfile;
  index: number;
  isEditing: boolean;
  draftName: string;
  onOpen: (r: ResumeProfile) => void;
  onStartRename: (r: ResumeProfile) => void;
  onDraftChange: (v: string) => void;
  onCommitRename: () => void;
  onCancelRename: () => void;
  onDuplicate: (r: ResumeProfile) => void;
  onRequestDelete: (r: ResumeProfile) => void;
  isMenuOpen: boolean;
  onToggleMenu: (id: string) => void;
  inputRef: any;
}

export function ResumeCard({
  resume, index, isEditing, draftName, onOpen, onStartRename,
  onDraftChange, onCommitRename, onCancelRename, onDuplicate,
  onRequestDelete, isMenuOpen, onToggleMenu, inputRef,
}: ResumeCardProps) {
  return (
    <div
      className="bg-white border border-[#E1E5EB] rounded-[16px] relative overflow-visible shadow-[0_1px_2px_rgba(30,42,69,0.04)] transition-all duration-180 hover:shadow-[0_14px_32px_rgba(30,42,69,0.10)] hover:-translate-y-[2px] hover:border-[#D8DCE3] animate-in fade-in slide-in-from-bottom-2 flex flex-col"
      style={{ animationDelay: `${Math.min(index, 8) * 40}ms`, animationFillMode: 'backwards' }}
    >
      <div
        className="cursor-pointer rounded-t-[16px] block group outline-none focus-visible:outline-2 focus-visible:outline-[#9C6A1E] focus-visible:-outline-offset-2 flex-1"
        role="button"
        tabIndex={0}
        onClick={() => onOpen(resume)}
        onKeyDown={(e) => { if (e.key === 'Enter') onOpen(resume); }}
        aria-label={`Open ${resume.profileName} in editor`}
      >
        <div className="bg-[#FBFAF7] border-b border-[#E1E5EB] rounded-t-[16px] overflow-hidden relative">
          <div className="h-2 w-full" style={{ background: (ROLE_STYLES[resume.role || 'general'] || ROLE_STYLES.general).accent }} />

          <div className="h-48 flex items-start justify-center overflow-hidden relative group-hover:bg-black/5 transition-colors">
            {/* Miniature Resume Preview */}
            <img
              src="/assets/resume_mockup.png"
              alt="Resume Architect Editor Preview"
            />

            {/* Overlay Action */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 backdrop-blur-[1px] z-20">
              <span className="bg-[#9C6A1E] text-white px-5 py-2.5 rounded-[10px] font-semibold text-sm shadow-md">Open Editor</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-3 right-3 z-30 rd-menu-wrap">
        <button
          type="button"
          className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-white/90 border border-[#E1E5EB] text-[#4B5566] cursor-pointer shadow-[0_2px_6px_rgba(30,42,69,0.08)] transition-colors hover:bg-white hover:text-[#1E2A45] outline-none focus-visible:outline-2 focus-visible:outline-[#9C6A1E]"
          aria-haspopup="menu"
          aria-expanded={isMenuOpen}
          aria-label={`Actions for ${resume.profileName}`}
          onClick={(e) => { e.stopPropagation(); onToggleMenu(resume.id); }}
        >
          <MoreVertical size={16} />
        </button>

        {isMenuOpen && (
          <div className="absolute top-[calc(100%+6px)] right-0 bg-white border border-[#E1E5EB] rounded-[10px] shadow-[0_14px_34px_rgba(30,42,69,0.16)] min-w-[170px] p-1.5 z-30 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
            <button type="button" className="flex items-center gap-[9px] w-full text-left px-2.5 py-2 rounded-[7px] text-[13px] text-[#1E2A45] hover:bg-[#EEF1F5] transition-colors cursor-pointer border-none bg-transparent" role="menuitem" onClick={() => onOpen(resume)}>
              <FileText size={15} /> Open
            </button>
            <button type="button" className="flex items-center gap-[9px] w-full text-left px-2.5 py-2 rounded-[7px] text-[13px] text-[#1E2A45] hover:bg-[#EEF1F5] transition-colors cursor-pointer border-none bg-transparent" role="menuitem" onClick={() => onStartRename(resume)}>
              <Pencil size={15} /> Rename
            </button>
            <button type="button" className="flex items-center gap-[9px] w-full text-left px-2.5 py-2 rounded-[7px] text-[13px] text-[#1E2A45] hover:bg-[#EEF1F5] transition-colors cursor-pointer border-none bg-transparent" role="menuitem" onClick={() => onDuplicate(resume)}>
              <Copy size={15} /> Duplicate
            </button>
            <div className="h-px bg-[#E1E5EB] my-[5px] mx-1" />
            <button
              type="button"
              className="flex items-center gap-[9px] w-full text-left px-2.5 py-2 rounded-[7px] text-[13px] text-[#AE4438] hover:bg-[#F7E9E6] transition-colors cursor-pointer border-none bg-transparent"
              role="menuitem"
              onClick={() => onRequestDelete(resume)}
            >
              <Trash2 size={15} /> Delete
            </button>
          </div>
        )}
      </div>

      <div className="p-3.5 px-4 pb-4 bg-white rounded-b-[16px]">
        {isEditing ? (
          <input
            ref={inputRef}
            className="w-full text-[15px] font-semibold text-[#1E2A45] border-none border-b-2 border-[#9C6A1E] p-0 pb-[3px] m-0 mb-[7px] bg-transparent outline-none focus:border-[#7F5717]"
            value={draftName}
            onChange={(e) => onDraftChange(e.target.value)}
            onBlur={onCommitRename}
            onKeyDown={(e) => {
              if (e.key === 'Enter') { e.preventDefault(); onCommitRename(); }
              if (e.key === 'Escape') { e.preventDefault(); onCancelRename(); }
            }}
            aria-label="Resume name"
          />
        ) : (
          <h3 className="text-[15px] font-semibold text-[#1E2A45] m-0 mb-1.5 overflow-hidden text-ellipsis whitespace-nowrap cursor-text" title={resume.profileName} onClick={() => onStartRename(resume)}>
            {resume.profileName}
          </h3>
        )}

        <div className="flex items-center gap-[7px] font-mono text-[11.5px] text-[#98A1B0]">
          <RoleTag role={resume.role} />
          <span className="text-[#D8DCE3]">·</span>
          <span>Edited {formatRelative(resume.updatedAt)}</span>
        </div>
      </div>
    </div>
  );
}
