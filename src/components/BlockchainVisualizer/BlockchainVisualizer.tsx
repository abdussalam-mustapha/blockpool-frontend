import React, { useState, useEffect } from 'react';
import { heliusRpcCall } from '../../utils/helius';
import './BlockchainVisualizer.css';

interface BlockchainVisualizerProps {
  dataType: 'transactions' | 'tokens' | 'nfts';
  walletAddress?: string;
  timeframe?: 'day' | 'week' | 'month';
  height?: number;
}

interface DataPoint {
  label: string;
  value: number;
}

const BlockchainVisualizer: React.FC<BlockchainVisualizerProps> = ({
  dataType,
  walletAddress,
  timeframe = 'week',
  height = 300
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DataPoint[]>([]);
  const [maxValue, setMaxValue] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // In a real implementation, this would call different Helius API endpoints
        // based on the dataType and timeframe
        
        // For now, we'll generate mock data
        const mockData = generateMockData(dataType, timeframe);
        setData(mockData);
        
        // Find the maximum value for scaling the chart
        const max = Math.max(...mockData.map(item => item.value));
        setMaxValue(max);
        
      } catch (err: any) {
        setError(err.message || 'Failed to fetch blockchain data');
        console.error('Blockchain visualizer error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [dataType, walletAddress, timeframe]);
  
  const generateMockData = (type: string, period: string): DataPoint[] => {
    let labels: string[] = [];
    let dataPoints: DataPoint[] = [];
    
    // Generate appropriate date labels based on timeframe
    switch (period) {
      case 'day':
        // Last 24 hours, hourly
        for (let i = 0; i < 24; i++) {
          const hour = new Date();
          hour.setHours(hour.getHours() - (23 - i));
          labels.push(`${hour.getHours()}:00`);
        }
        break;
      case 'week':
        // Last 7 days
        for (let i = 6; i >= 0; i--) {
          const day = new Date();
          day.setDate(day.getDate() - i);
          labels.push(day.toLocaleDateString('en-US', { weekday: 'short' }));
        }
        break;
      case 'month':
        // Last 30 days, grouped by week
        for (let i = 4; i >= 0; i--) {
          const week = new Date();
          week.setDate(week.getDate() - (i * 7));
          labels.push(`Week ${4-i}`);
        }
        break;
    }
    
    // Generate random values based on data type
    labels.forEach(label => {
      let value: number;
      
      switch (type) {
        case 'transactions':
          // Random number of transactions
          value = Math.floor(Math.random() * 50) + 5;
          break;
        case 'tokens':
          // Random token value in USD
          value = Math.floor(Math.random() * 1000) + 100;
          break;
        case 'nfts':
          // Random NFT count or value
          value = Math.floor(Math.random() * 10) + 1;
          break;
        default:
          value = Math.floor(Math.random() * 100);
      }
      
      dataPoints.push({
        label,
        value
      });
    });
    
    return dataPoints;
  };
  
  const getChartTitle = (): string => {
    switch (dataType) {
      case 'transactions':
        return 'Transaction Activity';
      case 'tokens':
        return 'Token Value (USD)';
      case 'nfts':
        return 'NFT Activity';
      default:
        return 'Blockchain Data';
    }
  };
  
  if (loading) {
    return (
      <div className="blockchain-visualizer-loading" style={{ height: `${height}px` }}>
        <div className="loading-spinner"></div>
        <p>Loading data...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="blockchain-visualizer-error" style={{ height: `${height}px` }}>
        <p>Error loading data: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="blockchain-visualizer" style={{ height: `${height}px` }}>
      <h3 className="chart-title">{getChartTitle()}</h3>
      
      <div className="chart-container">
        {data.length > 0 ? (
          <div className="bar-chart">
            {data.map((item, index) => {
              // Calculate the height percentage based on the maximum value
              const heightPercentage = (item.value / maxValue) * 100;
              
              return (
                <div className="bar-column" key={index}>
                  <div 
                    className="bar" 
                    style={{ height: `${heightPercentage}%` }}
                    data-value={item.value}
                  ></div>
                  <div className="bar-label">{item.label}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="no-data">
            <p>No data available for the selected timeframe</p>
          </div>
        )}
      </div>
      
      <div className="chart-controls">
        <div className="timeframe-selector">
          <button className={timeframe === 'day' ? 'active' : ''}>Day</button>
          <button className={timeframe === 'week' ? 'active' : ''}>Week</button>
          <button className={timeframe === 'month' ? 'active' : ''}>Month</button>
        </div>
      </div>
    </div>
  );
};

export default BlockchainVisualizer;
