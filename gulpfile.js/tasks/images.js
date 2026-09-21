/* global ENV PATHS */

const gulp = require('gulp');
const gulpIf = require('gulp-if');
const newer = require('gulp-newer');
const { finished } = require('stream/promises');

const getDestPath = () => PATHS.dist.images;

gulp.task('images:copy', async () => {
  const { default: imagemin } = await import('gulp-imagemin');
  const stream = gulp.src(`${PATHS.src.images}/**/*`)
    .pipe(newer(getDestPath()))
    .pipe(gulpIf(ENV.isModeProd(), imagemin()))
    .pipe(gulp.dest(getDestPath()));
  await finished(stream);
});
