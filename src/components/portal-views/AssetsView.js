'use client'

import React, { useState, useEffect } from 'react';
import { getAssets } from '../../actions/portal';
import { Download, FileText, Package, Image, FileCode, MoreVertical } from 'lucide-react';

const AssetsView = ({ userEmail }) => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssets = async () => {
      const result = await getAssets(userEmail);
      if (result.success) {
        setAssets(result.data);
      }
      setLoading(false);
    };
    fetchAssets();
  }, [userEmail]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  const getFileIcon = (type) => {
    const iconProps = { size: 32, strokeWidth: 1.5 };
    switch (type.toUpperCase()) {
      case 'PDF':
        return <FileText {...iconProps} className="text-red-500" />;
      case 'APK':
        return <Package {...iconProps} className="text-green-500" />;
      case 'FIGMA':
        return <Image {...iconProps} className="text-purple-500" />;
      case 'JS':
      case 'JSX':
        return <FileCode {...iconProps} className="text-yellow-500" />;
      default:
        return <FileText {...iconProps} className="text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Assets & Files</h2>
          <p className="text-slate-400 mt-1">Access your project deliverables and resources.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.map((asset) => (
          <div key={asset.id} className="bg-slate-800/50 border border-white/10 rounded-xl p-6 hover:bg-slate-800 transition-all hover:-translate-y-1 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="w-16 h-16 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                {getFileIcon(asset.type)}
              </div>
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-white">
                <MoreVertical size={16} />
              </button>
            </div>
            
            <div className="flex flex-col gap-1">
              <h4 className="text-white font-semibold truncate" title={asset.name}>{asset.name}</h4>
              <span className="text-sm text-slate-400">{asset.type} • 2.4 MB</span>
            </div>

            <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-blue-500/20 w-full">
              <Download size={16} />
              <span>Download</span>
            </button>
          </div>
        ))}
        
        {assets.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 bg-slate-800/30 rounded-xl border border-white/5">
            <Package size={48} className="text-slate-600 mb-4" />
            <p className="text-slate-500">No assets available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetsView;
