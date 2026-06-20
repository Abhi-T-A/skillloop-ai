import { useMemo, useState } from "react";
import { FiFileText, FiUploadCloud } from "react-icons/fi";

import PdfCard from "../components/cards/PdfCard";
import EmptyState from "../components/common/EmptyState";
import ErrorMessage from "../components/common/ErrorMessage";
import Loader from "../components/common/Loader";
import useApi from "../hooks/useApi";
import {
  fetchPdfHistory,
  fetchPdfQuestions,
  requestPdfQuestions,
  uploadPdfFile,
} from "../services/pdfService";
import {
  formatDateTime,
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

const PDFModule = () => {
  const historyApi = useApi(fetchPdfHistory, {
    defaultData: [],
    immediate: true,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPdfId, setSelectedPdfId] = useState("");
  const [uploading, setUploading] = useState(false);
  const [questionLoading, setQuestionLoading] = useState(false);
  const [questionsResponse, setQuestionsResponse] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState("");

  const pdfItems = useMemo(() => toArray(historyApi.data), [historyApi.data]);
  const questions = useMemo(
    () => toArray(questionsResponse?.questions || questionsResponse),
    [questionsResponse]
  );
  const selectedPdf = pdfItems.find((item) => String(getRecordId(item)) === selectedPdfId);

  const handleSelectPdf = (value) => {
    setSelectedPdfId(value);
    setQuestionsResponse(null);
    setStatusMessage("");
    setError("");
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setError("Choose a PDF file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setUploading(true);
    setError("");
    setStatusMessage("");

    try {
      const response = await uploadPdfFile(formData);
      const uploadedId = getRecordId(response);
      if (uploadedId) {
        setSelectedPdfId(String(uploadedId));
      }
      setStatusMessage("PDF uploaded successfully.");
      await historyApi.execute();
    } catch (err) {
      setError(getErrorText(err, "PDF upload failed."));
    } finally {
      setUploading(false);
    }
  };

  const handleGenerateQuestions = async () => {
    if (!selectedPdfId) {
      setError("Select a PDF from your history.");
      return;
    }

    setQuestionLoading(true);
    setError("");
    setStatusMessage("");

    try {
      await requestPdfQuestions(selectedPdfId);
      const response = await fetchPdfQuestions(selectedPdfId);
      setQuestionsResponse(response);
      setStatusMessage("Questions generated successfully.");
    } catch (err) {
      setError(getErrorText(err, "Question generation failed."));
    } finally {
      setQuestionLoading(false);
    }
  };

  const handleLoadQuestions = async () => {
    if (!selectedPdfId) {
      setError("Select a PDF from your history.");
      return;
    }

    setQuestionLoading(true);
    setError("");

    try {
      const response = await fetchPdfQuestions(selectedPdfId);
      setQuestionsResponse(response);
    } catch (err) {
      setError(getErrorText(err, "Questions could not be loaded."));
    } finally {
      setQuestionLoading(false);
    }
  };

  return (
    <section className="module-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">PDF Learning</p>
          <h1>Learn from PDFs</h1>
          <p>Upload a PDF and generate questions from your document.</p>
        </div>
      </header>

      <div className="module-grid">
        <article className="module-card">
          <form onSubmit={handleUpload} className="form-grid">
            <label>
              PDF file
              <input
                type="file"
                accept="application/pdf"
                onChange={(event) => setSelectedFile(event.target.files?.[0] || null)}
              />
            </label>

            {error && <p className="form-error">{error}</p>}
            {statusMessage && <p className="form-success">{statusMessage}</p>}

            <button type="submit" disabled={uploading} className="button button-primary">
              <FiUploadCloud aria-hidden="true" />
              {uploading ? "Uploading" : "Upload PDF"}
            </button>
          </form>
        </article>

        <article className="module-card">
          <div className="panel-header">
            <div>
              <h2>Question Tools</h2>
              <p>Select one of your uploaded PDFs.</p>
            </div>
          </div>

          <div className="form-grid">
            <label>
              PDF
              <select
                value={selectedPdfId}
                onChange={(event) => handleSelectPdf(event.target.value)}
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

            <div className="action-row">
              <button
                type="button"
                className="button button-primary"
                onClick={handleGenerateQuestions}
                disabled={questionLoading || !selectedPdfId}
              >
                <FiFileText aria-hidden="true" />
                {questionLoading ? "Working" : "Generate questions"}
              </button>
              <button
                type="button"
                className="button button-secondary"
                onClick={handleLoadQuestions}
                disabled={questionLoading || !selectedPdfId}
              >
                Load questions
              </button>
            </div>

            {selectedPdf && (
              <div className="state-message">
                <FiFileText aria-hidden="true" />
                <div>
                  <h3>{getPdfTitle(selectedPdf)}</h3>
                  <p>
                    Uploaded {formatDateTime(pickField(selectedPdf, ["uploadedAt", "createdAt", "date"], ""))}
                  </p>
                </div>
              </div>
            )}
          </div>
        </article>
      </div>

      <div className="module-grid">
        <article className="content-panel">
          <div className="panel-header">
            <div>
              <h2>PDF History</h2>
              <p>Your uploaded learning files.</p>
            </div>
          </div>

          {historyApi.loading ? (
            <Loader label="Loading PDF history" />
          ) : historyApi.error ? (
            <ErrorMessage message={historyApi.error} onRetry={historyApi.execute} />
          ) : pdfItems.length > 0 ? (
            <div className="resource-list">
              {pdfItems.map((item, index) => {
                const id = getRecordId(item);
                return (
                  <PdfCard
                    key={`${id || index}`}
                    title={getPdfTitle(item)}
                    detail={pickField(item, ["status", "description"], "")}
                    meta={formatDateTime(
                      pickField(item, ["uploadedAt", "createdAt", "date"], "")
                    )}
                    action={
                      id ? (
                        <button
                          type="button"
                          className="button button-secondary"
                          onClick={() => handleSelectPdf(String(id))}
                        >
                          Select
                        </button>
                      ) : null
                    }
                  />
                );
              })}
            </div>
          ) : (
            <EmptyState title="No PDFs uploaded yet" />
          )}
        </article>

        <article className="content-panel">
          <div className="panel-header">
            <div>
              <h2>PDF Questions</h2>
              <p>
                {selectedPdf
                  ? `Questions returned for ${getPdfTitle(selectedPdf)}.`
                  : "Questions returned for the selected PDF."}
              </p>
            </div>
          </div>

          {questionLoading ? (
            <Loader label="Loading questions" />
          ) : questions.length > 0 ? (
            <div className="question-list">
              {questions.map((item, index) => (
                <article className="question-card" key={`${pickField(item, ["id"], index)}`}>
                  <span>Question {index + 1}</span>
                  <h3>{getQuestionText(item)}</h3>
                  {pickField(item, ["answer", "expectedAnswer"], "") && (
                    <p>{pickField(item, ["answer", "expectedAnswer"], "")}</p>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <EmptyState title="No PDF questions loaded" />
          )}
        </article>
      </div>
    </section>
  );
};

export default PDFModule;
