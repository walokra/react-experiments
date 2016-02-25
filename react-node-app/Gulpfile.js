var gulp = require('gulp');
var server = require('gulp-express');

var gutil = require('gulp-util');
var notify = require("gulp-notify");
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');

gulp.task('server', function () {
		server.run([ 'src/server.js' ]);

    gulp.watch(['src/server.js'], [server.run]);
});

gulp.task('watch', ['setWatch', 'browserify'], function () {
    gulp.watch('./css/*.css');
});

gulp.task('setWatch', function() {
    global.isWatching = true;
});

function handleErrors() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: "Compile Error",
        message: "<%= error.message %>"
    }).apply(this, args);
    this.emit('end'); // Keep gulp from hanging on this task
}

gulp.task('browserify', function() {
    var props = {
        cache: {}, packageCache: {},
        // Specify the entry point of your app
        entries: ['./src/app/app.js'],
        // Add file extentions to make optional in your requires
        extensions: ['.js'],
        //fullPaths: true,
        debug: global.isWatching
    };

    var bundler = global.isWatching ? watchify(browserify(props)) : browserify(props);

    bundler = bundler.transform(babelify);

    var bundle = function() {
        var stream = bundler.bundle();
        if (global.isWatching) {
            stream = stream.on('error', handleErrors);
        } else {
            stream = stream.on('error', function(err) {
                gutil.log(
                    gutil.colors.red('Browserify compile error:'),
                    err.message
                );
            });
        }
        return stream
            .pipe(source('bundle.js'))
            // Specify the output destination
            .pipe(gulp.dest('./src/app/build/'));
    };

    // If watchify in use
    if (global.isWatching) {
        gutil.log("watchify enabled");
        // Rebundle with watchify on changes.
        bundler.on('update', function() {
            gutil.log("Rebundle");
            bundle();
        });
    }

    return bundle();
});

gulp.task('default', ['watch', 'server']);
