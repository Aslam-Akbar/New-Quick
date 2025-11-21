'use client'

import React, { useState, useEffect } from 'react';
import { getTickets, createTicket } from '../../actions/portal';
import { MessageSquare, AlertCircle, CheckCircle2, Send, Plus } from 'lucide-react';

const SupportView = ({ userEmail }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ subject: '', priority: 'medium', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, [userEmail]);

  const fetchTickets = async () => {
    const result = await getTickets(userEmail);
    if (result.success) {
      setTickets(result.data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    const result = await createTicket(userEmail, {
      subject: formData.subject,
      message: formData.message
    });

    if (result.success) {
      setFormData({ subject: '', priority: 'medium', message: '' });
      fetchTickets();
      setShowForm(false);
    }
    setSubmitting(false);
  };

  const getStatusIcon = (status) => {
    return status === 'open' ? 
      <AlertCircle size={18} className="text-warning" /> : 
      <CheckCircle2 size={18} className="text-success" />;
  };

  return (
    <div className="portal-view">
      <div className="view-header">
        <div>
          <h2>Support Center</h2>
          <p className="view-subtitle">Get help with your projects and account.</p>
        </div>
        <button 
          className={`btn-primary ${showForm ? 'btn-danger' : ''}`}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : (
            <>
              <Plus size={18} />
              <span>New Ticket</span>
            </>
          )}
        </button>
      </div>

      <div className="support-layout">
        {showForm && (
          <div className="support-form-section slide-in">
            <h3>Create New Ticket</h3>
            <form onSubmit={handleSubmit} className="support-form">
              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Brief description of your issue"
                  required
                />
              </div>

              <div className="form-group">
                <label>Priority</label>
                <div className="select-wrapper">
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your issue in detail..."
                  rows="5"
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-submit full-width" disabled={submitting}>
                <Send size={16} />
                {submitting ? 'Submitting...' : 'Submit Ticket'}
              </button>
            </form>
          </div>
        )}

        <div className="support-tickets-section">
          <h3 className="section-label">Recent Tickets</h3>
          {loading ? (
            <div className="view-loading">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="tickets-list">
              {tickets.length === 0 ? (
                <div className="empty-state-card">
                  <MessageSquare size={48} className="text-muted" />
                  <p>No support tickets found.</p>
                </div>
              ) : (
                tickets.map((ticket) => (
                  <div key={ticket.id} className="ticket-item">
                    <div className="ticket-content">
                      <div className="ticket-header">
                        <span className="ticket-subject">{ticket.subject}</span>
                        <span className="ticket-date">Today</span>
                      </div>
                      <p className="ticket-preview">Ticket #{ticket.id} • Priority: Medium</p>
                    </div>
                    <div className="ticket-status-wrapper">
                      {getStatusIcon(ticket.status)}
                      <span className={`ticket-status-text ${ticket.status}`}>
                        {ticket.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportView;
