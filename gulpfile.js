const gulp = require('gulp');
const gutil = require('gulp-util');
const path = require('path');
const webpack = require('webpack');

const deployRoot = path.resolve(path.join(__dirname, '../deploy'));

gulp.task('default', () => {
  // copy the (non-JS) browser files to the deploy folder.
  gulp.src(['browser/**/*', '!browser/**/*.js', '!browser/**/*.ts'])
    .pipe(gulp.dest('../deploy/browser/'));

  gulp.src([
    'node_modules/zone.js/dist/zone.js',
    'node_modules/web-animations-js/web-animations.min.js',
    'node_modules/webextension-polyfill/dist/browser-polyfill.min.js'])
    .pipe(gulp.dest('../deploy/browser/js'));
  gulp.src(['node_modules/@angular/material/prebuilt-themes/indigo-pink.css'])
    .pipe(gulp.dest('../deploy/browser/css/material'));

  webpack({
    entry: './browser/ts/popup_main.ts',
    output: {
      path: path.join(deployRoot, 'browser/js'),
      filename: 'popup_bundle.js',
      pathinfo: true,
    },
    devtool: 'sourcemap',
    resolve: {
      extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
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
    externals: {},
  }, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }
    gutil.log('[webpack]', stats.toString('minimal'));
  });
});
