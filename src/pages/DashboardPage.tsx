import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LayoutDashboard, User, LogOut } from 'lucide-react';

const menuItems = [
  { id: 'overview', label: 'Visão Geral', icon: <LayoutDashboard className="h-4 w-4" /> },
  { id: 'profile', label: 'Meu Perfil', icon: <User className="h-4 w-4" /> },
];

export default function DashboardPage() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() => {
    const path = location.pathname.split('/').pop() || 'overview';
    return path === 'dashboard' ? 'overview' : path;
  });

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    navigate(tabId === 'overview' ? '/dashboard' : `/dashboard/${tabId}`);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r bg-card">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">Painel de Controle</h1>
        </div>
        
        <nav className="p-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`flex items-center w-full p-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          ))}
          
          <button
            onClick={handleSignOut}
            className="flex items-center w-full p-3 mt-4 text-sm font-medium text-muted-foreground rounded-md hover:bg-accent hover:text-accent-foreground"
          >
            <LogOut className="h-4 w-4 mr-3" />
            Sair
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
