/**
 * Copyright 2026 Google LLC
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { commonData } from '../data/mockData';
import { loginPatient, registerUser } from '../services/api';

interface PatientLoginProps {
  readonly className?: string;
}

export const PatientLogin: React.FC<PatientLoginProps> = () => {
  const { patientLogin } = commonData;
  const [isRegister, setIsRegister] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');
    try {
      if (isRegister) {
        if (password !== confirmPassword) {
          throw new Error('Mật khẩu xác nhận không khớp.');
        }
        await registerUser(identifier, password, 'patient');
        setSuccessMessage('Đăng ký tài khoản thành công! Đang tự động đăng nhập...');
        // Auto login after register
        await loginPatient(identifier, password);
        setTimeout(() => {
          navigate('/patient-profile');
        }, 1500);
      } else {
        await loginPatient(identifier, password);
        navigate('/patient-home');
      }
    } catch (err: any) {
      setError(err.message || 'Thao tác thất bại. Vui lòng kiểm tra lại thông tin.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    window.location.href = `${baseUrl}/auth/google`;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background-dark flex items-center justify-center p-6 transition-colors">
      {/* data-stitch-id: patient-login-container-001 */}
      <div className="bg-white dark:bg-elevated p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl w-full max-w-md transition-colors">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-2">{patientLogin.title}</h1>
          <p className="text-slate-500 dark:text-slate-400">{isRegister ? 'Đăng ký tài khoản mới cho Bệnh nhân' : patientLogin.subtitle}</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 mb-6">
          <button
            type="button"
            className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-all ${
              !isRegister
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
            onClick={() => {
              setIsRegister(false);
              setError('');
              setSuccessMessage('');
            }}
          >
            Đăng nhập
          </button>
          <button
            type="button"
            className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-all ${
              isRegister
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
            onClick={() => {
              setIsRegister(true);
              setError('');
              setSuccessMessage('');
            }}
          >
            Đăng ký
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded-lg text-sm border border-red-100 dark:border-red-900">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-lg text-sm border border-emerald-100 dark:border-emerald-900">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              {isRegister ? 'Địa chỉ Email / SĐT' : patientLogin.fields.identity}
            </label>
            <input 
              className="w-full rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 focus:ring-blue-500 focus:border-blue-500 py-2 px-3 outline-none transition-colors" 
              placeholder={isRegister ? "VD: patient@gmail.com" : "09xx xxx xxx hoặc email"} 
              type="text" 
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{patientLogin.fields.password}</label>
            <input 
              className="w-full rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 focus:ring-blue-500 focus:border-blue-500 py-2 px-3 outline-none transition-colors" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {isRegister && (
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Xác nhận mật khẩu</label>
              <input 
                className="w-full rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 focus:ring-blue-500 focus:border-blue-500 py-2 px-3 outline-none transition-colors" 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 dark:bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-800 dark:hover:bg-blue-500 transition-all block text-center mt-6 disabled:opacity-50"
          >
            {loading 
              ? (isRegister ? 'ĐANG ĐĂNG KÝ...' : 'ĐANG ĐĂNG NHẬP...') 
              : (isRegister ? 'ĐĂNG KÝ TÀI KHOẢN' : patientLogin.button)
            }
          </button>

          <div className="text-center mt-4">
            <p className="text-sm text-slate-500 dark:text-slate-500">{patientLogin.social}</p>
            <div className="flex gap-4 mt-2 justify-center">
              <button 
                type="button"
                onClick={handleGoogleLogin}
                className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 text-xs dark:text-slate-300 transition-colors"
              >
                Google
              </button>
            </div>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
          <p className="font-bold text-slate-700 dark:text-slate-300 mb-1">🔑 Tài khoản bệnh nhân kiểm thử:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Email: <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-blue-600 dark:text-blue-400">patient@gmail.com</code> (Mật khẩu: <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">1</code>)</li>
          </ul>
        </div>

        <div className="text-center mt-4 border-t border-slate-100 dark:border-slate-800 pt-4">
          <a href="/main" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">← Quay lại trang chọn cổng</a>
        </div>
      </div>
    </div>
  );
};

export default PatientLogin;
