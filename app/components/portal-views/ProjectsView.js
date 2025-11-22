'use client'

import React, { useState, useEffect } from 'react';
import { getProjects } from '../../actions/portal';
import { FolderKanban, Calendar, ArrowRight, MoreHorizontal } from 'lucide-react';

const ProjectsView = ({ userEmail }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const result = await getProjects(userEmail);
      if (result.success) {
        setProjects(result.data);
      }
      setLoading(false);
    };
    fetchProjects();
  }, [userEmail]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    if (status.toLowerCase().includes('complete')) return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
    if (status.toLowerCase().includes('development') || status.toLowerCase().includes('progress')) return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
    return 'text-slate-500 bg-slate-500/10 border-slate-500/20';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">My Projects</h2>
          <p className="text-slate-400 mt-1">Track the progress of your ongoing development.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-blue-500/20">
          <span>New Request</span>
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-slate-800/50 border border-white/10 rounded-xl p-6 hover:bg-slate-800 transition-all hover:-translate-y-1 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                <FolderKanban size={24} />
              </div>
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-white">
                <MoreHorizontal size={20} />
              </button>
            </div>
            
            <div className="flex flex-col gap-3">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${getStatusColor(project.status)} w-fit`}>
                {project.status}
              </span>
              <h3 className="text-xl font-bold text-white">{project.title}</h3>
              <p className="text-sm text-slate-400">Web Development Project</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Progress</span>
                <span className="text-white font-semibold">{project.progress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-900/50 rounded-full overflow-hidden border border-white/10">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all duration-500"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Calendar size={16} />
                <span>Due Dec 31, 2025</span>
              </div>
              <div className="flex items-center -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-semibold border-2 border-slate-800">
                  PM
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold border-2 border-slate-800">
                  Dev
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsView;
