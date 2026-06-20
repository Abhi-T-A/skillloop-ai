import { useMemo } from "react";
import {
  FiAward,
  FiBarChart2,
  FiMic,
} from "react-icons/fi";

import StatCard from "../components/cards/StatCard";
import AnalyticsChart from "../components/charts/AnalyticsChart";
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
  formatDate,
  getRecordId,
  pickField,
  toArray,
} from "../utils/helpers";

const toNumberOrNull = (value) => {
  const numericValue = Number(value);
  return Number.isNaN(numericValue) ? null : numericValue;
};

const Analytics = () => {
  const dashboardApi = useApi(fetchDashboard, { immediate: true });
  const vivaAnalyticsApi = useApi(fetchVivaAnalytics, { immediate: true });
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

  const summaryData = useMemo(() => {
    const dashboard = dashboardApi.data || {};
    const viva = vivaAnalyticsApi.data || {};

    return [
      ["Study sessions", dashboard.totalStudySessions],
      ["PDF uploads", dashboard.totalPdfUploads],
      ["Viva attempts", viva.totalAttempts ?? dashboard.totalVivaAttempts],
      ["Average score", viva.averageScore ?? dashboard.averageScore],
      ["Highest score", viva.highestScore ?? dashboard.highestScore],
      ["Lowest score", viva.lowestScore ?? dashboard.lowestScore],
    ]
      .map(([name, value]) => ({ name, value: toNumberOrNull(value) }))
      .filter((item) => item.value !== null);
  }, [dashboardApi.data, vivaAnalyticsApi.data]);

  const performanceData = useMemo(() => {
    return toArray(vivaHistoryApi.data)
      .map((item, index) => {
        const score = toNumberOrNull(pickField(item, ["score", "marks", "resultScore"], ""));
        const date = pickField(item, ["attemptedAt", "createdAt", "date"], "");

        if (score === null) {
          return null;
        }

        return {
          id: getRecordId(item) || index,
          name: date ? formatDate(date) : `Attempt ${index + 1}`,
          score,
        };
      })
      .filter(Boolean);
  }, [vivaHistoryApi.data]);

  const activityMixData = useMemo(
    () => [
      { name: "Study", value: toArray(studyHistoryApi.data).length },
      { name: "PDF", value: toArray(pdfHistoryApi.data).length },
      { name: "Viva", value: toArray(vivaHistoryApi.data).length },
    ].filter((item) => item.value > 0),
    [pdfHistoryApi.data, studyHistoryApi.data, vivaHistoryApi.data]
  );

  const recentScoreCards = useMemo(
    () => performanceData.slice(-4).reverse(),
    [performanceData]
  );

  if (dashboardApi.loading || vivaAnalyticsApi.loading) {
    return <Loader label="Loading analytics" />;
  }

  if (dashboardApi.error) {
    return (
      <ErrorMessage
        title="Analytics unavailable"
        message={dashboardApi.error}
        onRetry={dashboardApi.execute}
      />
    );
  }

  const dashboard = dashboardApi.data || {};
  const viva = vivaAnalyticsApi.data || {};

  return (
    <section className="module-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Analytics</p>
          <h1>Learning performance</h1>
          <p>Score, session, and viva trends from your activity.</p>
        </div>
      </header>

      <div className="summary-grid">
        <StatCard title="Total Sessions" value={dashboard.totalStudySessions} icon={FiBarChart2} />
        <StatCard title="Viva Attempts" value={viva.totalAttempts} icon={FiMic} accent="green" />
        <StatCard title="Average Score" value={viva.averageScore} icon={FiAward} accent="amber" />
        <StatCard title="Highest Score" value={viva.highestScore} icon={FiAward} accent="purple" />
      </div>

      <div className="module-grid">
        <article className="chart-panel">
          <div className="panel-header">
            <div>
              <h2>Summary Metrics</h2>
              <p>Your current totals.</p>
            </div>
          </div>
          <AnalyticsChart data={summaryData} />
        </article>

        <article className="chart-panel">
          <div className="panel-header">
            <div>
              <h2>Activity Mix</h2>
              <p>How your current history is distributed across modules.</p>
            </div>
          </div>
          {(studyHistoryApi.loading || pdfHistoryApi.loading || vivaHistoryApi.loading) ? (
            <Loader label="Loading activity mix" />
          ) : activityMixData.length > 0 ? (
            <AnalyticsChart data={activityMixData} />
          ) : (
            <EmptyState title="No activity recorded yet" />
          )}
        </article>
      </div>

      <div className="module-grid">
        <article className="chart-panel">
          <div className="panel-header">
            <div>
              <h2>Viva Score Trend</h2>
              <p>Scores from evaluated viva attempts.</p>
            </div>
          </div>
          {vivaHistoryApi.loading ? (
            <Loader label="Loading viva trend" />
          ) : vivaHistoryApi.error ? (
            <ErrorMessage message={vivaHistoryApi.error} onRetry={vivaHistoryApi.execute} />
          ) : performanceData.length > 0 ? (
            <AnalyticsChart data={performanceData} dataKey="score" type="line" />
          ) : (
            <EmptyState title="No viva scores yet" />
          )}
        </article>

        <article className="content-panel">
          <div className="panel-header">
            <div>
              <h2>Recent Scored Attempts</h2>
              <p>The latest evaluated viva sessions in reverse order.</p>
            </div>
          </div>
          {recentScoreCards.length > 0 ? (
            <div className="resource-list">
              {recentScoreCards.map((item) => (
                <article className="resource-card" key={item.id}>
                  <FiAward aria-hidden="true" />
                  <div>
                    <h3>{item.name}</h3>
                    <p>Score {item.score}</p>
                    <span>Tracked in analytics</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState title="No recent scored attempts" />
          )}
        </article>
      </div>
    </section>
  );
};

export default Analytics;
