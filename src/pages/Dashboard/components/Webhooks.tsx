import React from 'react';

const Webhooks: React.FC = () => {
  return (
    <div className="webhooks-container">
      <h2>Webhooks</h2>
      <div className="webhook-list">
        <div className="webhook-item">
          <div className="webhook-header">
            <h3>Transaction Webhook</h3>
            <span className="webhook-status active">Active</span>
          </div>
          <div className="webhook-url">https://example.com/webhook/transactions</div>
          <div className="webhook-details">
            <div className="webhook-type">Type: Transaction</div>
            <div className="webhook-accounts">Accounts: 3</div>
          </div>
          <div className="webhook-actions">
            <button className="edit-webhook-button">Edit</button>
            <button className="delete-webhook-button">Delete</button>
          </div>
        </div>
        
        <div className="webhook-item">
          <div className="webhook-header">
            <h3>NFT Webhook</h3>
            <span className="webhook-status active">Active</span>
          </div>
          <div className="webhook-url">https://example.com/webhook/nfts</div>
          <div className="webhook-details">
            <div className="webhook-type">Type: NFT</div>
            <div className="webhook-collections">Collections: 2</div>
          </div>
          <div className="webhook-actions">
            <button className="edit-webhook-button">Edit</button>
            <button className="delete-webhook-button">Delete</button>
          </div>
        </div>
      </div>
      
      <div className="create-webhook-container">
        <button className="create-webhook-button">Create New Webhook</button>
      </div>
    </div>
  );
};

export default Webhooks;
