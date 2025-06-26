import React from 'react';

const ApiKeys: React.FC = () => {
  return (
    <div>
      <div className="dashboard-card api-key-item">
        <div className="api-key-header">
          <h2>Production Key</h2>
          <span className="api-key-status active">Active</span>
        </div>
        <div className="api-key-value">2c0e0145-6503-4035-ac83-f2023f8794b6</div>
        <div className="api-key-actions">
          <button className="btn btn-secondary">Copy</button>
          <button className="btn btn-secondary">Regenerate</button>
        </div>
      </div>
      
      <div className="dashboard-card api-key-item">
        <div className="api-key-header">
          <h2>Development Key</h2>
          <span className="api-key-status active">Active</span>
        </div>
        <div className="api-key-value">••••••••••••••••••••••••••••••••</div>
        <div className="api-key-actions">
          <button className="btn btn-secondary">Copy</button>
          <button className="btn btn-secondary">Regenerate</button>
        </div>
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <button className="btn btn-primary">Create New API Key</button>
      </div>
    </div>
  );
};

export default ApiKeys;
