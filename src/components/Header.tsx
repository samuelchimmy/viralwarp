
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full py-4 border-b border-border">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-warp flex items-center justify-center text-white font-bold text-xl">V</div>
          <h1 className="text-2xl font-bold">
            <span className="gradient-text">Viral</span>
            <span>Warp</span>
          </h1>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <button onClick={() => navigate("/")} className="text-foreground hover:text-warp-purple transition-colors">Home</button>
          <button onClick={() => navigate("/create")} className="text-foreground hover:text-warp-purple transition-colors">Create Request</button>
          <button onClick={() => navigate("/browse")} className="text-foreground hover:text-warp-purple transition-colors">Browse Requests</button>
          <button onClick={() => navigate("/dashboard")} className="text-foreground hover:text-warp-purple transition-colors">Dashboard</button>
        </nav>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            className="font-semibold border-warp-purple text-warp-purple hover:bg-warp-purple/10"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </Button>
          <Button 
            className="bg-gradient-warp hover:opacity-90"
            onClick={() => navigate("/create")}
          >
            Create Request
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
