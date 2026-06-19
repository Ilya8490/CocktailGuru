import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { ComingSoonPage } from './pages/ComingSoonPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'

export const routes: RouteObject[] = [
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'builder', element: <ComingSoonPage eyebrow="The next pour" title="The atelier is being prepared" /> },
      { path: 'library', element: <ComingSoonPage eyebrow="The collection" title="The collection is being curated" /> },
      { path: 'favorites', element: <ComingSoonPage eyebrow="Saved for later" title="Your private selection is coming" /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]

export const router = createBrowserRouter(routes)
