import { Search, X } from "lucide-react";

interface DashboardToolbarProps {
  query: string;
  setQuery: (q: string) => void;
  sortBy: string;
  setSortBy: (s: string) => void;
  sortMenuOpen: boolean;
  setSortMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sortLabel: string;
  matchCount: number;
  isSearching: boolean;
}

export function DashboardToolbar({
  query,
  setQuery,
  sortBy,
  setSortBy,
  sortMenuOpen,
  setSortMenuOpen,
  sortLabel,
  matchCount,
  isSearching,
}: DashboardToolbarProps) {
  return (
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
        {isSearching ? `${matchCount} match${matchCount === 1 ? '' : 'es'}` : `${matchCount} total`}
      </span>
    </div>
  );
}
