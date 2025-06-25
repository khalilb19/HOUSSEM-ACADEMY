
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, UserCheck, Calendar, TrendingUp, Bell, Download } from "lucide-react"

const Index = () => {
  const stats = [
    {
      title: "Total Élèves",
      value: "247",
      change: "+3 ce mois",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Présences Aujourd'hui",
      value: "234",
      change: "94.7% de présence",
      icon: UserCheck,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Cours Programmés",
      value: "28",
      change: "Cette semaine",
      icon: Calendar,
      color: "text-school-yellow",
      bgColor: "bg-yellow-50"
    },
    {
      title: "Taux de Présence",
      value: "92.3%",
      change: "+2.1% vs mois dernier",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ]

  const recentActivities = [
    { time: "Il y a 5 min", action: "Ahmed Benali s'est connecté", type: "login" },
    { time: "Il y a 15 min", action: "Cours de Mathématiques - 7ème A terminé", type: "course" },
    { time: "Il y a 30 min", action: "3 absences signalées en Physique", type: "absence" },
    { time: "Il y a 1h", action: "Nouveaux parents inscrits", type: "registration" },
  ]

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
                  <h1 className="text-2xl font-bold text-school-black">Tableau de Bord</h1>
                  <p className="text-school-black/60">Vue d'ensemble de l'établissement</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="border-school-yellow text-school-black hover:bg-school-yellow/10">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                  <Badge className="ml-2 bg-red-500 text-white">3</Badge>
                </Button>
                <Button className="bg-school-yellow text-school-black hover:bg-school-yellow-dark">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </header>

          <div className="p-6 space-y-6 animate-fade-in">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={stat.title} className="hover:shadow-lg transition-shadow duration-200 border-school-yellow/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-school-black">
                      {stat.title}
                    </CardTitle>
                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-school-black">{stat.value}</div>
                    <p className="text-xs text-school-black/60 mt-1">{stat.change}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Activités récentes */}
              <Card className="lg:col-span-2 border-school-yellow/20">
                <CardHeader>
                  <CardTitle className="text-school-black">Activités Récentes</CardTitle>
                  <CardDescription>Dernières actions dans le système</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-school-gray-light/50 hover:bg-school-yellow/10 transition-colors">
                        <div className="w-2 h-2 rounded-full bg-school-yellow"></div>
                        <div className="flex-1">
                          <p className="text-sm text-school-black">{activity.action}</p>
                          <p className="text-xs text-school-black/60">{activity.time}</p>
                        </div>
                        <Badge variant="outline" className="border-school-yellow/50 text-school-black">
                          {activity.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Actions rapides */}
              <Card className="border-school-yellow/20">
                <CardHeader>
                  <CardTitle className="text-school-black">Actions Rapides</CardTitle>
                  <CardDescription>Raccourcis fréquemment utilisés</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-school-yellow text-school-black hover:bg-school-yellow-dark">
                    <Users className="w-4 h-4 mr-2" />
                    Ajouter un élève
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-school-yellow/50 text-school-black hover:bg-school-yellow/10">
                    <UserCheck className="w-4 h-4 mr-2" />
                    Marquer présences
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-school-yellow/50 text-school-black hover:bg-school-yellow/10">
                    <Calendar className="w-4 h-4 mr-2" />
                    Créer un cours
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-school-yellow/50 text-school-black hover:bg-school-yellow/10">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Graphique présences - Placeholder */}
            <Card className="border-school-yellow/20">
              <CardHeader>
                <CardTitle className="text-school-black">Évolution des Présences</CardTitle>
                <CardDescription>Tendance des 30 derniers jours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-r from-school-yellow/20 to-school-yellow/10 rounded-lg flex items-center justify-center">
                  <p className="text-school-black/60">Graphique des présences (à implémenter avec recharts)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Index
