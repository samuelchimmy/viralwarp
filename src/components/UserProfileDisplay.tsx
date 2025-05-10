
import React, { useState } from 'react';
import { useCivicAuth } from './CivicAuthProvider';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Copy, RefreshCw, QrCode, User, LogOut } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const UserProfileDisplay: React.FC = () => {
  const { user, logout, refreshBalance, copyWalletAddress } = useCivicAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  // If user is not authenticated, return null
  if (!user || !user.isAuthenticated) {
    return null;
  }

  // Format wallet address to display first 6 and last 4 characters
  const formatAddress = (address?: string) => {
    if (!address) return 'No wallet address';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Format Civic ID to display first 6 and last 4 characters
  const formatCivicId = (id: string) => {
    if (id.length <= 10) return id;
    return `${id.substring(0, 6)}...${id.substring(id.length - 4)}`;
  };

  // Handle refresh balance
  const handleRefreshBalance = async () => {
    try {
      setIsRefreshing(true);
      await refreshBalance();
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="inline-block">
      <Button 
        variant="outline" 
        size="sm"
        className="mr-2 flex items-center" 
        onClick={() => {
          toast({
            title: "User Profile",
            description: `Civic ID: ${formatCivicId(user.id)}`
          });
        }}
      >
        <User className="h-4 w-4 mr-2" />
        {user.email ? user.email.split('@')[0] : formatCivicId(user.id)}
      </Button>

      {/* QR Code Button - Optional feature */}
      {user.walletAddress && (
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 mr-2"
          onClick={() => {
            toast({
              title: "QR Code Feature",
              description: "QR code display will be implemented soon!",
            });
          }}
        >
          <QrCode className="h-4 w-4" />
        </Button>
      )}

      {/* Wallet Display with optional actions */}
      {user.walletAddress && (
        <Button 
          variant="outline" 
          size="sm" 
          className="mr-2 flex items-center" 
          onClick={copyWalletAddress}
        >
          <span className="mr-1">
            {formatAddress(user.walletAddress)}
          </span>
          <Copy className="h-3 w-3" />
          {user.ethBalance && (
            <span className="ml-1 text-xs text-muted-foreground">
              {parseFloat(user.ethBalance).toFixed(4)} ETH
            </span>
          )}
        </Button>
      )}

      {/* Refresh Balance Button */}
      {user.walletAddress && (
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 mr-2" 
          disabled={isRefreshing}
          onClick={handleRefreshBalance}
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        </Button>
      )}

      {/* Log Out Button */}
      <Button 
        variant="outline"
        size="icon"
        className="h-8 w-8" 
        onClick={logout}
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default UserProfileDisplay;
