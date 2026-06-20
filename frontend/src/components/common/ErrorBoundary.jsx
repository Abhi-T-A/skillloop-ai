import { Component } from "react";
import { FiAlertTriangle } from "react-icons/fi";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: "",
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorMessage: error?.message || "The application ran into an unexpected error.",
    };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error("SkillLoop UI error:", error, info);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    const { hasError, errorMessage } = this.state;

    if (hasError) {
      return (
        <main className="not-found-page">
          <section className="content-panel">
            <p className="eyebrow">Application Error</p>
            <FiAlertTriangle aria-hidden="true" size={28} />
            <h1>Something went wrong</h1>
            <p>{errorMessage}</p>
            <button type="button" className="button button-primary" onClick={this.handleReload}>
              Reload application
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
