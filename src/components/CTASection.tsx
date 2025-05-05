
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CTASection: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="rounded-xl bg-gradient-warp p-[2px]">
          <div className="bg-background rounded-lg p-8 md:p-12">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                Ready to Boost Your Farcaster Presence?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mb-8">
                Join ViralWarp today and start growing your audience with incentivized engagement. Create your first request in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-warp hover:opacity-90"
                  onClick={() => navigate("/create")}
                >
                  Create Your First Request
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-warp-purple text-warp-purple hover:bg-warp-purple/10"
                  onClick={() => navigate("/browse")}
                >
                  Browse Active Requests
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
