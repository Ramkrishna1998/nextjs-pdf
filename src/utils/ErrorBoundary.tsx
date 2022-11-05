import { Component, ErrorInfo, ReactNode } from 'react';
import { Logger } from './logger';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    Logger.error('error: ', error);
    Logger.error('errorInfo:  ', JSON.stringify(errorInfo));
    Logger.error('componentStack: ', errorInfo.componentStack);
  }

  public render(): ReactNode {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return children;
  }
}

export default ErrorBoundary;
