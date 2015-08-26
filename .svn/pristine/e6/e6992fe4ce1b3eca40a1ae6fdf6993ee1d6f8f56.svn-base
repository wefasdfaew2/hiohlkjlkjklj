module.exports = function (grunt) {
    require('time-grunt')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //------------------ imports needed values from angular skin config --------------------------------------------
        import_angular_value: {
            default_options: {
                options: {
                    path: '../js/skins/<%=skinConfig%>.js',
                    modules: ['VBET5', 'CMS', 'CASINO']
                }
            }
        },
        //------------------ put all templates content into JS file (templateCache) ------------------------------------
        ngtemplates: {
            app: {
                cwd: '..',
                options: {
                    module: "vbet5",
                    htmlmin: {
                        collapseBooleanAttributes:      true,
                        collapseWhitespace:             true,
                        removeAttributeQuotes:          true,
                        removeComments:                 true, // Only if you don't use comment directives!
                        removeEmptyAttributes:          false,
                        removeRedundantAttributes:      false,
                        removeScriptTypeAttributes:     true,
                        removeStyleLinkTypeAttributes:  false
                    }
                },
                src: ["templates/**/*.html", "skins/<%=skin%>/templates/**/*.html"],
                dest: "templates.js"
            }
        },
        replace: {
            removeContextAttr: {
                options: {
                    patterns: [
                        {match: /\scontext=\\\"[^\\]*\\\"/g, replacement: '' }
                    ]
                },
                files: [
                    { src: ['./templates.js'], dest: './templates.js'}
                ]
            },
            //------------------  Create index.html for specific skin --------------------------------------------------
            createSkinIndexHtml: {
                options: {
                    patterns: [
                        {match: /<script\ssrc="js\/skins\/local\.js"/g, replacement: '<script src="js/skins/<%=skinConfig%>.js"'},
                        {match: /xdomain\.slaves\(\{\}\)/g, replacement: 'xdomain.slaves(<%=angularValue.VBET5.SkinConfig.xDomainSlaves%>)'},
                        {match: /<script\sid="bodyscript"><\/script>/g, replacement: '<%=angularValue.VBET5.SkinConfig.main.bodyScript%>'},
                        {match: /skinCssFileList/g, replacement: '<%=cssFilesArray%>'},
                        {match: /<!--skin\sjs\sfiles-->/g, replacement: '<%=sourceFiles%>'}
                    ]
                },
                files: [{src: ['../index.html'], dest: '../<%=skinConfig%>.html'}]
            },
            xDomainFrameUrl: {
                options: {
                    patterns: [
                        {match: /xdomain\.slaves\(\{\}\)/g, replacement: 'xdomain.slaves(<%=angularValue.VBET5.SkinConfig.xDomainSlaves%>)'}
                    ]
                },
                files: [{src: ['index.html'], dest: 'index.html'}]
            },
            configUrlPath: {
                options: {
                    patterns: [
                        {match: /data\-config\-url\-path=""/g, replacement: 'data-config-url-path="<%=configUrlPath%>"'}
                    ]
                },
                files: [{src: ['index.html'], dest: 'index.html'}]
            },
            bodyScript: {
                options: {
                    patterns: [
                        {match: /<script\sid="bodyscript"><\/script>/g, replacement: '<%=angularValue.VBET5.SkinConfig.main.bodyScript%>'}
                    ]
                },
                files: [{src: ['index.html'], dest: 'index.html'}]
            }
        },
        //------------------- Minify JS --------------------------------------------------------------------------------
        'closure-compiler': {
            frontend: {
                closurePath: '..', // compiler.jar has to be in 'build' directory
                js: [
//                    '../lib/angular/angular-animate.js',
                    '../lib/es5-shim.js',
                    '../lib/amplify.store.min.js',
                    '../lib/moment-with-langs.min.js',
                    '../lib/readable-range.js',
                    '../lib/xml2json.js',
                    '../lib/intro.min.js',
                    '../lib/script.js',
                    '../lib/autofill-event.js',//for fixing bug with auto-fill(https://github.com/angular/angular.js/issues/1460)
//                    '../lib/swfobject.js',
                    '../lib/analytics.js',
                    '../lib/modules/**/*.js',
                    '../js/main.js',
                    '../js/modules/vbet5/main.js',
                    '../js/modules/vbet5/config.js',
                    //'translations.js', // this will be created by replace:cleanTranslationsFile  task
                    '../js/modules/vbet5/routes.js',
                    '../js/modules/vbet5/services/*.js',
                    '../js/modules/vbet5/constants/*.js',
                    '../js/modules/vbet5/directives/*.js',
                    '../js/modules/vbet5/controllers/*.js',
                    '../js/modules/vbet5/filters/*.js',
                    '../js/modules/cms/main.js',
                    '../js/modules/cms/config.js',
                    '../js/modules/cms/services/*.js',
                    '../js/modules/cms/directives/*.js',
                    '../js/modules/cms/controllers/*.js',
                    '../js/modules/cms/filters/*.js',
                    '../js/modules/casino/main.js',
                    '../js/modules/casino/config.js',
                    '../js/modules/casino/controllers/*.js',
                    '../js/modules/casino/services/*.js',
                    '../js/modules/casino/directives/*.js',
                    '../js/skins/<%=skinConfig%>.js',
                    '../skins/<%=skinConfig%>/js/**/*.js',
                    'templates.js' //  created by ngtemplates task
                ],
                jsOutputFile: 'app.min.js',
                maxBuffer: 500,
                options: {
//                    compilation_level: 'ADVANCED_OPTIMIZATIONS',
                    language_in: 'ECMASCRIPT5_STRICT'
                }
            }
        },
        //---------------------- Strip all console logging from sources ------------------------------------------------
        strip : {
            main : {
                src : 'app.min.js',
                options : {
                    nodes : ['console.log', 'console.warn', 'debugger'],
                    inline : true
                }
            }
        },
        //---------------------- Process index.html (replace srcs and hrefs with  minified/cdn ones) -------------------
        processhtml: {
            options: {
                data: {
                    version: '<%= pkg.version %>',
                    buildDate: '<%= grunt.template.today("yyyymmdd.hhMMss") %>',
                    svnrev: '<%=svninfo.rev%>',
                    skin: '<%= skin %>',
                    rtl: '<%= rtl %>',
                    title: '<%= metaTags.title.eng %>',
                    keywords: '<%= metaTags.keywords.eng %>',
                    description: '<%= metaTags.description.eng %>'
                }
            },
            dist: {
                files: {
                    'index.html': ['../index.html'],
                    'fbapplanding.html': ['../fbapplanding.html']
                }
            }
        },
        //---------------------- Copy all needed files to build/app/<skin> directory for deployment ---------------------------
        copy: {
            main: {
                files: [
                    {expand: true, src: ['app.min.js', 'index.html', 'conf.json'], dest: 'app/<%=skin%>/'},
                    {expand: true, src: ['main.min.css'], dest: 'app/<%=skin%>/css'},
                    {expand: true, src: ['skin.min.css'], dest: 'app/<%=skin%>/skins/<%=skin%>/css'},
                    {expand: true, src: ['../skins/<%=skin%>/**'], dest: 'app/<%=skin%>/skins/'},
                    {expand: true, src: ['../js/partnerinit.js'], dest: 'app/<%=skin%>/partnerinit.js'},
                    {expand: true, flatten: true, src: ['languages_tmp/*.json'], dest: 'app/<%=skin%>/languages'},
                    {expand: true, src: ['../images/**'], dest: 'app/<%=skin%>/images'},
                    {expand: true, src: ['../swf/**'], dest: 'app/<%=skin%>/swf'},
                    {expand: true, src: ['../audio/**'], dest: 'app/<%=skin%>/audio'},
                    {expand: true, src: ['../fonts/**'], dest: 'app/<%=skin%>/fonts'},
                    {expand: false, src: ['../skins/<%=skin%>/favicon.ico'], dest: 'app/<%=skin%>/favicon.ico'},
                    {expand: true, flatten: true, src: ['../skins/<%=skin%>/files/**'], dest: 'app/<%=skin%>'},
                    {expand: true, flatten: true, src: ['../css/fonts/*.*'], dest: 'app/<%=skin%>/css/fonts/'},
                    {expand: true, flatten: true, src: ['../skins/<%=skin%>/css/fonts/*.css'], dest: 'app/<%=skin%>/css/fonts'}
                ]
            },
            devtranslations: { //copies generated translation json files to languages folder (used in dev environment)
                files: [
                    {expand: true, flatten: true, src: ['languages_tmp/*.json'], dest: '../languages'}
                ]
            }
        },
        downloadfile: {}, //options will be set by  'load-translations' task
        //---------------------- Generate documentation ----------------------------------------------------------------
        docular: {
            groups: [
                {
                    groupTitle: 'VBET5',
                    groupId: 'VBET5',
                    groupIcon: 'icon-book',
                    sections : [
                        {
                            id: "main",
                            title: "VBET5 AngularJS app documentation",
                            scripts: [ "../js"]
                        }
                    ]
                }
            ],
//            baseUrl: 'http://127.0.0.1/docs',
            showDocularDocs: true,
            showAngularDocs: true,
            docular_webapp_target : "docs",
            docular_partial_home: 'docs.html'
        },
        //---------------------- remove temporary files-----------------------------------------------------------------
        clean: {
            'languages-temp': ['languages_tmp/*.*'],
            'build-temp': ['templates.js', 'translations.js', 'app.min.js.report.txt', 'app.min.js', 'index.html', 'main.min.css', 'skin.min.css', 'app/<%=skin%>/skins/<%=skin%>/css/main.css', 'app/<%=skin%>/css/transitions.css', '<%=skin%>_translations.js', 'conf.json', 'tmp'],
            'news-delta': ['seo/result/news_delta/*.*']
        },
        //---------------------- Extraction of translateable strings and PO files generation ---------------------------
        shell: {
            extractTranslations: {
                options: { stdout: true, failOnError: true },
                command: 'php translations/extract.php ' + (grunt.option('lang') || '')
            },
            generateTranslation:  {
                options: { stdout: true, failOnError: true },
                command: 'php translations/generate.php && mv translations/translations.js ../js/modules/vbet5/'
            },
            generateTranslationSeparate:  {
                options: { stdout: true, failOnError: true },
                command: 'php translations/generate.php separate && mv translations/*.json languages_tmp/'
            },
            generateSkinTranslation:  {
                options: { stdout: true, failOnError: true },
                command: 'php translations/generate.php --skin=<%=skinConfig%> && mv translations/translations.js <%=skin%>_translations.js'
            },
            generateSkinTranslationSeparate:  {
                options: { stdout: true, failOnError: true },
                command: 'php translations/generate.php --skin=<%=skinConfig%> separate && mv translations/*.json languages_tmp/'
            },
            showUntranslated: {
                options: { stdout: true, failOnError: true },
                command: 'php translations/generate.php showNotTranslated ' + (grunt.option('lang') || '')
            },
            makeGzipFiles: {  // nginx will serve available gz files instead of doing gzip compression on every request
                options: { stdout: true, failOnError: false },
                command: 'gzip -c app/<%=skin%>/app.min.js > app/<%=skin%>/app.min.js.gz; gzip -c app/<%=skin%>/css/main.min.css > app/<%=skin%>/css/main.min.css.gz;'
            }
        },
        //---------------------- Minify CSS  ---------------------------------------------------------------------------
        cssmin: { }, //config  will be set by load-css-filelist task

        //---------------------- Deploy to SFTP server (auth file with credentials is not in SVN)-----------------------
        'sftp-deploy': {
            all: {
                auth: {host: '<%=deployServerHost%>', port: 22, authKey: '<%=deployServerKey%>' },
                src: './app/<%=skin%>',
                dest: '<%=deployServerPath%>',
                exclusions: ['./app/<%=skin%>/images/flag', './app/<%=skin%>/index.html'],
                concurrency: 1
            },
            'js-css': {
                auth: {host: '<%=deployServerHost%>', port: 22, authKey: '<%=deployServerKey%>' },
                src: './app/<%=skin%>',
                dest: '<%=deployServerPath%>',
                exclusions: ['./app/<%=skin%>/images', './app/<%=skin%>/skins/<%=skin%>/images', './app/<%=skin%>/skins/<%=skin%>/fonts', './app/<%=skin%>/swf', './app/<%=skin%>/audio', './app/<%=skin%>/fonts', './app/<%=skin%>/templates', './**/*.scss', './**/*.ico', './app/<%=skin%>/index.html']
            },
            'conf': {
                auth: {host: '<%=deployServerHost%>', port: 22, authKey: '<%=deployServerKey%>' },
                src: "./",
                dest: '<%=deployServerPath%>',
                include: ["conf.json"]
            },
            'index': {  // index has to be uploaded separately, after all the others are uploaded, no to request old(not updated files) with new urls to avoid caching them
                auth: {host: '<%=deployServerHost%>', port: 22, authKey: '<%=deployServerKey%>' },
                src: "./app/<%=skin%>/",
                dest: '<%=deployServerPath%>',
                include: ["index.html"]
            },
            'translations': {
                auth: {host: '<%=deployServerHost%>', port: 22, authKey: '<%=deployServerKey%>' },
                src: './app/<%=skin%>/languages',
                dest: '<%=deployServerPath%>/languages'
            },
            'seo': {
                auth: {host: '<%=deployServerHost%>', port: 22, authKey: '<%=deployServerKey%>' },
                src: './seo/result/',
                dest: '<%=deployServerPath%>',
                exclusions : ['./seo/result/news_delta/']
            },
            'seo-news-delta': {
                auth: {host: '<%=deployServerHost%>', port: 22, authKey: '<%=deployServerKey%>' },
                src: './seo/result/news_delta/',
                dest: '<%=deployServerPath%>' + '/news',
                exclusions : []
            },
            'rollback': {
                auth: {host: '<%=deployServerHost%>', port: 22, authKey: '<%=deployServerKey%>' },
                src: '../../builds/<%=buildnumber%>/archive/build/app/<%=skin%>',
                dest: '<%=deployServerPath%>',
                exclusions: ['../../builds/<%=buildnumber%>/archive/build/app/<%=skin%>/images/flag']
            }
        },
        plato: {
            task: {
                files: {
                    'report/': ['../js/**/*.js']
                }
            }
        },
        execute: {
            'seo-all': {
                options: {
                    args: ['--skin=<%=skinConfig%>']
                },
                src: ['./seo/generate.js']
            },
            'seo-update-news': {
                options: {
                    args: ['update-news', '--skin=<%=skinConfig%>']
                },
                src: ['./seo/generate.js']
            }
        },
        spritepacker: {
            flags: {
                options: {
                    template: '../css/flags.sprite.tpl',
                    destCss: '../css/flags.css',
                    baseUrl: '../images/',
                    padding: 5
                },
                files: {
                    '../images/flags.png': ['../images/flag/*.png']
                }
            }
        }
    });

    grunt.config.set('translationsJsonUrl', grunt.option('translations-url') || 'http://web.betconstruct.int/translations/app/get_language/');
    grunt.config.set('configUrlPath', grunt.option('config-url-path') || '');
    grunt.config.set('skin', grunt.option('skin') || 'vbet.com');
    grunt.config.set('skinConfig', grunt.option('skin-config') || grunt.config.get('skin'));
    if (grunt.config.get('skin') === 'vivarobet.am') { //ugly special case
        grunt.config.set('skin', 'vbet.com');
        grunt.config.set('skinConfig', 'vivarobet.am');
    }
    grunt.config.set('buildnumber', grunt.option('buildnumber'));
    grunt.config.set('deployServerPath', grunt.option('deploy-path') || {
        'vbet.com': '/var/www/html/ice2014.vbet.com',
        'vbet.com.staging': '/var/www/html/staging/vbet.com',
        'vbet.com.newbackend': '/var/www/html/staging/vbet.com.new',
        'testskin.com': '/var/www/html/staging/testskin.com',
        'free.vbet.com': '/var/www/html/free.vbet.com',
        'au.vbet.com': '/var/www/html/au.vbet.com',
        'vivarobet.am': '/var/www/html/next.vivarobet.am',
        'free.vivarobet.am': '/var/www/html/free.vivarobet.am',
        'vivaropoker.am': '/var/www/html/next.vivaropoker.am',
        'bonanzawin.com': '/var/www/html/sportsbook.bonanzawin.com',
        'betkurus.com': '/var/www/html/www.betkurus.com',
        '90dakika.com': '/var/www/html/sportsbook.91dakika.com',
        'ubc365.ng': '/var/www/html/www.ubc365.ng',
        'bt848.com': '/var/www/html/www.2winbet.gr',
        'megabet.am': '/var/www/html/www.megabet.am',
        'tbilisibet.com': '/var/www/html/next.tbilisibet.com',
        'regularbet.com': '/var/www/html/www.regularbet.com',
        '6starr.asia': '/var/www/html/www.6starr.asia',
        '666bet.com': '/var/www/html/sportsbook.666bet.gammatrix-dev.net',
        'casino.mx': '/var/www/html/sportsbook.casinomx.viralcasino.net',
        'playuk.com': '/var/www/html/sportsbook.playuk.viralcasino.net',
        'thebetabet.com': '/var/www/html/www.thebetabet.com',
        'betdirect77.com': '/var/www/html/www.betdirect77.com',
        'victoryroom.com': '/var/www/html/www.victoryroom.com',
        'bets777.com': '/var/www/html/sportsbook.bets777.com',
        'eblon.com': '/var/www/html/www.eblon.com',
        'ibetup.com': '/var/www/html/www.ibetup.com/test',
        'msl.ua': '/var/www/html/slpp.msl.ua',
        'sportybet.com': '/var/www/html/www.sportybet.com',
        'sportsbook.finnplay.com': '/var/www/html/sportsbook.finnplay.com',
        'goldenpalace.be': '/var/www/html/sportsbook.goldenpalace.be',
        'parasino5.com': '/var/www/html/sportsbook.parasino5.com',
        'betdad.com': '/var/www/html/www.betdad.com',
        'exbinog.com': '/var/www/html/www.exbinog.com',
        'ucraftbet.com': '/var/www/html/ice2014.vbet.com/ucraftbet',
        'terminal.melbet.com': '/var/www/html/terminal.melbet.com',
        'terminal.vbet.com': '/var/www/html/terminal.vbet.com',
        'terminal.starbet.msk.ru': '/var/www/html/terminal.starbet.msk.ru',
        'metroplay.com': '/var/www/html/sportsbook.metroplay.com',
        'orakulas.lt': '/var/www/html/sportsbook.orakulas.lt',
        'terminal.arenabet24.com': '/var/www/html/terminal.arenabet24.com'
    }[grunt.config.get('skinConfig')]);

    grunt.config.set('deployServerKey', grunt.option('deploy-key') || {
        'terminal.melbet.com': 'server2',
        'vbet.com.staging': 'staging',
        'vbet.com.newbackend': 'staging',
        'testskin.com': 'staging'
    }[grunt.config.get('skinConfig')] || 'ice2014');

    grunt.config.set('deployServerHost', grunt.option('deploy-host') || {
        'terminal.melbet.com': '192.168.77.66',
        'metroplay.com': '212.146.123.170',
        'vivarobet.am': '192.168.253.224',
        'vbet.com.staging': 'wordpress.betconstruct.int',
        'vbet.com.newbackend': 'wordpress.betconstruct.int',
        'testskin.com': 'wordpress.betconstruct.int'
    }[grunt.config.get('skinConfig')] || 'misc-hz2.betconstruct.int');

    grunt.config.set('rtl',  grunt.option('rtl')  || false);  //must be set to true if skin have RTL languages
    grunt.config.set('metaTags', grunt.file.readJSON('./metainfo.json')[grunt.config.get('skinConfig')] || {title: {eng: ""}, description: {eng: ""}, keywords: {eng: ""}});

    // Load the plugins
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-closure-compiler');
    grunt.loadNpmTasks("grunt-strip");
    grunt.loadNpmTasks('grunt-svninfo');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-docular');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-sftp-deploy-i');
