var /* BEGIN ENVIRONMENT CONFIG */
    conf_output_dest    = 'public',                         // the base output directory
    conf_image_dest     = 'public/_img',                     // where to output images
    conf_script_dest    = 'public/_js',                      // where to output scripts
    conf_style_dest     = 'public/_css',                     // where to output styles
    conf_icons_template = 'src/sass/_iconstemplate/_icons.scss',                     // where to output icon fonts
    conf_icons_dest     = 'public/_fonts',                     // where to output icon fonts
    conf_template_dest  = 'public',                         // where to output html jade
    conf_url_dest       = 'compartiofront',   // the local URL of the project
    /* END ENVIRONMENT CONFIG */

    changed             = require('gulp-changed'),
    browsersync         = require('browser-sync'),
    clean               = false,
    gulp                = require('gulp'),
    gulpif              = require('gulp-if'),
    gulputil            = require('gulp-util'),
    rename              = require('gulp-rename'),
    jade                = require('gulp-jade'),
    path                = require('path'),
    reload              = browsersync.reload,
    rimraf              = require('rimraf'),
    sass                = require('gulp-sass'),
    uglify              = require('gulp-uglify'),
    iconfont            = require('gulp-iconfont'),
    consolidate         = require("gulp-consolidate"),
    rename              = require("gulp-rename"),
    concat              = require('gulp-concat'),
    mainBowerFiles      = require('main-bower-files'),
    imagemin            = require('gulp-imagemin'),
    pngquant            = require('imagemin-pngquant'),
    autoprefixer        = require('gulp-autoprefixer'),
    beep                = require('beepbeep'),
    jshint              = require('gulp-jshint'),
    plumber             = require('gulp-plumber'),
    ftp                 = require('vinyl-ftp');
var ftpconfig = require('./ftpconfig.json');
 
var onError = function (err) { beep([0, 0, 0,0,0]); gulputil.log(gulputil.colors.green(err)); };
 
/**
 * Check to see if --vars were set.
 */
process.argv.forEach(function (val) {
    if (val === '--clean') {
        clean = true;
    }
});


/**
 * Remove dist directory.
 */
gulp.task('clean', function (cb) {
    rimraf(conf_output_dest, cb);
});


/**
 * Compile sass as compressed css.
 */
gulp.task('style', function () {
    return gulp.src('./src/sass/*.sass')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(changed(conf_style_dest))
        .pipe(sass({ 'indentedSyntax': true}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(conf_style_dest))
        .pipe(reload({stream:true}));
});
gulp.task('style_prod', function () {
    return gulp.src('./src/sass/*.sass')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(changed(conf_style_dest))
        .pipe(sass({ 'indentedSyntax': true, 'outputStyle': 'compressed'}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(conf_style_dest))
        .pipe(reload({stream:true}));
});


/**
 * Jade to html.
 */
gulp.task('jade', function () {
    return gulp.src('./src/jade/**/*.jade')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(jade({
            'pretty': true
        }))
        .pipe(gulp.dest(conf_template_dest))
        .pipe(reload({stream:true}));
});


/**
 * Optimize images.
 */
gulp.task('images', function () {
    return gulp.src('./src/img/**')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(conf_image_dest));
});

/**
 * Compress javascript.
 */
gulp.task('scripts', function () {
    return gulp.src('./src/js/**/*.js')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(changed(conf_script_dest))
        .pipe(gulp.dest(conf_script_dest))
        .pipe(reload({stream:true}));
});
gulp.task('scripts_prod', function () {
    return gulp.src('./src/js/**/*.js')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(changed(conf_script_dest))
        .pipe(uglify())
        .pipe(gulp.dest(conf_script_dest))
        .pipe(reload({stream:true}));
});

/**
 * Generate javascript brom bower installation.
 */
gulp.task('scripts_vendor', function () {
    var files = mainBowerFiles('**/*.js',{debugging : true});
    files.push('src/js/vendor/*.js');
    return gulp.src(files)
        .pipe(plumber({ errorHandler: onError }))
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(conf_script_dest))
        .pipe(reload({stream:true}));
});
gulp.task('scripts_vendor_prod', function () {
    var files = mainBowerFiles('**/*.js',{debugging : true});
    files.push('src/js/vendor/*.js');
    return gulp.src(files)
        .pipe(plumber({ errorHandler: onError }))
        .pipe(concat('vendor.js'))
        .pipe(uglify()) //DEV
        .pipe(gulp.dest(conf_script_dest))
        .pipe(reload({stream:true}));
});

