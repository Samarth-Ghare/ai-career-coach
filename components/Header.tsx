
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [hasKey, setHasKey] = useState<boolean>(!!process.env.API_KEY);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio && await window.aistudio.hasSelectedApiKey()) {
        setHasKey(true);
      }
    };
    checkKey();
  }, []);

  const handleConnectKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      // Assume success as per instructions to avoid race conditions
      setHasKey(true);
      window.location.reload(); // Reload to re-init services with the new key
    }
  };

  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold hidden sm:block">Welcome, {user?.name}!</h1>
        {!hasKey && (
          <button 
            onClick={handleConnectKey}
            className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg text-amber-700 dark:text-amber-400 text-xs font-black uppercase tracking-widest hover:bg-amber-100 transition-colors animate-pulse"
          >
            <i data-lucide="key" className="w-3 h-3"></i>
            Connect API Key
          </button>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <i data-lucide="bell" className="h-5 w-5 text-gray-600 dark:text-gray-400"></i>
          <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-950"></span>
        </button>
        <div className="relative">
          <button onClick={() => logout()} className="flex items-center space-x-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <img
              className="h-8 w-8 rounded-full object-cover"
              src={`https://i.pravatar.cc/150?u=${user?.email}`}
              alt="User avatar"
            />
            <span className="hidden md:inline text-sm font-medium">{user?.name}</span>
            <i data-lucide="log-out" className="h-4 w-4 text-gray-500"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
