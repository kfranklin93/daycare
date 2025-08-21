import React from 'react';
import { Navigate } from 'react-router-dom';

const AppIndex = () => {
  // For now, redirect to auth screen
  return <Navigate to="/auth" replace />;
};

export default AppIndex;