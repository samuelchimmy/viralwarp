
import React, { createContext, useContext, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

type FarcasterContextType = {
  isAuthenticated: boolean;
  isAdmin: boolean;
  logout: () => void;
  login: () => void;
  isReady: boolean;
  walletAddress: string | null;
  setWalletAddress: (address: string | null) => void;
};

const FarcasterContext = createContext<FarcasterContextType>({
  isAuthenticated: false,
  isAdmin: false,
  logout: () => {},
  login: () => {},
  isReady: true,
  walletAddress: null,
  setWalletAddress: () => {},
});

interface FarcasterProviderProps {
  children: ReactNode;
}

const FarcasterProvider: React.FC<FarcasterProviderProps> = ({ children }) => {
  const { toast } = useToast();
  
  // Simplified mock functions
  const login = () => {
    toast({
      title: "Authentication",
      description: "Authentication has been temporarily disabled.",
    });
  };

  const logout = () => {
    toast({
      title: "Authentication",
      description: "Authentication has been temporarily disabled.",
    });
  };

  const value = {
    isAuthenticated: false,
    isAdmin: false,
    login,
    logout,
    isReady: true,
    walletAddress: null,
    setWalletAddress: () => {}
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
