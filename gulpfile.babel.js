'use strict';

// ---------------------------------------
//   Required
// ---------------------------------------

const { src, dest, series, parallel, watch, lastRun } = require('gulp');

const server       = require('browser-sync').create();

const sass         = require('gulp-sass');
const postcss      = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const easings      = require('postcss-easings');
const cleancss     = require('gulp-clean-css');
const pxtorem      = require('postcss-pxtorem');
const bulksass     = require('gulp-sass-bulk-import');

const uglify       = require('gulp-uglify');
const concat       = require('gulp-concat');
// const babel        = require('gulp-babel');

const imagemin     = require('gulp-imagemin');
    const cache        = require('gulp-cache');
const svgmin       = require('gulp-svgmin');
const svgstore     = require('gulp-svgstore');
const cheerio      = require('gulp-cheerio');

const plumber      = require('gulp-plumber');
const gulpif       = require('gulp-if');
const lazypipe     = require('lazypipe');
const rename       = require('gulp-rename');
const del          = require('del');
const newer        = require('gulp-newer');

const path         = require('path');
const argv         = require('yargs').argv;
const notify       = require('gulp-notify');
const colors       = require('ansi-colors');
const config       = require('./gulp.config');

const merge        = require('merge-stream');
const handlebars   = require('gulp-handlebars');
const hb           = require('gulp-hb');

// ---------------------------------------
//   Config
// ---------------------------------------
// CLI arguments ( --prod )
var PROD = (argv.prod) ?  true : false;

// get paths from config file
const PATHS = config.paths;

const postCssPlugins = [
    autoprefixer({ cascade: false }),
    pxtorem(),
    easings()
  ];





// ---------------------------------------
//   Compile template handelbars
// ---------------------------------------
// Compile template handelbars and output static html
function template() {
  return src(PATHS.src.template_pages)
  .pipe(plumber( { errorHandler: onHbError }))
  .pipe(hb( { debug: false } )
    .partials(PATHS.src.template_partials)
    .data(PATHS.src.template_datas)
  )
  .pipe(rename( { extname: '.html' } ))
  .pipe(dest(PATHS.app_dir));
};



// ---------------------------------------
//   Minify Javascript
// ---------------------------------------
// Minify, add .min extension, move to DEST
function script(){
  return src(PATHS.src.js, { sourcemaps: (!PROD) ? true : false })
  .pipe(plumber( { errorHandler: onJSError }))
  // .pipe(babel({ presets: ['@babel/preset-env'] }))
  .pipe(concat('bundle.js'))
  .pipe(gulpif(PROD && '!**/*.min.js', uglify()))
  .pipe(gulpif('!**/*.min.js', rename( { suffix: '.min' } )))
  .pipe(dest(PATHS.dest.js, { sourcemaps: (!PROD) ? 'maps' : false }))
};


// ---------------------------------------
//   Convert Sass files to CSS
// ---------------------------------------
// Create sourcemaps, convert to css, autoprefix, add .min extension, move to DEST and inject styles
function styles(){
  return src(PATHS.src.css, { sourcemaps: (!PROD) ? true : false })
  .pipe(bulksass())
  .pipe(plumber( { errorHandler: onSassError }))
  .pipe(sass( { outputStyle: 'compressed' }))
  .pipe(postcss(postCssPlugins))
  // .pipe(gulpif(PROD, postcss(postCssPlugins)))
  .pipe(gulpif(PROD, cleancss()))
  .pipe(rename( { suffix: '.min' }))
  .pipe(dest(PATHS.dest.css, { sourcemaps: (!PROD) ? 'maps' : false }))
  .pipe(server.stream());
};



// ---------------------------------------
//   Optimize images
// ---------------------------------------
// Compress images only if necessary and move to DEST
function images(){
  return src(PATHS.src.images)
  .pipe(newer(PATHS.dest.images))
  .pipe(imagemin( { verbose: true } ))
  .pipe(dest(PATHS.dest.images));
};

      // Clear cache for compressing images
      function clearCache(){
        return cache.clearAll();
      };


