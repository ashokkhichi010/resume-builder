import { ArrowLeft, Plus } from "lucide-react";

interface DashboardHeaderProps {
  resumesCount: number;
  onCreateNew: () => void;
  onNavigateHome: () => void;
}

export function DashboardHeader({ resumesCount, onCreateNew, onNavigateHome }: DashboardHeaderProps) {
  return (
    <div className="flex justify-between items-end gap-5 flex-wrap mb-7">
      <div>
        <button 
            onClick={onNavigateHome}
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
          {resumesCount} resume{resumesCount === 1 ? '' : 's'} · tailored for different roles
        </p>
      </div>
      <button 
        type="button" 
        className="inline-flex items-center gap-2 bg-[#9C6A1E] text-white border-none py-[11px] px-[18px] rounded-[10px] text-[14px] font-semibold cursor-pointer transition-all hover:bg-[#7F5717] active:translate-y-px outline-none focus-visible:outline-2 focus-visible:outline-[#9C6A1E] focus-visible:outline-offset-2" 
        onClick={onCreateNew}
      >
        <Plus size={17} /> New resume
      </button>
    </div>
  );
}
