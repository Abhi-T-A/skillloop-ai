import { FiMoon, FiSun } from "react-icons/fi";

import ErrorMessage from "../components/common/ErrorMessage";
import Loader from "../components/common/Loader";
import { BACKEND_URL } from "../config/env";
import useApi from "../hooks/useApi";
import useTheme from "../hooks/useTheme";
import { fetchDashboard } from "../services/dashboardService";

const Settings = () => {
  const { darkMode, toggleTheme } = useTheme();
  const dashboardApi = useApi(fetchDashboard, { immediate: true });

  return (
    <section className="module-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Settings</p>
          <h1>Workspace settings</h1>
          <p>Manage your local display preferences.</p>
        </div>
      </header>

      <div className="module-grid">
        <article className="content-panel">
          <div className="setting-row">
            <div>
              <h2>Theme</h2>
              <p>{darkMode ? "Dark mode is active." : "Light mode is active."}</p>
            </div>
            <button type="button" className="button button-primary" onClick={toggleTheme}>
              {darkMode ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
              {darkMode ? "Light mode" : "Dark mode"}
            </button>
          </div>
        </article>

        <article className="content-panel">
          <div className="panel-header">
            <div>
              <h2>Backend Connection</h2>
              <p>{BACKEND_URL}</p>
            </div>
          </div>
          {dashboardApi.loading ? (
            <Loader label="Checking connection" />
          ) : dashboardApi.error ? (
            <ErrorMessage message={dashboardApi.error} onRetry={dashboardApi.execute} />
          ) : (
            <div className="connection-status">
              <span aria-hidden="true" />
              <strong>Connected</strong>
            </div>
          )}
        </article>
      </div>
    </section>
  );
};

export default Settings;
