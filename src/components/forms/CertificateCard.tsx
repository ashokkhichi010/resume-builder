import { Card } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Field } from "./Field";
import { ItemToolbar } from "./ItemToolbar";
import type { Certificate } from "@/shared/lib/resume-types";

export function CertificateCard({ cert, index, total, onChange, onDelete, onMove }: {
  cert: Certificate; index: number; total: number;
  onChange: (c: Certificate) => void; onDelete: () => void; onMove: (dir: -1 | 1) => void;
}) {
  return (
    <Card className={`p-3 space-y-3 transition-opacity duration-200 ${cert.hidden ? 'opacity-50' : ''}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-2 sm:border-none sm:pb-0">
        <div className="text-sm font-medium truncate min-w-0">{cert.title || "New certificate"}</div>
        <ItemToolbar index={index} total={total} onMove={onMove} onDelete={onDelete} hidden={cert.hidden} onToggleHide={() => onChange({ ...cert, hidden: !cert.hidden })} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field label="Title"><Input value={cert.title} onChange={(e) => onChange({ ...cert, title: e.target.value })} /></Field>
        </div>
        <Field label="Issuer"><Input value={cert.issuer} onChange={(e) => onChange({ ...cert, issuer: e.target.value })} /></Field>
        <Field label="Date"><Input value={cert.date} onChange={(e) => onChange({ ...cert, date: e.target.value })} placeholder="2023-01" /></Field>
        <div className="sm:col-span-2">
          <Field label="Link (URL)"><Input value={cert.link} onChange={(e) => onChange({ ...cert, link: e.target.value })} /></Field>
        </div>
      </div>
    </Card>
  );
}
