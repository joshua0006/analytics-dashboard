import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeContext, useThemeState } from './hooks/useTheme';
import { Layout } from './components/layout/Layout';
import { YouTubePage } from './pages/YouTubePage';
import { StorePage } from './pages/StorePage';
import { CombinedPage } from './pages/CombinedPage';

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const value = useThemeState();
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/combined" replace />} />
            <Route path="combined" element={<CombinedPage />} />
            <Route path="youtube"  element={<YouTubePage />} />
            <Route path="store"    element={<StorePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
