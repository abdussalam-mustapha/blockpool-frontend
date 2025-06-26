import React, { useState, useEffect } from 'react';
import { fetchNftsByOwner, fetchNftMetadata } from '../../utils/helius';
import './NftGallery.css';

interface NftGalleryProps {
  walletAddress: string;
  onNftSelect?: (nft: any) => void;
}

interface Nft {
  id: string;
  name: string;
  image: string;
  description?: string;
  collection?: {
    name: string;
    family?: string;
  };
  attributes?: Array<{
    trait_type: string;
    value: string;
  }>;
  mintAddress: string;
  symbol?: string;
}

const NftGallery: React.FC<NftGalleryProps> = ({ walletAddress, onNftSelect }) => {
  const [nfts, setNfts] = useState<Nft[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNft, setSelectedNft] = useState<Nft | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'collection'>('name');
  const [filterCollection, setFilterCollection] = useState<string>('');
  
  useEffect(() => {
    const loadNfts = async () => {
      if (!walletAddress) {
        setNfts([]);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        
        // Fetch NFTs from Helius API
        const nftData = await fetchNftsByOwner(walletAddress);
        
        // Process and format NFT data
        const processedNfts = nftData.map((nft: any) => ({
          id: nft.id || nft.mint,
          name: nft.content?.metadata?.name || 'Unnamed NFT',
          image: nft.content?.files?.[0]?.uri || nft.content?.links?.image || '/placeholder-nft.png',
          description: nft.content?.metadata?.description,
          collection: {
            name: nft.content?.metadata?.collection?.name || 'Unknown Collection',
            family: nft.content?.metadata?.collection?.family
          },
          attributes: nft.content?.metadata?.attributes,
          mintAddress: nft.id || nft.mint,
          symbol: nft.content?.metadata?.symbol
        }));
        
        setNfts(processedNfts);
      } catch (err: any) {
        console.error('Error fetching NFTs:', err);
        setError('Failed to load NFTs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    loadNfts();
  }, [walletAddress]);
  
  const handleNftClick = async (nft: Nft) => {
    try {
      // When an NFT is clicked, fetch its detailed metadata
      const detailedMetadata = await fetchNftMetadata(nft.mintAddress);
      
      // Merge the detailed metadata with the existing NFT data
      const enrichedNft = {
        ...nft,
        ...detailedMetadata
      };
      
      setSelectedNft(enrichedNft);
      
      if (onNftSelect) {
        onNftSelect(enrichedNft);
      }
    } catch (err) {
      console.error('Error fetching NFT details:', err);
    }
  };
  
  const handleCloseDetails = () => {
    setSelectedNft(null);
  };
  
  const getUniqueCollections = () => {
    const collections = nfts.map(nft => nft.collection?.name || 'Unknown');
    return Array.from(new Set(collections));
  };
  
  const filteredAndSortedNfts = nfts
    .filter(nft => filterCollection ? (nft.collection?.name === filterCollection) : true)
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        return (a.collection?.name || '').localeCompare(b.collection?.name || '');
      }
    });
  
  if (loading) {
    return (
      <div className="nft-gallery-loading">
        <div className="loading-spinner"></div>
        <p>Loading your NFT collection...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="nft-gallery-error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }
  
  if (nfts.length === 0) {
    return (
      <div className="nft-gallery-empty">
        <p>No NFTs found in this wallet.</p>
      </div>
    );
  }

  return (
    <div className="nft-gallery">
      <div className="gallery-header">
        <h2>NFT Collection</h2>
        
        <div className="gallery-controls">
          <div className="filter-control">
            <label htmlFor="collection-filter">Collection:</label>
            <select 
              id="collection-filter" 
              value={filterCollection}
              onChange={(e) => setFilterCollection(e.target.value)}
            >
              <option value="">All Collections</option>
              {getUniqueCollections().map((collection, index) => (
                <option key={index} value={collection}>{collection}</option>
              ))}
            </select>
          </div>
          
          <div className="sort-control">
            <label htmlFor="sort-by">Sort by:</label>
            <select 
              id="sort-by" 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'collection')}
            >
              <option value="name">Name</option>
              <option value="collection">Collection</option>
            </select>
          </div>
          
          <div className="view-toggle">
            <button 
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
              aria-label="Grid View"
            >
              ⊞
            </button>
            <button 
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
              aria-label="List View"
            >
              ≡
            </button>
          </div>
        </div>
      </div>
      
      <div className={`nft-container ${viewMode}`}>
        {filteredAndSortedNfts.map((nft) => (
          <div 
            key={nft.id} 
            className="nft-item"
            onClick={() => handleNftClick(nft)}
          >
            <div className="nft-image-container">
              <img 
                src={nft.image} 
                alt={nft.name} 
                className="nft-image"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-nft.png';
                }}
              />
            </div>
            <div className="nft-info">
              <h3 className="nft-name">{nft.name}</h3>
              {viewMode === 'list' && (
                <>
                  <p className="nft-collection">{nft.collection?.name}</p>
                  {nft.description && (
                    <p className="nft-description">{nft.description.substring(0, 100)}...</p>
                  )}
                </>
              )}
              {viewMode === 'grid' && (
                <p className="nft-collection">{nft.collection?.name}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {selectedNft && (
        <div className="nft-detail-modal">
          <div className="modal-content">
            <button className="close-modal" onClick={handleCloseDetails}>×</button>
            
            <div className="nft-detail-container">
              <div className="nft-detail-image">
                <img 
                  src={selectedNft.image} 
                  alt={selectedNft.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder-nft.png';
                  }}
                />
              </div>
              
              <div className="nft-detail-info">
                <h2>{selectedNft.name}</h2>
                
                {selectedNft.collection?.name && (
                  <div className="detail-section">
                    <h3>Collection</h3>
                    <p>{selectedNft.collection.name}</p>
                  </div>
                )}
                
                {selectedNft.description && (
                  <div className="detail-section">
                    <h3>Description</h3>
                    <p>{selectedNft.description}</p>
                  </div>
                )}
                
                <div className="detail-section">
                  <h3>Mint Address</h3>
                  <p className="mint-address">{selectedNft.mintAddress}</p>
                </div>
                
                {selectedNft.attributes && selectedNft.attributes.length > 0 && (
                  <div className="detail-section">
                    <h3>Attributes</h3>
                    <div className="attributes-grid">
                      {selectedNft.attributes.map((attr, index) => (
                        <div key={index} className="attribute-item">
                          <span className="attribute-type">{attr.trait_type}</span>
                          <span className="attribute-value">{attr.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="nft-actions">
                  <a 
                    href={`https://solscan.io/token/${selectedNft.mintAddress}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="action-button"
                  >
                    View on Solscan
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NftGallery;
