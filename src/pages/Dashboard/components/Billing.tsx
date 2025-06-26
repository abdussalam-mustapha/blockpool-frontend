import React from 'react';

const Billing: React.FC = () => {
  return (
    <div className="billing-container">
      <h2>Billing & Subscription</h2>
      <div className="current-plan">
        <div className="plan-header">
          <h3>Current Plan: Pro</h3>
          <span className="plan-status active">Active</span>
        </div>
        <div className="plan-details">
          <div className="plan-feature">
            <span className="feature-name">Monthly Requests:</span>
            <span className="feature-value">10,000,000</span>
          </div>
          <div className="plan-feature">
            <span className="feature-name">Webhooks:</span>
            <span className="feature-value">Unlimited</span>
          </div>
          <div className="plan-feature">
            <span className="feature-name">Support:</span>
            <span className="feature-value">Priority</span>
          </div>
          <div className="plan-price">
            <span className="price-value">$199</span>
            <span className="price-period">/ month</span>
          </div>
        </div>
        <div className="plan-actions">
          <button className="upgrade-plan-button">Upgrade Plan</button>
        </div>
      </div>
      
      <div className="billing-history">
        <h3>Billing History</h3>
        <table className="billing-table">
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
              <td><button className="download-invoice-button">Download</button></td>
            </tr>
            <tr>
              <td>Apr 01, 2025</td>
              <td>Pro Plan - Monthly</td>
              <td>$199.00</td>
              <td><span className="payment-status paid">Paid</span></td>
              <td><button className="download-invoice-button">Download</button></td>
            </tr>
            <tr>
              <td>Mar 01, 2025</td>
              <td>Pro Plan - Monthly</td>
              <td>$199.00</td>
              <td><span className="payment-status paid">Paid</span></td>
              <td><button className="download-invoice-button">Download</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="payment-methods">
        <h3>Payment Methods</h3>
        <div className="payment-method-item">
          <div className="payment-method-icon">💳</div>
          <div className="payment-method-details">
            <div className="payment-method-name">Visa ending in 4242</div>
            <div className="payment-method-expiry">Expires 12/2026</div>
          </div>
          <div className="payment-method-actions">
            <button className="edit-payment-method-button">Edit</button>
            <button className="remove-payment-method-button">Remove</button>
          </div>
        </div>
        <div className="add-payment-method">
          <button className="add-payment-method-button">Add Payment Method</button>
        </div>
      </div>
    </div>
  );
};

export default Billing;
