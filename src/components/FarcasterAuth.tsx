
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

// Load AuthKit dynamically
try {
  import('@farcaster/auth-kit').then(authKit => {
    AuthKitProvider = authKit.AuthKitProvider;
    SignInButton = authKit.SignInButton;
    useProfile = authKit.useProfile;
    
    // Also try to import styles
    import('@farcaster/auth-kit/styles.css')
      .catch(e => console.warn("Could not load @farcaster/auth-kit styles:", e));
  }).catch(error => {
    console.error("Failed to load @farcaster/auth-kit:", error);
  });
} catch (error) {
  console.error("Failed to load @farcaster/auth-kit:", error);
}

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

  // Initialize Frame SDK on component mount
  useEffect(() => {
    initializeFrameSDK();
  }, []);

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
    console.error("Login failed:", error);
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
  // Initialize Frame SDK when the application mounts
  useEffect(() => {
    initializeFrameSDK();
  }, []);

  return (
    <AuthKitProvider config={authConfig}>
      {children}
    </AuthKitProvider>
  );
};

export { useProfile };
export default FarcasterAuth;
