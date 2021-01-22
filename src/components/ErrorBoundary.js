import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: '' };
  }
  static getDerivedStateFromError(error) {
    localStorage.error = error.message;
    window.location.href = '/error';
  }

  render() {
    return this.props.children;
  }
}
export default ErrorBoundary;
