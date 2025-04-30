export const scrapeBottleInfo = async (url) => {
    const response = await fetch(url);
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');

    const bottles = [];
    const bottleElements = doc.querySelectorAll('.bottle-info'); // Adjust selector based on actual website structure

    bottleElements.forEach(element => {
        const name = element.querySelector('.bottle-name')?.innerText || '';
        const price = element.querySelector('.bottle-price')?.innerText || '';
        const imageUrl = element.querySelector('.bottle-image img')?.src || '';

        if (name && price) {
            bottles.push({ name, price, imageUrl });
        }
    });

    return bottles;
};

export const compareWithBAXUS = async (bottles) => {
    const baxusUrl = 'https://api.baxus.com/v1/listings'; // Example API endpoint
    const baxusResponse = await fetch(baxusUrl);
    const baxusData = await baxusResponse.json();

    return bottles.map(bottle => {
        const baxusListing = baxusData.find(listing => listing.name === bottle.name);
        return {
            ...bottle,
            baxusPrice: baxusListing ? baxusListing.price : null,
            baxusLink: baxusListing ? baxusListing.link : null
        };
    });
};