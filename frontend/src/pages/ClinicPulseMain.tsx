/**
 * Copyright 2026 Google LLC
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { commonData } from '../data/mockData';

interface ClinicPulseMainProps {
  readonly className?: string;
}

export const ClinicPulseMain: React.FC<ClinicPulseMainProps> = () => {
  const { main, footer } = commonData;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background-dark flex flex-col items-center justify-center p-6 transition-colors">
      <div className="mb-12 flex flex-col items-center">
        <img src="/src/assets/logo.png" alt="Logo" className="w-20 h-20 object-contain mb-4 drop-shadow-lg" />
        <h1 className="text-3xl font-black text-blue-700 dark:text-blue-400 uppercase tracking-widest">ClinicPulse</h1>
      </div>
      {/* data-stitch-id: main-container-001 */}
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Clinic Section */}
        <div className="bg-white dark:bg-elevated p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col items-center text-center transition-colors">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-blue-700 dark:text-blue-400 text-4xl">local_hospital</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{main.clinic.title}</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">{main.clinic.desc}</p>
          <Link to="/clinic-login" className="w-full bg-blue-700 dark:bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-800 dark:hover:bg-blue-500 transition-all">
            {main.clinic.button}
          </Link>
        </div>

        {/* Patient Section */}
        <div className="bg-white dark:bg-elevated p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col items-center text-center transition-colors">
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-emerald-700 dark:text-emerald-400 text-4xl">person</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{main.patient.title}</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">{main.patient.desc}</p>
          <Link to="/patient-login" className="w-full bg-emerald-600 dark:bg-emerald-700 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-all">
            {main.patient.button}
          </Link>
        </div>
      </div>
      
      <div className="mt-12 text-center text-slate-400 dark:text-slate-600 text-sm">
        <p>{footer.copyright}</p>
      </div>
    </div>
  );
};

export default ClinicPulseMain;
