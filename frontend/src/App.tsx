/**
 * Copyright 2026 Google LLC
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Quản lý phòng khám
import Dashboard from './pages/Dashboard';
import ClinicLogin from './pages/ClinicLogin';
import ClinicInfo from './pages/ClinicInfo';
import ClinicDetail from './pages/ClinicDetail';
import BookingHistory from './pages/BookingHistory';
import MedicalRecords from './pages/MedicalRecords';
// import Demo1 from './pages/demo1';
import Demo1 from './pages/Demo1'

// Quản lý bệnh nhân
import PatientLogin from './pages/PatientLogin';
import PatientHome from './pages/PatientHome';
import PatientHistory from './pages/PatientHistory';
import QuickBooking from './pages/QuickBooking';
import AppointmentDetail from './pages/AppointmentDetail';
import PatientProfile from './pages/PatientProfile';
import AuthCallback from './pages/AuthCallback';

// Khác
import ClinicPulseMain from './pages/ClinicPulseMain';

// Protected Routes
import { ProtectedRoute } from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Mặc định chuyển về Trang chủ chọn cổng */}
        <Route path="/" element={<Navigate to="/main" replace />} />

        {/* Phía Phòng Khám */}
        <Route path="/clinic-login" element={<ClinicLogin />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute allowedRole="clinic">
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/clinic-info" 
          element={
            <ProtectedRoute allowedRole="clinic">
              <ClinicInfo />
            </ProtectedRoute>
          } 
        />
        <Route path="/clinic-detail" element={<ClinicDetail />} />
        <Route path="/clinics/:id" element={<ClinicDetail />} />
        <Route 
          path="/booking-history" 
          element={
            <ProtectedRoute allowedRole="clinic">
              <BookingHistory />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/medical-records" 
          element={
            <ProtectedRoute allowedRole="clinic">
              <MedicalRecords />
            </ProtectedRoute>
          } 
        />

        {/* Phía Bệnh Nhân */}
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route 
          path="/patient-home" 
          element={
            <ProtectedRoute allowedRole="patient">
              <PatientHome />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/patient-history" 
          element={
            <ProtectedRoute allowedRole="patient">
              <PatientHistory />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/quick-booking" 
          element={
            <ProtectedRoute allowedRole="patient">
              <QuickBooking />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/appointment-detail" 
          element={
            <ProtectedRoute allowedRole="patient">
              <AppointmentDetail />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/appointments/:id" 
          element={
            <ProtectedRoute allowedRole="patient">
              <AppointmentDetail />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/patient-profile" 
          element={
            <ProtectedRoute allowedRole="patient">
              <PatientProfile />
            </ProtectedRoute>
          } 
        />
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* Màn hình chính */}
        <Route path="/demo1" element={<Demo1 />} />

        <Route path="/main" element={<ClinicPulseMain />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
