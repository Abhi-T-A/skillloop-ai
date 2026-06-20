import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiAward,
  FiBookOpen,
  FiFileText,
  FiMic,
} from "react-icons/fi";

import StatCard from "../components/cards/StatCard";
import AnalyticsChart from "../components/charts/AnalyticsChart";
import ProgressChart from "../components/charts/ProgressChart";
import EmptyState from "../components/common/EmptyState";
import ErrorMessage from "../components/common/ErrorMessage";
import Loader from "../components/common/Loader";
import useApi from "../hooks/useApi";
import { fetchDashboard } from "../services/dashboardService";
import { fetchPdfHistory } from "../services/pdfService";
import { fetchStudyHistory } from "../services/studyService";
import {
  fetchVivaAnalytics,
  fetchVivaHistory,
} from "../services/vivaService";
import {
  formatDateTime,
  formatScore,
  pickField,
  toArray,
} from "../utils/helpers";

const getNumericValue = (value) => {
  const numberValue = Number(value);
  return Number.isNaN(numberValue) ? null : numberValue;
};

const createMetricChartData = (dashboardData) => {
  if (!dashboardData) {
    return [];
  }

  return [
    ["Study sessions", dashboardData.totalStudySessions],
    ["PDF uploads", dashboardData.totalPdfUploads],
    ["Viva attempts", dashboardData.totalVivaAttempts],
    ["Average score", dashboardData.averageScore],
  ]
    .map(([name, value]) => ({ name, value: getNumericValue(value) }))
    .filter((item) => item.value !== null);
};

const createRecentActivity = (studyHistory, pdfHistory, vivaHistory) => {
  const studyItems = toArray(studyHistory).map((item) => ({
    type: "Study",
    title: pickField(item, ["topic", "title", "name"], "Study guide"),
    detail: pickField(item, ["difficulty", "status", "summary"], ""),
    date: pickField(item, ["createdAt", "created_at", "date", "updatedAt"], ""),
  }));

  const pdfItems = toArray(pdfHistory).map((item) => ({
    type: "PDF",
    title: pickField(item, ["fileName", "filename", "name", "title"], "PDF upload"),
    detail: pickField(item, ["status", "description"], ""),
    date: pickField(item, ["uploadedAt", "createdAt", "date", "updatedAt"], ""),
  }));

  const vivaItems = toArray(vivaHistory).map((item) => ({
    type: "Viva",
    title: pickField(item, ["topic", "title", "question"], "Viva attempt"),
    detail: pickField(item, ["score", "feedback", "result"], ""),
    date: pickField(item, ["attemptedAt", "createdAt", "date", "updatedAt"], ""),
  }));

  return [...studyItems, ...pdfItems, ...vivaItems]
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
    .slice(0, 6);
};

const createWorkflowCards = (dashboardData, recentActivity) => [
  {
    title: "Generate a study guide",
    description: "Create topic-based questions to start your revision plan.",
    path: "/study-guide",
    metric: `${dashboardData?.totalStudySessions || 0} guides`,
  },
  {
    title: "Upload a PDF",
    description: "Turn your notes or slides into reusable learning material.",
    path: "/pdf-learning",
    metric: `${dashboardData?.totalPdfUploads || 0} PDFs`,
  },
  {
    title: "Practice a mock viva",
    description: "Answer AI-generated viva questions and review your score.",
    path: "/mock-viva",
    metric: `${dashboardData?.totalVivaAttempts || 0} attempts`,
  },
  {
    title: "Review analytics",
    description: recentActivity.length
      ? "Use your latest activity and score trends to plan the next session."
      : "Analytics will appear here after your first completed sessions.",
    path: "/analytics",
    metric: "Learning insights",
  },
];

