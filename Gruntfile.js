module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                scriptBanners: true,
                // hh是12小时制，HH是24小时制
                banner: '/*! <%= pkg.name %>-<%= pkg.version %>.js <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n'
            },
            build: {
                src: 'src/js/test.js',
                dest: 'build/js/<%= pkg.name %>-<%= pkg.version %>.js.min.js'
            }
        },
        //jshint配置信息
        jshint: {
            build: ['Gruntfile.js', 'src/js/*.js'], //要检查哪些文档
            options: {
                jshintrc: '.jshintrc'
            }
        },
        //编译less插件的配置信息
        less: {
            options: {
                banner: '/*! <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n'
            },
            main: {
                expand: true, //开始动态编译
                cwd: './src/less/',
                src: ['main.less'], //匹配less文件夹下的所有后缀为less的文件
                dest: 'build/css/', //生成目标文件的路径
                ext: '.css' //替换生成文件的后缀
            }
        },
        // 压缩所有css
        cssmin: {
            minify: {
                expand: true,
                cwd: 'build/css/',
                src: ['**/*.css', '**/!*.min.css'],
                dest: 'build/css/',
                ext: '.min.css'
            }
        },
        imagemin: {
            /* 压缩图片大小 */
            dist: {
                options: {
                    optimizationLevel: 3 //定义 PNG 图片优化水平
                },
                files: [{
                    expand: true,
                    cwd: 'src/images/',
                    src: ['**/*.{png,jpg,jpeg,gif}'], // 优化 images 目录下所有 png/jpg/jpeg/gif图片
                    dest: 'build/images/' // 优化后的图片保存位置
                }]
            }
        },
        //watch插件的配置信息
        watch: {
            client: { //监听less文件，改变时自定编译成css
                files: ['src/less/*.less'],
                tasks: ['less'],
                options: {
                    livereload: true
                }
            },
            build: {
                files: ['src/**/*.js', 'src/**/*.css'],
                tasks: ['jshint', 'uglify'],
                options: {
                    spawn: false
                }
            }
        }
    });

    // 加载任务插件。
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 默认被执行的任务列表：注意顺序
    grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'imagemin', 'watch']);

};
