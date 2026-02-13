import { Link } from 'react-router-dom'

export function DealLink({ dealId, children, className = '' }: { dealId: string; children: React.ReactNode; className?: string }) {
  return (
    <Link to={`/deals/${dealId}/overview`} className={`text-primary hover:underline font-medium ${className}`}>
      {children}
    </Link>
  )
}

export function BorrowerLink({ borrowerId, children, className = '' }: { borrowerId: string; children: React.ReactNode; className?: string }) {
  return (
    <Link to={`/deals?borrower=${borrowerId}`} className={`text-primary hover:underline ${className}`}>
      {children}
    </Link>
  )
}

export function LenderLink({ lenderId, children, className = '' }: { lenderId: string; children: React.ReactNode; className?: string }) {
  return (
    <Link to={`/agency?lender=${lenderId}`} className={`text-primary hover:underline ${className}`}>
      {children}
    </Link>
  )
}

export function DocumentLink({ documentId, children, className = '' }: { documentId: string; children: React.ReactNode; className?: string }) {
  return (
    <Link to={`/documents/${documentId}/review`} className={`text-primary hover:underline ${className}`}>
      {children}
    </Link>
  )
}
