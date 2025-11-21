'use client'

import React, { useState, useEffect } from 'react';
import { getDashboardData } from '../../actions/dashboard';
import { updateProfile, changePassword, updateNotificationPreferences } from '../../actions/portal';
import { Save, User, Mail, Shield, Key, Bell, X, Lock, CheckCircle, AlertCircle } from 'lucide-react';

const SettingsView = ({ userEmail }) => {
  const [profile, setProfile] = useState({ companyName: '', contactName: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  // Password Modal State
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);
  
  // Notification State
  const [notifications, setNotifications] = useState({
    email: true,
    projects: true,
    marketing: false
  });
  const [savingNotifications, setSavingNotifications] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await getDashboardData(userEmail);
      if (result.success) {
        setProfile({
          companyName: result.data.clientInfo.name,
          contactName: result.data.clientInfo.contact,
          email: userEmail
        });
      }
      setLoading(false);
    };
    fetchProfile();
  }, [userEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    const result = await updateProfile(userEmail, {
      companyName: profile.companyName,
      contactName: profile.contactName
    });

    if (result.success) {
      setMessage('success:Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('error:Failed to update profile');
    }
    setSaving(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (passwordData.new !== passwordData.confirm) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (passwordData.new.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }

    setChangingPassword(true);

    const result = await changePassword(userEmail, passwordData.current, passwordData.new);

    if (result.success) {
      setPasswordSuccess('Password changed successfully!');
      setTimeout(() => {
        setShowPasswordModal(false);
        setPasswordData({ current: '', new: '', confirm: '' });
        setPasswordSuccess('');
      }, 2000);
    } else {
      setPasswordError(result.message || 'Failed to change password');
    }

    setChangingPassword(false);
  };

  const handleNotificationToggle = async (key) => {
    const newNotifications = { ...notifications, [key]: !notifications[key] };
    setNotifications(newNotifications);
    
    setSavingNotifications(true);
    await updateNotificationPreferences(userEmail, newNotifications);
    setSavingNotifications(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Settings</h2>
        <p className="text-slate-400 mt-1">Manage your account preferences and security.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-slate-800/50 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                <User size={20} />
              </div>
              <h3 className="text-xl font-bold text-white">Profile Information</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Company Name</label>
                <input
                  type="text"
                  value={profile.companyName}
                  onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
                  placeholder="Your company name"
                  required
                  className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Contact Name</label>
                <input
                  type="text"
                  value={profile.contactName}
                  onChange={(e) => setProfile({ ...profile, contactName: e.target.value })}
                  placeholder="Your full name"
                  required
                  className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    value={profile.email}
                    disabled
                    className="w-full pl-10 bg-slate-900/30 border border-white/10 rounded-lg px-4 py-2.5 text-slate-500 cursor-not-allowed"
                  />
                </div>
                <small className="text-xs text-slate-500">Contact support to change your email address.</small>
              </div>

              {message && (
                <div className={`flex items-center gap-2 p-3 rounded-lg text-sm ${
                  message.includes('success') 
                    ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' 
                    : 'bg-red-500/10 border border-red-500/20 text-red-400'
                }`}>
                  {message.includes('success') ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                  {message.split(':')[1]}
                </div>
              )}

              <div className="pt-2">
                <button type="submit" className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed" disabled={saving}>
                  <Save size={16} />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800/50 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500 border border-purple-500/20">
                <Shield size={20} />
              </div>
              <h3 className="text-xl font-bold text-white">Security</h3>
            </div>
            <div className="space-y-3">
              <button 
                onClick={() => setShowPasswordModal(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 text-slate-300 hover:bg-blue-500/10 hover:border-blue-500/50 hover:text-blue-400 transition-all"
              >
                <Key size={16} />
                <span>Change Password</span>
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 text-slate-300 hover:bg-green-500/10 hover:border-green-500/50 hover:text-green-400 transition-all">
                <Shield size={16} />
                <span>Two-Factor Auth</span>
                <span className="ml-auto text-xs px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400">Coming Soon</span>
              </button>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20">
                <Bell size={20} />
              </div>
              <div className="flex-1 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Notifications</h3>
                {savingNotifications && <span className="text-xs text-slate-500">Saving...</span>}
              </div>
            </div>
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex-1">
                  <span className="block text-sm font-medium text-white group-hover:text-blue-400 transition-colors">Email Notifications</span>
                  <span className="block text-xs text-slate-500 mt-0.5">Receive updates via email</span>
                </div>
                <div className="relative">
                  <input 
                    type="checkbox" 
                    checked={notifications.email}
                    onChange={() => handleNotificationToggle('email')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-500 transition-colors">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 peer-checked:translate-x-5 transition-transform"></div>
                  </div>
                </div>
              </label>
              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex-1">
                  <span className="block text-sm font-medium text-white group-hover:text-blue-400 transition-colors">Project Updates</span>
                  <span className="block text-xs text-slate-500 mt-0.5">Get notified about project milestones</span>
                </div>
                <div className="relative">
                  <input 
                    type="checkbox" 
                    checked={notifications.projects}
                    onChange={() => handleNotificationToggle('projects')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-500 transition-colors">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 peer-checked:translate-x-5 transition-transform"></div>
                  </div>
                </div>
              </label>
              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex-1">
                  <span className="block text-sm font-medium text-white group-hover:text-blue-400 transition-colors">Marketing</span>
                  <span className="block text-xs text-slate-500 mt-0.5">Receive news and special offers</span>
                </div>
                <div className="relative">
                  <input 
                    type="checkbox" 
                    checked={notifications.marketing}
                    onChange={() => handleNotificationToggle('marketing')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-500 transition-colors">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 peer-checked:translate-x-5 transition-transform"></div>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-slate-800 border border-white/10 rounded-xl shadow-2xl w-full max-w-md my-8 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                  <Lock size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Change Password</h3>
                  <p className="text-sm text-slate-400 mt-0.5">Update your account password</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordData({ current: '', new: '', confirm: '' });
                  setPasswordError('');
                  setPasswordSuccess('');
                }}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handlePasswordChange} className="p-6 space-y-5 overflow-y-auto">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Current Password</label>
                <div className="relative">
                  <Key size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="password"
                    value={passwordData.current}
                    onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                    placeholder="Enter current password"
                    className="w-full pl-10 bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">New Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="password"
                    value={passwordData.new}
                    onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                    placeholder="Enter new password"
                    className="w-full pl-10 bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Confirm New Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="password"
                    value={passwordData.confirm}
                    onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                    placeholder="Confirm new password"
                    className="w-full pl-10 bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                    required
                  />
                </div>
              </div>

              {passwordError && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  <AlertCircle size={16} />
                  {passwordError}
                </div>
              )}

              {passwordSuccess && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                  <CheckCircle size={16} />
                  {passwordSuccess}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordData({ current: '', new: '', confirm: '' });
                    setPasswordError('');
                    setPasswordSuccess('');
                  }}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-white/10 text-slate-300 hover:bg-white/5 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={changingPassword}
                >
                  <Key size={16} />
                  {changingPassword ? 'Changing...' : 'Change Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsView;
