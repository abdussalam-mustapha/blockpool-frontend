import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WalletAnalytics from '../../components/WalletAnalytics/WalletAnalytics';
import NotificationCenter from '../../components/NotificationCenter/NotificationCenter';
import BlockchainVisualizer from '../../components/BlockchainVisualizer/BlockchainVisualizer';
import NftGallery from '../../components/NftGallery/NftGallery';
import WebhookManager from '../../components/WebhookManager/WebhookManager';
import WalletConnector from '../../components/WalletConnector/WalletConnector';
import './HeliusDemo.css';

const HeliusDemo: React.FC = () => {
  const [connectedWallet, setConnectedWallet] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('analytics');
  
  // Demo wallet addresses for testing
  const demoWallets = [
    { name: 'Demo Wallet 1', address: '5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8' },
    { name: 'Demo Wallet 2', address: 'HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH' },
    { name: 'Demo Wallet 3', address: '2vxsx1gBvNU2BbvshVTqwQ2RZ3jTaSe7aJHGDdyGQrYF' }
  ];
  
  const connectWallet = (address: string) => {
    setConnectedWallet(address);
  };
  
  const handleDisconnect = () => {
    setConnectedWallet('');
  };

  return (
    <div className="helius-demo-page">
      <header className="demo-header">
        <div className="header-left">
          <Link to="/" className="logo">Blockpool</Link>
          <h1>Helius API Demo</h1>
        </div>
        <div className="header-right">
          {connectedWallet && <NotificationCenter walletAddress={connectedWallet} />}
        </div>
      </header>
      
      <main className="demo-content">
        {!connectedWallet ? (
          <div className="wallet-connection-panel">
            <h2>Connect to a Wallet</h2>
            <p>Connect to a Solana wallet to explore Helius API features</p>
            
            <WalletConnector 
              onConnect={connectWallet} 
              demoWallets={demoWallets}
            />
          </div>
        ) : (
          <>
            <div className="wallet-header">
              <h2>Connected to: <span className="wallet-address-display">{connectedWallet.slice(0, 10)}...{connectedWallet.slice(-6)}</span></h2>
              <button className="disconnect-button" onClick={handleDisconnect}>Disconnect</button>
            </div>
            
            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
                onClick={() => setActiveTab('analytics')}
              >
                Wallet Analytics
              </button>
              <button 
                className={`tab ${activeTab === 'nfts' ? 'active' : ''}`}
                onClick={() => setActiveTab('nfts')}
              >
                NFT Gallery
              </button>
              <button 
                className={`tab ${activeTab === 'visualizer' ? 'active' : ''}`}
                onClick={() => setActiveTab('visualizer')}
              >
                Blockchain Visualizer
              </button>
              <button 
                className={`tab ${activeTab === 'webhooks' ? 'active' : ''}`}
                onClick={() => setActiveTab('webhooks')}
              >
                Webhooks
              </button>
              <button 
                className={`tab ${activeTab === 'notifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('notifications')}
              >
                Notifications
              </button>
            </div>
            
            <div className="tab-content">
              {activeTab === 'analytics' && (
                <WalletAnalytics walletAddress={connectedWallet} />
              )}
              
              {activeTab === 'nfts' && (
                <NftGallery walletAddress={connectedWallet} />
              )}
              
              {activeTab === 'visualizer' && (
                <BlockchainVisualizer 
                  dataType="transactions" 
                  walletAddress={connectedWallet}
                  timeframe="week"
                />
              )}
              
              {activeTab === 'webhooks' && (
                <WebhookManager walletAddress={connectedWallet} />
              )}
              
              {activeTab === 'notifications' && (
                <div className="notifications-container">
                  <NotificationCenter walletAddress={connectedWallet} />
                </div>
              )}
            </div>
          </>
        )}
      </main>
      
      <footer className="demo-footer">
        <p>Powered by <a href="https://helius.dev" target="_blank" rel="noopener noreferrer">Helius APIs</a> | <a href="https://docs.helius.dev" target="_blank" rel="noopener noreferrer">Documentation</a></p>
      </footer>
    </div>
  );
};

export default HeliusDemo;
