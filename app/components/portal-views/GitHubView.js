'use client'

import React, { useState, useEffect } from 'react';
import { getProjectLinks } from '../../actions/portal';
import { Github, ExternalLink, Code2, GitBranch, Star } from 'lucide-react';

const GitHubView = ({ userEmail }) => {
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
          <h2 className="text-2xl font-bold text-white">Source Code</h2>
          <p className="text-slate-400 mt-1">Access your project's complete source code on GitHub.</p>
        </div>
      </div>

      <div className="bg-slate-800/50 border border-white/10 rounded-xl p-8">
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center border border-white/10">
            <Github size={32} className="text-white" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-2">
              {projectData?.projectName || 'Your Project'} Repository
            </h3>
            
            <p className="text-slate-400 mb-6">
              View, clone, or download the complete source code for your project. All code is version-controlled and regularly updated.
            </p>

            {projectData?.githubUrl ? (
              <div className="space-y-4">
                <a
                  href={projectData.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition-all hover:-translate-y-0.5 shadow-lg border border-white/10"
                >
                  <Github size={20} />
                  <span>View on GitHub</span>
                  <ExternalLink size={16} className="ml-1" />
                </a>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                      <Code2 size={16} />
                      <span>Repository Type</span>
                    </div>
                    <p className="text-white font-semibold">
                      {projectData.isPrivate ? 'Private' : 'Public'}
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                      <GitBranch size={16} />
                      <span>Main Branch</span>
                    </div>
                    <p className="text-white font-semibold">
                      {projectData.defaultBranch || 'main'}
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                      <Star size={16} />
                      <span>Last Commit</span>
                    </div>
                    <p className="text-white font-semibold">
                      {projectData.lastCommit ? new Date(projectData.lastCommit).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 text-amber-500">
                <p className="font-medium">Repository setup in progress...</p>
                <p className="text-sm mt-1 text-amber-400">The GitHub link will be available once the repository is configured.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {projectData?.githubUrl && (
        <div className="bg-slate-800/50 border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">How to Clone</h3>
          <div className="space-y-3">
            <div className="bg-slate-900/50 border border-white/5 rounded-lg p-4">
              <p className="text-sm text-slate-400 mb-2">HTTPS</p>
              <code className="text-sm text-green-400 font-mono">
                git clone {projectData.githubUrl}.git
              </code>
            </div>
            <p className="text-sm text-slate-400">
              Copy the command above to clone this repository to your local machine.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHubView;
