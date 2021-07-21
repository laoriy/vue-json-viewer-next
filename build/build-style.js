const path = require('path');
const fs = require('fs-extra');
const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const less = require('gulp-less');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const { logInfo, logWarn, logSuccess, logHint } = require('./log');

const subDir = '../src/styles/index.less';
const styleDir = path.resolve(__dirname, subDir);

const doneHandler = (done) => {
    done();
    logSuccess("\nFinish builded styles, and compiled component 'vue-json-viewer-next' successfully.\n");
    logHint("Now, you can cd to 'dist' and run 'npm publish' to publish.");
};

if (fs.existsSync(styleDir)) {
    logInfo(`Start building styles, the style path is '${styleDir}'.It will take a while.`);

    // less to css
    gulp.task('css', () =>
        gulp
            .src(subDir)
            .pipe(less())
            .pipe(
                autoprefixer({
                    overrideBrowserslist: ['last 2 versions', 'ie > 8'],
                })
            )
            .pipe(cleanCSS())
            .pipe(rename('index.css'))
            .pipe(gulp.dest('../dist/dist/styles'))
    );

    // copy fonts
    gulp.task('fonts', () =>
        gulp.src('../src/styles/iconfont/fonts/*.*').pipe(gulp.dest('../dist/dist/styles/fonts'))
    );

    gulp.task('default', gulp.series('css', 'fonts', doneHandler));
} else {
    logWarn(`Style '${styleDir}' does not exist, do the empty build.`);

    // 文件不存在执行 empty gulp task
    gulp.task('default', doneHandler);
}
