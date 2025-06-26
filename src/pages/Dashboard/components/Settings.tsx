import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [projectName, setProjectName] = useState<string>('My Blockpool Project');
  const [projectDescription, setProjectDescription] = useState<string>('A Solana blockchain application using Blockpool services.');
  const [allowedDomains, setAllowedDomains] = useState<string>('example.com, app.example.com');
  const [notificationEmail, setNotificationEmail] = useState<string>('admin@example.com');
  const [slackWebhook, setSlackWebhook] = useState<string>('https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX');

  const handleSaveSettings = () => {
    // In a real app, this would save to backend
    alert('Settings saved successfully!');
  };

  return (
    <div>
      <div className="dashboard-card">
        <h2>General Settings</h2>
        <div className="form-group">
          <label htmlFor="projectName">Project Name</label>
          <input 
            type="text" 
            id="projectName" 
            className="form-input"
            value={projectName} 
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="projectDescription">Project Description</label>
          <textarea 
            id="projectDescription" 
            className="form-input"
            value={projectDescription} 
            onChange={(e) => setProjectDescription(e.target.value)}
            rows={3}
          />
        </div>
      </div>

      <div className="dashboard-card">
        <h2>Security Settings</h2>
        <div className="form-group">
          <label htmlFor="allowedDomains">Allowed Domains (comma separated)</label>
          <input 
            type="text" 
            id="allowedDomains" 
            className="form-input"
            value={allowedDomains} 
            onChange={(e) => setAllowedDomains(e.target.value)}
          />
        </div>
        <div className="form-group toggle-group">
          <label htmlFor="rateLimit">Enable Rate Limiting</label>
          <div className="toggle-switch">
            <input type="checkbox" id="rateLimit" defaultChecked />
            <span className="toggle-slider"></span>
          </div>
        </div>
        <div className="form-group toggle-group">
          <label htmlFor="ipRestriction">Enable IP Restrictions</label>
          <div className="toggle-switch">
            <input type="checkbox" id="ipRestriction" />
            <span className="toggle-slider"></span>
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <h2>Notification Settings</h2>
        <div className="form-group">
          <label htmlFor="notificationEmail">Email Notifications</label>
          <input 
            type="email" 
            id="notificationEmail" 
            className="form-input"
            value={notificationEmail} 
            onChange={(e) => setNotificationEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="slackWebhook">Slack Webhook URL</label>
          <input 
            type="text" 
            id="slackWebhook" 
            className="form-input"
            value={slackWebhook} 
            onChange={(e) => setSlackWebhook(e.target.value)}
          />
        </div>
        <div className="form-group toggle-group">
          <label htmlFor="usageAlerts">Usage Alerts</label>
          <div className="toggle-switch">
            <input type="checkbox" id="usageAlerts" defaultChecked />
            <span className="toggle-slider"></span>
          </div>
        </div>
      </div>

      <div className="dashboard-card danger-zone">
        <h2>Danger Zone</h2>
        <div className="danger-action">
          <div>
            <h3>Reset API Keys</h3>
            <p>This will invalidate all existing API keys and generate new ones.</p>
          </div>
          <button className="btn btn-danger">Reset Keys</button>
        </div>
        <div className="danger-action">
          <div>
            <h3>Delete Project</h3>
            <p>This action cannot be undone. This will permanently delete this project and all associated data.</p>
          </div>
          <button className="btn btn-danger">Delete Project</button>
        </div>
      </div>

      <div className="settings-actions">
        <button className="btn btn-secondary">Cancel</button>
        <button className="btn btn-primary" onClick={handleSaveSettings}>Save Changes</button>
      </div>
    </div>
  );
};

export default Settings;
