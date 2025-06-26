import React from 'react';

const Billing: React.FC = () => {
  return (
    <div>
      <div className="dashboard-card">
        <div className="plan-header">
          <h2>Current Plan: Pro</h2>
          <span className="plan-status active">Active</span>
        </div>
        <div className="plan-details">
          <div className="plan-feature">
            <span>Monthly Requests:</span>
            <span>10,000,000</span>
          </div>
          <div className="plan-feature">
            <span>Webhooks:</span>
            <span>Unlimited</span>
          </div>
          <div className="plan-feature">
            <span>Support:</span>
            <span>Priority</span>
          </div>
          <div className="plan-price">
            <span className="price-value">$199</span>
            <span className="price-period">/ month</span>
          </div>
        </div>
        <div className="plan-actions">
          <button className="btn btn-primary">Upgrade Plan</button>
        </div>
      </div>

      <div className="dashboard-card">
        <h2>Billing History</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>May 01, 2025</td>
              <td>Pro Plan - Monthly</td>
              <td>$199.00</td>
              <td><span className="payment-status paid">Paid</span></td>
              <td><button className="btn btn-secondary">Download</button></td>
            </tr>
            <tr>
              <td>Apr 01, 2025</td>
              <td>Pro Plan - Monthly</td>
              <td>$199.00</td>
              <td><span className="payment-status paid">Paid</span></td>
              <td><button className="btn btn-secondary">Download</button></td>
            </tr>
            <tr>
              <td>Mar 01, 2025</td>
              <td>Pro Plan - Monthly</td>
              <td>$199.00</td>
              <td><span className="payment-status paid">Paid</span></td>
              <td><button className="btn btn-secondary">Download</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="dashboard-card">
        <h2>Payment Methods</h2>
        <div className="payment-method-item">
          <span className="payment-method-icon">💳</span>
          <div className="payment-method-details">
            <span>Visa ending in 4242</span>
            <span className="payment-method-expiry">Expires 12/2026</span>
          </div>
          <div className="payment-method-actions">
            <button className="btn btn-secondary">Edit</button>
            <button className="btn btn-danger">Remove</button>
          </div>
        </div>
        <div className="add-payment-method">
          <button className="btn btn-primary">Add Payment Method</button>
        </div>
      </div>
    </div>
  );
};

export default Billing;
