import axios from 'axios';

// Jupiter API base URL
const JUP_API_BASE = 'https://quote-api.jup.ag/v6';

// Token interface
export interface Token {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logoURI?: string;
  tags?: string[];
}

// Quote request interface
export interface QuoteRequest {
  inputMint: string;  // Input token address
  outputMint: string; // Output token address
  amount: string;     // Amount in input token's smallest unit (lamports)
  slippageBps?: number; // Slippage tolerance in basis points (default: 50 = 0.5%)
}

// Quote response interface
export interface QuoteResponse {
  inputMint: string;
  inAmount: string;
  outputMint: string;
  outAmount: string;
  otherAmountThreshold: string;
  swapMode: string;
  slippageBps: number;
  platformFee: {
    amount: string;
    feeBps: number;
  };
  priceImpactPct: string;
  routePlan: any[];
  contextSlot: number;
  timeTaken: number;
}

/**
 * Fetch all tokens supported by Jupiter
 * @returns Promise with array of tokens
 */
export const fetchTokens = async (): Promise<Token[]> => {
  try {
    const response = await axios.get(`${JUP_API_BASE}/tokens`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Jupiter tokens:', error);
    throw error;
  }
};

/**
 * Get a quote for swapping tokens
 * @param quoteRequest Quote request parameters
 * @returns Promise with quote response
 */
export const getQuote = async (quoteRequest: QuoteRequest): Promise<QuoteResponse> => {
  try {
    const { inputMint, outputMint, amount, slippageBps = 50 } = quoteRequest;
    
    const response = await axios.get(`${JUP_API_BASE}/quote`, {
      params: {
        inputMint,
        outputMint,
        amount,
        slippageBps
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error getting Jupiter quote:', error);
    throw error;
  }
};

/**
 * Convert token amount from decimal to integer format based on decimals
 * @param amount Amount in decimal format
 * @param decimals Token decimals
 * @returns Amount in integer format
 */
export const toTokenAmount = (amount: number, decimals: number): string => {
  return (amount * Math.pow(10, decimals)).toFixed(0);
};

/**
 * Convert token amount from integer to decimal format based on decimals
 * @param amount Amount in integer format
 * @param decimals Token decimals
 * @returns Amount in decimal format
 */
export const fromTokenAmount = (amount: string, decimals: number): number => {
  return parseFloat(amount) / Math.pow(10, decimals);
};
