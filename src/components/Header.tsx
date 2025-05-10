
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import CastButton from '@/components/CastButton';
import Logo from '@/components/Logo';
import { UserProfileDisplay } from '@/components/FarcasterAuth';
import { useFarcaster } from '@/components/FarcasterProvider';
import WalletConnector from '@/components/WalletConnector';
import { useCivicAuth } from '@/components/CivicAuthProvider';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { User, Wallet } from 'lucide-react';
import AuthSelector from './AuthSelector';

const Header: React.FC = () => {
  const { isAuthenticated: isFarcasterAuthenticated, logout: logoutFarcaster, setWalletAddress } = useFarcaster();
  const { user: civicUser, logout: logoutCivic } = useCivicAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleWalletConnect = (address: string) => {
    setWalletAddress(address);
  };

  const isCivicAuthenticated = civicUser?.isAuthenticated || false;
  const isAuthenticated = isFarcasterAuthenticated || isCivicAuthenticated;

  const handleLogout = () => {
    if (isFarcasterAuthenticated) logoutFarcaster();
    if (isCivicAuthenticated) logoutCivic();
  };

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
            
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                {isFarcasterAuthenticated && <UserProfileDisplay />}
                {isFarcasterAuthenticated && <WalletConnector onConnect={handleWalletConnect} />}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">Account</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center">
                        <Wallet className="mr-2 h-4 w-4" />
                        Wallet & Profile
                      </Link>
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button asChild>
                  <Link to="/create">Create Request</Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowAuthModal(true)}>
                  Sign In
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/browse">Browse</Link>
                </Button>
              </div>
            )}
          </div>
        </nav>
      </div>
      
      {/* Auth Modal */}
      {showAuthModal && !isAuthenticated && (
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
