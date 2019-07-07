const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    popup: path.join(__dirname, "src/popup.tsx"),
    background: path.join(__dirname, "src/background.ts"),
    content: path.join(__dirname, "src/content.ts")
  },
  output: {
    path: path.join(__dirname, "dist/"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: "ts-loader"
      },
      {
        exclude: /node_modules/,
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // Creates style nodes from JS strings
          },
          {
            loader: "css-loader" // Translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // Compiles Sass to CSS
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      { from: "./src/manifest.json", to: "./manifest.json" },
      { from: "./src/popup.html", to: "./popup.html" },
      { from: "./src/images", to: "./images" }
    ])
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  }
};
