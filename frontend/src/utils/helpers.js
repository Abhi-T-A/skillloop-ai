export function formatScore(value, suffix = "") {
  const numericValue = Number(value);

  if (Number.isNaN(numericValue)) {
    return "--";
  }

  return `${Math.round(numericValue * 10) / 10}${suffix}`;
}

export function formatDate(dateString) {
  if (!dateString) {
    return "No date";
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "No date";
  }

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(dateString) {
  if (!dateString) {
    return "No date";
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "No date";
  }

  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function toArray(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (!value || typeof value !== "object") {
    return [];
  }

  const possibleCollections = [
    value.data,
    value.items,
    value.results,
    value.history,
    value.records,
    value.questions,
    value.content,
  ];

  const collection = possibleCollections.find(Array.isArray);
  return collection || [];
}

export function pickField(record, keys, fallback = "") {
  if (!record || typeof record !== "object") {
    return fallback;
  }

  const key = keys.find((candidate) => {
    const value = record[candidate];
    return value !== undefined && value !== null && value !== "";
  });

  return key ? record[key] : fallback;
}

export function getRecordId(record) {
  return pickField(record, ["id", "pdfId", "_id", "attemptId", "sessionId"], "");
}

export function getErrorText(error, fallback = "Something went wrong.") {
  return error?.userMessage || error?.response?.data?.message || error?.message || fallback;
}

export function clampPercent(value) {
  const numericValue = Number(value);

  if (Number.isNaN(numericValue)) {
    return 0;
  }

  return Math.min(Math.max(numericValue, 0), 100);
}

export function scoreToPercent(value) {
  const numericValue = Number(value);

  if (Number.isNaN(numericValue)) {
    return 0;
  }

  return numericValue <= 10 ? clampPercent(numericValue * 10) : clampPercent(numericValue);
}
