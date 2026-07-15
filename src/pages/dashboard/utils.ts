export const ROLE_STYLES: Record<string, { label: string, text: string, bg: string, accent: string }> = {
  design: { label: 'Design', text: '#6E4368', bg: '#F5EEF3', accent: '#9B6A93' },
  engineering: { label: 'Engineering', text: '#265C5C', bg: '#EAF3F2', accent: '#4C8C8C' },
  product: { label: 'Product', text: '#33406B', bg: '#EDEFF6', accent: '#5568A0' },
  marketing: { label: 'Marketing', text: '#7D3B29', bg: '#F6ECE8', accent: '#B0644C' },
  general: { label: 'General', text: '#4B5160', bg: '#EEF0F2', accent: '#7A8394' },
};

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

export function formatRelative(ts?: number) {
  if (!ts) return 'Just now';
  const diff = Date.now() - ts;
  const min = 60 * 1000, hr = HOUR, day = DAY, wk = 7 * day, mo = 30 * day;
  if (diff < min) return 'Just now';
  if (diff < hr) { const n = Math.floor(diff / min); return `${n} minute${n > 1 ? 's' : ''} ago`; }
  if (diff < day) { const n = Math.floor(diff / hr); return `${n} hour${n > 1 ? 's' : ''} ago`; }
  if (diff < wk) { const n = Math.floor(diff / day); return `${n} day${n > 1 ? 's' : ''} ago`; }
  if (diff < mo) { const n = Math.floor(diff / wk); return `${n} week${n > 1 ? 's' : ''} ago`; }
  const n = Math.floor(diff / mo); return `${n} month${n > 1 ? 's' : ''} ago`;
}
