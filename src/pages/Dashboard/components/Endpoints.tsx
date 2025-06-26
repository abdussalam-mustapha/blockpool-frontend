import React from 'react';

const Endpoints: React.FC = () => {
  return (
    <div className="endpoints-container">
      <h2>API Endpoints</h2>
      <div className="endpoint-list">
        <div className="endpoint-item">
          <h3>RPC Endpoint</h3>
          <div className="endpoint-url">https://mainnet.helius-rpc.com/</div>
          <p>Use this endpoint for JSON-RPC API calls to the Solana blockchain.</p>
        </div>
        
        <div className="endpoint-item">
          <h3>REST API Endpoint</h3>
          <div className="endpoint-url">https://api.helius.xyz/v0/</div>
          <p>Use this endpoint for REST API calls to Blockpool services.</p>
        </div>
        
        <div className="endpoint-item">
          <h3>WebSocket Endpoint</h3>
          <div className="endpoint-url">wss://mainnet.helius-rpc.com/ws</div>
          <p>Use this endpoint for real-time WebSocket connections.</p>
        </div>
      </div>
    </div>
  );
};

export default Endpoints;
