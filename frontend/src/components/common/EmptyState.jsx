import { FiInbox } from "react-icons/fi";

const EmptyState = ({
  icon: Icon = FiInbox,
  title = "No data available",
  message,
  action,
}) => {
  return (
    <div className="state-message">
      <Icon aria-hidden="true" />
      <div>
        <h3>{title}</h3>
        {message && <p>{message}</p>}
      </div>
      {action}
    </div>
  );
};

export default EmptyState;
