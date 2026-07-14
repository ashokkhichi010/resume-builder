import { Button } from "@/shared/ui/button";
import { Textarea } from "@/shared/ui/textarea";
import { Plus, Trash2, Eye, EyeOff } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export function BulletsEditor({ 
  bullets, 
  maxChar, 
  onChange, 
  maxBullets,
  hiddenBullets = [],
  onToggleHide
}: { 
  bullets: string[]; 
  maxChar: number; 
  onChange: (b: string[]) => void; 
  maxBullets: number;
  hiddenBullets?: number[];
  onToggleHide?: (index: number) => void;
}) {
  return (
    <div className="space-y-3">
      {bullets.map((b, i) => {
        const chars = b.length;
        const overLimit = chars > maxChar;
        const isHidden = hiddenBullets.includes(i);
        return (
          <div key={i} className={cn("flex gap-2 items-start", isHidden && "opacity-50")}>
            <div className="flex-1 space-y-1">
              <Textarea
                rows={2}
                value={b}
                className={cn("min-h-[60px]", overLimit && "border-destructive focus-visible:ring-destructive")}
                onChange={(e) => {
                  const next = bullets.slice(); next[i] = e.target.value; onChange(next);
                }}
              />
              <div className={cn("text-xs text-right", overLimit ? "text-destructive font-medium" : "text-muted-foreground")}>
                {chars} / {maxChar} chars
              </div>
            </div>
            {onToggleHide && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-9 w-9 shrink-0 text-muted-foreground hover:text-foreground mt-1" 
                onClick={() => onToggleHide(i)}
                title={isHidden ? "Show bullet on resume" : "Hide bullet from resume"}
              >
                {isHidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            )}
            <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive mt-1" onClick={() => onChange(bullets.filter((_, idx) => idx !== i))}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      })}
      {bullets.length < maxBullets ? (
        <Button variant="outline" size="sm" onClick={() => onChange([...bullets, ""])}>
          <Plus className="h-4 w-4" /> Add bullet ({bullets.length}/{maxBullets})
        </Button>
      ) : (
        <div className="text-xs text-amber-600 bg-amber-500/10 p-2 rounded border border-amber-500/20">
          Maximum bullets ({maxBullets}) reached for this item.
        </div>
      )}
    </div>
  );
}
