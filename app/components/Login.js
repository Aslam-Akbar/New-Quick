"use client";
import React, { useState } from "react";
import { login } from "../actions/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
// import "./assets/css/pages.css"; // Removed

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        console.log("Login successful:", result.user);
        router.push('/client-portal');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-6">
      <div className="w-full max-w-5xl bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        
        {/* Login Form Section */}
        <div className="flex-1 p-8 lg:p-12">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 text-2xl mx-auto mb-4 border border-blue-500/20">
              <FaUser />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Client Login</h1>
            <p className="text-slate-400">Access your project dashboard</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <FaEnvelope className="text-blue-500" /> Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <FaLock className="text-blue-500" /> Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-white transition-colors">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-white/10 bg-white/5 text-blue-500 focus:ring-blue-500"
                />
                <span>Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-blue-400 hover:text-blue-300 transition-colors">
                Forgot password?
              </Link>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-slate-400 text-sm">
              Don't have an account?{" "}
              <Link href="/contact" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                Contact us
              </Link>
            </p>
          </div>
        </div>

        {/* Visual Side (Desktop only) */}
        <div className="hidden lg:flex flex-1 bg-slate-900/50 items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-violet-600/20"></div>
          <div className="relative z-10 max-w-md w-full">
            <div className="bg-slate-900 border border-white/10 rounded-xl p-6 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="font-mono text-sm leading-relaxed">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span style={{ color: '#c678dd' }}>const</span> <span style={{ color: '#e5c07b' }}>success</span> = <span style={{ color: '#c678dd' }}>await</span> <span style={{ color: '#61afef' }}>login</span>();
                <br /><br />
                <span style={{ color: '#abb2bf' }}>{'// Secure access'}</span>
                <br />
                <span style={{ color: '#abb2bf' }}>{'// to your projects'}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
