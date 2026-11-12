import React from 'react';

interface TikTokIconProps {
  className?: string;
}

export const TikTokIcon: React.FC<TikTokIconProps> = ({ className = 'w-4 h-4' }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.32 0 .63.05.91.15V9.01a6.34 6.34 0 0 0-.91-.07 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.42a8.31 8.31 0 0 0 4.76 1.72V6.69z" />
    </svg>
  );
};
