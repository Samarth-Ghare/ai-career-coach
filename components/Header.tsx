import React from 'react';
import { useAuth } from '../hooks/useAuth';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <div>
        <h1 className="text-lg font-semibold">Welcome, {user?.name}!</h1>
      </div>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <i data-lucide="bell" className="h-5 w-5 text-gray-600 dark:text-gray-400"></i>
          <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-950"></span>
        </button>
        <div className="relative">
          {/* Fix: Wrapped logout in an anonymous function to avoid passing the MouseEvent to the logout function, which expects an optional Partial<User> */}
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