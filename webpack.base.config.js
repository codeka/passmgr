const _ = require('lodash');
const webpack = require('webpack');

const defaults = {
  devtool: 'sourcemap',
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    alias: {
      core: `${__dirname}/core`,
    }
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.css$/, loader: 'raw-loader' }
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
