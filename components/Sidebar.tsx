
import React from 'react';
// Correct import from react-router-dom for navigation links
import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/dashboard', icon: 'layout-dashboard', label: 'Dashboard' },
  { path: '/profile', icon: 'user-circle', label: 'Profile & Resume' },
  { path: '/interview-prep', icon: 'mic', label: 'Interview Prep' },
  { path: '/quizzes', icon: 'book-open', label: 'Skill Quizzes' },
  { path: '/recommendations', icon: 'thumbs-up', label: 'Recommendations' },
  { path: '/chatbot', icon: 'message-circle', label: 'AI Coach' },
  { path: '/settings', icon: 'settings', label: 'Settings' },
];

const Sidebar: React.FC = () => {
  return (
    <div className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center">
            <i data-lucide="brain-circuit" className="h-8 w-8 text-primary-500"></i>
            <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white uppercase tracking-tighter">AI Coach</span>
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm font-black uppercase tracking-widest rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-200'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900'
              }`
            }
          >
            <i data-lucide={item.icon} className="h-5 w-5 mr-3"></i>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
