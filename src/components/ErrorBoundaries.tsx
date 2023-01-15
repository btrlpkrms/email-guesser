import * as React from 'react'

/**
 * Handle on error in any component.
 */
export class ErrorBoundaries extends React.Component<any, any> {
    state = {
        error: null
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        this.setState({error})
    }

    render() {
        return this.state.error == null ? this.props.children : <>Error</>
    }
}