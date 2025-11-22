'use client'

import React, { useState, useEffect } from 'react';
import { getProjectLinks } from '../../actions/portal';
import { ExternalLink, Globe, Calendar, CheckCircle2 } from 'lucide-react';

const LiveSiteView = ({ userEmail }) => {
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProjectLinks(userEmail);
      if (result.success) {
        setProjectData(result.data);
      }
      setLoading(false);
    };
    fetchData();
  }, [userEmail]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Live Website</h2>
          <p className="text-slate-400 mt-1">View your project's hosted website and track updates.</p>
        </div>
      </div>

      <div className="bg-slate-800/50 border border-white/10 rounded-xl p-8">
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <Globe size={32} className="text-white" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-2">
              {projectData?.projectName || 'Your Project'}
            </h3>
            
            <p className="text-slate-400 mb-6">
              Your website is live and accessible to the public. Click the link below to view the current version.
            </p>

            {projectData?.hostedUrl ? (
              <a
                href={projectData.hostedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all hover:-translate-y-0.5 shadow-lg hover:shadow-blue-500/25"
              >
                <ExternalLink size={20} />
                <span>Visit Live Website</span>
              </a>
            ) : (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 text-amber-500">
                <p className="font-medium">Website deployment in progress...</p>
                <p className="text-sm mt-1 text-amber-400">The hosted link will be available once deployment is complete.</p>
              </div>
            )}

            {projectData?.lastUpdated && (
              <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-2 text-sm text-slate-400">
                <Calendar size={16} />
                <span>Last updated: {new Date(projectData.lastUpdated).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {projectData?.updateHistory && projectData.updateHistory.length > 0 && (
        <div className="bg-slate-800/50 border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Updates</h3>
          <div className="space-y-3">
            {projectData.updateHistory.map((update, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <CheckCircle2 size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-white font-medium">{update.message}</p>
                  <p className="text-sm text-slate-400 mt-1">{new Date(update.date).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveSiteView;
