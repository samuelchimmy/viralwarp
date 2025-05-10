
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CivicAuthProvider as CivicProvider } from '@civic/auth/react';
import { useToast } from "@/hooks/use-toast";
import { createClient } from '@supabase/supabase-js';
import { ethers } from 'ethers';

// Define the types for the Civic user profile and context
interface CivicUser {
  id: string;
  email?: string;
  walletAddress?: string;
  ethBalance?: string;
  isAuthenticated: boolean;
  farcasterFid?: number;
  farcasterUsername?: string;
}

interface CivicAuthContextType {
  user: CivicUser | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  refreshBalance: () => Promise<void>;
  copyWalletAddress: () => void;
}

const CivicAuthContext = createContext<CivicAuthContextType | null>(null);

// Supabase client setup - get these from environment variables in production
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Provider to handle RPC calls for Ethereum
const ethProvider = new ethers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/demo');

export const CivicAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [user, setUser] = useState<CivicUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize the Civic SDK when the component mounts
  useEffect(() => {
    const checkExistingAuth = async () => {
      try {
        setLoading(true);
        // Check if user is already authenticated with Civic
        // This would typically come from your Civic SDK
        const civicSession = localStorage.getItem('civic_session');
        
        if (civicSession) {
          const parsedSession = JSON.parse(civicSession);
          await fetchOrCreateUserProfile(parsedSession.id);
        }
      } catch (error) {
        console.error('Error checking existing auth:', error);
        toast({
          title: "Authentication Error",
          description: "Failed to restore your session",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    checkExistingAuth();
  }, []);

  // Fetch or create user profile in Supabase
  const fetchOrCreateUserProfile = async (civicId: string) => {
    try {
      // Check if user exists in Supabase
      let { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', civicId)
        .single();

      if (error || !userData) {
        // User doesn't exist, create a new user
        const walletAddress = await generateWallet();
        
        const { data: newUser, error: insertError } = await supabase
          .from('users')
          .insert([
            { 
              id: civicId,
              wallet_address: walletAddress,
              created_at: new Date().toISOString(),
            }
          ])
          .select()
          .single();

        if (insertError) throw insertError;
        userData = newUser;
      }

      // Get ETH balance
      const ethBalance = await fetchEthBalance(userData.wallet_address);

      // Update user state
      setUser({
        id: userData.id,
        email: userData.email,
        walletAddress: userData.wallet_address,
        ethBalance: ethBalance,
        isAuthenticated: true,
        farcasterFid: userData.farcaster_fid,
        farcasterUsername: userData.farcaster_username,
      });

      // Cache the updated balance in Supabase
      await supabase
        .from('users')
        .update({ eth_balance: ethBalance })
        .eq('id', userData.id);

    } catch (error) {
      console.error('Error fetching/creating user profile:', error);
      throw error;
    }
  };

  // Generate a new wallet for the user
  const generateWallet = async (): Promise<string> => {
    try {
      // In a real implementation, you would use Civic's wallet generation
      // For this example, we're generating a random wallet address
      const wallet = ethers.Wallet.createRandom();
      return wallet.address;
    } catch (error) {
      console.error('Error generating wallet:', error);
      throw error;
    }
  };

  // Fetch ETH balance for a wallet address
  const fetchEthBalance = async (address: string): Promise<string> => {
    try {
      const balance = await ethProvider.getBalance(address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error('Error fetching ETH balance:', error);
      return '0.0';
    }
  };

  // Login function
  const login = async () => {
    try {
      setLoading(true);
      // In a real implementation, this would call the Civic Auth login
      // For now, we're simulating a successful login with a mock Civic ID
      const mockCivicId = `civic-${Date.now()}`;
      
      // Store in localStorage for session persistence
      localStorage.setItem('civic_session', JSON.stringify({ id: mockCivicId }));
      
      // Fetch or create user profile
      await fetchOrCreateUserProfile(mockCivicId);
      
      toast({
        title: "Login Successful",
        description: "You are now authenticated with Civic",
      });
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: "Could not authenticate with Civic",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setLoading(true);
      // Clear local storage
      localStorage.removeItem('civic_session');
      
      // Reset user state
      setUser(null);
      
      toast({
        title: "Logout Successful",
        description: "You have been logged out",
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Refresh wallet balance
  const refreshBalance = async () => {
    if (!user || !user.walletAddress) return;
    
    try {
      const newBalance = await fetchEthBalance(user.walletAddress);
      
      // Update local state
      setUser(prev => prev ? ({
        ...prev,
        ethBalance: newBalance
      }) : null);
      
      // Update balance in Supabase
      if (user.id) {
        await supabase
          .from('users')
          .update({ eth_balance: newBalance })
          .eq('id', user.id);
      }
      
      toast({
        title: "Balance Updated",
        description: `Your new balance is ${newBalance} ETH`,
      });
    } catch (error) {
      console.error('Error refreshing balance:', error);
      toast({
        title: "Error",
        description: "Failed to refresh balance",
        variant: "destructive",
      });
    }
  };

  // Copy wallet address to clipboard
  const copyWalletAddress = () => {
    if (!user?.walletAddress) return;
    
    navigator.clipboard.writeText(user.walletAddress);
    toast({
      title: "Copied to clipboard",
      description: "Wallet address copied to clipboard",
    });
  };

  return (
    <CivicAuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      refreshBalance,
      copyWalletAddress
    }}>
      {children}
    </CivicAuthContext.Provider>
  );
};

// Custom hook to use Civic Auth
export const useCivicAuth = () => {
  const context = useContext(CivicAuthContext);
  if (!context) {
    throw new Error("useCivicAuth must be used within a CivicAuthProvider");
  }
  return context;
};

// The wrapper component that integrates with the actual Civic Auth SDK
export const CivicAuthRoot: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <CivicProvider clientId="4681e5db-bc43-4f2e-82e6-03860604b1da">
      <CivicAuthProvider>
        {children}
      </CivicAuthProvider>
    </CivicProvider>
  );
};
