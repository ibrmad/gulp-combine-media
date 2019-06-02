# Gulp Group Media Queries

## Installation

Install package with NPM and add it to your development dependencies:

`npm install --save-dev gulp-combine-media`

## Information

<table>
<tr>
<td>Package</td><td>gulp-combine-media</td>
</tr>
<tr>
<td>Description</td>
<td>Combine css media queries that have the same media features</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 7.0.0</td>
</tr>
</table>

## Usage

```js
var combineMedia = require('gulp-combine-media');

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass())
    .pipe(combineMedia()) // <--- 
    .pipe(gulp.dest('./css'));
});
```


## License

[MIT](http://opensource.org/licenses/MIT) © [Ibrahim Alhamad](https://github.com/ialhamad)