//    grunt.loadNpmTasks('grunt-inline-angular-templates');
    grunt.loadNpmTasks('grunt-plato');
    grunt.loadNpmTasks('grunt-execute');
    grunt.loadNpmTasks('import-angular-value');
    grunt.loadNpmTasks('grunt-sprite-packer');
    grunt.loadNpmTasks('grunt-downloadfile');

    // add-sass --content = 'CssText'  This task will add given css text to all skins skin.scss files
    grunt.registerTask('add-sass', function () {

        var pattern = '../skins/**/sass/skin.scss',
            files = grunt.file.expand(pattern),
            cssText = grunt.option('content');
        files.forEach(function (item) {
            var currentContent = grunt.file.read(item);
            var finalOutput = currentContent + '\n' + cssText;
            grunt.file.write(item, finalOutput);

        });
    });

    grunt.registerTask('load-css-filelist', 'loads css files list for skin', function () {
        var cssFiles = grunt.config.get('angularValue').VBET5.SkinConfig.main.cssFiles  ||
            ['soccer-control.css', 'tennis-control.css', 'games-animations-classic.css', 'main.css', 'media.css', 'flags.css',  'transitions.css', 'lib/introjs.min.css', 'lib/rg-slider.min.css',  'lib/rzslider.min.css', 'lib/barcode.css'];
        grunt.config.set("cssFilesArray", JSON.stringify(cssFiles).replace(/\"/g, "'")); //this stores list in a value to use for generating skin launcher html
        cssFiles = cssFiles.map(function (path) { return path = '../css/' + path; });
        grunt.config.set('cssmin',
            {
                combine: {
                    files: {
                        'main.min.css': cssFiles,
                        'skin.min.css': [ '../skins/<%=skin%>/css/main.css', '../skins/<%=skin%>/css/skin.css']
                    }
                }
            });
    });


    grunt.registerTask('load-language-filelist', 'loads language files list for skin', function () {
        var files = [];
        var config = grunt.config.get('angularValue');
        if (config.VBET5.SkinConfig.main.availableLanguages === undefined) {
            grunt.fail.fatal("availableLanguages not set in skin config, cannot get language list for skin");
        }
        console.log("language files to be downloaded:");
        Object.keys(config.VBET5.SkinConfig.main.availableLanguages).forEach(function (lang) {
            if (lang[0] === '@') {
                return;
            }
            var url = grunt.config.get('translationsJsonUrl') + grunt.config.get('skinConfig') + '/languages/' + lang + '.json';
            files.push({url: url, dest: 'languages_tmp'});
            console.log(url);
        });
        grunt.config.set('downloadfile', {files: files});
    });



    grunt.registerTask('get-src-list', 'test', function () {
        var html = "";
        grunt.file.expand({matchBase: true,  filter: 'isFile'}, ['../skins/' + grunt.option('skin') + '/js/**/*.js']).forEach(function (file) {
            html += "<script src='" + file.replace('../skins', 'skins') + "'></script>\n";
        });
        grunt.config.set('sourceFiles', html);
        console.log("skin js files:\n", html);
    });

    grunt.registerTask('create-conf', 'creates conf.json', function () {
        var conf = grunt.config.get('angularValue');
        if (conf && conf.VBET5 && conf.VBET5.SkinConfig) {
            grunt.file.write("conf.json", JSON.stringify(conf.VBET5.SkinConfig, null, 4));
            console.log("conf.json created");
        } else {
            console.warn("conf.json not created");
        }
    });


    grunt.registerTask('dev',                          ['svninfo', 'import_angular_value', 'create-conf', 'load-css-filelist', 'ngtemplates', 'load-translations', 'replace:removeContextAttr', 'closure-compiler', 'cssmin', 'processhtml', 'replace:xDomainFrameUrl', 'replace:bodyScript',  'copy', 'clean:build-temp']);
    //grunt.registerTask('load-translations',            ['shell:generateSkinTranslationSeparate']); //old way, from .po
    grunt.registerTask('load-translations',            ['clean:languages-temp', 'load-language-filelist', 'downloadfile']);  // new way, from translation tool
    grunt.registerTask('debug',                        ['svninfo', 'import_angular_value', 'create-conf', 'load-css-filelist', 'ngtemplates', 'load-translations', 'closure-compiler', 'cssmin', 'processhtml', 'replace:xDomainFrameUrl', 'replace:bodyScript', 'copy:main']);
//    grunt.registerTask('default-inline-templates',     ['closure-compiler', 'processhtml', 'strip', 'inline_angular_templates', 'copy', 'clean:build-temp']);
    grunt.registerTask('default',                      ['svninfo', 'import_angular_value', 'create-conf', 'load-css-filelist', 'ngtemplates', 'load-translations', 'replace:removeContextAttr', 'closure-compiler', 'cssmin', 'strip', 'processhtml', 'replace:xDomainFrameUrl', 'replace:bodyScript',  'copy:main', 'clean:build-temp']);

    // ----------------------------------------   DEPRECATED:  we're using translations tool for translations
    //----------- Translations generation. Requires PHP 5.4 or higher.    to generate PO file for new language run "grunt extractTrans --lang=<language>".
    grunt.registerTask('extractTrans',                 ['shell:extractTranslations']);  // will generate PO files from JS/HTML sources. Usage:  grunt extractTrans --lang=<language>
    grunt.registerTask('generateTrans',                ['shell:generateTranslationSeparate', 'copy:devtranslations']);  // will generate translation JS file from all PO files and copy it to 'languages' folder
    grunt.registerTask('generateTransSeparate',        ['shell:generateTranslationSeparate']);  // will generate translations in separate json files
    grunt.registerTask('showUnTranslated',             ['shell:showUntranslated']);  // will show not translated strings in specified language. Usage grunt showUnTranslated --lang=<language> if lang is not specified, for all languages

    // deployment tasks.  this needs .ftppass file with auth data in current directory, see https://github.com/thrashr888/grunt-sftp-deploy#authentication-parameters for details
    grunt.registerTask('deploy',                        ['sftp-deploy:js-css', 'sftp-deploy:index']);   // will deploy only html/js/css
    grunt.registerTask('deploy-translations',           ['import_angular_value', 'load-translations', 'copy', 'sftp-deploy:translations']);
    grunt.registerTask('deploy-all',                    ['sftp-deploy:all', 'sftp-deploy:index']);      // will deploy everything, including images, fonts, swf
    grunt.registerTask('rollback',                      ['sftp-deploy:rollback']);

    grunt.registerTask('build-and-deploy',              ['default', 'shell:makeGzipFiles', 'deploy']);
    grunt.registerTask('build-and-deploy-all',          ['default', 'shell:makeGzipFiles', 'deploy-all']);
    grunt.registerTask('deploy-config',                 ['import_angular_value', 'create-conf', 'sftp-deploy:conf', 'clean:build-temp']);

    grunt.registerTask('update-seo',                  ['execute:seo-all', 'sftp-deploy:seo', 'clean:news-delta']);
    grunt.registerTask('update-seo-news',             ['execute:seo-update-news', 'sftp-deploy:seo-news-delta', 'clean:news-delta']);

    // will create an html file to launch app with specified skin config(needed for development).Usage example:   grunt create-skin-launcher --skin=vbet.com    (this will create vbet.com.html file)
    grunt.registerTask('create-skin-launcher',                    ['import_angular_value', 'load-css-filelist', 'get-src-list', 'replace:createSkinIndexHtml']);


};