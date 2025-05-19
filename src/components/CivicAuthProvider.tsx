
import React, { createContext, useContext, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";

// Simplified mock user interface
interface CivicUser {
  isAuthenticated: boolean;
}

// Simplified context type
interface CivicAuthContextType {
  user: CivicUser | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  refreshBalance: () => Promise<void>;
  copyWalletAddress: () => void;
}

// Create the context with default values
const CivicAuthContext = createContext<CivicAuthContextType>({
  user: null,
  loading: false,
  login: async () => {},
  logout: async () => {},
  refreshBalance: async () => {},
  copyWalletAddress: () => {},
});

// Simplified provider component
export const CivicAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { toast } = useToast();

  // Simple mock functions
  const login = async () => {
    toast({
      title: "Authentication Disabled",
      description: "Authentication has been temporarily disabled.",
    });
  };

  const logout = async () => {
    toast({
      title: "Authentication Disabled",
      description: "Authentication has been temporarily disabled.",
    });
  };

  const refreshBalance = async () => {
    toast({
      title: "Functionality Disabled",
      description: "Wallet functionality has been temporarily disabled.",
    });
  };

  const copyWalletAddress = () => {
    toast({
      title: "Functionality Disabled",
      description: "Wallet functionality has been temporarily disabled.",
    });
  };

  // Context value with mock functions
  const value = {
    user: null,
    loading: false,
    login,
    logout,
    refreshBalance,
    copyWalletAddress
  };

  return (
    <CivicAuthContext.Provider value={value}>
      {children}
    </CivicAuthContext.Provider>
  );
};

// Hook to use the Civic Auth context
export const useCivicAuth = () => {
  const context = useContext(CivicAuthContext);
  if (!context) {
    throw new Error("useCivicAuth must be used within a CivicAuthProvider");
  }
  return context;
};

// Simplified root provider component
export const CivicAuthRoot: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <CivicAuthProvider>
      {children}
    </CivicAuthProvider>
  );
};
