import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuthToken } from '../services/api';

interface ProtectedRouteProps {
  readonly children: React.ReactNode;
  readonly allowedRole: 'patient' | 'clinic';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRole }) => {
  const token = getAuthToken(allowedRole);

  if (!token) {
    const redirectPath = allowedRole === 'clinic' ? '/clinic-login' : '/patient-login';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};
