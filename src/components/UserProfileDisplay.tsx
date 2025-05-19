
import React from 'react';
import { Button } from "@/components/ui/button";
import { User } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const UserProfileDisplay: React.FC = () => {
  const { toast } = useToast();

  const handleClick = () => {
    toast({
      title: "Profile",
      description: "User profile functionality has been temporarily disabled.",
    });
  };

  return (
    <Button 
      variant="outline" 
      size="sm"
      className="mr-2 flex items-center" 
      onClick={handleClick}
    >
      <User className="h-4 w-4 mr-2" />
      Guest User
    </Button>
  );
};

export default UserProfileDisplay;
