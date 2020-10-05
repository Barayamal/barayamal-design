const pkg = require('./package.json'),
      gulp = require('gulp'),
      rollup = require('gulp-better-rollup'),
      commonJS = require('@rollup/plugin-commonjs'),
      resolve = require('@rollup/plugin-node-resolve');

const $ = require('gulp-load-plugins')({
      pattern: '*',
      scope: ['devDependencies']
});

gulp.task('watch', function() {
    gulp.watch(pkg.paths.src.css, gulp.series('sass:development'));
    gulp.watch(pkg.paths.src.js, gulp.series('js:development'));
    gulp.watch(pkg.paths.src.img, gulp.series('img'));
});


// DEVELOPMENT
gulp.task('sass:development', function () {
    return gulp.src(pkg.paths.src.css)
        .pipe($.sourcemaps.init())
            .pipe($.sass({
                includePaths: ['node_modules']
            }).on('error', $.sass.logError))
            .pipe($.autoprefixer())
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(pkg.paths.dist.css))
});

gulp.task('js:development', function () {
    return gulp.src(pkg.paths.src.js)
        .pipe($.sourcemaps.init())
            .pipe(rollup({
                plugins: [
                    commonJS(),
                    resolve()
                ]},
            'umd'))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(pkg.paths.dist.js))
});

gulp.task('img:development', function() {
    return gulp.src(pkg.paths.src.img)
      .pipe(gulp.dest(pkg.paths.dist.img))
});



// PRODUCTION 

/* COMING SOON */



// HELPERS
gulp.task('purge', function() {
    return $.del([pkg.paths.dist.base]);
});

gulp.task('img', function() {
    return gulp.src(pkg.paths.src.img)
      .pipe($.cache($.imagemin()))
      .pipe(gulp.dest(pkg.paths.dist.img))
});

gulp.task('woff', function() {
    return gulp.src(pkg.paths.src.woff)
      .pipe(gulp.dest(pkg.paths.dist.woff))
});



// TASK RUNNERS
gulp.task('default', gulp.parallel(
    'sass:development',
    'js:development',
    'img', 
    'woff',
    'watch')
);

gulp.task('build', gulp.series(
    'purge',
    'img',
    'woff')
);