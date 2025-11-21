'use client'

import React, { useState, useEffect } from 'react';
import { getInvoices } from '../../actions/portal';
import { Download, FileText, Search, Filter, ArrowDownToLine } from 'lucide-react';

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
      <div className="view-loading">
        <div className="spinner"></div>
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
    if (s === 'paid') return { color: 'var(--dash-success)', bg: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 0.2)' };
    if (s === 'pending') return { color: 'var(--dash-warning)', bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.2)' };
    if (s === 'overdue') return { color: 'var(--dash-danger)', bg: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.2)' };
    return { color: 'var(--dash-text-muted)', bg: 'rgba(255, 255, 255, 0.05)', border: 'rgba(255, 255, 255, 0.1)' };
  };

  return (
    <div className="portal-view">
      <div className="view-header">
        <div>
          <h2>Invoices</h2>
          <p className="view-subtitle">Manage your billing and payment history.</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <button className="btn-primary">
            <ArrowDownToLine size={16} />
            <span>Export All</span>
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="invoices-table">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => {
              const style = getStatusStyle(invoice.status);
              return (
                <tr key={invoice.id}>
                  <td>
                    <div className="invoice-id">
                      <FileText size={16} className="text-muted" />
                      <span>INV-{String(invoice.id).padStart(4, '0')}</span>
                    </div>
                  </td>
                  <td>{formatDate(invoice.due_date)}</td>
                  <td className="amount">{formatCurrency(invoice.amount)}</td>
                  <td>
                    <span className="status-badge" style={{
                      color: style.color,
                      backgroundColor: style.bg,
                      borderColor: style.border
                    }}>
                      {invoice.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn-icon" title="Download Invoice">
                      <Download size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoicesView;
