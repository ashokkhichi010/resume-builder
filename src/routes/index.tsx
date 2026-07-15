import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { PATHS } from '@/routes/paths';

const HomePage = lazy(() => import('@/pages/home'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const EditorPage = lazy(() => import('@/pages/editor'));
const NotFoundPage = lazy(() => import('@/pages/not-found'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

import { ResumeProvider } from '@/Providers/resume-provider';

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ResumeProvider>
        <Routes>
          <Route path={PATHS.HOME} element={<HomePage />} />
          <Route path={PATHS.DASHBOARD} element={<DashboardPage />} />
          <Route path={PATHS.EDITOR} element={<EditorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ResumeProvider>
    </Suspense>
  );
}

export default AppRoutes;
