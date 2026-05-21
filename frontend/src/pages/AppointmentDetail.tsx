/**
 * Copyright 2026 Google LLC
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { appointmentData } from '../data/mockData';

interface AppointmentDetailProps {
  readonly appointmentId?: string;
}

/**
 * AppointmentDetail component refactored to follow Stitch Google Standard.
 * - Logic isolated (navigate)
 * - Data decoupled to mockData.ts
 * - Type safety with Readonly interface
 * - Dark mode support
 * - data-stitch-id preserved as comments
 */
export const AppointmentDetail: React.FC<AppointmentDetailProps> = ({
  appointmentId = appointmentData.id
}) => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      {/* data-stitch-id: main-container-001 */}
      <div className="flex-1 p-8 lg:p-12 overflow-y-auto bg-white dark:bg-background-dark transition-colors">
        <div className="max-w-4xl mx-auto">
          {/* data-stitch-id: header-section-002 */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div 
                onClick={() => navigate('/booking-history')}
                className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2 cursor-pointer hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                <span className="text-caption font-medium uppercase">{appointmentData.backLabel}</span>
              </div>
              <h1 className="font-h1 text-on-background dark:text-white">
                {appointmentData.titlePrefix}{appointmentId}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-6 py-2.5 rounded-xl border border-error text-error font-label-md hover:bg-error-container/20 transition-all flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">cancel</span>
                {appointmentData.cancelButton}
              </button>
              <button className="px-6 py-2.5 rounded-xl bg-primary text-white font-label-md hover:shadow-lg transition-all flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">save</span>
                {appointmentData.saveButton}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* data-stitch-id: patient-card-003 */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-white dark:bg-elevated border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
                <h2 className="font-h3 text-on-surface dark:text-slate-200 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                  {appointmentData.patientHeader}
                </h2>
                <div className="flex flex-col items-center mb-6">
                  <img 
                    className="w-24 h-24 rounded-full object-cover border-4 border-surface-container dark:border-slate-700 mb-4" 
                    src={appointmentData.patient.avatar} 
                    alt="Patient" 
                  />
                  <p className="font-h3 text-on-surface dark:text-white text-center">
                    {appointmentData.patient.name}
                  </p>
                  <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-caption font-bold mt-2">
                    {appointmentData.loyalBadge}
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <span className="material-symbols-outlined text-primary">call</span>
                    <span className="font-body-md">{appointmentData.patient.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <span className="material-symbols-outlined text-primary">mail</span>
                    <span className="font-body-md">{appointmentData.patient.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* data-stitch-id: diagnosis-card-004 */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white dark:bg-elevated border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
                <h2 className="font-h3 text-on-surface dark:text-slate-200 mb-4">
                  {appointmentData.diagnosisHeader}
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="font-label-sm text-slate-500 dark:text-slate-400 block mb-1">
                      {appointmentData.symptomLabel}
                    </label>
                    <textarea 
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2 font-body-md text-on-surface dark:text-slate-300 focus:ring-2 focus:ring-primary outline-none" 
                      rows={3} 
                      defaultValue={appointmentData.patient.symptoms} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AppointmentDetail;
