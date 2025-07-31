import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

interface UserProfile {
  id: string
  email: string
  first_name?: string
  last_name?: string
  role?: 'admin' | 'teacher' | 'parent' | 'student'
  status?: 'pending' | 'approved' | 'rejected'
}

interface AuthContextType {
  user: User | null
  session: Session | null
  userProfile: UserProfile | null
  loading: boolean
  signUp: (email: string, password: string, userData: { first_name?: string; last_name?: string; role: string }) => Promise<{ error: any }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchUserProfile = async (userId: string) => {
    try {
      // Fetch profile data with role information
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select(`
          *,
          user_roles!inner(role_name)
        `)
        .eq('user_id', userId)
        .maybeSingle()

      if (profileError) {
        console.error('Error fetching profile:', profileError)
        return
      }

      if (profile) {
        setUserProfile({
          id: profile.id,
          email: user?.email || '',
          first_name: profile.first_name,
          last_name: profile.last_name,
          role: profile.user_roles?.role_name as 'admin' | 'teacher' | 'parent' | 'student',
          status: 'approved' // Pour l'instant, tous les profils sont approuvés
        })
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error)
    }
  }

  const refreshProfile = async () => {
    if (user?.id) {
      await fetchUserProfile(user.id)
    }
  }

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          // Defer profile fetching to avoid blocking auth state change
          setTimeout(() => {
            fetchUserProfile(session.user.id)
          }, 0)
        } else {
          setUserProfile(null)
        }
        
        setLoading(false)
      }
    )

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      
      if (session?.user) {
        fetchUserProfile(session.user.id)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, userData: { first_name?: string; last_name?: string; role: string }) => {
    try {
      const redirectUrl = `${window.location.origin}/`
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: userData.first_name,
            last_name: userData.last_name,
            role: userData.role
          }
        }
      })

      if (error) {
        toast({
          variant: "destructive",
          title: "Erreur d'inscription",
          description: error.message,
        })
        return { error }
      }

      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé et est en attente de validation par un administrateur.",
      })

      return { error: null }
    } catch (error) {
      console.error('Error in signUp:', error)
      return { error }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        toast({
          variant: "destructive",
          title: "Erreur de connexion",
          description: error.message,
        })
        return { error }
      }

      return { error: null }
    } catch (error) {
      console.error('Error in signIn:', error)
      return { error }
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setSession(null)
      setUserProfile(null)
      
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès.",
      })
    } catch (error) {
      console.error('Error in signOut:', error)
    }
  }

  const value = {
    user,
    session,
    userProfile,
    loading,
    signUp,
    signIn,
    signOut,
    refreshProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}