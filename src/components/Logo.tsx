
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
          {/* Purple background */}
          <rect width="200" height="200" rx="35" fill="#5D2E8C"/>
          
          {/* White "V" shape */}
          <path d="M100 140 
                 L50 50 
                 L65 50 
                 L100 110 
                 L135 50 
                 L150 50 
                 L100 140Z" 
                fill="white" 
                filter="drop-shadow(0px 2px 3px rgba(0,0,0,0.2))"/>
          
          {/* Left flame element */}
          <path d="M82 120
                 C72 100 62 105 67 85
                 C72 65 62 80 57 70
                 C52 95 62 105 77 125
                 C79 128 84 130 82 120Z" 
                fill="url(#flame-gradient)"/>
          
          {/* Right flame element */}
          <path d="M118 120
                 C128 100 138 105 133 85
                 C128 65 138 80 143 70
                 C148 95 138 105 123 125
                 C121 128 116 130 118 120Z" 
                fill="url(#flame-gradient)"/>
          
          {/* Center flame element */}
          <path d="M100 100
                 C95 80 105 70 100 50
                 C95 70 90 65 95 85
                 C100 95 105 90 100 100Z" 
                fill="url(#flame-gradient)"/>
          
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="flame-gradient" x1="100" y1="50" x2="100" y2="130" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFA500"/>
              <stop offset="100%" stopColor="#FF4500"/>
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
