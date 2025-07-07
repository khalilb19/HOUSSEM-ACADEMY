
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Languages, Download, Bell, Shield, Palette } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

const Settings = () => {
  const [language, setLanguage] = useState("fr")
  const [notifications, setNotifications] = useState(true)
  const [autoSync, setAutoSync] = useState(true)
  const { toast } = useToast()

  const handleSaveSettings = () => {
    toast({
      title: "Paramètres sauvegardés",
      description: "Vos préférences ont été mises à jour avec succès.",
    })
  }

  const handleExportData = (type: string) => {
    // Simulate CSV export
    const data = type === 'attendance' ? 
      'Nom,Prénom,Classe,Date,Statut\nAhmed,Ben Ali,7ème A,2024-01-15,Présent\nFatima,Zohra,7ème A,2024-01-15,Absente' :
      'Matière,Professeur,Classe,Date,Heure,Salle\nMathématiques,Prof. Hassan,7ème A,2024-01-15,08:00,Salle 101'
    
    const blob = new Blob([data], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.download = `${type}_export_${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    
    toast({
      title: "Export réussi",
      description: `Le fichier ${type}.csv a été téléchargé.`,
    })
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-school-gray-light">
        <AppSidebar />
        <main className="flex-1">
          <header className="bg-white border-b border-school-yellow/20 p-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-school-black hover:bg-school-yellow/10" />
              <div>
                <h1 className="text-2xl font-bold text-school-black">Paramètres</h1>
                <p className="text-school-black/60">Configuration de l'application</p>
              </div>
            </div>
          </header>

          <div className="p-6 space-y-6 animate-fade-in">
            {/* Paramètres de langue */}
            <Card className="border-school-yellow/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-school-black">
                  <Languages className="w-5 h-5" />
                  Langue et Localisation
                </CardTitle>
                <CardDescription>
                  Choisissez votre langue préférée
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="language" className="text-school-black">Langue de l'interface</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="border-school-yellow/30 focus:border-school-yellow">
                        <SelectValue placeholder="Sélectionner une langue" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-school-yellow/20">
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="ar">العربية (Arabe)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="border-school-yellow/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-school-black">
                  <Bell className="w-5 h-5" />
                  Notifications
                </CardTitle>
                <CardDescription>
                  Gérez vos préférences de notification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notifications" className="text-school-black font-medium">
                      Notifications push
                    </Label>
                    <p className="text-sm text-school-black/60">
                      Recevoir des notifications pour les absences et rappels de cours
                    </p>
                  </div>
                  <Switch
                    id="notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
                <Separator className="bg-school-yellow/20" />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoSync" className="text-school-black font-medium">
                      Synchronisation automatique
                    </Label>
                    <p className="text-sm text-school-black/60">
                      Synchroniser automatiquement les données
                    </p>
                  </div>
                  <Switch
                    id="autoSync"
                    checked={autoSync}
                    onCheckedChange={setAutoSync}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Export des données */}
            <Card className="border-school-yellow/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-school-black">
                  <Download className="w-5 h-5" />
                  Export des Données
                </CardTitle>
                <CardDescription>
                  Exportez vos données au format CSV
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    onClick={() => handleExportData('attendance')}
                    variant="outline"
                    className="border-school-yellow/50 text-school-black hover:bg-school-yellow/10"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Exporter les Présences
                  </Button>
                  <Button
                    onClick={() => handleExportData('calendar')}
                    variant="outline"
                    className="border-school-yellow/50 text-school-black hover:bg-school-yellow/10"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Exporter le Calendrier
                  </Button>
                  <Button
                    onClick={() => handleExportData('students')}
                    variant="outline"
                    className="border-school-yellow/50 text-school-black hover:bg-school-yellow/10"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Exporter les Élèves
                  </Button>
                  <Button
                    onClick={() => handleExportData('teachers')}
                    variant="outline"
                    className="border-school-yellow/50 text-school-black hover:bg-school-yellow/10"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Exporter les Professeurs
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Sauvegarder */}
            <div className="flex justify-end">
              <Button
                onClick={handleSaveSettings}
                className="bg-school-yellow text-school-black hover:bg-school-yellow-dark"
              >
                Sauvegarder les Paramètres
              </Button>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Settings
