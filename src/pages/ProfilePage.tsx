import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { User, CreditCard, History, Settings, Mail, Lock, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { id: 'account', label: 'Account Information', icon: <User className="h-4 w-4" /> },
  { id: 'billing', label: 'Billing & Payment', icon: <CreditCard className="h-4 w-4" /> },
  { id: 'history', label: 'Order History', icon: <History className="h-4 w-4" /> },
  { id: 'settings', label: 'Account Settings', icon: <Settings className="h-4 w-4" /> },
];

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  const navigate = useNavigate();

  const handleResetPassword = () => {
    // Add password reset logic here
    toast.success('Password reset link sent to your email');
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      toast.success('Successfully signed out');
    } catch (error) {
      console.error('Failed to sign out', error);
      toast.error('Failed to sign out. Please try again.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-8">My Account</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 flex-shrink-0 flex flex-col">
          <nav className="space-y-1 flex-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md ${
                  activeTab === item.id
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
          
          {/* Log Out Button */}
          <button
            onClick={handleSignOut}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 mt-2"
          >
            <LogOut className="h-4 w-4 mr-3" />
            Sign Out
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === 'account' && (
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-medium mb-1">Account Information</h2>
              <p className="text-sm text-gray-500 mb-6">
                Email us at info@example.com to update your email address
              </p>
              
              <div className="space-y-6 max-w-lg">
                <div>
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Address
                  </div>
                  <div className="text-gray-900 font-medium">
                    {user?.email || 'user@example.com'}
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <Lock className="h-4 w-4 mr-2" />
                    Password
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-900 font-mono tracking-wider">•••••••••••</span>
                    <Button 
                      variant="link" 
                      className="text-blue-600 hover:text-blue-800 ml-4 p-0 h-auto"
                      onClick={handleResetPassword}
                    >
                      RESET PASSWORD
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-medium mb-6">Billing & Payment</h2>
              <p className="text-gray-600">Manage your payment methods and billing information.</p>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-medium mb-6">Order History</h2>
              <p className="text-gray-600">View your order history and track shipments.</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-medium mb-6">Account Settings</h2>
              <p className="text-gray-600">Update your account preferences and notification settings.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
