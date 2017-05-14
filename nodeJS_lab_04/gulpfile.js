var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('build', function() {  //  задача build
    gulp.src("main/*.js")        //  выборка исходных файлов для обработки плагином
        .pipe(babel({               //  смотрит options Babel, которые будут обрботаны
                presets:["latest"]  //  выбраем preset для загрузки и использования
            }))
        .pipe(gulp.dest('public'))  //  вывод результирующих файлов в данную директорию
});

gulp.task('watch',function(){
    gulp.watch('main/*.js',['build']);  // наблюдение за изменениями в файлах
});

gulp.task('default',['build','watch']);