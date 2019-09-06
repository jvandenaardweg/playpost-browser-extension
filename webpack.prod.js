const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const WebpackZipPlugin = require('webpack-zip-plugin')
const WebpackShellPlugin = require('webpack-shell-plugin')

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new WebpackShellPlugin({
      onBuildExit: [
        'find ./extensions -name "*.zip" -delete',
        'zip -r -j ./extensions/chrome.zip ./dist/*',
        'zip -r -j ./extensions/firefox.zip ./dist/*',
      ],
      safe: true
    })
  ]
});
