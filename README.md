# Whisky & Wine Price Checker

This Chrome extension allows users to scrape whisky and wine bottle information from various e-commerce and retail websites. It then cross-references the scraped data with the BAXUS marketplace to find better prices for the same bottles.

## Features

- Scrapes bottle information from selected retail websites.
- Cross-references scraped data with BAXUS marketplace listings.
- Provides direct links to BAXUS alternatives for better pricing.

## Project Structure

```
whisky-wine-price-checker
├── src
│   ├── background.js        # Background script for managing events and communication
│   ├── content.js          # Content script for scraping bottle information
│   ├── popup
│   │   ├── popup.html      # HTML structure for the popup interface
│   │   ├── popup.js        # JavaScript logic for handling user interactions
│   │   └── popup.css       # Styles for the popup interface
│   └── utils
│       └── scraper.js      # Functions for scraping logic
├── manifest.json           # Configuration file for the Chrome extension
├── package.json            # npm configuration file
└── README.md               # Documentation for the project
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/whisky-wine-price-checker.git
   ```

2. Navigate to the project directory:
   ```
   cd whisky-wine-price-checker
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`.
   - Enable "Developer mode".
   - Click "Load unpacked" and select the `whisky-wine-price-checker` directory.

## Usage

1. Navigate to a retail website that sells whisky or wine.
2. Click on the extension icon in the Chrome toolbar.
3. The popup will display the scraped bottle information and compare prices with the BAXUS marketplace.
4. Click on the provided links to view better pricing options on BAXUS.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.