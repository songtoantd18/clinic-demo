/**
 * Copyright 2026 Google LLC
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { commonData } from '../data/mockData';
import { getOwnProfile, listAppointments } from '../services/api';

interface DashboardProps {
  readonly clinicName?: string;
}

export const Dashboard: React.FC<DashboardProps> = () => {
  const navigate = useNavigate();
  const { dashboard } = commonData;

  const [profile, setProfile] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const prof = await getOwnProfile();
        setProfile(prof);
        const appts = await listAppointments({ clinicUserId: prof.id });
        setAppointments(appts || []);
      } catch (err: any) {
        setError(err.message || 'Không thể tải thông tin tổng quan.');
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <span className="material-symbols-outlined text-[32px] text-blue-700 dark:text-blue-400 animate-spin">sync</span>
        </div>
      </DashboardLayout>
    );
  }

  // Calculate live stats
  const activeAppts = appointments.filter(a => a.status !== 'draft');
  const totalCount = activeAppts.length;
  const completedCount = activeAppts.filter(a => a.status === 'completed').length;
  const pendingCount = activeAppts.filter(a => a.status === 'pending' || a.status === 'confirmed').length;
  const cancelledCount = activeAppts.filter(a => a.status === 'cancelled').length;

  // Filter appointments starting in the next 1 hour
  const now = new Date();
  const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
  const upcomingAppts = activeAppts.filter(appt => {
    const time = new Date(appt.appointmentTime);
    return (
      (appt.status === 'pending' || appt.status === 'confirmed') &&
      time >= now &&
      time <= oneHourLater
    );
  });

  const stats = [
    { label: "Tổng lượt", value: totalCount.toString(), icon: "calendar_month", trend: "Tổng số lịch khám", type: "primary" },
    { label: "Đã hoàn thành", value: completedCount.toString(), icon: "check_circle", trend: `${totalCount > 0 ? Math.round((completedCount/totalCount)*100) : 0}% tỷ lệ khám`, type: "secondary" },
    { label: "Đang chờ khám", value: pendingCount.toString(), icon: "pending", trend: "Cần xử lý", type: "tertiary" },
    { label: "Đã hủy", value: cancelledCount.toString(), icon: "cancel", trend: "Số lịch đã hủy", type: "error" }
  ];

  return (
    <DashboardLayout>
      {/* data-stitch-id: dashboard-container-001 */}
      <div className="p-lg max-w-7xl mx-auto dark:bg-background-dark transition-colors">
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 rounded-lg text-sm border border-red-100 dark:border-red-900">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-xl">
          <section>
            <div className="flex items-end justify-between mb-md">
              <div>
                <h2 className="font-h2 text-on-surface dark:text-white">
                  Chào mừng, {profile?.clinicName || 'Bác sĩ'}
                </h2>
                <p className="font-body-md text-outline dark:text-slate-400">{dashboard.subtitle}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-lg">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white dark:bg-elevated p-lg rounded-xl border border-outline-variant dark:border-slate-800 shadow-sm flex flex-col gap-sm transition-colors">
                  <div className="flex items-center justify-between">
                    <span className={`material-symbols-outlined text-${stat.type} p-2 bg-${stat.type}-fixed dark:bg-slate-800 rounded-lg`}>{stat.icon}</span>
                    <span className="text-caption text-outline dark:text-slate-500">{stat.label}</span>
                  </div>
                  <p className={`font-h1 text-${stat.type} dark:text-white`}>{stat.value}</p>
                  <p className="font-label-sm text-outline dark:text-slate-400">{stat.trend}</p>
                </div>
              ))}
            </div>
          </section>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
            <section className="lg:col-span-2">
              <div className="bg-white dark:bg-elevated rounded-xl border border-outline-variant dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
                <div className="p-lg border-b border-outline-variant dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">schedule</span>
                    <h3 className="font-h3 text-on-surface dark:text-white">{dashboard.upcomingTitle}</h3>
                  </div>
                  <span 
                    onClick={() => navigate('/booking-history')}
                    className="font-label-sm text-primary dark:text-blue-400 cursor-pointer hover:underline"
                  >
                    {dashboard.viewAll}
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-surface-container-low dark:bg-slate-900 border-b border-outline-variant dark:border-slate-800">
                        {dashboard.tableHeaders.map((header, idx) => (
                          <th key={idx} className="px-lg py-md font-label-md text-on-surface-variant dark:text-slate-400">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant dark:divide-slate-800">
                      {upcomingAppts.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-lg py-8 text-center text-slate-500 dark:text-slate-400">
                            Không có ca khám nào trong 1 giờ tới.
                          </td>
                        </tr>
                      ) : (
                        upcomingAppts.map((appt, idx) => (
                          <tr 
                            key={idx} 
                            className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                            onClick={() => navigate(`/appointments/${appt.id}`)}
                          >
                            <td className="px-lg py-md">
                              <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-slate-400">account_circle</span>
                                <span className="font-body-md font-medium dark:text-slate-200">{appt.patientUser?.fullName || 'Bệnh nhân'}</span>
                              </div>
                            </td>
                            <td className="px-lg py-md font-body-md dark:text-slate-400">
                              {new Date(appt.appointmentTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td className="px-lg py-md font-body-md text-outline dark:text-slate-500 truncate max-w-[200px]">
                              {appt.symptoms || 'Chưa cung cấp triệu chứng'}
                            </td>
                            <td className="px-lg py-md">
                              <span className="px-2 py-1 bg-primary-fixed dark:bg-blue-900/40 text-on-primary-fixed-variant dark:text-blue-300 rounded-full font-label-sm">
                                {appt.status === 'confirmed' ? 'Đã xác nhận' : 'Chờ xác nhận'}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            
            <section className="flex flex-col gap-lg">
              {dashboard.actions.map((action, idx) => (
                <div 
                  key={idx}
                  onClick={() => navigate(action.route)}
                  className="bg-white dark:bg-elevated p-lg rounded-xl border border-outline-variant dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-2">
                      <div className="w-12 h-12 rounded-xl bg-primary-fixed dark:bg-slate-800 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                        <span className="material-symbols-outlined text-[28px]">{action.icon}</span>
                      </div>
                      <h3 className="font-h3 text-on-surface dark:text-white mt-2">{action.title}</h3>
                      <p className="font-body-md text-outline dark:text-slate-400">{action.desc}</p>
                    </div>
                    <span className="material-symbols-outlined text-outline dark:text-slate-600 group-hover:text-primary transition-colors">arrow_forward</span>
                  </div>
                </div>
              ))}
              <div className="relative overflow-hidden rounded-xl h-full min-h-[200px] border border-outline-variant dark:border-slate-800">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary-container z-10 p-lg flex flex-col justify-end">
                  <h4 className="font-h3 text-white">{dashboard.upgrade.title}</h4>
                  <p className="font-caption text-white/80 mb-md">{dashboard.upgrade.desc}</p>
                  <button className="w-full py-2 bg-white text-primary font-label-md rounded-lg hover:bg-opacity-90 transition-all">
                    {dashboard.upgrade.button}
                  </button>
                </div>
                <img alt="Upgrade to Pro" className="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQgc4pxEC9RBsDms6gzIvr7QYfjP4eIU_sWP1H1jgYBvpuugcMzMwxdA5Mq87KfNFeCVfb4opBZh0P7Bo3hPQxE42dneqtGnKkisJQbZYGp127DVwsTsKGsDhqx3ojRjlSfpaszOKPjKAyroW-KfB7_ll0GXFJKqcLld8rPgZ4XHBP7festRlnULDWN6a3RQ9DB54KOLKQ1SUpteU10bYWfc6jrig1sjL4U8xDK8OQCf7Y_4PUVc-0dqYBRRbfg6QgqRlvjc-1"/>
              </div>
            </section>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
