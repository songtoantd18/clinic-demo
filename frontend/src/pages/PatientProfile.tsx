import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientLayout from '../layouts/PatientLayout';
import { getOwnProfile, updateOwnProfile, clearAuthToken } from '../services/api';

const PatientProfile: React.FC = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    phone: '',
    email: '',
    idNumber: '',
    dateOfBirth: '',
    address: '',
    profileCompleted: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getOwnProfile();
        // Convert dateOfBirth to YYYY-MM-DD if present
        let dobStr = '';
        if (data.dateOfBirth) {
          dobStr = new Date(data.dateOfBirth).toISOString().substring(0, 10);
        }
        setProfile({
          fullName: data.fullName || '',
          phone: data.phone || '',
          email: data.email || '',
          idNumber: data.idNumber || '',
          dateOfBirth: dobStr,
          address: data.address || '',
          profileCompleted: !!data.profileCompleted,
        });
      } catch (err: any) {
        setError(err.message || 'Không thể tải thông tin cá nhân. Vui lòng đăng nhập lại.');
        // If unauthorized, redirect to login
        if (err.message?.includes('Unauthorized') || err.message?.includes('jwt')) {
          clearAuthToken('patient');
          navigate('/patient-login');
        }
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const result = await updateOwnProfile('patient', {
        fullName: profile.fullName,
        phone: profile.phone,
        idNumber: profile.idNumber,
        dateOfBirth: profile.dateOfBirth ? new Date(profile.dateOfBirth).toISOString() : null,
        address: profile.address,
      });

      setSuccess('Cập nhật thông tin cá nhân thành công!');
      setProfile((prev) => ({
        ...prev,
        profileCompleted: result.profileCompleted,
      }));
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra khi lưu thông tin.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    clearAuthToken('patient');
    navigate('/patient-login');
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

  return (
    <PatientLayout>
      <div className="max-w-3xl mx-auto px-6 py-12 dark:bg-background-dark transition-colors">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg transition-colors">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Hồ sơ cá nhân / Profile</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">Cập nhật đầy đủ thông tin để sử dụng chức năng đặt lịch khám.</p>
            </div>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 border border-red-200 text-red-600 dark:text-red-400 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg text-sm transition-all"
            >
              Đăng xuất
            </button>
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

          {!profile.profileCompleted && (
            <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-950/30 text-yellow-800 dark:text-yellow-400 rounded-lg text-sm border border-yellow-100 dark:border-yellow-900 flex items-start gap-2">
              <span className="material-symbols-outlined text-[20px]">warning</span>
              <div>
                <p className="font-semibold">Hồ sơ chưa hoàn thành</p>
                <p>Bạn cần cập nhật đầy đủ: Họ tên, Số điện thoại, Số CMND/CCCD và Ngày sinh để thực hiện đặt lịch khám.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email (Không thể thay đổi)</label>
                <input 
                  className="w-full rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 py-2.5 px-3 outline-none cursor-not-allowed" 
                  value={profile.email} 
                  disabled 
                  type="email" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Họ và tên thật *</label>
                <input 
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 py-2.5 px-3 outline-none transition-all" 
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleChange}
                  placeholder="Nguyễn Văn A" 
                  required
                  type="text" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Số điện thoại *</label>
                <input 
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 py-2.5 px-3 outline-none transition-all" 
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="09xx xxx xxx" 
                  required
                  type="tel" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Số CMND/CCCD *</label>
                <input 
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 py-2.5 px-3 outline-none transition-all" 
                  name="idNumber"
                  value={profile.idNumber}
                  onChange={handleChange}
                  placeholder="Nhập 9 hoặc 12 số" 
                  required
                  type="text" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Ngày sinh *</label>
                <input 
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 py-2.5 px-3 outline-none transition-all" 
                  name="dateOfBirth"
                  value={profile.dateOfBirth}
                  onChange={handleChange}
                  required
                  type="date" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Địa chỉ</label>
                <input 
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 py-2.5 px-3 outline-none transition-all" 
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  placeholder="Số nhà, đường, phường, quận, thành phố" 
                  type="text" 
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={saving}
              className="w-full bg-blue-700 dark:bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-800 dark:hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md mt-6"
            >
              {saving ? 'Đang lưu...' : 'Cập nhật hồ sơ'}
            </button>
          </form>
        </div>
      </div>
    </PatientLayout>
  );
};

export default PatientProfile;
