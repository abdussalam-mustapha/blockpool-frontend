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
        setLoading(true);
        const fetchedTokens = await fetchTokens();
        
        // Sort tokens by priority (common tokens first) and then alphabetically
        const sortedTokens = [...fetchedTokens].sort((a, b) => {
          const aIsCommon = COMMON_TOKENS.includes(a.address);
          const bIsCommon = COMMON_TOKENS.includes(b.address);
          
          if (aIsCommon && !bIsCommon) return -1;
          if (!aIsCommon && bIsCommon) return 1;
          
          return a.symbol.localeCompare(b.symbol);
        });
        
        setTokens(sortedTokens);
        
        // Set popular tokens
        const popular = fetchedTokens.filter(token => 
          COMMON_TOKENS.includes(token.address)
        );
        setPopularTokens(popular);
        
        setLoading(false);
      } catch (err) {
        console.error('Error loading tokens:', err);
        setError('Failed to load tokens');
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
