
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarDays, Download, Filter, Check, X, Clock } from "lucide-react"
import { useState } from "react"

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedCourse, setSelectedCourse] = useState("all")

  const attendanceData = [
    { 
      id: 1, 
      student: "Ahmed Ben Ali", 
      class: "7ème A", 
      course: "Mathématiques", 
      time: "08:00", 
      status: "present",
      teacher: "Prof. Hassan Amri"
    },
    { 
      id: 2, 
      student: "Fatima Zohra", 
      class: "7ème B", 
      course: "Français", 
      time: "09:00", 
      status: "absent",
      teacher: "Prof. Nadia Slim"
    },
    { 
      id: 3, 
      student: "Youssef Gharbi", 
      class: "8ème A", 
      course: "Sciences", 
      time: "10:00", 
      status: "late",
      teacher: "Prof. Karim Jeddi"
    },
    { 
      id: 4, 
      student: "Salma Triki", 
      class: "7ème A", 
      course: "Mathématiques", 
      time: "08:00", 
      status: "present",
      teacher: "Prof. Hassan Amri"
    },
  ]

  const classes = ["7ème A", "7ème B", "8ème A", "8ème B"]
  const courses = ["Mathématiques", "Français", "Sciences", "Histoire", "Arabe"]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-100 text-green-800"><Check className="w-3 h-3 mr-1" />Présent</Badge>
      case "absent":
        return <Badge className="bg-red-100 text-red-800"><X className="w-3 h-3 mr-1" />Absent</Badge>
      case "late":
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Retard</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTodayStats = () => {
    const total = attendanceData.length
    const present = attendanceData.filter(a => a.status === "present").length
    const absent = attendanceData.filter(a => a.status === "absent").length
    const late = attendanceData.filter(a => a.status === "late").length
    const rate = Math.round((present / total) * 100)
    
    return { total, present, absent, late, rate }
  }

  const stats = getTodayStats()

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
                  <h1 className="text-2xl font-bold text-school-black">Gestion des Présences</h1>
                  <p className="text-school-black/60">Suivi et marking des présences élèves</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="border-school-yellow text-school-black hover:bg-school-yellow/10">
                      <CalendarDays className="w-4 h-4 mr-2" />
                      {selectedDate?.toLocaleDateString('fr-FR')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white border-school-yellow/20">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md"
                    />
                  </PopoverContent>
                </Popover>
                <Button className="bg-school-yellow text-school-black hover:bg-school-yellow-dark">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </header>

          <div className="p-6 space-y-6 animate-fade-in">
            {/* Statistiques du jour */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-school-yellow/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-school-black/60">Total Élèves</p>
                      <p className="text-2xl font-bold text-school-black">{stats.total}</p>
                    </div>
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Check className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-school-yellow/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-school-black/60">Présents</p>
                      <p className="text-2xl font-bold text-green-600">{stats.present}</p>
                    </div>
                    <div className="p-2 bg-green-50 rounded-lg">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-school-yellow/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-school-black/60">Absents</p>
                      <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
                    </div>
                    <div className="p-2 bg-red-50 rounded-lg">
                      <X className="w-5 h-5 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-school-yellow/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-school-black/60">Taux Présence</p>
                      <p className="text-2xl font-bold text-school-black">{stats.rate}%</p>
                    </div>
                    <div className="p-2 bg-school-yellow/20 rounded-lg">
                      <CalendarDays className="w-5 h-5 text-school-black" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filtres */}
            <Card className="border-school-yellow/20">
              <CardHeader>
                <CardTitle className="text-school-black">Filtres</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-sm font-medium text-school-black">Classe</label>
                    <Select value={selectedClass} onValueChange={setSelectedClass}>
                      <SelectTrigger className="border-school-yellow/30 focus:border-school-yellow">
                        <SelectValue placeholder="Sélectionner une classe" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-school-yellow/20">
                        <SelectItem value="all">Toutes les classes</SelectItem>
                        {classes.map((cls) => (
                          <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex-1">
                    <label className="text-sm font-medium text-school-black">Cours</label>
                    <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                      <SelectTrigger className="border-school-yellow/30 focus:border-school-yellow">
                        <SelectValue placeholder="Sélectionner un cours" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-school-yellow/20">
                        <SelectItem value="all">Tous les cours</SelectItem>
                        {courses.map((course) => (
                          <SelectItem key={course} value={course}>{course}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end">
                    <Button variant="outline" className="border-school-yellow text-school-black hover:bg-school-yellow/10">
                      <Filter className="w-4 h-4 mr-2" />
                      Appliquer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Liste des présences */}
            <Card className="border-school-yellow/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-school-black">Présences du Jour</CardTitle>
                    <CardDescription>
                      {selectedDate?.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </CardDescription>
                  </div>
                  <Button className="bg-school-yellow text-school-black hover:bg-school-yellow-dark">
                    Marquer Présences
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-school-black">Élève</TableHead>
                      <TableHead className="text-school-black">Classe</TableHead>
                      <TableHead className="text-school-black">Cours</TableHead>
                      <TableHead className="text-school-black">Professeur</TableHead>
                      <TableHead className="text-school-black">Heure</TableHead>
                      <TableHead className="text-school-black">Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceData.map((record) => (
                      <TableRow key={record.id} className="hover:bg-school-yellow/5">
                        <TableCell className="font-medium text-school-black">{record.student}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-blue-300 text-blue-700">
                            {record.class}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-school-black/70">{record.course}</TableCell>
                        <TableCell className="text-school-black/70">{record.teacher}</TableCell>
                        <TableCell className="text-school-black/70">{record.time}</TableCell>
                        <TableCell>{getStatusBadge(record.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Attendance
