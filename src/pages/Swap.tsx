import React, { useState, useEffect } from 'react';
import { Button, Select, Input, Card } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import './Swap.scss';

const { Option } = Select;

interface Token {
  symbol: string;
  name: string;
  price: number;
}

const tokens: Token[] = [
  { symbol: 'ETH', name: 'Ethereum', price: 2850.75 },
  { symbol: 'BTC', name: 'Bitcoin', price: 43250.80 },
  { symbol: 'SOL', name: 'Solana', price: 102.45 },
  { symbol: 'USDT', name: 'Tether', price: 1.00 }
];

const SwapPage: React.FC = () => {
  const [fromToken, setFromToken] = useState<string>('');
  const [toToken, setToToken] = useState<string>('');
  const [fromAmount, setFromAmount] = useState<string>('0');
  const [toAmount, setToAmount] = useState<string>('0');

  const calculateToAmount = (amount: string, from: string, to: string) => {
    const fromTokenData = tokens.find(t => t.symbol === from);
    const toTokenData = tokens.find(t => t.symbol === to);
    
    if (fromTokenData && toTokenData && amount) {
      const fromValue = parseFloat(amount) * fromTokenData.price;
      const toValue = fromValue / toTokenData.price;
      setToAmount(toValue.toFixed(6));
    }
  };

  useEffect(() => {
    if (fromToken && toToken && fromAmount) {
      calculateToAmount(fromAmount, fromToken, toToken);
    }
  }, [fromToken, toToken, fromAmount]);

  const handleSwap = () => {
    // Implement swap logic here
    console.log(`Swapping ${fromAmount} ${fromToken} to ${toAmount} ${toToken}`);
  };

  const getUSDValue = (amount: string, token: string): string => {
    const tokenData = tokens.find(t => t.symbol === token);
    if (tokenData && amount) {
      const usdValue = parseFloat(amount) * tokenData.price;
      return `$${usdValue.toFixed(2)}`;
    }
    return '$0.00';
  };

  return (
    <div className="swap-container">
      <Card className="swap-card">
        <div className="token-input">
          <div className="token-row">
            <span>From</span>
            <Select 
              style={{ width: 120 }} 
              value={fromToken} 
              onChange={setFromToken}
              placeholder="Select token"
            >
              {tokens.map(token => (
                <Option key={token.symbol} value={token.symbol}>
                  {token.symbol}
                </Option>
              ))}
            </Select>
          </div>
          <div className="token-row">
            <Input 
              placeholder="0.0" 
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              style={{ width: '60%' }}
            />
            <div className="usd-value">{getUSDValue(fromAmount, fromToken)}</div>
          </div>
        </div>

        <div className="swap-icon-container">
          <SwapOutlined />
        </div>

        <div className="token-input">
          <div className="token-row">
            <span>To</span>
            <Select 
              style={{ width: 120 }} 
              value={toToken} 
              onChange={setToToken}
              placeholder="Select token"
            >
              {tokens.map(token => (
                <Option key={token.symbol} value={token.symbol}>
                  {token.symbol}
                </Option>
              ))}
            </Select>
          </div>
          <div className="token-row">
            <Input 
              placeholder="0.0" 
              value={toAmount}
              disabled
              style={{ width: '60%' }}
            />
            <div className="usd-value">{getUSDValue(toAmount, toToken)}</div>
          </div>
        </div>

        <Button 
          className="swap-button"
          type="primary" 
          onClick={handleSwap}
          disabled={!fromToken || !toToken || !fromAmount || fromAmount === '0'}
        >
          Swap
        </Button>
      </Card>
    </div>
  );
};

export default SwapPage;