const Dashboard = () => {
  const dashboardApi = useApi(fetchDashboard, { immediate: true });
  const studyHistoryApi = useApi(fetchStudyHistory, {
    defaultData: [],
    immediate: true,
  });
  const pdfHistoryApi = useApi(fetchPdfHistory, {
    defaultData: [],
    immediate: true,
  });
  const vivaHistoryApi = useApi(fetchVivaHistory, {
    defaultData: [],
    immediate: true,
  });
  const vivaAnalyticsApi = useApi(fetchVivaAnalytics, {
    immediate: true,
  });

  const chartData = useMemo(
    () => createMetricChartData(dashboardApi.data),
    [dashboardApi.data]
  );

  const recentActivity = useMemo(
    () =>
      createRecentActivity(
        studyHistoryApi.data,
        pdfHistoryApi.data,
        vivaHistoryApi.data
      ),
    [pdfHistoryApi.data, studyHistoryApi.data, vivaHistoryApi.data]
  );

  if (dashboardApi.loading) {
    return <Loader label="Loading dashboard" />;
  }

  if (dashboardApi.error) {
    return (
      <ErrorMessage
        title="Dashboard unavailable"
        message={dashboardApi.error}
        onRetry={dashboardApi.execute}
      />
    );
  }

  const dashboardData = dashboardApi.data || {};
  const vivaAnalytics = vivaAnalyticsApi.data || {};
  const workflowCards = createWorkflowCards(dashboardData, recentActivity);
  const insightItems = [
    {
      label: "Study coverage",
      value:
        dashboardData.totalStudySessions > 0
          ? `${dashboardData.totalStudySessions} topic sessions completed`
          : "No study sessions yet",
    },
    {
      label: "Document readiness",
      value:
        dashboardData.totalPdfUploads > 0
          ? `${dashboardData.totalPdfUploads} PDF resources available`
          : "Upload your first PDF to unlock learning questions",
    },
    {
      label: "Viva performance",
      value:
        vivaAnalytics.totalAttempts > 0
          ? `Average score ${formatScore(vivaAnalytics.averageScore)} across ${vivaAnalytics.totalAttempts} attempts`
          : "Start a mock viva to receive scored feedback",
    },
  ];

  return (
    <section className="dashboard-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Learning command center</h1>
          <p>Track all required modules from one place and jump back into your next task.</p>
        </div>
      </header>

      <div className="summary-grid">
        <StatCard
          title="Study Sessions"
          value={dashboardData.totalStudySessions}
          icon={FiBookOpen}
          accent="purple"
        />
        <StatCard
          title="PDFs Uploaded"
          value={dashboardData.totalPdfUploads}
          icon={FiFileText}
          accent="blue"
        />
        <StatCard
          title="Viva Attempts"
          value={dashboardData.totalVivaAttempts}
          icon={FiMic}
          accent="green"
        />
        <StatCard
          title="Average Score"
          value={dashboardData.averageScore}
          icon={FiAward}
          accent="amber"
        />
      </div>

      <div className="dashboard-grid">
        <article className="content-panel">
          <div className="panel-header">
            <div>
              <h2>Recommended Workflow</h2>
              <p>Move through the learning loop defined by the project requirements.</p>
            </div>
          </div>
          <div className="workflow-grid">
            {workflowCards.map((card) => (
              <Link className="workflow-card" key={card.path} to={card.path}>
                <div>
                  <strong>{card.title}</strong>
                  <p>{card.description}</p>
                </div>
                <span>{card.metric}</span>
                <FiArrowRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </article>

        <article className="content-panel learning-panel">
          <div className="panel-header">
            <div>
              <h2>Learning Progress</h2>
              <p>Your score range and overall momentum.</p>
            </div>
          </div>
          <div className="progress-summary">
            <ProgressChart score={dashboardData.averageScore} />
            <div className="score-list">
              <div>
                <span>Average score</span>
                <strong>{formatScore(dashboardData.averageScore)}</strong>
              </div>
              <div>
                <span>Highest score</span>
                <strong>{formatScore(dashboardData.highestScore)}</strong>
              </div>
              <div>
                <span>Lowest score</span>
                <strong>{formatScore(dashboardData.lowestScore)}</strong>
              </div>
            </div>
          </div>
        </article>

        <article className="chart-panel">
          <div className="panel-header">
            <div>
              <h2>Performance Overview</h2>
              <p>Your current learning totals.</p>
            </div>
          </div>
          <AnalyticsChart data={chartData} />
        </article>

        <article className="content-panel">
          <div className="panel-header">
            <div>
              <h2>Recent Activity</h2>
              <p>Study, PDF, and viva history.</p>
            </div>
          </div>
          {studyHistoryApi.loading || pdfHistoryApi.loading || vivaHistoryApi.loading ? (
            <Loader label="Loading activity" />
          ) : recentActivity.length > 0 ? (
            <div className="activity-list">
              {recentActivity.map((item, index) => (
                <div className="activity-item" key={`${item.type}-${item.title}-${index}`}>
                  <span>{item.type}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.detail || formatDateTime(item.date)}</p>
                  </div>
                  <time>{formatDateTime(item.date)}</time>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title="No recent activity" />
          )}
        </article>

        <article className="content-panel">
          <div className="panel-header">
            <div>
              <h2>Requirement Coverage</h2>
              <p>Quick read on the core modules expected in this release.</p>
            </div>
          </div>
          <div className="score-list">
            {insightItems.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="content-panel">
          <div className="panel-header">
            <div>
              <h2>Viva Statistics</h2>
              <p>Your viva score summary.</p>
            </div>
          </div>
          {vivaAnalyticsApi.loading ? (
            <Loader label="Loading viva statistics" />
          ) : vivaAnalyticsApi.error ? (
            <ErrorMessage message={vivaAnalyticsApi.error} onRetry={vivaAnalyticsApi.execute} />
          ) : (
            <div className="mini-stat-grid">
              <StatCard title="Attempts" value={vivaAnalytics.totalAttempts} icon={FiMic} />
              <StatCard title="Average" value={vivaAnalytics.averageScore} icon={FiAward} />
              <StatCard title="Highest" value={vivaAnalytics.highestScore} icon={FiAward} />
              <StatCard title="Lowest" value={vivaAnalytics.lowestScore} icon={FiAward} />
            </div>
          )}
        </article>
      </div>
    </section>
  );
};

export default Dashboard;
