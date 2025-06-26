import React, { useState, useEffect } from 'react';
import './NotificationCenter.css';

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
}

interface NotificationCenterProps {
  walletAddress?: string;
  onNotificationClick?: (notification: Notification) => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ 
  walletAddress,
  onNotificationClick 
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  // Mock function to simulate receiving notifications from a webhook
  // In a real implementation, this would be replaced with a WebSocket connection
  // or server-sent events that receive webhook data from Helius
  useEffect(() => {
    if (!walletAddress) return;

    // Simulate connection status
    setIsConnected(true);
    
    // Mock notifications for demonstration
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'TRANSFER',
        title: 'SOL Received',
        message: 'You received 0.5 SOL from wallet ending in ...7x8j',
        timestamp: Date.now() - 300000, // 5 minutes ago
        read: false
      },
      {
        id: '2',
        type: 'SWAP',
        title: 'Token Swap Completed',
        message: 'Swap of 10 USDC for 0.25 SOL completed successfully',
        timestamp: Date.now() - 3600000, // 1 hour ago
        read: false
      },
      {
        id: '3',
        type: 'NFT_MINT',
        title: 'NFT Minted',
        message: 'Successfully minted "Cosmic Explorer #247" to your wallet',
        timestamp: Date.now() - 86400000, // 1 day ago
        read: true
      }
    ];
    
    setNotifications(mockNotifications);
    
    // Count unread notifications
    const unread = mockNotifications.filter(n => !n.read).length;
    setUnreadCount(unread);
    
    // In a real implementation, you would set up a WebSocket connection here
    // to listen for real-time notifications from your server that processes
    // Helius webhooks
    
    // Simulate receiving a new notification every 30 seconds
    const interval = setInterval(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: ['TRANSFER', 'SWAP', 'NFT_MINT', 'NFT_SALE', 'STAKE'][Math.floor(Math.random() * 5)],
        title: `New ${['TRANSFER', 'SWAP', 'NFT_MINT', 'NFT_SALE', 'STAKE'][Math.floor(Math.random() * 5)]} Event`,
        message: `A new blockchain event was detected for your wallet`,
        timestamp: Date.now(),
        read: false
      };
      
      setNotifications(prev => [newNotification, ...prev]);
      setUnreadCount(prev => prev + 1);
    }, 30000);
    
    return () => {
      clearInterval(interval);
      setIsConnected(false);
    };
  }, [walletAddress]);
  
  const toggleNotificationCenter = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Mark all as read when opening
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, read: true }))
      );
      setUnreadCount(0);
    }
  };
  
  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    setNotifications(prev => 
      prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
    );
    
    // Update unread count
    if (!notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
    
    // Call the callback if provided
    if (onNotificationClick) {
      onNotificationClick(notification);
    }
  };
  
  const formatTimeAgo = (timestamp: number): string => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return `${seconds} seconds ago`;
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    
    const days = Math.floor(hours / 24);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  };
  
  const getNotificationIcon = (type: string): string => {
    switch (type) {
      case 'TRANSFER':
        return '💸';
      case 'SWAP':
        return '🔄';
      case 'NFT_MINT':
        return '🎨';
      case 'NFT_SALE':
        return '💰';
      case 'STAKE':
        return '📌';
      default:
        return '📣';
    }
  };

  return (
    <div className="notification-center">
      <button 
        className="notification-bell" 
        onClick={toggleNotificationCenter}
        aria-label="Notifications"
      >
        🔔
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>
      
      {isOpen && (
        <div className="notification-panel">
          <div className="notification-header">
            <h3>Notifications</h3>
            <div className="connection-status">
              <span className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}></span>
              <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
            </div>
          </div>
          
          <div className="notification-list">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div 
                  key={notification.id}
                  className={`notification-item ${!notification.read ? 'unread' : ''}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="notification-icon">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="notification-content">
                    <div className="notification-title">{notification.title}</div>
                    <div className="notification-message">{notification.message}</div>
                    <div className="notification-time">{formatTimeAgo(notification.timestamp)}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-notifications">
                <p>No notifications yet</p>
              </div>
            )}
          </div>
          
          <div className="notification-footer">
            <button className="clear-all">Clear All</button>
            <button className="settings">Settings</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
