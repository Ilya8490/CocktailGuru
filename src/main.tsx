import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { RouteLoadingFallback } from './components/ui/LoadingStates'
import './styles/globals.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<RouteLoadingFallback />}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>,
)
