import React, { useEffect, useRef } from 'react';

/**
 * ToastNotification — hệ thống thông báo góc trên phải
 * Props: toasts (array), removeToast (fn)
 * Toast shape: { id, message, type: 'success'|'error'|'info' }
 */
const ToastNotification = ({ toasts, removeToast }) => {
  return (
    <div className="toast-container" role="region" aria-label="Notifications">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
};

const ToastItem = ({ toast, onRemove }) => {
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => onRemove(toast.id), 3200);
    return () => clearTimeout(timerRef.current);
  }, [toast.id, onRemove]);

  return (
    <div className={`toast ${toast.type}`} role="alert">
      <span className="toast-dot" />
      <span style={{ flex: 1 }}>{toast.message}</span>
      <button
        onClick={() => onRemove(toast.id)}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--text-muted)', padding: '0 0 0 8px', fontSize: '16px',
          lineHeight: 1, transition: 'color var(--t-fast)'
        }}
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
};

export default ToastNotification;
