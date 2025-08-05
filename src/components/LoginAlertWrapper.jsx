import React from 'react';
import { useAuth } from '../context/AuthContext';
import LoginAlertModal from './LoginAlertModal';

const LoginAlertWrapper = () => {
  const { showLoginAlert, setShowLoginAlert } = useAuth();

  const handleClose = () => {
    setShowLoginAlert(false);
  };

  return (
    <LoginAlertModal 
      isOpen={showLoginAlert} 
      onClose={handleClose} 
    />
  );
};

export default LoginAlertWrapper; 