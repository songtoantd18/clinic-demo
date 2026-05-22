import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setAuthToken } from '../services/api';

const AuthCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      setAuthToken('patient', token);
      navigate('/patient-home');
    } else {
      navigate('/patient-login');
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 transition-colors">
      <div className="p-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl text-center flex flex-col items-center gap-4 max-w-sm w-full mx-4">
        <span className="material-symbols-outlined text-[48px] text-blue-700 dark:text-blue-400 animate-spin">sync</span>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Đang xử lý đăng nhập...</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Vui lòng chờ trong giây lát khi chúng tôi xác nhận tài khoản Google của bạn.</p>
      </div>
    </div>
  );
};

export default AuthCallback;
