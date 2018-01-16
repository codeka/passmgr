const gulp = require('gulp');
const gutil = require('gulp-util');
const path = require('path');
const webpack = require('webpack');

const Uglify = require('uglifyjs-webpack-plugin');

// Some intersting tasks:
//
// gulp      - build the app and monitor for changes to rebuild.
// npm test  - run unit tests (via npm, since making it work with gulp was too much work...)

const deployRoot = path.resolve(path.join(__dirname, '../deploy'));

gulp.task('copy-browser-static-files', () => {
  gulp.src(['browser/**/*', '!browser/**/*.js', '!browser/**/*.ts'])
    .pipe(gulp.dest('../deploy/browser/'));

  gulp.src([
    'node_modules/zone.js/dist/zone.js',
    'node_modules/web-animations-js/web-animations.min.js',
    'node_modules/webextension-polyfill/dist/browser-polyfill.min.js',
    'node_modules/idb/lib/idb.js'])
    .pipe(gulp.dest('../deploy/browser/js'));
  gulp.src(['node_modules/@angular/material/prebuilt-themes/indigo-pink.css'])
    .pipe(gulp.dest('../deploy/browser/css/material'));
});

gulp.task('build-browser-js', (cb) => {
  webpack({
    entry: {
      content: ['./browser/js/content.js'],
    },
    output: {
      path: path.join(deployRoot, 'browser/js'),
      filename: '[name]_bundle.js',
      pathinfo: true,
    },
    devtool: 'sourcemap',
    plugins: [
      new webpack.LoaderOptionsPlugin({ debug: true }),
      new Uglify()
    ],
  }, (err, stats) => {
    if (err) {
      cb(err);
    } else {
      gutil.log('[webpack]', stats.toString('minimal'));
      cb();
    }
  });
});

gulp.task('build-browser-ts', (cb) => {
  webpack({
    entry: {
      background: ['./browser/ts/background_main.ts'],
      popup: ['./browser/ts/popup_main.ts'],
      vault: ['./browser/ts/vault_main.ts'],
    },
    output: {
      path: path.join(deployRoot, 'browser/js'),
      filename: '[name]_bundle.js',
      pathinfo: true,
    },
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
    externals: {},
  }, (err, stats) => {
    if (err) {
      cb(err);
    } else {
      gutil.log('[webpack]', stats.toString('minimal'));
      cb();
    }
  });
});

gulp.task('default', ['copy-browser-static-files', 'build-browser-ts', 'build-browser-js'], () => {
  gulp.watch(['browser/**/*', '!browser/**/*.js', '!browser/**/*.ts'], ['copy-browser-static-files']);
  gulp.watch(['browser/**/*.ts'], ['build-browser-ts']);
  gulp.watch(['core/**/*.ts'], ['build-browser-ts']);
  gulp.watch(['browser/**/*.js'], ['build-browser-js']);
});
