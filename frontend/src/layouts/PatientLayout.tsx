/**
 * Copyright 2026 Google LLC
 */

import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { commonData } from '../data/mockData';

interface PatientLayoutProps {
  readonly children: React.ReactNode;
}

export const PatientLayout: React.FC<PatientLayoutProps> = ({ children }) => {
  const activeClass = "text-blue-700 dark:text-blue-400 font-semibold border-b-2 border-blue-700 dark:border-blue-400 font-body-md text-sm tracking-wide transition-all";
  const inactiveClass = "text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 font-body-md text-sm tracking-wide transition-all";

  return (
    /* data-stitch-id: patient-layout-001 */
    <div className="min-h-screen bg-slate-50 dark:bg-background-dark flex flex-col transition-colors">
      <header className="w-full sticky top-0 z-50 border-b border-slate-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm">
        <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-8">
            <Link to="/patient-home" className="text-lg font-black text-blue-700 dark:text-blue-400">
              {commonData.navigation.patient.brand}
            </Link>
            <nav className="hidden md:flex gap-6">
              <NavLink to="/patient-home" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
                {commonData.navigation.patient.findClinic}
              </NavLink>
              <NavLink to="/patient-history" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
                {commonData.navigation.patient.myAppointments}
              </NavLink>
              <NavLink to="/appointment-detail" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
                {commonData.navigation.patient.medicalRecords}
              </NavLink>
              <Link to="/dashboard" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 font-body-md text-sm tracking-wide transition-all">
                {commonData.navigation.patient.clinicView}
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700">
              <span className="material-symbols-outlined text-slate-400" data-icon="search">search</span>
              <input 
                className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-64 text-on-surface dark:text-slate-200" 
                placeholder={commonData.navigation.patient.searchPlaceholder} 
                type="text"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary-container dark:bg-blue-900/40 flex items-center justify-center text-on-primary-container dark:text-blue-300 font-bold text-xs cursor-pointer">
                {commonData.navigation.patient.avatarLabel}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      {/* data-stitch-id: patient-footer-002 */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 gap-4 max-w-7xl mx-auto">
          <p className="text-xs text-slate-500 dark:text-slate-400">{commonData.footer.copyright}</p>
          <div className="flex gap-8">
            {commonData.footer.links.slice(3).map((link, idx) => (
              <a 
                key={idx}
                className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-opacity text-xs" 
                href={link.url}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PatientLayout;
