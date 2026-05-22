import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientLayout from '../layouts/PatientLayout';
import { commonData } from '../data/mockData';
import { listClinics } from '../services/api';

export const PatientHome: React.FC = () => {
  const navigate = useNavigate();
  const { patientHome } = commonData;

  const [clinics, setClinics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    async function loadClinics() {
      try {
        setLoading(true);
        // Call backend clinics list API
        const data = await listClinics();
        setClinics(data || []);
      } catch (err: any) {
        setError(err.message || 'Không thể tải danh sách phòng khám.');
      } finally {
        setLoading(false);
      }
    }
    loadClinics();
  }, []);

  // Filter clinics locally for responsive experience
  const filteredClinics = clinics.filter(clinic => {
    // 1. Specialty Filter
    if (selectedSpecialty) {
      const clinicSpecs = (clinic.specialties || []).map((s: string) => s.toLowerCase());
      const hasSpec = clinicSpecs.some((s: string) => s.includes(selectedSpecialty.toLowerCase()));
      if (!hasSpec) return false;
    }

    // 2. Region/Location Filter
    if (selectedLocation) {
      const address = (clinic.address || '').toLowerCase();
      if (!address.includes(selectedLocation.toLowerCase())) return false;
    }

    return true;
  });

  const handleOpenUserManual = () => {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
  };

  return (
    <PatientLayout>
      {/* data-stitch-id: patient-home-container-001 */}
      <main className="max-w-7xl mx-auto px-6 py-8 dark:bg-background-dark transition-colors">
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 rounded-lg text-sm border border-red-100 dark:border-red-900">
            {error}
          </div>
        )}

        {/* Hero Banner Section */}
        <section className="relative rounded-xl overflow-hidden mb-12 h-[400px] flex items-center shadow-sm border border-outline-variant dark:border-slate-800 transition-colors">
          <img alt="Healthcare Facility Banner" className="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNxSFa57d75UJ67jKVkiOjuGG3Ngf2NflFVxexCqJ51wHHSD_VC6qkl_gRBnj6n71Cp0D2qFFFGTy0TCJF7tGzR1LUnj0JBw625GnfU_PRyPvg5DgQiEeB0hXMNL6iTSOM1xTF38PKX8awgH0buaABwLJGr9_0KtsNOA3RWc6uCVo0n78wwXUjDKprVQ9i6ANSh3NMyyl0lB9bggQ7gll3-0xU12Ia9BT239BV-hSl4hExDgTADplYzP6XQV-Y7pCVrBrtiPEO" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 dark:from-slate-900 dark:via-slate-900/80 to-transparent"></div>
          <div className="relative z-10 px-12 max-w-2xl">
            <h1 className="font-h1 text-primary dark:text-blue-400 mb-4 leading-tight">{patientHome.hero.title}</h1>
            <p className="font-body-lg text-on-surface-variant dark:text-slate-300 mb-8">{patientHome.hero.subtitle}</p>
            <div className="flex gap-4">
              <button 
                onClick={() => navigate('/quick-booking')}
                className="bg-primary dark:bg-blue-600 text-on-primary dark:text-white px-8 py-3 rounded-lg font-label-md hover:shadow-lg hover:opacity-95 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">calendar_month</span>
                {patientHome.hero.button}
              </button>
              <button 
                onClick={handleOpenUserManual}
                className="bg-white/85 dark:bg-slate-800/85 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 px-8 py-3 rounded-lg font-label-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-all flex items-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">help</span>
                Hướng dẫn sử dụng
              </button>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="mb-8 p-6 bg-white dark:bg-elevated rounded-xl border border-outline-variant dark:border-slate-800 shadow-sm transition-colors">
          <h2 className="font-h3 text-on-surface dark:text-white mb-4">Bộ lọc tìm kiếm phòng khám</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Chuyên khoa khám bệnh</label>
              <select 
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm dark:text-slate-200 outline-none"
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
              >
                <option value="">Tất cả chuyên khoa</option>
                <option value="Tim mạch">Tim mạch</option>
                <option value="Nhi">Chuyên khoa Nhi</option>
                <option value="Tai mũi họng">Tai mũi họng</option>
                <option value="Siêu âm">Siêu âm / Chẩn đoán hình ảnh</option>
                <option value="Đa khoa">Đa khoa</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Khu vực / Quận huyện</label>
              <select 
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm dark:text-slate-200 outline-none"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">Tất cả khu vực</option>
                <option value="Hải Châu">Quận Hải Châu</option>
                <option value="Thanh Khê">Quận Thanh Khê</option>
                <option value="Sơn Trà">Quận Sơn Trà</option>
                <option value="Liên Chiểu">Quận Liên Chiểu</option>
                <option value="Cẩm Lệ">Quận Cẩm Lệ</option>
                <option value="Hòa Vang">Huyện Hòa Vang</option>
              </select>
            </div>

            <div className="flex items-end">
              <button 
                onClick={() => {
                  setSelectedSpecialty('');
                  setSelectedLocation('');
                }}
                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-center"
              >
                Xóa bộ lọc
              </button>
            </div>
          </div>
        </section>

        {/* Suggested Clinics Grid */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-h2 text-on-surface dark:text-white">{patientHome.suggestedTitle}</h2>
              <p className="font-body-md text-on-surface-variant dark:text-slate-400">{patientHome.suggestedSubtitle}</p>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center min-h-[20vh]">
              <span className="material-symbols-outlined text-[32px] text-blue-700 dark:text-blue-400 animate-spin">sync</span>
            </div>
          ) : filteredClinics.length === 0 ? (
            <div className="text-center p-8 bg-slate-50 dark:bg-slate-900 rounded-xl text-slate-500">
              Không tìm thấy phòng khám nào phù hợp với bộ lọc đã chọn.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClinics.map((clinic) => (
                <div 
                  key={clinic.id}
                  onClick={() => navigate(`/clinics/${clinic.id}`)}
                  className="bg-white dark:bg-elevated rounded-xl border border-outline-variant dark:border-slate-800 overflow-hidden hover:shadow-lg transition-all group cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 bg-slate-100 dark:bg-slate-800">
                      <img 
                        alt={clinic.clinicName} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        src={clinic.images?.[0] || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpEPZi5Hgi0PjxvD1BTRuT3pQp5aMAjSh4znzey5p94fZDGdXkK4wZHT-xtCG_TZ_vNLZGjtBEvSVETSOA-AHa9E4edYR2oDjnm4ZtWLWJh9juOuH2lGmA_CHyLlf1-NPxug-zKf626AcnyvWFevEhJX5SHGC03MaTX8zrEG4QVYXmMKBVsTtk28BQjAZ0U6ejOSsvxW1pE8kTIYkdUggNhbDnEKWsUk356FPBq6wW-TSsidVBc7WuDJF5oQ5VnFsEk6L9c0Zj'} 
                      />
                      <span className="absolute top-3 right-3 bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-300 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                        Đang hoạt động
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-h3 text-on-surface dark:text-white mb-1 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                        {clinic.clinicName}
                      </h3>
                      <p className="font-caption text-on-surface-variant dark:text-slate-400 flex items-center gap-1 mb-2">
                        <span className="material-symbols-outlined text-sm">location_on</span>
                        {clinic.address || 'Đà Nẵng'}
                      </p>
                      {clinic.specialties && clinic.specialties.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {clinic.specialties.map((s: string, i: number) => (
                            <span key={i} className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] px-2 py-0.5 rounded">
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-4 pt-0">
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
                      <span className="text-primary dark:text-blue-400 font-bold text-sm">Miễn phí đặt lịch</span>
                      <button className="bg-primary-container/20 dark:bg-blue-900/40 text-primary dark:text-blue-300 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-primary dark:hover:bg-blue-600 hover:text-white transition-all">Chi tiết</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </PatientLayout>
  );
};

export default PatientHome;
