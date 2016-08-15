var gulp         = require('gulp'),
		sass         = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		minifycss    = require('gulp-minify-css'),
		rename       = require('gulp-rename'),
		browserSync  = require('browser-sync').create(),
		concat       = require('gulp-concat'),
		uglify       = require('gulp-uglifyjs');

gulp.task('browser-sync', ['styles', 'scripts'], function() {
		browserSync.init({
				proxy: "newsite.rus",
				notify: false
		});
});

gulp.task('styles', function () {
	return gulp.src('assets/templates/Stas/Gulp/sass/*.sass')
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
	.pipe(minifycss())
	.pipe(gulp.dest('assets/templates/Stas/css'))
	.pipe(browserSync.stream());
});

gulp.task('scripts', function() {
	return gulp.src([
		'./assets/app/libs/modernizr/modernizr.js',
		'./assets/app/libs/jquery/jquery-1.11.2.min.js',
		'./assets/app/libs/waypoints/waypoints.min.js',
		'./assets/app/libs/animate/animate-css.js',
		'./assets/app/libs/plugins-scroll/plugins-scroll.js',
		])
		.pipe(concat('libs.js'))
		// .pipe(uglify()) //Minify libs.js
		.pipe(gulp.dest('./assets/app/js/'));
});

gulp.task('watch', function () {
	gulp.watch('./assets/templates/Stas/Gulp/sass/*.sass', ['styles']);
	gulp.watch('./assets/app/libs/**/*.js', ['scripts']);
	gulp.watch('./assets/app/js/*.js').on("change", browserSync.reload);
	gulp.watch('./assets/app/*.html').on('change', browserSync.reload);
	gulp.watch('*.php').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);
