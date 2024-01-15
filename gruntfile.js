module.exports = function (grunt) {
    // Include the google-closure-compiler plugin for Grunt
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
        "closure-compiler": {
            my_target: {
                files: {
                    "build/litegraph.min.js": "<%= projectFiles %>",
                },
                options: {
                    compilation_level: "SIMPLE",
                    language_in: "ECMASCRIPT_2015",
                    language_out: "ECMASCRIPT5",
                    warning_level: "QUIET", // Suppresses all warnings
                    create_source_map: "build/litegraph.min.js.map",
                    output_wrapper:
                        "(function(){\n%output%\n}).call(this)\n//# sourceMappingURL=litegraph.min.js.map",
                },
            },
        },
    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-closure-tools");

    grunt.registerTask("build", ["concat:build", "closure-compiler"]);
};
