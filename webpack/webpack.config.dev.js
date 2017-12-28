const _ = require('lodash');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VersionFilePlugin = require('webpack-version-file-plugin');

const config = require('./config.js');


module.exports = _.merge({}, config, {
  output: {
    path: path.resolve(__dirname, '../../deploy/browser'),
  },

  devtool: 'source-map',
  plugins: [
    new CopyWebpackPlugin([
      { from: './browser' }
    ], {
      ignore: ['js/**/*', 'manifest.json'],
      copyUnmodified: false
    }),
    new VersionFilePlugin({
      packageFile: path.resolve(__dirname, '../package.json'),
      template: path.resolve(__dirname, '../browser/manifest.json'),
      outputFile: path.resolve(__dirname, '../../deploy/browser/manifest.json'),
    })
  ],
  watch: true
});
