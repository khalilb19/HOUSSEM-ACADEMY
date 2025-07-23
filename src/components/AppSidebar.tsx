
import { Calendar, Users, UserCheck, BarChart3, Settings, FileText, Home, LogOut } from "lucide-react"
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
import { Button } from "@/components/ui/button"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "@/components/auth/AuthProvider"

const menuItems = [
  {
    title: "Tableau de bord",
    url: "/",
    icon: Home,
  },
  {
    title: "Gestion des utilisateurs",
    url: "/users",
    icon: Users,
  },
  {
    title: "Présences",
    url: "/attendance",
    icon: UserCheck,
  },
  {
    title: "Calendrier",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Rapports",
    url: "/reports",
    icon: BarChart3,
  },
  {
    title: "Export données",
    url: "/export",
    icon: FileText,
  },
  {
    title: "Paramètres",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const location = useLocation()
  const { signOut, userProfile } = useAuth()

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
            <p className="text-school-yellow/70 text-sm">Administration</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-school-black/70">Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
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
      
      <SidebarFooter className="p-4 bg-school-gray-light border-t space-y-3">
        <div className="space-y-2">
          <div className="text-sm text-school-black/70">
            <p className="font-medium">{userProfile?.first_name} {userProfile?.last_name}</p>
            <p className="text-xs text-school-black/50">{userProfile?.email}</p>
          </div>
          <Button 
            onClick={signOut}
            variant="outline" 
            size="sm" 
            className="w-full border-red-300 text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Se déconnecter
          </Button>
        </div>
        <div className="text-center text-xs text-school-black/40">
          <p>© 2024 Houssem Academy v1.0</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
