
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface CourseFormDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const CourseFormDialog = ({ isOpen, onOpenChange }: CourseFormDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
              onClick={() => onOpenChange(false)}
            >
              Créer le Cours
            </Button>
            <Button 
              variant="outline" 
              className="border-school-yellow/50 text-school-black hover:bg-school-yellow/10"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CourseFormDialog
