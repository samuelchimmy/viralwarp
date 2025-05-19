
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import CastButton from '@/components/CastButton';
import Logo from '@/components/Logo';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import AuthSelector from './AuthSelector';

const Header: React.FC = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <header className="bg-background border-b border-border py-4">
      <div className="container flex items-center justify-between">
        <Logo size="md" withText={true} />
        <nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/docs">Docs</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/help">Help</Link>
            </Button>
            <ThemeToggle />
            <CastButton 
              url={window.location.origin} 
              message="Check out ViralWarp - the ultimate growth platform for Farcaster!"
              variant="ghost"
              size="sm"
            />
            
            {/* Simplified navigation without authentication checks */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowAuthModal(true)}>
                Sign In
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/browse">Browse</Link>
              </Button>
            </div>
          </div>
        </nav>
      </div>
      
      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg max-w-lg w-full">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Sign In</h2>
              <button onClick={() => setShowAuthModal(false)}>×</button>
            </div>
            <AuthSelector />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
