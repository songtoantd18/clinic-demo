/**
 * Copyright 2026 Google LLC
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import PatientLayout from '../layouts/PatientLayout';
import { commonData } from '../data/mockData';

interface PatientHistoryProps {
  readonly className?: string;
}

export const PatientHistory: React.FC<PatientHistoryProps> = () => {
  const navigate = useNavigate();
  const { patientHistory } = commonData;

  return (
    <PatientLayout>
      {/* data-stitch-id: patient-history-container-001 */}
      <div className="max-w-7xl mx-auto px-6 py-8 dark:bg-background-dark transition-colors">
        <div className="mb-8">
          <h1 className="font-h1 text-on-surface dark:text-white">{patientHistory.title}</h1>
          <p className="text-slate-500 dark:text-slate-400">{patientHistory.subtitle}</p>
        </div>

        <div className="space-y-6">
          {patientHistory.records.map((record, idx) => (
            <div key={idx} className="bg-white dark:bg-elevated p-6 rounded-xl border border-outline-variant dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-6 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {record.status}
                  </span>
                  <span className="text-slate-400 dark:text-slate-500 text-xs font-label-sm">Ngày khám: {record.date}</span>
                </div>
                <h3 className="font-h3 text-on-surface dark:text-white mb-2">{record.clinic}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{record.desc}</p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => navigate('/appointment-detail')}
                    className="text-primary dark:text-blue-400 font-label-sm hover:underline"
                  >
                    Xem kết quả
                  </button>
                  <button className="text-primary dark:text-blue-400 font-label-sm hover:underline">Tải đơn thuốc</button>
                </div>
              </div>
              <div className="md:w-48 flex flex-col justify-center items-end border-l border-slate-100 dark:border-slate-800 pl-6">
                <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Chi phí</p>
                <p className="font-h3 text-on-surface dark:text-white font-bold">{record.cost}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PatientLayout>
  );
};

export default PatientHistory;
