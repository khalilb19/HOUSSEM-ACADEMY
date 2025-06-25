
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Filter, MoreHorizontal, Check, X } from "lucide-react"

const Users = () => {
  const students = [
    { id: 1, name: "Ahmed Ben Ali", class: "7ème A", status: "Actif", lastLogin: "Aujourd'hui", parent: "Mohamed Ben Ali" },
    { id: 2, name: "Fatima Zohra", class: "7ème B", status: "Actif", lastLogin: "Hier", parent: "Aicha Zohra" },
    { id: 3, name: "Youssef Gharbi", class: "8ème A", status: "Pending", lastLogin: "Jamais", parent: "Omar Gharbi" },
    { id: 4, name: "Salma Triki", class: "7ème A", status: "Actif", lastLogin: "Il y a 2 jours", parent: "Leila Triki" },
  ]

  const teachers = [
    { id: 1, name: "Prof. Hassan Amri", subject: "Mathématiques", classes: "7ème A, B", status: "Actif" },
    { id: 2, name: "Prof. Nadia Slim", subject: "Français", classes: "7ème A, 8ème A", status: "Actif" },
    { id: 3, name: "Prof. Karim Jeddi", subject: "Sciences", classes: "7ème B", status: "Pending" },
  ]

  const pendingRequests = [
    { id: 1, name: "Amine Bouali", email: "amine.bouali@email.com", type: "Élève", class: "7ème A", date: "Il y a 2h" },
    { id: 2, name: "Prof. Sana Khelil", email: "sana.khelil@email.com", type: "Professeur", subject: "Arabe", date: "Il y a 1 jour" },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Actif":
        return <Badge className="bg-green-100 text-green-800">Actif</Badge>
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
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
                  <h1 className="text-2xl font-bold text-school-black">Gestion des Utilisateurs</h1>
                  <p className="text-school-black/60">Gérer les élèves, professeurs et parents</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-school-black/40 w-4 h-4" />
                  <Input 
                    placeholder="Rechercher un utilisateur..." 
                    className="pl-10 w-64 border-school-yellow/30 focus:border-school-yellow"
                  />
                </div>
                <Button variant="outline" size="sm" className="border-school-yellow text-school-black hover:bg-school-yellow/10">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtrer
                </Button>
              </div>
            </div>
          </header>

          <div className="p-6 space-y-6 animate-fade-in">
            {/* Demandes en attente */}
            <Card className="border-school-yellow/20">
              <CardHeader>
                <CardTitle className="text-school-black flex items-center gap-2">
                  Demandes en Attente 
                  <Badge className="bg-red-100 text-red-800">{pendingRequests.length}</Badge>
                </CardTitle>
                <CardDescription>Comptes à valider</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 bg-school-yellow/10 rounded-lg border border-school-yellow/20">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-medium text-school-black">{request.name}</p>
                            <p className="text-sm text-school-black/60">{request.email}</p>
                          </div>
                          <Badge variant="outline" className="border-school-yellow/50 text-school-black">
                            {request.type}
                          </Badge>
                          {request.class && (
                            <Badge variant="outline" className="border-blue-300 text-blue-700">
                              {request.class}
                            </Badge>
                          )}
                          {request.subject && (
                            <Badge variant="outline" className="border-purple-300 text-purple-700">
                              {request.subject}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-school-black/50 mt-1">{request.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          <Check className="w-4 h-4 mr-1" />
                          Accepter
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                          <X className="w-4 h-4 mr-1" />
                          Refuser
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Onglets pour les différents types d'utilisateurs */}
            <Tabs defaultValue="students" className="space-y-4">
              <TabsList className="bg-white border border-school-yellow/20">
                <TabsTrigger value="students" className="data-[state=active]:bg-school-yellow data-[state=active]:text-school-black">
                  Élèves ({students.length})
                </TabsTrigger>
                <TabsTrigger value="teachers" className="data-[state=active]:bg-school-yellow data-[state=active]:text-school-black">
                  Professeurs ({teachers.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="students">
                <Card className="border-school-yellow/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-school-black">Liste des Élèves</CardTitle>
                        <CardDescription>Gestion des comptes élèves et parents</CardDescription>
                      </div>
                      <Button className="bg-school-yellow text-school-black hover:bg-school-yellow-dark">
                        <Plus className="w-4 h-4 mr-2" />
                        Ajouter un élève
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-school-black">Nom</TableHead>
                          <TableHead className="text-school-black">Classe</TableHead>
                          <TableHead className="text-school-black">Parent</TableHead>
                          <TableHead className="text-school-black">Statut</TableHead>
                          <TableHead className="text-school-black">Dernière connexion</TableHead>
                          <TableHead className="text-school-black">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {students.map((student) => (
                          <TableRow key={student.id} className="hover:bg-school-yellow/5">
                            <TableCell className="font-medium text-school-black">{student.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="border-blue-300 text-blue-700">
                                {student.class}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-school-black/70">{student.parent}</TableCell>
                            <TableCell>{getStatusBadge(student.status)}</TableCell>
                            <TableCell className="text-school-black/70">{student.lastLogin}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm" className="hover:bg-school-yellow/10">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="teachers">
                <Card className="border-school-yellow/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-school-black">Liste des Professeurs</CardTitle>
                        <CardDescription>Gestion des comptes enseignants</CardDescription>
                      </div>
                      <Button className="bg-school-yellow text-school-black hover:bg-school-yellow-dark">
                        <Plus className="w-4 h-4 mr-2" />
                        Ajouter un professeur
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-school-black">Nom</TableHead>
                          <TableHead className="text-school-black">Matière</TableHead>
                          <TableHead className="text-school-black">Classes</TableHead>
                          <TableHead className="text-school-black">Statut</TableHead>
                          <TableHead className="text-school-black">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {teachers.map((teacher) => (
                          <TableRow key={teacher.id} className="hover:bg-school-yellow/5">
                            <TableCell className="font-medium text-school-black">{teacher.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="border-purple-300 text-purple-700">
                                {teacher.subject}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-school-black/70">{teacher.classes}</TableCell>
                            <TableCell>{getStatusBadge(teacher.status)}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm" className="hover:bg-school-yellow/10">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Users
