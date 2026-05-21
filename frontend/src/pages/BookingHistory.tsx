/**
 * Copyright 2026 Google LLC
 */

import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { commonData } from '../data/mockData';

interface BookingHistoryProps {
  readonly className?: string;
}

export const BookingHistory: React.FC<BookingHistoryProps> = () => {
  const { bookingHistory } = commonData;

  return (
    <DashboardLayout>
      {/* data-stitch-id: booking-history-container-001 */}
      <div className="flex-1 p-8 max-w-7xl mx-auto w-full dark:bg-background-dark transition-colors">
        <div className="mb-8">
          <h1 className="font-h1 text-on-surface dark:text-white mb-2">{bookingHistory.title}</h1>
          <p className="text-slate-500 dark:text-slate-400 font-body-md">{bookingHistory.subtitle}</p>
        </div>

        <div className="bg-white dark:bg-elevated p-6 rounded-xl border border-outline-variant dark:border-slate-800 shadow-sm mb-8 transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-label-md text-slate-500 dark:text-slate-400 uppercase tracking-wider">{bookingHistory.filters.time}</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-lg">calendar_month</span>
                <input className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm dark:text-slate-200 focus:border-blue-500 focus:ring-0 outline-none" type="date"/>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-label-md text-slate-500 dark:text-slate-400 uppercase tracking-wider">{bookingHistory.filters.name}</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-lg">person</span>
                <input className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm dark:text-slate-200 focus:border-blue-500 focus:ring-0 outline-none" placeholder="Nhập tên..." type="text"/>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-label-md text-slate-500 dark:text-slate-400 uppercase tracking-wider">{bookingHistory.filters.phone}</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-lg">call</span>
                <input className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm dark:text-slate-200 focus:border-blue-500 focus:ring-0 outline-none" placeholder="09xx..." type="tel"/>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-label-md text-slate-500 dark:text-slate-400 uppercase tracking-wider">{bookingHistory.filters.email}</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-lg">mail</span>
                <input className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm dark:text-slate-200 focus:border-blue-500 focus:ring-0 outline-none" placeholder="example@..." type="email"/>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-label-md text-slate-500 dark:text-slate-400 uppercase tracking-wider">{bookingHistory.filters.sort}</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-lg">sort</span>
                <select className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm dark:text-slate-200 focus:border-blue-500 focus:ring-0 appearance-none outline-none">
                  <option>Mới nhất</option>
                  <option>Cũ nhất</option>
                  <option>Giờ khám</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button className="bg-blue-700 text-white px-6 py-2 rounded-lg font-label-md hover:bg-blue-800 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">filter_list</span>
              {bookingHistory.filters.button}
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-elevated rounded-xl border border-outline-variant dark:border-slate-800 shadow-sm overflow-hidden mb-8 transition-colors">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                  {bookingHistory.tableHeaders.map((header, idx) => (
                    <th key={idx} className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                <tr className="bg-emerald-50/40 dark:bg-emerald-900/10 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">01</td>
                  <td className="px-6 py-4 text-sm font-semibold text-emerald-700 dark:text-emerald-400">14:30 - Mai</td>
                  <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-200">Nguyễn Văn An</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">0901 234 567</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">vanan.ng@gmail.com</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300">Sắp tới</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BookingHistory;
