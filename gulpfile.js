var gulp        = require('gulp'),
    through2    = require('through2'),
    browserify  = require('browserify'),
    babelify    = require('babelify'),
    sass        = require('gulp-sass'),
    sourcemaps  = require('gulp-sourcemaps'),
    plumber     = require('gulp-plumber'),
    rename      = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    clean       = require('gulp-clean'),
    assign      = require('lodash.assign'),
    source      = require('vinyl-source-stream'),
    buffer      = require('vinyl-buffer'),
    watchify    = require('watchify'),
    gutil       = require('gulp-util');

var paths = {
    src: './src/',
    dist: './dist/',

    scriptsEntrypoint: './src/scripts/index.js',
    stylesEntryPoint: './src/styles/index.scss',

    imageDir: 'img/',

    scripts: 'scripts/**/*.js',
    styles: 'styles/**/*.scss',
    html: ['./src/index.html'],
    images: 'img/**/*'
};

// Watchify/browserify script building stuff for faster builds
var opts = assign({}, watchify.args, {
    entries: [paths.scriptsEntrypoint],
    debug: false
});
var b = watchify(browserify(opts).transform(babelify.configure({ presets: ['es2015'] })));
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal
function bundle() {
    return b.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('build.js'))
        .pipe(buffer()) // optional, remove if you don't need to buffer file contents
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.dist))
        .pipe(browserSync.stream());
}


gulp.task('scripts', ['clean-scripts'], bundle);
gulp.task('clean-scripts', function() {
    return gulp.src([paths.dist + 'build.js', paths.dist + 'build.js.map'], { read: false })
        .pipe(plumber())
        .pipe(clean());
});


gulp.task('styles', ['clean-styles'], function() {
    return gulp.src(paths.stylesEntryPoint)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(rename('build.css'))
        .pipe(gulp.dest(paths.dist))
        .pipe(browserSync.stream());
});
gulp.task('clean-styles', function() {
    return gulp.src(paths.dist + 'build.css', { read: false })
        .pipe(plumber())
        .pipe(clean());
});


gulp.task('html', ['clean-html'], function() {
    return gulp.src(paths.html)
        .pipe(plumber())
        .pipe(gulp.dest(paths.dist))
        .pipe(browserSync.stream());
});
gulp.task('clean-html', function() {
    return gulp.src(paths.dist + '**/*.html', { read: false })
        .pipe(plumber())
        .pipe(clean());
});


gulp.task('images', ['clean-images'], function() {
    return gulp.src(paths.src + paths.images, { base: paths.src })
        .pipe(plumber())
        .pipe(gulp.dest(paths.dist))
        .pipe(browserSync.stream());
});
gulp.task('clean-images', function() {
    return gulp.src(paths.dist + paths.imageDir, { read: false })
        .pipe(plumber())
        .pipe(clean());
});



gulp.task('serve', ['scripts', 'styles', 'html', 'images'], function() {
    browserSync.init({
        server: paths.dist
    });

    gulp.watch(paths.src + paths.scripts, ['scripts']);
    gulp.watch(paths.src + paths.styles, ['styles']);
    gulp.watch(paths.src + paths.html, ['html']);
    gulp.watch(paths.src + paths.images, ['images']);
});

gulp.task('clean', ['clean-scripts', 'clean-styles', 'clean-html', 'clean-images']);

gulp.task('default', ['scripts', 'styles', 'html', 'images']);
