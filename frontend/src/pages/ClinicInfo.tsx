import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { commonData } from '../data/mockData';
import { getOwnProfile, updateOwnProfile } from '../services/api';

export const ClinicInfo: React.FC = () => {
  const { clinicInfo } = commonData;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [doctorInfo, setDoctorInfo] = useState('');
  const [specialties, setSpecialties] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [password, setPassword] = useState('');

  useEffect(() => {
    async function loadClinicProfile() {
      try {
        const data = await getOwnProfile();
        setName(data.clinicName || '');
        setPhone(data.phone || '');
        setAddress(data.address || '');
        setEmail(data.email || '');
        setDescription(data.description || '');
        setDoctorInfo(data.doctorInfo || '');
        setSpecialties((data.specialties || []).join(', '));
        setEmailNotifications(data.notificationSettings?.emailEnabled ?? true);
      } catch (err: any) {
        setError(err.message || 'Không thể tải thông tin phòng khám.');
      } finally {
        setLoading(false);
      }
    }
    loadClinicProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address || !email) {
      setError('Tên phòng khám, điện thoại, địa chỉ và email không được để trống.');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const payload: any = {
        clinicName: name,
        phone,
        address,
        email,
        description,
        doctorInfo,
        specialties: specialties.split(',').map(s => s.trim()).filter(Boolean),
        notificationSettings: {
          emailEnabled: emailNotifications,
          smsEnabled: false,
          reminderHours: 24
        }
      };

      if (password) {
        payload.password = password;
      }

      await updateOwnProfile('clinic', payload);
      setSuccess('Cập nhật thông tin phòng khám thành công!');
      setPassword(''); // Clear password field
    } catch (err: any) {
      setError(err.message || 'Lỗi xảy ra khi cập nhật thông tin.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <span className="material-symbols-outlined text-[32px] text-blue-700 dark:text-blue-400 animate-spin">sync</span>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* data-stitch-id: clinic-info-container-001 */}
      <div className="flex-1 p-8 max-w-7xl mx-auto w-full dark:bg-background-dark transition-colors">
        <div className="mb-8">
          <h1 className="font-h1 text-on-surface dark:text-white mb-2">{clinicInfo.title}</h1>
          <p className="text-slate-500 dark:text-slate-400 font-body-md">{clinicInfo.subtitle}</p>
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

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white dark:bg-elevated p-8 rounded-xl border border-outline-variant dark:border-slate-800 shadow-sm transition-colors">
              <h2 className="font-h3 text-on-surface dark:text-white mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">{clinicInfo.sectionTitle}</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-label-sm text-on-surface-variant dark:text-slate-400 mb-2">{clinicInfo.fields.name} *</label>
                    <input 
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-body-md dark:text-slate-200 focus:ring-primary focus:border-primary py-2 px-3 outline-none transition-colors" 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-label-sm text-on-surface-variant dark:text-slate-400 mb-2">{clinicInfo.fields.phone} *</label>
                    <input 
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-body-md dark:text-slate-200 focus:ring-primary focus:border-primary py-2 px-3 outline-none transition-colors" 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-label-sm text-on-surface-variant dark:text-slate-400 mb-2">{clinicInfo.fields.email} *</label>
                    <input 
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-body-md dark:text-slate-200 focus:ring-primary focus:border-primary py-2 px-3 outline-none transition-colors" 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-label-sm text-on-surface-variant dark:text-slate-400 mb-2">Chuyên khoa (cách nhau bằng dấu phẩy)</label>
                    <input 
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-body-md dark:text-slate-200 focus:ring-primary focus:border-primary py-2 px-3 outline-none transition-colors" 
                      type="text" 
                      value={specialties}
                      onChange={(e) => setSpecialties(e.target.value)}
                      placeholder="Tai mũi họng, Siêu âm, Da liễu"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-label-sm text-on-surface-variant dark:text-slate-400 mb-2">{clinicInfo.fields.address} *</label>
                  <input 
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-body-md dark:text-slate-200 focus:ring-primary focus:border-primary py-2 px-3 outline-none transition-colors" 
                    type="text" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block font-label-sm text-on-surface-variant dark:text-slate-400 mb-2">Mô tả phòng khám</label>
                  <textarea 
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-body-md dark:text-slate-200 focus:ring-primary focus:border-primary py-2 px-3 outline-none transition-colors" 
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Giới thiệu về dịch vụ, cơ sở vật chất phòng khám..."
                  />
                </div>

                <div>
                  <label className="block font-label-sm text-on-surface-variant dark:text-slate-400 mb-2">Thông tin Bác sĩ phụ trách</label>
                  <textarea 
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-body-md dark:text-slate-200 focus:ring-primary focus:border-primary py-2 px-3 outline-none transition-colors" 
                    rows={3}
                    value={doctorInfo}
                    onChange={(e) => setDoctorInfo(e.target.value)}
                    placeholder="Học hàm, học vị, kinh nghiệm bác sĩ..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-label-sm text-on-surface-variant dark:text-slate-400 mb-2">Mật khẩu mới (để trống nếu không đổi)</label>
                    <input 
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-body-md dark:text-slate-200 focus:ring-primary focus:border-primary py-2 px-3 outline-none transition-colors" 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <div className="flex items-center pt-8">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={emailNotifications}
                        onChange={(e) => setEmailNotifications(e.target.checked)}
                        className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4"
                      />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Gửi mail thông báo khi thay đổi/hủy lịch hẹn</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button 
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-primary dark:bg-blue-600 text-white rounded-lg font-label-md hover:bg-primary/90 dark:hover:bg-blue-500 disabled:opacity-50 transition-colors"
                >
                  {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
                </button>
              </div>
            </section>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default ClinicInfo;
