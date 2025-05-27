
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import DonationSuccess from "./pages/DonationSuccess";
import DonationCancelled from "./pages/DonationCancelled";
import ShareStories from "./pages/ShareStories";
import VisualMemories from "./pages/VisualMemories";
import CommunityLove from "./pages/CommunityLove";
import StoryDetails from "./pages/StoryDetails";
import MemoryDetails from "./pages/MemoryDetails";
import CommunityDetails from "./pages/CommunityDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/share-stories" element={<ShareStories />} />
            <Route path="/story/:id" element={<StoryDetails />} />
            <Route path="/visual-memories" element={<VisualMemories />} />
            <Route path="/memory/:id" element={<MemoryDetails />} />
            <Route path="/community-love" element={<CommunityLove />} />
            <Route path="/community/:id" element={<CommunityDetails />} />
            <Route path="/donation-success" element={<DonationSuccess />} />
            <Route path="/donation-cancelled" element={<DonationCancelled />} />
 
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
