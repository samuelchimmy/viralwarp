
import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import UserProfileDisplay from './UserProfileDisplay';

// Main FarcasterAuth component - disabled for now to focus on Civic Auth
interface FarcasterAuthProps {
  onSuccess?: (data: any) => void;
}

export const FarcasterAuth: React.FC<FarcasterAuthProps> = () => {
  const { toast } = useToast();

  // Show a disabled message
  const handleClick = () => {
    toast({
      title: "Farcaster Auth Disabled",
      description: "We're currently using Civic Auth. Please use that option instead.",
    });
  };

  return (
    <Button onClick={handleClick}>
      Sign in with Farcaster (Disabled)
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
