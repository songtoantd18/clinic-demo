import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PatientLayout from '../layouts/PatientLayout';
import { getOwnProfile, createAppointment, listClinics, getAvailableSlots } from '../services/api';

export const QuickBooking: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const stateData = location.state as { clinicId?: string; clinicName?: string; appointmentTime?: string; slot?: string } | null;

  // Profile status
  const [profile, setProfile] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileIncomplete, setProfileIncomplete] = useState(false);

  // Form inputs
  const [clinics, setClinics] = useState<any[]>([]);
  const [selectedClinicId, setSelectedClinicId] = useState(stateData?.clinicId || '');
  const [appointmentTime, setAppointmentTime] = useState(stateData?.appointmentTime || '');
  const [symptoms, setSymptoms] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Manual scheduling if direct access
  const [dates, setDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState(stateData?.slot || '');

  // Generate 7 days
  useEffect(() => {
    const list: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      list.push(d);
    }
    setDates(list);
  }, []);

  // Check profile completeness on load
  useEffect(() => {
    async function checkProfile() {
      try {
        setLoadingProfile(true);
        const data = await getOwnProfile();
        setProfile(data);

        // Required columns validation
        const isIncomplete = 
          !data.fullName || 
          !data.phone || 
          !data.idNumber || 
          !data.dateOfBirth ||
          !data.profileCompleted;
        
        setProfileIncomplete(isIncomplete);

        // Fetch clinics if not passed in state
        if (!stateData?.clinicId) {
          const list = await listClinics();
          setClinics(list || []);
        }
      } catch (err: any) {
        setError('Bạn cần đăng nhập để đặt lịch khám.');
        navigate('/patient-login');
      } finally {
        setLoadingProfile(false);
      }
    }
    checkProfile();
  }, [navigate, stateData]);

  // Fetch slots if clinic and date are chosen directly on this page
  useEffect(() => {
    async function loadSlots() {
      if (stateData?.clinicId || !selectedClinicId || !selectedDate) return;
      try {
        const slots = await getAvailableSlots(selectedClinicId, selectedDate);
        setAvailableSlots(slots || []);
        setSelectedSlot('');
      } catch (err) {
        setAvailableSlots([]);
      }
    }
    loadSlots();
  }, [selectedClinicId, selectedDate, stateData]);

  // Combine selected date and slot if scheduling directly
  useEffect(() => {
    if (!stateData?.clinicId && selectedDate && selectedSlot) {
      setAppointmentTime(`${selectedDate}T${selectedSlot}:00`);
    }
  }, [selectedDate, selectedSlot, stateData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (profileIncomplete) {
      navigate('/patient-profile');
      return;
    }

    if (!selectedClinicId) {
      setError('Vui lòng chọn phòng khám.');
      return;
    }

    if (!appointmentTime) {
      setError('Vui lòng chọn ngày và giờ khám.');
      return;
    }

    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      await createAppointment({
        clinicUserId: selectedClinicId,
        appointmentTime: new Date(appointmentTime).toISOString(),
        symptoms: symptoms
      }, true); // Send directly as submitted

      setSuccess('Đặt lịch khám thành công! Hệ thống đang chuyển hướng...');
      setTimeout(() => {
        navigate('/patient-history');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Lỗi xảy ra khi đặt lịch khám.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingProfile) {
    return (
      <PatientLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <span className="material-symbols-outlined text-[32px] text-blue-700 dark:text-blue-400 animate-spin">sync</span>
        </div>
      </PatientLayout>
    );
  }

  if (profileIncomplete) {
    return (
      <PatientLayout>
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-yellow-200 dark:border-yellow-900 shadow-lg text-center">
            <span className="material-symbols-outlined text-[64px] text-yellow-500 mb-4">warning</span>
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Hồ sơ chưa hoàn thiện</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
              Bạn cần cập nhật đầy đủ thông tin cá nhân bao gồm: Họ tên thật, Số điện thoại, Số CMND/CCCD và Ngày sinh để sử dụng tính năng đặt lịch khám.
            </p>
            <button 
              onClick={() => navigate('/patient-profile')}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-2.5 rounded-lg transition-all"
            >
              Cập nhật hồ sơ ngay
            </button>
          </div>
        </div>
      </PatientLayout>
    );
  }

  return (
    <PatientLayout>
      {/* data-stitch-id: quick-booking-container-001 */}
      <div className="max-w-3xl mx-auto px-6 py-12 dark:bg-background-dark transition-colors">
        <div className="bg-white dark:bg-elevated p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg transition-colors">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Đăng ký lịch khám bệnh</h1>
            <p className="text-slate-500 dark:text-slate-400">Vui lòng kiểm tra lại thông tin và khai báo triệu chứng ban đầu.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 rounded-lg text-sm border border-red-100 dark:border-red-900">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 rounded-lg text-sm border border-green-100 dark:border-green-900">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl">
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Họ tên người khám</label>
                <p className="font-semibold text-slate-800 dark:text-slate-200">{profile?.fullName}</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Số điện thoại liên lạc</label>
                <p className="font-semibold text-slate-800 dark:text-slate-200">{profile?.phone}</p>
              </div>
            </div>

            {stateData?.clinicId ? (
              <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-xl border border-blue-100 dark:border-blue-900">
                <label className="block text-xs font-semibold text-blue-500 dark:text-blue-400 uppercase tracking-wider mb-1">Phòng khám đã chọn</label>
                <p className="font-bold text-blue-900 dark:text-blue-200 text-lg">{stateData.clinicName}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Thời gian: <span className="font-semibold">{new Date(appointmentTime).toLocaleString('vi-VN')}</span> (Khung giờ: {stateData.slot})
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block font-label-sm text-on-surface-variant dark:text-slate-400 mb-2">Chọn phòng khám</label>
                  <select 
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 focus:ring-primary focus:border-primary py-2.5 px-3 outline-none transition-colors"
                    value={selectedClinicId}
                    onChange={(e) => setSelectedClinicId(e.target.value)}
                    required
                  >
                    <option value="">-- Chọn phòng khám từ danh sách --</option>
                    {clinics.map(c => (
                      <option key={c.id} value={c.id}>{c.clinicName} - {c.address}</option>
                    ))}
                  </select>
                </div>

                {selectedClinicId && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-label-sm text-on-surface-variant dark:text-slate-400 mb-2">Chọn ngày khám</label>
                      <select 
                        className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 focus:ring-primary focus:border-primary py-2.5 px-3 outline-none transition-colors"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        required
                      >
                        <option value="">-- Chọn ngày khám --</option>
                        {dates.map((d, idx) => {
                          const dateStr = d.toISOString().substring(0, 10);
                          const formatted = d.toLocaleDateString('vi-VN', { weekday: 'short', month: '2-digit', day: '2-digit' });
                          return <option key={idx} value={dateStr}>{formatted}</option>;
                        })}
                      </select>
                    </div>

                    <div>
                      <label className="block font-label-sm text-on-surface-variant dark:text-slate-400 mb-2">Chọn ca/khung giờ</label>
                      <select 
                        className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 focus:ring-primary focus:border-primary py-2.5 px-3 outline-none transition-colors"
                        value={selectedSlot}
                        onChange={(e) => setSelectedSlot(e.target.value)}
                        required
                        disabled={!selectedDate}
                      >
                        <option value="">-- Chọn giờ khám trống --</option>
                        {availableSlots.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div>
              <label className="block font-label-sm text-on-surface-variant dark:text-slate-400 mb-2">Khai báo triệu chứng lâm sàng ban đầu</label>
              <textarea 
                className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 focus:ring-primary focus:border-primary py-2.5 px-3 outline-none transition-colors" 
                placeholder="Nhập chi tiết các triệu chứng hiện tại của bạn..." 
                rows={4}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-700 dark:bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-800 disabled:opacity-50 transition-all shadow-md"
            >
              {submitting ? 'Đang gửi yêu cầu đặt lịch...' : 'Xác nhận đặt lịch hẹn'}
            </button>
          </form>
        </div>
      </div>
    </PatientLayout>
  );
};

export default QuickBooking;
