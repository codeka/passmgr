const gulp = require('gulp');
const gutil = require('gulp-util');
const mocha = require('gulp-mocha');
const path = require('path');
const webpack = require('webpack');

// Some intersting tasks:
//
// gulp      - build the app and monitor for changes to rebuild.
// gulp test - run unit tests.

const deployRoot = path.resolve(path.join(__dirname, '../deploy'));

gulp.task('copy-browser-static-files', () => {
  gulp.src(['browser/**/*', '!browser/**/*.js', '!browser/**/*.ts'])
    .pipe(gulp.dest('../deploy/browser/'));

  gulp.src([
    'node_modules/zone.js/dist/zone.js',
    'node_modules/web-animations-js/web-animations.min.js',
    'node_modules/webextension-polyfill/dist/browser-polyfill.min.js'])
    .pipe(gulp.dest('../deploy/browser/js'));
  gulp.src(['node_modules/@angular/material/prebuilt-themes/indigo-pink.css'])
    .pipe(gulp.dest('../deploy/browser/css/material'));
});

gulp.task('build-browser', (cb) => {
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
      cb(err);
    }
    gutil.log('[webpack]', stats.toString('minimal'));
    cb();
  });
});

gulp.task('default', ['copy-browser-static-files', 'build-browser'], () => {
  gulp.watch(['browser/**/*', '!browser/**/*.js', '!browser/**/*.ts'], ['copy-browser-static-files']);
  gulp.watch(['browser/**/*.ts'], ['build-browser']);
});

gulp.task('test', () => {
  return gulp.src(['**/*.spec.ts'], { read: false })
    .pipe(mocha({
      require: 'ts-node/register',
    }));
});
