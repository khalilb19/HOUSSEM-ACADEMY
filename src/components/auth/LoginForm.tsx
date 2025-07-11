
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export type UserRole = 'admin' | 'teacher' | 'parent' | 'student'

interface LoginFormProps {
  onLogin: (user: any, role: UserRole) => void
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<UserRole>('admin')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulation de connexion pour la démo
      const demoUser = {
        id: '1',
        email: email || 'demo@houssemacademy.com',
        name: role === 'admin' ? 'Administrateur' : 
              role === 'teacher' ? 'Professeur Demo' : 
              role === 'student' ? 'Élève Demo' : 'Parent Demo'
      }

      onLogin(demoUser, role)
      
      toast({
        title: "Connexion réussie",
        description: `Bienvenue dans Houssem Academy`,
      })
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: error.message || "Erreur inconnue",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = (demoRole: UserRole) => {
    const demoUser = {
      id: '1',
      email: 'demo@houssemacademy.com',
      name: demoRole === 'admin' ? 'Administrateur' : 
            demoRole === 'teacher' ? 'Professeur Demo' : 
            demoRole === 'student' ? 'Élève Demo' : 'Parent Demo'
    }
    onLogin(demoUser, demoRole)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/lovable-uploads/3e4bbc9d-9aac-4075-9c18-7bd64ab1fdf5.png" 
              alt="Houssem Academy Logo" 
              className="w-16 h-16 object-contain"
            />
          </div>
          <CardTitle className="text-2xl text-gray-900">Houssem Academy</CardTitle>
          <CardDescription className="text-gray-600">Connectez-vous à votre espace</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre.email@example.com"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="password" className="text-gray-700">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="role" className="text-gray-700">Rôle</Label>
              <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Sélectionnez votre rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrateur</SelectItem>
                  <SelectItem value="teacher">Professeur</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="student">Élève</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
              disabled={isLoading}
            >
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>

          <div className="space-y-2">
            <p className="text-sm text-gray-600 text-center">Ou essayez une connexion démo :</p>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleDemoLogin('admin')}
                className="text-xs"
              >
                Demo Admin
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleDemoLogin('teacher')}
                className="text-xs"
              >
                Demo Prof
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleDemoLogin('student')}
                className="text-xs"
              >
                Demo Élève
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleDemoLogin('parent')}
                className="text-xs"
              >
                Demo Parent
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
