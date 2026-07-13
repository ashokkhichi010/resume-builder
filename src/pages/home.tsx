import { Link } from 'react-router-dom';
import { PATHS } from '@/routes/paths';
import { TEMPLATE_META } from '@/shared/lib/resume-types';
import { ArrowRight, CheckCircle2, Zap, Palette, Users, Printer, Lock, Smartphone, LayoutTemplate } from 'lucide-react';

/* ─── tiny static data ─── */
const features = [
  {
    icon: <Zap className="h-7 w-7 text-amber-500" />,
    title: 'Live Preview',
    desc: 'Every keystroke instantly updates your resume. No refresh, no lag.',
  },
  {
    icon: <Palette className="h-7 w-7 text-pink-500" />,
    title: '5 Pro Templates',
    desc: 'Classic, Minimalist, Tech Lead, Executive & Startup — each crafted to impress.',
  },
  {
    icon: <Users className="h-7 w-7 text-blue-500" />,
    title: 'Multiple Profiles',
    desc: 'Maintain a different resume per job target. Switch in one click.',
  },
  {
    icon: <Printer className="h-7 w-7 text-emerald-500" />,
    title: 'Print / PDF',
    desc: 'One-click perfect A4/Letter print output with proper margins.',
  },
  {
    icon: <Lock className="h-7 w-7 text-slate-500" />,
    title: 'Private by Default',
    desc: 'Everything lives in your browser. Zero sign-up, zero server.',
  },
  {
    icon: <Smartphone className="h-7 w-7 text-purple-500" />,
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
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20">

      {/* ─── Nav ─── */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-md supports-[backdrop-filter]:bg-background/40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 group">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-primary/80 grid place-items-center text-primary-foreground font-black text-sm select-none shadow-sm shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
              R
            </div>
            <span className="font-bold text-lg tracking-tight">Resume Architect</span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#features"
              className="hidden sm:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="hidden sm:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              How it works
            </a>
            <Link
              to={PATHS.DASHBOARD}
              className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300"
            >
              Open Builder <ArrowRight className="inline-block h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pt-32 pb-24">
        {/* Animated background gradient blobs */}
        <div className="absolute top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none -z-10">
          <div className="w-[1000px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-50 mix-blend-multiply animate-pulse" style={{ animationDuration: '4s' }}></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-both">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold mb-8 uppercase tracking-widest shadow-sm">
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Free · No login · Browser-only
            </div>

            <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-[1.1] mb-6">
              Build resumes that
              <br className="hidden sm:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-purple-500">
                {' '}land interviews.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              A lightning-fast, privacy-first resume builder. Live preview, pro templates,
              and multiple profiles — everything you need to craft the perfect application.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to={PATHS.DASHBOARD}
                className="group px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-xl shadow-primary/30 flex items-center justify-center gap-2"
              >
                Start Building for Free
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#features"
                className="px-8 py-4 rounded-full border border-border/50 bg-background/50 backdrop-blur text-foreground font-semibold text-lg hover:bg-muted hover:border-border transition-all duration-300 flex items-center justify-center"
              >
                See Features
              </a>
            </div>
          </div>

          {/* Hero Image Mockup */}
          <div className="mt-16 sm:mt-24 relative max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200 fill-mode-both perspective-1000">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-20 pointer-events-none h-1/2 bottom-0" />
            <div className="relative group perspective-1000">
              <div className="absolute inset-0 bg-primary/20 blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500 rounded-3xl -z-10 translate-y-12 scale-90" />
              <img 
                src="/assets/resume_mockup.png" 
                alt="Resume Architect Editor Preview" 
                className="w-full h-auto rounded-xl border border-border/50 shadow-2xl shadow-primary/10 rotate-[2deg] group-hover:rotate-0 transition-transform duration-700 ease-out z-10 relative bg-background"
              />
            </div>
          </div>

          {/* Social proof strip */}
          <div className="mt-12 sm:mt-0 pt-10 border-t border-border/40 flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-sm text-muted-foreground animate-in fade-in duration-1000 delay-500 fill-mode-both relative z-30">
            {['No sign-up required', '5 pro templates', 'PDF export', '100% free'].map((t) => (
              <span key={t} className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="h-5 w-5 text-green-500/80" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Templates strip ─── */}
      <section className="bg-muted/30 border-y border-border/40 py-16 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-10">
            <LayoutTemplate className="h-8 w-8 text-primary/60 mx-auto mb-3" />
            <p className="text-sm uppercase tracking-widest text-muted-foreground font-bold">
              5 Professionally Designed Templates
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {templateList.map(([id, { name, description }]) => (
              <div
                key={id}
                className="group relative px-6 py-4 rounded-2xl border border-border/50 bg-card hover:border-primary/50 transition-all duration-300 cursor-default shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 w-full sm:w-[calc(50%-0.5rem)] lg:w-auto flex-1 min-w-[200px]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                <div className="relative z-10">
                  <div className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{name}</div>
                  <div className="text-sm text-muted-foreground">{description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section id="features" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest text-primary font-bold mb-3">
              Everything you need
            </p>
            <h2 className="text-4xl font-black tracking-tight">
              Built for job seekers, by developers
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
              No bloat. No paywalls. Just the tools that matter.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, _) => (
              <div
                key={f.title}
                className="group relative p-8 rounded-3xl border border-border/40 bg-card/50 hover:bg-card transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="mb-6 p-4 rounded-2xl bg-muted/50 inline-block group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
                    {f.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-3">{f.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section id="how-it-works" className="py-24 bg-muted/20 border-y border-border/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-sm uppercase tracking-widest text-primary font-bold mb-3">
              Simple process
            </p>
            <h2 className="text-4xl font-black tracking-tight">Ready in 4 steps</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
            {steps.map((s, i) => (
              <div key={s.n} className="relative group">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(100%-10px)] w-[calc(100%-10px)] h-0.5 bg-gradient-to-r from-border to-transparent group-hover:from-primary/40 transition-colors duration-500" />
                )}
                <div
                  className="text-6xl font-black mb-6 opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary)/0.5))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {s.n}
                </div>
                <h3 className="font-bold text-xl mb-2">{s.label}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA banner ─── */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full max-h-[400px] bg-primary/20 rounded-full blur-[100px] opacity-40"></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="p-12 sm:p-20 rounded-[2.5rem] bg-card/80 backdrop-blur-xl border border-primary/20 shadow-2xl shadow-primary/10">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">
              Your next job starts here.
            </h2>
            <p className="text-muted-foreground mb-10 text-xl max-w-2xl mx-auto">
              No account. No credit card. Just open the builder and go. Your data never leaves your browser.
            </p>
            <Link
              to={PATHS.DASHBOARD}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-primary text-primary-foreground font-bold text-xl hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/30"
            >
              Build My Resume <ArrowRight className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border/40 py-10 bg-muted/10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground font-medium">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary/10 grid place-items-center text-primary font-black text-sm">
              R
            </div>
            <span className="font-bold text-foreground">Resume Architect</span>
          </div>
          <p>Built with ❤️ · 100% private · No data leaves your browser</p>
        </div>
      </footer>
    </div>
  );
}
