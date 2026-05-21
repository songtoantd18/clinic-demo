/**
 * Copyright 2026 Google LLC
 */

import React from 'react';
import { commonData } from '../data/mockData';

interface ClinicDetailProps {
  readonly clinicId?: string;
}

export const ClinicDetail: React.FC<ClinicDetailProps> = () => {
  const { clinicDetail, footer } = commonData;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background-dark transition-colors">
      {/* data-stitch-id: clinic-detail-header-001 */}
      <header className="w-full sticky top-0 z-50 border-b border-slate-100 dark:border-slate-800 bg-white/95 dark:bg-elevated/95 backdrop-blur-md shadow-sm">
        <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <img src="/src/assets/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
              <span className="text-lg font-black text-blue-700 dark:text-blue-400 tracking-tight">PatientCare</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm tracking-wide">
              <a className="text-blue-700 dark:text-blue-400 font-semibold border-b-2 border-blue-700 dark:border-blue-400" href="#">Find Clinics</a>
              <a className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 transition-all" href="#">My Appointments</a>
              <a className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 transition-all" href="#">Medical Records</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-50/50 dark:hover:bg-slate-800 rounded-full transition-all">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
              <span className="font-label-md text-on-surface dark:text-slate-200">Profile</span>
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <img alt="Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSXNqgcN2WsTbTcnoeTO2aO8pE7bH6nSkU3TwEUL3XfxdbKstH75J-SEnZKnvU5bh7hSldpje0w8Ps-c3i1zbxwRqEOWxuYDO3N0dbbI3vS_LUE9ibCg-qnjYvhURy7SI5PjTzi6wD1ALG2FLGILCEZcxwtDuMjC4h74ap0Ofy8AXEZnV5dgSfo-DH98VZNAKLUwNq4kMds4taAJawpAYyn2jL7KmLrebDFvhQYaLIaZXL1n90-566EslVdXnJabdMh79yIBV7"/>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <section className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[400px] md:h-[500px] mb-8">
          <div className="md:col-span-2 md:row-span-2 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
            <img alt="Clinic Interior" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMbb2fYjSobnsXa9TOEBC6j6PqLanhW1dEgHlQr2Hti7G5C45fgX3FePL87gBEmO4K3ZT0Ikyd0_pCPFOzDsAbS2MWwWZVp3V3f1ojqywGKVCBYqXhuttJ4qxv1URAJHNi-By99cPiBWQSak--WQVzupagU2DKA6YAB1hc-JZsrw2waqAMPk_vr5f5ttCgI9YRQgmGRfAxaEKajj_DHpsQsx6N_AgmLJ_5ydLJGJuKvv1J70VqH8DOVw6tkhBuvC6SkDxsHZeL"/>
          </div>
          <div className="md:col-span-2 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
            <img alt="Examination Room" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvodxR6YKOxjXnkxaCoTdbcB4rYEwUtwZknWMTsRZhXJRoI5wATCvlVPGF2Cv4Q3oC7yJV1-o6XeX4x953E7YK2op6Ofwu0jF4oeSlNAKeJW7YQt1XybDhevy4YAqMdcqANrwN-1UcSSSYa57OBnq2NVeYrsDvhAgbbXTzGQrqSH1nxXt-HxP2OJEc05k4WJN46l0OO0cwmTrRJ3W4LFPM4WqpeFjVsvB8luqgpe8fvUCe2Op9ry-z63RH62-maU692FiJBGgv"/>
          </div>
          <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
            <img alt="Waiting Area" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-p6g-3o1yvY0LrztQ-7-6wY3iJMhZzJsTVMo7iD7w1p3ym7Hc6Q0wG4xMOrXk94uzm5n-SxnQUFWcejvhuqHoVx2PJt8A-ctCWfDWuaYW0uxipybkYo7LjBQqnbKgg4NU97bri_seSBL2x41vY_fxPlYh3xty_Qab7mJmQpzLevl_chjZ6kwudwfpUNRZ1Vm1jShU8zcrOsp5URhZeaGbHtDXtEtor-WzMtODsZdb6q9TduGMA17MQoNjmJhOmzqIusfOsgE7"/>
          </div>
          <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm relative transition-colors">
            <img alt="Clinic Building" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuABpnBiaQFgGcHm39zg3CQDOzOrmJ2QuDldDAj4yuRFe6IyRdj7qqpRQ5QYTDYmtUb8XXb7qd8d12pVnr21PrKJGCsaTS8ConW68H4nDWYdwfH04e2RzxbP5vlQmFt_T2pmZ00iT6kpG69-oe7jjdy9YcR0DQyeFQm2yB7F8_zqIWOlnVTUOBB1NtsFMkPcWzivIJzusy4StkcnzjnN-06MFmCp5T4JpG8hL1tJ2-pEF9XyTJEiwUH-VJ5UpJ2ETAs-LKorBbmL"/>
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer">
              <span className="text-white font-label-md">+12 Hình ảnh</span>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-elevated p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="font-h1 text-on-surface dark:text-white mb-2">{clinicDetail.name}</h1>
                  <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-lg">location_on</span>
                      <span className="text-body-md">{clinicDetail.address}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-yellow-500 text-lg">star</span>
                      <span className="font-label-md text-on-surface dark:text-white">{clinicDetail.rating}</span>
                      <span className="text-caption">({clinicDetail.reviewCount} đánh giá)</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <span className="material-symbols-outlined dark:text-slate-400">share</span>
                  </button>
                  <button className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <span className="material-symbols-outlined dark:text-slate-400">favorite</span>
                  </button>
                </div>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
                <h2 className="font-h2 text-on-surface dark:text-white mb-4">{clinicDetail.introTitle}</h2>
                <p className="text-body-lg text-on-surface-variant dark:text-slate-400 leading-relaxed">
                  {clinicDetail.introText}
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-elevated p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
              <h2 className="font-h2 text-on-surface dark:text-white mb-6">{clinicDetail.doctorsTitle}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {clinicDetail.doctors.map((doctor, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 border border-slate-100 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <img alt="Doctor Profile" className="w-16 h-16 rounded-full object-cover bg-slate-100 dark:bg-slate-900" src={doctor.avatar}/>
                    <div>
                      <h3 className="font-label-md text-on-surface dark:text-white">{doctor.name}</h3>
                      <p className="text-caption text-blue-600 dark:text-blue-400 font-medium">{doctor.specialty}</p>
                      <p className="text-caption text-slate-500 dark:text-slate-500 mt-1">{doctor.exp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white dark:bg-elevated rounded-xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden transition-colors">
                <div className="bg-blue-700 dark:bg-blue-800 p-6 text-white">
                  <h3 className="font-h3">{clinicDetail.bookingTitle}</h3>
                  <p className="text-caption opacity-90">{clinicDetail.bookingSubtitle}</p>
                </div>
                <div className="p-6">
                  <div className="flex gap-3 overflow-x-auto hide-scrollbar mb-6 pb-2">
                    <button className="flex-shrink-0 w-14 py-3 rounded-lg border-2 border-blue-700 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/40 text-center">
                      <span className="block text-[10px] uppercase font-bold text-blue-700 dark:text-blue-300">T2</span>
                      <span className="block text-lg font-bold text-blue-700 dark:text-blue-300">18</span>
                    </button>
                    {[19, 20, 21, 22].map((day, idx) => (
                      <button key={idx} className="flex-shrink-0 w-14 py-3 rounded-lg border border-slate-200 dark:border-slate-800 text-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <span className="block text-[10px] uppercase font-bold text-slate-500 dark:text-slate-500">T{idx + 3}</span>
                        <span className="block text-lg font-bold text-on-surface dark:text-white">{day}</span>
                      </button>
                    ))}
                  </div>

                  <div className="space-y-4 mb-8">
                    <h4 className="font-label-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider">Buổi Sáng</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <button className="py-2 text-sm font-medium border border-slate-200 dark:border-slate-800 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 dark:text-slate-300 transition-all">08:00</button>
                      <button className="py-2 text-sm font-medium border border-slate-200 dark:border-slate-800 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 dark:text-slate-300 transition-all">09:00</button>
                      <button className="py-2 text-sm font-medium border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-300 dark:text-slate-600 cursor-not-allowed">10:00</button>
                    </div>
                    <h4 className="font-label-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-4">Buổi Chiều</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <button className="py-2 text-sm font-medium border border-slate-200 dark:border-slate-800 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 dark:text-slate-300 transition-all">14:00</button>
                      <button className="py-2 text-sm font-medium border border-slate-200 dark:border-slate-800 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 dark:text-slate-300 transition-all">15:30</button>
                      <button className="py-2 text-sm font-medium border border-blue-600 dark:border-blue-500 bg-blue-600 dark:bg-blue-700 text-white rounded-lg shadow-sm">17:00</button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button className="w-full py-4 bg-blue-700 dark:bg-blue-600 text-white font-label-md rounded-xl shadow-lg shadow-blue-700/20 active:opacity-80 transition-all">
                      {clinicDetail.bookingButton}
                    </button>
                    <p className="text-caption text-slate-500 dark:text-slate-500 text-center">
                      <span className="material-symbols-outlined text-[14px] align-middle mr-1">lock</span>
                      {clinicDetail.bookingNotice}
                    </p>
                  </div>
                </div>
                <div className="border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-4 flex items-center gap-3 transition-colors">
                  <span className="material-symbols-outlined text-green-600 dark:text-green-500">verified</span>
                  <span className="text-caption text-on-surface-variant dark:text-slate-400">{clinicDetail.verifiedText}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 mt-16 transition-colors">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 gap-4 max-w-7xl mx-auto">
          <p className="text-xs text-slate-500 dark:text-slate-500">{footer.copyright}</p>
          <div className="flex gap-8">
            {footer.links.map((link, idx) => (
              <a key={idx} className="text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400 transition-colors text-xs" href="#">{link.label}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ClinicDetail;
