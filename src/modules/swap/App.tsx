import React, { useState, useEffect } from 'react';
import { Button, Select, Input, Card, Spin, Typography, Tooltip } from 'antd';
import { SwapOutlined, InfoCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import './App.scss';
import { useTokens } from './data/tokenStore';
import { Token } from './utils/jupiterApi';
import { calculateSwapOutput, executeSwap } from './utils/swapService';

const { Option } = Select;
const { Text } = Typography;

const App: React.FC = () => {
  // Get tokens from Jupiter API
  const { tokens, popularTokens, loading: tokensLoading, getTokenByAddress } = useTokens();

  // State for swap form
  const [fromTokenAddress, setFromTokenAddress] = useState<string>('');
  const [toTokenAddress, setToTokenAddress] = useState<string>('');
  const [fromAmount, setFromAmount] = useState<string>('0');
  const [toAmount, setToAmount] = useState<string>('0');
  const [calculating, setCalculating] = useState<boolean>(false);
  const [swapping, setSwapping] = useState<boolean>(false);
  const [priceImpact, setPriceImpact] = useState<number>(0);
  const [quoteData, setQuoteData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Get token objects
  const fromToken = fromTokenAddress ? getTokenByAddress(fromTokenAddress) : null;
  const toToken = toTokenAddress ? getTokenByAddress(toTokenAddress) : null;

  // Calculate output amount when input changes
  useEffect(() => {
    const calculateOutput = async () => {
      if (fromToken && toToken && fromAmount && parseFloat(fromAmount) > 0) {
        try {
          setCalculating(true);
          setError(null);
          
          const result = await calculateSwapOutput(
            parseFloat(fromAmount),
            fromToken.decimals,
            fromToken.address,
            toToken.address,
            toToken.decimals
          );
          
          setToAmount(result.outputAmount.toFixed(6));
          setPriceImpact(result.priceImpactPct);
          setQuoteData(result.quoteResponse);
        } catch (err) {
          console.error('Error calculating swap:', err);
          setError('Failed to calculate swap. Please try again.');
          setToAmount('0');
          setPriceImpact(0);
          setQuoteData(null);
        } finally {
          setCalculating(false);
        }
      } else {
        setToAmount('0');
        setPriceImpact(0);
        setQuoteData(null);
      }
    };

    calculateOutput();
  }, [fromToken, toToken, fromAmount]);

  // Handle swap execution
  const handleSwap = async () => {
    if (!fromToken || !toToken || !quoteData) return;
    
    try {
      setSwapping(true);
      setError(null);
      
      await executeSwap(
        quoteData,
        fromToken.symbol,
        toToken.symbol
      );
      
      // Reset form after successful swap
      setFromAmount('0');
      setToAmount('0');
      setPriceImpact(0);
      setQuoteData(null);
      
    } catch (err) {
      console.error('Error executing swap:', err);
      setError('Failed to execute swap. Please try again.');
    } finally {
      setSwapping(false);
    }
  };

  // Price impact color based on severity
  const getPriceImpactColor = () => {
    if (priceImpact < 1) return 'green';
    if (priceImpact < 3) return 'orange';
    return 'red';
  };

  // Render token option
  const renderTokenOption = (token: Token) => {
    console.log('Rendering token option:', token.symbol);
    return (
      <Option key={token.address} value={token.address}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {token.logoURI && (
            <img 
              src={token.logoURI} 
              alt={token.symbol} 
              style={{ width: 20, height: 20, marginRight: 8 }} 
              onError={(e) => {
                // Hide the image if it fails to load
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
          <span>{token.symbol}</span>
        </div>
      </Option>
    );
  };

  return (
    <div className="swap-container">
      <Card className="swap-card" title="Swap Tokens">
        {tokensLoading ? (
          <div className="loading-container">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            <Text>Loading tokens...</Text>
          </div>
        ) : (
          <>
            <div className="token-input">
              <div className="token-row">
                <span>From</span>
                <Select 
                  style={{ width: 150 }} 
                  value={fromTokenAddress} 
                  onChange={(newValue) => {
                    console.log('From token selected (address):', newValue);
                    setFromTokenAddress(newValue);
                  }}
                  placeholder="Select token"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) => {
                    // Simple string matching for search
                    const optionValue = option?.value?.toString() || '';
                    const token = tokens.find(t => t.address === optionValue);
                    return token ? 
                      token.symbol.toLowerCase().indexOf(input.toLowerCase()) >= 0 :
                      false;
                  }}
                  onDropdownVisibleChange={(open) => {
                    if (open) {
                      console.log('Dropdown opened, tokens available:', tokens.length);
                    }
                  }}
                >
                  {tokens.map(token => (
                    <Option key={token.address} value={token.address}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {token.logoURI && (
                          <img 
                            src={token.logoURI} 
                            alt={token.symbol} 
                            style={{ width: 20, height: 20, marginRight: 8 }} 
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        )}
                        <span>{token.symbol}</span>
                      </div>
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="token-row">
                <Input 
                  placeholder="0.0" 
                  value={fromAmount}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || /^\d*\.?\d*$/.test(value)) {
                      setFromAmount(value);
                    }
                  }}
                  style={{ width: '100%' }}
                  disabled={swapping}
                />
              </div>
            </div>

            <div className="swap-icon-container">
              <SwapOutlined onClick={() => {
                if (!swapping) {
                  const tempFromToken = fromTokenAddress;
                  setFromTokenAddress(toTokenAddress);
                  setToTokenAddress(tempFromToken);
                }
              }} />
            </div>

            <div className="token-input">
              <div className="token-row">
                <span>To</span>
                <Select 
                  style={{ width: 150 }} 
                  value={toTokenAddress} 
                  onChange={(newValue) => {
                    console.log('To token selected (address):', newValue);
                    setToTokenAddress(newValue);
                  }}
                  placeholder="Select token"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) => {
                    // Simple string matching for search
                    const optionValue = option?.value?.toString() || '';
                    const token = tokens.find(t => t.address === optionValue);
                    return token ? 
                      token.symbol.toLowerCase().indexOf(input.toLowerCase()) >= 0 :
                      false;
                  }}
                  onDropdownVisibleChange={(open) => {
                    if (open) {
                      console.log('To token dropdown opened, tokens available:', tokens.length);
                    }
                  }}
                >
                  {tokens.map(token => (
                    <Option key={token.address} value={token.address}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {token.logoURI && (
                          <img 
                            src={token.logoURI} 
                            alt={token.symbol} 
                            style={{ width: 20, height: 20, marginRight: 8 }} 
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        )}
                        <span>{token.symbol}</span>
                      </div>
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="token-row">
                <Input 
                  placeholder="0.0" 
                  value={calculating ? 'Calculating...' : toAmount}
                  disabled
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            {priceImpact > 0 && (
              <div className="price-impact">
                <Text>
                  Price Impact: <span style={{ color: getPriceImpactColor() }}>{priceImpact.toFixed(2)}%</span>
                  <Tooltip title="The difference between the market price and estimated price due to trade size.">
                    <InfoCircleOutlined style={{ marginLeft: 5 }} />
                  </Tooltip>
                </Text>
              </div>
            )}

            {error && (
              <div className="error-message">
                <Text type="danger">{error}</Text>
              </div>
            )}

            <Button 
              className="swap-button"
              type="primary" 
              onClick={handleSwap}
              loading={swapping}
              disabled={
                !fromTokenAddress || 
                !toTokenAddress || 
                !fromAmount || 
                fromAmount === '0' || 
                calculating || 
                swapping ||
                priceImpact > 15 // Disable if price impact is too high
              }
            >
              {swapping ? 'Swapping...' : 'Swap'}
            </Button>

            {priceImpact > 15 && (
              <div className="warning-message">
                <Text type="danger">Price impact too high. Swap disabled.</Text>
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default App;