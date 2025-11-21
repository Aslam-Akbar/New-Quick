'use client'

import React, { useState, useEffect } from 'react';
import { getClients, createClient, deleteClient } from '../../../../src/actions/admin-clients';
import Modal from '../../../../src/components/admin/Modal';
import { Search, MoreVertical, Mail, Building, Plus, User, Phone, MapPin, Briefcase, Lock, Edit, Trash2 } from 'lucide-react';

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClient, setNewClient] = useState({
    company_name: '',
    contact_name: '',
    email: '',
    password: '',
    plan_type: 'Basic',
    phone: '',
    address: ''
  });
  const [creating, setCreating] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  // Close dropdown when clicking outside
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

  const fetchClients = async () => {
    setLoading(true);
    const data = await getClients();
    setClients(data);
    setLoading(false);
  };

  const handleCreateClient = async (e) => {
    e.preventDefault();
    setCreating(true);

    const result = await createClient(newClient);
    
    if (result.success) {
      setIsModalOpen(false);
      setNewClient({
        company_name: '',
        contact_name: '',
        email: '',
        password: '',
        plan_type: 'Basic',
        phone: '',
        address: ''
      });
      fetchClients(); // Refresh the list
      alert('Client created successfully!');
    } else {
      alert(result.message || 'Failed to create client');
    }
    
    setCreating(false);
  };

  const filteredClients = clients.filter(client => 
    client.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contact_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-3xl font-bold text-white mb-2">Clients</h1>
          <p className="text-slate-400">Manage your client base.</p>
        </div>
      </header>

      <div className="bg-slate-800/50 border border-white/10 rounded-xl overflow-hidden">
        <div className="p-6 flex flex-col sm:flex-row justify-between gap-4 border-b border-white/10">
          <div className="relative w-full sm:w-72">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900/50 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-500"
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-blue-500/20"
          >
            <Plus size={18} />
            Add Client
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50 border-b border-white/10">
                <th className="px-6 py-4 text-slate-400 font-semibold text-sm">Company</th>
                <th className="px-6 py-4 text-slate-400 font-semibold text-sm">Contact</th>
                <th className="px-6 py-4 text-slate-400 font-semibold text-sm">Plan</th>
                <th className="px-6 py-4 text-slate-400 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredClients.map((client) => (
                <tr 
                  key={client.id} 
                  className="hover:bg-white/5 transition-colors cursor-pointer group"
                  onClick={() => window.location.href = `/admin/clients/${client.id}`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                        <Building size={18} />
                      </div>
                      <div>
                        <div className="font-semibold text-white">{client.company_name}</div>
                        <div className="text-sm text-slate-500">{client.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{client.contact_name}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      {client.plan_type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <button 
                        className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          setOpenDropdown(openDropdown === client.id ? null : client.id);
                        }}
                      >
                        <MoreVertical size={18} />
                      </button>
                      
                      {openDropdown === client.id && (
                        <div 
                          className="absolute right-0 top-full mt-2 w-48 bg-slate-900 border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdown(null);
                              window.location.href = `/admin/clients/${client.id}`;
                            }}
                            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors text-left"
                          >
                            <Edit size={14} />
                            Edit Client
                          </button>
                          
                          <button
                            onClick={async (e) => {
                              e.stopPropagation();
                              if (confirm(`Are you sure you want to delete ${client.company_name}?`)) {
                                setOpenDropdown(null);
                                const result = await deleteClient(client.id);
                                if (result.success) {
                                  alert('Client deleted successfully!');
                                  fetchClients(); // Refresh the list
                                } else {
                                  alert(result.message || 'Failed to delete client');
                                }
                              } else {
                                setOpenDropdown(null);
                              }
                            }}
                            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-left"
                          >
                            <Trash2 size={14} />
                            Delete Client
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredClients.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-slate-500">
                    No clients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Client Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Client">
        <form onSubmit={handleCreateClient} className="space-y-4">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
              <Building size={16} className="text-blue-500" />
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newClient.company_name}
              onChange={(e) => setNewClient({ ...newClient, company_name: e.target.value })}
              placeholder="Enter company name"
              required
              className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
              <User size={16} className="text-blue-500" />
              Contact Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newClient.contact_name}
              onChange={(e) => setNewClient({ ...newClient, contact_name: e.target.value })}
              placeholder="Enter contact name"
              required
              className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
              <Mail size={16} className="text-blue-500" />
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={newClient.email}
              onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
              placeholder="Enter email address"
              required
              className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
              <Lock size={16} className="text-blue-500" />
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={newClient.password}
              onChange={(e) => setNewClient({ ...newClient, password: e.target.value })}
              placeholder="Enter password for client login"
              required
              minLength={6}
              className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
            />
            <p className="text-xs text-slate-500">
              Client will use this password to login to the portal
            </p>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
              <Phone size={16} className="text-blue-500" />
              Phone
            </label>
            <input
              type="tel"
              value={newClient.phone}
              onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
              placeholder="Enter phone number"
              className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
              <Briefcase size={16} className="text-blue-500" />
              Plan Type <span className="text-red-500">*</span>
            </label>
            <select
              value={newClient.plan_type}
              onChange={(e) => setNewClient({ ...newClient, plan_type: e.target.value })}
              required
              className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            >
              <option value="Basic" className="bg-slate-900 text-white">Basic</option>
              <option value="Standard" className="bg-slate-900 text-white">Standard</option>
              <option value="Premium" className="bg-slate-900 text-white">Premium</option>
              <option value="Enterprise" className="bg-slate-900 text-white">Enterprise</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
              <MapPin size={16} className="text-blue-500" />
              Address
            </label>
            <textarea
              value={newClient.address}
              onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
              placeholder="Enter address"
              rows="3"
              className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600 resize-none"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-4 py-2.5 rounded-lg border border-white/10 text-slate-300 hover:bg-white/5 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors font-medium shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={creating}
            >
              {creating ? 'Creating...' : 'Create Client'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
