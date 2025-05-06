import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { useToast } from "@/hooks/use-toast";

interface FarcasterUser {
  fid: number;
  username: string;
  displayName?: string;
  pfpUrl?: string;
  bio?: string;
  connectedAddress?: `0x${string}`;
}

type FarcasterContextType = {
  user: FarcasterUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: () => Promise<FarcasterUser | void>; // Modified to accept FarcasterUser or void
  logout: () => void;
  isReady: boolean;
};

const FarcasterContext = createContext<FarcasterContextType | undefined>(
  undefined
);

interface FarcasterProviderProps {
  children: ReactNode;
}

const FarcasterProvider: React.FC<FarcasterProviderProps> = ({ children }) => {
  const [user, setUser] = useState<FarcasterUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate checking localStorage or cookies for existing auth
    const storedUser = localStorage.getItem("farcasterUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as FarcasterUser;
        setUser(parsedUser);
        setIsAuthenticated(true);
        setIsAdmin(parsedUser.fid === 508); // Example admin check
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("farcasterUser"); // Clear invalid data
      }
    }
    setIsReady(true); // Mark provider as ready after attempting to restore session
  }, []);

  const login = async (): Promise<FarcasterUser | void> => {
    try {
      if (!window.farcaster) {
        throw new Error("Farcaster client not available");
      }

      const authResponse = await window.farcaster.loginUser();

      if (authResponse.success && authResponse.data) {
        const { fid, username, displayName, pfpUrl } = authResponse.data;

        const farcasterUser: FarcasterUser = {
          fid,
          username,
          displayName,
          pfpUrl,
        };

        setUser(farcasterUser);
        setIsAuthenticated(true);
        setIsAdmin(farcasterUser.fid === 508); // Example admin check
        localStorage.setItem("farcasterUser", JSON.stringify(farcasterUser));

        toast({
          title: "Login Successful",
          description: `Welcome, ${username}!`,
        });

        return farcasterUser;
      } else {
        throw new Error(authResponse.error || "Login failed");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast({
        title: "Login Failed",
        description: "Could not connect to Farcaster",
        variant: "destructive",
      });
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem("farcasterUser");

    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const value = {
    user,
    isAuthenticated,
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
