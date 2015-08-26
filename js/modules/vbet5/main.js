/**
 * @ngdoc module
 * @name vbet5.module:vbet5
 * @description
 *
 * Main module working with swarm
 */
var VBET5 = angular.module('vbet5', ['vbet5.betting', 'ngRoute', 'ngAnimate', 'truncate', 'smoothScroll', 'liveChat', 'monospaced.qrcode', 'rangeSlider', 'barcodeGenerator', 'ipCookie', 'ui.bootstrap', 'rzModule' , 'ui.router']);


/**
 * @ngdoc module
 * @name betting.module:vbet5.betting
 * @description
 *
 * Betting module
 */
var BettingModule = angular.module('vbet5.betting', []);

/**
 * @name vbet5
 * @id vbet5
 * @description #Bootstrap
 * makes Config.main and Config.env available at root scope
 *
 * defines getTemplate function which returns template path(needed to override templates in skins if needed)
 */
angular.module('vbet5').run(['$rootScope', '$location', '$routeParams', '$timeout', '$window', 'Utils', 'Config', 'SkinConfig', 'Storage', 'analytics', 'UserAgent', 'DomHelper', 'liveChat', 'partner', 'RegConfig', 'ipCookie', 'RuntimeConfig', 'Zergling', 'Tracking', 'Moment',
    function ($rootScope, $location, $routeParams, $timeout, $window, Utils, Config, SkinConfig, Storage, analytics, UserAgent, DomHelper, liveChat, partner, RegConfig, ipCookie, RuntimeConfig, Zergling, Tracking, Moment) {
        'use strict';
        Utils.MergeRecursive(Config, SkinConfig);
        if (SkinConfig.regConfig) {
            Utils.MergeRecursive(RegConfig, SkinConfig.regConfig);
        }
        Utils.MergeRecursive(Config, RuntimeConfig);
        if (Config.main.localStorageKeyNamePrefix) {
            Storage.setKeyNamePrefix(Config.main.localStorageKeyNamePrefix);
        }

        Zergling.init();
        var lang = $location.search().lang || ipCookie('lang') || Storage.get('lang');
        if (lang && Config.main.availableLanguages[lang] !== undefined) {
            Config.env.lang = lang;
            Moment.setLang(lang);
        }

        if ($location.search().pid && (Config.main.site_id === null || Config.main.allowSiteIdOverride)) {
            Config.main.site_id = $location.search().pid;
        }
        if (Config.swarm.sendTerminalIdlInRequestSession) {
            Config.main.terminalId = $location.search().tid;
        }
        if (Config.main.sportsClassicLayout) {
            Config.main.sportsLayout = "classic"; //legacy support
        }
        if (Config.main.enableSportsbookLayoutSwitcher) {
            if (Storage.get('sportsBookLayout') !== undefined) {
                Config.main.sportsLayout = Storage.get('sportsBookLayout');
            } else if ($location.search().classic) {
                Config.main.sportsLayout = "classic";
            }
            //Config.env.showSportsbookToolTip = !Storage.get('dontShowLayoutSwitcherHint');
        }
        $rootScope.domainClass = $window.location.hostname.replace(/[\.\-]/g, '');

        if (Config.main.liveChat) {
            if (Config.main.liveChat.perLanguage && Config.main.liveChat.perLanguage[Config.env.lang]) {
                Config.main.liveChat = Config.main.liveChat.perLanguage[Config.env.lang];
            }
            liveChat.init(Config.main.liveChat);
        }

        function redirectIfNeeded() {
            if (Config.main.initialUrl  && $location.path() === '/') {
                $location.path(Config.main.initialUrl.path).search(Config.main.initialUrl.params);
            } else if (Config.main.enableLandingPage && $location.path() === '/' && !Storage.get('lastLoggedInUsername')) {
                $location.path('/landing');
            }
        }

        $timeout(redirectIfNeeded, 100);
        analytics.init();

        // make these available to all scopes
        $rootScope.conf = Config.main;
        $rootScope.poker = Config.poker;
        $rootScope.env = Config.env;
        $rootScope.$location = $location;
        $rootScope.$routeParams = $routeParams;
        $rootScope.print = function print() {
            $window.print();
        };
        $rootScope.myGames = $rootScope.myGames || [];
        $rootScope.broadcast = function (msg, args) {
            $rootScope.$broadcast(msg, args);
        };
        /**
         * @description returns template path(needed to override templates in skins if needed)
         * @param {string} path template path
         * @returns {string} skin template path
         */
        $rootScope.getTemplate = function getTemplate(path) {
            if (Config.customTemplates && Config.customTemplates.indexOf(path.substr(10)) !== -1) { // substr's "10" param is the length of "templates/"
                return "skins/" + Config.main.skin + "/" + path;
            }
            return path;
        };

        partner.init(); //init partner stuff  (for cases when we're opened in iframe and Gaspars sportsbook)

        UserAgent.ifTablet(function () {
            if (!$rootScope.conf.redirectOnTablets) {
                return;
            }
            $window.location = $rootScope.conf.redirectOnTablets + $window.location.hash;
        });
        $rootScope.userOS = UserAgent.getOS();

        if (DomHelper.getWindowSize().width >= Config.main.wideScreenModeWidth) {
            $rootScope.wideScreenMode = true;
        }

        $rootScope.setTitle = function setTitle(title) {
            $rootScope.siteTitle = title ? title + ' @ ' : '';
        };


        if ($location.search().btag) {
            Storage.set('promo_code', $location.search().btag, Config.main.registration.promoCodeLifetime);
        }

        Tracking.init();
        Tracking.event('NUV');

        /**
         *
         * @param {string} moduleName
         * @description checks if module is enabled from config. If not, redirects to homepage
         */
        $rootScope.checkIfEnabled = function (moduleName) {
            if (Config.main[moduleName + 'Enabled'] !== true) {
                console.log(moduleName, ' disabled');
                $location.path("/");
            }
        };


    }]);
