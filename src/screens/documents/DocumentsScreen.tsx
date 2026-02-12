import { useState, useMemo } from 'react'
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from 'react-resizable-panels'
import { FileText, Upload, CheckCircle, XCircle, Eye, Search } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { ConfidenceBadge } from '@/components/shared/ConfidenceBadge'
import { DateDisplay } from '@/components/shared/DateDisplay'
import { DealLink } from '@/components/shared/DealLink'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { documents, extractions, getDealById, getExtractionsByDocumentId } from '@/data'
import { getConfidenceLevel, CONFIDENCE_COLORS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import type { Document, ExtractionField } from '@/types'

function DocumentList({ docs, selectedId, onSelect }: { docs: Document[]; selectedId: string | null; onSelect: (id: string) => void }) {
  return (
    <div className="divide-y">
      {docs.map(doc => {
        const deal = doc.dealId ? getDealById(doc.dealId) : null
        return (
          <div key={doc.id} className={cn('flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors', selectedId === doc.id && 'bg-primary/5 border-l-2 border-l-primary')} onClick={() => onSelect(doc.id)}>
            <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{doc.name}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {deal && <DealLink dealId={deal.id}>{deal.name.split(' ').slice(0, 2).join(' ')}</DealLink>}
                <span>{doc.pages} pages</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <StatusBadge status={doc.status} />
              {doc.confidence != null && <ConfidenceBadge score={doc.confidence} />}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function ExtractionReview({ documentId }: { documentId: string }) {
  const fields = getExtractionsByDocumentId(documentId)
  const doc = documents.find(d => d.id === documentId)
  const [hoveredField, setHoveredField] = useState<string | null>(null)
  const [editedValues, setEditedValues] = useState<Record<string, string>>({})

  if (!doc) return null

  return (
    <PanelGroup orientation="horizontal" className="h-[600px]">
      {/* Left: Extracted Fields */}
      <Panel defaultSize="45%" minSize="30%">
        <div className="h-full overflow-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">Extracted Fields</h3>
            <Badge variant="secondary">{fields.length} fields</Badge>
          </div>
          <div className="space-y-2">
            {fields.map(field => {
              const level = getConfidenceLevel(field.confidence)
              return (
                <div key={field.id}
                  className={cn('rounded-lg border p-3 transition-colors cursor-pointer', CONFIDENCE_COLORS[level]?.split(' ')[0], hoveredField === field.id && 'ring-2 ring-primary')}
                  onMouseEnter={() => setHoveredField(field.id)}
                  onMouseLeave={() => setHoveredField(null)}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-muted-foreground">{field.fieldName}</span>
                    <ConfidenceBadge score={field.confidence} />
                  </div>
                  <input
                    className="w-full text-sm font-medium bg-white/80 rounded px-2 py-1 border"
                    value={editedValues[field.id] ?? field.extractedValue}
                    onChange={e => setEditedValues(prev => ({ ...prev, [field.id]: e.target.value }))}
                  />
                  {field.verified && <span className="text-xs text-green-600 flex items-center gap-1 mt-1"><CheckCircle className="h-3 w-3" /> Verified</span>}
                </div>
              )
            })}
          </div>
          <Separator className="my-4" />
          <div className="flex items-center gap-2">
            <Button className="flex-1 gap-1"><CheckCircle className="h-4 w-4" /> Approve All</Button>
            <Button variant="outline" className="flex-1">Approve with Changes</Button>
            <Button variant="destructive" size="icon"><XCircle className="h-4 w-4" /></Button>
          </div>
        </div>
      </Panel>

      <PanelResizeHandle className="w-1.5 bg-border hover:bg-primary/20 transition-colors" />

      {/* Right: Document Preview */}
      <Panel defaultSize="55%" minSize="30%">
        <div className="h-full bg-gray-100 flex flex-col">
          <div className="flex items-center justify-between px-4 py-2 bg-white border-b">
            <span className="text-sm font-medium">{doc.name}</span>
            <Button variant="ghost" size="sm" className="gap-1"><Eye className="h-4 w-4" /> Full View</Button>
          </div>
          <div className="flex-1 relative overflow-auto p-4">
            {/* Simulated document */}
            <div className="bg-white shadow-lg rounded-lg mx-auto" style={{ width: 595, minHeight: 842, padding: 60, position: 'relative' }}>
              <div className="text-xs text-gray-400 mb-8">DOCUMENT PREVIEW</div>
              <div className="space-y-4 text-sm text-gray-600">
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-5/6" />
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-8 mt-6" />
                <div className="h-4 bg-gray-100 rounded w-2/3" />
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-4/5" />
              </div>
              {/* Bounding box overlays */}
              {fields.map(field => field.boundingBox && (
                <div key={field.id}
                  className={cn('absolute border-2 rounded transition-all pointer-events-none',
                    hoveredField === field.id ? 'border-primary bg-primary/10' : 'border-transparent'
                  )}
                  style={{ left: field.boundingBox.x, top: field.boundingBox.y, width: field.boundingBox.width, height: field.boundingBox.height }} />
              ))}
            </div>
          </div>
        </div>
      </Panel>
    </PanelGroup>
  )
}

export function DocumentsScreen() {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('queue')

  const ingestionQueue = useMemo(() => documents.filter(d => ['queued', 'processing', 'classified'].includes(d.status)), [])
  const reviewQueue = useMemo(() => documents.filter(d => ['extracted', 'in_review'].includes(d.status)), [])
  const verified = useMemo(() => documents.filter(d => d.status === 'verified'), [])

  const selectedDocument = selectedDoc ? documents.find(d => d.id === selectedDoc) : null
  const showSplitView = selectedDocument && (selectedDocument.status === 'extracted' || selectedDocument.status === 'in_review')

  return (
    <div className="space-y-6">
      <SectionHeader title="Document Processing Center" description={`${documents.length} documents across all deals`}
        action={<Button size="sm" className="gap-1.5"><Upload className="h-4 w-4" /> Upload Document</Button>} />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">In Queue</div><div className="text-2xl font-bold mt-1">{ingestionQueue.length}</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Needs Review</div><div className="text-2xl font-bold mt-1 text-amber-600">{reviewQueue.length}</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Verified</div><div className="text-2xl font-bold mt-1 text-green-600">{verified.length}</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Total Documents</div><div className="text-2xl font-bold mt-1">{documents.length}</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Avg Accuracy</div><div className="text-2xl font-bold mt-1">93%</div></CardContent></Card>
      </div>

      {showSplitView ? (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Button variant="ghost" size="sm" onClick={() => setSelectedDoc(null)}>Back to Queue</Button>
            <span className="text-sm text-muted-foreground">{selectedDocument?.name}</span>
          </div>
          <Card className="overflow-hidden">
            <ExtractionReview documentId={selectedDoc!} />
          </Card>
        </div>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="queue">Ingestion Queue <Badge variant="secondary" className="ml-1.5 h-5 px-1.5 text-[10px]">{ingestionQueue.length}</Badge></TabsTrigger>
            <TabsTrigger value="review">Extraction Review <Badge variant="secondary" className="ml-1.5 h-5 px-1.5 text-[10px]">{reviewQueue.length}</Badge></TabsTrigger>
            <TabsTrigger value="verified">Verified <Badge variant="secondary" className="ml-1.5 h-5 px-1.5 text-[10px]">{verified.length}</Badge></TabsTrigger>
          </TabsList>
          <TabsContent value="queue">
            <Card><CardContent className="p-0"><DocumentList docs={ingestionQueue} selectedId={selectedDoc} onSelect={setSelectedDoc} /></CardContent></Card>
          </TabsContent>
          <TabsContent value="review">
            <Card><CardContent className="p-0"><DocumentList docs={reviewQueue} selectedId={selectedDoc} onSelect={setSelectedDoc} /></CardContent></Card>
          </TabsContent>
          <TabsContent value="verified">
            <Card><CardContent className="p-0"><DocumentList docs={verified} selectedId={selectedDoc} onSelect={setSelectedDoc} /></CardContent></Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
