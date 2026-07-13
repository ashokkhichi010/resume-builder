import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { PATHS } from '@/routes/paths';

const HomePage    = lazy(() => import('@/pages/home'));
const EditorPage  = lazy(() => import('@/pages/index'));
const NotFoundPage = lazy(() => import('@/pages/not-found'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path={PATHS.HOME}   element={<HomePage />} />
        <Route path={PATHS.EDITOR} element={<EditorPage />} />
        <Route path="*"            element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
