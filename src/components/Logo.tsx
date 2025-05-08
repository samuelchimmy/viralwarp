
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
        {/* Use the uploaded image directly */}
        <img
          src="/lovable-uploads/2ecec6e0-a221-46f9-82f0-9e133409653e.png"
          alt="ViralWarp Logo"
          className="w-full h-full object-contain transition-transform duration-300 ease-out group-hover:scale-110"
        />
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
