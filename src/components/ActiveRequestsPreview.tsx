
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Users, Share2, Heart, MessageSquare } from "lucide-react";

// Mock data for active requests
const activeRequests = [
  {
    id: 1,
    type: "follow",
    username: "alice.eth",
    price: "$2.00",
    description: "New to Farcaster! Looking for initial followers.",
    icon: <Users className="h-5 w-5" />
  },
  {
    id: 2,
    type: "recast",
    username: "bob.lens",
    price: "$3.50",
    description: "Please recast my announcement about the new NFT drop!",
    icon: <Share2 className="h-5 w-5" />
  },
  {
    id: 3,
    type: "like",
    username: "carol.fc",
    price: "$1.00",
    description: "Need more likes on my research thread about L2s.",
    icon: <Heart className="h-5 w-5" />
  },
  {
    id: 4,
    type: "comment",
    username: "dave.warp",
    price: "$5.00",
    description: "Looking for thoughtful comments on my latest proposal.",
    icon: <MessageSquare className="h-5 w-5" />
  },
];

const ActiveRequestsPreview: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Active Requests</h2>
          <Button 
            variant="outline"
            onClick={() => navigate("/browse")}
          >
            View All Requests
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeRequests.map((request) => (
            <div key={request.id} className="warp-card p-6 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-warp-purple/10 rounded-full">
                    {request.icon}
                  </div>
                  <span className="font-medium capitalize">{request.type}</span>
                </div>
                <span className="text-warp-purple font-bold">{request.price}</span>
              </div>
              <div className="mb-4 flex-grow">
                <p className="font-semibold mb-1">@{request.username}</p>
                <p className="text-sm text-muted-foreground">{request.description}</p>
              </div>
              <Button 
                className="w-full"
                onClick={() => navigate(`/request/${request.id}`)}
              >
                Fulfill Request
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActiveRequestsPreview;