/**
 * Generate icon font from svg.
 */
var runTimestamp = Math.round(Date.now()/1000);
gulp.task('icons_build', function(){
   gulputil.log(gulputil.colors.white('Haciendo iconos...'));

  return gulp.src(['./src/icons/*.svg'])
   //.pipe(plumber({ errorHandler: onError }))

  .pipe(iconfont({fontName: 'iconos'
    , appendUnicode: true
    , normalize: true
    , formats: ['ttf', 'eot', 'woff', 'woff2']
    , timestamp: runTimestamp
    }))
    .on('glyphs', function(glyphs) {
        gulputil.log(gulputil.colors.green('glyphs'));
        gulp.src(conf_icons_template)
            .pipe(consolidate('lodash', {
              glyphs: glyphs
            , fontName: 'iconos'
            , fontPath: '../_fonts/'
            , className: 'icon'
            }))
            .pipe(gulp.dest('src/sass/'));

    })
    .pipe(gulp.dest(conf_icons_dest)); // set path to export your fonts
});



// /**
//  * Copy htacess.
//  */


gulp.task('copy_htaccess', function() {
   gulp.src('./src/htaccess')
   .pipe(rename('.htaccess'))
   .pipe(gulp.dest('public/'));
});


/**
 * Copy favicons.
 */


gulp.task('copyfavicons', function() {
   gulp.src('./src/_img/favicons/**/*.*')
   .pipe(gulp.dest('public/_img/favicons'));
});



/**
 * Copy other public content.
 */


gulp.task('copyother', function() {
   gulp.src('./src/copytopublic/**/*.*')
   .pipe(gulp.dest('public'));
});



/**
* FTP UPLOAD
*/
/** Configuration **/


var port = 21;  
var localFilesGlob = ['./public/**/*.*'];  
var remoteFolder = '/public_html/p/compartio';


// helper function to build an FTP connection based on our configuration
function getFtpConnection() {  
    return ftp.create({
        host: ftpconfig.host,
        port: port,
        user: ftpconfig.user,
        password: ftpconfig.password,
        parallel: 5,
        log: gulputil.log
    });
}



/**
 * Deploy task.
 * Copies the new files to the server
 *
 * Usage: `FTP_USER=someuser FTP_PWD=somepwd gulp ftp-deploy`
 */
gulp.task('ftp-deploy', function() {

    var conn = getFtpConnection();

    return gulp.src(localFilesGlob, { base: './public', buffer: false })
        .pipe( conn.newer( remoteFolder ) ) // only upload newer files 
        .pipe( conn.dest( remoteFolder ) )
    ;
});







/**
 * All build tasks.
 */
gulp.task('build', ['scripts_vendor', 'copy_htaccess', 'copyother', 'icons_build', 'copyfavicons', 'style', 'jade', 'images', 'vendor', 'scripts']);
gulp.task('buildprod', ['scripts_vendor_prod', 'copy_htaccess', 'copyother', 'icons_build', 'copyfavicons', 'style_prod', 'jade', 'images', 'vendor', 'scripts_prod']);

gulp.task('icons', ['icons_build', 'style']);

gulp.task('vendor', ['scripts_vendor']);
gulp.task('vendorprod', ['scripts_vendor_prod']);


/**
 * Watch for chaned files
 */
gulp.task('watch', ['build'], function () {
    browsersync({
        proxy: conf_url_dest,
        open: 'external'
    });
    gulp.watch('src/sass/*.sass', ['style']);
    gulp.watch('src/sass/*.scss', ['style']);
    gulp.watch('src/jade/**/*.jade', ['jade']);
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/icons/*.svg', ['icons']);
    gulp.watch('src/img/**/*.*', ['images']);
    gulp.watch('src/copytopublic/**/*.*', ['copyother']);
    // gulp.watch('./dist/*html').on('change', reload);
    gulputil.log(gulputil.colors.inverse("Te estoy vigilando"));
});


/**
 * Default task
 */
gulp.task('default', function () {
    if (clean === true) {
        gulp.start(['clean']);
    } else {
        gulp.start(['watch']);
    }
});