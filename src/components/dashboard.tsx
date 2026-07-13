import { useResume } from "@/Providers/resume-provider";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Copy, Plus, Printer, Trash2 } from "lucide-react";
import { TEMPLATE_IDS, TEMPLATE_META } from "@/shared/lib/resume-types";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";

export function Dashboard() {
  const { state, active, setActive, createProfile, cloneProfile, deleteProfile, renameProfile, updateActive } = useResume();

  const goToHome = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    window.location.href = "/";
  }

  return (
    <header className="no-print sticky top-0 z-20 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/70">
      <div className="px-4 py-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:flex-wrap sm:justify-between">
        <div onClick={goToHome} className="cursor-pointer flex min-w-0 items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-black shadow-sm">R</div>
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-widest text-muted-foreground/80 font-medium">Resume Builder</div>
            <div className="truncate text-sm font-semibold">{active.profileName}</div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 justify-end">
          <Select value={active.id} onValueChange={setActive}>
            <SelectTrigger className="w-[220px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              {state.profiles.map(p => (
                <SelectItem key={p.id} value={p.id}>{p.profileName}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={() => createProfile("New Resume")}>
            <Plus className="h-4 w-4" /> New
          </Button>
          <Button variant="outline" size="sm" onClick={() => cloneProfile(active.id)}>
            <Copy className="h-4 w-4" /> Clone
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (state.profiles.length <= 1) return;
              if (confirm(`Delete "${active.profileName}"?`)) deleteProfile(active.id);
            }}
            disabled={state.profiles.length <= 1}
          >
            <Trash2 className="h-4 w-4" /> Delete
          </Button>
          <Button size="sm" onClick={() => window.print()}>
            <Printer className="h-4 w-4" /> Print PDF
          </Button>
        </div>
      </div>
      <div className="px-4 pb-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <Input
          value={active.profileName}
          onChange={(e) => renameProfile(active.id, e.target.value)}
          placeholder="Resume title / role target (e.g. Backend Engineer Track)"
          className="h-9 flex-1"
        />
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-md border bg-muted/30 p-1">
            <span className="text-xs font-medium text-muted-foreground pl-2 uppercase tracking-wider">Pages</span>
            <ToggleGroup
              type="single"
              value={String(active.pageCount || 1)}
              onValueChange={(v) => {
                if (v) updateActive({ pageCount: Number(v) as 1 | 2 })
              }}
              className="h-7"
            >
              <ToggleGroupItem value="1" className="h-7 px-2.5 text-xs data-[state=on]:bg-background data-[state=on]:shadow-sm">1</ToggleGroupItem>
              <ToggleGroupItem value="2" className="h-7 px-2.5 text-xs data-[state=on]:bg-background data-[state=on]:shadow-sm">2</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <Select
            value={active.selectedTemplateId}
            onValueChange={(v) => updateActive({ selectedTemplateId: v })}
          >
            <SelectTrigger className="h-9 w-full sm:w-[220px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              {TEMPLATE_IDS.map(t => (
                <SelectItem key={t} value={t}>{TEMPLATE_META[t].name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
}