
import React from 'react';
import { Users, Share2, Heart, MessageSquare, DollarSign } from "lucide-react";

const features = [
  {
    title: "Follow Train",
    description: "Request others to follow you for a fee you set. Grow your follower count quickly.",
    icon: <Users className="h-8 w-8 text-warp-purple" />
  },
  {
    title: "Recast Boost",
    description: "Get your casts to reach a wider audience through paid recast requests.",
    icon: <Share2 className="h-8 w-8 text-warp-purple" />
  },
  {
    title: "Like Boost",
    description: "Increase engagement metrics with incentivized likes on your casts.",
    icon: <Heart className="h-8 w-8 text-warp-purple" />
  },
  {
    title: "Comment Engagement",
    description: "Get more comments on your casts by offering rewards to commenters.",
    icon: <MessageSquare className="h-8 w-8 text-warp-purple" />
  },
  {
    title: "Set Your Price",
    description: "You decide how much to pay for each engagement action.",
    icon: <DollarSign className="h-8 w-8 text-warp-purple" />
  }
];

const FeatureSection: React.FC = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">How ViralWarp Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="warp-card p-6">
              <div className="flex flex-col items-start gap-4">
                <div className="p-3 bg-warp-purple/10 rounded-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
