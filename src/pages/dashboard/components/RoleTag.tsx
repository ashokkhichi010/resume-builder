import { ROLE_STYLES } from "../utils";

export function RoleTag({ role = 'general' }: { role?: string }) {
  const style = ROLE_STYLES[role] || ROLE_STYLES.general;
  return (
    <span 
      className="font-sans text-[11px] font-semibold px-2 py-[3px] rounded-full" 
      style={{ color: style.text, background: style.bg }}
    >
      {style.label}
    </span>
  );
}
