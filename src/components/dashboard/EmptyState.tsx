import { FileText, Plus, Search } from "lucide-react";

interface EmptyStateProps {
  isSearching: boolean;
  query: string;
  onClearSearch: () => void;
  onCreateNew: () => void;
}

export function EmptyState({ isSearching, query, onClearSearch, onCreateNew }: EmptyStateProps) {
  if (!isSearching) {
    return (
      <div className="flex flex-col items-center text-center py-[90px] px-5 text-[#4B5566]">
        <div className="w-[52px] h-[52px] rounded-[14px] bg-[#F6EEDD] text-[#9C6A1E] flex items-center justify-center mb-4">
          <FileText size={24} />
        </div>
        <h2 className="font-classic text-[20px] font-semibold text-[#1E2A45] m-0 mb-1.5">No resumes yet</h2>
        <p className="text-[14px] m-0 mb-5 max-w-[320px]">Create your first resume to start tailoring it for a specific role.</p>
        <button type="button" className="inline-flex items-center gap-2 bg-[#9C6A1E] text-white border-none py-[11px] px-[18px] rounded-[10px] text-[14px] font-semibold cursor-pointer transition-all hover:bg-[#7F5717]" onClick={onCreateNew}>
          <Plus size={17} /> Create your first resume
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center py-[90px] px-5 text-[#4B5566]">
      <div className="w-[52px] h-[52px] rounded-[14px] bg-[#F6EEDD] text-[#9C6A1E] flex items-center justify-center mb-4">
        <Search size={22} />
      </div>
      <h2 className="font-classic text-[20px] font-semibold text-[#1E2A45] m-0 mb-1.5">No matches for "{query}"</h2>
      <p className="text-[14px] m-0 mb-5 max-w-[320px]">Try a different name or role, or clear your search.</p>
      <button type="button" className="bg-white border border-[#E1E5EB] text-[#1E2A45] cursor-pointer py-2 px-4 rounded-[9px] text-[13.5px] font-semibold hover:bg-[#EEF1F5] transition-colors" onClick={onClearSearch}>
        Clear search
      </button>
    </div>
  );
}