// ---------------------------------------
//   Optimize SVG icons
// ---------------------------------------
// Compress SVG sources, combine in one file with symbol,
// inlineSvg: true -> remove <?xml ?> and DOCTYPE to use inline
function svg(){
  return src(PATHS.src.svg)
  // .pipe(svgmin())
  .pipe(svgmin(
    function getOptions (file) {
      var prefix = path.basename(file.relative, path.extname(file.relative));
      // console.log(colors.bgMagentaBright("prefix ["+ prefix + "]"));
      return {
        plugins: [
          // { cleanupIDs: {
          //   prefix: "zama" + '-',
          //   minify: true
          // }},
          // {
          //   cleanupIDs: true
          // },
          {
            removeViewBox: false
          }
        ],
        js2svg: {
          pretty: true
        }
      }
    }))

              .pipe(dest(PATHS.dest.svg))
  .pipe(svgstore( { inlineSvg: true } ))
  .pipe(rename( 'pack-icons.svg' ))
  .pipe(cheerio({
    run: function ($, file) {
      // console.log(colors.bgMagentaBright("file ["+ file.relative + "]"));
      $('svg').attr('style', 'display:none;');
      $('svg').addClass('pack-icons');
      $('symbol[id^="icon"] *').removeAttr('fill');
      $('symbol[id^="icon"] *').removeAttr('stroke');
      // $('symbol[id^="icon"] *').attr('fill', '#ff0000');
    },
    parserOptions: { xmlMode: true }
  }))
  .pipe(dest(PATHS.dest.svg));
};


// ---------------------------------------
//   Copy task
// ---------------------------------------
// Copy other files and folders and move to DEST
// base option to tell gulp where to start copying from
function copy(){
  return src(PATHS.src.copy, { base: PATHS.src_dir })
  .pipe(dest(PATHS.dest.copy));
};



// ---------------------------------------
//   Build production files
// ---------------------------------------
// Clean out all files and folders from build folder
function clean(){
  PROD = true;
  return del(PATHS.dest_dir + '**/*');
};



// ---------------------------------------
//   Browser-Sync
// ---------------------------------------
// Init browserSync server
function startServer(done){
  server.init({
    proxy        : PATHS.proxy,
    open         : false,
    notify       : false,
    ghostMode    : false,
    injectChanges: true
  });
  done();
};

// Reload browser after files changes (for JS and HTML/PHP files)
function reload(done) {
  server.reload();
  done();
};





// Watch files changes
function watchFiles(){
  watch(PATHS.src.css, styles);
  watch(PATHS.src.js, series(script, reload));
  watch(PATHS.src.images, series(images, reload));
  watch(PATHS.src.svg, series(svg, reload));
  watch(PATHS.src.copy, series(copy, reload));
  watch(PATHS.src.template, series(template, reload));
  watch(PATHS.src.html, reload);
};




// ---------------------------------------
//   Error handlers
// ---------------------------------------
function onJSError(err) {
  console.log(colors.yellow('----- onJSError \n'));
  notify.onError({
    title  : "___ JS error in " + err.plugin,
    message: err.message,
    // message: "\n" + err.toString(),
    sound  : "Pop",
  })(err);
  this.emit('end');
};

function onSassError(err) {
  console.log(colors.yellow('----- onSassError \n'));
  notify.onError({
    title  : "___ SASS error in " + err.plugin,
    message: err.message,
    // message: "\n" + err.toString(),
    sound  : "Pop"
  })(err);
  this.emit('end');
};

function onHbError(err) {
  console.log(colors.yellow('----- onHBError \n'));
  notify.onError({
    title  : "___ HB error in " + err.plugin,
    message: err.message,
    // message: "\n" + err.toString(),
    sound  : "Pop"
  })(err);
  this.emit('end');
};



// ---------------------------------------
//  Tasks list
// ---------------------------------------
exports.styles     = styles;
exports.script     = script;
exports.images     = images;
exports.svg        = svg;
exports.clearCache = clearCache;
exports.copy       = copy;
exports.template   = template;
exports.build      = series(clean, clearCache, parallel(styles, script, images, copy, svg, template));
exports.dev        = series(startServer, parallel(styles, script, images, copy), watchFiles);
exports.default    = series(startServer, parallel(styles, script, images, svg, template), watchFiles);

// task unused alone
exports.clean      = clean;
    exports.watcha       = watchFiles;


// tasks description...
clean.description = "// Clean out all files and folders from build folder";




// ∆∆∆∆∆∆∆∆∆∆∆∆∆∆
// console.log(colors.bold.cyanBright("  **** CONFIG (" + PATHS.src.styles+")"));
// console.log(colors.bold.cyanBright("  **** process.env.NODE_ENV (" + process.env.NODE_ENV+")"));

// const PROD = (argv.prod == false || argv.prod === undefined) ? false : true;
// const PROD = (argv.prod === undefined) ? false : true;
// console.log(colors.yellow("  **** PROD: "+ PROD + " (argv.prod: " + argv.prod +")"));

// ∆∆∆∆∆∆∆∆∆∆∆∆∆∆
