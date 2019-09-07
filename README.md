# Playpost Browser Extension
Desktop browser extension for Chrome and Firefox to save articles to your Playpost playlist.

![Playpost Extension Preview](https://github.com/jvandenaardweg/playpost-browser-extension/blob/master/screenshots/store/1-save.png?raw=true)

## Installation
Install the browser extension with the [Google Chrome Store](https://chrome.google.com/webstore/save-to-playpost/ifnpinjadbboilclldkikcggajgpcdgm) or the [Firefox Add-ons Store](https://addons.mozilla.org/en-US/firefox/addon/playpost/).

## Installation without stores (for developers)
1. Download the latest version from: https://github.com/jvandenaardweg/playpost-browser-extension/tree/master/extensions
2. Unzip the extension. Remember where you unpacked it for the next steps.

### For Chrome:
1. Open your Chrome browser and go to the `Settings` (3 vertical dots) on the top-right.
2. Navigate to: `More Tools` > `Extensions`.
3. Make sure `Developer Mode` is active on the top-right.
4. Click the button `Load Unpacked` and navigate to your unpacked `chrome.zip` directory.
5. Select that directory (not the .zip file) and you are done!

### For Firefox:
1. Open your Firefox browser and type `about:debugging`.
2. Then click the blue `This Firefox` link.
3. Click `Load temporary add-on` (or some text similar in your own language).
4. Browse to the location of the .zip file you downloaded earlier and select that zip file (so not the unzipped files)
5. Done!

## For developers
1. Clone repo
2. Run `npm install`
3. Follow the steps above to install the local extension into your browser. Use your project's `./dist` directory as the `Load Unpacked` directory.
4. Run `npm run watch` to start the project in watch mode.
5. Do your changes.
6. Reload the extension. Your changes should be there!
7. When done, commit and push your changes. You can verify the build by using `npm run build` and check the `./extensions` zip file.
8. Run `npm run release` from `master`
9. Done.
