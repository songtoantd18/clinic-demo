import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientLayout from '../layouts/PatientLayout';
import { listAppointments } from '../services/api';

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

interface Appointment {
  id: string;
  appointmentCode: string;
  appointmentTime: string;
  symptoms: string;
  diagnosis?: string;
  testResults?: string;
  status: string;
  prescription?: {
    medications: Medication[];
    notes: string;
  };
  clinicUser?: {
    clinicName: string;
    address: string;
    phone: string;
    email: string;
  };
}

export const PatientHistory: React.FC = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);

  useEffect(() => {
    async function loadHistory() {
      // Check if patient token exists
      const token = localStorage.getItem('patient_token');
      if (!token) {
        setError('Vui lòng đăng nhập tài khoản bệnh nhân để xem lịch sử khám.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Call backend listAppointments (backend will automatically filter by patientId based on JWT)
        const data = await listAppointments();
        // Filter out draft appointments
        const nonDrafts = (data || []).filter((appt: Appointment) => appt.status !== 'draft');
        setAppointments(nonDrafts);
      } catch (err: any) {
        setError(err.message || 'Không thể tải lịch sử khám bệnh.');
      } finally {
        setLoading(false);
      }
    }
    loadHistory();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300">Chờ khám</span>;
      case 'confirmed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300">Đã xác nhận</span>;
      case 'completed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300">Hoàn thành</span>;
      case 'cancelled':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300">Đã hủy</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300">{status}</span>;
    }
  };

  return (
    <PatientLayout>
      {/* data-stitch-id: patient-history-container-001 */}
      <div className="max-w-7xl mx-auto px-6 py-8 dark:bg-background-dark transition-colors min-h-[70vh]">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-h1 text-on-surface dark:text-white">Lịch sử khám bệnh</h1>
            <p className="text-slate-500 dark:text-slate-400">Xem lại các lịch hẹn khám, kết quả chẩn đoán và đơn thuốc từ bác sĩ.</p>
          </div>
          {!localStorage.getItem('patient_token') && (
            <button
              onClick={() => navigate('/patient-login')}
              className="bg-primary dark:bg-blue-600 text-white px-6 py-2.5 rounded-xl font-label-md hover:shadow-lg transition-all"
            >
              Đăng nhập ngay
            </button>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 rounded-lg text-sm border border-red-100 dark:border-red-900">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <span className="material-symbols-outlined text-[32px] text-blue-700 dark:text-blue-400 animate-spin">sync</span>
          </div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-elevated rounded-xl border border-outline-variant dark:border-slate-800 shadow-sm">
            <span className="material-symbols-outlined text-[64px] text-slate-300 dark:text-slate-700 mb-4">calendar_today</span>
            <p className="text-slate-500 dark:text-slate-400">Bạn chưa có lịch hẹn khám nào trong hệ thống.</p>
            <button
              onClick={() => navigate('/patient-home')}
              className="mt-4 bg-primary dark:bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:shadow-md transition-all"
            >
              Tìm phòng khám & Đặt lịch
            </button>
          </div>
        ) : (
          <div className="bg-white dark:bg-elevated rounded-xl border border-outline-variant dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-16">STT</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-48">Thời gian</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tên Phòng khám</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Địa chỉ</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Bệnh chẩn đoán</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-40 text-center">Chi tiết</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {appointments.map((appt, idx) => (
                    <tr key={appt.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 font-medium">{idx + 1}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {new Date(appt.appointmentTime).toLocaleString('vi-VN', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-on-surface dark:text-white">
                        {appt.clinicUser?.clinicName || 'Phòng khám'}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 max-w-xs truncate">
                        {appt.clinicUser?.address || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 max-w-xs truncate">
                        {appt.diagnosis || (appt.status === 'completed' ? 'Chẩn đoán trống' : 'Chờ khám')}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => setSelectedAppt(appt)}
                          className="bg-primary/10 hover:bg-primary/20 text-primary dark:bg-blue-900/30 dark:hover:bg-blue-900/50 dark:text-blue-300 px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 mx-auto"
                        >
                          <span className="material-symbols-outlined text-[14px]">visibility</span>
                          Đơn thuốc
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Prescription & Medical Record Modal */}
      {selectedAppt && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-elevated w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden border border-outline-variant dark:border-slate-800 transition-all">
            {/* Modal Header */}
            <div className="bg-slate-50 dark:bg-slate-900 px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="font-h3 text-on-surface dark:text-white">Chi tiết kết quả khám & Đơn thuốc</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500">Mã lịch hẹn: {selectedAppt.appointmentCode}</p>
              </div>
              <button
                onClick={() => setSelectedAppt(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6">
              {/* Clinic & Appointment Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 mb-1">Thông tin Phòng khám</h4>
                  <p className="font-bold text-on-surface dark:text-white text-sm">{selectedAppt.clinicUser?.clinicName}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{selectedAppt.clinicUser?.address}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">SĐT: {selectedAppt.clinicUser?.phone}</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 mb-1">Chi tiết cuộc hẹn</h4>
                  <p className="text-sm dark:text-slate-300">
                    Thời gian: <span className="font-semibold">{new Date(selectedAppt.appointmentTime).toLocaleString('vi-VN')}</span>
                  </p>
                  <p className="text-sm mt-1 flex items-center gap-2">
                    Trạng thái: {getStatusBadge(selectedAppt.status)}
                  </p>
                </div>
              </div>

              {/* Patient Symptoms */}
              <div>
                <h4 className="font-h3 text-on-surface dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-2 mb-2">
                  Tình trạng ban đầu
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 italic bg-amber-50/50 dark:bg-amber-950/10 p-3 rounded-lg border border-amber-100/50 dark:border-amber-950/30">
                  "{selectedAppt.symptoms || 'Không khai báo triệu chứng'}"
                </p>
              </div>

              {/* Diagnosis & Test Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-h3 text-on-surface dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-2 mb-2">
                    Chẩn đoán bệnh
                  </h4>
                  <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 p-3 rounded-lg border border-emerald-100 dark:border-emerald-950/20">
                    {selectedAppt.diagnosis || 'Chưa có chẩn đoán từ bác sĩ.'}
                  </p>
                </div>
                <div>
                  <h4 className="font-h3 text-on-surface dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-2 mb-2">
                    Kết quả cận lâm sàng
                  </h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                    {selectedAppt.testResults || 'Chưa có kết quả xét nghiệm.'}
                  </p>
                </div>
              </div>

              {/* Prescription Medications */}
              <div>
                <h4 className="font-h3 text-on-surface dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-2 mb-3">
                  Đơn thuốc bác sĩ kê
                </h4>
                {selectedAppt.prescription && selectedAppt.prescription.medications && selectedAppt.prescription.medications.length > 0 ? (
                  <div className="space-y-2">
                    {selectedAppt.prescription.medications.map((med, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                          <span className="font-bold text-sm text-on-surface dark:text-white">{med.name}</span>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-2 sm:mt-0 text-xs text-slate-500 dark:text-slate-400">
                          <span>Liều: <strong className="text-slate-700 dark:text-slate-300">{med.dosage}</strong></span>
                          <span>Tần suất: <strong className="text-slate-700 dark:text-slate-300">{med.frequency}</strong></span>
                          <span>Dùng trong: <strong className="text-slate-700 dark:text-slate-300">{med.duration}</strong></span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 dark:text-slate-400 italic">Không có đơn thuốc nào được kê.</p>
                )}

                {selectedAppt.prescription?.notes && (
                  <div className="mt-4 p-3 bg-blue-50/50 dark:bg-blue-950/10 rounded-lg border border-blue-100/50 dark:border-blue-950/20">
                    <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider block mb-1">Lời dặn của bác sĩ:</span>
                    <p className="text-sm text-slate-700 dark:text-slate-300">{selectedAppt.prescription.notes}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 dark:bg-slate-900 px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-xl text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">print</span>
                In đơn thuốc
              </button>
              <button
                onClick={() => setSelectedAppt(null)}
                className="px-6 py-2 bg-primary dark:bg-blue-600 text-white rounded-xl text-sm font-semibold hover:shadow-md transition-all"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </PatientLayout>
  );
};

export default PatientHistory;

