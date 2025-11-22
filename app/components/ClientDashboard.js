'use client';

import React, { useState, useEffect } from 'react';
import { getDashboardData } from '../actions/dashboard';
import { logout } from '../actions/auth';
import { 
  LayoutDashboard, 
  FolderKanban, 
  FileText, 
  Settings, 
  LogOut, 
  PieChart, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Download,
  File,
  LifeBuoy,
  ChevronRight,
  Bell
} from 'lucide-react';
// import '../assets/css/dashboard.css'; // Removed
// import '../assets/css/portal-views.css'; // Removed - assuming we will fix sub-views later or they inherit

// Import sub-views
import ProjectsView from './portal-views/ProjectsView';
import InvoicesView from './portal-views/InvoicesView';

import SupportView from './portal-views/SupportView';
import SettingsView from './portal-views/SettingsView';

const ClientDashboard = ({ userEmail }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeView, setActiveView] = useState('dashboard');

  useEffect(() => {
    const fetchData = async () => {
      if (!userEmail) {
        setError("Please log in to view the dashboard.");
        setLoading(false);
        return;
      }

      try {
        const result = await getDashboardData(userEmail);
        if (result.success) {
          setData(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userEmail]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-slate-400 gap-4 bg-slate-900">
        <div className="w-12 h-12 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin"></div>
        <h2 className="text-lg font-medium">Loading Secure Portal...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-slate-400 gap-4 bg-slate-900">
        <h2 className="text-red-500 text-xl font-semibold">{error}</h2>
        <button 
          className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-500 px-5 py-2.5 rounded-lg cursor-pointer transition-all hover:bg-red-500/20 font-medium mt-4" 
          onClick={() => logout()}
        >
          <LogOut size={18} />
          <span>Return to Home</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-[280px] bg-slate-900/95 backdrop-blur-xl border-r border-white/10 flex flex-col p-6 fixed h-full left-0 top-0 z-50 transition-transform">
        <div className="pb-8 mb-4 border-b border-white/10">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
            Quick<span className="text-blue-500">Portal</span>
          </h2>
        </div>
        <nav className="flex flex-col gap-2 flex-1 overflow-y-auto">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
            { id: 'projects', icon: FolderKanban, label: 'My Projects' },
            { id: 'invoices', icon: FileText, label: 'Invoices' },

            { id: 'support', icon: LifeBuoy, label: 'Support' },
            { id: 'settings', icon: Settings, label: 'Settings' }
          ].map((item) => (
            <button 
              key={item.id}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all w-full text-left font-medium
                ${activeView === item.id 
                  ? 'bg-gradient-to-r from-blue-500/10 to-transparent text-blue-500 border-l-4 border-blue-500 rounded-r-xl' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white hover:translate-x-1 border-l-4 border-transparent'
                }`}
              onClick={() => setActiveView(item.id)}
            >
              <item.icon size={20} className={activeView === item.id ? 'drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' : ''} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-6 border-t border-white/10">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center font-semibold text-white shadow-sm border-2 border-white/10">
              {data.clientInfo.contact.charAt(0)}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="font-semibold text-sm truncate">{data.clientInfo.contact}</span>
              <span className="text-xs text-slate-400">{data.clientInfo.plan} Plan</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-[280px] p-10 max-w-[1600px]">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
              Welcome back, {data.clientInfo.contact.split(' ')[0]}
            </h1>
            <p className="text-slate-400 mt-2">
              Here's what's happening with your projects today.
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <button className="bg-transparent border-none text-slate-400 cursor-pointer p-2 rounded-lg transition-all hover:bg-white/10 hover:text-white hover:scale-105 flex items-center justify-center" title="Notifications">
              <Bell size={20} />
            </button>
            <button 
              className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-500 px-5 py-2.5 rounded-lg cursor-pointer transition-all hover:bg-red-500/20 hover:-translate-y-px font-medium text-sm" 
              onClick={() => logout()}
            >
              <LogOut size={18} />
              <span>Log Out</span>
            </button>
          </div>
        </header>

        <div className="dashboard-content">
          {activeView === 'projects' && <ProjectsView userEmail={userEmail} />}
          {activeView === 'invoices' && <InvoicesView userEmail={userEmail} />}

          {activeView === 'support' && <SupportView userEmail={userEmail} />}
          {activeView === 'settings' && <SettingsView userEmail={userEmail} />}
          
          {activeView === 'dashboard' && data && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {[
                  { label: 'Active Projects', value: data.stats.activeProjects, icon: FolderKanban, color: 'blue' },
                  { label: 'Total Spent', value: `$${data.stats.totalSpent.toLocaleString()}`, icon: PieChart, color: 'emerald' },
                  { label: 'Open Tickets', value: data.stats.openTickets, icon: AlertCircle, color: 'amber' },
                  { label: 'Next Meeting', value: data.stats.nextMeeting, icon: Clock, color: 'violet' }
                ].map((stat, index) => (
                  <div key={index} className="bg-slate-800/70 backdrop-blur-xl p-6 rounded-2xl border border-white/10 flex items-center gap-5 transition-all shadow-lg hover:-translate-y-1 hover:shadow-2xl hover:bg-slate-800/90">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center relative overflow-hidden
                      ${stat.color === 'blue' ? 'bg-blue-500/10 text-blue-500' : 
                        stat.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-500' :
                        stat.color === 'amber' ? 'bg-amber-500/10 text-amber-500' :
                        'bg-violet-500/10 text-violet-500'}`}>
                      <stat.icon size={24} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-400 mb-1 font-medium">{stat.label}</span>
                      <span className="text-3xl font-bold text-white tracking-tight">{stat.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Current Project */}
              {data.currentProject && (
                <div className="mb-10">
                  <div className="text-xl font-semibold mb-5 text-white flex items-center gap-3">
                    <FolderKanban size={20} className="text-blue-500" />
                    <h3>Current Project: {data.currentProject.title}</h3>
                  </div>
                  <div className="bg-slate-800/70 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                      <span className="bg-blue-500/10 text-blue-500 px-4 py-1.5 rounded-full text-xs font-semibold border border-blue-500/20 uppercase tracking-wide shadow-[0_0_10px_rgba(59,130,246,0.1)]">
                        {data.currentProject.status}
                      </span>
                      <span className="font-semibold text-white">{data.currentProject.progress}% Complete</span>
                    </div>
                    
                    <div className="mb-10">
                      <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden shadow-inner">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                          style={{ width: `${data.currentProject.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {data.currentProject.timeline && (
                      <div className="relative pt-4">
                        <h4 className="text-sm text-slate-400 mb-6 uppercase tracking-wider font-semibold">Project Timeline</h4>
                        <div className="flex justify-between relative">
                          <div className="absolute top-[15px] left-0 w-full h-0.5 bg-white/5 -z-0" />
                          {data.currentProject.timeline.map((item, index) => (
                            <div key={index} className="flex flex-col items-center gap-3 relative z-10 flex-1">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all border-2
                                ${item.status === 'completed' 
                                  ? 'bg-emerald-500 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                                  : item.status === 'in-progress'
                                    ? 'bg-slate-900 border-blue-500 text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                                    : 'bg-slate-900 border-white/10'
                                }`}>
                                {item.status === 'completed' && <CheckCircle2 size={18} />}
                                {item.status === 'in-progress' && <Clock size={18} />}
                                {item.status === 'pending' && <div className="w-2 h-2 bg-white/10 rounded-full"></div>}
                              </div>
                              <span className={`text-sm font-medium text-center ${
                                item.status === 'completed' || item.status === 'in-progress' ? 'text-white' : 'text-slate-400'
                              }`}>
                                {item.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Recent Deliverables */}
              <div className="bg-slate-800/70 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-lg">
                <div className="text-xl font-semibold mb-5 text-white flex items-center gap-3">
                  <FileText size={20} />
                  <h3>Recent Deliverables</h3>
                </div>
                <div className="w-full overflow-x-auto">
                  <table className="w-full border-separate border-spacing-0">
                    <thead>
                      <tr>
                        <th className="text-left p-4 text-slate-400 font-semibold text-xs uppercase tracking-wider border-b border-white/10">File Name</th>
                        <th className="text-left p-4 text-slate-400 font-semibold text-xs uppercase tracking-wider border-b border-white/10">Type</th>
                        <th className="text-left p-4 text-slate-400 font-semibold text-xs uppercase tracking-wider border-b border-white/10">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.recentFiles.map((file, index) => (
                        <tr key={index} className="group hover:bg-white/5 transition-colors">
                          <td className="p-4 border-b border-white/5 text-white text-sm">
                            <div className="flex items-center gap-3 font-medium">
                              <File size={16} className="text-blue-400" />
                              <span>{file.name}</span>
                            </div>
                          </td>
                          <td className="p-4 border-b border-white/5 text-white text-sm">
                            <span className="bg-white/5 px-3 py-1 rounded-full text-xs text-slate-400 border border-white/5">{file.type}</span>
                          </td>
                          <td className="p-4 border-b border-white/5 text-white text-sm">
                            <button className="bg-transparent border-none text-slate-400 cursor-pointer p-2 rounded-lg transition-all hover:bg-white/10 hover:text-white hover:scale-105 flex items-center justify-center" title="Download">
                              <Download size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default ClientDashboard;
