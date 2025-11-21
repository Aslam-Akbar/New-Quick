'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createJobPosting } from '../../../../../src/actions/admin-careers';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'Full-time',
    location: 'Remote',
    department: 'Engineering',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await createJobPosting(formData);
    
    if (result.success) {
      router.push('/admin/careers');
    } else {
      alert('Failed to create job posting');
      setLoading(false);
    }
  };

  return (
    <div>
      <header className="dashboard-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <Link href="/admin/careers" className="btn-icon-sm">
              <ArrowLeft size={20} />
            </Link>
            <h1>Post New Job</h1>
          </div>
          <p className="text-muted">Create a new job opening.</p>
        </div>
      </header>

      <div className="settings-card" style={{ maxWidth: '800px' }}>
        <form onSubmit={handleSubmit} className="settings-form">
          <div className="form-group">
            <label>Job Title</label>
            <div className="input-wrapper">
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Senior React Developer"
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group">
              <label>Department</label>
              <div className="input-wrapper">
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '0.5rem',
                    color: 'white',
                    outline: 'none'
                  }}
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Product">Product</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Employment Type</label>
              <div className="input-wrapper">
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '0.5rem',
                    color: 'white',
                    outline: 'none'
                  }}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Location</label>
            <div className="input-wrapper">
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Remote, New York, NY"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <div className="input-wrapper">
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Job description..."
                rows={6}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '0.5rem',
                  color: 'white',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              <Save size={16} />
              {loading ? 'Creating...' : 'Create Job Posting'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
