import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/components/auth/AuthProvider";
import { AuthPage } from "@/components/auth/AuthPage";
import { PendingApproval } from "@/components/auth/PendingApproval";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import Users from "./pages/Users";
import Attendance from "./pages/Attendance";
import CalendarPage from "./pages/CalendarPage";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import MessagingPage from "./pages/MessagingPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user, userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  if (userProfile?.status === 'pending') {
    return <PendingApproval />;
  }

  if (userProfile?.status !== 'approved') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Accès refusé</h2>
          <p className="text-muted-foreground">Votre compte n'est pas approuvé.</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/messaging" element={<MessagingPage />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/announcements" element={<AnnouncementsPage />} />
              
              {userProfile?.role === 'admin' && (
                <>
                  <Route path="/users" element={<Users />} />
                </>
              )}
              
              {userProfile?.role === 'teacher' && (
                <>
                  <Route path="/attendance" element={<Attendance />} />
                  <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
                </>
              )}
              
              {userProfile?.role === 'student' && (
                <>
                  <Route path="/student-dashboard" element={<StudentDashboard />} />
                </>
              )}
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
        <Sonner />
      </div>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;