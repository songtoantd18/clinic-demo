/**
 * Copyright 2026 Google LLC
 */

import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import logoUrl from '../assets/logo.png';
import { commonData } from '../data/mockData';
import { clearAuthToken } from '../services/api';

interface HeaderProps {
  readonly className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const activeClass = "font-label-md text-blue-700 dark:text-blue-400 font-semibold border-b-2 border-blue-700 dark:border-blue-400 py-1 transition-all";
  const inactiveClass = "font-label-md text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 py-1 transition-all";
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthToken('clinic');
    navigate('/clinic-login');
  };

  return (
    /* data-stitch-id: header-001 */
    <header className={`w-full sticky top-0 z-40 border-b border-slate-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm transition-colors ${className}`}>
      <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <Link to="/dashboard" className="flex items-center gap-2 text-lg font-black text-blue-700 dark:text-blue-400">
            <img src={logoUrl} alt="Logo" className="w-8 h-8 object-contain" />
            {commonData.navigation.clinic.brand}
          </Link>
          <nav className="hidden md:flex gap-6">
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
              {commonData.navigation.clinic.overview}
            </NavLink>
            <NavLink to="/booking-history" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
              {commonData.navigation.clinic.appointments}
            </NavLink>
            <NavLink to="/medical-records" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
              {commonData.navigation.clinic.records}
            </NavLink>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 rounded-full transition-all">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 rounded-full transition-all">
            <span className="material-symbols-outlined">help_outline</span>
          </button>
          <div className="h-8 w-[1px] bg-outline-variant mx-2 opacity-20"></div>
          <Link to="/clinic-info" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-4 py-2 font-label-md rounded-lg hover:opacity-90 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">person</span>
            {commonData.navigation.clinic.profile}
          </Link>
          <button 
            onClick={handleLogout}
            className="bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 px-4 py-2 font-label-md rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Đăng xuất
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
