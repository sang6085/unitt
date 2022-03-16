import React from "react";
import FallBackComponent from "../components/FallBackComponent/FallBackComponent";

const ErrorBoundaryContext = React.createContext(() => {});

export class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error: any) {
    console.warn({ error });
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.warn({ error, errorInfo });
  }

  triggerError: any = ({ error, errorInfo }: any) => {
    this.setState({ hasError: true });
    console.warn({ error, errorInfo });
  };

  resetError = () => this.setState({ hasError: false });
  
  render() {
    return (
      <ErrorBoundaryContext.Provider value={this.triggerError}>
        {this.state.hasError ? <FallBackComponent /> : this.props.children}
      </ErrorBoundaryContext.Provider>
    );
  }
}
