
import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { Theme } from '../types';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
      aria-label="Toggle theme"
    >
      {theme === Theme.Light ? (
        <i data-lucide="moon" className="h-5 w-5"></i>
      ) : (
        <i data-lucide="sun" className="h-5 w-5"></i>
      )}
    </button>
  );
};

export default ThemeToggle;
