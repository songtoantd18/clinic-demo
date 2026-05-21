/**
 * Copyright 2026 Google LLC
 */

import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { commonData } from '../data/mockData';

interface SidebarProps {
  readonly className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const activeClass = "flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-4 border-blue-700 transition-colors duration-200 font-['Inter'] antialiased text-sm font-medium";
  const inactiveClass = "flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200 font-['Inter'] antialiased text-sm font-medium";

  return (
    /* data-stitch-id: sidebar-001 */
    <aside className={`fixed left-0 top-0 flex flex-col h-screen w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm z-50 transition-colors ${className}`}>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <img src="/src/assets/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
          <h1 className="text-xl font-bold text-blue-700 dark:text-blue-400 tracking-tight">
            {commonData.navigation.clinic.portal}
          </h1>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
          {commonData.navigation.clinic.healthMgmt}
        </p>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
          <span className="material-symbols-outlined">dashboard</span>
          {commonData.navigation.clinic.overview}
        </NavLink>
        <NavLink to="/booking-history" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
          <span className="material-symbols-outlined">receipt_long</span>
          {commonData.navigation.clinic.appointments}
        </NavLink>
        <NavLink to="/medical-records" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
          <span className="material-symbols-outlined">folder_shared</span>
          {commonData.navigation.clinic.records}
        </NavLink>
        <NavLink to="/clinic-info" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
          <span className="material-symbols-outlined">local_hospital</span>
          {commonData.navigation.clinic.info}
        </NavLink>
        <Link to="/patient-home" className={inactiveClass}>
          <span className="material-symbols-outlined">person</span>
          {commonData.navigation.clinic.patientView}
        </Link>
      </nav>
      {/* data-stitch-id: sidebar-footer-002 */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 transition-colors">
        <div className="flex items-center gap-3 p-2">
          <img 
            alt="Clinic Administrator" 
            className="w-10 h-10 rounded-full border-2 border-primary-container dark:border-slate-700" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3VkcN4I7MUAhgk6zC-ELHrP6k8HCOM2ogPDJQodhuUClX3YhGwcuI9JSFizTkNuTWhuf-OKFnrHsknaFXpDwOoAUIWP8TJF-Dck1KtBpr2EugqvUWG-Cks9Jkipz2h51iZyFi_8ObwWPyPA4QB0rtiAjNpdPbmxjKpdQ551QvjUGhnjN_-9MZQdQl9oQjB_AxXc6nQz9yheG4j_bFssXbn6URLKkTR8jrjYErC1h0uREgLuUCmcU2mx1jDRXgmwBzJNPBJlWQ"
          />
          <div>
            <p className="font-label-md text-on-surface dark:text-white">
              {commonData.navigation.clinic.adminName}
            </p>
            <p className="font-caption text-outline dark:text-slate-400">
              {commonData.navigation.clinic.adminRole}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
