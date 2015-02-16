//gulp是一种自动化工具，gulp是一种流操作模式
//gulp仅仅只有5个方法。所有的5个方法如下：task、run、watch、src以及dest

//引入 gulp
var gulp = require('gulp');

//引入组件
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var notify = require('gulp-notify');
var del = require('del');
var autoprefixer = require('gulp-autoprefixer');


//检查脚本
gulp.task('hint', function() {
    gulp.src('./js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//编译sass文件
gulp.task('sass', function() {
    gulp.src('./scss/*.scss')
        //.pipe(sass({ style: 'expanded' }))
        .pipe(sass())
        //border-radius起作用了，不知道为什么text-shadow没起作用
        .pipe(autoprefixer({
            browsers: ['last 200 versions', '> 0.1%', 'Firefox ESR', 'Opera 12.1']
        }))
        .pipe(gulp.dest('./css'));
});

//autoPrefixer 任务
/*gulp.task('autoprefixer', function() {
    gulp.src('./scss/*.scss')
        .pipe(sass({ style: 'expanded' }))
        .pipe(autoprefixer('safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('dist/assets/css'));
});*/

//js文件合并
gulp.task('concat', function() {
    gulp.src('./js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'));
});

//js合并且压缩
gulp.task('script', function() {
    gulp.src('./js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename({suffix: '.min'}))
        //pipe(rename('.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

//图片压缩
//notify在明令行中输出一个注释
gulp.task('imagemin', function() {
    gulp.src('./img/*.png')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('dist/assets/img'))
        .pipe(notify({ message: 'Images task complete!! '}));
});

//clean任务
gulp.task('clean', function(cb) {
    del(['dist/assets/img'])
});

//默认动作且添加了监控
gulp.task('default', function() {
    gulp.run('sass', 'concat');
    gulp.watch('./js/*.js', function() {
        gulp.run('sass', 'concat');
    })
});


/*
    //optimizationLevel[最佳]: 3, progressive[连续]: true, interlaced[交错]: true

    //执行多个任务，但是都是异步执行的，所以不能确定先会执行到哪一个
    gulp.task('bulid', ['css', 'js', 'imgs']);
    
    //如果想安顺序执行，那么可以用如下的方法来实现
    //下面的代码表明，css任务依赖greet，所有css会在greet运行完成后再运行
    gulp.task('css', ['greet'], function() {
        //deal with css here
    });

    gulp.task('watch', function() {
        gulp.watch('templates/*.tmpl.html', ['build']);
    });
    //也可以用回调函数
    gulp.watch('templates/*.tmpl.html', function(event) {
        console.log('event type: ' + event.type);
        console.log('event type: ' + event.path);
    });
    //另一种写法是watch方法所监控的文件发生变化时，（修改、增加、删除文件）
    ，会触发change事件。可以对change事件指定回调函数。
    var watcher = gulp.watch('templates/*.tmpl.html', ['build']);

    wacther.on('change', function(event) {
        console.log('event type: ' + event.type);
        console.log('event type: ' + event.path);
    });

    gulp.src(['js/star/test.js', '!js/star/test.min.js']);

    gulp.task('default', function() {
        gulp.run('hint', 'scripts');
    });
    gulp.watch('./scss/*.scss', function() {
        gulp.run('sass');
    });
*/


/*
src(): 方法用来指定要处理的 js 文件的位置，它会获取匹配到的所有 js 文件的路径，
并将它们转换为可以传递给插件进行处理的“流”。
*/