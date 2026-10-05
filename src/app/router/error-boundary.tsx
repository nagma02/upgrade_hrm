import { Component, type ErrorInfo, type ReactNode } from 'react'
import { ErrorState } from '@/components/feedback/error-state'

type Props = { children: ReactNode }
type State = { hasError: boolean }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Application error boundary caught an error', { error, errorInfo })
  }

  override render() {
    if (this.state.hasError) {
      return <ErrorState title="Application error" message="The application shell failed to render." />
    }

    return this.props.children
  }
}