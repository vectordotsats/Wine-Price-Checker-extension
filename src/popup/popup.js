document.addEventListener('DOMContentLoaded', function() {
    const checkPricesButton = document.getElementById('checkPriceBtn');
    const resultsContainer = document.getElementById('results');

    checkPricesButton.addEventListener('click', async function() {
        resultsContainer.innerHTML = 'Fetching data...';
        
        // Send a message to the content script to scrape bottle information
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'scrape' }, function(response) {
                if (response && response.bottles) {
                    comparePrices(response.bottles);
                } else {
                    resultsContainer.innerHTML = 'No bottles found.';
                }
            });
        });
    });

    async function comparePrices(bottles) {
        const baxusPrices = await fetchBaxusPrices(bottles);
        displayResults(bottles, baxusPrices);
    }

    async function fetchBaxusPrices(bottles) {
        const promises = bottles.map(async (bottle) => {
            const response = await fetch(`https://api.baxus.com/prices?name=${encodeURIComponent(bottle.name)}`);
            return response.json();
        });
        return Promise.all(promises);
    }

    function displayResults(bottles, baxusPrices) {
        resultsContainer.innerHTML = '';
        bottles.forEach((bottle, index) => {
            const baxusPrice = baxusPrices[index];
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.innerHTML = `
                <h3>${bottle.name}</h3>
                <p>Retail Price: ${bottle.price}</p>
                <p>BAXUS Price: ${baxusPrice ? baxusPrice.price : 'Not found'}</p>
                <a href="${baxusPrice ? baxusPrice.link : '#'}" target="_blank">View on BAXUS</a>
            `;
            resultsContainer.appendChild(resultItem);
        });
    }
});