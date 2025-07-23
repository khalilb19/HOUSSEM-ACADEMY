
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/components/auth/AuthProvider";
import { AuthPage } from "@/components/auth/AuthPage";
import { PendingApproval } from "@/components/auth/PendingApproval";
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

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  // Show auth page if not logged in
  if (!user) {
    return <AuthPage />;
  }

  // Show pending approval page if user is not approved
  if (userProfile?.status !== 'approved') {
    return <PendingApproval />;
  }

  // Routes selon le rôle de l'utilisateur approuvé
  const renderRoutesByRole = () => {
    switch (userProfile?.role) {
      case 'admin':
        return (
          <Routes>
            <Route path="/" element={<Navigate to="/admin" replace />} />
            <Route path="/admin" element={<Index />} />
            <Route path="/users" element={<Users />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/messages" element={<MessagingPage />} />
            <Route path="/announcements" element={<AnnouncementsPage />} />
            <Route path="/reports" element={<div className="p-6 text-center">Page Rapports - À implémenter</div>} />
            <Route path="/export" element={<div className="p-6 text-center">Page Export - À implémenter</div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        );
      
      case 'teacher':
        return (
          <Routes>
            <Route path="/" element={<Navigate to="/teacher" replace />} />
            <Route path="/teacher" element={<TeacherDashboard />} />
            <Route path="/teacher/messages" element={<MessagingPage />} />
            <Route path="/teacher/students" element={<div className="p-6 text-center">Mes Élèves - À implémenter</div>} />
            <Route path="/teacher/calendar" element={<CalendarPage />} />
            <Route path="/teacher/grades" element={<div className="p-6 text-center">Notes & Évaluations - À implémenter</div>} />
            <Route path="/teacher/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        );
      
      case 'student':
        return (
          <Routes>
            <Route path="/" element={<Navigate to="/student" replace />} />
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/student/messages" element={<MessagingPage />} />
            <Route path="/student/schedule" element={<div className="p-6 text-center">Emploi du temps - À implémenter</div>} />
            <Route path="/student/grades" element={<div className="p-6 text-center">Mes Notes - À implémenter</div>} />
            <Route path="/student/announcements" element={<AnnouncementsPage />} />
            <Route path="/student/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        );
      
      case 'parent':
        return (
          <Routes>
            <Route path="/" element={<Navigate to="/parent" replace />} />
            <Route path="/parent" element={<div className="p-6 text-center">Espace Parent - À implémenter</div>} />
            <Route path="/parent/children" element={<div className="p-6 text-center">Mes Enfants - À implémenter</div>} />
            <Route path="/parent/grades" element={<div className="p-6 text-center">Notes des Enfants - À implémenter</div>} />
            <Route path="/parent/messages" element={<MessagingPage />} />
            <Route path="/parent/announcements" element={<AnnouncementsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        );
      
      default:
        return (
          <Routes>
            <Route path="*" element={<NotFound />} />
          </Routes>
        );
    }
  };

  return (
    <BrowserRouter>
      {renderRoutesByRole()}
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
