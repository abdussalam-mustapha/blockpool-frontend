import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import './components/DashboardComponents.css';

// Import components
import RpcTesting from './components/RpcTesting';
import Endpoints from './components/Endpoints';
import ApiKeys from './components/ApiKeys';
import Webhooks from './components/Webhooks';
import Usage from './components/Usage';
import Billing from './components/Billing';
import Settings from './components/Settings';
import Documentation from '../documentation/Documentation';

const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('rpc-testing');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user has a preference stored in localStorage
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else if (savedDarkMode === 'false') {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      // Default to dark mode for dashboard
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'rpc-testing':
        return <RpcTesting />;
      case 'endpoints':
        return <Endpoints />;
      case 'api-keys':
        return <ApiKeys />;
      case 'webhooks':
        return <Webhooks />;
      case 'usage':
        return <Usage />;
      case 'billing':
        return <Billing />;
      case 'settings':
        return <Settings />;
      case 'documentation':
        return <Documentation />;
      default:
        return <RpcTesting />;
    }
  };

  return (
    <div className="dashboard-page">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <Link to="/" className="logo">
            <span className="logo-text">BLOCKPOOL</span>
          </Link>
          <div className="environment-selector">
            <button className="env-button">Default</button>
          </div>
        </div>
        
        <div className="sidebar-content">
          <div className="api-key-display">
            <div className="api-key-label">API Key: Testsummer</div>
            <button className="api-key-toggle">▼</button>
          </div>
          
          <nav className="sidebar-nav">
            <ul>
              <li className={activeSection === 'dashboard' ? 'active' : ''}>
                <button onClick={() => setActiveSection('dashboard')}>
                  <i className="icon dashboard-icon"></i>
                  Dashboard
                </button>
              </li>
              <li className={activeSection === 'endpoints' ? 'active' : ''}>
                <button onClick={() => setActiveSection('endpoints')}>
                  <i className="icon endpoints-icon"></i>
                  Endpoints
                </button>
              </li>
              <li className={activeSection === 'api-keys' ? 'active' : ''}>
                <button onClick={() => setActiveSection('api-keys')}>
                  <i className="icon api-keys-icon"></i>
                  API Keys
                </button>
              </li>
              <li className={activeSection === 'webhooks' ? 'active' : ''}>
                <button onClick={() => setActiveSection('webhooks')}>
                  <i className="icon webhooks-icon"></i>
                  Webhooks
                </button>
              </li>
              <li className={activeSection === 'usage' ? 'active' : ''}>
                <button onClick={() => setActiveSection('usage')}>
                  <i className="icon usage-icon"></i>
                  Usage
                </button>
              </li>
              <li className={activeSection === 'rpc-testing' ? 'active' : ''}>
                <button onClick={() => setActiveSection('rpc-testing')}>
                  <i className="icon rpc-testing-icon"></i>
                  RPC Testing
                </button>
              </li>
              <li className={activeSection === 'billing' ? 'active' : ''}>
                <button onClick={() => setActiveSection('billing')}>
                  <i className="icon billing-icon"></i>
                  Billing
                </button>
              </li>
              <li className={activeSection === 'settings' ? 'active' : ''}>
                <button onClick={() => setActiveSection('settings')}>
                  <i className="icon settings-icon"></i>
                  Project Settings
                </button>
              </li>
            </ul>
          </nav>
          
          <div className="sidebar-footer">
            <ul>
              <li className={activeSection === 'system-status' ? 'active' : ''}>
                <button onClick={() => window.open('https://status.blockpool.io', '_blank')}>
                  <i className="icon status-icon"></i>
                  System Status
                </button>
              </li>
              <li className={activeSection === 'support' ? 'active' : ''}>
                <button onClick={() => window.open('https://support.blockpool.io', '_blank')}>
                  <i className="icon support-icon"></i>
                  Support
                </button>
              </li>
              <li className={activeSection === 'documentation' ? 'active' : ''}>
                <button onClick={() => setActiveSection('documentation')}>
                  <i className="icon docs-icon"></i>
                  Documentation
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>
      
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-title">
            {activeSection === 'rpc-testing' && <h1>RPC Testing</h1>}
            {activeSection === 'endpoints' && <h1>Endpoints</h1>}
            {activeSection === 'api-keys' && <h1>API Keys</h1>}
            {activeSection === 'webhooks' && <h1>Webhooks</h1>}
            {activeSection === 'usage' && <h1>Usage</h1>}
            {activeSection === 'billing' && <h1>Billing</h1>}
            {activeSection === 'settings' && <h1>Project Settings</h1>}
            {activeSection === 'documentation' && <h1>Documentation</h1>}
          </div>
          <div className="header-actions">
            <button onClick={toggleDarkMode} className="theme-toggle">
              {darkMode ? '☀️' : '🌙'}
            </button>
            <div className="user-profile">
              <button className="profile-button">
                <span className="profile-icon">👤</span>
              </button>
            </div>
          </div>
        </header>
        
        <div className="dashboard-content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
