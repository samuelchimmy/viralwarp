
import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import UserProfileDisplay from './UserProfileDisplay';

// Simplified FarcasterAuth component - no actual authentication
interface FarcasterAuthProps {
  onSuccess?: (data: any) => void;
}

export const FarcasterAuth: React.FC<FarcasterAuthProps> = () => {
  const { toast } = useToast();

  const handleClick = () => {
    toast({
      title: "Authentication Disabled",
      description: "Authentication has been temporarily disabled.",
    });
  };

  return (
    <Button onClick={handleClick}>
      Sign in with Farcaster
    </Button>
  );
};

// Export UserProfileDisplay for use in Header.tsx
export { UserProfileDisplay };

// Provider wrapper component - simple passthrough
export const FarcasterAuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return <>{children}</>;
};

// Create stub for useProfile
export const useProfile = () => ({ isAuthenticated: false, profile: null });

export default FarcasterAuth;
