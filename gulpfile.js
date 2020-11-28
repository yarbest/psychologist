let project_folder = "dist";
let source_folder = "src";

let path = {
    //пути вывода обработанных файлов
    build: {
        //html находится в корне, поэтому ставим просто "/"
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/img/",
        fonts: project_folder + "/fonts/",
        icons: project_folder + "/img/",
    },
    //пути к исходникам
    src: {
        //возьмет все файлы из корня, с типом html
        html: source_folder + "/*.html",
        //возьмет из корня только 1 файл
        css: source_folder + "/css/main.css",
        //возьмет все файлы из корня, с типом js
        js: source_folder + "/js/*.js",
        // все подпапки в imj /**/
        img: source_folder + "/img/**/*.{jpg,png,gif,ico,webp}",
        // img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: source_folder + "/fonts/**/*.{ttf,eot,woff,woff2}",
        icons: source_folder + "/img/**/*.svg",
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/css/**/*.css",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.{jpg,png,gif,ico,webp}",
        // img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: source_folder + "/fonts/**/*.{ttf,eot,woff,woff2}",
        icons: source_folder + "/img/**/*.svg",
    },
    clean: "./" + project_folder + "/",
};

let { src, dest } = require("gulp"),
    gulp = require("gulp"),
    browsersync = require("browser-sync").create(),
    fileinclude = require("gulp-file-include"),
    del = require("del"),
    group_media = require("gulp-group-css-media-queries"),
    clean_css = require("gulp-clean-css"),
    rename = require("gulp-rename"),
    imagemin = require("gulp-imagemin"),
    webp = require("gulp-webp"),
    webphtml = require("gulp-webp-html"),
    webpcss = require("gulp-webpcss"),
    // svgSprite = require("gulp-svg-sprite"),
    ttf2woff = require("gulp-ttf2woff"),
    ttf2woff2 = require("gulp-ttf2woff2");

function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: "./" + project_folder + "/",
        },
        port: 3000,
        notify: false,
    });
}

function html() {
    return src(path.src.html).pipe(fileinclude()).pipe(webphtml()).pipe(dest(path.build.html)).pipe(browsersync.stream());
}

function css() {
    return (
        src(path.src.css)
            .pipe(group_media())
            // данная настройка уберет загрузку jpg, оставит только webp в норм браузерах
            .pipe(webpcss({ webpClass: ".webp", noWebpClass: ".no-webp" }))
            .pipe(dest(path.build.css))
            .pipe(clean_css())
            .pipe(rename({ extname: ".min.css" }))
            .pipe(dest(path.build.css))
            .pipe(browsersync.stream())
    );
}

function js() {
    return src(path.src.js).pipe(fileinclude()).pipe(dest(path.build.js)).pipe(browsersync.stream());
}

function images() {
    return src(path.src.img)
        .pipe(
            webp({
                quality: 50,
            })
        )
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 6, //0 - 7
            })
        )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream());
}

function icons() {
    return src(path.src.icons).pipe(dest(path.build.icons)).pipe(browsersync.stream());
}

function fonts() {
    src(path.src.fonts).pipe(ttf2woff()).pipe(dest(path.build.fonts));
    return src(path.src.fonts).pipe(ttf2woff2()).pipe(dest(path.build.fonts));
}

function watchFiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
    gulp.watch([path.watch.icons], icons);
    gulp.watch([path.watch.fonts], fonts);
}

function clean(params) {
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, html, images, icons, fonts));
let watch = gulp.parallel(build, watchFiles, browserSync); //

exports.fonts = fonts;
exports.icons = icons;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
