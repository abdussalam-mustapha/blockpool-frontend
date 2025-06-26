import React from 'react';

const Usage: React.FC = () => {
  return (
    <div>
      <div className="usage-summary">
        <div className="dashboard-card">
          <div className="usage-title">RPC Requests</div>
          <div className="usage-value">1,245,678</div>
          <div className="usage-period">This Month</div>
        </div>
        
        <div className="dashboard-card">
          <div className="usage-title">Webhook Deliveries</div>
          <div className="usage-value">34,567</div>
          <div className="usage-period">This Month</div>
        </div>
        
        <div className="dashboard-card">
          <div className="usage-title">Data Indexed</div>
          <div className="usage-value">2.4 GB</div>
          <div className="usage-period">This Month</div>
        </div>
      </div>
      
      <div className="dashboard-card usage-chart">
        <h2>Usage Over Time</h2>
        <div className="chart-placeholder">
          <div className="mock-chart">
            <div className="chart-bar" style={{ height: '60%' }}></div>
            <div className="chart-bar" style={{ height: '80%' }}></div>
            <div className="chart-bar" style={{ height: '70%' }}></div>
            <div className="chart-bar" style={{ height: '90%' }}></div>
            <div className="chart-bar" style={{ height: '75%' }}></div>
            <div className="chart-bar" style={{ height: '85%' }}></div>
            <div className="chart-bar" style={{ height: '65%' }}></div>
          </div>
        </div>
      </div>
      
      <div className="dashboard-card">
        <h2>Usage Breakdown</h2>
        <table className="table">
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
