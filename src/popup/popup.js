// popup.js
const renderResults = (comparisons) => {
    const container = document.getElementById('resultsContainer');
    container.innerHTML = comparisons.map(result => `
      <div class="result-card ${result.savings > 0 ? 'savings' : 'premium'}">
        <h3>${result.name}</h3>
        <div class="price-comparison">
          <span class="baxus-price">$${result.price}</span>
          <span class="savings">${result.savings > 0 ? 
            `Save $${Math.abs(result.savings)}` : 
            `+$${Math.abs(result.savings)} Premium`}
          </span>
        </div>
        <a href="${result.baxusLink}" target="_blank" class="cta-button">
          View on BAXUS
        </a>
      </div>
    `).join('');
  };
  
  chrome.runtime.sendMessage({action: 'GET_COMPARISONS'}, (response) => {
    document.getElementById('currentPrice').textContent = `$${response.currentPrice}`;
    renderResults(response.comparisons);
  });
  

  const performanceMetrics = {
    track: (metricName, duration) => {
      chrome.storage.local.get(['perfMetrics'], (result) => {
        const metrics = result.perfMetrics || {};
        metrics[metricName] = metrics[metricName] || [];
        metrics[metricName].push(duration);
        chrome.storage.local.set({ perfMetrics: metrics });
      });
    }
  };

  const sanitizeInput = (input) => {
    return input.replace(/[<>"'`]/g, '');
  };
  
  const sanitizePrice = (value) => {
    return parseFloat(value.toString().replace(/[^0-9.]/g, ''));
  };
  
  const trackMatchPrecision = (userFeedback) => {
    chrome.storage.local.get(['matchMetrics'], (result) => {
      const metrics = result.matchMetrics || { hits: 0, misses: 0 };
      userFeedback ? metrics.hits++ : metrics.misses++;
      chrome.storage.local.set({ matchMetrics: metrics });
    });
  };

  const analyzePerformance = async () => {
    const { perfMetrics } = await chrome.storage.local.get(['perfMetrics']);
    return Object.entries(perfMetrics).map(([metric, values]) => ({
      metric,
      average: values.reduce((a,b) => a + b, 0) / values.length,
      p95: percentile(values, 95)
    }));
  };
  