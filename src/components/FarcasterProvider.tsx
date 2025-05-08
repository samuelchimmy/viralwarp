
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { useToast } from "@/hooks/use-toast";

// We're importing useProfile, but need to handle the case if it's not available yet
let useProfile: () => {
  isAuthenticated: boolean;
  profile?: {
    fid?: number;
    username?: string;
    displayName?: string;
    pfpUrl?: string;
    bio?: string;
    custody?: `0x${string}`;
    verifications?: `0x${string}`[];
  };
};

// Attempt to import from @farcaster/auth-kit, but provide a fallback
try {
  const authKit = require('@farcaster/auth-kit');
  useProfile = authKit.useProfile;
} catch (error) {
  console.error("Failed to load @farcaster/auth-kit:", error);
  // Provide a mock implementation
  useProfile = () => ({
    isAuthenticated: false,
    profile: undefined
  });
}

interface FarcasterUser {
  fid?: number;
  username?: string;
  displayName?: string;
  pfpUrl?: string;
  bio?: string;
  connectedAddress?: `0x${string}`;
  verifications?: `0x${string}`[];
  custody?: `0x${string}`;
}

type FarcasterContextType = {
  user: FarcasterUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  logout: () => void;
  login: () => void;
  isReady: boolean;
};

const FarcasterContext = createContext<FarcasterContextType | undefined>(
  undefined
);

interface FarcasterProviderProps {
  children: ReactNode;
}

const FarcasterProvider: React.FC<FarcasterProviderProps> = ({ children }) => {
  const { isAuthenticated, profile } = useProfile();
  const [isReady, setIsReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  // Map profile from AuthKit to our app's user format
  const user: FarcasterUser | null = isAuthenticated && profile ? {
    fid: profile.fid,
    username: profile.username,
    displayName: profile.displayName,
    pfpUrl: profile.pfpUrl,
    bio: profile.bio,
    custody: profile.custody,
    verifications: profile.verifications
  } : null;

  // Check if user is admin
  useEffect(() => {
    if (user?.fid) {
      // Admin FIDs - add more as needed
      const adminFids = [508]; // Example admin FID
      setIsAdmin(adminFids.includes(user.fid));
    } else {
      setIsAdmin(false);
    }
    setIsReady(true);
  }, [user?.fid]);

  const login = () => {
    // This is a placeholder function that will be triggered by UI
    // The actual authentication is handled by the FarcasterAuth component
    toast({
      title: "Authentication",
      description: "Please complete the authentication process",
    });
  };

  const logout = () => {
    // AuthKit doesn't have a direct logout method, but we can handle UI state
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    // Force page refresh to clear auth state
    window.location.href = "/";
  };

  const value = {
    user,
    isAuthenticated: Boolean(isAuthenticated),
    isAdmin,
    login,
    logout,
    isReady,
  };

  return (
    <FarcasterContext.Provider value={value}>
      {children}
    </FarcasterContext.Provider>
  );
};

const useFarcaster = () => {
  const context = useContext(FarcasterContext);
  if (context === undefined) {
    throw new Error("useFarcaster must be used within a FarcasterProvider");
  }
  return context;
};

export { FarcasterProvider, useFarcaster };
