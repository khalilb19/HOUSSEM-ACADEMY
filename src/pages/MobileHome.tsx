
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, UserCheck, BarChart3, Bell, Clock } from "lucide-react"
import { useNavigate } from "react-router-dom"

const MobileHome = () => {
  const navigate = useNavigate()

  const quickStats = {
    totalStudents: 250,
    presentToday: 235,
    absentToday: 15,
    attendanceRate: 94
  }

  const todayClasses = [
    { time: "08:00", subject: "Mathématiques", class: "7ème A", room: "Salle 101" },
    { time: "09:00", subject: "Français", class: "7ème B", room: "Salle 102" },
    { time: "10:00", subject: "Sciences", class: "8ème A", room: "Labo 1" },
    { time: "11:00", subject: "Histoire", class: "8ème B", room: "Salle 201" },
  ]

  const recentNotifications = [
    { message: "Ahmed Ben Ali absent en cours de mathématiques", time: "Il y a 5 min", type: "absence" },
    { message: "Rappel: Cours de sciences dans 15 minutes", time: "Il y a 10 min", type: "reminder" },
    { message: "Fatima Zohra en retard", time: "Il y a 20 min", type: "late" },
  ]

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-school-gray-light">
        <AppSidebar />
        <main className="flex-1">
          <header className="bg-white border-b border-school-yellow/20 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="text-school-black hover:bg-school-yellow/10" />
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-school-black">Tableau de Bord</h1>
                  <p className="text-school-black/60 text-sm">Houssem Academy</p>
                </div>
              </div>
              <Badge className="bg-school-yellow text-school-black">
                {new Date().toLocaleDateString('fr-FR')}
              </Badge>
            </div>
          </header>

          <div className="p-4 space-y-6 animate-fade-in">
            {/* Statistiques rapides */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Card className="border-school-yellow/20">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-school-black/60">Total Élèves</p>
                      <p className="text-lg font-bold text-school-black">{quickStats.totalStudents}</p>
                    </div>
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-school-yellow/20">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-school-black/60">Présents</p>
                      <p className="text-lg font-bold text-green-600">{quickStats.presentToday}</p>
                    </div>
                    <UserCheck className="w-6 h-6 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-school-yellow/20">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-school-black/60">Absents</p>
                      <p className="text-lg font-bold text-red-600">{quickStats.absentToday}</p>
                    </div>
                    <Bell className="w-6 h-6 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-school-yellow/20">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-school-black/60">Taux</p>
                      <p className="text-lg font-bold text-school-black">{quickStats.attendanceRate}%</p>
                    </div>
                    <BarChart3 className="w-6 h-6 text-school-black" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actions rapides */}
            <Card className="border-school-yellow/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-school-black text-lg">Actions Rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    onClick={() => navigate('/attendance')}
                    className="bg-school-yellow text-school-black hover:bg-school-yellow-dark h-12 text-sm"
                  >
                    <UserCheck className="w-4 h-4 mr-2" />
                    Marquer Présences
                  </Button>
                  <Button 
                    onClick={() => navigate('/calendar')}
                    variant="outline" 
                    className="border-school-yellow text-school-black hover:bg-school-yellow/10 h-12 text-sm"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Voir Calendrier
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Cours du jour */}
            <Card className="border-school-yellow/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-school-black text-lg">Cours d'Aujourd'hui</CardTitle>
                <CardDescription>Planning des cours en cours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todayClasses.map((course, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-school-gray-light rounded-lg border border-school-yellow/10">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-12 h-12 bg-school-yellow/20 rounded-lg">
                          <Clock className="w-5 h-5 text-school-black" />
                        </div>
                        <div>
                          <p className="font-medium text-school-black text-sm">{course.subject}</p>
                          <p className="text-school-black/60 text-xs">{course.class} - {course.room}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {course.time}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notifications récentes */}
            <Card className="border-school-yellow/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-school-black text-lg">Notifications Récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentNotifications.map((notification, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-school-yellow/10">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        notification.type === 'absence' ? 'bg-red-500' :
                        notification.type === 'late' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-school-black text-sm">{notification.message}</p>
                        <p className="text-school-black/50 text-xs">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default MobileHome
