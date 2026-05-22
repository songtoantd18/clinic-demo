import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PatientLayout from '../layouts/PatientLayout';
import { commonData } from '../data/mockData';
import { getClinicDetail, getAvailableSlots, getAuthToken } from '../services/api';

export const ClinicDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { clinicDetail } = commonData;

  const [clinic, setClinic] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 7 Days states
  const [dates, setDates] = useState<Date[]>([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);

  // Slots states
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('');

  // Generate next 7 days starting from today
  useEffect(() => {
    const list: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      list.push(d);
    }
    setDates(list);
  }, []);

  // Fetch clinic profile
  useEffect(() => {
    async function loadClinic() {
      const clinicId = id || 'clinic-id-fallback'; // Fallback logic if needed
      try {
        setLoading(true);
        const data = await getClinicDetail(clinicId);
        setClinic(data);
      } catch (err: any) {
        setError(err.message || 'Không thể tải chi tiết phòng khám.');
      } finally {
        setLoading(false);
      }
    }
    loadClinic();
  }, [id]);

  // Fetch available slots when date changes or clinic is loaded
  useEffect(() => {
    async function fetchSlots() {
      if (!clinic || dates.length === 0) return;
      const targetDate = dates[selectedDateIndex];
      // Format to YYYY-MM-DD
      const dateStr = targetDate.toISOString().substring(0, 10);
      try {
        setLoadingSlots(true);
        setSlots([]);
        setSelectedSlot('');
        
        const data = await getAvailableSlots(clinic.id, dateStr);
        setSlots(data || []);
      } catch (err: any) {
        // If api fails, fallback to some mock active slots or empty
        setSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    }
    fetchSlots();
  }, [clinic, dates, selectedDateIndex]);

  const handleBooking = () => {
    if (!selectedSlot) {
      alert('Vui lòng chọn khung giờ khám!');
      return;
    }

    // Check login
    const patientToken = getAuthToken('patient');
    if (!patientToken) {
      alert('Bạn cần đăng nhập bằng tài khoản bệnh nhân để đặt lịch.');
      navigate('/patient-login');
      return;
    }

    const targetDate = dates[selectedDateIndex];
    const dateStr = targetDate.toISOString().substring(0, 10);
    // Combine date + slot into ISO String for appointmentTime
    const appointmentTimeStr = `${dateStr}T${selectedSlot}:00`;

    // Navigate to quick booking passing data in state
    navigate('/quick-booking', {
      state: {
        clinicId: clinic.id,
        clinicName: clinic.clinicName,
        appointmentTime: appointmentTimeStr,
        slot: selectedSlot
      }
    });
  };

  if (loading) {
    return (
      <PatientLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <span className="material-symbols-outlined text-[32px] text-blue-700 dark:text-blue-400 animate-spin">sync</span>
        </div>
      </PatientLayout>
    );
  }

  if (!clinic) {
    return (
      <PatientLayout>
        <div className="max-w-4xl mx-auto p-12 text-center">
          <p className="text-slate-500">Không tìm thấy phòng khám yêu cầu.</p>
          <button 
            onClick={() => navigate('/patient-home')}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/95 transition-all"
          >
            Quay về trang chủ
          </button>
        </div>
      </PatientLayout>
    );
  }

  // Group slots into Morning (before 12:00) and Afternoon (after 12:00)
  const morningSlots = slots.filter(s => parseInt(s.split(':')[0], 10) < 12);
  const afternoonSlots = slots.filter(s => parseInt(s.split(':')[0], 10) >= 12);

  return (
    <PatientLayout>
      <div className="min-h-screen bg-slate-50 dark:bg-background-dark transition-colors">
        {/* Gallery Section */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          <section className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[400px] md:h-[500px] mb-8">
            <div className="md:col-span-2 md:row-span-2 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
              <img alt="Clinic Interior" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" src={clinic.images?.[0] || "https://lh3.googleusercontent.com/aida-public/AB6AXuAMbb2fYjSobnsXa9TOEBC6j6PqLanhW1dEgHlQr2Hti7G5C45fgX3FePL87gBEmO4K3ZT0Ikyd0_pCPFOzDsAbS2MWwWZVp3V3f1ojqywGKVCBYqXhuttJ4qxv1URAJHNi-By99cPiBWQSak--WQVzupagU2DKA6YAB1hc-JZsrw2waqAMPk_vr5f5ttCgI9YRQgmGRfAxaEKajj_DHpsQsx6N_AgmLJ_5ydLJGJuKvv1J70VqH8DOVw6tkhBuvC6SkDxsHZeL"}/>
            </div>
            <div className="md:col-span-2 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
              <img alt="Examination Room" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" src={clinic.images?.[1] || "https://lh3.googleusercontent.com/aida-public/AB6AXuDvodxR6YKOxjXnkxaCoTdbcB4rYEwUtwZknWMTsRZhXJRoI5wATCvlVPGF2Cv4Q3oC7yJV1-o6XeX4x953E7YK2op6Ofwu0jF4oeSlNAKeJW7YQt1XybDhevy4YAqMdcqANrwN-1UcSSSYa57OBnq2NVeYrsDvhAgbbXTzGQrqSH1nxXt-HxP2OJEc05k4WJN46l0OO0cwmTrRJ3W4LFPM4WqpeFjVsvB8luqgpe8fvUCe2Op9ry-z63RH62-maU692FiJBGgv"}/>
            </div>
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
              <img alt="Waiting Area" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" src={clinic.images?.[2] || "https://lh3.googleusercontent.com/aida-public/AB6AXuA-p6g-3o1yvY0LrztQ-7-6wY3iJMhZzJsTVMo7iD7w1p3ym7Hc6Q0wG4xMOrXk94uzm5n-SxnQUFWcejvhuqHoVx2PJt8A-ctCWfDWuaYW0uxipybkYo7LjBQqnbKgg4NU97bri_seSBL2x41vY_fxPlYh3xty_Qab7mJmQpzLevl_chjZ6kwudwfpUNRZ1Vm1jShU8zcrOsp5URhZeaGbHtDXtEtor-WzMtODsZdb6q9TduGMA17MQoNjmJhOmzqIusfOsgE7"}/>
            </div>
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm relative transition-colors">
              <img alt="Clinic Building" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuABpnBiaQFgGcHm39zg3CQDOzOrmJ2QuDldDAj4yuRFe6IyRdj7qqpRQ5QYTDYmtUb8XXb7qd8d12pVnr21PrKJGCsaTS8ConW68H4nDWYdwfH04e2RzxbP5vlQmFt_T2pmZ00iT6kpG69-oe7jjdy9YcR0DQyeFQm2yB7F8_zqIWOlnVTUOBB1NtsFMkPcWzivIJzusy4StkcnzjnN-06MFmCp5T4JpG8hL1tJ2-pEF9XyTJEiwUH-VJ5UpJ2ETAs-LKorBbmL"/>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white text-xs font-semibold uppercase">Hình ảnh phòng khám</span>
              </div>
            </div>
          </section>

          {/* Content details grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Main Clinic Profile */}
              <div className="bg-white dark:bg-elevated p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">{clinic.clinicName}</h1>
                    <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-lg">location_on</span>
                        <span className="text-sm">{clinic.address || 'Chưa cập nhật địa chỉ'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
                  <h2 className="font-h3 text-on-surface dark:text-white mb-4">Giới thiệu phòng khám</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                    {clinic.description || 'Thông tin giới thiệu phòng khám đang được cập nhật.'}
                  </p>
                </div>

                {clinic.specialties && clinic.specialties.length > 0 && (
                  <div className="border-t border-slate-100 dark:border-slate-800 pt-6 mt-6">
                    <h2 className="font-h3 text-on-surface dark:text-white mb-3">Chuyên khoa nổi bật</h2>
                    <div className="flex flex-wrap gap-2">
                      {clinic.specialties.map((s: string, idx: number) => (
                        <span key={idx} className="bg-blue-50 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs px-3 py-1 rounded-full font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Doctors Description */}
              <div className="bg-white dark:bg-elevated p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                <h2 className="font-h3 text-on-surface dark:text-white mb-4">Đội ngũ bác sĩ phụ trách</h2>
                <div className="flex items-start gap-4 p-4 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/50">
                  <span className="material-symbols-outlined text-[48px] text-slate-400">medical_services</span>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200">Bác sĩ phụ trách chính</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 whitespace-pre-line">
                      {clinic.doctorInfo || 'Thông tin bác sĩ đang được cập nhật.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Time slot Selector Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white dark:bg-elevated rounded-xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden transition-colors">
                  <div className="bg-blue-700 dark:bg-blue-800 p-6 text-white">
                    <h3 className="font-h3 text-lg font-bold">{clinicDetail.bookingTitle}</h3>
                    <p className="text-xs opacity-90">{clinicDetail.bookingSubtitle}</p>
                  </div>
                  
                  <div className="p-6">
                    {/* Horizontal 7 Days Carousel */}
                    <div className="flex gap-2.5 overflow-x-auto hide-scrollbar mb-6 pb-2 border-b border-slate-100 dark:border-slate-800">
                      {dates.map((date, idx) => {
                        const isSelected = selectedDateIndex === idx;
                        const dayOfWeek = date.toLocaleDateString('vi-VN', { weekday: 'short' });
                        const dateNum = date.getDate();
                        return (
                          <button 
                            key={idx} 
                            onClick={() => setSelectedDateIndex(idx)}
                            className={`flex-shrink-0 w-14 py-3 rounded-lg border text-center transition-all ${
                              isSelected 
                                ? 'border-2 border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold' 
                                : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                            }`}
                          >
                            <span className="block text-[10px] uppercase">{dayOfWeek}</span>
                            <span className="block text-lg mt-0.5">{dateNum}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Available slots */}
                    <div className="space-y-4 mb-8">
                      {loadingSlots ? (
                        <div className="flex items-center justify-center py-6">
                          <span className="material-symbols-outlined text-[24px] text-blue-700 animate-spin">sync</span>
                        </div>
                      ) : slots.length === 0 ? (
                        <div className="text-center py-6 text-xs text-slate-400">
                          Không có ca khám trống nào trong ngày này.
                        </div>
                      ) : (
                        <>
                          {morningSlots.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Buổi Sáng</h4>
                              <div className="grid grid-cols-3 gap-2">
                                {morningSlots.map(slot => (
                                  <button 
                                    key={slot}
                                    type="button"
                                    onClick={() => setSelectedSlot(slot)}
                                    className={`py-2 text-sm font-medium border rounded-lg transition-all ${
                                      selectedSlot === slot 
                                        ? 'bg-blue-600 border-blue-600 text-white shadow-sm' 
                                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-600'
                                    }`}
                                  >
                                    {slot}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {afternoonSlots.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 mt-4">Buổi Chiều</h4>
                              <div className="grid grid-cols-3 gap-2">
                                {afternoonSlots.map(slot => (
                                  <button 
                                    key={slot}
                                    type="button"
                                    onClick={() => setSelectedSlot(slot)}
                                    className={`py-2 text-sm font-medium border rounded-lg transition-all ${
                                      selectedSlot === slot 
                                        ? 'bg-blue-600 border-blue-600 text-white shadow-sm' 
                                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-600'
                                    }`}
                                  >
                                    {slot}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {/* Booking trigger */}
                    <div className="space-y-4">
                      <button 
                        onClick={handleBooking}
                        disabled={!selectedSlot}
                        className="w-full py-3.5 bg-blue-700 dark:bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        Đặt lịch khám ngay
                      </button>
                      <p className="text-xs text-slate-500 text-center">
                        <span className="material-symbols-outlined text-[12px] align-middle mr-1">lock</span>
                        Yêu cầu cập nhật hồ sơ đầy đủ để tiến hành đặt lịch
                      </p>
                    </div>
                  </div>
                  
                  <div className="border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-4 flex items-center gap-3">
                    <span className="material-symbols-outlined text-green-600 dark:text-green-500 text-lg">verified</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Phòng khám đã được xác minh chính xác</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </PatientLayout>
  );
};

export default ClinicDetail;
