import React from 'react';

const ApiKeys: React.FC = () => {
  return (
    <div className="api-keys-container">
      <h2>API Keys</h2>
      <div className="api-key-list">
        <div className="api-key-item">
          <div className="api-key-header">
            <h3>Production Key</h3>
            <span className="api-key-status active">Active</span>
          </div>
          <div className="api-key-value">2c0e0145-6503-4035-ac83-f2023f8794b6</div>
          <div className="api-key-actions">
            <button className="copy-key-button">Copy</button>
            <button className="regenerate-key-button">Regenerate</button>
          </div>
        </div>
        
        <div className="api-key-item">
          <div className="api-key-header">
            <h3>Development Key</h3>
            <span className="api-key-status active">Active</span>
          </div>
          <div className="api-key-value">••••••••••••••••••••••••••••••••</div>
          <div className="api-key-actions">
            <button className="copy-key-button">Copy</button>
            <button className="regenerate-key-button">Regenerate</button>
          </div>
        </div>
      </div>
      
      <div className="create-key-container">
        <button className="create-key-button">Create New API Key</button>
      </div>
    </div>
  );
};

export default ApiKeys;
