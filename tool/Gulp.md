

package.json
```
{
  "name": "practice_gulp",
  "version": "1.0.0",
  "description": "",
  "main": "gulpfile.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Adrian",
  "license": "ISC",
  "devDependencies": {
    "gulp": "^3.8.11",
    "gulp-imagemin": "^2.4.0",
    "gulp-minify-css": "^1.2.4",
    "gulp-rename": "^1.2.2",
    "gulp-sass": "^2.2.0",
    "gulp-spriter": "^1.1.5",
    "gulp-uglify": "^1.5.3"
  }
}
```
gulpfile.js
```
var gulp = require('gulp'),                       //本地安装gulp所用到的地方
    sass = require('gulp-sass'),                  //sass
    spriter = require("gulp-spriter");            //精灵图合成
    imagemin = require('gulp-imagemin'),          //图片压缩
    minifycss = require('gulp-minify-css'),       //css压缩
    uglify = require('gulp-uglify'),              //js压缩
    rename = require('gulp-rename');              //重命名



//css
gulp.task('css', function () {
    gulp.src('dev/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(minifycss())
        .pipe(gulp.dest('release/css'));
});

//js
gulp.task('js', function() {
    gulp.src('dev/js/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('release/js'));
});

//image
gulp.task('image', function () {
    gulp.src('dev/images/*.{png,jpg,gif,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest('release/images'));
});


//watch
gulp.task('watch', function () {

    gulp.watch('dev/sass/*.scss', ['css']);
  
});

//default
gulp.task('default',['image','js']);
```





