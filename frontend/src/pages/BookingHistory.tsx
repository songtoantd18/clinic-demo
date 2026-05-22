import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { commonData } from '../data/mockData';
import { getOwnProfile, listAppointments } from '../services/api';

export const BookingHistory: React.FC = () => {
  const { bookingHistory } = commonData;
  const navigate = useNavigate();

  const [profile, setProfile] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter states
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [phoneFilter, setPhoneFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' | 'oldest' | 'time'

  // Pagination state
  const [visibleCount, setVisibleCount] = useState(15);

  useEffect(() => {
    async function loadData() {
      try {
        const prof = await getOwnProfile();
        setProfile(prof);
        const appts = await listAppointments({ clinicUserId: prof.id });
        setAppointments(appts || []);
      } catch (err: any) {
        setError(err.message || 'Không thể tải lịch sử đặt khám.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
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

  // Filter and sort logic (done on client-side dynamically)
  const now = new Date();

  const filteredAppointments = appointments
    .filter((appt) => {
      // Exclude draft status
      if (appt.status === 'draft') return false;

      // Date Range Filter
      const apptTime = new Date(appt.appointmentTime);
      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        if (apptTime < start) return false;
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        if (apptTime > end) return false;
      }

      // Patient Name Filter
      if (nameFilter) {
        const fullName = (appt.patientUser?.fullName || '').toLowerCase();
        if (!fullName.includes(nameFilter.toLowerCase())) return false;
      }

      // Phone Filter
      if (phoneFilter) {
        const phone = (appt.patientUser?.phone || '');
        if (!phone.includes(phoneFilter)) return false;
      }

      // Email Filter
      if (emailFilter) {
        const email = (appt.patientUser?.email || '').toLowerCase();
        if (!email.includes(emailFilter.toLowerCase())) return false;
      }

      return true;
    })
    .sort((a, b) => {
      const timeA = new Date(a.appointmentTime).getTime();
      const timeB = new Date(b.appointmentTime).getTime();

      if (sortOrder === 'newest') {
        // Created date or appointment date descending
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortOrder === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else {
        // By appointment time ascending
        return timeA - timeB;
      }
    });

  const displayedAppointments = filteredAppointments.slice(0, visibleCount);

  // Helper function to color code rows
  const getRowClass = (appointmentTimeStr: string) => {
    const apptTime = new Date(appointmentTimeStr).getTime();
    const currentTime = now.getTime();
    const thirtyMins = 30 * 60 * 1000;

    if (apptTime < currentTime - thirtyMins) {
      // Past: gray background
      return 'bg-slate-100/60 dark:bg-slate-800/40 text-slate-500 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 transition-colors';
    } else if (apptTime > currentTime + thirtyMins) {
      // Future: green background
      return 'bg-green-50/45 dark:bg-green-950/10 text-green-800 dark:text-green-300 hover:bg-green-100/50 dark:hover:bg-green-950/20 transition-colors';
    } else {
      // Current slot: blue background
      return 'bg-blue-50/60 dark:bg-blue-950/20 text-blue-900 dark:text-blue-300 font-medium hover:bg-blue-100/60 dark:hover:bg-blue-950/35 transition-colors';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/45 text-yellow-800 dark:text-yellow-300">Chờ khám</span>;
      case 'confirmed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/45 text-blue-800 dark:text-blue-300">Đã xác nhận</span>;
      case 'completed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/45 text-green-800 dark:text-green-300">Hoàn thành</span>;
      case 'cancelled':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/45 text-red-800 dark:text-red-300">Đã hủy</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-900/45 text-slate-800 dark:text-slate-300">{status}</span>;
    }
  };

  return (
    <DashboardLayout>
      {/* data-stitch-id: booking-history-container-001 */}
      <div className="flex-1 p-8 max-w-7xl mx-auto w-full dark:bg-background-dark transition-colors">
        <div className="mb-8">
          <h1 className="font-h1 text-on-surface dark:text-white mb-2">{bookingHistory.title}</h1>
          <p className="text-slate-500 dark:text-slate-400 font-body-md">{bookingHistory.subtitle}</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 rounded-lg text-sm border border-red-100 dark:border-red-900">
            {error}
          </div>
        )}

        {/* Filters Section */}
        <div className="bg-white dark:bg-elevated p-6 rounded-xl border border-outline-variant dark:border-slate-800 shadow-sm mb-8 transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Từ ngày</label>
              <input 
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm dark:text-slate-200 focus:border-blue-500 focus:ring-0 outline-none" 
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Đến ngày</label>
              <input 
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm dark:text-slate-200 focus:border-blue-500 focus:ring-0 outline-none" 
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{bookingHistory.filters.name}</label>
              <input 
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm dark:text-slate-200 focus:border-blue-500 focus:ring-0 outline-none" 
                placeholder="Nhập tên..." 
                type="text"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{bookingHistory.filters.phone}</label>
              <input 
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm dark:text-slate-200 focus:border-blue-500 focus:ring-0 outline-none" 
                placeholder="09xx..." 
                type="tel"
                value={phoneFilter}
                onChange={(e) => setPhoneFilter(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{bookingHistory.filters.email}</label>
              <input 
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm dark:text-slate-200 focus:border-blue-500 focus:ring-0 outline-none" 
                placeholder="example@..." 
                type="email"
                value={emailFilter}
                onChange={(e) => setEmailFilter(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{bookingHistory.filters.sort}</label>
              <select 
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm dark:text-slate-200 focus:border-blue-500 focus:ring-0 outline-none"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="newest">Mới nhất</option>
                <option value="oldest">Cũ nhất</option>
                <option value="time">Giờ khám</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-4 gap-2">
            <button 
              onClick={() => {
                setStartDate('');
                setEndDate('');
                setNameFilter('');
                setPhoneFilter('');
                setEmailFilter('');
                setSortOrder('newest');
              }}
              className="px-4 py-2 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              Reset bộ lọc
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white dark:bg-elevated rounded-xl border border-outline-variant dark:border-slate-800 shadow-sm overflow-hidden mb-6 transition-colors">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                  {bookingHistory.tableHeaders.map((header, idx) => (
                    <th key={idx} className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {displayedAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                      Không tìm thấy lịch hẹn khám nào khớp với bộ lọc.
                    </td>
                  </tr>
                ) : (
                  displayedAppointments.map((appt, idx) => (
                    <tr 
                      key={appt.id} 
                      onClick={() => navigate(`/appointments/${appt.id}`)}
                      className={`${getRowClass(appt.appointmentTime)} cursor-pointer`}
                    >
                      <td className="px-6 py-4 text-sm font-medium">{idx + 1}</td>
                      <td className="px-6 py-4 text-sm font-semibold">
                        {new Date(appt.appointmentTime).toLocaleString('vi-VN', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">{appt.patientUser?.fullName || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm">{appt.patientUser?.phone || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm">{appt.patientUser?.email || 'N/A'}</td>
                      <td className="px-6 py-4">{getStatusBadge(appt.status)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Load More Button */}
        {filteredAppointments.length > visibleCount && (
          <div className="flex justify-center mt-6">
            <button 
              onClick={() => setVisibleCount((prev) => prev + 15)}
              className="bg-blue-700 text-white px-8 py-2.5 rounded-lg font-bold hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 transition-all shadow-md flex items-center gap-2"
            >
              <span className="material-symbols-outlined">expand_more</span>
              Tải thêm 15 kết quả
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BookingHistory;
