import { Undo2, X } from "lucide-react";

interface ToastNotificationProps {
  toast: { message: string; onUndo?: () => void } | null;
  onDismiss: () => void;
}

export function ToastNotification({ toast, onDismiss }: ToastNotificationProps) {
  if (!toast) return null;

  return (
    <div className="fixed left-1/2 bottom-[26px] -translate-x-1/2 bg-[#1E2A45] text-white py-3 px-4 rounded-[11px] flex items-center gap-3 text-[13.5px] shadow-[0_16px_40px_rgba(20,26,41,0.35)] z-40 animate-in slide-in-from-bottom-5 fade-in duration-200 max-w-[calc(100vw-40px)]" role="status" aria-live="polite">
      <span>{toast.message}</span>
      {toast.onUndo && (
        <button type="button" className="inline-flex items-center gap-[5px] bg-transparent border-none text-[#F0C97E] font-semibold text-[13.5px] cursor-pointer whitespace-nowrap hover:underline" onClick={toast.onUndo}>
          <Undo2 size={14} /> Undo
        </button>
      )}
      <button type="button" className="bg-transparent border-none text-white/60 cursor-pointer flex p-0.5 hover:text-white transition-colors" onClick={onDismiss} aria-label="Dismiss">
        <X size={14} />
      </button>
    </div>
  );
}
