/**
 * Helius API Integration Utilities
 * This file contains helper functions for interacting with Helius APIs
 */

// Replace with your actual API key or load from environment variables
const API_KEY = import.meta.env.VITE_HELIUS_API_KEY || "YOUR_API_KEY";
const BASE_URL = `https://rpc.helius.xyz/?api-key=${API_KEY}`;
const API_BASE_URL = `https://api.helius.xyz/v0`;

// Define interfaces for NFT data
export interface NftData {
  id?: string;
  mint?: string;
  content?: {
    metadata?: {
      name?: string;
      description?: string;
      symbol?: string;
      attributes?: Array<{
        trait_type: string;
        value: string;
      }>;
      collection?: {
        name?: string;
        family?: string;
      };
    };
    files?: Array<{
      uri?: string;
      type?: string;
    }>;
    links?: {
      image?: string;
    };
  };
}

/**
 * Makes an RPC call to Helius
 * @param method - The RPC method to call
 * @param params - The parameters for the RPC call
 */
export async function heliusRpcCall(method: string, params: any[] = []) {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'helius-rpc',
        method,
        params,
      }),
    });
    
    const data = await response.json();
    
    if (data.error) {
      console.error('Helius RPC Error:', data.error);
      throw new Error(data.error.message);
    }
    
    return data.result;
  } catch (error) {
    console.error('Helius RPC Call Failed:', error);
    throw error;
  }
}

/**
 * Gets all transactions for a wallet address
 * @param walletAddress - The wallet address to get transactions for
 */
export async function getWalletTransactions(walletAddress: string) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/addresses/${walletAddress}/transactions?api-key=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch wallet transactions:', error);
    throw error;
  }
}

/**
 * Gets token balances for a wallet address
 * @param walletAddress - The wallet address to get balances for
 */
export async function getWalletBalances(walletAddress: string) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/addresses/${walletAddress}/balances?api-key=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch wallet balances:', error);
    throw error;
  }
}

/**
 * Gets NFT metadata for a list of mint addresses
 * @param mintAddresses - Array of NFT mint addresses
 */
export async function getNftMetadata(mintAddresses: string[]) {
  try {
    const response = await fetch(`${API_BASE_URL}/token-metadata?api-key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mintAccounts: mintAddresses,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch NFT metadata:', error);
    throw error;
  }
}

/**
 * Creates a webhook for an address or program
 * @param webhookUrl - The URL to send webhook events to
 * @param transactionTypes - Array of transaction types to listen for
 * @param accountAddresses - Array of account addresses to monitor
 */
export async function createWebhook(
  webhookUrl: string,
  transactionTypes: string[],
  accountAddresses: string[]
) {
  try {
    const response = await fetch(`${API_BASE_URL}/webhooks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        webhookURL: webhookUrl,
        transactionTypes,
        accountAddresses,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to create webhook:', error);
    throw error;
  }
}

/**
 * Gets all token holdings for a wallet
 * @param walletAddress - The wallet address to get token holdings for
 */
export async function getTokenHoldings(walletAddress: string) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/token-holdings?api-key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ownerAddress: walletAddress,
        }),
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch token holdings:', error);
    throw error;
  }
}

/**
 * Helper function to format transaction data for visualization
 * @param transactions - Raw transaction data from Helius
 */
export function formatTransactionsForChart(transactions: any[]) {
  // Group transactions by day
  const txByDay = transactions.reduce((acc: {[key: string]: number}, tx: any) => {
    const date = new Date(tx.timestamp * 1000).toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});
  
  // Convert to array format for charting libraries
  return Object.entries(txByDay).map(([date, count]) => ({
    date,
    count,
  }));
}

/**
 * Caches API responses to reduce load
 * @param key - Cache key
 * @param fetchFn - Function to fetch data if not in cache
 * @param ttl - Time to live in milliseconds (default: 5 minutes)
 */
export async function cachedApiCall(
  key: string,
  fetchFn: () => Promise<any>,
  ttl: number = 5 * 60 * 1000
) {
  const cacheKey = `helius_cache_${key}`;
  const cached = localStorage.getItem(cacheKey);
  
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < ttl) {
      return data;
    }
  }
  
  const data = await fetchFn();
  localStorage.setItem(
    cacheKey,
    JSON.stringify({
      data,
      timestamp: Date.now(),
    })
  );
  
  return data;
}

/**
 * Fetches all NFTs owned by a wallet address using Helius API
 * @param walletAddress - The wallet address to fetch NFTs for
 */
export async function fetchNftsByOwner(walletAddress: string): Promise<NftData[]> {
  try {
    // Use the DAS API to get NFTs by owner
    const result = await heliusRpcCall('getAssetsByOwner', [
      walletAddress,
      { page: 1, limit: 100 }
    ]);
    
    // If no assets found, return empty array
    if (!result || !result.items || !Array.isArray(result.items)) {
      return [];
    }
    
    return result.items;
  } catch (error) {
    console.error('Failed to fetch NFTs by owner:', error);
    throw error;
  }
}

/**
 * Fetches detailed metadata for a single NFT mint address
 * @param mintAddress - The mint address of the NFT
 */
export async function fetchNftMetadata(mintAddress: string): Promise<any> {
  try {
    // Use the existing getNftMetadata function but for a single mint address
    const result = await getNftMetadata([mintAddress]);
    
    // Return the first item or an empty object if nothing found
    return result && result.length > 0 ? result[0] : {};
  } catch (error) {
    console.error('Failed to fetch NFT metadata:', error);
    throw error;
  }
}
