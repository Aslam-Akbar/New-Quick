'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createJobPosting } from "../../../../actions/admin-careers";
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
      <header className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Link href="/admin/careers" className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-white">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-3xl font-bold text-white">Post New Job</h1>
          </div>
          <p className="text-slate-400 ml-11">Create a new job opening.</p>
        </div>
      </header>

      <div className="max-w-3xl bg-slate-800/50 border border-white/10 rounded-xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Job Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Senior React Developer"
              required
              className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Department</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              >
                <option value="Engineering" className="bg-slate-900 text-white">Engineering</option>
                <option value="Design" className="bg-slate-900 text-white">Design</option>
                <option value="Product" className="bg-slate-900 text-white">Product</option>
                <option value="Marketing" className="bg-slate-900 text-white">Marketing</option>
                <option value="Sales" className="bg-slate-900 text-white">Sales</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Employment Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              >
                <option value="Full-time" className="bg-slate-900 text-white">Full-time</option>
                <option value="Part-time" className="bg-slate-900 text-white">Part-time</option>
                <option value="Contract" className="bg-slate-900 text-white">Contract</option>
                <option value="Freelance" className="bg-slate-900 text-white">Freelance</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. Remote, New York, NY"
              required
              className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Job description..."
              rows={6}
              className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600 resize-vertical"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Link
              href="/admin/careers"
              className="flex-1 px-6 py-3 rounded-lg border border-white/10 text-slate-300 hover:bg-white/5 transition-colors font-medium text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              <Save size={16} />
              {loading ? 'Creating...' : 'Create Job Posting'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
