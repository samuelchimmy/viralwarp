
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import FoundingConversation from './FoundingConversation';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [showConversation, setShowConversation] = useState(false);
  
  useEffect(() => {
    // Show the conversation after a short delay
    const timer = setTimeout(() => {
      setShowConversation(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Boost Your <span className="gradient-text">Farcaster</span> Presence
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-10">
              Incentivize engagement, grow your followers, and increase your reach with ViralWarp - the ultimate growth platform for Farcaster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-warp hover:opacity-90 text-lg"
                onClick={() => navigate("/create")}
              >
                Create Request <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-warp-purple text-warp-purple hover:bg-warp-purple/10 text-lg"
                onClick={() => navigate("/browse")}
              >
                Browse Requests
              </Button>
            </div>
          </div>
          
          <div className={`flex-1 mt-8 md:mt-0 transition-opacity duration-1000 ${showConversation ? 'opacity-100' : 'opacity-0'}`}>
            <FoundingConversation />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
