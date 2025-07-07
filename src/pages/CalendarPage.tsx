
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import MonthlyCalendarPlanner from "@/components/MonthlyCalendarPlanner"
import CalendarHeader from "@/components/calendar/CalendarHeader"
import CalendarSidebar from "@/components/calendar/CalendarSidebar"
import TodaysCourses from "@/components/calendar/TodaysCourses"
import UpcomingCourses from "@/components/calendar/UpcomingCourses"
import CourseFormDialog from "@/components/calendar/CourseFormDialog"

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
      date: new Date(Date.now() + 24 * 60 * 60 * 1000),
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
      date: new Date(Date.now() + 24 * 60 * 60 * 1000),
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
          <CalendarHeader onNewCourseClick={() => setIsDialogOpen(true)} />

          <div className="p-6 space-y-6 animate-fade-in">
            <Tabs defaultValue="daily" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-school-yellow/10">
                <TabsTrigger value="daily" className="data-[state=active]:bg-school-yellow data-[state=active]:text-school-black">
                  Vue Journalière
                </TabsTrigger>
                <TabsTrigger value="monthly" className="data-[state=active]:bg-school-yellow data-[state=active]:text-school-black">
                  Planning Mensuel
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="daily" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <CalendarSidebar 
                    selectedDate={selectedDate}
                    onDateSelect={setSelectedDate}
                  />
                  <TodaysCourses courses={todaysCourses} />
                </div>
                <UpcomingCourses courses={upcomingCourses} />
              </TabsContent>
              
              <TabsContent value="monthly" className="space-y-6">
                <MonthlyCalendarPlanner />
              </TabsContent>
            </Tabs>
          </div>

          <CourseFormDialog 
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          />
        </main>
      </div>
    </SidebarProvider>
  )
}

export default CalendarPage
