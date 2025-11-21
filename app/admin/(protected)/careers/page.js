'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getJobPostings, toggleJobStatus, deleteJobPosting } from '../../../../src/actions/admin-careers';
import { Plus, Briefcase, MapPin, CheckCircle, XCircle, Trash2, MoreVertical } from 'lucide-react';

export default function CareersPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      if (openDropdown !== null) {
        setOpenDropdown(null);
      }
    };
    
    if (openDropdown !== null) {
      document.addEventListener('click', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openDropdown]);

  const fetchJobs = async () => {
    const data = await getJobPostings();
    setJobs(data);
    setLoading(false);
  };

  const handleToggleStatus = async (id, status) => {
    await toggleJobStatus(id, status);
    fetchJobs();
  };

  const handleDeleteJob = async (id, title) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      setOpenDropdown(null);
      const result = await deleteJobPosting(id);
      if (result.success) {
        alert('Job posting deleted successfully!');
        fetchJobs();
      } else {
        alert(result.error || 'Failed to delete job posting');
      }
    } else {
      setOpenDropdown(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Careers</h1>
          <p className="text-slate-400">Manage job postings and applications.</p>
        </div>
        <Link 
          href="/admin/careers/new" 
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-blue-500/20"
        >
          <Plus size={18} />
          <span>Post New Job</span>
        </Link>
      </header>

      <div className="bg-slate-800/50 border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50 border-b border-white/10">
                <th className="px-6 py-4 text-slate-400 font-semibold text-sm">Job Title</th>
                <th className="px-6 py-4 text-slate-400 font-semibold text-sm">Department</th>
                <th className="px-6 py-4 text-slate-400 font-semibold text-sm">Location</th>
                <th className="px-6 py-4 text-slate-400 font-semibold text-sm">Status</th>
                <th className="px-6 py-4 text-slate-400 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500 border border-purple-500/20">
                        <Briefcase size={18} />
                      </div>
                      <div className="font-semibold text-white">{job.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{job.department}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-400">
                      <MapPin size={14} />
                      {job.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${
                      job.status === 'active' 
                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                        : 'bg-red-500/10 text-red-500 border-red-500/20'
                    }`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        className={`p-2 rounded-lg transition-colors ${
                          job.status === 'active' 
                            ? 'text-red-400 hover:bg-red-500/10 hover:text-red-300' 
                            : 'text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300'
                        }`}
                        onClick={() => handleToggleStatus(job.id, job.status)}
                        title={job.status === 'active' ? 'Close Job' : 'Activate Job'}
                      >
                        {job.status === 'active' ? <XCircle size={20} /> : <CheckCircle size={20} />}
                      </button>
                      
                      <div className="relative">
                        <button 
                          className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            setOpenDropdown(openDropdown === job.id ? null : job.id);
                          }}
                        >
                          <MoreVertical size={18} />
                        </button>
                        
                        {openDropdown === job.id && (
                          <div 
                            className="absolute right-0 top-full mt-2 w-48 bg-slate-900 border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteJob(job.id, job.title);
                              }}
                              className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-left"
                            >
                              <Trash2 size={14} />
                              Delete Job Posting
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                    No job postings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
