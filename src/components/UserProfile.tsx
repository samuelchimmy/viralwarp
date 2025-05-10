
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RefreshCw, Copy, LogOut } from 'lucide-react';
import { useCivicAuth } from './CivicAuthProvider';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserProfile: React.FC = () => {
  const { user, loading, logout, refreshBalance, copyWalletAddress } = useCivicAuth();

  if (loading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle>Loading Profile...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  if (!user || !user.isAuthenticated) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle>Not Logged In</CardTitle>
          <CardDescription>Please sign in to view your profile</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Format the wallet address for display
  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Generate initials for avatar fallback
  const getInitials = () => {
    if (user.farcasterUsername) {
      return user.farcasterUsername.substring(0, 2).toUpperCase();
    }
    return user.email ? user.email.substring(0, 2).toUpperCase() : 'UN';
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.farcasterFid ? `https://warpcast.com/~/avatar/${user.farcasterFid}` : ''} />
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
        </div>
        <CardTitle>{user.farcasterUsername || 'User Profile'}</CardTitle>
        <CardDescription>
          {user.email && `Email: ${user.email}`}
          {user.farcasterFid && ` • FID: ${user.farcasterFid}`}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Wallet Address</h3>
            <div className="flex items-center justify-between bg-muted p-2 rounded-md">
              <div className="font-mono text-sm truncate">
                {formatAddress(user.walletAddress || '')}
              </div>
              <Button variant="ghost" size="sm" onClick={copyWalletAddress}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">ETH Balance</h3>
              <Button variant="ghost" size="sm" onClick={refreshBalance}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            <div className="bg-muted p-2 rounded-md font-mono text-sm">
              {parseFloat(user.ethBalance || '0').toFixed(6)} ETH
            </div>
          </div>
        </div>
      </CardContent>
      
      <Separator />
      
      <CardFooter className="pt-4">
        <Button variant="destructive" className="w-full" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserProfile;
