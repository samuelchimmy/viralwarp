
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CastButtonProps {
  url: string;
  message?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

const CastButton: React.FC<CastButtonProps> = ({
  url,
  message = "A new task has started on ViralWarp",
  variant = 'outline',
  size = 'sm',
  className = '',
}) => {
  const { toast } = useToast();

  const handleCast = async () => {
    try {
      // Check if Farcaster is available in the window object
      if (!window.farcaster) {
        toast({
          title: "Farcaster not available",
          description: "Please use a Farcaster client or install the Warpcast browser extension.",
          variant: "destructive",
        });
        return;
      }

      // Prepare the cast with URL and message
      const fullMessage = `${message}\n\n${url}`;
      
      // Open the cast composer using the Farcaster client
      const result = await window.farcaster.postCast({
        text: fullMessage,
      });
      
      if (result.success) {
        toast({
          title: "Cast created",
          description: "Your message has been shared to Farcaster!",
        });
      } else {
        toast({
          title: "Failed to cast",
          description: result.error || "Something went wrong while sharing to Farcaster.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error casting to Farcaster:", error);
      toast({
        title: "Error",
        description: "Failed to share to Farcaster. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button 
      variant={variant} 
      size={size} 
      className={className}
      onClick={handleCast}
    >
      <Share2 className="mr-2 h-4 w-4" />
      Cast
    </Button>
  );
};

export default CastButton;
