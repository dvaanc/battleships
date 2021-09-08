const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: '/src/code/index.js',
  devtool: 'inline-source-map',
  watch: true,
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
],
};
