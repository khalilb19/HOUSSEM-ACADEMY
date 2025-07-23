import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, XCircle, Clock, User } from "lucide-react"
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/components/auth/AuthProvider'

interface PendingUser {
  id: string
  email: string
  first_name?: string
  last_name?: string
  role: 'admin' | 'teacher' | 'parent' | 'student'
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

export const UserApproval = () => {
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const { userProfile } = useAuth()

  const fetchPendingUsers = async () => {
    try {
      // First get pending user roles
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('id, user_id, role, status, created_at')
        .eq('status', 'pending')
        .order('created_at', { ascending: false })

      if (rolesError) {
        console.error('Error fetching pending roles:', rolesError)
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger les utilisateurs en attente.",
        })
        return
      }

      if (!rolesData || rolesData.length === 0) {
        setPendingUsers([])
        return
      }

      // Get user profiles for these users
      const userIds = rolesData.map(role => role.user_id)
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, first_name, last_name')
        .in('id', userIds)

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError)
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger les profils utilisateurs.",
        })
        return
      }

      // Combine the data
      const transformedData = rolesData.map(role => {
        const profile = profilesData?.find(p => p.id === role.user_id)
        return {
          id: role.user_id,
          email: profile?.email || '',
          first_name: profile?.first_name,
          last_name: profile?.last_name,
          role: role.role,
          status: role.status,
          created_at: role.created_at
        }
      })

      setPendingUsers(transformedData)
    } catch (error) {
      console.error('Error in fetchPendingUsers:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateUserStatus = async (userId: string, newStatus: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ 
          status: newStatus,
          approved_by: userProfile?.id,
          approved_at: new Date().toISOString()
        })
        .eq('user_id', userId)

      if (error) {
        console.error('Error updating user status:', error)
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de mettre à jour le statut de l'utilisateur.",
        })
        return
      }

      toast({
        title: "Statut mis à jour",
        description: `L'utilisateur a été ${newStatus === 'approved' ? 'approuvé' : 'rejeté'} avec succès.`,
      })

      // Refresh the list
      fetchPendingUsers()
    } catch (error) {
      console.error('Error in updateUserStatus:', error)
    }
  }

  useEffect(() => {
    fetchPendingUsers()
  }, [])

  const getRoleBadge = (role: string) => {
    const colors = {
      admin: 'bg-red-100 text-red-800',
      teacher: 'bg-blue-100 text-blue-800',
      parent: 'bg-green-100 text-green-800',
      student: 'bg-purple-100 text-purple-800'
    }
    
    const labels = {
      admin: 'Administrateur',
      teacher: 'Professeur',
      parent: 'Parent',
      student: 'Élève'
    }

    return (
      <Badge className={colors[role as keyof typeof colors]}>
        {labels[role as keyof typeof labels]}
      </Badge>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Validation des comptes utilisateurs</CardTitle>
          <CardDescription>Gestion des demandes d'inscription en attente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

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
        {pendingUsers.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucune demande en attente
            </h3>
            <p className="text-gray-600">
              Toutes les demandes d'inscription ont été traitées.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {pendingUsers.length} demande(s) en attente de validation
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchPendingUsers}
              >
                Actualiser
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Date d'inscription</TableHead>
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
                            : 'Nom non renseigné'
                          }
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {formatDate(user.created_at)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateUserStatus(user.id, 'approved')}
                          className="text-green-600 border-green-300 hover:bg-green-50"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approuver
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateUserStatus(user.id, 'rejected')}
                          className="text-red-600 border-red-300 hover:bg-red-50"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Rejeter
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}