import React, { useState } from 'react';

const RpcTesting: React.FC = () => {
  const [rpcUrl, setRpcUrl] = useState<string>(`https://mainnet.helius-rpc.com/?api-key=${import.meta.env.VITE_HELIUS_API_KEY}`);
  const [selectedMethod, setSelectedMethod] = useState<string>('getAccountInfo');
  const [accountAddress, setAccountAddress] = useState<string>('FHeBZJPxzJrxTsZQG2iXzZkQTJjVNrhyqwgfj3S7CJMm');
  const [rpcResponse, setRpcResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseTime, setResponseTime] = useState<number>(0);
  const [responseSize, setResponseSize] = useState<number>(0);

  const rpcMethods = [
    'getAccountInfo',
    'getBalance',
    'getBlockHeight',
    'getRecentBlockhash',
    'getSlot',
    'getVersion',
    'getHealth',
    'getIdentity',
    'getInflationRate',
    'getInflationGovernor',
    'getClusterNodes',
    'getEpochInfo',
    'getEpochSchedule',
    'getFeeForMessage',
    'getFirstAvailableBlock',
    'getGenesisHash',
    'getLatestBlockhash',
    'getMinimumBalanceForRentExemption',
    'getMultipleAccounts',
    'getProgramAccounts',
    'getSignatureStatuses',
    'getSignaturesForAddress',
    'getTransaction',
    'getTransactionCount',
    'getVoteAccounts',
    'isBlockhashValid',
    'minimumLedgerSlot',
    'requestAirdrop',
    'sendTransaction',
    'simulateTransaction',
    'getAsset',
    'getAssetsByOwner',
    'getAssetsByGroup',
    'getAssetsByCreator',
    'getAssetsByAuthority',
    'searchAssets'
  ];

  const handleRunRpc = async () => {
    setIsLoading(true);
    const startTime = performance.now();
    
    try {
      let params = [];
      
      // Configure parameters based on the selected method
      if (selectedMethod === 'getAccountInfo' || selectedMethod === 'getBalance') {
        params = [accountAddress];
      } else if (selectedMethod === 'getAssetsByOwner') {
        params = [accountAddress, { page: 1, limit: 10 }];
      }
      
      const response = await fetch(rpcUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 'blockpool-rpc',
          method: selectedMethod,
          params,
        }),
      });
      
      const data = await response.json();
      const responseText = JSON.stringify(data, null, 2);
      
      setRpcResponse(data);
      setResponseSize(new Blob([responseText]).size);
      setResponseTime(Math.round(performance.now() - startTime));
    } catch (error) {
      console.error('RPC call failed:', error);
      setRpcResponse({ error: 'Failed to execute RPC call' });
    } finally {
      setIsLoading(false);
    }
  };

  // Mock response for demonstration
  const mockResponse = {
    "jsonrpc": "2.0",
    "id": "blockpool-rpc",
    "result": {
      "context": {
        "slot": 150864724,
      },
      "value": {
        "lamports": 2635968,
        "data": "",
        "owner": "11111111111111111111111111111111",
        "executable": false,
        "rentEpoch": 18446744073709552000,
        "space": 0
      }
    }
  };

  return (
    <div className="rpc-testing-container">
      <div className="rpc-url-container">
        <input 
          type="text" 
          value={rpcUrl} 
          onChange={(e) => setRpcUrl(e.target.value)}
          className="rpc-url-input"
        />
      </div>
      
      <div className="rpc-method-container">
        <select 
          value={selectedMethod} 
          onChange={(e) => setSelectedMethod(e.target.value)}
          className="rpc-method-select"
        >
          {rpcMethods.map(method => (
            <option key={method} value={method}>{method}</option>
          ))}
        </select>
      </div>
      
      <div className="rpc-params-container">
        {(selectedMethod === 'getAccountInfo' || 
          selectedMethod === 'getBalance' || 
          selectedMethod === 'getAssetsByOwner') && (
          <input 
            type="text" 
            value={accountAddress} 
            onChange={(e) => setAccountAddress(e.target.value)}
            className="rpc-param-input"
            placeholder="Account Address"
          />
        )}
      </div>
      
      <div className="rpc-action-container">
        <button 
          onClick={handleRunRpc} 
          className="run-rpc-button"
          disabled={isLoading}
        >
          Run
        </button>
      </div>
      
      <div className="rpc-response-container">
        <div className="response-meta">
          <span className="response-time">Time: {responseTime > 0 ? `${responseTime} ms` : '532.80 ms'}</span>
          <span className="response-size">Size: {responseSize > 0 ? `${responseSize} bytes` : '229 bytes'}</span>
        </div>
        
        <div className="response-content">
          <pre className="response-json">
            {rpcResponse ? JSON.stringify(rpcResponse, null, 2) : JSON.stringify(mockResponse, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default RpcTesting;
