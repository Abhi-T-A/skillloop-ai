import { useMemo, useState } from "react";
import { FiCheckCircle, FiMic } from "react-icons/fi";

import VivaCard from "../components/cards/VivaCard";
import EmptyState from "../components/common/EmptyState";
import ErrorMessage from "../components/common/ErrorMessage";
import Loader from "../components/common/Loader";
import useApi from "../hooks/useApi";
import { fetchPdfHistory } from "../services/pdfService";
import {
  createVivaSession,
  evaluateVivaSession,
  fetchVivaHistory,
} from "../services/vivaService";
import {
  formatDateTime,
  formatScore,
  getErrorText,
  getRecordId,
  pickField,
  toArray,
} from "../utils/helpers";

const getPdfTitle = (item) =>
  pickField(item, ["fileName", "filename", "name", "title"], "Uploaded PDF");

const getQuestionText = (item) => {
  if (typeof item === "string") {
    return item;
  }

  return pickField(item, ["question", "prompt", "text"], "");
};

const getSessionQuestions = (session) => {
  if (!session) {
    return [];
  }

  const questions = toArray(session?.questions || session);

  if (questions.length > 0) {
    return questions;
  }

  return session.question ? [session] : [];
};

const VivaModule = () => {
  const pdfHistoryApi = useApi(fetchPdfHistory, {
    defaultData: [],
    immediate: true,
  });
  const vivaHistoryApi = useApi(fetchVivaHistory, {
    defaultData: [],
    immediate: true,
  });
  const [selectedPdfId, setSelectedPdfId] = useState("");
  const [session, setSession] = useState(null);
  const [answers, setAnswers] = useState({});
  const [evaluations, setEvaluations] = useState({});
  const [starting, setStarting] = useState(false);
  const [evaluatingKey, setEvaluatingKey] = useState("");
  const [error, setError] = useState("");

  const pdfItems = useMemo(() => toArray(pdfHistoryApi.data), [pdfHistoryApi.data]);
  const vivaHistory = useMemo(() => toArray(vivaHistoryApi.data), [vivaHistoryApi.data]);
  const questions = useMemo(() => getSessionQuestions(session), [session]);

  const selectedPdf = pdfItems.find((item) => String(getRecordId(item)) === selectedPdfId);
  const topic =
    pickField(session, ["topic", "title"], "") ||
    (selectedPdf ? getPdfTitle(selectedPdf) : "");
  const evaluatedCount = Object.keys(evaluations).length;
  const averageEvaluationScore = Object.values(evaluations).reduce((total, item) => {
    const score = Number(pickField(item, ["score"], ""));
    return Number.isNaN(score) ? total : total + score;
  }, 0);
  const averageScore = evaluatedCount > 0 ? averageEvaluationScore / evaluatedCount : null;

  const handleStart = async () => {
    if (!selectedPdfId) {
      setError("Select a PDF to start viva practice.");
      return;
    }

    setStarting(true);
    setError("");
    setSession(null);
    setAnswers({});
    setEvaluations({});

    try {
      const response = await createVivaSession(selectedPdfId);
      setSession(response);
    } catch (err) {
      setError(getErrorText(err, "Viva session could not be started."));
    } finally {
      setStarting(false);
    }
  };

  const handleEvaluate = async (question, index) => {
    const key = String(getRecordId(question) || index);
    const userAnswer = answers[key]?.trim();
    const questionText = getQuestionText(question);

    if (!userAnswer) {
      setError("Enter your answer before evaluation.");
      return;
    }

    setEvaluatingKey(key);
    setError("");

    try {
      const response = await evaluateVivaSession({
        topic,
        question: questionText,
        userAnswer,
      });
      setEvaluations((currentEvaluations) => ({
        ...currentEvaluations,
        [key]: response,
      }));
      vivaHistoryApi.execute();
    } catch (err) {
      setError(getErrorText(err, "Evaluation failed."));
    } finally {
      setEvaluatingKey("");
    }
  };

  return (
    <section className="module-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Mock Viva</p>
          <h1>Practice viva questions</h1>
          <p>Start from an uploaded PDF and evaluate answers one at a time.</p>
        </div>
      </header>

      <div className="module-grid">
        <article className="module-card">
          <div className="form-grid">
            <label>
              PDF
              <select
                value={selectedPdfId}
                onChange={(event) => setSelectedPdfId(event.target.value)}
              >
                <option value="">Select PDF</option>
                {pdfItems.filter(getRecordId).map((item, index) => {
                  const id = getRecordId(item);
                  return (
                    <option key={`${id || index}`} value={String(id)}>
                      {getPdfTitle(item)}
                    </option>
                  );
                })}
              </select>
            </label>

            {error && <p className="form-error">{error}</p>}

            <button
              type="button"
              disabled={starting || !selectedPdfId}
              className="button button-primary"
              onClick={handleStart}
            >
              <FiMic aria-hidden="true" />
              {starting ? "Starting" : "Start viva"}
            </button>

            {selectedPdf && (
              <div className="state-message">
                <FiMic aria-hidden="true" />
                <div>
                  <h3>{getPdfTitle(selectedPdf)}</h3>
                  <p>Use this document to generate viva prompts and score your responses.</p>
                </div>
              </div>
            )}
          </div>
        </article>

        <article className="content-panel">
          <div className="panel-header">
            <div>
              <h2>Viva History</h2>
              <p>Your evaluated attempts.</p>
            </div>
          </div>

          {vivaHistoryApi.loading ? (
            <Loader label="Loading viva history" />
          ) : vivaHistoryApi.error ? (
            <ErrorMessage message={vivaHistoryApi.error} onRetry={vivaHistoryApi.execute} />
          ) : vivaHistory.length > 0 ? (
            <div className="resource-list">
              {vivaHistory.slice(0, 6).map((item, index) => (
                <VivaCard
                  key={`${getRecordId(item) || index}`}
                  title={pickField(item, ["topic", "title", "question"], "Viva attempt")}
                  detail={
                    pickField(item, ["score"], "") !== ""
                      ? `Score ${formatScore(pickField(item, ["score"], ""))}`
                      : pickField(item, ["feedback", "result"], "")
                  }
                  meta={formatDateTime(
                    pickField(item, ["attemptedAt", "createdAt", "date"], "")
                  )}
                />
              ))}
            </div>
          ) : (
            <EmptyState title="No viva attempts yet" />
          )}
        </article>
      </div>

      <article className="content-panel">
        <div className="panel-header">
          <div>
            <h2>Session Questions</h2>
            {topic && <p>{topic}</p>}
          </div>
        </div>

        {questions.length > 0 && (
          <div className="mini-stat-grid">
            <VivaCard
              title="Questions"
              detail={`${questions.length} prompts in this session`}
              meta="Session size"
            />
            <VivaCard
              title="Evaluated"
              detail={`${evaluatedCount} completed`}
              meta="Progress"
            />
            <VivaCard
              title="Average Score"
              detail={averageScore === null ? "--" : formatScore(averageScore)}
              meta="Current session"
            />
            <VivaCard
              title="Selected PDF"
              detail={selectedPdf ? getPdfTitle(selectedPdf) : "--"}
              meta="Source"
            />
          </div>
        )}

        {starting ? (
          <Loader label="Starting viva" />
        ) : questions.length > 0 ? (
          <div className="question-list">
            {questions.map((question, index) => {
              const key = String(getRecordId(question) || index);
              const evaluation = evaluations[key];
              const questionText = getQuestionText(question);

              return (
                <article className="question-card" key={key}>
                  <span>Question {index + 1}</span>
                  <h3>{questionText}</h3>
                  <textarea
                    value={answers[key] || ""}
                    onChange={(event) =>
                      setAnswers((currentAnswers) => ({
                        ...currentAnswers,
                        [key]: event.target.value,
                      }))
                    }
                  />
                  <div className="action-row">
                    <button
                      type="button"
                      className="button button-primary"
                      onClick={() => handleEvaluate(question, index)}
                      disabled={evaluatingKey === key}
                    >
                      <FiCheckCircle aria-hidden="true" />
                      {evaluatingKey === key ? "Evaluating" : "Evaluate"}
                    </button>
                  </div>

                  {evaluation && (
                    <div className="evaluation-result">
                      {pickField(evaluation, ["score"], "") !== "" && (
                        <strong>Score {formatScore(pickField(evaluation, ["score"], ""))}</strong>
                      )}
                      {pickField(evaluation, ["feedback", "message", "result"], "") && (
                        <p>{pickField(evaluation, ["feedback", "message", "result"], "")}</p>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        ) : (
          <EmptyState title="No viva session started" />
        )}
      </article>
    </section>
  );
};

export default VivaModule;
