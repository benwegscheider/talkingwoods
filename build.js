({
    baseUrl: ['./js/app'],

    name: 'main',
    mainConfigFile: './js/app/common.js',
    out: './js/app/main.min.js',

    optimize: 'uglify2',
    uglify2: {
        output: {
            beautify: false
        },
        compress: {
            sequences: false,
            side_effects: false,
            global_defs: {
                DEBUG: false
            }
        },
        warnings: true,
        mangle: false
    },

    onBuildWrite: function(moduleName, path, contents) {
        var buildComment = '';
        if (moduleName == 'main') {
            buildComment = '/*! Build on: ' + new Date() + ' */\n';
        }

        return buildComment + contents;
    }
})
