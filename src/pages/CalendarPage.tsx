
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Clock, MapPin, Users, Edit, Trash2 } from "lucide-react"
import { useState } from "react"

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const courses = [
    {
      id: 1,
      title: "Mathématiques",
      teacher: "Prof. Hassan Amri",
      class: "7ème A",
      time: "08:00 - 09:00",
      room: "Salle 101",
      date: new Date(),
      students: 25,
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Français",
      teacher: "Prof. Nadia Slim",
      class: "7ème B",
      time: "09:15 - 10:15",
      room: "Salle 203",
      date: new Date(),
      students: 23,
      color: "bg-green-500"
    },
    {
      id: 3,
      title: "Sciences",
      teacher: "Prof. Karim Jeddi",
      class: "8ème A",
      time: "10:30 - 11:30",
      room: "Lab Sciences",
      date: new Date(),
      students: 20,
      color: "bg-purple-500"
    },
  ]

  const upcomingCourses = [
    {
      id: 4,
      title: "Histoire",
      teacher: "Prof. Leila Mansouri",
      class: "7ème A",
      time: "14:00 - 15:00",
      room: "Salle 105",
      date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Demain
      students: 25,
      color: "bg-orange-500"
    },
    {
      id: 5,
      title: "Arabe",
      teacher: "Prof. Ahmed Tounsi",
      class: "8ème B",
      time: "15:15 - 16:15",
      room: "Salle 302",
      date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Demain
      students: 22,
      color: "bg-red-500"
    },
  ]

  const todaysCourses = courses.filter(course => 
    course.date.toDateString() === new Date().toDateString()
  )

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
                  <h1 className="text-2xl font-bold text-school-black">Calendrier des Cours</h1>
                  <p className="text-school-black/60">Planning et organisation des cours</p>
                </div>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-school-yellow text-school-black hover:bg-school-yellow-dark">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouveau Cours
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white border-school-yellow/20 max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-school-black">Créer un Nouveau Cours</DialogTitle>
                    <DialogDescription>
                      Ajouter un cours au planning
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title" className="text-school-black">Matière</Label>
                      <Input 
                        id="title" 
                        placeholder="Ex: Mathématiques" 
                        className="border-school-yellow/30 focus:border-school-yellow"
                      />
                    </div>
                    <div>
                      <Label htmlFor="teacher" className="text-school-black">Professeur</Label>
                      <Select>
                        <SelectTrigger className="border-school-yellow/30 focus:border-school-yellow">
                          <SelectValue placeholder="Sélectionner un professeur" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-school-yellow/20">
                          <SelectItem value="hassan">Prof. Hassan Amri</SelectItem>
                          <SelectItem value="nadia">Prof. Nadia Slim</SelectItem>
                          <SelectItem value="karim">Prof. Karim Jeddi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="class" className="text-school-black">Classe</Label>
                      <Select>
                        <SelectTrigger className="border-school-yellow/30 focus:border-school-yellow">
                          <SelectValue placeholder="Sélectionner une classe" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-school-yellow/20">
                          <SelectItem value="7a">7ème A</SelectItem>
                          <SelectItem value="7b">7ème B</SelectItem>
                          <SelectItem value="8a">8ème A</SelectItem>
                          <SelectItem value="8b">8ème B</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="time" className="text-school-black">Heure</Label>
                        <Input 
                          id="time" 
                          type="time" 
                          className="border-school-yellow/30 focus:border-school-yellow"
                        />
                      </div>
                      <div>
                        <Label htmlFor="duration" className="text-school-black">Durée (min)</Label>
                        <Input 
                          id="duration" 
                          type="number" 
                          placeholder="60" 
                          className="border-school-yellow/30 focus:border-school-yellow"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="room" className="text-school-black">Salle</Label>
                      <Input 
                        id="room" 
                        placeholder="Ex: Salle 101" 
                        className="border-school-yellow/30 focus:border-school-yellow"
                      />
                    </div>
                    <div>
                      <Label htmlFor="notes" className="text-school-black">Notes (optionnel)</Label>
                      <Textarea 
                        id="notes" 
                        placeholder="Notes supplémentaires..."
                        className="border-school-yellow/30 focus:border-school-yellow"
                      />
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button 
                        className="flex-1 bg-school-yellow text-school-black hover:bg-school-yellow-dark"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Créer le Cours
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-school-yellow/50 text-school-black hover:bg-school-yellow/10"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Annuler
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </header>

          <div className="p-6 space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Calendrier */}
              <Card className="lg:col-span-1 border-school-yellow/20">
                <CardHeader>
                  <CardTitle className="text-school-black">Calendrier</CardTitle>
                  <CardDescription>Sélectionner une date</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border border-school-yellow/20"
                  />
                  <div className="mt-4 space-y-2">
                    <h4 className="font-medium text-school-black">Légende</h4>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span className="text-school-black/70">Mathématiques</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <span className="text-school-black/70">Français</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 bg-purple-500 rounded"></div>
                      <span className="text-school-black/70">Sciences</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cours d'aujourd'hui */}
              <Card className="lg:col-span-2 border-school-yellow/20">
                <CardHeader>
                  <CardTitle className="text-school-black">Cours d'Aujourd'hui</CardTitle>
                  <CardDescription>
                    {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todaysCourses.map((course) => (
                      <div key={course.id} className="p-4 border border-school-yellow/20 rounded-lg hover:bg-school-yellow/5 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className={`w-1 h-16 ${course.color} rounded`}></div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-school-black">{course.title}</h3>
                                <Badge variant="outline" className="border-blue-300 text-blue-700">
                                  {course.class}
                                </Badge>
                              </div>
                              <div className="space-y-1 text-sm text-school-black/70">
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4" />
                                  <span>{course.time}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4" />
                                  <span>{course.room}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Users className="w-4 h-4" />
                                  <span>{course.students} élèves</span>
                                </div>
                              </div>
                              <p className="text-sm text-school-black/60 mt-2">{course.teacher}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="hover:bg-school-yellow/10">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="hover:bg-red-50 hover:text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Cours à venir */}
            <Card className="border-school-yellow/20">
              <CardHeader>
                <CardTitle className="text-school-black">Prochains Cours</CardTitle>
                <CardDescription>Planning des jours suivants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {upcomingCourses.map((course) => (
                    <div key={course.id} className="p-4 border border-school-yellow/20 rounded-lg hover:bg-school-yellow/5 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className={`w-1 h-12 ${course.color} rounded`}></div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-school-black">{course.title}</h4>
                            <Badge variant="outline" className="border-blue-300 text-blue-700 text-xs">
                              {course.class}
                            </Badge>
                          </div>
                          <div className="text-sm text-school-black/70 space-y-1">
                            <div className="flex items-center gap-2">
                              <Clock className="w-3 h-3" />
                              <span>{course.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3 h-3" />
                              <span>{course.room}</span>
                            </div>
                          </div>
                          <p className="text-xs text-school-black/60 mt-1">{course.teacher}</p>
                        </div>
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

export default CalendarPage
