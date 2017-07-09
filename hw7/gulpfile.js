var gulp = require('gulp'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    cleanCss = require('gulp-clean-css'),
    rigger = require('gulp-rigger');

var path = {
    dist: {
        html: './dist/',
        js: './dist/js/',
        css: './dist/css/',
        json: './dist/'
    },
    app: {
        html: './app/*.html',
        js: './app/js/script.js',
        style: './app/style/style.scss',
        json: './app/*.json'
    },
    watch: {
        html: './app/**/*.html',
        js: './app/js/**/*.js',
        style: './app/style/**/*.scss',
        json: './app/*.json'
    }
};

gulp.task('html', function () {
    gulp.src(path.app.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.dist.html));
});

gulp.task('js', function () {
    gulp.src(path.app.js)
        .pipe(rigger())
        .pipe(uglify())
        .pipe(gulp.dest(path.dist.js));
});

gulp.task('style', function () {
    gulp.src(path.app.style)
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cleanCss())
        .pipe(gulp.dest(path.dist.css));
});

gulp.task('json', function () {
    gulp.src(path.app.json)
        .pipe(gulp.dest(path.dist.json));
});

gulp.task('build', [
        'html',
        'style',
        'js',
        'json'
    ]);

gulp.task('watch', function() {
    gulp.watch(path.watch.html, ['htm']);
    gulp.watch(path.watch.style, ['style']);
    gulp.watch(path.watch.js, ['js']);
    gulp.watch(path.watch.json, ['json']);
});

gulp.task('default', ['build', 'watch']);