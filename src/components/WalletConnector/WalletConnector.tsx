import React, { useState, useEffect } from 'react';
import './WalletConnector.css';

interface DemoWallet {
  name: string;
  address: string;
}

interface WalletConnectorProps {
  onConnect: (address: string) => void;
  onDisconnect?: () => void;
  connectedWallet?: string;
  demoWallets?: DemoWallet[];
}

const WalletConnector: React.FC<WalletConnectorProps> = ({
  onConnect,
  onDisconnect,
  connectedWallet,
  demoWallets = []
}) => {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  
  // Use provided demo wallets or default to empty array
  const defaultDemoWallets = demoWallets.length > 0 ? demoWallets : [
    { name: 'Demo Wallet 1', address: '5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8' },
    { name: 'Demo Wallet 2', address: 'HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH' },
    { name: 'Demo Wallet 3', address: '2vxsx1gBvNU2BbvshVTqwQ2RZ3jTaSe7aJHGDdyGQrYF' }
  ];
  
  const handleCustomWalletConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (walletAddress.trim()) {
      onConnect(walletAddress.trim());
      setIsDropdownOpen(false);
    }
  };
  
  const handleDemoWalletConnect = (address: string) => {
    onConnect(address);
    setIsDropdownOpen(false);
  };
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="wallet-connector">
      {connectedWallet ? (
        <div className="connected-wallet">
          <span className="connected-indicator"></span>
          <span className="wallet-address">{connectedWallet.slice(0, 6)}...{connectedWallet.slice(-4)}</span>
          <button className="disconnect-button" onClick={onDisconnect || (() => {})}>Disconnect</button>
        </div>
      ) : (
        <div className="wallet-dropdown">
          <button className="connect-button" onClick={toggleDropdown}>
            Connect Wallet
          </button>
          
          {isDropdownOpen && (
            <div className="dropdown-content">
              <div className="dropdown-header">
                <h3>Connect to a Wallet</h3>
                <button className="close-button" onClick={() => setIsDropdownOpen(false)}>×</button>
              </div>
              
              <div className="demo-wallets">
                <h4>Demo Wallets</h4>
                <div className="wallet-list">
                  {defaultDemoWallets.map((wallet, index) => (
                    <button 
                      key={index} 
                      className="demo-wallet-button"
                      onClick={() => handleDemoWalletConnect(wallet.address)}
                    >
                      {wallet.name}
                      <span className="wallet-address-preview">{wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="custom-wallet">
                <h4>Or enter a wallet address</h4>
                <form onSubmit={handleCustomWalletConnect}>
                  <input 
                    type="text" 
                    placeholder="Enter Solana wallet address" 
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                  />
                  <button type="submit">Connect</button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WalletConnector;
