const webpack = require("webpack");
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, "index.js"),
  node: {
    fs: "empty"
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "zxing-wasm.js",
    library: "zxing-wasm",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      { test: require.resolve("./zxing/build/zxing.js"), use: "exports-loader?Module" },
      { test: require.resolve("./zxing/build/zxing.wasm"), loader: 'file-loader', options: { name: "zxing.wasm" } }
    ]
  },
  plugins: [
    new UglifyJsPlugin()
  ]
};