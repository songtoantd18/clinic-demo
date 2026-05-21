/**
 * Copyright 2026 Google LLC
 */

import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { commonData } from '../data/mockData';

interface DashboardLayoutProps {
  readonly children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    /* data-stitch-id: dashboard-layout-001 */
    <div className="bg-background dark:bg-background-dark text-on-surface dark:text-slate-200 flex min-h-screen transition-colors">
      <Sidebar />
      <main className="ml-64 flex-1 flex flex-col min-h-screen">
        <Header />
        <div className="flex-1">
          {children}
        </div>
        {/* data-stitch-id: dashboard-footer-002 */}
        <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 mt-xxl transition-colors">
          <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 gap-4 max-w-7xl mx-auto">
            <p className="font-['Inter'] text-xs text-slate-500 dark:text-slate-400">
              {commonData.footer.copyright}
            </p>
            <div className="flex gap-6">
              {commonData.footer.links.slice(0, 3).map((link, idx) => (
                <a 
                  key={idx}
                  className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-150 font-['Inter'] text-xs" 
                  href={link.url}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </main>
      <button className="fixed bottom-lg right-lg w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-50">
        <span className="material-symbols-outlined text-[24px]">add</span>
      </button>
    </div>
  );
};

export default DashboardLayout;
