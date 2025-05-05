
import React from 'react';

const steps = [
  {
    number: "01",
    title: "Create a Request",
    description: "Choose what type of engagement you want (follows, recasts, likes, comments) and set your price."
  },
  {
    number: "02",
    title: "Fund Your Request",
    description: "Add funds to your request to pay users who fulfill your engagement goals."
  },
  {
    number: "03",
    title: "Users Engage",
    description: "Other Farcaster users see your request and engage with your content to earn rewards."
  },
  {
    number: "04",
    title: "Automatic Verification",
    description: "Our system automatically verifies when users complete the requested actions."
  },
  {
    number: "05",
    title: "Automatic Payment",
    description: "Once verified, payment is automatically sent to users who completed the actions."
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-16">Simple 5-Step Process</h2>
        <div className="flex flex-col gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-16 h-16 rounded-full bg-gradient-warp flex items-center justify-center text-white font-bold text-xl shrink-0">
                {step.number}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block border-l-2 border-dashed border-warp-purple/30 h-12 ml-8 my-4"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
