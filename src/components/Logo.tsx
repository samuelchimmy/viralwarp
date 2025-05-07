
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
          <rect width="200" height="200" rx="35" fill="#9B87F5"/>
          
          {/* Stylized W with flame elements */}
          <path d="M50 50
                C60 90 65 110 80 75
                C95 40 100 100 100 120
                C100 140 105 100 120 75
                C135 40 140 90 150 50" 
                stroke="white" 
                strokeWidth="14" 
                strokeLinecap="round" 
                strokeLinejoin="round"/>
                
          {/* Additional flame details */}
          <path d="M80 75C70 90 75 100 80 115C85 100 90 90 80 75Z" 
                fill="white" 
                opacity="0.8"/>
          <path d="M120 75C110 90 115 100 120 115C125 100 130 90 120 75Z" 
                fill="white" 
                opacity="0.8"/>
                
          {/* Rising flame effect */}
          <circle cx="65" cy="60" r="3" fill="white" opacity="0.6"/>
          <circle cx="75" cy="55" r="2" fill="white" opacity="0.5"/>
          <circle cx="135" cy="60" r="3" fill="white" opacity="0.6"/>
          <circle cx="125" cy="55" r="2" fill="white" opacity="0.5"/>
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
