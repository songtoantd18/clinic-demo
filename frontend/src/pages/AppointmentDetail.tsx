import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import PatientLayout from '../layouts/PatientLayout';
import { getAppointmentDetail, updateAppointment, updatePrescription, cancelAppointment, getOwnProfile } from '../services/api';

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

export const AppointmentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userRole, setUserRole] = useState<'clinic' | 'patient' | null>(null);

  // Editable fields
  const [appointmentTime, setAppointmentTime] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [testResults, setTestResults] = useState('');
  const [medications, setMedications] = useState<Medication[]>([]);
  const [prescriptionNotes, setPrescriptionNotes] = useState('');

  // Loaded appointment ID
  const activeId = id;

  useEffect(() => {
    async function loadAppointment() {
      if (!activeId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);

        // Fetch own role first
        try {
          const profile = await getOwnProfile();
          setUserRole(profile?.role || null);
        } catch (e) {
          if (localStorage.getItem('clinic_token')) {
            setUserRole('clinic');
          } else if (localStorage.getItem('patient_token')) {
            setUserRole('patient');
          }
        }

        const data = await getAppointmentDetail(activeId);
        setAppointment(data);
        
        // Populate inputs
        if (data.appointmentTime) {
          // Format Date to YYYY-MM-DDTHH:MM for datetime-local input
          const localDate = new Date(data.appointmentTime);
          const offset = localDate.getTimezoneOffset();
          const adjustedDate = new Date(localDate.getTime() - offset * 60 * 1000);
          setAppointmentTime(adjustedDate.toISOString().substring(0, 16));
        }
        setSymptoms(data.symptoms || '');
        setDiagnosis(data.diagnosis || '');
        setTestResults(data.testResults || '');
        
        if (data.prescription) {
          setMedications(data.prescription.medications || []);
          setPrescriptionNotes(data.notes || data.prescription.notes || '');
        } else {
          setMedications([]);
          setPrescriptionNotes('');
        }
      } catch (err: any) {
        setError(err.message || 'Không thể tải chi tiết lịch hẹn.');
      } finally {
        setLoading(false);
      }
    }
    loadAppointment();
  }, [activeId]);

  const Layout = userRole === 'patient' ? PatientLayout : DashboardLayout;

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <span className="material-symbols-outlined text-[32px] text-blue-700 dark:text-blue-400 animate-spin">sync</span>
        </div>
      </Layout>
    );
  }

  if (!activeId || !appointment) {
    return (
      <Layout>
        <div className="p-8 max-w-4xl mx-auto text-center dark:bg-background-dark min-h-[50vh]">
          <p className="text-slate-500 dark:text-slate-400">Không tìm thấy mã lịch hẹn nào hoặc không có quyền truy cập.</p>
          <button 
            onClick={() => navigate(userRole === 'patient' ? '/patient-history' : '/booking-history')}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all"
          >
            Quay lại lịch sử đặt khám
          </button>
        </div>
      </Layout>
    );
  }

  const isFuture = new Date(appointment.appointmentTime) > new Date();
  const isCancelled = appointment.status === 'cancelled';
  const isCompleted = appointment.status === 'completed';
  const isReadOnly = userRole === 'patient' || isCompleted || isCancelled;

  const handleAddMedication = () => {
    setMedications(prev => [...prev, { name: '', dosage: '', frequency: '', duration: '' }]);
  };

  const handleRemoveMedication = (index: number) => {
    setMedications(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleMedicationChange = (index: number, field: keyof Medication, value: string) => {
    setMedications(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSaveChanges = async () => {
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      // 1. Update basic info if not completed or cancelled
      if (!isCompleted && !isCancelled) {
        await updateAppointment(activeId, {
          appointmentTime: new Date(appointmentTime).toISOString(),
          symptoms
        });
      }

      // 2. Save medical results / prescription (this will set status to completed)
      await updatePrescription(activeId, {
        diagnosis,
        testResults,
        prescription: {
          medications: medications.filter(m => m.name.trim() !== ''),
          notes: prescriptionNotes
        }
      });

      setSuccess('Cập nhật thông tin khám bệnh thành công!');
      // Reload updated appointment
      const data = await getAppointmentDetail(activeId);
      setAppointment(data);
    } catch (err: any) {
      setError(err.message || 'Lỗi xảy ra khi lưu thông tin.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn hủy lịch hẹn khám này?')) return;
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      await cancelAppointment(activeId);
      setSuccess('Đã hủy lịch hẹn và gửi email thông báo tới bệnh nhân.');
      const data = await getAppointmentDetail(activeId);
      setAppointment(data);
    } catch (err: any) {
      setError(err.message || 'Lỗi khi hủy lịch hẹn.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      {/* data-stitch-id: main-container-001 */}
      <div className="flex-1 p-8 lg:p-12 overflow-y-auto bg-slate-50 dark:bg-background-dark transition-colors">
        <div className="max-w-4xl mx-auto">
          {/* Header section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div 
                onClick={() => navigate(userRole === 'patient' ? '/patient-history' : '/booking-history')}
                className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2 cursor-pointer hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                <span className="text-caption font-medium uppercase">QUAY LẠI DANH SÁCH</span>
              </div>
              <h1 className="font-h1 text-on-background dark:text-white flex items-center gap-3">
                Chi tiết lịch khám #{appointment.appointmentCode}
                {isCancelled && <span className="text-xs bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-400 px-3 py-1 rounded-full font-bold">ĐÃ HỦY</span>}
                {isCompleted && <span className="text-xs bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-400 px-3 py-1 rounded-full font-bold">HOÀN THÀNH</span>}
                {!isCancelled && !isCompleted && <span className="text-xs bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-400 px-3 py-1 rounded-full font-bold">CHỜ KHÁM</span>}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              {isFuture && !isCancelled && !isCompleted && (
                <button 
                  onClick={handleCancel}
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl border border-red-500 text-red-600 dark:text-red-400 dark:border-red-800 font-label-md hover:bg-red-50 dark:hover:bg-red-950/20 disabled:opacity-50 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">cancel</span>
                  Hủy lịch khám
                </button>
              )}
              {!isReadOnly && (
                <button 
                  onClick={handleSaveChanges}
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-primary dark:bg-blue-600 text-white font-label-md hover:shadow-lg disabled:opacity-50 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">save</span>
                  Lưu thay đổi
                </button>
              )}
            </div>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Patient Card */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-white dark:bg-elevated border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm transition-colors">
                <h2 className="font-h3 text-on-surface dark:text-slate-200 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                  Bệnh nhân
                </h2>
                <div className="flex flex-col items-center mb-6">
                  <span className="material-symbols-outlined text-[64px] text-slate-300 mb-2">account_circle</span>
                  <p className="font-h3 text-on-surface dark:text-white text-center">
                    {appointment.patientUser?.fullName || 'N/A'}
                  </p>
                  {appointment.patientUser?.profileCompleted && (
                    <span className="bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-caption font-bold mt-2">
                      ĐÃ XÁC MINH
                    </span>
                  )}
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <span className="material-symbols-outlined text-primary">call</span>
                    <span className="font-body-md">{appointment.patientUser?.phone || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <span className="material-symbols-outlined text-primary">mail</span>
                    <span className="font-body-md truncate max-w-[200px]">{appointment.patientUser?.email || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <span className="material-symbols-outlined text-primary">badge</span>
                    <span className="font-body-md">CMND: {appointment.patientUser?.idNumber || 'Chưa cung cấp'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Diagnosis & Prescription Fields */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white dark:bg-elevated border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm transition-colors">
                <h2 className="font-h3 text-on-surface dark:text-slate-200 mb-6 pb-2 border-b border-slate-100 dark:border-slate-800">
                  Thông tin ca khám & Kết quả
                </h2>
                
                <div className="space-y-6">
                  {/* Reschedule Date & Time */}
                  <div>
                    <label className="font-label-sm text-slate-500 dark:text-slate-400 block mb-2">
                      Thời gian khám bệnh
                    </label>
                    <input 
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 font-body-md text-on-surface dark:text-slate-300 focus:ring-2 focus:ring-primary outline-none disabled:opacity-50 disabled:cursor-not-allowed" 
                      type="datetime-local" 
                      value={appointmentTime}
                      onChange={(e) => setAppointmentTime(e.target.value)}
                      disabled={isReadOnly}
                    />
                    {!isReadOnly && (
                      <p className="text-xs text-slate-400 mt-1">Thay đổi giờ khám sẽ gửi email thông báo tự động cho bệnh nhân.</p>
                    )}
                  </div>

                  {/* Symptoms */}
                  <div>
                    <label className="font-label-sm text-slate-500 dark:text-slate-400 block mb-2">
                      Triệu chứng lâm sàng
                    </label>
                    <textarea 
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2 font-body-md text-on-surface dark:text-slate-300 focus:ring-2 focus:ring-primary outline-none disabled:opacity-50" 
                      rows={3} 
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                      disabled={isReadOnly}
                      placeholder="Nhập triệu chứng của bệnh nhân..."
                    />
                  </div>

                  {/* Diagnosis */}
                  <div>
                    <label className="font-label-sm text-slate-500 dark:text-slate-400 block mb-2 font-bold">
                      Chẩn đoán của Bác sĩ
                    </label>
                    <textarea 
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2 font-body-md text-on-surface dark:text-slate-300 focus:ring-2 focus:ring-primary outline-none disabled:opacity-50" 
                      rows={3} 
                      value={diagnosis}
                      onChange={(e) => setDiagnosis(e.target.value)}
                      disabled={isReadOnly}
                      placeholder="Nhập kết luận bệnh tình..."
                    />
                  </div>

                  {/* Test Results */}
                  <div>
                    <label className="font-label-sm text-slate-500 dark:text-slate-400 block mb-2">
                      Kết quả xét nghiệm / Cận lâm sàng
                    </label>
                    <textarea 
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2 font-body-md text-on-surface dark:text-slate-300 focus:ring-2 focus:ring-primary outline-none disabled:opacity-50" 
                      rows={3} 
                      value={testResults}
                      onChange={(e) => setTestResults(e.target.value)}
                      disabled={isReadOnly}
                      placeholder="Nhập kết quả xét nghiệm máu, siêu âm, chụp X-quang..."
                    />
                  </div>

                  {/* Prescription Section */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-label-sm text-slate-500 dark:text-slate-400 font-bold">
                        Đơn thuốc
                      </label>
                      {!isReadOnly && (
                        <button 
                          type="button" 
                          onClick={handleAddMedication}
                          className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-slate-800 dark:text-blue-400 px-3 py-1 rounded flex items-center gap-1 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[14px]">add</span>
                          Thêm thuốc
                        </button>
                      )}
                    </div>

                    <div className="space-y-3 mb-4">
                      {medications.map((med, idx) => (
                        <div key={idx} className="flex gap-2 items-center bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                          <input 
                            placeholder="Tên thuốc" 
                            className="flex-1 bg-white dark:bg-slate-800 text-sm py-1.5 px-2.5 rounded border border-slate-200 dark:border-slate-700 text-on-surface dark:text-slate-200 outline-none"
                            value={med.name}
                            onChange={(e) => handleMedChange(idx, 'name', e.target.value)}
                            disabled={isReadOnly}
                          />
                          <input 
                            placeholder="Liều lượng (VD: 500mg)" 
                            className="w-24 bg-white dark:bg-slate-800 text-sm py-1.5 px-2.5 rounded border border-slate-200 dark:border-slate-700 text-on-surface dark:text-slate-200 outline-none"
                            value={med.dosage}
                            onChange={(e) => handleMedChange(idx, 'dosage', e.target.value)}
                            disabled={isReadOnly}
                          />
                          <input 
                            placeholder="Tần suất (VD: 2 lần/ngày)" 
                            className="w-32 bg-white dark:bg-slate-800 text-sm py-1.5 px-2.5 rounded border border-slate-200 dark:border-slate-700 text-on-surface dark:text-slate-200 outline-none"
                            value={med.frequency}
                            onChange={(e) => handleMedChange(idx, 'frequency', e.target.value)}
                            disabled={isReadOnly}
                          />
                          <input 
                            placeholder="Thời gian (VD: 5 ngày)" 
                            className="w-24 bg-white dark:bg-slate-800 text-sm py-1.5 px-2.5 rounded border border-slate-200 dark:border-slate-700 text-on-surface dark:text-slate-200 outline-none"
                            value={med.duration}
                            onChange={(e) => handleMedChange(idx, 'duration', e.target.value)}
                            disabled={isReadOnly}
                          />
                          {!isReadOnly && (
                            <button 
                              type="button" 
                              onClick={() => handleRemoveMedication(idx)}
                              className="text-red-500 hover:text-red-700 p-1 flex items-center"
                            >
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <label className="font-label-sm text-slate-500 dark:text-slate-400 block mb-1">
                      Lời dặn / Ghi chú đơn thuốc
                    </label>
                    <textarea 
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2 font-body-md text-on-surface dark:text-slate-300 focus:ring-2 focus:ring-primary outline-none disabled:opacity-50" 
                      rows={2} 
                      value={prescriptionNotes}
                      onChange={(e) => setPrescriptionNotes(e.target.value)}
                      disabled={isReadOnly}
                      placeholder="Lời dặn uống thuốc, tái khám..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );

  function handleMedChange(index: number, field: keyof Medication, value: string) {
    handleMedicationChange(index, field, value);
  }
};

export default AppointmentDetail;
