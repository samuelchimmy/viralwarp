
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <FarcasterProvider>
      <ThemeProvider defaultTheme="dark" storageKey="viralwarp-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </FarcasterProvider>
  </QueryClientProvider>
);

export default App;
