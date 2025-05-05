
import React from 'react';
import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';

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
            <p className="text-sm">
              Built with ❤️ By <a href="https://jadefolio.lovable.app/" target="_blank" rel="noopener noreferrer" className="text-warp-purple hover:underline">JadeOfWallstreet</a>
            </p>
            <a href="https://github.com/jadeofwallstreet/viralwarp" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
              <Github size={18} />
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Help</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
