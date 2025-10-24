import { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-red-500" />
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-4">Oops! Something went wrong</h1>
            <p className="text-gray-400 mb-8">
              We're sorry for the inconvenience. An unexpected error occurred while loading this page.
            </p>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <div className="mb-6 p-4 bg-gray-900 rounded-lg text-left">
                <p className="text-sm text-red-400 font-mono break-all">
                  {this.state.error.toString()}
                </p>
              </div>
            )}

            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors font-medium"
            >
              <RefreshCcw className="w-5 h-5" />
              Reload Page
            </button>

            <p className="mt-6 text-sm text-gray-500">
              If the problem persists, please{" "}
              <a
                href="mailto:islamhafez806@gmail.com"
                className="text-indigo-400 hover:text-indigo-300 underline"
              >
                contact me
              </a>
              .
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
