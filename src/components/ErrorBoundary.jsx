import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', background: '#ffcccc', color: 'black', minHeight: '100vh', zIndex: 99999, position: 'relative' }}>
          <h1>🛑 React App Crashed 🛑</h1>
          <p>Please copy this error and send it to your AI assistant:</p>
          <pre style={{ whiteSpace: 'pre-wrap', background: 'white', padding: '10px' }}>
            {this.state.error && this.state.error.toString()}
          </pre>
          <details style={{ whiteSpace: 'pre-wrap', background: 'white', padding: '10px', marginTop: '10px' }}>
            <summary>Component Stack Trace</summary>
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
