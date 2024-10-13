import React from 'react';
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        if (error.message !== 'ResizeObserver loop completed with undelivered notifications.') {
            return { hasError: true };
        }
        return null;
    }

    componentDidCatch(error, errorInfo) {
        if (error.message === 'ResizeObserver loop completed with undelivered notifications.') {
            console.log('ResizeObserver error caught and suppressed');
        } else {
            console.error('Uncaught error:', error, errorInfo);
            // You can also send error reports to a service here
        }
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
