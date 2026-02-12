import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { MyWorkScreen } from '@/screens/my-work/MyWorkScreen'
import { DealsListScreen } from '@/screens/deal/DealsListScreen'
import { DealLayout } from '@/screens/deal/DealLayout'
import { DealOverview } from '@/screens/deal/tabs/DealOverview'
import { DealTerms } from '@/screens/deal/tabs/DealTerms'
import { DealPositions } from '@/screens/deal/tabs/DealPositions'
import { DealServicing } from '@/screens/deal/tabs/DealServicing'
import { DealCovenants } from '@/screens/deal/tabs/DealCovenants'
import { DealNotices } from '@/screens/deal/tabs/DealNotices'
import { DealDocuments } from '@/screens/deal/tabs/DealDocuments'
import { DealActivity } from '@/screens/deal/tabs/DealActivity'
import { ServicingScreen } from '@/screens/servicing/ServicingScreen'
import { DocumentsScreen } from '@/screens/documents/DocumentsScreen'
import { AgencyScreen } from '@/screens/agency/AgencyScreen'
import { ReportsScreen } from '@/screens/reports/ReportsScreen'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <MyWorkScreen /> },
      { path: 'deals', element: <DealsListScreen /> },
      {
        path: 'deals/:dealId',
        element: <DealLayout />,
        children: [
          { index: true, element: <Navigate to="overview" replace /> },
          { path: 'overview', element: <DealOverview /> },
          { path: 'terms', element: <DealTerms /> },
          { path: 'positions', element: <DealPositions /> },
          { path: 'servicing', element: <DealServicing /> },
          { path: 'covenants', element: <DealCovenants /> },
          { path: 'notices', element: <DealNotices /> },
          { path: 'documents', element: <DealDocuments /> },
          { path: 'activity', element: <DealActivity /> },
        ],
      },
      { path: 'servicing', element: <ServicingScreen /> },
      { path: 'documents', element: <DocumentsScreen /> },
      { path: 'agency', element: <AgencyScreen /> },
      { path: 'reports', element: <ReportsScreen /> },
    ],
  },
])
