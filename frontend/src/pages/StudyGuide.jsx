import { useMemo, useState } from "react";
import { FiBookOpen } from "react-icons/fi";

import EmptyState from "../components/common/EmptyState";
import ErrorMessage from "../components/common/ErrorMessage";
import Loader from "../components/common/Loader";
import useApi from "../hooks/useApi";
import {
  fetchStudyHistory,
  requestStudyGuide,
} from "../services/studyService";
import {
  formatDateTime,
  getErrorText,
  pickField,
  toArray,
} from "../utils/helpers";

const DIFFICULTIES = ["Easy", "Medium", "Hard"];

const getQuestionText = (item) => {
  if (typeof item === "string") {
    return item;
  }

  return pickField(item, ["question", "prompt"], "");
};

const StudyGuide = () => {
  const historyApi = useApi(fetchStudyHistory, {
    defaultData: [],
    immediate: true,
  });
  const [formData, setFormData] = useState({
    topic: "",
    difficulty: "Medium",
  });
  const [guide, setGuide] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const historyItems = useMemo(() => toArray(historyApi.data), [historyApi.data]);
  const questions = useMemo(() => toArray(guide?.questions || guide), [guide]);
  const suggestedTopics = useMemo(() => {
    const historyTopics = historyItems
      .map((item) => pickField(item, ["topic", "title", "name"], ""))
      .filter(Boolean);

    return Array.from(new Set(["Spring Boot", "Data Structures", "Operating Systems", ...historyTopics]))
      .slice(0, 6);
  }, [historyItems]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedTopic = formData.topic.trim();

    if (trimmedTopic.length < 3) {
      setError("Enter a topic with at least 3 characters.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await requestStudyGuide({
        ...formData,
        topic: trimmedTopic,
      });
      setGuide(response);
      historyApi.execute();
    } catch (err) {
      setError(getErrorText(err, "Study guide generation failed."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="module-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Study Guide</p>
          <h1>Generate a study guide</h1>
          <p>Create question-answer sets from your selected topic.</p>
        </div>
      </header>

      <div className="module-grid">
        <article className="module-card">
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="panel-header">
              <div>
                <h2>Create a guide</h2>
                <p>Start with a topic and choose the depth of your revision questions.</p>
              </div>
            </div>
            <label>
              Topic
              <input
                type="text"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Difficulty
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
              >
                {DIFFICULTIES.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
            </label>

            <div className="quick-chip-list">
              {suggestedTopics.map((topic) => (
                <button
                  type="button"
                  key={topic}
                  className="button button-secondary"
                  onClick={() =>
                    setFormData((currentData) => ({
                      ...currentData,
                      topic,
                    }))
                  }
                >
                  {topic}
                </button>
              ))}
            </div>

            {error && <p className="form-error">{error}</p>}

            <button type="submit" disabled={submitting} className="button button-primary">
              <FiBookOpen aria-hidden="true" />
              {submitting ? "Generating" : "Generate guide"}
            </button>
          </form>
        </article>

        <article className="module-card">
          <div className="panel-header">
            <div>
              <h2>Generated Questions</h2>
              {guide?.topic ? (
                <p>
                  {guide.topic} · {guide?.difficulty || formData.difficulty} · {questions.length} items
                </p>
              ) : (
                <p>Newly generated questions and answers appear here.</p>
              )}
            </div>
          </div>

          {questions.length > 0 ? (
            <div className="question-list">
              {questions.map((item, index) => (
                <article className="question-card" key={`${item.question || index}`}>
                  <span>Question {index + 1}</span>
                  <h3>{getQuestionText(item)}</h3>
                  <p>{pickField(item, ["answer", "response"], "")}</p>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState title="No generated guide yet" />
          )}
        </article>
      </div>

      <article className="content-panel history-panel">
        <div className="panel-header">
          <div>
            <h2>Study History</h2>
            <p>Your generated study guides.</p>
          </div>
        </div>

        {historyApi.loading ? (
          <Loader label="Loading study history" />
        ) : historyApi.error ? (
          <ErrorMessage message={historyApi.error} onRetry={historyApi.execute} />
        ) : historyItems.length > 0 ? (
          <div className="resource-list">
            {historyItems.map((item, index) => (
              <article className="resource-card" key={`${pickField(item, ["id"], index)}`}>
                <FiBookOpen aria-hidden="true" />
                <div>
                  <h3>{pickField(item, ["topic", "title", "name"], "Study guide")}</h3>
                  <p>{pickField(item, ["difficulty", "status"], "")}</p>
                  <span>{formatDateTime(pickField(item, ["createdAt", "date", "updatedAt"], ""))}</span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState title="No study history yet" />
        )}
      </article>
    </section>
  );
};

export default StudyGuide;
