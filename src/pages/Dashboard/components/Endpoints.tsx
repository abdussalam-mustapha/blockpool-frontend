import React from 'react';

const Endpoints: React.FC = () => {
  return (
    <div>
      <div className="dashboard-card">
        <h2>RPC Endpoint</h2>
        <div className="endpoint-url-display">https://mainnet.helius-rpc.com/</div>
        <p>Use this endpoint for JSON-RPC API calls to the Solana blockchain.</p>
      </div>
      
      <div className="dashboard-card">
        <h2>REST API Endpoint</h2>
        <div className="endpoint-url-display">https://api.helius.xyz/v0/</div>
        <p>Use this endpoint for REST API calls to Blockpool services.</p>
      </div>
      
      <div className="dashboard-card">
        <h2>WebSocket Endpoint</h2>
        <div className="endpoint-url-display">wss://mainnet.helius-rpc.com/ws</div>
        <p>Use this endpoint for real-time WebSocket connections.</p>
      </div>
    </div>
  );
};

export default Endpoints;
