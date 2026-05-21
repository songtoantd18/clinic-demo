/**
 * Copyright 2026 Google LLC
 */

import React from 'react';
import PatientLayout from '../layouts/PatientLayout';
import { commonData } from '../data/mockData';

interface QuickBookingProps {
  readonly className?: string;
}

export const QuickBooking: React.FC<QuickBookingProps> = () => {
  const { quickBooking } = commonData;

  return (
    <PatientLayout>
      {/* data-stitch-id: quick-booking-container-001 */}
      <div className="max-w-3xl mx-auto px-6 py-12 dark:bg-background-dark transition-colors">
        <div className="bg-white dark:bg-elevated p-8 rounded-2xl border border-outline-variant dark:border-slate-800 shadow-lg transition-colors">
          <div className="text-center mb-8">
            <h1 className="font-h1 text-primary dark:text-blue-400 mb-2">{quickBooking.title}</h1>
            <p className="text-slate-500 dark:text-slate-400">{quickBooking.subtitle}</p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-label-sm text-on-surface-variant dark:text-slate-400 mb-2">{quickBooking.fields.name}</label>
                <input className="w-full rounded-lg border-outline-variant dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 focus:ring-primary focus:border-primary py-2.5 px-3 outline-none transition-colors" placeholder="Nguyễn Văn A" type="text" />
              </div>
              <div>
                <label className="block font-label-sm text-on-surface-variant dark:text-slate-400 mb-2">{quickBooking.fields.phone}</label>
                <input className="w-full rounded-lg border-outline-variant dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 focus:ring-primary focus:border-primary py-2.5 px-3 outline-none transition-colors" placeholder="0905 xxx xxx" type="tel" />
              </div>
            </div>

            <div>
              <label className="block font-label-sm text-on-surface-variant dark:text-slate-400 mb-2">{quickBooking.fields.specialty}</label>
              <select className="w-full rounded-lg border-outline-variant dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 focus:ring-primary focus:border-primary py-2.5 px-3 outline-none transition-colors appearance-none">
                <option>Nội tổng quát</option>
                <option>Tai mũi họng</option>
                <option>Da liễu</option>
                <option>Nhi khoa</option>
              </select>
            </div>

            <div>
              <label className="block font-label-sm text-on-surface-variant dark:text-slate-400 mb-2">{quickBooking.fields.date}</label>
              <input className="w-full rounded-lg border-outline-variant dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 focus:ring-primary focus:border-primary py-2.5 px-3 outline-none transition-colors" type="date" />
            </div>

            <button className="w-full bg-primary dark:bg-blue-600 text-white py-3 rounded-xl font-bold hover:opacity-90 transition-all shadow-md">
              {quickBooking.button}
            </button>
          </form>
        </div>
      </div>
    </PatientLayout>
  );
};

export default QuickBooking;
