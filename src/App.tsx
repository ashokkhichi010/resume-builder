import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';

import { Toaster } from "@/shared/ui/sonner"

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
