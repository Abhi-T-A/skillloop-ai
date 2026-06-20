import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle, FiCheckCircle, FiInfo, FiX } from "react-icons/fi";

const ToastContext = createContext(null);

const icons = {
  success: FiCheckCircle,
  error: FiAlertCircle,
  info: FiInfo,
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef(new Map());

  const dismiss = useCallback((id) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      window.clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const push = useCallback(
    ({ title, message, type = "info", duration = 4000 }) => {
      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      setToasts((currentToasts) => [...currentToasts, { id, title, message, type }]);

      const timer = window.setTimeout(() => {
        dismiss(id);
      }, duration);

      timersRef.current.set(id, timer);
      return id;
    },
    [dismiss]
  );

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      timersRef.current.clear();
    };
  }, []);

  const value = useMemo(
    () => ({
      push,
      dismiss,
      success: (payload) => push({ ...payload, type: "success" }),
      error: (payload) => push({ ...payload, type: "error" }),
      info: (payload) => push({ ...payload, type: "info" }),
    }),
    [dismiss, push]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="toast-stack" aria-live="polite" aria-atomic="true">
        <AnimatePresence>
          {toasts.map((toast) => {
            const Icon = icons[toast.type] || FiInfo;

            return (
              <motion.article
                key={toast.id}
                className={`toast toast-${toast.type}`}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                role="status"
              >
                <div className="toast-icon">
                  <Icon aria-hidden="true" />
                </div>
                <div className="toast-copy">
                  {toast.title && <strong>{toast.title}</strong>}
                  {toast.message && <p>{toast.message}</p>}
                </div>
                <button
                  type="button"
                  className="toast-dismiss"
                  onClick={() => dismiss(toast.id)}
                  aria-label="Dismiss notification"
                >
                  <FiX aria-hidden="true" />
                </button>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export default ToastContext;
