import React from 'react';

const Webhooks: React.FC = () => {
  return (
    <div>
      <div className="dashboard-card webhook-item">
        <div className="webhook-header">
          <h2>Transaction Webhook</h2>
          <span className="webhook-status active">Active</span>
        </div>
        <div className="webhook-url">https://example.com/webhook/transactions</div>
        <div className="webhook-details">
          <span>Type: Transaction</span>
          <span>Accounts: 3</span>
        </div>
        <div className="webhook-actions">
          <button className="btn btn-secondary">Edit</button>
          <button className="btn btn-danger">Delete</button>
        </div>
      </div>

      <div className="dashboard-card webhook-item">
        <div className="webhook-header">
          <h2>NFT Webhook</h2>
          <span className="webhook-status active">Active</span>
        </div>
        <div className="webhook-url">https://example.com/webhook/nfts</div>
        <div className="webhook-details">
          <span>Type: NFT</span>
          <span>Collections: 2</span>
        </div>
        <div className="webhook-actions">
          <button className="btn btn-secondary">Edit</button>
          <button className="btn btn-danger">Delete</button>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <button className="btn btn-primary">Create New Webhook</button>
      </div>
    </div>
  );
};

export default Webhooks;
