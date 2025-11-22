'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin } from "../../../actions/admin-auth";
import { Lock, Mail, ArrowRight } from 'lucide-react';
// import '../../../../src/assets/css/dashboard.css'; // Removed

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await loginAdmin(email, password);

    if (result.success) {
      router.push('/admin');
    } else {
      setError(result.error || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md flex flex-col p-10 gap-8 bg-slate-800/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center bg-blue-500/10 text-blue-500">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-slate-400">Secure access for administrators</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-slate-400 font-medium">Email Address</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@quicks.com"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-11 pr-4 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-slate-400 font-medium">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-11 pr-4 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm text-center font-medium">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white border-none py-3.5 rounded-lg font-bold cursor-pointer flex items-center justify-center gap-2 transition-all shadow-lg hover:-translate-y-px hover:shadow-blue-500/25 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Authenticating...' : (
              <>
                Login to Dashboard
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
