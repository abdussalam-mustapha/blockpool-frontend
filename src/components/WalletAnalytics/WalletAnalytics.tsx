import React, { useState, useEffect } from 'react';
import { 
  getWalletTransactions, 
  getWalletBalances, 
  getTokenHoldings,
  formatTransactionsForChart,
  cachedApiCall
} from '../../utils/helius';
import './WalletAnalytics.css';

interface WalletAnalyticsProps {
  walletAddress: string;
}

const WalletAnalytics: React.FC<WalletAnalyticsProps> = ({ walletAddress }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [balances, setBalances] = useState<any>(null);
  const [tokenHoldings, setTokenHoldings] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (!walletAddress) return;

    const fetchWalletData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch wallet transactions with caching
        const txData = await cachedApiCall(
          `transactions_${walletAddress}`,
          () => getWalletTransactions(walletAddress)
        );
        setTransactions(txData);
        
        // Format transaction data for charts
        const formattedChartData = formatTransactionsForChart(txData);
        setChartData(formattedChartData);

        // Fetch wallet balances
        const balanceData = await cachedApiCall(
          `balances_${walletAddress}`,
          () => getWalletBalances(walletAddress)
        );
        setBalances(balanceData);

        // Fetch token holdings
        const holdingsData = await cachedApiCall(
          `holdings_${walletAddress}`,
          () => getTokenHoldings(walletAddress)
        );
        setTokenHoldings(holdingsData);

      } catch (err: any) {
        setError(err.message || 'Failed to fetch wallet data');
        console.error('Wallet analytics error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, [walletAddress]);

  if (loading) {
    return (
      <div className="wallet-analytics-loading">
        <div className="loading-spinner"></div>
        <p>Loading wallet data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="wallet-analytics-error">
        <h3>Error loading wallet data</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="wallet-analytics-container">
      <div className="wallet-header">
        <h2>Wallet Analytics</h2>
        <div className="wallet-address">
          <span>Address: </span>
          <code>{walletAddress}</code>
        </div>
      </div>

      <div className="analytics-grid">
        {/* Transaction History */}
        <div className="analytics-card">
          <h3>Transaction History</h3>
          <div className="transaction-list">
            {transactions.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Timestamp</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.slice(0, 10).map((tx, index) => (
                    <tr key={index}>
                      <td>{tx.type || 'Transaction'}</td>
                      <td>{new Date(tx.timestamp * 1000).toLocaleString()}</td>
                      <td className={`status ${tx.confirmed ? 'confirmed' : 'pending'}`}>
                        {tx.confirmed ? 'Confirmed' : 'Pending'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No transactions found for this wallet</p>
            )}
          </div>
          {transactions.length > 10 && (
            <div className="view-more">
              <button>View All Transactions</button>
            </div>
          )}
        </div>

        {/* Token Balances */}
        <div className="analytics-card">
          <h3>Token Balances</h3>
          {balances ? (
            <div className="token-balances">
              <div className="balance-item main-balance">
                <span className="token-name">SOL</span>
                <span className="token-amount">{balances.nativeBalance} SOL</span>
              </div>
              <div className="balance-list">
                {balances.tokens && balances.tokens.length > 0 ? (
                  balances.tokens.map((token: any, index: number) => (
                    <div className="balance-item" key={index}>
                      <span className="token-name">{token.name || token.mint.slice(0, 8)}</span>
                      <span className="token-amount">{token.amount}</span>
                    </div>
                  ))
                ) : (
                  <p>No token balances found</p>
                )}
              </div>
            </div>
          ) : (
            <p>No balance data available</p>
          )}
        </div>

        {/* NFTs */}
        <div className="analytics-card">
          <h3>NFT Collection</h3>
          <div className="nft-grid">
            {tokenHoldings.filter((token: any) => token.type === 'nft').length > 0 ? (
              tokenHoldings
                .filter((token: any) => token.type === 'nft')
                .slice(0, 6)
                .map((nft: any, index: number) => (
                  <div className="nft-item" key={index}>
                    {nft.image ? (
                      <img 
                        src={nft.image} 
                        alt={nft.name || 'NFT'} 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=NFT';
                        }}
                      />
                    ) : (
                      <div className="nft-placeholder">NFT</div>
                    )}
                    <div className="nft-info">
                      <p className="nft-name">{nft.name || 'Unnamed NFT'}</p>
                    </div>
                  </div>
                ))
            ) : (
              <p>No NFTs found in this wallet</p>
            )}
          </div>
        </div>

        {/* Transaction Activity */}
        <div className="analytics-card">
          <h3>Transaction Activity</h3>
          <div className="chart-container">
            {chartData.length > 0 ? (
              <div className="activity-chart">
                {/* This would be replaced with an actual chart component */}
                <div className="chart-placeholder">
                  <p>Transaction activity chart would render here</p>
                  <p>Install a chart library like Recharts or Chart.js to visualize this data</p>
                  <code>
                    {JSON.stringify(chartData.slice(0, 5), null, 2)}
                  </code>
                </div>
              </div>
            ) : (
              <p>No transaction activity data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletAnalytics;
