/**
 * Copyright 2026 Google LLC
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginClinic } from '../services/api';
import { commonData } from '../data/mockData';

interface ClinicLoginProps {
  readonly className?: string;
}

export const ClinicLogin: React.FC<ClinicLoginProps> = () => {
  const { clinicLogin } = commonData;
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await loginClinic(identifier, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background-dark flex items-center justify-center p-6 transition-colors">
      {/* data-stitch-id: clinic-login-container-001 */}
      <div className="bg-white dark:bg-elevated p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl w-full max-w-md transition-colors">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-2">{clinicLogin.title}</h1>
          <p className="text-slate-500 dark:text-slate-400">{clinicLogin.subtitle}</p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded-lg text-sm border border-red-100 dark:border-red-900">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{clinicLogin.fields.id}</label>
            <input 
              className="w-full rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 focus:ring-blue-500 focus:border-blue-500 py-2 px-3 outline-none transition-colors" 
              placeholder="clinic@gmail.com" 
              type="text" 
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{clinicLogin.fields.password}</label>
            <input 
              className="w-full rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 focus:ring-blue-500 focus:border-blue-500 py-2 px-3 outline-none transition-colors" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 dark:bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-800 dark:hover:bg-blue-500 transition-all block text-center mt-6 disabled:opacity-50"
          >
            {loading ? 'ĐANG ĐĂNG NHẬP...' : clinicLogin.button}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
          <p className="font-bold text-slate-700 dark:text-slate-300 mb-1">🔑 Tài khoản phòng khám kiểm thử:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Email: <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-blue-600 dark:text-blue-400">clinic@gmail.com</code> (Mật khẩu: <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">1</code>)</li>
            <li>Email: <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-blue-600 dark:text-blue-400">clinic1@gmail.com</code> (Mật khẩu: <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">1</code>)</li>
          </ul>
        </div>

        <div className="text-center mt-4 border-t border-slate-100 dark:border-slate-800 pt-4">
          <a href="/main" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">← Quay lại trang chọn cổng</a>
        </div>
      </div>
    </div>
  );
};

export default ClinicLogin;
