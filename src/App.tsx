import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from '@/components/ui/sonner';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Index from './pages/Index';
import ProfilePage from './pages/ProfilePage';
import TranscricaoAnalise from './pages/TranscricaoAnalise';
import Header from './components/Header';

// Main layout component that includes the header and content
function MainLayout() {
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Global Header */}
      <Header />
      
      {/* Main Content */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/transcricaoAnalise" element={<TranscricaoAnalise />} />
            <Route path="/conta" element={<ProfilePage />} />
            
            {/* Redirect to home if route doesn't exist */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
      
      {/* Global Toaster */}
      <Toaster position="top-center" />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* All other routes use the main layout */}
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
