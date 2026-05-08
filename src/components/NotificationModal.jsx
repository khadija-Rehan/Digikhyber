import React from 'react';
import { useModal } from '../context/ModalContext';

const NotificationModal = () => {
  const { modal, hideModal } = useModal();

  if (!modal.isOpen) return null;

  const getIcon = () => {
    switch (modal.type) {
      case 'success':
        return <i className="fas fa-check-circle text-success"></i>;
      case 'error':
        return <i className="fas fa-exclamation-circle text-danger"></i>;
      case 'warning':
        return <i className="fas fa-exclamation-triangle text-warning"></i>;
      case 'info':
        return <i className="fas fa-info-circle text-info"></i>;
      default:
        return <i className="fas fa-info-circle text-primary"></i>;
    }
  };

  const getModalClass = () => {
    switch (modal.type) {
      case 'success':
        return 'border-success';
      case 'error':
        return 'border-danger';
      case 'warning':
        return 'border-warning';
      case 'info':
        return 'border-info';
      default:
        return 'border-primary';
    }
  };

  const getButtonClass = () => {
    switch (modal.type) {
      case 'success':
        return 'btn-success';
      case 'error':
        return 'btn-danger';
      case 'warning':
        return 'btn-warning';
      case 'info':
        return 'btn-info';
      default:
        return 'btn-primary';
    }
  };

  const handleConfirm = () => {
    if (modal.onConfirm) {
      modal.onConfirm();
    }
    hideModal();
  };

  const handleCancel = () => {
    if (modal.onCancel) {
      modal.onCancel();
    }
    hideModal();
  };

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div className={`modal-content bg-white rounded-3 shadow-lg border ${getModalClass()}`} style={{
        maxWidth: '500px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        position: 'relative',
        animation: 'modalSlideIn 0.3s ease-out'
      }}>
        {/* Header */}
        <div className="modal-header border-0 pb-0 px-4 pt-4">
          <div className="d-flex align-items-center gap-3">
            <div style={{ fontSize: '2rem' }}>
              {getIcon()}
            </div>
            <h5 className="modal-title mb-0 fw-bold">
              {modal.title}
            </h5>
          </div>
          <button
            type="button"
            className="btn-close"
            onClick={hideModal}
            aria-label="Close"
          ></button>
        </div>

        {/* Body */}
        <div className="modal-body pt-0 px-4 pb-3">
          <p className="mb-0" style={{ 
            fontSize: '1rem', 
            lineHeight: '1.6',
            color: '#6c757d'
          }}>
            {modal.message}
          </p>
        </div>

        {/* Footer */}
        <div className="modal-footer border-0 pt-0 px-4 pb-4">
          {modal.onCancel && (
            <button
              type="button"
              className="btn btn-outline-secondary me-2"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
          <button
            type="button"
            className={`btn ${getButtonClass()}`}
            onClick={handleConfirm}
          >
            {modal.onConfirm ? 'Confirm' : 'OK'}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-50px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .modal-content {
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        .btn-close:hover {
          background-color: #e9ecef;
        }
      `}</style>
    </div>
  );
};

export default NotificationModal; 
