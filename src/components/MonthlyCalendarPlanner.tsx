
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Plus, Edit, Trash2, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

const MonthlyCalendarPlanner = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const { toast } = useToast()

  const [monthlySchedule, setMonthlySchedule] = useState([
    {
      id: 1,
      title: "Mathématiques",
      teacher: "Prof. Hassan Amri",
      class: "7ème A",
      time: "08:00 - 09:00",
      room: "Salle 101",
      date: new Date(2024, 0, 15),
      recurring: "weekly",
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Français",
      teacher: "Prof. Nadia Slim",
      class: "7ème B",
      time: "09:15 - 10:15",
      room: "Salle 203",
      date: new Date(2024, 0, 16),
      recurring: "weekly",
      color: "bg-green-500"
    }
  ])

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const handleCreateCourse = () => {
    toast({
      title: "Cours planifié",
      description: "Le cours a été ajouté au planning mensuel.",
    })
    setIsDialogOpen(false)
  }

  const handleBulkSchedule = () => {
    toast({
      title: "Planning mensuel généré",
      description: "Tous les cours récurrents ont été planifiés pour le mois.",
    })
  }

  const getCoursesForDate = (date: Date) => {
    return monthlySchedule.filter(course => 
      course.date.toDateString() === date.toDateString()
    )
  }

  const renderCalendarDay = (date: Date) => {
    const courses = getCoursesForDate(date)
    return (
      <div className="w-full h-full min-h-[80px] p-1">
        <div className="text-sm font-medium">{date.getDate()}</div>
        <div className="space-y-1 mt-1">
          {courses.slice(0, 2).map((course, index) => (
            <div
              key={index}
              className={`text-xs p-1 rounded text-white truncate ${course.color}`}
            >
              {course.title}
            </div>
          ))}
          {courses.length > 2 && (
            <div className="text-xs text-school-black/60">
              +{courses.length - 2} autres
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* En-tête du planning mensuel */}
      <Card className="border-school-yellow/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-school-black">Planning Mensuel</CardTitle>
              <CardDescription>
                Gérez le planning pour {currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleBulkSchedule}
                className="border-school-yellow/50 text-school-black hover:bg-school-yellow/10"
              >
                <CalendarIcon className="w-4 h-4 mr-2" />
                Générer le Mois
              </Button>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-school-yellow text-school-black hover:bg-school-yellow-dark">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouveau Cours
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white border-school-yellow/20 max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-school-black">Planifier un Cours</DialogTitle>
                    <DialogDescription>
                      Ajouter un cours au planning mensuel
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="course-title" className="text-school-black">Matière</Label>
                      <Input 
                        id="course-title" 
                        placeholder="Ex: Mathématiques" 
                        className="border-school-yellow/30 focus:border-school-yellow"
                      />
                    </div>
                    <div>
                      <Label htmlFor="course-teacher" className="text-school-black">Professeur</Label>
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
                      <Label htmlFor="course-class" className="text-school-black">Classe</Label>
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
                        <Label htmlFor="course-time" className="text-school-black">Heure</Label>
                        <Input 
                          id="course-time" 
                          type="time" 
                          className="border-school-yellow/30 focus:border-school-yellow"
                        />
                      </div>
                      <div>
                        <Label htmlFor="course-duration" className="text-school-black">Durée (min)</Label>
                        <Input 
                          id="course-duration" 
                          type="number" 
                          placeholder="60" 
                          className="border-school-yellow/30 focus:border-school-yellow"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="course-room" className="text-school-black">Salle</Label>
                      <Input 
                        id="course-room" 
                        placeholder="Ex: Salle 101" 
                        className="border-school-yellow/30 focus:border-school-yellow"
                      />
                    </div>
                    <div>
                      <Label htmlFor="course-recurring" className="text-school-black">Récurrence</Label>
                      <Select>
                        <SelectTrigger className="border-school-yellow/30 focus:border-school-yellow">
                          <SelectValue placeholder="Type de récurrence" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-school-yellow/20">
                          <SelectItem value="once">Une seule fois</SelectItem>
                          <SelectItem value="daily">Quotidien</SelectItem>
                          <SelectItem value="weekly">Hebdomadaire</SelectItem>
                          <SelectItem value="monthly">Mensuel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button 
                        className="flex-1 bg-school-yellow text-school-black hover:bg-school-yellow-dark"
                        onClick={handleCreateCourse}
                      >
                        Planifier
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
          </div>
        </CardHeader>
        <CardContent>
          {/* Navigation mensuelle */}
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outline"
              onClick={goToPreviousMonth}
              className="border-school-yellow/50 text-school-black hover:bg-school-yellow/10"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <h3 className="text-lg font-semibold text-school-black">
              {currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
            </h3>
            <Button
              variant="outline"
              onClick={goToNextMonth}
              className="border-school-yellow/50 text-school-black hover:bg-school-yellow/10"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Calendrier mensuel */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
              <div key={day} className="p-2 text-center font-medium text-school-black/70 border-b border-school-yellow/20">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 35 }, (_, i) => {
              const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i - 6)
              const isCurrentMonth = date.getMonth() === currentMonth.getMonth()
              const courses = getCoursesForDate(date)
              
              return (
                <div
                  key={i}
                  className={`border border-school-yellow/20 min-h-[80px] ${
                    isCurrentMonth ? 'bg-white' : 'bg-school-gray-light/50'
                  } ${courses.length > 0 ? 'ring-2 ring-school-yellow/30' : ''}`}
                >
                  {renderCalendarDay(date)}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MonthlyCalendarPlanner
