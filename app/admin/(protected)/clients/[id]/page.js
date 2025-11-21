'use client';

import React, { useEffect, useMemo, useState, useTransition } from 'react';
import { useParams, useRouter } from 'next/navigation';
// Ensure these paths match your folder structure exactly
import { getClientById } from '../../../../../src/actions/admin-clients';
import { getClientProjects, createProject, deleteProject } from '../../../../../src/actions/admin-projects';
import { getClientInvoices, createInvoice, deleteInvoice, markInvoicePaid } from '../../../../../src/actions/admin-invoices';
import { getClientTickets, closeTicket } from '../../../../../src/actions/admin-tickets';
import Modal from '../../../../../src/components/admin/Modal';
import {
  Building, Mail, Phone, MapPin, Calendar,
  Briefcase, FileText, MessageSquare, ArrowLeft, Plus,
  CheckCircle, Clock, AlertCircle, MoreVertical, Search, Filter, Edit2, Trash2
} from 'lucide-react';

export default function ClientDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition(); // Handles loading states for actions

  const [client, setClient] = useState(null);
  const [projects, setProjects] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('projects');
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Modals
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', status: 'Pending', progress: 0, due_date: '' });

  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [newInvoice, setNewInvoice] = useState({ amount: '', currency: 'INR', status: 'Unpaid', date: '', due_date: '' });

  // --- DATA FETCHING ---
  const refreshData = async () => {
    if (!params.id) return;
    // We fetch specific lists to ensure local state is in sync
    const [pData, iData, tData] = await Promise.all([
      getClientProjects(params.id),
      getClientInvoices(params.id),
      getClientTickets(params.id),
    ]);
    setProjects(pData || []);
    setInvoices(iData || []);
    setTickets(tData || []);
    router.refresh(); // Forces Next.js server components to refresh too
  };

  useEffect(() => {
    const initFetch = async () => {
      if (!params.id) return;
      try {
        setLoading(true);
        const clientData = await getClientById(params.id);
        setClient(clientData);
        await refreshData();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    initFetch();
  }, [params.id]);

  // --- ACTION HANDLERS ---

  const handleCreateProject = (e) => {
    e.preventDefault();
    startTransition(async () => {
      const payload = { ...newProject, progress: Number(newProject.progress) };
      const result = await createProject(params.id, payload);
      if (result?.success) {
        setIsProjectModalOpen(false);
        setNewProject({ name: '', status: 'Pending', progress: 0, due_date: '' });
        await refreshData();
      } else {
        alert('Error: ' + (result?.error || 'Failed'));
      }
    });
  };

  const handleDeleteProject = (projectId) => {
    if (!confirm('Delete this project?')) return;
    startTransition(async () => {
      const result = await deleteProject(projectId);
      if (result?.success) await refreshData();
      else alert('Failed to delete');
    });
  };

  const handleCreateInvoice = (e) => {
    e.preventDefault();
    startTransition(async () => {
      const payload = { ...newInvoice, amount: parseFloat(newInvoice.amount) || 0 };
      const result = await createInvoice(params.id, payload);
      if (result?.success) {
        setIsInvoiceModalOpen(false);
        setNewInvoice({ amount: '', currency: 'INR', status: 'Unpaid', date: '', due_date: '' });
        await refreshData();
      } else {
        alert('Error: ' + (result?.error || 'Failed'));
      }
    });
  };

  const handleDeleteInvoice = (invoiceId) => {
    if (!confirm('Delete this invoice?')) return;
    startTransition(async () => {
      const result = await deleteInvoice(invoiceId);
      if (result?.success) await refreshData();
      else alert('Failed to delete');
    });
  };

  const handleMarkInvoicePaid = (invoiceId) => {
    startTransition(async () => {
      const result = await markInvoicePaid(invoiceId);
      if (result?.success) await refreshData();
      else alert('Failed to update');
    });
  };

  const handleCloseTicket = (ticketId) => {
    if (!confirm('Close this ticket?')) return;
    startTransition(async () => {
      const result = await closeTicket(ticketId);
      if (result?.success) await refreshData();
      else alert('Failed to close ticket');
    });
  };

  // --- UI HELPERS ---

  // Close dropdowns on click outside
  useEffect(() => {
    const close = () => setActiveDropdown(null);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, []);

  const toggleDropdown = (e, type, id) => {
    e.stopPropagation(); // Stop bubbling
    if (activeDropdown?.type === type && activeDropdown?.id === id) {
      setActiveDropdown(null);
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      setActiveDropdown({ type, id, position: { top: rect.bottom + window.scrollY, right: window.innerWidth - rect.right } });
    }
  };

  const counts = useMemo(() => ({
    projects: projects.length,
    invoices: invoices.length,
    tickets: tickets.length,
    activeProjects: projects.filter(p => p.status === 'In Progress').length,
    unpaidInvoices: invoices.filter(i => i.status === 'Unpaid').length,
  }), [projects, invoices, tickets]);

  if (loading) return <div className="p-10 text-center text-white">Loading...</div>;
  if (!client) return <div className="p-10 text-center text-white">Client Not Found</div>;

  const TabButton = ({ id, label, icon: Icon, count }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        activeTab === id ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`}
    >
      <Icon size={16} /> <span className="capitalize">{label}</span>
      <span className="ml-2 bg-white/10 px-2 py-0.5 rounded-full text-xs">{count}</span>
    </button>
  );

  return (
    <div className={`animate-in fade-in duration-500 relative ${isPending ? 'opacity-70 pointer-events-none' : ''}`}>
      {/* Header & Tabs */}
      <header className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <button onClick={() => router.back()} className="text-gray-400 hover:text-white flex items-center gap-2 mb-4">
              <ArrowLeft size={16} /> Back
            </button>
            <h1 className="text-3xl font-bold text-white">{client.company_name}</h1>
          </div>
          
          <div className="flex gap-2">
             {activeTab === 'projects' && (
                <button onClick={() => setIsProjectModalOpen(true)} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                  <Plus size={16} /> New Project
                </button>
             )}
             {activeTab === 'invoices' && (
                <button onClick={() => setIsInvoiceModalOpen(true)} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                  <Plus size={16} /> New Invoice
                </button>
             )}
          </div>
        </div>

        <div className="mt-6 inline-flex bg-white/5 rounded-xl p-1">
          <TabButton id="projects" label="Projects" icon={Briefcase} count={counts.projects} />
          <TabButton id="invoices" label="Invoices" icon={FileText} count={counts.invoices} />
          <TabButton id="tickets" label="Tickets" icon={MessageSquare} count={counts.tickets} />
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Info */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-6 text-white">
            <h3 className="font-bold mb-4 text-lg">Contact Details</h3>
            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex gap-3 items-center"><Mail size={16} className="text-blue-400"/> {client.email}</div>
              <div className="flex gap-3 items-center"><Phone size={16} className="text-blue-400"/> {client.phone || '-'}</div>
              <div className="flex gap-3 items-center"><MapPin size={16} className="text-blue-400"/> {client.address || '-'}</div>
            </div>
          </div>
        </aside>

        {/* Tab Content */}
        <div className="lg:col-span-8">
            {/* PROJECTS TAB */}
            {activeTab === 'projects' && (
               <div className="bg-slate-800/50 border border-white/10 rounded-2xl overflow-hidden">
                 <table className="w-full text-left text-sm text-gray-400">
                   <thead className="bg-white/5 text-white">
                     <tr>
                       <th className="p-4">Name</th>
                       <th className="p-4">Status</th>
                       <th className="p-4">Progress</th>
                       <th className="p-4 text-right">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                     {projects.map(p => (
                       <tr key={p.id} className="hover:bg-white/5">
                         <td className="p-4 text-white font-medium">{p.name}</td>
                         <td className="p-4">{p.status}</td>
                         <td className="p-4">{p.progress}%</td>
                         <td className="p-4 text-right relative">
                           <button onClick={(e) => toggleDropdown(e, 'project', p.id)} className="p-2 hover:bg-white/10 rounded"><MoreVertical size={16}/></button>
                         </td>
                       </tr>
                     ))}
                     {projects.length === 0 && <tr><td colSpan="4" className="p-8 text-center">No projects found.</td></tr>}
                   </tbody>
                 </table>
               </div>
            )}

            {/* INVOICES TAB */}
            {activeTab === 'invoices' && (
               <div className="bg-slate-800/50 border border-white/10 rounded-2xl overflow-hidden">
                 <table className="w-full text-left text-sm text-gray-400">
                   <thead className="bg-white/5 text-white">
                     <tr>
                       <th className="p-4">ID</th>
                       <th className="p-4">Amount</th>
                       <th className="p-4">Status</th>
                       <th className="p-4 text-right">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                     {invoices.map(inv => (
                       <tr key={inv.id} className="hover:bg-white/5">
                         <td className="p-4">#{inv.id}</td>
                         <td className="p-4 text-white">{inv.currency} {inv.amount}</td>
                         <td className="p-4">
                            <span className={`px-2 py-1 rounded text-xs ${inv.status === 'Paid' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                {inv.status}
                            </span>
                         </td>
                         <td className="p-4 text-right relative">
                           <button onClick={(e) => toggleDropdown(e, 'invoice', inv.id)} className="p-2 hover:bg-white/10 rounded"><MoreVertical size={16}/></button>
                         </td>
                       </tr>
                     ))}
                     {invoices.length === 0 && <tr><td colSpan="4" className="p-8 text-center">No invoices found.</td></tr>}
                   </tbody>
                 </table>
               </div>
            )}

            {/* TICKETS TAB */}
            {activeTab === 'tickets' && (
               <div className="bg-slate-800/50 border border-white/10 rounded-2xl overflow-hidden">
                 <table className="w-full text-left text-sm text-gray-400">
                   <thead className="bg-white/5 text-white">
                     <tr>
                       <th className="p-4">Subject</th>
                       <th className="p-4">Status</th>
                       <th className="p-4">Priority</th>
                       <th className="p-4 text-right">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                     {tickets.map(t => (
                       <tr key={t.id} className="hover:bg-white/5">
                         <td className="p-4 text-white">{t.subject}</td>
                         <td className="p-4">{t.status}</td>
                         <td className="p-4">{t.priority}</td>
                         <td className="p-4 text-right">
                            {t.status !== 'Closed' && (
                                <button onClick={() => handleCloseTicket(t.id)} className="text-red-400 hover:underline text-xs">Close</button>
                            )}
                         </td>
                       </tr>
                     ))}
                     {tickets.length === 0 && <tr><td colSpan="4" className="p-8 text-center">No tickets found.</td></tr>}
                   </tbody>
                 </table>
               </div>
            )}
        </div>
      </main>

      {/* DROPDOWN MENU */}
      {activeDropdown && (
        <div 
          className="fixed z-50 bg-slate-900 border border-white/10 rounded shadow-xl w-40"
          style={{ top: activeDropdown.position.top, right: activeDropdown.position.right }}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside menu
        >
           {activeDropdown.type === 'project' && (
              <button onClick={() => { handleDeleteProject(activeDropdown.id); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 flex items-center gap-2">
                <Trash2 size={14}/> Delete
              </button>
           )}
           {activeDropdown.type === 'invoice' && (
              <>
                <button onClick={() => { handleMarkInvoicePaid(activeDropdown.id); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 text-sm text-green-400 hover:bg-white/5 flex items-center gap-2">
                   <CheckCircle size={14}/> Paid
                </button>
                <button onClick={() => { handleDeleteInvoice(activeDropdown.id); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 flex items-center gap-2">
                   <Trash2 size={14}/> Delete
                </button>
              </>
           )}
        </div>
      )}

      {/* Include your Modals here (ProjectModal, InvoiceModal) with the existing code you have */}
      <Modal isOpen={isProjectModalOpen} onClose={() => setIsProjectModalOpen(false)} title="New Project">
         <form onSubmit={handleCreateProject} className="space-y-4">
            <input placeholder="Name" className="w-full bg-slate-900 p-2 border border-white/10 rounded text-white" value={newProject.name} onChange={e => setNewProject({...newProject, name: e.target.value})} required />
            <input type="date" className="w-full bg-slate-900 p-2 border border-white/10 rounded text-white" value={newProject.due_date} onChange={e => setNewProject({...newProject, due_date: e.target.value})} required />
            <button disabled={isPending} className="w-full bg-blue-600 text-white p-2 rounded">{isPending ? 'Saving...' : 'Create'}</button>
         </form>
      </Modal>

      <Modal isOpen={isInvoiceModalOpen} onClose={() => setIsInvoiceModalOpen(false)} title="New Invoice">
         <form onSubmit={handleCreateInvoice} className="space-y-4">
            <input placeholder="Amount" type="number" className="w-full bg-slate-900 p-2 border border-white/10 rounded text-white" value={newInvoice.amount} onChange={e => setNewInvoice({...newInvoice, amount: e.target.value})} required />
            <input type="date" className="w-full bg-slate-900 p-2 border border-white/10 rounded text-white" value={newInvoice.due_date} onChange={e => setNewInvoice({...newInvoice, due_date: e.target.value})} required />
            <button disabled={isPending} className="w-full bg-blue-600 text-white p-2 rounded">{isPending ? 'Saving...' : 'Create'}</button>
         </form>
      </Modal>

    </div>
  );
}