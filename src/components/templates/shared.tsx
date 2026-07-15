import type { TemplateId } from "@/shared/lib/resume-types";
import type { ReactNode } from "react";

export function formatDate(d: string) {
  if (!d) return "";
  const [y, m] = d.split("-");
  if (!y) return d;
  if (!m) return y;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const idx = parseInt(m, 10) - 1;
  return `${months[idx] ?? m} ${y}`;
}

export function dateRange(a: string, b: string, current: boolean) {
  const s = formatDate(a);
  const e = current ? "Present" : formatDate(b);
  if (!s && !e) return "";
  return `${s}${s && e ? " – " : ""}${e}`;
}



export function Section({
  title, children, variant, index
}: { title: string; children: ReactNode; variant: TemplateId; index?: number }) {
  const cls: Record<TemplateId, string> = {
    classic: "mt-4 text-[12pt] font-bold uppercase tracking-wider text-center border-b border-black pb-1 mb-2",
    minimalist: "mt-4 text-[11pt] font-semibold uppercase tracking-[0.15em] text-neutral-800 mb-1.5",
    techlead: "mt-4 text-[11pt] font-black uppercase mb-1 border-b-2 border-black pb-0.5",
    executive: "mt-3 text-[10pt] font-bold uppercase tracking-[0.2em] text-[#1f2a44] border-b border-[#1f2a44] pb-0.5 mb-1.5",
    startup: "mt-4 text-[11pt] font-bold mb-1 flex items-center gap-2 before:content-[''] before:h-px before:w-4 before:bg-black",
    atlas: "mt-5 text-[10pt] font-bold uppercase tracking-widest text-neutral-400 mb-2 flex items-center gap-2",
    nexus: "mt-5 text-[12pt] font-semibold text-slate-800 border-b border-slate-200 pb-1 mb-3",
    prisma: "mt-5 text-[12pt] font-medium text-teal-800 border-b-2 border-teal-100 pb-1 mb-3 uppercase tracking-wider",
    nova: "mt-5 text-[11pt] font-semibold italic text-neutral-800 border-b border-neutral-300 pb-1 mb-2",
    ridge: "mt-5 text-[13pt] font-black uppercase tracking-widest border-t-4 border-black pt-2 mb-3",
  };
  
  if (variant === "atlas") {
    return (
      <section>
        <h2 className={cls[variant]}>
          <span className="w-5 h-5 rounded-full bg-neutral-100 text-neutral-600 flex items-center justify-center text-[8pt]">{index}</span>
          {title}
        </h2>
        <div>{children}</div>
      </section>
    );
  }

  return (
    <section>
      <h2 className={cls[variant]}>{title}</h2>
      <div>{children}</div>
    </section>
  );
}