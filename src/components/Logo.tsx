
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
          className="transition-all duration-500 ease-out group-hover:scale-110"
        >
          {/* Rounded background with gradient */}
          <defs>
            <linearGradient id="purpleGradient" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#9B87F5"/>
              <stop offset="100%" stopColor="#6E59A5"/>
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
          </defs>
          
          {/* Rounded background */}
          <rect width="200" height="200" rx="35" fill="url(#purpleGradient)"/>
          
          {/* Fluid W design */}
          <path 
            d="M50 50C60 90 70 100 80 70C90 40 95 90 100 120C105 150 110 100 120 70C130 40 140 90 150 50" 
            stroke="white" 
            strokeWidth="12" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            filter="url(#glow)"
            className="origin-center transition-all duration-300"
          />
          
          {/* Sparkle effects */}
          <circle cx="50" cy="50" r="4" fill="white" opacity="0.8" className="animate-pulse"/>
          <circle cx="150" cy="50" r="4" fill="white" opacity="0.8" className="animate-pulse"/>
          <circle cx="100" cy="130" r="4" fill="white" opacity="0.8" className="animate-pulse"/>
          
          {/* Abstract flame element */}
          <path 
            d="M160 60C175 85 160 110 160 130C140 110 150 85 130 70C150 75 155 65 160 60Z" 
            fill="white" 
            opacity="0.9"
            className="origin-bottom animate-pulse"
          />
          
          {/* Rising data points (arrow up abstract) */}
          <path 
            d="M30 140L45 120L60 130L75 100L90 110" 
            stroke="white" 
            strokeWidth="5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <circle cx="30" cy="140" r="3" fill="white"/>
          <circle cx="45" cy="120" r="3" fill="white"/>
          <circle cx="60" cy="130" r="3" fill="white"/>
          <circle cx="75" cy="100" r="3" fill="white"/>
          <circle cx="90" cy="110" r="3" fill="white"/>
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
