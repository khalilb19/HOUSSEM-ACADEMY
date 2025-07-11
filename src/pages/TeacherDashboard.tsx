
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { TeacherSidebar } from "@/components/TeacherSidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Users, Calendar, BookOpen, Bell } from "lucide-react"
import { useNavigate } from "react-router-dom"

const TeacherDashboard = () => {
  const navigate = useNavigate()

  const todayClasses = [
    { time: "08:00", subject: "Mathématiques", class: "7ème A", room: "Salle 101" },
    { time: "10:00", subject: "Mathématiques", class: "8ème B", room: "Salle 102" },
    { time: "14:00", subject: "Mathématiques", class: "7ème C", room: "Salle 101" },
  ]

  const recentMessages = [
    { student: "Ahmed Ben Ali", message: "Question sur l'exercice 5", time: "Il y a 10 min" },
    { student: "Fatima Zohra", message: "Demande de rattrapage", time: "Il y a 30 min" },
    { student: "Mohamed Salah", message: "Absent demain", time: "Il y a 1h" },
  ]

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-school-gray-light">
        <TeacherSidebar />
        <main className="flex-1">
          <header className="bg-white border-b border-school-yellow/20 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="text-school-black hover:bg-school-yellow/10" />
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-school-black">Espace Professeur</h1>
                  <p className="text-school-black/60 text-sm">Prof. Sarah Mansouri</p>
                </div>
              </div>
              <Badge className="bg-school-yellow text-school-black">
                {new Date().toLocaleDateString('fr-FR')}
              </Badge>
            </div>
          </header>

          <div className="p-4 space-y-6 animate-fade-in">
            {/* Actions rapides */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button 
                onClick={() => navigate('/teacher/messages')}
                className="bg-blue-600 text-white hover:bg-blue-700 h-16 flex-col gap-2"
              >
                <MessageSquare className="w-6 h-6" />
                <span className="text-sm">Messages</span>
              </Button>
              <Button 
                onClick={() => navigate('/teacher/students')}
                variant="outline" 
                className="h-16 flex-col gap-2"
              >
                <Users className="w-6 h-6" />
                <span className="text-sm">Mes Élèves</span>
              </Button>
              <Button 
                onClick={() => navigate('/teacher/calendar')}
                variant="outline" 
                className="h-16 flex-col gap-2"
              >
                <Calendar className="w-6 h-6" />
                <span className="text-sm">Planning</span>
              </Button>
              <Button 
                onClick={() => navigate('/teacher/grades')}
                variant="outline" 
                className="h-16 flex-col gap-2"
              >
                <BookOpen className="w-6 h-6" />
                <span className="text-sm">Notes</span>
              </Button>
            </div>

            {/* Cours du jour */}
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
                          <BookOpen className="w-5 h-5 text-school-black" />
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

            {/* Messages récents */}
            <Card className="border-school-yellow/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-school-black text-lg flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Messages Récents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentMessages.map((msg, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-school-yellow/10 hover:bg-school-yellow/5 cursor-pointer">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-school-black text-sm">{msg.student}</p>
                          <span className="text-school-black/50 text-xs">{msg.time}</span>
                        </div>
                        <p className="text-school-black/70 text-sm">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  onClick={() => navigate('/teacher/messages')}
                  variant="outline" 
                  className="w-full mt-3"
                >
                  Voir tous les messages
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default TeacherDashboard
