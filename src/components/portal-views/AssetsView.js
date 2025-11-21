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
      <div className="view-loading">
        <div className="spinner"></div>
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
    <div className="portal-view">
      <div className="view-header">
        <div>
          <h2>Assets & Files</h2>
          <p className="view-subtitle">Access your project deliverables and resources.</p>
        </div>
      </div>

      <div className="assets-grid">
        {assets.map((asset) => (
          <div key={asset.id} className="asset-card">
            <div className="asset-card-header">
              <div className="asset-icon-wrapper">
                {getFileIcon(asset.type)}
              </div>
              <button className="btn-icon-sm">
                <MoreVertical size={16} />
              </button>
            </div>
            
            <div className="asset-info">
              <h4 className="asset-name" title={asset.name}>{asset.name}</h4>
              <span className="asset-meta">{asset.type} • 2.4 MB</span>
            </div>

            <button className="btn-download-block">
              <Download size={16} />
              <span>Download</span>
            </button>
          </div>
        ))}
        
        {/* Empty State Placeholder if no assets */}
        {assets.length === 0 && (
          <div className="empty-state-card">
            <Package size={48} className="text-muted" />
            <p>No assets available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetsView;
