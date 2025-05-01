// background.js
const BAXUS_API_ENDPOINT = 'https://services.baxus.co/api/search/listings';

const fetchBaxusListings = async (queryParams = {}) => {
  const defaultParams = {
    from: 0,
    size: 20,
    listed: true
  };

  const params = new URLSearchParams({...defaultParams, ...queryParams});
  const response = await fetch(`${BAXUS_API_ENDPOINT}?${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) throw new Error(`BAXUS API Error: ${response.status}`);
  return response.json();
};

const handleApiRequest = async (productData) => {
  try {
    const matches = await matchProducts(productData);
    const priceComparison = matches.map(listing => ({
      ...listing,
      savings: productData.price - listing.price,
      baxusLink: `https://baxus.co/listings/${listing.id}`
    }));
    
    return priceComparison.sort((a,b) => b.savings - a.savings);
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
};



// background.js
const initializeFuse = (baxusData) => {
    const options = {
      includeScore: true,
      threshold: 0.4,
      keys: [
        {name: 'name', weight: 0.6},
        {name: 'description', weight: 0.3},
        {name: 'region', weight: 0.1}
      ]
    };
    
    return new Fuse(baxusData, options);
  };
  
  const matchProducts = async (productData) => {
    const baxusListings = await fetchBaxusListings();
    const fuse = initializeFuse(baxusListings);
    
    return fuse.search(productData.name, {
      limit: 3
    }).map(result => ({
      ...result.item,
      matchScore: result.score
    }));
  };
  

  // background.js
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

const cacheManager = {
  get: async (key) => {
    const { [key]: data } = await chrome.storage.local.get(key);
    return data?.timestamp > Date.now() - CACHE_TTL ? data.value : null;
  },
  set: (key, value) => {
    chrome.storage.local.set({ [key]: { 
      value, 
      timestamp: Date.now() 
    }});
  }
};

const getCachedListings = async () => {
  const cached = await cacheManager.get('baxusListings');
  return cached || fetchBaxusListings();
};
