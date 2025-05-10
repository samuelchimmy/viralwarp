
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

// Create placeholder components in case auth-kit fails to load
const AuthKitProviderFallback: React.FC<{children: React.ReactNode; config?: any}> = ({ children }) => <>{children}</>;
const SignInButtonFallback: React.FC<any> = () => <Button>Sign in with Farcaster</Button>;
const useProfileFallback = () => ({ isAuthenticated: false, profile: null });

// Create a safe mock for Frame SDK when not available in the environment
const createFrameSdkMock = () => {
  return {
    actions: {
      ready: async () => console.log("Frame SDK mock: ready called"),
    },
    context: {},
    wallet: {
      ethProvider: null
    }
  };
};

// Use the real SDK if available, otherwise use our mock
let frameSdk;
try {
  frameSdk = (typeof window !== 'undefined' && window.farcaster) ? window.farcaster : createFrameSdkMock();
} catch (error) {
  console.warn("Frame SDK not available, using mock instead:", error);
  frameSdk = createFrameSdkMock();
}

// Initialize Frame SDK when the component mounts
const initializeFrameSDK = async () => {
  try {
    if (frameSdk && frameSdk.actions && frameSdk.actions.ready) {
      await frameSdk.actions.ready();
      console.log("Farcaster Frame SDK initialized successfully");
      return true;
    } else {
      console.warn("Farcaster Frame SDK not fully available");
      return false;
    }
  } catch (error) {
    console.error("Failed to initialize Frame SDK:", error);
    return false;
  }
};

// Static imports for AuthKit components
let AuthKitProvider = AuthKitProviderFallback;
let SignInButton = SignInButtonFallback; 
let useProfile = useProfileFallback;

// Configure AuthKit - but don't load the actual library
// since we're focusing on Civic Auth for now
const authConfig = {
  domain: window.location.host,
  siweUri: `${window.location.origin}/login`,
};

// User profile display component
export const UserProfileDisplay: React.FC = () => {
  const profile = { username: null, pfpUrl: null, displayName: null };
  
  return (
    <div className="flex items-center gap-2">
      <div className="text-sm">
        <p className="font-medium">Farcaster Auth Disabled</p>
        <p className="text-muted-foreground">Using Civic Auth</p>
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

// Provider wrapper component
interface FarcasterAuthProviderProps {
  children: React.ReactNode;
}

export const FarcasterAuthProvider: React.FC<FarcasterAuthProviderProps> = ({ children }) => {
  // Just pass through the children without actually trying to load Farcaster auth
  return <>{children}</>;
};

export { useProfile };
export default FarcasterAuth;
