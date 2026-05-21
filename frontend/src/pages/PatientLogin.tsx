/**
 * Copyright 2026 Google LLC
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { commonData } from '../data/mockData';

interface PatientLoginProps {
  readonly className?: string;
}

export const PatientLogin: React.FC<PatientLoginProps> = () => {
  const { patientLogin } = commonData;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background-dark flex items-center justify-center p-6 transition-colors">
      {/* data-stitch-id: patient-login-container-001 */}
      <div className="bg-white dark:bg-elevated p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl w-full max-w-md transition-colors">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-2">{patientLogin.title}</h1>
          <p className="text-slate-500 dark:text-slate-400">{patientLogin.subtitle}</p>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{patientLogin.fields.identity}</label>
            <input className="w-full rounded-lg border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 focus:ring-blue-500 focus:border-blue-500 py-2 px-3 outline-none transition-colors" placeholder="0905..." type="text" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{patientLogin.fields.password}</label>
            <input className="w-full rounded-lg border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 focus:ring-blue-500 focus:border-blue-500 py-2 px-3 outline-none transition-colors" type="password" />
          </div>
          <Link to="/patient-home" className="w-full bg-blue-700 dark:bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-800 dark:hover:bg-blue-500 transition-all block text-center mt-6">
            {patientLogin.button}
          </Link>
          <div className="text-center mt-4">
            <p className="text-sm text-slate-500 dark:text-slate-500">{patientLogin.social}</p>
            <div className="flex gap-4 mt-2 justify-center">
              <button className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 text-xs dark:text-slate-300 transition-colors">Google</button>
              <button className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 text-xs dark:text-slate-300 transition-colors">Facebook</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientLogin;
