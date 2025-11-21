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

    // Validation
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
      <div className="view-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="portal-view">
      <div className="view-header">
        <div>
          <h2>Settings</h2>
          <p className="view-subtitle">Manage your account preferences and security.</p>
        </div>
      </div>

      <div className="settings-grid">
        <div className="settings-card">
          <div className="card-header-sm">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <User size={20} className="text-blue-400" />
              </div>
              <h3>Profile Information</h3>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="settings-form">
            <div className="form-group">
              <label>Company Name</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  value={profile.companyName}
                  onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
                  placeholder="Your company name"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Contact Name</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  value={profile.contactName}
                  onChange={(e) => setProfile({ ...profile, contactName: e.target.value })}
                  placeholder="Your full name"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <Mail size={16} className="input-icon" />
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="disabled-input pl-10"
                />
              </div>
              <small className="form-hint">Contact support to change your email address.</small>
            </div>

            {message && (
              <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
                {message.split(':')[1]}
              </div>
            )}

            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={saving}>
                <Save size={16} />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>

        <div className="settings-sidebar">
          <div className="settings-card">
            <div className="card-header-sm">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Shield size={20} className="text-purple-400" />
                </div>
                <h3>Security</h3>
              </div>
            </div>
            <div className="security-options">
              <button 
                onClick={() => setShowPasswordModal(true)}
                className="btn-outline full-width hover:border-blue-500/50 hover:bg-blue-500/10 transition-all"
              >
                <Key size={16} />
                <span>Change Password</span>
              </button>
              <button className="btn-outline full-width hover:border-green-500/50 hover:bg-green-500/10 transition-all">
                <Shield size={16} />
                <span>Two-Factor Auth</span>
                <span className="ml-auto text-xs px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400">Coming Soon</span>
              </button>
            </div>
          </div>

          <div className="settings-card">
            <div className="card-header-sm">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <Bell size={20} className="text-orange-400" />
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <h3>Notifications</h3>
                  {savingNotifications && <span className="text-xs text-gray-400">Saving...</span>}
                </div>
              </div>
            </div>
            <div className="notification-toggles">
              <label className="toggle-row">
                <div className="toggle-info">
                  <span className="toggle-label">Email Notifications</span>
                  <span className="toggle-desc">Receive updates via email</span>
                </div>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={notifications.email}
                    onChange={() => handleNotificationToggle('email')}
                  />
                  <span className="toggle-slider"></span>
                </div>
              </label>
              <label className="toggle-row">
                <div className="toggle-info">
                  <span className="toggle-label">Project Updates</span>
                  <span className="toggle-desc">Get notified about project milestones</span>
                </div>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={notifications.projects}
                    onChange={() => handleNotificationToggle('projects')}
                  />
                  <span className="toggle-slider"></span>
                </div>
              </label>
              <label className="toggle-row">
                <div className="toggle-info">
                  <span className="toggle-label">Marketing</span>
                  <span className="toggle-desc">Receive news and special offers</span>
                </div>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={notifications.marketing}
                    onChange={() => handleNotificationToggle('marketing')}
                  />
                  <span className="toggle-slider"></span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="modal-overlay" style={{ zIndex: 9999 }}>
          <div className="modal-content" style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Lock size={24} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Change Password</h3>
                  <p className="text-sm text-gray-400 mt-1">Update your account password</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordData({ current: '', new: '', confirm: '' });
                  setPasswordError('');
                  setPasswordSuccess('');
                }}
                className="modal-close"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handlePasswordChange} className="modal-body">
              <div className="form-group">
                <label>Current Password</label>
                <div className="input-wrapper">
                  <Key size={16} className="input-icon" />
                  <input
                    type="password"
                    value={passwordData.current}
                    onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                    placeholder="Enter current password"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>New Password</label>
                <div className="input-wrapper">
                  <Lock size={16} className="input-icon" />
                  <input
                    type="password"
                    value={passwordData.new}
                    onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                    placeholder="Enter new password"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Confirm New Password</label>
                <div className="input-wrapper">
                  <Lock size={16} className="input-icon" />
                  <input
                    type="password"
                    value={passwordData.confirm}
                    onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                    placeholder="Confirm new password"
                    className="pl-10"
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

              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordData({ current: '', new: '', confirm: '' });
                    setPasswordError('');
                    setPasswordSuccess('');
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
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
