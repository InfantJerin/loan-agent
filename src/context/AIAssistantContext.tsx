import { createContext, useContext, useState, type ReactNode } from 'react'
import type { AIMessage } from '@/types'
import { sampleAIMessages } from '@/data'

interface AIAssistantContextType {
  messages: AIMessage[]
  isOpen: boolean
  toggleOpen: () => void
  setOpen: (open: boolean) => void
  addMessage: (message: AIMessage) => void
  currentContext: string
  setCurrentContext: (context: string) => void
}

const AIAssistantContext = createContext<AIAssistantContextType | null>(null)

export function AIAssistantProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<AIMessage[]>(sampleAIMessages)
  const [isOpen, setIsOpen] = useState(false)
  const [currentContext, setCurrentContext] = useState('My Work')

  const toggleOpen = () => setIsOpen(prev => !prev)
  const setOpen = (open: boolean) => setIsOpen(open)
  const addMessage = (message: AIMessage) => setMessages(prev => [...prev, message])

  return (
    <AIAssistantContext.Provider
      value={{ messages, isOpen, toggleOpen, setOpen, addMessage, currentContext, setCurrentContext }}
    >
      {children}
    </AIAssistantContext.Provider>
  )
}

export function useAIAssistant() {
  const context = useContext(AIAssistantContext)
  if (!context) throw new Error('useAIAssistant must be used within AIAssistantProvider')
  return context
}
