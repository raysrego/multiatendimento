import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  Users,
  BarChart2,
  Bot,
  Settings,
  LogOut,
  Menu,
  X,
  User,
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import StatusSelector from '../chat/StatusSelector';
import { useChatStore } from '../../stores/chatStore';
import clsx from 'clsx';

const DashboardLayout = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { agentStatus, queueCount } = useChatStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { icon: MessageSquare, name: 'Chats', path: '/dashboard', badge: queueCount },
    { icon: Users, name: 'Contacts', path: '/dashboard/contacts' },
    { icon: BarChart2, name: 'Analytics', path: '/dashboard/analytics' },
    { icon: Bot, name: 'Chatbot', path: '/dashboard/chatbot' },
    { icon: Settings, name: 'Settings', path: '/dashboard/settings' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Mobile menu button */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
      >
        {isMobileMenuOpen ? (
          <X size={24} className="text-neutral-700" />
        ) : (
          <Menu size={24} className="text-neutral-700" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={clsx(
          'fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-4 flex items-center space-x-3 border-b">
            <div className="bg-primary-500 p-2 rounded-md">
              <MessageSquare size={24} className="text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-lg text-neutral-800">WhatsApp Admin</h1>
              <p className="text-xs text-neutral-500">Multi-Attendant System</p>
            </div>
          </div>

          {/* User info */}
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center">
                  <User size={20} className="text-neutral-600" />
                </div>
              )}
              <div>
                <p className="font-medium text-neutral-800">{user?.name}</p>
                <p className="text-xs text-neutral-500 capitalize">{user?.role}</p>
              </div>
            </div>
            <div className="mt-3">
              <StatusSelector />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center px-4 py-2 rounded-md transition-colors relative',
                    isActive
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  )
                }
              >
                <item.icon size={20} className="mr-3" />
                <span>{item.name}</span>
                {item.badge && item.badge > 0 && (
                  <span className="absolute right-4 flex items-center justify-center min-w-[1.5rem] h-6 bg-error-500 text-white text-xs font-medium rounded-full px-1.5">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Logout button */}
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-neutral-700 rounded-md hover:bg-neutral-100 transition-colors"
            >
              <LogOut size={20} className="mr-3" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content area */}
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;