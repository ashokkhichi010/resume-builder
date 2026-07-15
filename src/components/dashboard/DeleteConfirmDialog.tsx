import { AlertTriangle } from "lucide-react";
import type { ResumeProfile } from "@/shared/lib/resume-types";

interface DeleteConfirmDialogProps {
  deleteTarget: ResumeProfile | null;
  onCancel: () => void;
  onConfirm: () => void;
  cancelBtnRef: React.RefObject<HTMLButtonElement | null>;
}

export function DeleteConfirmDialog({ deleteTarget, onCancel, onConfirm, cancelBtnRef }: DeleteConfirmDialogProps) {
  if (!deleteTarget) return null;

  return (
    <div className="fixed inset-0 bg-[#141A29]/44 flex items-center justify-center p-5 z-50 animate-in fade-in" onMouseDown={(e) => { if (e.target === e.currentTarget) onCancel(); }}>
      <div className="bg-white rounded-[16px] p-6 max-w-[380px] w-full shadow-[0_24px_60px_rgba(20,26,41,0.3)] animate-in fade-in zoom-in-95 duration-200" role="dialog" aria-modal="true" aria-labelledby="rd-delete-title">
        <div className="w-10 h-10 rounded-[10px] bg-[#F7E9E6] text-[#AE4438] flex items-center justify-center mb-3.5">
          <AlertTriangle size={20} />
        </div>
        <h2 className="text-[16px] font-bold m-0 mb-2 text-[#1E2A45]" id="rd-delete-title">Delete this resume?</h2>
        <p className="text-[14px] text-[#4B5566] m-0 mb-[22px] leading-relaxed">
          <strong>{deleteTarget.profileName}</strong> will be removed. This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2.5">
          <button type="button" ref={cancelBtnRef} className="bg-white border border-[#E1E5EB] text-[#1E2A45] py-2 px-4 rounded-[9px] text-[13.5px] font-semibold cursor-pointer hover:bg-[#EEF1F5] transition-colors" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="bg-[#AE4438] border-none text-white py-2 px-4 rounded-[9px] text-[13.5px] font-semibold cursor-pointer hover:bg-[#8F372D] transition-colors" onClick={onConfirm}>
            Delete resume
          </button>
        </div>
      </div>
    </div>
  );
}
