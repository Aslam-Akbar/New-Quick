import React from 'react';
import { redirect } from 'next/navigation';
import { verifyAdminSession } from '../../../src/actions/admin-auth';
import AdminSidebar from '../../../src/components/admin/AdminSidebar';
// import '../../../src/assets/css/dashboard.css'; // Removed

export default async function AdminLayout({ children }) {
  const adminUser = await verifyAdminSession();

  if (!adminUser) {
    redirect('/admin/login');
  }

  return (
    <div className="flex min-h-screen bg-slate-900">
      <AdminSidebar adminUser={adminUser} />
      <main className="flex-1 ml-0 lg:ml-64 p-8 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
