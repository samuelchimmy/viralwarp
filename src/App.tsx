
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CreateRequest from "./pages/CreateRequest";
import BrowseRequests from "./pages/BrowseRequests";
import Dashboard from "./pages/Dashboard";
import RequestDetail from "./pages/RequestDetail";
import NotFound from "./pages/NotFound";
import Docs from "./pages/Docs";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Help from "./pages/Help";
import { FarcasterProvider } from "./components/FarcasterProvider";
import { ThemeProvider } from "./components/ThemeProvider";
import { FarcasterAuthProvider } from "./components/FarcasterAuth";
import { CivicAuthRoot } from "./components/CivicAuthProvider";
import { useEffect } from "react";

// Simple mock for Frame SDK as we're focusing on Civic Auth
const mockSdk = {
  actions: {
    ready: async () => console.log("Mock Frame SDK: ready called"),
  },
  context: {},
  wallet: {
    ethProvider: null
  }
};

// FrameInitializer component to initialize the mock SDK
const FrameInitializer = () => {
  useEffect(() => {
    const initialize = async () => {
      try {
        await mockSdk.actions.ready();
        console.log("Mock Frame SDK initialized successfully");
      } catch (error) {
        console.error("Failed to initialize Mock Frame SDK:", error);
      }
    };
    
    initialize();
  }, []);
  
  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <FarcasterAuthProvider>
      <CivicAuthRoot>
        <ThemeProvider defaultTheme="dark" storageKey="viralwarp-theme">
          <TooltipProvider>
            <FrameInitializer />
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <FarcasterProvider>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/create" element={<CreateRequest />} />
                  <Route path="/browse" element={<BrowseRequests />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/request/:id" element={<RequestDetail />} />
                  <Route path="/docs" element={<Docs />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/profile" element={<Dashboard />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </FarcasterProvider>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </CivicAuthRoot>
    </FarcasterAuthProvider>
  </QueryClientProvider>
);

export default App;
