import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarDays, Download, Check, X, Clock, Loader2 } from "lucide-react"
import { useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useQuery } from "@tanstack/react-query"

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedSession, setSelectedSession] = useState<string>("all")

  // Récupérer les sessions d'assiduité pour la date sélectionnée
  const { data: sessions, isLoading: sessionsLoading } = useQuery({
    queryKey: ['attendance-sessions', selectedDate],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('attendance_sessions')
        .select(`
          id,
          subject,
          session_date,
          start_time,
          end_time,
          class_id,
          teacher_id,
          classes (
            id,
            name
          )
        `)
        .eq('session_date', selectedDate?.toISOString().split('T')[0])
        .order('start_time');
      
      if (error) throw error;
      
      // Récupérer les informations des professeurs séparément
      const sessionsWithTeachers = await Promise.all(
        (data || []).map(async (session) => {
          const { data: teacherData } = await supabase
            .from('profiles')
            .select('first_name, last_name')
            .eq('user_id', session.teacher_id)
            .single();
          
          return {
            ...session,
            teacher: teacherData
          };
        })
      );
      
      return sessionsWithTeachers;
    },
    enabled: !!selectedDate
  });

  // Récupérer les données d'assiduité pour la session sélectionnée
  const { data: attendanceData, isLoading: attendanceLoading } = useQuery({
    queryKey: ['attendance-records', selectedSession],
    queryFn: async () => {
      if (selectedSession === "all" || !selectedSession) return [];
      
      const { data, error } = await supabase
        .rpc('get_attendance_with_names', { _session_id: selectedSession });
      
      if (error) throw error;
      return data || [];
    },
    enabled: selectedSession !== "all" && !!selectedSession
  });

  // Données pour les sessions disponibles
  const sessionOptions = sessions || [];

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
    if (!attendanceData || attendanceData.length === 0) {
      return { total: 0, present: 0, absent: 0, late: 0, rate: 0 }
    }
    
    const total = attendanceData.length
    const present = attendanceData.filter(a => a.status === "present").length
    const absent = attendanceData.filter(a => a.status === "absent").length
    const late = attendanceData.filter(a => a.status === "late").length
    const rate = total > 0 ? Math.round((present / total) * 100) : 0
    
    return { total, present, absent, late, rate }
  }

  const stats = getTodayStats()
  
  const selectedSessionData = sessionOptions.find(s => s.id === selectedSession)

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
                  <p className="text-school-black/60">Suivi et marquage des présences élèves</p>
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

            {/* Sélection de session */}
            <Card className="border-school-yellow/20">
              <CardHeader>
                <CardTitle className="text-school-black">Sélectionner une Session</CardTitle>
                <CardDescription>
                  Choisissez une session d'assiduité pour voir les détails
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <label className="text-sm font-medium text-school-black">Session</label>
                    {sessionsLoading ? (
                      <div className="flex items-center gap-2 mt-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm text-school-black/60">Chargement des sessions...</span>
                      </div>
                    ) : (
                      <Select value={selectedSession} onValueChange={setSelectedSession}>
                        <SelectTrigger className="border-school-yellow/30 focus:border-school-yellow">
                          <SelectValue placeholder="Sélectionner une session" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-school-yellow/20">
                          <SelectItem value="all">Toutes les sessions</SelectItem>
                          {sessionOptions.map((session) => (
                            <SelectItem key={session.id} value={session.id}>
                              {session.subject} - {session.start_time?.slice(0, 5)} ({session.classes?.name})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </div>
                
                {selectedSessionData && (
                  <div className="mt-4 p-3 bg-school-yellow/10 rounded-lg">
                    <p className="font-medium text-school-black">{selectedSessionData.subject}</p>
                    <p className="text-sm text-school-black/70">
                      Classe: {selectedSessionData.classes?.name} | 
                      Horaire: {selectedSessionData.start_time?.slice(0, 5)} - {selectedSessionData.end_time?.slice(0, 5)} | 
                      Professeur: {selectedSessionData.teacher?.first_name} {selectedSessionData.teacher?.last_name}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Liste des présences */}
            <Card className="border-school-yellow/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-school-black">
                      {selectedSessionData ? `Présences - ${selectedSessionData.subject}` : 'Présences du Jour'}
                    </CardTitle>
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
                {attendanceLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin mr-2" />
                    <span>Chargement des données d'assiduité...</span>
                  </div>
                ) : selectedSession === "all" ? (
                  <div className="text-center py-8 text-school-black/60">
                    Veuillez sélectionner une session pour voir les détails d'assiduité
                  </div>
                ) : !attendanceData || attendanceData.length === 0 ? (
                  <div className="text-center py-8 text-school-black/60">
                    Aucune donnée d'assiduité trouvée pour cette session
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-school-black">Élève</TableHead>
                        <TableHead className="text-school-black">Statut</TableHead>
                        <TableHead className="text-school-black">Heure d'arrivée</TableHead>
                        <TableHead className="text-school-black">Notes</TableHead>
                        <TableHead className="text-school-black">Marqué le</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {attendanceData.map((record) => (
                        <TableRow key={record.id} className="hover:bg-school-yellow/5">
                          <TableCell className="font-medium text-school-black">
                            {record.full_name}
                          </TableCell>
                          <TableCell>{getStatusBadge(record.status)}</TableCell>
                          <TableCell className="text-school-black/70">
                            {record.arrival_time || '-'}
                          </TableCell>
                          <TableCell className="text-school-black/70">
                            {record.notes || '-'}
                          </TableCell>
                          <TableCell className="text-school-black/70">
                            {record.marked_at ? new Date(record.marked_at).toLocaleString('fr-FR') : '-'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Attendance