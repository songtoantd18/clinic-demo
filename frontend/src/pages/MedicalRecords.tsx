/**
 * Copyright 2026 Google LLC
 */

import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { commonData } from '../data/mockData';

interface MedicalRecordsProps {
  readonly className?: string;
}

export const MedicalRecords: React.FC<MedicalRecordsProps> = () => {
  const { medicalRecords } = commonData;

  return (
    <DashboardLayout>
      {/* data-stitch-id: medical-records-container-001 */}
      <div className="flex-1 p-8 max-w-7xl mx-auto w-full dark:bg-background-dark transition-colors">
        <div className="mb-8">
          <h1 className="font-h1 text-on-surface dark:text-white mb-2">{medicalRecords.title}</h1>
          <p className="text-slate-500 dark:text-slate-400 font-body-md">{medicalRecords.subtitle}</p>
        </div>

        <div className="bg-white dark:bg-elevated rounded-xl border border-outline-variant dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
          <div className="p-6 border-b border-outline-variant dark:border-slate-800 flex gap-4 transition-colors">
            <input 
              type="text" 
              placeholder={medicalRecords.searchPlaceholder} 
              className="flex-1 px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm dark:text-slate-200 focus:border-blue-500 outline-none"
            />
            <button className="bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-blue-800 transition-colors">
              {medicalRecords.searchButton}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                  {medicalRecords.tableHeaders.map((header, idx) => (
                    <th key={idx} className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {medicalRecords.records.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-blue-600 dark:text-blue-400">{record.id}</td>
                    <td className="px-6 py-4 text-sm font-semibold dark:text-slate-200">{record.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{record.date}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{record.diagnosis}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{record.doctor}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-primary dark:text-blue-400 hover:underline text-sm font-bold">Chi tiết</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MedicalRecords;
