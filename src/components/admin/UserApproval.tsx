import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { User, Check, X, AlertTriangle } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface PendingUser {
  id: string
  user_id: string
  email: string
  first_name?: string
  last_name?: string
  role_name: string
  created_at: string
}

export const UserApproval = () => {
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchPendingUsers = async () => {
    try {
      // Get users without role assignments (pending approval)
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .is('role_id', null)

      if (error) {
        console.error('Error fetching pending users:', error)
        return
      }

      if (!profiles || profiles.length === 0) {
        setPendingUsers([])
        return
      }

      // For now, use profiles data with placeholder email
      // In production, you'd need service role key to access auth.users
      const pendingUsersData = profiles.map(profile => ({
        ...profile,
        email: `user_${profile.user_id.slice(-8)}@academy.com`, // Placeholder
        role_name: 'pending'
      }))
      
      setPendingUsers(pendingUsersData)
    } catch (error) {
      console.error('Error in fetchPendingUsers:', error)
    } finally {
      setLoading(false)
    }
  }

  const approveUser = async (userId: string, roleId: number) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role_id: roleId })
        .eq('user_id', userId)

      if (error) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible d'approuver l'utilisateur"
        })
        return
      }

      toast({
        title: "Utilisateur approuvé",
        description: "L'utilisateur a été approuvé avec succès"
      })

      fetchPendingUsers()
    } catch (error) {
      console.error('Error approving user:', error)
    }
  }

  const rejectUser = async (userId: string) => {
    try {
      // Delete the profile (for now, keep auth user)
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('user_id', userId)

      if (error) {
        toast({
          variant: "destructive",
          title: "Erreur", 
          description: "Impossible de rejeter l'utilisateur"
        })
        return
      }

      toast({
        title: "Utilisateur rejeté",
        description: "Le profil utilisateur a été rejeté"
      })

      fetchPendingUsers()
    } catch (error) {
      console.error('Error rejecting user:', error)
    }
  }

  useEffect(() => {
    fetchPendingUsers()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Validation des comptes utilisateurs
        </CardTitle>
        <CardDescription>
          Gérez les demandes d'inscription en attente de validation
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">
            <p>Chargement des utilisateurs en attente...</p>
          </div>
        ) : pendingUsers.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <AlertTriangle className="mx-auto h-12 w-12 mb-4" />
            <p className="mb-2">Aucun utilisateur en attente</p>
            <p className="text-sm">Tous les utilisateurs ont été traités</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Date d'inscription</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {user.first_name && user.last_name 
                          ? `${user.first_name} ${user.last_name}`
                          : 'Nom non fourni'
                        }
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {new Date(user.created_at).toLocaleDateString('fr-FR')}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">En attente</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => approveUser(user.user_id, 3)} // Approve as student
                        className="text-green-600 hover:text-green-700"
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Approuver (Étudiant)
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => approveUser(user.user_id, 4)} // Approve as parent
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Approuver (Parent)
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => rejectUser(user.user_id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Rejeter
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}