module.exports = function (grunt) {
    // Load the necessary plugins
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-babel");
    grunt.loadNpmTasks("grunt-closure-compiler");
    require("google-closure-compiler").grunt(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        projectFiles: [
            "src/litegraph.js",
            "src/nodes/base.js",
            "src/nodes/events.js",
            "src/nodes/interface.js",
            "src/nodes/input.js",
            "src/nodes/math.js",
            "src/nodes/logic.js",
            "src/nodes/image.js",
            "src/nodes/gltextures.js",
            "src/nodes/glfx.js",
            "src/nodes/midi.js",
            "src/nodes/audio.js",
            "src/nodes/network.js",
        ],
        concat: {
            build: {
                src: "<%= projectFiles %>",
                dest: "build/litegraph.js",
            },
        },
        babel: {
            options: {
                presets: [["@babel/preset-env", { modules: false }]], // Disable module transformation
                plugins: ["@babel/plugin-transform-modules-commonjs"], // Transform to CommonJS
                sourceMap: true,
                compact: false
            },
            cjs: {
                options: {
                    plugins: ["@babel/plugin-transform-modules-commonjs"],
                },
                files: {
                    "build/litegraph.cjs.js": "<%= concat.build.dest %>",
                },
            },
            esm: {
                options: {
                    plugins: [], // Do not transform modules
                    presets: [["@babel/preset-env", { modules: false }]],
                },
                files: {
                    "build/litegraph.esm.js": "<%= concat.build.dest %>",
                },
            },
        },
        "closure-compiler": {
            my_target: {
                files: {
                    "build/litegraph.min.js": "<%= concat.build.dest %>",
                },
            },
            options: {
                compilation_level: "SIMPLE",
                language_in: "ECMASCRIPT_2015",
                language_out: "ECMASCRIPT5",
                warning_level: "QUIET", // Supresses warnings
                create_source_map: "build/litegraph.min.js.map",
                output_wrapper:
                    "(function(){\n%output%\n}).call(this)\n//# sourceMappingURL=litegraph.min.js.map",
            },
        },
    });

    // Register the build task
    grunt.registerTask("build", [
        "concat:build",
        "babel:cjs",
        "babel:esm",
        "closure-compiler",
    ]);
};
