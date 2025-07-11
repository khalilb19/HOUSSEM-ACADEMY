
import { useState } from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Send, Search, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const MessagingPage = () => {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()

  const conversations = [
    {
      id: 1,
      name: "Prof. Sarah Mansouri",
      lastMessage: "Merci pour votre question sur l'exercice",
      time: "10:30",
      unread: 0,
      role: "teacher"
    },
    {
      id: 2,
      name: "Ahmed Ben Ali",
      lastMessage: "Je n'ai pas compris la leçon d'aujourd'hui",
      time: "09:15",
      unread: 2,
      role: "student"
    },
    {
      id: 3,
      name: "Prof. Omar Triki",
      lastMessage: "Votre devoir est bien rendu",
      time: "Hier",
      unread: 0,
      role: "teacher"
    }
  ]

  const messages = selectedConversation ? [
    {
      id: 1,
      sender: "Prof. Sarah Mansouri",
      content: "Bonjour Ahmed, j'ai vu que vous avez des difficultés avec l'exercice 5. Pouvez-vous me dire où vous bloquez exactement ?",
      time: "09:00",
      isOwn: false
    },
    {
      id: 2,
      sender: "Moi",
      content: "Bonjour Madame, je ne comprends pas comment factoriser cette expression",
      time: "09:05",
      isOwn: true
    },
    {
      id: 3,
      sender: "Prof. Sarah Mansouri",
      content: "Je vous explique : vous devez d'abord identifier les facteurs communs...",
      time: "09:10",
      isOwn: false
    }
  ] : []

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    toast({
      title: "Message envoyé",
      description: "Votre message a été envoyé avec succès",
    })
    setNewMessage('')
  }

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-school-gray-light">
        <AppSidebar />
        <main className="flex-1">
          <header className="bg-white border-b border-school-yellow/20 p-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-school-black hover:bg-school-yellow/10" />
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-school-black">Messagerie</h1>
                <p className="text-school-black/60 text-sm">Communication entre professeurs et élèves</p>
              </div>
            </div>
          </header>

          <div className="flex h-[calc(100vh-80px)]">
            {/* Liste des conversations */}
            <div className="w-1/3 bg-white border-r border-school-yellow/20">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Rechercher une conversation..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="overflow-y-auto">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`p-4 border-b cursor-pointer hover:bg-school-yellow/5 ${
                      selectedConversation === conversation.id ? 'bg-school-yellow/10' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-school-yellow/20 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-school-black" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-school-black text-sm">{conversation.name}</p>
                            <Badge variant={conversation.role === 'teacher' ? 'default' : 'secondary'} className="text-xs">
                              {conversation.role === 'teacher' ? 'Prof' : 'Élève'}
                            </Badge>
                          </div>
                          <p className="text-school-black/60 text-xs truncate">{conversation.lastMessage}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-xs text-school-black/50">{conversation.time}</span>
                        {conversation.unread > 0 && (
                          <Badge className="bg-red-500 text-white text-xs">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Zone de messages */}
            <div className="flex-1 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* En-tête de conversation */}
                  <div className="p-4 bg-white border-b border-school-yellow/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-school-yellow/20 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-school-black" />
                      </div>
                      <div>
                        <p className="font-medium text-school-black">
                          {conversations.find(c => c.id === selectedConversation)?.name}
                        </p>
                        <p className="text-sm text-school-black/60">En ligne</p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.isOwn
                              ? 'bg-school-yellow text-school-black'
                              : 'bg-white border border-school-yellow/20'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.isOwn ? 'text-school-black/70' : 'text-school-black/50'
                          }`}>
                            {message.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Zone de saisie */}
                  <div className="p-4 bg-white border-t border-school-yellow/20">
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Tapez votre message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 min-h-[60px] resize-none"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            handleSendMessage()
                          }
                        }}
                      />
                      <Button
                        onClick={handleSendMessage}
                        className="bg-school-yellow text-school-black hover:bg-school-yellow-dark"
                        disabled={!newMessage.trim()}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-school-gray-light">
                  <div className="text-center">
                    <MessageSquare className="w-16 h-16 text-school-black/30 mx-auto mb-4" />
                    <p className="text-school-black/60">Sélectionnez une conversation pour commencer</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default MessagingPage
