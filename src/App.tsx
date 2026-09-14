import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { PublicSite } from '@/pages/PublicSite';
import { Login } from '@/pages/Login';
import { CounterPOS } from '@/pages/CounterPOS';
import { AdminDashboard } from '@/pages/AdminDashboard';
import { PublicBillView } from '@/pages/PublicBillView';
import { TreePalm } from 'lucide-react';

function ProtectedRoute({ children, role }: { children: React.ReactNode; role?: 'admin' | 'counter' }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-forest-950">
        <div className="text-center">
          <TreePalm className="text-cream-400 mx-auto mb-4 animate-pulse" size={48} />
          <p className="text-cream-200/60 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/counter'} replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicSite />} />
      <Route path="/login" element={<Login />} />
      <Route path="/bill/:billId" element={<PublicBillView />} />
      <Route path="/bills/:billId" element={<PublicBillView />} />
      <Route path="/counter" element={<ProtectedRoute><CounterPOS /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <LanguageProvider>
          <ThemeProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </ThemeProvider>
        </LanguageProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
