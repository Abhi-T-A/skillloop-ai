import {
  FiAward,
  FiBookOpen,
  FiFileText,
  FiMic,
} from "react-icons/fi";

import StatCard from "../components/cards/StatCard";
import ErrorMessage from "../components/common/ErrorMessage";
import Loader from "../components/common/Loader";
import useAuth from "../hooks/useAuth";
import useApi from "../hooks/useApi";
import { fetchDashboard } from "../services/dashboardService";
import { formatDateTime } from "../utils/helpers";

const Profile = () => {
  const { user } = useAuth();
  const dashboardApi = useApi(fetchDashboard, { immediate: true });

  if (dashboardApi.loading) {
    return <Loader label="Loading profile" />;
  }

  return (
    <section className="module-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Profile</p>
          <h1>{user?.name || "SkillLoop User"}</h1>
          <p>{user?.email}</p>
        </div>
      </header>

      <div className="module-grid">
        <article className="content-panel profile-panel">
          <div>
            <span className="profile-avatar">{user?.name?.charAt(0) || "S"}</span>
          </div>
          <dl className="profile-list">
            <div>
              <dt>Name</dt>
              <dd>{user?.name || "--"}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{user?.email || "--"}</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>{user?.role || "--"}</dd>
            </div>
            <div>
              <dt>Joined</dt>
              <dd>{formatDateTime(user?.createdAt)}</dd>
            </div>
          </dl>
        </article>

        <article className="content-panel">
          <div className="panel-header">
            <div>
              <h2>Learning Snapshot</h2>
              <p>Your account activity totals.</p>
            </div>
          </div>
          {dashboardApi.error ? (
            <ErrorMessage message={dashboardApi.error} onRetry={dashboardApi.execute} />
          ) : (
            <div className="mini-stat-grid">
              <StatCard title="Study" value={dashboardApi.data?.totalStudySessions} icon={FiBookOpen} />
              <StatCard title="PDFs" value={dashboardApi.data?.totalPdfUploads} icon={FiFileText} accent="blue" />
              <StatCard title="Viva" value={dashboardApi.data?.totalVivaAttempts} icon={FiMic} accent="green" />
              <StatCard title="Average" value={dashboardApi.data?.averageScore} icon={FiAward} accent="amber" />
            </div>
          )}
        </article>
      </div>
    </section>
  );
};

export default Profile;
