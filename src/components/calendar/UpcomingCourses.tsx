
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin } from "lucide-react"

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

interface UpcomingCoursesProps {
  courses: Course[]
}

const UpcomingCourses = ({ courses }: UpcomingCoursesProps) => {
  return (
    <Card className="border-school-yellow/20">
      <CardHeader>
        <CardTitle className="text-school-black">Prochains Cours</CardTitle>
        <CardDescription>Planning des jours suivants</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => (
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
  )
}

export default UpcomingCourses
