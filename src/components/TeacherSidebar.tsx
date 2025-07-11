
import { Calendar, MessageSquare, Users, BookOpen, Settings, Home, LogOut } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"

const teacherMenuItems = [
  {
    title: "Tableau de bord",
    url: "/teacher",
    icon: Home,
  },
  {
    title: "Messages",
    url: "/teacher/messages",
    icon: MessageSquare,
  },
  {
    title: "Mes Élèves",
    url: "/teacher/students",
    icon: Users,
  },
  {
    title: "Planning",
    url: "/teacher/calendar",
    icon: Calendar,
  },
  {
    title: "Notes & Évaluations",
    url: "/teacher/grades",
    icon: BookOpen,
  },
  {
    title: "Paramètres",
    url: "/teacher/settings",
    icon: Settings,
  },
]

export function TeacherSidebar() {
  const location = useLocation()

  const handleLogout = () => {
    // Logique de déconnexion
    window.location.href = '/'
  }

  return (
    <Sidebar className="border-r border-school-yellow/20">
      <SidebarHeader className="bg-school-black text-school-yellow p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center">
            <img 
              src="/lovable-uploads/3e4bbc9d-9aac-4075-9c18-7bd64ab1fdf5.png" 
              alt="Houssem Academy Logo" 
              className="w-10 h-10 object-contain"
            />
          </div>
          <div>
            <h2 className="font-bold text-lg">Houssem Academy</h2>
            <p className="text-school-yellow/70 text-sm">Espace Professeur</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-school-black/70">Menu Professeur</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {teacherMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={`${
                      location.pathname === item.url 
                        ? 'bg-school-yellow text-school-black' 
                        : 'text-school-black hover:bg-school-yellow/10'
                    } transition-colors duration-200`}
                  >
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 bg-school-gray-light border-t">
        <Button 
          onClick={handleLogout}
          variant="ghost" 
          className="w-full justify-start text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Déconnexion
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
