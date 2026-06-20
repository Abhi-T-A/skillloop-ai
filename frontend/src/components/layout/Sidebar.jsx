import { NavLink, useNavigate } from "react-router-dom";
import {
  FiLogOut,
  FiX,
} from "react-icons/fi";

import { APP_NAME } from "../../config/env";
import useAuth from "../../hooks/useAuth";
import { SIDEBAR_MENU } from "../../utils/constants";
import { joinClasses } from "../../utils/helpers";
import "./Sidebar.css";

const Sidebar = ({ open, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className={joinClasses("sidebar", open && "sidebar-open")}>
      <div>
        <div className="sidebar-head">
          <NavLink to="/dashboard" className="logo" onClick={onClose}>
            <div className="logo-icon">SL</div>
            <div>
              <h2>{APP_NAME}</h2>
              <p>Learn smarter. Score higher.</p>
            </div>
          </NavLink>

          <button type="button" className="icon-button sidebar-close" onClick={onClose}>
            <FiX aria-hidden="true" />
          </button>
        </div>

        <nav className="sidebar-menu">
          {SIDEBAR_MENU.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  isActive ? "menu-item active" : "menu-item"
                }
              >
                <Icon aria-hidden="true" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="premium-card">
        <div>
          <span>{user?.name || "Learner"}</span>
          <small>{user?.email || "Signed in"}</small>
        </div>
        <button type="button" className="button button-ghost" onClick={handleLogout}>
          <FiLogOut aria-hidden="true" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
