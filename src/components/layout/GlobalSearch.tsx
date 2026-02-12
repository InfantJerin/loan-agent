import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, FileText, Briefcase, Building2, Users } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { deals, borrowers, lenders, documents } from '@/data'
import { Button } from '@/components/ui/button'

interface SearchResult {
  id: string
  label: string
  sublabel: string
  type: 'deal' | 'borrower' | 'lender' | 'document'
  path: string
}

function getSearchResults(query: string): SearchResult[] {
  if (!query || query.length < 2) return []
  const q = query.toLowerCase()
  const results: SearchResult[] = []
  deals.forEach(d => {
    if (d.name.toLowerCase().includes(q) || d.cusip?.toLowerCase().includes(q)) {
      results.push({ id: d.id, label: d.name, sublabel: d.cusip || d.dealType, type: 'deal', path: `/deals/${d.id}/overview` })
    }
  })
  borrowers.forEach(b => {
    if (b.name.toLowerCase().includes(q)) {
      results.push({ id: b.id, label: b.name, sublabel: `${b.industry} | ${b.rating}`, type: 'borrower', path: `/deals?borrower=${b.id}` })
    }
  })
  lenders.forEach(l => {
    if (l.name.toLowerCase().includes(q) || l.shortName.toLowerCase().includes(q)) {
      results.push({ id: l.id, label: l.name, sublabel: l.type, type: 'lender', path: `/agency?lender=${l.id}` })
    }
  })
  documents.forEach(doc => {
    if (doc.name.toLowerCase().includes(q)) {
      results.push({ id: doc.id, label: doc.name, sublabel: doc.type.replace(/_/g, ' '), type: 'document', path: `/documents?doc=${doc.id}` })
    }
  })
  return results.slice(0, 10)
}

const typeIcons = { deal: Briefcase, borrower: Building2, lender: Users, document: FileText }

export function GlobalSearch() {
  const { state, dispatch } = useApp()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (state.searchOpen) setTimeout(() => inputRef.current?.focus(), 50)
    else { setQuery(''); setResults([]); setSelectedIndex(0) }
  }, [state.searchOpen])

  useEffect(() => { setResults(getSearchResults(query)); setSelectedIndex(0) }, [query])

  const handleSelect = (result: SearchResult) => {
    navigate(result.path)
    dispatch({ type: 'SET_SEARCH', open: false })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIndex(i => Math.min(i + 1, results.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIndex(i => Math.max(i - 1, 0)) }
    else if (e.key === 'Enter' && results[selectedIndex]) handleSelect(results[selectedIndex])
  }

  if (!state.searchOpen) {
    return (
      <Button variant="outline" size="sm" className="gap-2 text-muted-foreground w-64 justify-start" onClick={() => dispatch({ type: 'SET_SEARCH', open: true })}>
        <Search className="h-4 w-4" />
        <span className="text-xs">Search deals, lenders, docs...</span>
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
    )
  }

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50" onClick={() => dispatch({ type: 'SET_SEARCH', open: false })} />
      <div className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2 rounded-xl border bg-white shadow-2xl">
        <div className="flex items-center border-b px-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)} onKeyDown={handleKeyDown}
            placeholder="Search deals, borrowers, lenders, documents, CUSIPs..."
            className="flex-1 bg-transparent py-3 px-2 text-sm outline-none" />
          <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">ESC</kbd>
        </div>
        {results.length > 0 && (
          <div className="max-h-80 overflow-y-auto p-2">
            {results.map((result, i) => {
              const Icon = typeIcons[result.type]
              return (
                <button key={result.id} className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${i === selectedIndex ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
                  onClick={() => handleSelect(result)} onMouseEnter={() => setSelectedIndex(i)}>
                  <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <div className="flex-1 truncate">
                    <div className="font-medium truncate">{result.label}</div>
                    <div className="text-xs text-muted-foreground truncate">{result.sublabel}</div>
                  </div>
                  <span className="text-xs text-muted-foreground capitalize">{result.type}</span>
                </button>
              )
            })}
          </div>
        )}
        {query.length >= 2 && results.length === 0 && <div className="p-8 text-center text-sm text-muted-foreground">No results found</div>}
        {query.length < 2 && <div className="p-4 text-center text-xs text-muted-foreground">Type at least 2 characters to search</div>}
      </div>
    </>
  )
}
