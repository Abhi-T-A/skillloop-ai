import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";

const ErrorMessage = ({
  title = "Unable to load data",
  message,
  onRetry,
}) => {
  return (
    <div className="state-message state-message-error" role="alert">
      <FiAlertCircle aria-hidden="true" />
      <div>
        <h3>{title}</h3>
        <p>{message || "Please try again."}</p>
      </div>
      {onRetry && (
        <button type="button" className="button button-secondary" onClick={onRetry}>
          <FiRefreshCw aria-hidden="true" />
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
