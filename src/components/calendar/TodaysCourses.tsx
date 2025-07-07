
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Users, Edit, Trash2 } from "lucide-react"

interface Course {
  id: number
  title: string
  teacher: string
  class: string
  time: string
  room: string
  date: Date
  students: number
  color: string
}

interface TodaysCoursesProps {
  courses: Course[]
}

const TodaysCourses = ({ courses }: TodaysCoursesProps) => {
  return (
    <Card className="lg:col-span-2 border-school-yellow/20">
      <CardHeader>
        <CardTitle className="text-school-black">Cours d'Aujourd'hui</CardTitle>
        <CardDescription>
          {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {courses.map((course) => (
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
  )
}

export default TodaysCourses
