const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const sass = require('gulp-sass');

gulp.task('html', () =>
	gulp.src(['./html/*.html'])
		.pipe(gulp.dest('./dist'))
);

gulp.task('scss', () =>
	gulp.src(['./scss/*.scss'])
		.pipe(sass({outputStyle: 'expanded'}))
		.pipe(gulp.dest('./dist/'))
);

gulp.task('ts', () => {
	const webpackConfig = require('./webpack.js');
	return webpackStream(webpackConfig, webpack)
		.pipe(gulp.dest('./dist'));
});

gulp.task('default', ['html', 'scss', 'ts']);
