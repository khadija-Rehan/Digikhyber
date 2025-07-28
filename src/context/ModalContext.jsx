import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    isOpen: false,
    type: 'success', // success, error, warning, info
    title: '',
    message: '',
    onConfirm: null,
    onCancel: null,
  });

  const showModal = ({ type = 'success', title = '', message = '', onConfirm = null, onCancel = null }) => {
    setModal({
      isOpen: true,
      type,
      title,
      message,
      onConfirm,
      onCancel,
    });
  };

  const hideModal = () => {
    setModal({
      isOpen: false,
      type: 'success',
      title: '',
      message: '',
      onConfirm: null,
      onCancel: null,
    });
  };

  const showSuccess = (message, title = 'Success') => {
    showModal({ type: 'success', title, message });
  };

  const showError = (message, title = 'Error') => {
    showModal({ type: 'error', title, message });
  };

  const showWarning = (message, title = 'Warning') => {
    showModal({ type: 'warning', title, message });
  };

  const showInfo = (message, title = 'Information') => {
    showModal({ type: 'info', title, message });
  };

  const value = {
    modal,
    showModal,
    hideModal,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
}; 