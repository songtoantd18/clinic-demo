/**
 * Copyright 2026 Google LLC
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import PatientLayout from '../layouts/PatientLayout';
import { commonData } from '../data/mockData';

interface PatientHomeProps {
  readonly className?: string;
}

export const PatientHome: React.FC<PatientHomeProps> = () => {
  const navigate = useNavigate();
  const { patientHome } = commonData;

  return (
    <PatientLayout>
      {/* data-stitch-id: patient-home-container-001 */}
      <main className="max-w-7xl mx-auto px-6 py-8 dark:bg-background-dark transition-colors">
        <section className="relative rounded-xl overflow-hidden mb-12 h-[400px] flex items-center shadow-sm border border-outline-variant dark:border-slate-800 transition-colors">
          <img alt="Healthcare Facility Banner" className="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNxSFa57d75UJ67jKVkiOjuGG3Ngf2NflFVxexCqJ51wHHSD_VC6qkl_gRBnj6n71Cp0D2qFFFGTy0TCJF7tGzR1LUnj0JBw625GnfU_PRyPvg5DgQiEeB0hXMNL6iTSOM1xTF38PKX8awgH0buaABwLJGr9_0KtsNOA3RWc6uCVo0n78wwXUjDKprVQ9i6ANSh3NMyyl0lB9bggQ7gll3-0xU12Ia9BT239BV-hSl4hExDgTADplYzP6XQV-Y7pCVrBrtiPEO" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 dark:from-slate-900 dark:via-slate-900/80 to-transparent"></div>
          <div className="relative z-10 px-12 max-w-2xl">
            <h1 className="font-h1 text-primary dark:text-blue-400 mb-4 leading-tight">{patientHome.hero.title}</h1>
            <p className="font-body-lg text-on-surface-variant dark:text-slate-300 mb-8">{patientHome.hero.subtitle}</p>
            <div className="flex gap-4">
              <button 
                onClick={() => navigate('/quick-booking')}
                className="bg-primary dark:bg-blue-600 text-on-primary px-8 py-3 rounded-lg font-label-md hover:opacity-90 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">calendar_month</span>
                {patientHome.hero.button}
              </button>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-h2 text-on-surface dark:text-white">{patientHome.suggestedTitle}</h2>
              <p className="font-body-md text-on-surface-variant dark:text-slate-400">{patientHome.suggestedSubtitle}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {patientHome.clinics.map((clinic, idx) => (
              <div 
                key={idx}
                onClick={() => navigate('/clinic-detail')}
                className="bg-white dark:bg-elevated rounded-xl border border-outline-variant dark:border-slate-800 overflow-hidden hover:shadow-lg transition-all group cursor-pointer"
              >
                <div className="relative h-48">
                  <img alt={clinic.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={clinic.image} />
                  <span className="absolute top-3 right-3 bg-secondary-container dark:bg-blue-900 text-on-secondary-container dark:text-blue-300 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                    {clinic.status}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-h3 text-on-surface dark:text-white mb-1 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">{clinic.name}</h3>
                  <p className="font-caption text-on-surface-variant dark:text-slate-400 flex items-center gap-1 mb-3">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    {clinic.location}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-primary dark:text-blue-400 font-bold">{clinic.price}</span>
                    <button className="bg-primary-container/20 dark:bg-blue-900/40 text-primary dark:text-blue-300 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-primary dark:hover:bg-blue-600 hover:text-white transition-all">Chi tiết</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </PatientLayout>
  );
};

export default PatientHome;
