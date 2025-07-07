
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Plus } from "lucide-react"

interface CalendarHeaderProps {
  onNewCourseClick: () => void
}

const CalendarHeader = ({ onNewCourseClick }: CalendarHeaderProps) => {
  return (
    <header className="bg-white border-b border-school-yellow/20 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="text-school-black hover:bg-school-yellow/10" />
          <div>
            <h1 className="text-2xl font-bold text-school-black">Calendrier des Cours</h1>
            <p className="text-school-black/60">Planning et organisation des cours</p>
          </div>
        </div>
        <Button 
          className="bg-school-yellow text-school-black hover:bg-school-yellow-dark"
          onClick={onNewCourseClick}
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouveau Cours
        </Button>
      </div>
    </header>
  )
}

export default CalendarHeader
