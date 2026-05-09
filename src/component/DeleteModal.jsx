import React from 'react';
import { Trash2, AlertTriangle } from 'lucide-react';

/**
 * DeleteModal — confirm dialog trước khi xóa
 * Props: isOpen, employeeName, onConfirm, onCancel
 */
const DeleteModal = ({ isOpen, employeeName, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon">
          <AlertTriangle size={24} color="var(--danger)" />
        </div>
        <h3 className="modal-title" id="modal-title">Delete Employee?</h3>
        <p className="modal-body">
          Are you sure you want to delete <strong>{employeeName}</strong>?{' '}
          This action cannot be undone.
        </p>
        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onCancel} id="modal-cancel-btn">
            Cancel
          </button>
          <button className="btn btn-danger-solid" onClick={onConfirm} id="modal-confirm-btn">
            <Trash2 size={15} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
