
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getCurrentUser, connectToFarcaster, logoutFromFarcaster } from "@/services/farcasterAuth";

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
}

const FarcasterContext = createContext<FarcasterContextType>({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  login: async () => {},
  logout: () => {},
});

export const useFarcaster = () => useContext(FarcasterContext);

export const FarcasterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FarcasterUser | null>(null);
  
  useEffect(() => {
    // Check for existing user on component mount
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    
    // Check if we're in Farcaster environment and add listener for auth changes
    if (typeof window !== "undefined" && window.farcaster) {
      const handleAuthChange = () => {
        const updatedUser = getCurrentUser();
        setUser(updatedUser);
      };
      
      // Listen for auth changes
      window.addEventListener("farcaster:user:update", handleAuthChange);
      
      return () => {
        window.removeEventListener("farcaster:user:update", handleAuthChange);
      };
    }
  }, []);
  
  const login = async () => {
    const user = await connectToFarcaster();
    setUser(user);
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
  };
  
  return (
    <FarcasterContext.Provider value={value}>
      {children}
    </FarcasterContext.Provider>
  );
};

export default FarcasterProvider;
