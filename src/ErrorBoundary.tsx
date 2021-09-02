import React from 'react';

interface Iprops {}

interface Istate {
  hasError: boolean;
}

// reactc错误边界组件
class ErrorBoundary extends React.Component<Iprops, Istate> {
  constructor(props: Iprops) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    // console.log('error boundary');
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
