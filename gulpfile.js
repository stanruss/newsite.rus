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
		pngquant       = require('imagemin-pngquant'),
		cache          = require('gulp-cache'),
		autoprefixer   = require('gulp-autoprefixer'),
		fileinclude    = require('gulp-file-include'),
		gulpRemoveHtml = require('gulp-remove-html'),
		bourbon        = require('node-bourbon'),
		ftp            = require('vinyl-ftp');

gulp.task('browser-sync', function() {
	browserSync({
		proxy: "newsite.rus",
		notify: false
	});
});

gulp.task('sass', ['headersass'], function() {
	return gulp.src('assets/templates/paychatnia/sass/**/*.sass')
		.pipe(sass({
			includePaths: bourbon.includePaths
		}).on('error', sass.logError))
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS())
		.pipe(gulp.dest('assets/templates/paychatnia'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('headersass', function() {
	return gulp.src('assets/templates/paychatnia/header.sass')
		.pipe(sass({
			includePaths: bourbon.includePaths
		}).on('error', sass.logError))
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS())
		.pipe(gulp.dest('assets/templates/paychatnia'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('libs', function() {
	return gulp.src([
		'assets/templates/paychatnia/js/jquery.js',
		'assets/templates/paychatnia/libs/magnific-popup/dist/jquery.magnific-popup.js'
		])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('assets/templates/paychatnia/js'));
});

gulp.task('watch', ['sass', 'libs', 'browser-sync'], function() {
	gulp.watch('assets/templates/paychatnia/header.sass', ['headersass']);
	gulp.watch('assets/templates/paychatnia/sass/**/*.sass', ['sass']);
	gulp.watch('assets/templates/paychatnia/*.html', browserSync.reload);
	gulp.watch('assets/templates/paychatnia/js/**/*.js', browserSync.reload);
});

gulp.task('imagemin', function() {
	return gulp.src('assets/templates/paychatnia/img/**/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('assets/templates/paychatnia/dist/img')); 
});

gulp.task('buildhtml', function() {
  gulp.src(['assets/templates/paychatnia/*.html'])
    .pipe(fileinclude({
      prefix: '@@'
    }))
    .pipe(gulpRemoveHtml())
    .pipe(gulp.dest('assets/templates/paychatnia/dist/'));
});

gulp.task('removedist', function() { return del.sync('dist'); });

gulp.task('build', ['removedist', 'buildhtml', 'imagemin', 'sass', 'libs'], function() {

	var buildCss = gulp.src([
		'assets/templates/paychatnia/fonts.min.css',
		'assets/templates/paychatnia/main.min.css'
		]).pipe(gulp.dest('assets/templates/paychatnia/dist'));

	var buildFiles = gulp.src([
		'assets/templates/paychatnia/.htaccess'
	]).pipe(gulp.dest('assets/templates/paychatnia/dist'));

	var buildFonts = gulp.src('assets/templates/paychatnia/fonts/**/*').pipe(gulp.dest('assets/templates/paychatnia/dist/fonts'));

	var buildFiles = gulp.src('assets/templates/paychatnia/libs/**/*').pipe(gulp.dest('assets/templates/paychatnia/dist/libs'));

	var buildJs = gulp.src('assets/templates/paychatnia/js/**/*').pipe(gulp.dest('assets/templates/paychatnia/dist/js'));

});

gulp.task('deploy', ['build'], function() {

	var conn = ftp.create({
		host:      'hostname.com',
		user:      'username',
		password:  'userpassword',
		parallel:  10,
		log: gutil.log
	});

	var globs = [
	'assets/templates/paychatnia/dist/**',
	'assets/templates/paychatnia/dist/.htaccess',
	];
	return gulp.src( globs, { buffer: false } )
	.pipe( conn.dest( '/path/to/folder/on/server' ) );

});

gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);
