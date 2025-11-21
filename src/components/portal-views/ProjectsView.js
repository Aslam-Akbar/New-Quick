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
      <div className="view-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    if (status.toLowerCase().includes('complete')) return 'var(--dash-success)';
    if (status.toLowerCase().includes('development') || status.toLowerCase().includes('progress')) return 'var(--dash-accent)';
    return 'var(--dash-text-muted)';
  };

  return (
    <div className="portal-view">
      <div className="view-header">
        <div>
          <h2>My Projects</h2>
          <p className="view-subtitle">Track the progress of your ongoing development.</p>
        </div>
        <button className="btn-primary">
          <span>New Request</span>
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-header">
              <div className="project-icon">
                <FolderKanban size={24} color="var(--dash-accent)" />
              </div>
              <button className="btn-icon">
                <MoreHorizontal size={20} />
              </button>
            </div>
            
            <div className="project-body">
              <span className="project-status-badge" style={{ 
                color: getStatusColor(project.status),
                borderColor: getStatusColor(project.status),
                backgroundColor: `color-mix(in srgb, ${getStatusColor(project.status)} 10%, transparent)`
              }}>
                {project.status}
              </span>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">Web Development Project</p>
            </div>
            
            <div className="progress-section">
              <div className="progress-label">
                <span>Progress</span>
                <span className="progress-value">{project.progress}%</span>
              </div>
              <div className="progress-bar-bg">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="project-footer">
              <div className="project-meta">
                <Calendar size={16} />
                <span>Due Dec 31, 2025</span>
              </div>
              <div className="project-avatars">
                <div className="avatar-sm">PM</div>
                <div className="avatar-sm">Dev</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsView;
