import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Documentation.css';

const Documentation: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('getting-started');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [openFaqs, setOpenFaqs] = useState<{[key: string]: boolean}>({});
  
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
      // Check system preference if no localStorage setting
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      }
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
  
  const toggleFaq = (faqId: string) => {
    setOpenFaqs(prev => ({
      ...prev,
      [faqId]: !prev[faqId]
    }));
  };

  return (
    <div className="documentation-page">
      <header className="documentation-header">
        <div>
          <Link to="/" className="logo">Blockpool</Link>
        </div>
        <div className="search-container">
          <input type="text" placeholder="Search docs..." className="search-input" />
        </div>
        <div className="header-actions">
          <button className="connect-wallet">Connect Wallet</button>
          <button onClick={toggleDarkMode} className="theme-toggle">
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <div className="documentation-content">
        <aside className="sidebar">
          <div className="mb-6">
            <h3 className="text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400 mb-3">GETTING STARTED</h3>
            <ul className="space-y-1">
              <li>
                <a onClick={() => setActiveSection('what-is-blockpool')} className={`block px-3 py-2 text-sm rounded-md cursor-pointer ${activeSection === 'what-is-blockpool' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`}>What is Blockpool?</a>
              </li>
              <li>
                <a onClick={() => setActiveSection('quick-start')} className={`block px-3 py-2 text-sm rounded-md cursor-pointer ${activeSection === 'quick-start' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`}>Quick Start</a>
              </li>
            </ul>
          </div>

          <div className="sidebar-section">
            <h3>DOCUMENTATION</h3>
            <ul>
              <li className={activeSection === 'global-auth-flow' ? 'active' : ''}>
                <a onClick={() => setActiveSection('global-auth-flow')}>Global Auth Flow</a>
              </li>
              <li className={activeSection === 'blockchain-data-api' ? 'active' : ''}>
                <a onClick={() => setActiveSection('blockchain-data-api')}>Blockchain Data API</a>
              </li>
              <li className={activeSection === 'analytics' ? 'active' : ''}>
                <a onClick={() => setActiveSection('analytics')}>Analytics</a>
              </li>
              <li className={activeSection === 'wallet-tracker' ? 'active' : ''}>
                <a onClick={() => setActiveSection('wallet-tracker')}>Wallet Tracker</a>
              </li>
              <li className={activeSection === 'transaction-visualization' ? 'active' : ''}>
                <a onClick={() => setActiveSection('transaction-visualization')}>Transaction Visualization</a>
              </li>
            </ul>
          </div>

          <div className="sidebar-section">
            <h3>RESOURCES</h3>
            <ul>
              <li className={activeSection === 'understanding-gas-fees' ? 'active' : ''}>
                <a onClick={() => setActiveSection('understanding-gas-fees')}>Understanding Gas Fees</a>
              </li>
              <li className={activeSection === 'solana-developer-tools' ? 'active' : ''}>
                <a onClick={() => setActiveSection('solana-developer-tools')}>Solana Developer Tools</a>
              </li>
              <li className={activeSection === 'api-activity-tracking' ? 'active' : ''}>
                <a onClick={() => setActiveSection('api-activity-tracking')}>API Activity Tracking</a>
              </li>
            </ul>
          </div>

          <div className="sidebar-section">
            <h3>GUIDES</h3>
            <ul>
              <li className={activeSection === 'web3-apis' ? 'active' : ''}>
                <a onClick={() => setActiveSection('web3-apis')}>Web3 APIs</a>
              </li>
              <li className={activeSection === 'blockchain-data-api-guide' ? 'active' : ''}>
                <a onClick={() => setActiveSection('blockchain-data-api-guide')}>Blockchain Data API</a>
              </li>
            </ul>
          </div>

          <div className="sidebar-section">
            <h3>SUPPORT</h3>
            <ul>
              <li className={activeSection === 'discord-channel' ? 'active' : ''}>
                <a onClick={() => setActiveSection('discord-channel')}>Discord Channel</a>
              </li>
              <li className={activeSection === 'available-tokens' ? 'active' : ''}>
                <a onClick={() => setActiveSection('available-tokens')}>Available Tokens</a>
              </li>
              <li className={activeSection === 'handling-image-errors' ? 'active' : ''}>
                <a onClick={() => setActiveSection('handling-image-errors')}>Handling Image Errors</a>
              </li>
              <li className={activeSection === 'notification-center' ? 'active' : ''}>
                <a onClick={() => setActiveSection('notification-center')}>Notification Center</a>
              </li>
              <li className={activeSection === 'rates-pricing' ? 'active' : ''}>
                <a onClick={() => setActiveSection('rates-pricing')}>Rates & Pricing</a>
              </li>
              <li className={activeSection === 'faqs' ? 'active' : ''}>
                <a onClick={() => setActiveSection('faqs')}>FAQs</a>
              </li>
              <li className={activeSection === 'settings-account' ? 'active' : ''}>
                <a onClick={() => setActiveSection('settings-account')}>Settings & Account</a>
              </li>
            </ul>
          </div>
        </aside>

        <main className="main-content">
          <div className="content-header">
            <h1>Build with <span className="highlight">Solana</span> like never before</h1>
            <p>Blockpool provides powerful APIs and tools to help developers build exceptional experiences on Solana.</p>
            <div className="action-buttons">
              <button className="explore-api">Explore API</button>
              <button className="view-documentation">View Documentation</button>
            </div>
          </div>

          <section>
            <h2>What is Blockpool?</h2>
            <p>
              Blockpool is a comprehensive suite of developer tools and APIs designed to simplify building on Solana. Our platform helps developers build, test, and deploy applications with easy-to-implement solutions for key development challenges.
            </p>
            <p>
              Whether you're building a dApp application, NFT marketplace, or wallet integration, Blockpool provides the tools you need to interact with Solana blockchain data, analyze on-chain activity, and create exceptional experiences.
            </p>
            
            <h2>Getting Started</h2>
            <p>Follow these steps to start building with Blockpool:</p>
            
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Create an account</h3>
                <p>Sign up for a Blockpool account to get your API keys and access the dashboard.</p>
                <button className="create-account">Create account →</button>
              </div>
            </div>
            
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Get your API key</h3>
                <p>Generate an API key from your dashboard to authenticate your requests.</p>
                <button className="api-key-button">API key documentation →</button>
              </div>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Make your first API call</h3>
                <p>Start using Blockpool APIs to access blockchain data.</p>
                <div className="code-example">
                  <pre>
                    <code>
{`import { BLOCK_API_KEY } from './config';

async function getLatestTransactions() {
  const response = await fetch('https://api.blockpool.io/v1/transactions/latest', {
    headers: {
      'Authorization': 'Bearer ' + BLOCK_API_KEY,
    }
  });
  
  const data = await response.json();
  return data;
}`}
                    </code>
                  </pre>
                </div>
                <button className="api-example">View Example</button>
              </div>
            </div>
          </section>

          <section>
            <h2>Core Features</h2>

            <div className="feature-row">
              <div className="feature-box">
                <div className="feature-icon">🔌</div>
                <h3>Comprehensive APIs</h3>
                <p>Access blockchain data, real-time information, token analytics, and more with our RESTful APIs.</p>
                <a href="#" className="learn-more">View API reference →</a>
              </div>

              <div className="feature-box">
                <div className="feature-icon">💱</div>
                <h3>Token Swap</h3>
                <p>Integrate token swapping functionality powered by Solana's high-performance blockchain for fast, low-cost transactions.</p>
                <a href="#" className="learn-more">Learn about token swaps →</a>
              </div>
            </div>

            <div className="feature-row">
              <div className="feature-box">
                <div className="feature-icon">🔔</div>
                <h3>Real-time Notifications</h3>
                <p>Get programmable webhooks and real-time notifications for on-chain events.</p>
                <a href="#" className="learn-more">Set up notifications →</a>
              </div>

              <div className="feature-box">
                <div className="feature-icon">🔍</div>
                <h3>Explorer Dashboard</h3>
                <p>A powerful blockchain explorer with detailed network statistics and transaction history.</p>
                <a href="#" className="learn-more">Visit explorer →</a>
              </div>
            </div>
          </section>

          <section>
            <h2>Frequently Asked Questions</h2>

            <div className="faq-item">
              <h3 onClick={() => toggleFaq('rate-limits')} className={openFaqs['rate-limits'] ? 'active' : ''}>
                What are the rate limits for the API? <span className="faq-toggle">{openFaqs['rate-limits'] ? '−' : '+'}</span>
              </h3>
              {openFaqs['rate-limits'] && (
                <div className="faq-answer">
                  <p>Our standard plan includes 100,000 requests per day with a rate limit of 10 requests per second. Enterprise plans offer higher limits.</p>
                </div>
              )}
            </div>

            <div className="faq-item">
              <h3 onClick={() => toggleFaq('authentication')} className={openFaqs['authentication'] ? 'active' : ''}>
                How do I authenticate API requests? <span className="faq-toggle">{openFaqs['authentication'] ? '−' : '+'}</span>
              </h3>
              {openFaqs['authentication'] && (
                <div className="faq-answer">
                  <p>API requests require an API key passed in the Authorization header as a Bearer token.</p>
                </div>
              )}
            </div>

            <div className="faq-item">
              <h3 onClick={() => toggleFaq('wallets')} className={openFaqs['wallets'] ? 'active' : ''}>
                Which wallets are supported for authentication? <span className="faq-toggle">{openFaqs['wallets'] ? '−' : '+'}</span>
              </h3>
              {openFaqs['wallets'] && (
                <div className="faq-answer">
                  <p>We support Phantom, Solflare, Slope, and other major Solana wallets.</p>
                </div>
              )}
            </div>

            <div className="faq-item">
              <h3 onClick={() => toggleFaq('data-recency')} className={openFaqs['data-recency'] ? 'active' : ''}>
                How recent is the blockchain data? <span className="faq-toggle">{openFaqs['data-recency'] ? '−' : '+'}</span>
              </h3>
              {openFaqs['data-recency'] && (
                <div className="faq-answer">
                  <p>Our data is updated in real-time with minimal latency, typically within 1-2 seconds of on-chain confirmation.</p>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Documentation;
