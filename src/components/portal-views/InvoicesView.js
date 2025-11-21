'use client'

import React, { useState, useEffect } from 'react';
import { getInvoices } from '../../actions/portal';
import { Download, FileText, Filter, ArrowDownToLine } from 'lucide-react';

const InvoicesView = ({ userEmail }) => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      const result = await getInvoices(userEmail);
      if (result.success) {
        setInvoices(result.data);
      }
      setLoading(false);
    };
    fetchInvoices();
  }, [userEmail]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusStyle = (status) => {
    const s = status.toLowerCase();
    if (s === 'paid') return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
    if (s === 'pending') return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
    if (s === 'overdue') return 'text-red-500 bg-red-500/10 border-red-500/20';
    return 'text-slate-500 bg-slate-500/10 border-slate-500/20';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Invoices</h2>
          <p className="text-slate-400 mt-1">Manage your billing and payment history.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-white/10 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors">
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-blue-500/20">
            <ArrowDownToLine size={16} />
            <span>Export All</span>
          </button>
        </div>
      </div>

      <div className="bg-slate-800/50 border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50 border-b border-white/10">
                <th className="px-6 py-4 text-slate-400 font-semibold text-sm">Invoice ID</th>
                <th className="px-6 py-4 text-slate-400 font-semibold text-sm">Date</th>
                <th className="px-6 py-4 text-slate-400 font-semibold text-sm">Amount</th>
                <th className="px-6 py-4 text-slate-400 font-semibold text-sm">Status</th>
                <th className="px-6 py-4 text-slate-400 font-semibold text-sm">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 text-white font-medium">
                      <FileText size={16} className="text-slate-400" />
                      <span>INV-{String(invoice.id).padStart(4, '0')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{formatDate(invoice.due_date)}</td>
                  <td className="px-6 py-4 text-white font-semibold">{formatCurrency(invoice.amount)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${getStatusStyle(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-white" title="Download Invoice">
                      <Download size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvoicesView;
