
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Users from "./pages/Users";
import Attendance from "./pages/Attendance";
import CalendarPage from "./pages/CalendarPage";
import MobileHome from "./pages/MobileHome";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MobileHome />} />
          <Route path="/admin" element={<Index />} />
          <Route path="/users" element={<Users />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/calendar" element={<CalendarPage />} />
          {/* Placeholders for other routes */}
          <Route path="/reports" element={<div className="p-6 text-center">Page Rapports - À implémenter</div>} />
          <Route path="/export" element={<div className="p-6 text-center">Page Export - À implémenter</div>} />
          <Route path="/settings" element={<div className="p-6 text-center">Page Paramètres - À implémenter</div>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
