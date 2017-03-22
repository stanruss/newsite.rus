var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		del            = require('del'),
		imagemin       = require('gulp-imagemin'),
		cache          = require('gulp-cache'),
		autoprefixer   = require('gulp-autoprefixer'),
		ftp            = require('vinyl-ftp'),
		notify         = require("gulp-notify");

// Скрипты проекта

gulp.task('common-js', function() {
	return gulp.src([
		'assets/templates/Stas/app/js/common.js',
		])
	.pipe(concat('common.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('assets/templates/Stas/app/js'));
});

gulp.task('scripts', ['common-js'], function() {
	return gulp.src([
		'assets/templates/Stas/app/libs/jquery/dist/jquery.min.js',
		'assets/templates/Stas/app/libs/mmenu/js/jquery.mmenu.all.min.js',
		'assets/templates/Stas/app/libs/owl.carousel/owl.carousel.min.js',
		'assets/templates/Stas/app/libs/fotorama/fotorama.js',
		'assets/templates/Stas/app/libs/selectize/js/standalone/selectize.min.js',
		'assets/templates/Stas/app/libs/equalHeights/equalheights.js',
		'assets/templates/Stas/app/js/common.min.js', // Всегда в конце
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Минимизировать весь js (на выбор)
	.pipe(gulp.dest('assets/templates/Stas/app/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
	browserSync({
		proxy: "newsite.rus",
		notify: false
	});
});

gulp.task('sass', function() {
	return gulp.src('assets/templates/Stas/app/sass/**/*.sass')
	.pipe(sass().on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleanCSS())
	.pipe(gulp.dest('assets/templates/Stas/app/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'scripts', 'browser-sync'], function() {
	gulp.watch('assets/templates/Stas/app/sass/**/*.sass', ['sass']);
	gulp.watch(['assets/templates/Stas/libs/**/*.js', 'app/js/common.js'], ['scripts']);
	gulp.watch('assets/templates/Stas/app/*.php', browserSync.reload);
});

gulp.task('imagemin', function() {
	return gulp.src('assets/templates/Stas/app/img/**/*')
	.pipe(cache(imagemin()))
	.pipe(gulp.dest('assets/templates/Stas/dist/img')); 
});

gulp.task('build', ['removedist', 'imagemin', 'sass', 'scripts'], function() {

	var buildFiles = gulp.src([
		'assets/templates/Stas/app/*.php',
		'app/.htaccess',
		]).pipe(gulp.dest('assets/templates/Stas/dist'));

	var buildCss = gulp.src([
		'assets/templates/Stas/app/css/main.min.css',
		]).pipe(gulp.dest('assets/templates/Stas/dist/css'));

	var buildJs = gulp.src([
		'assets/templates/Stas/app/js/scripts.min.js',
		]).pipe(gulp.dest('assets/templates/Stas/dist/js'));

	var buildFonts = gulp.src([
		'assets/templates/Stas/app/fonts/**/*',
		]).pipe(gulp.dest('assets/templates/Stas/dist/fonts'));

});

gulp.task('deploy', function() {

	var conn = ftp.create({
		host:      'hostname.com',
		user:      'username',
		password:  'userpassword',
		parallel:  10,
		log: gutil.log
	});

	var globs = [
	'assets/templates/Stas/dist/**',
	'assets/templates/Stas/dist/.htaccess',
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('/path/to/folder/on/server'));

});

gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);
