import { useEffect, useState } from 'react';
import { fetchTokens, Token } from '../utils/jupiterApi';

// Common tokens to prioritize in the UI
const COMMON_TOKENS = [
  'So11111111111111111111111111111111111111112', // SOL
  'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC
  'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', // USDT
  '7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj', // stSOL
  'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So', // mSOL
];

// Token symbol mapping for common tokens
const TOKEN_SYMBOLS: Record<string, string> = {
  'So11111111111111111111111111111111111111112': 'SOL',
  'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v': 'USDC',
  'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB': 'USDT',
  '7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj': 'stSOL',
  'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So': 'mSOL',
};

/**
 * Custom hook to fetch and manage tokens
 */
export const useTokens = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [popularTokens, setPopularTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTokens = async () => {
      try {
        console.log('Starting to fetch tokens...');
        setLoading(true);
        const fetchedTokens = await fetchTokens();
        console.log('Tokens fetched:', fetchedTokens ? fetchedTokens.length : 0, 'tokens');
        
        if (!fetchedTokens || fetchedTokens.length === 0) {
          console.error('No tokens fetched from Jupiter API');
          // Add fallback tokens if API fails
          const fallbackTokens: Token[] = [
            { symbol: 'SOL', name: 'Solana', address: 'So11111111111111111111111111111111111111112', decimals: 9 },
            { symbol: 'USDC', name: 'USD Coin', address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', decimals: 6 },
            { symbol: 'USDT', name: 'Tether', address: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', decimals: 6 },
          ];
          console.log('Using fallback tokens');
          setTokens(fallbackTokens);
          setPopularTokens(fallbackTokens);
          setLoading(false);
          return;
        }
        
        // Sort tokens by priority (common tokens first) and then alphabetically
        const sortedTokens = [...fetchedTokens].sort((a, b) => {
          const aIsCommon = COMMON_TOKENS.includes(a.address);
          const bIsCommon = COMMON_TOKENS.includes(b.address);
          
          if (aIsCommon && !bIsCommon) return -1;
          if (!aIsCommon && bIsCommon) return 1;
          
          return a.symbol.localeCompare(b.symbol);
        });
        
        console.log('Sorted tokens ready:', sortedTokens.length);
        setTokens(sortedTokens);
        
        // Set popular tokens
        const popular = fetchedTokens.filter(token => 
          COMMON_TOKENS.includes(token.address)
        );
        console.log('Popular tokens found:', popular.length);
        setPopularTokens(popular);
        
        setLoading(false);
      } catch (err) {
        console.error('Error loading tokens:', err);
        setError('Failed to load tokens');
        
        // Add fallback tokens if API fails
        const fallbackTokens: Token[] = [
          { symbol: 'SOL', name: 'Solana', address: 'So11111111111111111111111111111111111111112', decimals: 9 },
          { symbol: 'USDC', name: 'USD Coin', address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', decimals: 6 },
          { symbol: 'USDT', name: 'Tether', address: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', decimals: 6 },
        ];
        console.log('Using fallback tokens due to error');
        setTokens(fallbackTokens);
        setPopularTokens(fallbackTokens);
        
        setLoading(false);
      }
    };

    loadTokens();
  }, []);

  /**
   * Get token by address
   */
  const getTokenByAddress = (address: string): Token | undefined => {
    return tokens.find(token => token.address === address);
  };

  /**
   * Get token symbol by address
   */
  const getTokenSymbol = (address: string): string => {
    // Check predefined symbols first
    if (TOKEN_SYMBOLS[address]) {
      return TOKEN_SYMBOLS[address];
    }
    
    // Otherwise look up in tokens list
    const token = getTokenByAddress(address);
    return token?.symbol || 'Unknown';
  };

  return {
    tokens,
    popularTokens,
    loading,
    error,
    getTokenByAddress,
    getTokenSymbol
  };
};
