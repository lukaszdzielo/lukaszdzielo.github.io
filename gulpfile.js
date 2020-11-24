var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var minCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var clean = require('gulp-clean');
var plumber = require('gulp-plumber');

var config = {
    proxy: '_portfolio.test', // change it to your development domain
    sync: ['**/*.php', '**/*.html', '**/*.css'],
    css: {
        src: [
            'assets/css/src/**/*.scss',
            'assets/css/src/*.scss'
        ],
        dest: 'assets/css/dist'
    },
    js: {
        src: [
            // 'assets/lib/popper.js',
            'assets/lib/bootstrap/dist/js/bootstrap.js',
            'assets/lib/swiper/swiper-bundle.js',
            'assets/js/src/main.js',
        ],
        dest: 'assets/js/dist'
    },
    img: {
        ext: {
            jpg: '.jpg',
            png: '.png',
            gif: '.gif',
            jpeg: '.jpeg',
            svg: '.svg',
            ico: '.ico'
        },
        src: 'assets/img/src/**/*',
        dest: 'assets/img/dist'
    }
};

/* Compiles Sass files */
function taskBuildCss() {
    return gulp.src(config.css.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest(config.css.dest))
        .pipe(minCss({processImport: false}))
        .pipe(rename({extname: '.min.css'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.css.dest));
}

/* Compiles JS files */
function taskBuildJs() {
    return gulp.src(config.js.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(config.js.dest))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.js.dest));
}

/* Browser refresh on declared files change */
function taskBrowserSync() {
    browserSync.init({
        files: config.sync,
        proxy: config.proxy
    });
}

/* Copies images from src to dest location */
function taskImages() {
    let frontImages = new Array();
    for (let index in config.img.ext) {
        frontImages.push(config.img.src + config.img.ext[index]);
    }
    return gulp.src(frontImages)
        .pipe(plumber())
        .pipe(gulp.dest(config.img.dest));
}

/* Removes dst images, copresses and copies images from src to dst location */
function taskImagesCompress() {
    gulp.start(taskCleanImages);
    return gulp.src(config.img.src)
        .pipe(plumber())
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 5,
        }))
        .pipe(gulp.dest(config.img.dest))
}

/* Removes all images declared in `dstImages` */
function taskCleanImages() {
    console.log('*** Cleaning images...');
    return gulp.src([
        'assets/img/dist/*'
    ])
        .pipe(clean({force: false}));
}

/* Watch images and copies images from src to dst directory */
function taskWatchImages() {
    gulp.watch(config.img.src, taskImages);
}

/* Assets files watcher */
function taskWatcher() {
    console.log('*** Watching assets files...');
    gulp.watch(config.css.src, taskBuildCss);
    gulp.watch(config.js.src, taskBuildJs);
}

/* Default */
exports.default  = gulp.series(taskBuildCss, taskBuildJs, gulp.parallel(taskWatcher));

/* Default + BrowserSync */
exports.frontend = gulp.series(taskBuildCss, taskBuildJs, /*taskImages, */ gulp.parallel(taskWatcher, /* taskWatchImages, */ taskBrowserSync));

/* Images comporess */
exports.img = gulp.series(
    taskImagesCompress,
);