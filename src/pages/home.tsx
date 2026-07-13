import { Link } from 'react-router-dom';
import { PATHS } from '@/routes/paths';
import { TEMPLATE_META } from '@/shared/lib/resume-types';

/* ─── tiny static data ─── */
const features = [
  {
    icon: '⚡',
    title: 'Live Preview',
    desc: 'Every keystroke instantly updates your resume. No refresh, no lag.',
  },
  {
    icon: '🎨',
    title: '5 Pro Templates',
    desc: 'Classic, Minimalist, Tech Lead, Executive & Startup — each crafted to impress.',
  },
  {
    icon: '👤',
    title: 'Multiple Profiles',
    desc: 'Maintain a different resume per job target. Switch in one click.',
  },
  {
    icon: '🖨️',
    title: 'Print / PDF',
    desc: 'One-click perfect A4/Letter print output with proper margins.',
  },
  {
    icon: '🔒',
    title: 'Private by Default',
    desc: 'Everything lives in your browser. Zero sign-up, zero server.',
  },
  {
    icon: '📱',
    title: 'Mobile Ready',
    desc: 'Edit and preview on any device — desktop, tablet or phone.',
  },
];

const steps = [
  { n: '01', label: 'Open the Builder', desc: 'Jump straight into the editor — no account needed.' },
  { n: '02', label: 'Fill Your Details', desc: 'Add experience, skills, projects and education section by section.' },
  { n: '03', label: 'Pick a Template', desc: 'Choose from 5 professionally-designed templates in the header.' },
  { n: '04', label: 'Export as PDF', desc: 'Hit Print / PDF for a pixel-perfect export ready to send.' },
];

const templateList = Object.entries(TEMPLATE_META) as [string, { name: string; description: string }][];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ─── Nav ─── */}
      <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-md bg-primary grid place-items-center text-primary-foreground font-black text-sm select-none">
              R
            </div>
            <span className="font-bold text-lg tracking-tight">Resume Architect</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#features"
              className="hidden sm:block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="hidden sm:block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              How it works
            </a>
            <Link
              to={PATHS.DASHBOARD}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Open Builder →
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden">
        {/* gradient blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-30"
          style={{
            background:
              'radial-gradient(ellipse at center, oklch(0.6 0.18 265) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        <div className="relative max-w-4xl mx-auto px-5 pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold mb-6 uppercase tracking-widest">
            ✦ Free · No login · Browser-only
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.08] mb-6">
            Build resumes that
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, oklch(0.55 0.22 265), oklch(0.7 0.18 295))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              land interviews.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            A lightning-fast, privacy-first resume builder. Live preview, 5 pro templates,
            multiple profiles — everything you need to craft the perfect application.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to={PATHS.DASHBOARD}
              className="px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-base hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/30"
            >
              Start Building for Free
            </Link>
            <a
              href="#features"
              className="px-8 py-3.5 rounded-xl border border-border bg-card text-foreground font-semibold text-base hover:bg-muted/60 transition-colors"
            >
              See Features ↓
            </a>
          </div>

          {/* social proof strip */}
          <div className="mt-14 flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
            {['No sign-up required', '5 pro templates', 'PDF export', '100% free'].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <span className="text-green-500 font-bold">✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Templates strip ─── */}
      <section className="border-y border-border bg-muted/30 py-10">
        <div className="max-w-6xl mx-auto px-5">
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-6">
            5 Professionally designed templates
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {templateList.map(([id, { name, description }]) => (
              <div
                key={id}
                className="px-4 py-2.5 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors cursor-default"
              >
                <div className="font-semibold text-sm">{name}</div>
                <div className="text-xs text-muted-foreground">{description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section id="features" className="py-24">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">
              Everything you need
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Built for job seekers, by developers
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              No bloat. No paywalls. Just the tools that matter.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-base mb-1.5">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section id="how-it-works" className="py-24 bg-muted/30 border-y border-border">
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">
              Simple process
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold">Ready in 4 steps</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.n} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-5 left-[calc(100%+8px)] w-[calc(100%-16px)] h-px border-t-2 border-dashed border-border" />
                )}
                <div
                  className="text-4xl font-black mb-3"
                  style={{
                    background: 'linear-gradient(135deg, oklch(0.55 0.22 265), oklch(0.7 0.18 295))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {s.n}
                </div>
                <h3 className="font-bold mb-1">{s.label}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA banner ─── */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <div
            className="p-10 sm:p-14 rounded-3xl border border-primary/20"
            style={{
              background:
                'radial-gradient(ellipse at 60% 0%, oklch(0.6 0.18 265 / 0.12) 0%, transparent 70%), hsl(var(--card))',
            }}
          >
            <h2 className="text-3xl sm:text-4xl font-black mb-4">
              Your next job starts here.
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              No account. No credit card. Just open the builder and go.
            </p>
            <Link
              to={PATHS.DASHBOARD}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 active:scale-95 transition-all shadow-xl shadow-primary/25"
            >
              Build My Resume →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-primary grid place-items-center text-primary-foreground font-black text-xs">
              R
            </div>
            <span>Resume Architect</span>
          </div>
          <span>Built with ❤️ · 100% private · No data leaves your browser</span>
        </div>
      </footer>
    </div>
  );
}
