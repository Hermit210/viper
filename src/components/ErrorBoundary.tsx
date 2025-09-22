import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

type Props = { children: ReactNode }

type State = { hasError: boolean; error?: Error }

class ErrorBoundary extends Component<Props, State> {
	state: State = { hasError: false }

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error }
	}

	componentDidCatch(error: Error, info: ErrorInfo) {
		console.error('App crashed:', error, info)
	}

	render() {
		if (this.state.hasError) {
			return (
				<div style={{ padding: 20, color: 'white' }}>
					<div className="panel" style={{ padding: 16 }}>
						<h3 className="brand" style={{ marginTop: 0 }}>Something went wrong</h3>
						<p className="subtle">Please refresh the page. If the issue persists in production, ensure environment variables are set (e.g., VITE_WC_PROJECT_ID).</p>
					</div>
				</div>
			)
		}
		return this.props.children
	}
}

export default ErrorBoundary