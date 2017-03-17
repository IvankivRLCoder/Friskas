var gulp = require("gulp"),
    util = require("gulp-util"),
    sass = require("gulp-sass"),
    plumber = require('gulp-plumber'),
    image = require('gulp-image'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    log = util.log,
    concat = require('gulp-concat'),
    babel = require("gulp-babel"),
    uglify = require('gulp-uglify'),
    debug = require('gulp-debug'),
    livereload = require('gulp-livereload'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    plugins = require('gulp-load-plugins')({
    });
livereload({start: true});

gulp.task("sass", function () {
    log("Generate CSS files " + (new Date()).toString());
    gulp.src("build/styles/main.scss")
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({style: 'expanded'}))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dest/css"))
        .pipe(cleanCSS())
        .pipe(rename({
            basename: 'styles',
            suffix: '.min'
        }))
        .pipe(gulp.dest('dest/css'))
});


gulp.task('scripts', function () {
    return gulp.src('build/scripts/*.js')
        .pipe(plumber())
        .pipe(debug())
        .pipe(concat('all.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(rename({
            basename: 'main'
        }))
        .pipe(gulp.dest('dest/js'))
        .pipe(uglify())
        .pipe(rename({
            basename: 'main',
            suffix: '.min'
        }))
        .pipe(gulp.dest('dest/js'))
});
gulp.task('image', function () {
    gulp.src('./build/img/*')
        .pipe(image({
            pngquant: true,
            optipng: true,
            zopflipng: true,
            jpegRecompress: false,
            jpegoptim: true,
            mozjpeg: true,
            gifsicle: true,
            svgo: true,
            concurrent: 10
        }))
        .pipe(gulp.dest('./dest/img'));
});

gulp.task('default', ['sass', 'scripts', 'image', 'watch'], function () {
    // Do stuff
});
// plugins.livereload.listen();
gulp.task("watch", function () {
    // livereload.listen();
    log("Watching scss files for modifications");
    gulp.watch("build/styles/*", ["sass"]);
    gulp.watch('build/styles/*.scss', ['sass']);
    gulp.watch('build/scripts/*.*', ['scripts']);
    gulp.watch('build/img/*/**/*', ['image']);
});