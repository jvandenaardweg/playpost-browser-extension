# Playpost Browser Extension
Desktop browser extension for Chrome and Firefox to save articles to your Playpost playlist.

## Installation
Install through the (Google Chrome Store)[https://chrome.google.com/webstore] or the (Firefox Add-ons Store)[https://addons.mozilla.org/nl/firefox/]

## Installation without stores (for developers)
1. Download the extension: (Chrome)[https://github.com/jvandenaardweg/playpost-chrome-extension/blob/master/extensions/chrome.zip] or (Firefox)[https://github.com/jvandenaardweg/playpost-chrome-extension/blob/master/extensions/chrome.zip]
2. Unpack the extension.

### For Chrome:
1. Open your chrome settings (3 vertical dots) on the top-right.
2. Navigate to: More Tools > Extensions
3. Make sure `Developer Mode` is active on the top-right.
4. Click the button `Load Unpacked` and navigate to your unpacked `chrome.zip` directory.
5. Select that directory (not the .zip file) and you are done!

### For Firefox:
1. Open your Firefox settings (3 horizontal lines) on the top-right.
2. Navigate to: Add-ons




## Building

1.  Clone repo
2.  `npm i`
3.  `npm run dev` to compile once or `npm run watch` to run the dev task in watch mode
4.  `npm run build` to build a production (minified) version

## Installation

1.  Complete the steps to build the project above
2.  Go to [_chrome://extensions_](chrome://extensions) in Google Chrome
3.  With the developer mode checkbox ticked, click **Load unpacked extension...** and select the _dist_ folder from this repo
