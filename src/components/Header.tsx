
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import CastButton from '@/components/CastButton';
import Logo from '@/components/Logo';

const Header: React.FC = () => {
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
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button asChild>
                <Link to="/create">Create Request</Link>
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
