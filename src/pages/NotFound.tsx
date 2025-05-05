
import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12">
        <div className="container max-w-3xl">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-warp flex items-center justify-center text-white font-bold text-3xl mb-6">
              404
            </div>
            <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The page at <span className="font-mono bg-muted px-2 py-1 rounded">{location.pathname}</span> doesn't exist.
            </p>
            <Button 
              className="bg-gradient-warp hover:opacity-90"
              onClick={() => navigate("/")}
            >
              Return Home
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
