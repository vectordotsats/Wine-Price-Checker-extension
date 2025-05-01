// content-script.js
const extractProductData = () => {
    const selectors = {
      name: [
        '.product-title',
        '[itemprop="name"]',
        'h1.product-name'
      ],
      price: [
        '.price',
        '[itemprop="price"]',
        '.product-price'
      ],
      description: [
        '.product-description',
        '[itemprop="description"]'
      ]
    };
  
    const findFirstMatch = (patterns) => {
      for (const selector of patterns) {
        const element = document.querySelector(selector);
        if (element) return element.textContent.trim();
      }
      return null;
    };
  
    return {
      name: findFirstMatch(selectors.name),
      price: parseFloat(findFirstMatch(selectors.price)?.replace(/[^0-9.]/g, '')),
      description: findFirstMatch(selectors.description),
      timestamp: new Date().toISOString()
    };
  };
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'EXTRACT_PRODUCT_DATA') {
      sendResponse(extractProductData());
    }
  });
  