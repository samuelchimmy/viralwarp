
import { toast } from "@/hooks/use-toast";

interface FarcasterUser {
  fid: number;
  username: string;
  displayName: string;
  pfp: string;
  isAdmin: boolean;
}

// Initial null state for unauthenticated user
let currentUser: FarcasterUser | null = null;

// Custom event for auth changes
const FARCASTER_AUTH_CHANGE = 'farcaster:auth:change';

export const getCurrentUser = (): FarcasterUser | null => {
  return currentUser;
};

export const isAdmin = (): boolean => {
  return currentUser?.isAdmin || false;
};

export const connectToFarcaster = async (): Promise<FarcasterUser | null> => {
  try {
    // Check if running in Farcaster environment
    if (typeof window === "undefined" || !window.farcaster) {
      toast({
        title: "Not in Farcaster environment",
        description: "This app needs to run within the Farcaster client",
        variant: "destructive",
      });
      return null;
    }

    // Request user login from Farcaster client
    const { success, data, error } = await window.farcaster.loginUser();
    
    if (!success || !data) {
      toast({
        title: "Authentication failed",
        description: error || "Could not authenticate with Farcaster",
        variant: "destructive",
      });
      return null;
    }

    // Create user object
    currentUser = {
      fid: data.fid,
      username: data.username,
      displayName: data.displayName || data.username,
      pfp: data.pfpUrl || "",
      // Admin is @508 (comparing username for demo)
      isAdmin: data.username === "508",
    };

    // Store farcaster auth info in localStorage
    localStorage.setItem("farcaster_user", JSON.stringify(currentUser));
    
    // Dispatch custom event for auth change
    window.dispatchEvent(new CustomEvent(FARCASTER_AUTH_CHANGE));
    
    toast({
      title: "Connected to Farcaster",
      description: `Welcome, ${currentUser.displayName}!`,
    });

    return currentUser;
  } catch (error) {
    console.error("Farcaster auth error:", error);
    toast({
      title: "Connection error",
      description: "Failed to connect to Farcaster",
      variant: "destructive",
    });
    return null;
  }
};

export const logoutFromFarcaster = (): void => {
  currentUser = null;
  localStorage.removeItem("farcaster_user");
  
  // Dispatch custom event for auth change
  window.dispatchEvent(new CustomEvent(FARCASTER_AUTH_CHANGE));
  
  toast({
    title: "Logged out",
    description: "You've been disconnected from Farcaster",
  });
};

// Check for existing session on load
export const initFarcasterAuth = (): void => {
  try {
    const savedUser = localStorage.getItem("farcaster_user");
    if (savedUser) {
      currentUser = JSON.parse(savedUser);
    }
  } catch (error) {
    console.error("Error initializing Farcaster auth:", error);
  }
};

// Initialize auth on module load
initFarcasterAuth();
