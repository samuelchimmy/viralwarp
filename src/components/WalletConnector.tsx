
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Wallet } from 'lucide-react';
import { useFarcaster } from './FarcasterProvider';
import { useAccount, useConnect } from 'wagmi';

interface WalletConnectorProps {
  onConnect?: (address: string) => void;
}

const WalletConnector: React.FC<WalletConnectorProps> = ({ onConnect }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated } = useFarcaster();
  
  // Use wagmi hooks for wallet connection
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();

  // Update parent component when connection status changes
  useEffect(() => {
    if (isConnected && address && onConnect) {
      onConnect(address);
    }
  }, [isConnected, address, onConnect]);

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
      
      // Connect using the farcasterFrame connector
      if (connectors.length > 0) {
        const frameConnector = connectors.find(c => c.id === "farcasterFrame" || c.name === "Farcaster");
        
        if (frameConnector) {
          connect({ connector: frameConnector });
        } else {
          console.log("Available connectors:", connectors.map(c => `${c.id} (${c.name})`));
          connect({ connector: connectors[0] });
        }
      } else {
        throw new Error("No connectors available");
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
    if (isConnected && address) {
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
      className={isConnected ? "border-green-500 text-green-500" : ""}
      disabled={isConnecting || !isAuthenticated || isPending}
      onClick={handleClick}
    >
      <Wallet className="mr-2 h-4 w-4" />
      {isConnected && address 
        ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
        : isPending || isConnecting
          ? "Connecting..." 
          : "Connect Wallet"
      }
    </Button>
  );
};

export default WalletConnector;
