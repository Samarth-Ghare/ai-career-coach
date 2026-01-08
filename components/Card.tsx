
import React, { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  icon?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className, icon }) => {
  return (
    <div className={`bg-white dark:bg-gray-950 rounded-[28px] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden ${className}`}>
      {title && (
        <div className="px-6 pt-6 pb-2 flex items-center">
          {icon && (
            <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mr-4">
              <i data-lucide={icon} className="h-5 w-5 text-primary-600 dark:text-primary-400"></i>
            </div>
          )}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
        </div>
      )}
      <div className="px-6 pb-6 pt-4">
        {children}
      </div>
    </div>
  );
};

export default Card;
