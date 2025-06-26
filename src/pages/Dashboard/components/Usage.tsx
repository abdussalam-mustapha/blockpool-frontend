import React from 'react';

const Usage: React.FC = () => {
  return (
    <div className="usage-container">
      <h2>API Usage</h2>
      <div className="usage-summary">
        <div className="usage-card">
          <div className="usage-title">RPC Requests</div>
          <div className="usage-value">1,245,678</div>
          <div className="usage-period">This Month</div>
        </div>
        
        <div className="usage-card">
          <div className="usage-title">Webhook Deliveries</div>
          <div className="usage-value">34,567</div>
          <div className="usage-period">This Month</div>
        </div>
        
        <div className="usage-card">
          <div className="usage-title">Data Indexed</div>
          <div className="usage-value">2.4 GB</div>
          <div className="usage-period">This Month</div>
        </div>
      </div>
      
      <div className="usage-chart">
        <h3>Usage Over Time</h3>
        <div className="chart-placeholder">
          {/* Chart would be implemented with a library like Chart.js or Recharts */}
          <div className="mock-chart">
            <div className="chart-bar" style={{ height: '60px' }}></div>
            <div className="chart-bar" style={{ height: '80px' }}></div>
            <div className="chart-bar" style={{ height: '120px' }}></div>
            <div className="chart-bar" style={{ height: '90px' }}></div>
            <div className="chart-bar" style={{ height: '150px' }}></div>
            <div className="chart-bar" style={{ height: '180px' }}></div>
            <div className="chart-bar" style={{ height: '130px' }}></div>
          </div>
        </div>
      </div>
      
      <div className="usage-details">
        <h3>Usage Breakdown</h3>
        <table className="usage-table">
          <thead>
            <tr>
              <th>Endpoint</th>
              <th>Requests</th>
              <th>% of Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>getAccountInfo</td>
              <td>456,789</td>
              <td>36.7%</td>
            </tr>
            <tr>
              <td>getAssetsByOwner</td>
              <td>345,678</td>
              <td>27.8%</td>
            </tr>
            <tr>
              <td>getTransaction</td>
              <td>234,567</td>
              <td>18.8%</td>
            </tr>
            <tr>
              <td>getSignaturesForAddress</td>
              <td>123,456</td>
              <td>9.9%</td>
            </tr>
            <tr>
              <td>Other</td>
              <td>85,188</td>
              <td>6.8%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Usage;
