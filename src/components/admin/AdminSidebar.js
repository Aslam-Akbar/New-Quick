'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { logoutAdmin } from '../../actions/admin-auth';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  LogOut, 
  Shield 
} from 'lucide-react';
// import '../../assets/css/dashboard.css'; // Removed

const AdminSidebar = ({ adminUser }) => {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', href: '/admin' },
    { icon: <Users size={20} />, label: 'Clients', href: '/admin/clients' },
    { icon: <Briefcase size={20} />, label: 'Careers', href: '/admin/careers' },
  ];

  const handleLogout = async () => {
    await logoutAdmin();
    router.push('/admin/login');
  };

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-slate-950 border-r border-white/10 flex flex-col z-50 hidden lg:flex">
      <div className="p-6 border-b border-white/10">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Quick<span className="text-blue-500">Admin</span>
        </h2>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className={`${isActive ? 'text-white' : 'text-slate-500 group-hover:text-white transition-colors'}`}>
                {item.icon}
              </span>
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 bg-slate-900/50">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
            <Shield size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <span className="block text-sm font-semibold text-white truncate">{adminUser?.name || 'Admin'}</span>
            <span className="block text-xs text-slate-500 truncate">Administrator</span>
          </div>
        </div>
        <button 
          onClick={handleLogout} 
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-sm font-medium"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
