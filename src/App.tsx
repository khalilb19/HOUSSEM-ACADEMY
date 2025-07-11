
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginForm, UserRole } from "@/components/auth/LoginForm";
import Index from "./pages/Index";
import Users from "./pages/Users";
import Attendance from "./pages/Attendance";
import CalendarPage from "./pages/CalendarPage";
import MobileHome from "./pages/MobileHome";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import MessagingPage from "./pages/MessagingPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  const handleLogin = (userData: any, role: UserRole) => {
    setUser(userData);
    setUserRole(role);
  };

  const handleLogout = () => {
    setUser(null);
    setUserRole(null);
  };

  // Si l'utilisateur n'est pas connecté, afficher le formulaire de connexion
  if (!user || !userRole) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <LoginForm onLogin={handleLogin} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  // Routes selon le rôle de l'utilisateur
  const renderRoutesByRole = () => {
    switch (userRole) {
      case 'admin':
        return (
          <Routes>
            <Route path="/" element={<MobileHome />} />
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
            <Route path="/" element={<TeacherDashboard />} />
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
            <Route path="/" element={<StudentDashboard />} />
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
            <Route path="/" element={<div className="p-6 text-center">Espace Parent - À implémenter</div>} />
            <Route path="/parent/children" element={<div className="p-6 text-center">Mes Enfants - À implémenter</div>} />
            <Route path="/parent/grades" element={<div className="p-6 text-center">Notes des Enfants - À implémenter</div>} />
            <Route path="/parent/messages" element={<MessagingPage />} />
            <Route path="/parent/announcements" element={<AnnouncementsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        );
      
      default:
        return <Route path="*" element={<NotFound />} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {renderRoutesByRole()}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
