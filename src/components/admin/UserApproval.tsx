import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from "lucide-react"

export const UserApproval = () => {

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
        <div className="text-center py-8 text-muted-foreground">
          <p className="mb-2">Fonctionnalité d'approbation des utilisateurs</p>
          <p className="text-sm">À implémenter après la configuration complète de la base de données</p>
        </div>
      </CardContent>
    </Card>
  )
}