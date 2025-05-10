
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { useToast } from "@/hooks/use-toast";
import { useAccount } from 'wagmi';

interface FarcasterUser {
  fid?: number;
  username?: string;
  displayName?: string;
  pfpUrl?: string;
  bio?: string;
  connectedAddress?: string;
  verifications?: string[];
  custody?: string;
}

type FarcasterContextType = {
  user: FarcasterUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  logout: () => void;
  login: () => void;
  isReady: boolean;
  walletAddress: string | null;
  setWalletAddress: (address: string | null) => void;
};

const FarcasterContext = createContext<FarcasterContextType | undefined>(
  undefined
);

interface FarcasterProviderProps {
  children: ReactNode;
}

const FarcasterProvider: React.FC<FarcasterProviderProps> = ({ children }) => {
  // Since we're focusing on Civic Auth, we'll set these to false/null
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Get wallet connection from wagmi
  const { address } = useAccount();
  
  // Update wallet address when wagmi address changes
  useEffect(() => {
    if (address) {
      setWalletAddress(address);
    }
  }, [address]);

  // Simple mock user for development
  const user: FarcasterUser | null = null;

  const login = () => {
    toast({
      title: "Authentication",
      description: "Farcaster Auth is disabled. Please use Civic Auth instead.",
    });
  };

  const logout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    setWalletAddress(null);
  };

  const value = {
    user,
    isAuthenticated,
    isAdmin,
    login,
    logout,
    isReady,
    walletAddress,
    setWalletAddress
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
