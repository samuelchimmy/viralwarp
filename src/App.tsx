
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
import { CivicAuthRoot } from "./components/CivicAuthProvider";
import { useState, useEffect } from "react";

// ErrorBoundary component to catch rendering errors
const ErrorFallback = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
      <p className="mb-4">There was an error loading the application.</p>
      <button 
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Refresh Page
      </button>
    </div>
  );
};

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const [hasError, setHasError] = useState(false);

  // Error handler for the entire app
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error("Global error caught:", event.error);
      setHasError(true);
      // Prevent the white screen by showing our error UI
      event.preventDefault();
    };

    window.addEventListener("error", handleError);
    
    return () => {
      window.removeEventListener("error", handleError);
    };
  }, []);

  if (hasError) {
    return <ErrorFallback />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <CivicAuthRoot>
        <ThemeProvider defaultTheme="dark" storageKey="viralwarp-theme">
          <TooltipProvider>
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
    </QueryClientProvider>
  );
};

export default App;
