// This file contains the content script that runs in the context of web pages.
// It scrapes whisky/wine bottle information from e-commerce and retail websites.

const bottleInfo = [];

function scrapeBottleInfo() {
    // Example scraping logic to extract bottle information
    const bottles = document.querySelectorAll('.bottle-item'); // Adjust the selector based on the website structure
    bottles.forEach(bottle => {
        const name = bottle.querySelector('.bottle-name')?.innerText;
        const price = bottle.querySelector('.bottle-price')?.innerText;
        const link = bottle.querySelector('a')?.href;

        if (name && price && link) {
            bottleInfo.push({ name, price, link });
        }
    });

    // Send the scraped data to the background script for further processing
    chrome.runtime.sendMessage({ type: 'SCRAPED_BOTTLE_INFO', data: bottleInfo });
}

// Run the scraping function when the content script is loaded
scrapeBottleInfo();