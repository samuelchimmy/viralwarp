
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getCurrentUser, connectToFarcaster, logoutFromFarcaster } from "@/services/farcasterAuth";
import { toast } from "@/hooks/use-toast";

interface FarcasterUser {
  fid: number;
  username: string;
  displayName: string;
  pfp: string;
  isAdmin: boolean;
}

interface FarcasterContextType {
  user: FarcasterUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: () => Promise<void>;
  logout: () => void;
  isReady: boolean;
}

const FarcasterContext = createContext<FarcasterContextType>({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  login: async () => {},
  logout: () => {},
  isReady: false,
});

export const useFarcaster = () => useContext(FarcasterContext);

export const FarcasterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FarcasterUser | null>(null);
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    // Check if we're in a Farcaster environment
    const isFarcasterEnvironment = typeof window !== "undefined" && !!window.farcaster;
    
    if (!isFarcasterEnvironment) {
      console.warn("Not running in Farcaster client environment");
      setIsReady(true);
      return;
    }

    // Check for existing user on component mount
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    
    // Listen for auth changes
    const handleAuthChange = () => {
      const updatedUser = getCurrentUser();
      setUser(updatedUser);
    };
    
    window.addEventListener("farcaster:auth:change", handleAuthChange);
    
    // Mark provider as ready
    setIsReady(true);
    
    return () => {
      window.removeEventListener("farcaster:auth:change", handleAuthChange);
    };
  }, []);
  
  const login = async () => {
    try {
      const user = await connectToFarcaster();
      setUser(user);
      return user;
    } catch (error) {
      console.error("Login failed:", error);
      toast({
        title: "Login failed",
        description: "Could not connect to Farcaster",
        variant: "destructive"
      });
    }
  };
  
  const logout = () => {
    logoutFromFarcaster();
    setUser(null);
  };
  
  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
    login,
    logout,
    isReady
  };
  
  return (
    <FarcasterContext.Provider value={value}>
      {children}
    </FarcasterContext.Provider>
  );
};

export default FarcasterProvider;
