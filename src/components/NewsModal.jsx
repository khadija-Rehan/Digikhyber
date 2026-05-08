import React from "react";

const NewsModal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div className="modal-content" style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '30px',
        maxWidth: '800px',
        width: '90%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '20px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#666'
          }}
        >
          ×
        </button>
        
        <h3 className="mb-4 text-success">{content.title}</h3>
        <div className="news-content" style={{ whiteSpace: 'pre-line' }}>
          {content.fullDescription}
        </div>
        
        <div className="text-center mt-4">
          <button
            onClick={onClose}
            className="btn btn-success"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsModal; 
