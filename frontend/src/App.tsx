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

// Quản lý bệnh nhân
import PatientLogin from './pages/PatientLogin';
import PatientHome from './pages/PatientHome';
import PatientHistory from './pages/PatientHistory';
import QuickBooking from './pages/QuickBooking';
import AppointmentDetail from './pages/AppointmentDetail';

// Khác
import ClinicPulseMain from './pages/ClinicPulseMain';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Mặc định chuyển về Dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* Phía Phòng Khám */}
        <Route path="/clinic-login" element={<ClinicLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clinic-info" element={<ClinicInfo />} />
        <Route path="/clinic-detail" element={<ClinicDetail />} />
        <Route path="/booking-history" element={<BookingHistory />} />
        <Route path="/medical-records" element={<MedicalRecords />} />

        {/* Phía Bệnh Nhân */}
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/patient-home" element={<PatientHome />} />
        <Route path="/patient-history" element={<PatientHistory />} />
        <Route path="/quick-booking" element={<QuickBooking />} />
        <Route path="/appointment-detail" element={<AppointmentDetail />} />

        {/* Màn hình chính */}
        <Route path="/main" element={<ClinicPulseMain />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
