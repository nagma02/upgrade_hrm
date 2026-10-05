import { AppProviders } from '@/app/providers'
import { ErrorBoundary, RouterApp } from '@/app/router'
import { Toaster } from 'sonner'

export default function App() {
  return (
    <AppProviders>
      <ErrorBoundary>
        <RouterApp />
        <Toaster position="top-right" richColors />
      </ErrorBoundary>
    </AppProviders>
  )
}
