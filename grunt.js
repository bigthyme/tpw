//grunt.js file goes here

module.exports = function(grunt){
  // https://github.com/avalade/grunt-coffee
  grunt.loadNpmTasks('grunt-coffee');
  // https://github.com/kahlil/grunt-compass
  grunt.loadNpmTasks('grunt-compass');
  // https://github.com/pifantastic/grunt-s3
  grunt.loadNpmTasks('grunt-s3');
  // https://github.com/heldr/grunt-smushit
  grunt.loadNpmTasks('grunt-smushit');

  grunt.initConfig({
    pkg: '<json:package.json>',

    // fetch AWS S3 credentials in another json file
    // name with underscore prefix or exclude in jekyll's config.yml 
    // otherwise this will end up being public!!!
    // aws: '<json:_grunt-aws.json>',
    // s3: {
    //   key: '<%= aws.key %>',
    //   secret: '<%= aws.secret %>',
    //   bucket: '<%= aws.bucket %>',
    //   access: 'public-read',
    //   gzip: true,
    //   upload: [
    //     {
    //       // upload search assets - get src filename from the min block below
    //       src: '<config:min.search.dest>',
    //       dest: 'assets/pstamsearch.js'
    //     },
    //     {
    //       // upload main js assets
    //       src: '<config:min.main.dest>',
    //       dest: 'assets/pstambuild.js'
    //     } 
    //     // etc
    //   ]
    // },
    // meta: {
    //   banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
    // },
    // smushit: {
    //   // recursively run through *.png, *.jpg in img/ dir and optimize
    //   path: { src: 'img' }
    // },
    // min: {
    //   main: {
    //     // minify and bundle several js files together 
    //     src: [
    //       '<banner:meta.banner>',
    //       '_jslibs/head.load.min.js',
    //       '_jslibs/foresight.js',
    //       'js/app.js'
    //       ],
    //     dest: 'js/pstambuild.js',
    //     separator: ';'
    //   },
    //   search: {
    //     // separately, put search-related js files together
    //     // to be async loaded only when search is used
    //     src: [
    //       '_jslibs/jquery.ba-hashchange.js',
    //       '_jslibs/jquery.swiftype.search.js'
    //     ],
    //     dest: 'js/pstamsearch.js',
    //     separator: ';'
    //   }
    // },
    coffee: {
      // compile one coffeescript file to js
      app: {
        src: ['coffee/app.coffee'],
        dest: 'js/',
        options: {
          bare: true
        }
      }
    },
    compass: {
      // compile Sass
      dev: {
        specify: 'style/screen.scss',
        dest: 'assets/',
        linecomments: false,
        forcecompile: true,
        outputstyle: 'compressed',
        require: [],
        debugsass: true,
        images: '/img',
        relativeassets: true
      }
    },
    watch: {
      // setup watch tasks. anytime a file is changed, run respective task
      coffee: {
        files: ['<config:coffee.app.src>'],
        tasks: 'js'
      },
      jslibs: {
        files: ['_jslibs/*.js'],
        tasks: 'js'
      },
      sass: {
        files: ['style/*'], 
        tasks: 'compass'
      }
    }
  });
  
  grunt.registerTask('default', 'compass js');
  grunt.registerTask('js', 'coffee min');
  grunt.registerTask('uploadjs', 'js s3');
};