
import { useState } from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Send, AlertTriangle, Info, CheckCircle, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } = from "@/hooks/use-toast"

const AnnouncementsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')
  const [targetAudience, setTargetAudience] = useState<'all' | 'teachers' | 'students' | 'parents'>('all')
  const { toast } = useToast()

  const announcements = [
    {
      id: 1,
      title: "Cours de mathématiques annulé",
      message: "Le cours de mathématiques de 14h00 avec Prof. Sarah est annulé aujourd'hui en raison d'une absence",
      priority: 'high' as const,
      audience: 'students' as const,
      author: "Administration",
      time: "Il y a 15 min",
      date: new Date().toISOString()
    },
    {
      id: 2,
      title: "Réunion pédagogique",
      message: "Réunion pédagogique prévue vendredi à 16h00 en salle des professeurs",
      priority: 'medium' as const,
      audience: 'teachers' as const,
      author: "Direction",
      time: "Il y a 2h",
      date: new Date().toISOString()
    },
    {
      id: 3,
      title: "Sortie éducative",
      message: "N'oubliez pas de rapporter l'autorisation signée pour la sortie éducative de demain",
      priority: 'medium' as const,
      audience: 'all' as const,
      author: "Administration",
      time: "Hier",
      date: new Date().toISOString()
    }
  ]

  const handleSendAnnouncement = () => {
    if (!title.trim() || !message.trim()) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
      })
      return
    }

    toast({
      title: "Annonce envoyée",
      description: `Annonce envoyée à ${getAudienceLabel(targetAudience)}`,
    })

    // Reset form
    setTitle('')
    setMessage('')
    setPriority('medium')
    setTargetAudience('all')
    setIsDialogOpen(false)
  }

  const getPriorityIcon = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case 'medium':
        return <Info className="w-4 h-4 text-yellow-500" />
      case 'low':
        return <CheckCircle className="w-4 h-4 text-green-500" />
    }
  }

  const getPriorityColor = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 border-red-200'
      case 'medium':
        return 'bg-yellow-100 border-yellow-200'
      case 'low':
        return 'bg-green-100 border-green-200'
    }
  }

  const getAudienceLabel = (audience: string) => {
    switch (audience) {
      case 'all': return 'tout le monde'
      case 'teachers': return 'les professeurs'
      case 'students': return 'les élèves'
      case 'parents': return 'les parents'
      default: return audience
    }
  }

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
                  <h1 className="text-xl md:text-2xl font-bold text-school-black">Annonces</h1>
                  <p className="text-school-black/60 text-sm">Gestion des annonces et communications</p>
                </div>
              </div>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-school-yellow text-school-black hover:bg-school-yellow-dark">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvelle annonce
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Créer une nouvelle annonce</DialogTitle>
                    <DialogDescription>
                      Envoyez une annonce à vos utilisateurs
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Titre</label>
                      <Input
                        placeholder="Titre de l'annonce"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Message</label>
                      <Textarea
                        placeholder="Contenu de l'annonce..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Priorité</label>
                        <Select value={priority} onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Faible</SelectItem>
                            <SelectItem value="medium">Moyenne</SelectItem>
                            <SelectItem value="high">Élevée</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium">Destinataires</label>
                        <Select value={targetAudience} onValueChange={(value: 'all' | 'teachers' | 'students' | 'parents') => setTargetAudience(value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Tout le monde</SelectItem>
                            <SelectItem value="teachers">Professeurs</SelectItem>
                            <SelectItem value="students">Élèves</SelectItem>
                            <SelectItem value="parents">Parents</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Annuler
                      </Button>
                      <Button 
                        onClick={handleSendAnnouncement}
                        className="bg-school-yellow text-school-black hover:bg-school-yellow-dark"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Envoyer
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </header>

          <div className="p-4 space-y-4">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className={`${getPriorityColor(announcement.priority)}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getPriorityIcon(announcement.priority)}
                      <CardTitle className="text-lg">{announcement.title}</CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {getAudienceLabel(announcement.audience)}
                      </Badge>
                      <span className="text-xs text-school-black/50">{announcement.time}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-school-black/80 mb-3">{announcement.message}</p>
                  <div className="flex justify-between items-center text-xs text-school-black/60">
                    <span>Par {announcement.author}</span>
                    <div className="flex items-center gap-1">
                      <Bell className="w-3 h-3" />
                      <span>Annonce {announcement.priority === 'high' ? 'urgente' : 'normale'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default AnnouncementsPage
