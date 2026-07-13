import { Link } from 'react-router-dom';
import { PATHS } from '@/routes/paths';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-6">
      <div className="text-[120px] font-black leading-none text-primary/10 select-none">404</div>
      <h1 className="text-3xl font-bold mt-4 mb-2">Page not found</h1>
      <p className="text-muted-foreground mb-8 max-w-sm">
        The page you're looking for doesn't exist or was moved.
      </p>
      <Link
        to={PATHS.HOME}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
