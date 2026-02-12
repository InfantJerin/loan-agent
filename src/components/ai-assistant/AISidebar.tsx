import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bot, Send, X, Sparkles, ExternalLink } from 'lucide-react'
import { useAIAssistant } from '@/context/AIAssistantContext'
import { useNavigation } from '@/context/NavigationContext'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { AIMessage } from '@/types'

function ChatMessage({ message }: { message: AIMessage }) {
  const navigate = useNavigate()
  const isUser = message.role === 'user'

  return (
    <div className={`flex gap-2 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
          <Bot className="h-4 w-4 text-primary" />
        </div>
      )}
      <div className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
        <div className="whitespace-pre-wrap">{message.content}</div>
        {message.citations && message.citations.length > 0 && (
          <div className="mt-2 space-y-1">
            {message.citations.map((c, i) => (
              <button key={i} onClick={() => c.dealId && navigate(`/deals/${c.dealId}/overview`)}
                className="flex items-center gap-1 text-xs text-primary hover:underline">
                <ExternalLink className="h-3 w-3" /> {c.text}
              </button>
            ))}
          </div>
        )}
        {message.suggestedActions && message.suggestedActions.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {message.suggestedActions.map((a, i) => (
              <button key={i} className="rounded-full border border-primary/30 bg-primary/5 px-2 py-0.5 text-xs text-primary hover:bg-primary/10">
                {a.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function AISidebar() {
  const { messages, isOpen, setOpen, addMessage } = useAIAssistant()
  const { currentScreen } = useNavigation()
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    addMessage({ id: `user-${Date.now()}`, role: 'user', content: input.trim(), timestamp: new Date().toISOString() })
    setInput('')
    setTimeout(() => {
      addMessage({
        id: `ai-${Date.now()}`, role: 'assistant', timestamp: new Date().toISOString(),
        content: `I understand you're asking about "${input.trim()}". In a production system, I would process this query and provide detailed loan operations insights. For this demo, I'm showing the AI assistant interaction pattern.`,
        suggestedActions: [{ label: 'View details', action: 'view' }, { label: 'Run analysis', action: 'analyze' }],
      })
    }, 800)
  }

  if (!isOpen) return null

  return (
    <div className="fixed right-0 top-14 bottom-8 w-96 border-l bg-white z-30 flex flex-col">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="font-semibold text-sm">AI Assistant</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{currentScreen}</span>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map(m => <ChatMessage key={m.id} message={m} />)}
        </div>
      </ScrollArea>

      <div className="border-t p-3">
        <div className="flex gap-2">
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask about deals, rates, payments..."
            className="flex-1 rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-ring" />
          <Button size="icon" onClick={handleSend} disabled={!input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
