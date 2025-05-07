
import React from 'react';
import { ArrowUp, Flame } from 'lucide-react';
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
      iconSize: 14,
    },
    md: {
      containerClass: 'w-10 h-10',
      fontSize: 'text-xl',
      iconSize: 16,
    },
    lg: {
      containerClass: 'w-12 h-12',
      fontSize: 'text-2xl',
      iconSize: 18,
    },
  };

  return (
    <Link to="/" className="flex items-center gap-2">
      <div className={`relative ${sizeMap[size].containerClass} bg-warp-purple rounded-md flex items-center justify-center`}>
        {/* The W letter in white */}
        <span className="text-white font-bold">W</span>
        
        {/* Flame overlay at top right */}
        <div className="absolute -top-2 -right-2 text-warp-pink">
          <Flame size={sizeMap[size].iconSize} />
        </div>
        
        {/* Arrow up overlay at bottom right */}
        <div className="absolute -bottom-1 -right-1 text-warp-indigo">
          <ArrowUp size={sizeMap[size].iconSize} />
        </div>
      </div>
      
      {withText && (
        <span className={`font-bold ${sizeMap[size].fontSize}`}>
          <span>Viral</span>
          <span className="text-warp-purple">Warp</span>
        </span>
      )}
    </Link>
  );
};

export default Logo;
