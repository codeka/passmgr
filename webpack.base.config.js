const _ = require('lodash');
const webpack = require('webpack');

const defaults = {
  devtool: 'source-map',
  resolve: {
    alias: {
      core: `${__dirname}/core`,
    },
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    fallback: {
      'stream': require.resolve('stream-browserify'),
      'buffer': require.resolve('buffer/'),
    }
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader' },
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.css$/, use: 'raw-loader' }
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({ debug: true }),
  ],
  
};

module.exports.defaults = defaults;

module.exports.extend = function merge(config) {
  return _.extend({}, defaults, config);
};

module.exports.merge = function merge(config) {
  return _.merge({}, defaults, config);
};
