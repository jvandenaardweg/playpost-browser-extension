# Playpost Browser Extension
Desktop browser extension for Chrome and Firefox to save articles to your Playpost playlist.

## Installation
Install through the [Google Chrome Store](https://chrome.google.com/webstore) or the [Firefox Add-ons Store](https://addons.mozilla.org/nl/firefox/).

## Installation without stores (for developers)
1. Download the extension from: https://github.com/jvandenaardweg/playpost-browser-extension/tree/master/extensions
2. Unzip the extension. Remember where you unpacked it for the next steps.

### For Chrome:
1. Open your Chrome browser and go to the `Settings` (3 vertical dots) on the top-right.
2. Navigate to: `More Tools` > `Extensions`.
3. Make sure `Developer Mode` is active on the top-right.
4. Click the button `Load Unpacked` and navigate to your unpacked `chrome.zip` directory.
5. Select that directory (not the .zip file) and you are done!

### For Firefox:
1. Open your Firefox settings (3 horizontal lines) on the top-right.
2. Navigate to: Add-ons

## For developers
1. Clone repo
2. Run `npm install`
3. Follow the steps above to install the local extension into your browser. Use your project's `./dist` directory as the `Load Unpacked` directory.
4. Run `npm run watch` to start the project in watch mode.
5. Do your changes.
6. Reload the extension. Your changes should be there!
