const BAXUS_API_URL = 'https://services.baxus.co/api/search/listings?from=0&size=20&listed=true'; // Replace with actual BAXUS API endpoint

chrome.runtime.onInstalled.addListener(() => {
    console.log('Whisky/Wine Price Checker extension installed.');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'checkPrices') {
        const bottleInfo = request.bottleInfo;
        fetchBaxusPrices(bottleInfo)
            .then(prices => sendResponse({ prices }))
            .catch(error => sendResponse({ error: error.message }));
        return true; // Indicates that the response will be sent asynchronously
    }
});

function fetchBaxusPrices(bottleInfo) {
    return fetch(`${BAXUS_API_URL}?name=${encodeURIComponent(bottleInfo.name)}&vintage=${encodeURIComponent(bottleInfo.vintage)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch prices from BAXUS');
            }
            return response.json();
        })
        .then(data => {
            return data.listings; // Adjust based on actual API response structure
        });
}