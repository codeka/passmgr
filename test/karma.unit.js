const webpackConfig = require('../webpack.base.config');

module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      '../**/*.spec.ts'
    ],
    exclude: [
    ],
    preprocessors: {
      '../**/*.spec.ts': ['webpack']
    },
    mime: {
      'text/x-typescript': ['ts', 'tsx']
    },
    webpack: {
      module: webpackConfig.defaults.module,
      resolve: webpackConfig.defaults.resolve,
      node: {
        fs: 'empty'
      },
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity,
  });
};
