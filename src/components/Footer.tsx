
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 border-t border-border mt-auto">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-warp flex items-center justify-center text-white font-bold text-sm">V</div>
            <p className="text-sm font-semibold">ViralWarp © {new Date().getFullYear()}</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Help</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
