
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', withText = true }) => {
  // Size mappings
  const sizeMap = {
    sm: {
      containerClass: 'w-8 h-8',
      fontSize: 'text-lg',
      logoSize: 30,
    },
    md: {
      containerClass: 'w-10 h-10',
      fontSize: 'text-xl',
      logoSize: 38,
    },
    lg: {
      containerClass: 'w-12 h-12',
      fontSize: 'text-2xl',
      logoSize: 46,
    },
  };

  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className={`relative ${sizeMap[size].containerClass} flex items-center justify-center overflow-visible`}>
        {/* SVG Logo */}
        <svg 
          width={sizeMap[size].logoSize} 
          height={sizeMap[size].logoSize} 
          viewBox="0 0 200 200" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 ease-out group-hover:scale-110"
        >
          {/* Background with improved gradient */}
          <rect width="200" height="200" rx="35" fill="url(#logo-gradient)"/>
          
          {/* Flame styled "W" */}
          <path d="M40 150
                 C40 110 60 100 75 80
                 C85 65 90 90 100 120
                 C110 90 115 65 125 80
                 C140 100 160 110 160 150
                 L130 150
                 C130 135 125 120 100 160
                 C75 120 70 135 70 150
                 L40 150Z" 
                fill="white"/>
          
          {/* Top flame elements */}
          <path d="M100 120
                 C95 100 85 90 90 70
                 C95 50 115 70 100 120Z" 
                fill="white"/>
                
          {/* Gradient definition */}
          <defs>
            <linearGradient id="logo-gradient" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#9B87F5"/>
              <stop offset="100%" stopColor="#7E69AB"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {withText && (
        <div className="font-bold flex items-center">
          <span className={`${sizeMap[size].fontSize} transition-colors duration-300 ease-out group-hover:text-foreground`}>Viral</span>
          <span className={`${sizeMap[size].fontSize} text-warp-purple bg-clip-text transition-all duration-300 ease-out group-hover:bg-gradient-warp group-hover:text-transparent`}>
            Warp
          </span>
        </div>
      )}
    </Link>
  );
};

export default Logo;
