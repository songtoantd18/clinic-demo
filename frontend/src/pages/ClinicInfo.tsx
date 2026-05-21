/**
 * Copyright 2026 Google LLC
 */

import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { commonData } from '../data/mockData';

interface ClinicInfoProps {
  readonly className?: string;
}

export const ClinicInfo: React.FC<ClinicInfoProps> = () => {
  const { clinicInfo } = commonData;

  return (
    <DashboardLayout>
      {/* data-stitch-id: clinic-info-container-001 */}
      <div className="flex-1 p-8 max-w-7xl mx-auto w-full dark:bg-background-dark transition-colors">
        <div className="mb-8">
          <h1 className="font-h1 text-on-surface dark:text-white mb-2">{clinicInfo.title}</h1>
          <p className="text-slate-500 dark:text-slate-400 font-body-md">{clinicInfo.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white dark:bg-elevated p-8 rounded-xl border border-outline-variant dark:border-slate-800 shadow-sm transition-colors">
              <h2 className="font-h3 text-on-surface dark:text-white mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">{clinicInfo.sectionTitle}</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-label-sm text-on-surface-variant dark:text-slate-400 mb-2">{clinicInfo.fields.name}</label>
                    <input className="w-full rounded-lg border-outline-variant dark:border-slate-800 bg-white dark:bg-slate-900 text-body-md dark:text-slate-200 focus:ring-primary focus:border-primary py-2 px-3 outline-none transition-colors" defaultValue={clinicInfo.defaults.name} type="text" />
                  </div>
                  <div>
                    <label className="block font-label-sm text-on-surface-variant dark:text-slate-400 mb-2">{clinicInfo.fields.phone}</label>
                    <input className="w-full rounded-lg border-outline-variant dark:border-slate-800 bg-white dark:bg-slate-900 text-body-md dark:text-slate-200 focus:ring-primary focus:border-primary py-2 px-3 outline-none transition-colors" defaultValue={clinicInfo.defaults.phone} type="tel" />
                  </div>
                </div>
                <div>
                  <label className="block font-label-sm text-on-surface-variant dark:text-slate-400 mb-2">{clinicInfo.fields.address}</label>
                  <input className="w-full rounded-lg border-outline-variant dark:border-slate-800 bg-white dark:bg-slate-900 text-body-md dark:text-slate-200 focus:ring-primary focus:border-primary py-2 px-3 outline-none transition-colors" defaultValue={clinicInfo.defaults.address} type="text" />
                </div>
                <div>
                  <label className="block font-label-sm text-on-surface-variant dark:text-slate-400 mb-2">{clinicInfo.fields.email}</label>
                  <input className="w-full rounded-lg border-outline-variant dark:border-slate-800 bg-white dark:bg-slate-900 text-body-md dark:text-slate-200 focus:ring-primary focus:border-primary py-2 px-3 outline-none transition-colors" defaultValue={clinicInfo.defaults.email} type="email" />
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button className="px-6 py-2 bg-primary text-on-primary rounded-lg font-label-md hover:bg-primary/90 transition-colors">
                  Lưu thay đổi
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClinicInfo;
