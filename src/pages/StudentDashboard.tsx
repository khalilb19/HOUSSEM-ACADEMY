
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { StudentSidebar } from "@/components/StudentSidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Calendar, BookOpen, Bell, Clock } from "lucide-react"
import { useNavigate } from "react-router-dom"

const StudentDashboard = () => {
  const navigate = useNavigate()

  const todayClasses = [
    { time: "08:00", subject: "Mathématiques", teacher: "Prof. Sarah", room: "Salle 101" },
    { time: "09:00", subject: "Français", teacher: "Prof. Ahmed", room: "Salle 102" },
    { time: "10:00", subject: "Sciences", teacher: "Prof. Leila", room: "Labo 1" },
    { time: "11:00", subject: "Histoire", teacher: "Prof. Omar", room: "Salle 201" },
  ]

  const recentAnnouncements = [
    { title: "Cours de mathématiques annulé", message: "Le cours de 14h est annulé aujourd'hui", time: "Il y a 15 min", type: "warning" },
    { title: "Nouveau devoir", message: "Devoir de français à rendre vendredi", time: "Il y a 2h", type: "info" },
    { title: "Rappel", message: "Sortie éducative demain - N'oubliez pas l'autorisation", time: "Hier", type: "reminder" },
  ]

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-school-gray-light">
        <StudentSidebar />
        <main className="flex-1">
          <header className="bg-white border-b border-school-yellow/20 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="text-school-black hover:bg-school-yellow/10" />
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-school-black">Mon Espace Élève</h1>
                  <p className="text-school-black/60 text-sm">Ahmed Ben Ali - 7ème A</p>
                </div>
              </div>
              <Badge className="bg-school-yellow text-school-black">
                {new Date().toLocaleDateString('fr-FR')}
              </Badge>
            </div>
          </header>

          <div className="p-4 space-y-6 animate-fade-in">
            {/* Actions rapides */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Button 
                onClick={() => navigate('/student/messages')}
                className="bg-blue-600 text-white hover:bg-blue-700 h-16 flex-col gap-2"
              >
                <MessageSquare className="w-6 h-6" />
                <span className="text-sm">Messages</span>
              </Button>
              <Button 
                onClick={() => navigate('/student/schedule')}
                variant="outline" 
                className="h-16 flex-col gap-2"
              >
                <Calendar className="w-6 h-6" />
                <span className="text-sm">Emploi du temps</span>
              </Button>
              <Button 
                onClick={() => navigate('/student/grades')}
                variant="outline" 
                className="h-16 flex-col gap-2"
              >
                <BookOpen className="w-6 h-6" />
                <span className="text-sm">Mes Notes</span>
              </Button>
            </div>

            {/* Annonces importantes */}
            <Card className="border-red-200 bg-red-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-red-800 text-lg flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Annonces Importantes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentAnnouncements.map((announcement, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-red-200">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        announcement.type === 'warning' ? 'bg-red-500' :
                        announcement.type === 'info' ? 'bg-blue-500' : 'bg-yellow-500'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-school-black text-sm">{announcement.title}</p>
                          <span className="text-school-black/50 text-xs">{announcement.time}</span>
                        </div>
                        <p className="text-school-black/70 text-sm">{announcement.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cours d'aujourd'hui */}
            <Card className="border-school-yellow/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-school-black text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Mes Cours Aujourd'hui
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todayClasses.map((course, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-school-yellow/10">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-12 h-12 bg-school-yellow/20 rounded-lg">
                          <Clock className="w-5 h-5 text-school-black" />
                        </div>
                        <div>
                          <p className="font-medium text-school-black text-sm">{course.subject}</p>
                          <p className="text-school-black/60 text-xs">{course.teacher} - {course.room}</p>
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
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default StudentDashboard
