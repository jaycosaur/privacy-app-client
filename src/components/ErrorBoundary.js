import React from 'react'
import Raven from 'raven-js'

export default class ErrorBoundary extends React.Component {
    state = {
        error: null
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error });
        Raven.captureException(error, { extra: errorInfo });
    }

    render() {
        if (this.state.error) {
            //render fallback UI
            return (
                <div
                className="snap"
                onClick={() => Raven.lastEventId() && Raven.showReportDialog()}>
                    <p>We're sorry — something's gone wrong.</p>
                    <p>Our team has been notified, but click here fill out a report.</p>
                </div>
            );
        } else {
            //when there's not an error, render children untouched
            return this.props.children;
        }
    }
}