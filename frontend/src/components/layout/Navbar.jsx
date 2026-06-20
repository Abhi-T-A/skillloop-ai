import {
  FiMenu,
  FiMoon,
  FiSun,
} from "react-icons/fi";

import useAuth from "../../hooks/useAuth";
import useTheme from "../../hooks/useTheme";
import "./Navbar.css";

const Navbar = ({ onMenuClick }) => {
  const { user } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const firstName = user?.name?.split(" ")?.[0] || "Learner";

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button type="button" className="icon-button menu-toggle" onClick={onMenuClick}>
          <FiMenu aria-hidden="true" />
        </button>
        <div>
          <h1>Good morning, {firstName}</h1>
          <p>Keep learning, keep growing.</p>
        </div>
      </div>

      <div className="navbar-right">
        <button
          type="button"
          className="icon-button"
          onClick={toggleTheme}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
        </button>

        <div className="user-info">
          <h4>{user?.name || "SkillLoop User"}</h4>
          <span>{user?.email}</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
