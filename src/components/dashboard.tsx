import { useResume } from "@/Providers/resume-provider";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Copy, Plus, Printer, Trash2 } from "lucide-react";
import { TEMPLATE_IDS, TEMPLATE_META } from "@/shared/lib/resume-types";

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
        <div onClick={goToHome} className="cursor-pointer flex min-w-0 items-center gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground font-black">R</div>
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Resume Builder</div>
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
            <Printer className="h-4 w-4" /> Print / PDF
          </Button>
        </div>
      </div>
      <div className="px-4 pb-3 grid gap-2 sm:grid-cols-[minmax(0,1fr)_260px]">
        <Input
          value={active.profileName}
          onChange={(e) => renameProfile(active.id, e.target.value)}
          placeholder="Resume title / role target (e.g. Backend Engineer Track)"
          className="h-9"
        />
        <Select
          value={active.selectedTemplateId}
          onValueChange={(v) => updateActive({ selectedTemplateId: v })}
        >
          <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
          <SelectContent>
            {TEMPLATE_IDS.map(t => (
              <SelectItem key={t} value={t}>{TEMPLATE_META[t].name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </header>
  );
}