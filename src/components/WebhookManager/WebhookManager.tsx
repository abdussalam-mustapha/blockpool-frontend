import React, { useState, useEffect } from 'react';
import { createWebhook } from '../../utils/helius';
import './WebhookManager.css';

interface WebhookManagerProps {
  walletAddress?: string;
}

interface Webhook {
  id: string;
  url: string;
  transactionTypes: string[];
  accountAddresses: string[];
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
}

const WebhookManager: React.FC<WebhookManagerProps> = ({ walletAddress }) => {
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Form state
  const [webhookUrl, setWebhookUrl] = useState<string>('');
  const [selectedTransactionTypes, setSelectedTransactionTypes] = useState<string[]>(['any']);
  const [accountAddress, setAccountAddress] = useState<string>(walletAddress || '');
  const [additionalAddresses, setAdditionalAddresses] = useState<string[]>([]);
  const [newAddress, setNewAddress] = useState<string>('');
  
  // Available transaction types for Helius webhooks
  const transactionTypes = [
    'any',
    'nft_mint',
    'nft_sale',
    'nft_listing',
    'nft_cancel_listing',
    'nft_auction_created',
    'nft_bid',
    'nft_auction_complete',
    'token_transfer',
    'sol_transfer'
  ];
  
  // Load existing webhooks (mock data for demo)
  useEffect(() => {
    // In a real implementation, you would fetch webhooks from Helius API
    // For now, we'll use mock data
    const mockWebhooks: Webhook[] = [
      {
        id: 'webhook-1',
        url: 'https://example.com/webhook1',
        transactionTypes: ['nft_mint', 'nft_sale'],
        accountAddresses: [walletAddress || 'Demo1111111111111111111111111111111111'],
        status: 'active',
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 'webhook-2',
        url: 'https://example.com/webhook2',
        transactionTypes: ['sol_transfer'],
        accountAddresses: [walletAddress || 'Demo1111111111111111111111111111111111'],
        status: 'active',
        createdAt: new Date(Date.now() - 172800000).toISOString()
      }
    ];
    
    setWebhooks(mockWebhooks);
  }, [walletAddress]);
  
  const handleTransactionTypeChange = (type: string) => {
    if (type === 'any') {
      setSelectedTransactionTypes(['any']);
      return;
    }
    
    // Remove 'any' if it's selected and another type is being added
    let updatedTypes = selectedTransactionTypes.filter(t => t !== 'any');
    
    if (updatedTypes.includes(type)) {
      updatedTypes = updatedTypes.filter(t => t !== type);
    } else {
      updatedTypes.push(type);
    }
    
    // If no types are selected, default to 'any'
    if (updatedTypes.length === 0) {
      updatedTypes = ['any'];
    }
    
    setSelectedTransactionTypes(updatedTypes);
  };
  
  const handleAddAddress = () => {
    if (!newAddress || additionalAddresses.includes(newAddress)) {
      return;
    }
    
    setAdditionalAddresses([...additionalAddresses, newAddress]);
    setNewAddress('');
  };
  
  const handleRemoveAddress = (address: string) => {
    setAdditionalAddresses(additionalAddresses.filter(a => a !== address));
  };
  
  const handleCreateWebhook = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!webhookUrl) {
      setError('Webhook URL is required');
      return;
    }
    
    if (!accountAddress && additionalAddresses.length === 0) {
      setError('At least one account address is required');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      // Prepare addresses array
      const addresses = [accountAddress, ...additionalAddresses].filter(Boolean);
      
      // Call Helius API to create webhook
      // In a real implementation, you would use the actual API
      // const response = await createWebhook(webhookUrl, selectedTransactionTypes, addresses);
      
      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a mock response
      const newWebhook: Webhook = {
        id: `webhook-${Date.now()}`,
        url: webhookUrl,
        transactionTypes: selectedTransactionTypes,
        accountAddresses: addresses,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      // Add the new webhook to the list
      setWebhooks([...webhooks, newWebhook]);
      
      // Reset form
      setWebhookUrl('');
      setSelectedTransactionTypes(['any']);
      setAdditionalAddresses([]);
      
      setSuccess('Webhook created successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to create webhook');
      console.error('Webhook creation error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteWebhook = async (webhookId: string) => {
    try {
      setLoading(true);
      
      // In a real implementation, you would call the Helius API to delete the webhook
      // For now, we'll just remove it from the local state
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setWebhooks(webhooks.filter(webhook => webhook.id !== webhookId));
      setSuccess('Webhook deleted successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to delete webhook');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="webhook-manager">
      <div className="webhook-header">
        <h2>Webhook Manager</h2>
        <p className="description">
          Configure webhooks to receive real-time notifications for blockchain events.
        </p>
      </div>
      
      {error && (
        <div className="alert error">
          <p>{error}</p>
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}
      
      {success && (
        <div className="alert success">
          <p>{success}</p>
          <button onClick={() => setSuccess(null)}>×</button>
        </div>
      )}
      
      <div className="webhook-container">
        <div className="webhook-form-container">
          <h3>Create New Webhook</h3>
          
          <form onSubmit={handleCreateWebhook} className="webhook-form">
            <div className="form-group">
              <label htmlFor="webhook-url">Webhook URL</label>
              <input
                id="webhook-url"
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://your-server.com/webhook"
                required
              />
              <small>The URL that will receive webhook events</small>
            </div>
            
            <div className="form-group">
              <label>Transaction Types</label>
              <div className="transaction-types-grid">
                {transactionTypes.map((type) => (
                  <div key={type} className="checkbox-item">
                    <input
                      type="checkbox"
                      id={`type-${type}`}
                      checked={selectedTransactionTypes.includes(type)}
                      onChange={() => handleTransactionTypeChange(type)}
                    />
                    <label htmlFor={`type-${type}`}>{type}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="account-address">Primary Account Address</label>
              <input
                id="account-address"
                type="text"
                value={accountAddress}
                onChange={(e) => setAccountAddress(e.target.value)}
                placeholder="Solana wallet address"
              />
              <small>The primary wallet address to monitor</small>
            </div>
            
            <div className="form-group">
              <label>Additional Addresses</label>
              <div className="address-input-group">
                <input
                  type="text"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  placeholder="Enter another address to monitor"
                />
                <button 
                  type="button" 
                  onClick={handleAddAddress}
                  disabled={!newAddress}
                  className="add-address-btn"
                >
                  Add
                </button>
              </div>
              
              {additionalAddresses.length > 0 && (
                <div className="address-list">
                  {additionalAddresses.map((address, index) => (
                    <div key={index} className="address-item">
                      <span className="address-text">{address}</span>
                      <button 
                        type="button" 
                        onClick={() => handleRemoveAddress(address)}
                        className="remove-address-btn"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="form-actions">
              <button 
                type="submit" 
                className="create-webhook-btn"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Webhook'}
              </button>
            </div>
          </form>
        </div>
        
        <div className="webhooks-list-container">
          <h3>Your Webhooks</h3>
          
          {webhooks.length === 0 ? (
            <div className="no-webhooks">
              <p>No webhooks configured yet.</p>
            </div>
          ) : (
            <div className="webhooks-list">
              {webhooks.map((webhook) => (
                <div key={webhook.id} className="webhook-item">
                  <div className="webhook-item-header">
                    <span className={`status-indicator ${webhook.status}`}></span>
                    <h4 className="webhook-url">{webhook.url}</h4>
                    <button 
                      onClick={() => handleDeleteWebhook(webhook.id)}
                      className="delete-webhook-btn"
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </div>
                  
                  <div className="webhook-details">
                    <div className="detail-group">
                      <span className="detail-label">Transaction Types:</span>
                      <div className="tags">
                        {webhook.transactionTypes.map((type, index) => (
                          <span key={index} className="tag">{type}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="detail-group">
                      <span className="detail-label">Addresses:</span>
                      <div className="addresses">
                        {webhook.accountAddresses.map((address, index) => (
                          <code key={index} className="address">{address}</code>
                        ))}
                      </div>
                    </div>
                    
                    <div className="detail-group">
                      <span className="detail-label">Created:</span>
                      <span>{new Date(webhook.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebhookManager;
