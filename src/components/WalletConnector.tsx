
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { sdk } from '@farcaster/frame-sdk';
import { Wallet } from 'lucide-react';
import { useFarcaster } from './FarcasterProvider';

interface WalletConnectorProps {
  onConnect?: (address: string) => void;
}

const WalletConnector: React.FC<WalletConnectorProps> = ({ onConnect }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated } = useFarcaster();

  useEffect(() => {
    // Check if wallet is already connected when component mounts
    const checkWalletConnection = async () => {
      try {
        if (sdk.wallet && sdk.wallet.ethProvider) {
          const accounts = await sdk.wallet.ethProvider.request({ method: 'eth_accounts' });
          if (accounts && accounts.length > 0) {
            setAddress(accounts[0]);
            onConnect?.(accounts[0]);
          }
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    };
    
    checkWalletConnection();
  }, [onConnect]);

  const connectWallet = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in with Farcaster first",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsConnecting(true);
      
      if (!sdk.wallet || !sdk.wallet.ethProvider) {
        throw new Error("Wallet provider not available");
      }

      const accounts = await sdk.wallet.ethProvider.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (accounts && accounts.length > 0) {
        const connectedAddress = accounts[0];
        setAddress(connectedAddress);
        toast({
          title: "Wallet Connected",
          description: `Connected to ${connectedAddress.substring(0, 6)}...${connectedAddress.substring(connectedAddress.length - 4)}`
        });
        
        if (onConnect) {
          onConnect(connectedAddress);
        }
      }
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      toast({
        title: "Connection Failed",
        description: error?.message || "Could not connect to wallet",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleClick = () => {
    if (address) {
      // If already connected, show address
      toast({
        title: "Wallet Connected",
        description: `Connected to ${address.substring(0, 6)}...${address.substring(address.length - 4)}`
      });
    } else {
      // If not connected, try to connect
      connectWallet();
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className={address ? "border-green-500 text-green-500" : ""}
      disabled={isConnecting || !isAuthenticated}
      onClick={handleClick}
    >
      <Wallet className="mr-2 h-4 w-4" />
      {address 
        ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
        : isConnecting 
          ? "Connecting..." 
          : "Connect Wallet"
      }
    </Button>
  );
};

export default WalletConnector;
