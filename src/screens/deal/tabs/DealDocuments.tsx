import { useParams, useNavigate } from 'react-router-dom'
import { FileText, ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { ConfidenceBadge } from '@/components/shared/ConfidenceBadge'
import { DateDisplay } from '@/components/shared/DateDisplay'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { getDocumentsByDealId } from '@/data'

export function DealDocuments() {
  const { dealId } = useParams<{ dealId: string }>()
  const navigate = useNavigate()
  const documents = getDocumentsByDealId(dealId!)

  return (
    <div className="space-y-6">
      <SectionHeader title="Documents" description={`${documents.length} documents`}
        action={<Button size="sm" variant="outline" className="gap-1.5" onClick={() => navigate('/documents')}>
          <ExternalLink className="h-4 w-4" /> Document Center
        </Button>} />

      <Card>
        <CardContent className="p-0 divide-y">
          {documents.map(doc => (
            <div key={doc.id} className="flex items-center gap-4 px-4 py-3 hover:bg-muted/50 cursor-pointer" onClick={() => navigate(`/documents?doc=${doc.id}`)}>
              <div className="h-9 w-9 rounded-lg bg-blue-50 flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{doc.name}</div>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                  <span className="capitalize">{doc.type.replace(/_/g, ' ')}</span>
                  {doc.pages && <span>{doc.pages} pages</span>}
                  {doc.size && <span>{doc.size}</span>}
                </div>
              </div>
              <div className="flex items-center gap-3">
                {doc.confidence != null && <ConfidenceBadge score={doc.confidence} />}
                <DateDisplay date={doc.uploadDate} />
                <StatusBadge status={doc.status} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
