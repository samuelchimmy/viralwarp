
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { AuthKitProvider, SignInButton, useProfile } from '@farcaster/auth-kit';
import '@farcaster/auth-kit/styles.css';

// Configure AuthKit
const authConfig = {
  domain: window.location.host,
  siweUri: `${window.location.origin}/login`,
  rpcUrl: 'https://mainnet.optimism.io',
  relay: 'https://relay.farcaster.xyz',
};

// User profile display component
export const UserProfileDisplay: React.FC = () => {
  const { isAuthenticated, profile } = useProfile();
  
  if (!isAuthenticated || !profile) return null;
  
  return (
    <div className="flex items-center gap-2">
      {profile.pfpUrl && (
        <img
          src={profile.pfpUrl}
          alt={profile.username || 'User'}
          className="w-8 h-8 rounded-full object-cover"
        />
      )}
      <div className="text-sm">
        <p className="font-medium">{profile.displayName || profile.username}</p>
        {profile.username && <p className="text-muted-foreground">@{profile.username}</p>}
      </div>
    </div>
  );
};

// Main FarcasterAuth component
interface FarcasterAuthProps {
  onSuccess?: (data: any) => void;
}

export const FarcasterAuth: React.FC<FarcasterAuthProps> = ({ onSuccess }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSuccess = (data: any) => {
    toast({
      title: "Successfully connected",
      description: `Welcome, ${data.username || 'user'}!`,
    });
    
    if (onSuccess) {
      onSuccess(data);
    }
    
    // Redirect to dashboard or home after successful login
    navigate('/dashboard');
  };

  const handleError = (error: any) => {
    toast({
      title: "Connection failed",
      description: error?.message || "Could not connect to Farcaster",
      variant: "destructive",
    });
  };

  return (
    <SignInButton
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );
};

// Provider wrapper component
interface FarcasterAuthProviderProps {
  children: React.ReactNode;
}

export const FarcasterAuthProvider: React.FC<FarcasterAuthProviderProps> = ({ children }) => {
  return (
    <AuthKitProvider config={authConfig}>
      {children}
    </AuthKitProvider>
  );
};

export default FarcasterAuth;
