import { joinClasses } from "../../utils/helpers";

const Loader = ({ fullScreen = false, label = "Loading" }) => {
  return (
    <div className={joinClasses("loader-wrap", fullScreen && "loader-fullscreen")}>
      <span className="loader-spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
};

export default Loader;
