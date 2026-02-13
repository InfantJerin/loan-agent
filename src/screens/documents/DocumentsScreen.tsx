import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Upload, Search, Filter, Building2, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { ConfidenceBadge } from '@/components/shared/ConfidenceBadge'
import { DateDisplay } from '@/components/shared/DateDisplay'
import { DealLink } from '@/components/shared/DealLink'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { documents, deals, getDealById } from '@/data'
import { cn } from '@/lib/utils'
import type { Document } from '@/types'

const DOC_TYPE_LABELS: Record<string, string> = {
  credit_agreement: 'Credit Agreement',
  amendment: 'Amendment',
  compliance_certificate: 'Compliance Certificate',
  notice: 'Notice',
  assignment_agreement: 'Assignment Agreement',
  funding_notice: 'Funding Notice',
  rate_set_notice: 'Rate Set Notice',
  financial_statement: 'Financial Statement',
}

function DocumentRow({ doc, onClick }: { doc: Document; onClick: () => void }) {
  const deal = doc.dealId ? getDealById(doc.dealId) : null
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors group"
      onClick={onClick}
    >
      <div className="h-9 w-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
        <FileText className="h-4 w-4 text-blue-600" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate group-hover:text-primary transition-colors">{doc.name}</div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
          {deal && (
            <span className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
              <Building2 className="h-3 w-3" />
              <DealLink dealId={deal.id}>{deal.name.split(' ').slice(0, 3).join(' ')}</DealLink>
            </span>
          )}
          <span>{DOC_TYPE_LABELS[doc.type] || doc.type}</span>
          <span>{doc.pages} pages</span>
          <DateDisplay date={doc.uploadDate} />
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <StatusBadge status={doc.status} />
        {doc.confidence != null && <ConfidenceBadge score={doc.confidence} />}
        <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  )
}

function DocumentList({ docs, onDocClick }: { docs: Document[]; onDocClick: (id: string) => void }) {
  if (docs.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground text-sm">
        No documents match your filters.
      </div>
    )
  }
  return (
    <div className="divide-y">
      {docs.map(doc => (
        <DocumentRow key={doc.id} doc={doc} onClick={() => onDocClick(doc.id)} />
      ))}
    </div>
  )
}

export function DocumentsScreen() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('queue')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDealFilter, setSelectedDealFilter] = useState<string | null>(null)

  // Deals that have documents
  const dealsWithDocs = useMemo(() => {
    const dealIds = new Set(documents.filter(d => d.dealId).map(d => d.dealId!))
    return deals.filter(d => dealIds.has(d.id))
  }, [])

  // Filter documents
  const filteredDocs = useMemo(() => {
    let filtered = documents
    if (selectedDealFilter) {
      filtered = filtered.filter(d => d.dealId === selectedDealFilter)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(d =>
        d.name.toLowerCase().includes(q) ||
        (d.classification && d.classification.toLowerCase().includes(q)) ||
        d.type.toLowerCase().includes(q)
      )
    }
    return filtered
  }, [selectedDealFilter, searchQuery])

  const ingestionQueue = useMemo(() => filteredDocs.filter(d => ['queued', 'processing', 'classified'].includes(d.status)), [filteredDocs])
  const reviewQueue = useMemo(() => filteredDocs.filter(d => ['extracted', 'in_review'].includes(d.status)), [filteredDocs])
  const verified = useMemo(() => filteredDocs.filter(d => d.status === 'verified'), [filteredDocs])

  const handleDocClick = (docId: string) => {
    const doc = documents.find(d => d.id === docId)
    // Navigate to review page for documents with extractions
    if (doc && ['extracted', 'in_review', 'verified'].includes(doc.status)) {
      navigate(`/documents/${docId}/review`)
    }
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Document Processing Center"
        description={`${filteredDocs.length} document${filteredDocs.length !== 1 ? 's' : ''}${selectedDealFilter ? ` for ${dealsWithDocs.find(d => d.id === selectedDealFilter)?.name.split(' ').slice(0, 3).join(' ')}` : ' across all deals'}`}
        action={<Button size="sm" className="gap-1.5"><Upload className="h-4 w-4" /> Upload Document</Button>}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">In Queue</div><div className="text-2xl font-bold mt-1">{ingestionQueue.length}</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Needs Review</div><div className="text-2xl font-bold mt-1 text-amber-600">{reviewQueue.length}</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Verified</div><div className="text-2xl font-bold mt-1 text-green-600">{verified.length}</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Total Documents</div><div className="text-2xl font-bold mt-1">{filteredDocs.length}</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Avg Accuracy</div><div className="text-2xl font-bold mt-1">93%</div></CardContent></Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Deal filter chips */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Button
            variant={selectedDealFilter === null ? 'default' : 'outline'}
            size="sm"
            className="h-7 text-xs"
            onClick={() => setSelectedDealFilter(null)}
          >
            All Deals
          </Button>
          {dealsWithDocs.slice(0, 5).map(deal => (
            <Button
              key={deal.id}
              variant={selectedDealFilter === deal.id ? 'default' : 'outline'}
              size="sm"
              className="h-7 text-xs"
              onClick={() => setSelectedDealFilter(selectedDealFilter === deal.id ? null : deal.id)}
            >
              {deal.name.split(' ').slice(0, 2).join(' ')}
            </Button>
          ))}
          {dealsWithDocs.length > 5 && (
            <Badge variant="secondary" className="text-xs">+{dealsWithDocs.length - 5} more</Badge>
          )}
        </div>
      </div>

      {/* Document tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="queue">
            Ingestion Queue <Badge variant="secondary" className="ml-1.5 h-5 px-1.5 text-[10px]">{ingestionQueue.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="review">
            Extraction Review <Badge variant="secondary" className="ml-1.5 h-5 px-1.5 text-[10px]">{reviewQueue.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="verified">
            Verified <Badge variant="secondary" className="ml-1.5 h-5 px-1.5 text-[10px]">{verified.length}</Badge>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="queue">
          <Card>
            <CardContent className="p-0">
              <DocumentList docs={ingestionQueue} onDocClick={handleDocClick} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="review">
          <Card>
            <CardContent className="p-0">
              <DocumentList docs={reviewQueue} onDocClick={handleDocClick} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="verified">
          <Card>
            <CardContent className="p-0">
              <DocumentList docs={verified} onDocClick={handleDocClick} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
