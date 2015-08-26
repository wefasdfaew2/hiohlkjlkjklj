/* global VBET5 */
/**
 * @ngdoc controller
 * @name vbet5.controller:mainHeaderCtrl
 * @description
 * Main header controller
 */
VBET5.controller('mainHeaderCtrl', ['$rootScope', '$scope', '$timeout', '$interval', '$filter', '$route', '$q', '$window', '$location', '$document', 'Geoip', 'GeoIPLangSwitch', 'Config', 'Zergling', 'Storage', 'DomHelper', 'Utils', 'CasinoUtils', 'Intro', 'smoothScroll', 'Translator', 'analytics', 'AuthData', 'CConfig', 'casinodata', 'liveChat', 'GameInfo', 'ipCookie', 'partner', function ($rootScope, $scope, $timeout, $interval, $filter, $route, $q, $window, $location, $document, Geoip, GeoIPLangSwitch, Config, Zergling, Storage, DomHelper, Utils, CasinoUtils, Intro, smoothScroll, Translator, analytics, AuthData, CConfig, casinodata, liveChat, GameInfo, ipCookie, partner) {
    'use strict';
    var intergratedHtmlHelperAvailable = null;
    $scope.env.showSignInForm = false;
    $scope.env.showRegistrationForm = false;
    $scope.timezonesExpanded = false;

    $scope.topMenuItemsCount = ['sportEnabled', 'casinoEnabled', 'pokerEnabled', 'skillgamesEnabled', 'poolBettingEnabled', 'liveDealerEnabled', 'financialsEnabled']
                                .reduce(function (count, current) { return Config.main[current] ? count + 1 : count; }, 0);

    function setCurrentPath() {
        $rootScope.currentPath = $location.path().split("/").slice(0, 2).join("/");
    }
    setCurrentPath();
    $rootScope.$on('$locationChangeSuccess', setCurrentPath);

    var pathTypes = {
        'casino': ['/casino', '/games', '/livedealer', '/keno', '/fantasy', '/ogwil', '/jackpot', '/financials', '/backgammon', '/belote'],
        'sport': ['/sport', '/freebet', '/poolbetting', '/livecalendar', '/results', '/virtualsports', '/overview', '/multiview'],
        'poker': ['/poker']
    };
    pathTypes[Config.main.homepagePageType].push('/');

    function isInCasino() {
        return pathTypes.casino.indexOf($rootScope.currentPath) !== -1;
    }
    function isInSports() {
        return pathTypes.sport.indexOf($rootScope.currentPath) !== -1;
    }
    function isInPoker() {
        return pathTypes.poker.indexOf($rootScope.currentPath) !== -1;
    }
    function currentPageHasSubHeader() {
        return Config.main.enableSubHeader && isInSports() && $rootScope.currentPath !== '/';
    }

    $rootScope.isInCasino = isInCasino;
    $rootScope.isInSports = isInSports;
    $rootScope.isInPoker = isInPoker;
    $rootScope.currentPageHasSubHeader = currentPageHasSubHeader;

    $rootScope.geoDataAvailable =  $rootScope.geoDataAvailable || Geoip.getGeoData();

    $rootScope.geoDataAvailable.then(
        function (data) {
            $rootScope.geoCountryInfo = data;
        },
        function () {
            $rootScope.geoCountryInfo = false;
        }
    );

    $rootScope.casinoEnabled = $rootScope.conf.casinoEnabled || $rootScope.conf.liveDealerEnabled || $rootScope.conf.skillgamesEnabled || $rootScope.conf.financialsEnabled || $rootScope.conf.fantasyEnabled;
    $scope.GeoIPLangSwitch = GeoIPLangSwitch;

    /**
     * The huge top menu objects array
     */
    var topMenu = [
        {
            name: 'news',
            displayName : Translator.get("News"),
            href: "#/news",
            click: null,
            classObject: {'active': false},
            staticClass: "menu-live",
            showCondition: Config.main.enableNewsLinkInMenu
        },
        {
            name: 'livemodule-live',
            displayName : Translator.get("Live"),
            click: function () { $scope.switchIntegratedTo('live'); },
            showCondition: Config.main.liveModule.enabled
        },
        {
            name: 'livemodule-sport',
            displayName : Translator.get("Sport"),
            click: function () { $scope.switchIntegratedTo('prematch'); },
            showCondition: Config.main.liveModule.enabled
        },
        {
            name: 'live',
            displayName : Translator.get("Live"),
            href: "#/sport/?type=1",
            click: function () { $rootScope.topMenuDropDown = false; $scope.closeSlider(); $scope.setGamesType(true); $scope.goToTop(); },
            classObject: {'active': false},
            staticClass: "menu-live",
            showCondition: Config.main.sportEnabled
        },
        {
            name: 'sport',
            displayName : Translator.get("Sport"),
            href: "#/sport/?type=0",
            click: function () { $rootScope.topMenuDropDown = false; $scope.closeSlider(); $scope.setGamesType(false);  $scope.goToTop();$scope.setDefaultIfVirtual(); },
            classObject: {'active': false},
            staticClass: "menu-live",
            showCondition: Config.main.sportEnabled
        },
        {
            name: 'livecalendar',
            displayName : Translator.get("Live calendar"),
            href: "#/livecalendar",
            click: function () { $rootScope.topMenuDropDown = false; $scope.closeSlider(); $scope.goToTop(); },
            classObject: {'active': false},
            staticClass: "menu-livecalendar",
            showCondition: Config.main.liveCalendarEnabled
        },
        {
            name: 'virtual-sports',
            displayName : Translator.get("Virtual sports"),
            href: Config.main.sportsLayout !== 'asian' && Config.main.sportsLayout !== 'external' ? "#/sport/?type=0&sport=-3" : '#/virtualsports',
            click: function () { $rootScope.topMenuDropDown = false; $scope.closeSlider(); $scope.goToTop(); if (Config.main.sportsLayout !== 'asian' && Config.main.sportsLayout !== 'external') {$scope.setGamesType(false); $location.search('sport', -3);  $timeout(function () { $route.reload(); }, 100);}},
            classObject: {'active': false, 'new-top-nav': Config.main.newMenuItems.virtualSport },
            staticClass: "casino fantasy",
            showCondition: Config.main.virtualSportEnabledInTopMenu
        },
        {
            name: 'poolbetting',
            specialCase: 'poolbetting',
            displayName : Translator.get("Pool Betting"),
            href: "#/poolbetting",
            click: function () { $rootScope.topMenuDropDown = false; $scope.closeSlider(); $scope.goToTop(); },
            classObject: {'active': false, 'new-top-nav': Config.main.newMenuItems.poolBetting },
            staticClass: "poolbetting-menu-item",
            showCondition: Config.main.poolBettingEnabled
        },
        {
            name: 'virtual-betting',
            displayName : Translator.get("Virtual Betting"),
            href: Config.main.virtualBettingUrl,
            click: function () { $rootScope.topMenuDropDown = false; $scope.closeSlider(); $scope.goToTop(); $scope.goToVirtualBetting(); },
            classObject: {'active': false, 'new-top-nav': Config.main.newMenuItems.virtualBetting},
            staticClass: "casino fantasy",
            showCondition: Config.main.virtualBettingEnabledInTopMenu
        },
        {
            name: 'belote',
            displayName : Translator.get("Belote"),
            href: Config.belote.redirectOnInstantPlay ? Config.belote.instantPlayLink : "#/belote",
            click: function () { $rootScope.topMenuDropDown = false; $scope.closeSlider(); $scope.goToTop(); },
            classObject: {'active': false, 'new-top-nav': Config.main.newMenuItems.belote},
            staticClass: "games",
            showCondition: Config.main.beloteEnabledInTopMenu,
            target: Config.belote.redirectOnInstantPlay ? Config.belote.instantPlayTarget : "_self"
        },
        {
            name: 'backgammon',
            displayName : Translator.get("Backgammon"),
            href: Config.backgammon.redirectOnInstantPlay ? Config.backgammon.instantPlayLink : "#/backgammon",
            click: function () { $rootScope.topMenuDropDown = false; $scope.closeSlider(); $scope.goToTop(); },
            classObject: {'active': false, 'new-top-nav': Config.main.newMenuItems.backgammon},
            staticClass: "games",
            showCondition: Config.main.backGammonEnabledInTopMenu,
            target: Config.backgammon.redirectOnInstantPlay ? "_blank" : "_self"
        },
        {
            name: 'casino',
            displayName : Translator.get("Casino"),
            href: "#/casino",
            click: function () { $rootScope.topMenuDropDown = false; $scope.closeSlider(); $scope.goToTop(); },
            classObject: {'active': false, 'new-top-nav': Config.main.newMenuItems.casino},
            staticClass: "games",
            showCondition: Config.main.casinoEnabled
        },
        {
            name: 'poker',
            displayName : Translator.get("Poker"),
            href: Config.poker.redirectOnInstantPlay ? Config.poker.instantPlayLink : "#/poker",
            click: function () { $rootScope.topMenuDropDown = false; $scope.closeSlider(); $scope.goToTop(); },
            classObject: {'active': false, 'new-top-nav': Config.main.newMenuItems.poker},
            staticClass: "poker",
            showCondition: Config.main.pokerEnabled,
            target: Config.poker.redirectOnInstantPlay ? "_blank" : "_self"
        },
        {
            name: 'livedealer',
            displayName : Translator.get("Live casino"),
            href: "#/livedealer",
            click: function () { $rootScope.topMenuDropDown = false; $scope.closeSlider(); $scope.goToTop(); },
            classObject: {'active': false, 'new-top-nav': Config.main.newMenuItems.liveCasino},
            staticClass: "livecasino",
            showCondition: Config.main.liveDealerEnabled
        },
        {
            name: 'keno',
            displayName : Translator.get("Keno"),
            href: "#/keno",
            click: function () { $rootScope.topMenuDropDown = false; $scope.closeSlider(); $scope.goToTop(); },
            classObject: {'active': false, 'new-top-nav': Config.main.newMenuItems.keno},
            staticClass: "keno",
            showCondition: Config.main.kenoEnabled
        },
        {
            name: 'games',
            displayName : Translator.get("Games"),
            href: "#/games",
            click: function () { $rootScope.topMenuDropDown = false; $scope.closeSlider(); $scope.goToTop(); $scope.fromToGames = 'Games'; },
            classObject: {'active': false, 'new-top-nav': Config.main.newMenuItems.games},
            staticClass: "games",
            showCondition: Config.main.skillgamesEnabled
        },
        {
            name: 'ogwil',
            displayName : Translator.get("OGWIL"),
            href: "#/ogwil",
            click: function () { $rootScope.topMenuDropDown = false; $scope.closeSlider(); $scope.goToTop(); },
            classObject: {'active': false, 'new-top-nav': Config.main.newMenuItems.ogwil},
            staticClass: "games",
            showCondition: Config.main.ogwilEnabled
        },
        {
            name: 'freebet',
            displayName : Translator.get("Free Bet"),
            href: "#/freebet",
            click: function () { $rootScope.topMenuDropDown = false; $scope.closeSlider(); $scope.goToTop(); },
            classObject: {'active': false, 'new-top-nav': Config.main.newMenuItems.freebet},
            staticClass: "freebet",
            showCondition: Config.main.freeBetEnabled
        },
        {
            name: 'fantasy',
            displayName : Translator.get("Fantasy Sports"),
            href: "#/fantasy",
            click: function () { $rootScope.topMenuDropDown = false; $scope.closeSlider(); $scope.goToTop(); },
            classObject: {'active': false, 'new-top-nav': Config.main.newMenuItems.fantasy},
            staticClass: "fantasy",
            showCondition: Config.main.fantasyEnabled
        },
        {
            name: 'jackpot',
            displayName : Translator.get("Jackpot"),
            href: "#/jackpot",
            click: function () { $rootScope.topMenuDropDown = false; $scope.closeSlider(); $scope.goToTop(); },
            classObject: {'active': false, 'new-top-nav': Config.main.newMenuItems.jackpot},
            staticClass: "jackpot",
            showCondition: Config.main.jackpotEnabled
        },
        {
            name: 'financials',
            displayName : Translator.get("Financials"),
            href: "#/financials",
            click: function () { $rootScope.topMenuDropDown = false; $scope.closeSlider(); $scope.goToTop(); },
            classObject: {'active': false, 'new-top-nav': Config.main.newMenuItems.financials},
            staticClass: "financials",
            showCondition: Config.main.financialsEnabled
        }
    ];

    /**
     * @ngdoc object
     * @name balanceSlider
     * @propertyOf vbet5.controller:mainHeaderCtrl
     * @description toggles balance slider
     */
    $scope.balanceSlider = {
        status: true,
        toggle: function () {
            if (this.status === false) {
                $scope.closeSlider();
            } else {
                $scope.openBalancePage();
                this.status = false;
            }
        }
    };

    /**
     * @ngdoc method
     * @name prefixLinkIfNeeded
     * @methodOf vbet5.controller:mainHeaderCtrl
     * @description prefixes given link with hostname depending on config
     *
     * @param {String} link relative link
     * @returns {String} absolute or relative link depending on match in config
     */
    function prefixLinkIfNeeded(link) {
        if (Config.main.domainSpecificPrefixes && Config.main.domainSpecificPrefixes[$window.location.hostname] && (Config.main.domainSpecificPrefixes[$window.location.hostname][link] || Config.main.domainSpecificPrefixes[$window.location.hostname][link + '/'])) {
            return (Config.main.domainSpecificPrefixes[$window.location.hostname][link] || Config.main.domainSpecificPrefixes[$window.location.hostname][link + '/']) + link;
        }
        return link;
    }

    $scope.logoUrl = Config.main.logoUrl || "#/";

    if (!Utils.isObjectEmpty(Config.main.domainSpecificPrefixes)) {
        $scope.logoUrl = prefixLinkIfNeeded($scope.logoUrl);
        angular.forEach(topMenu, function (menuItem) {
            menuItem.href = prefixLinkIfNeeded(menuItem.href);
        });
        if (Config.main.theVeryTopMenu && Config.main.theVeryTopMenu.length) {
            angular.forEach(Config.main.theVeryTopMenu, function (menuItem) {
                menuItem.href = prefixLinkIfNeeded(menuItem.href);
            });
        }
    }

    $scope.topMenu = [];
    angular.forEach(topMenu, function (item) {  // only items from config will remain
        if (Config.main.menuOrder.indexOf(item.name) !== -1) {
            $scope.topMenu.push(item);
        }
    });

    $scope.topMenu.sort(function (a, b) { return Config.main.menuOrder.indexOf(a.name) - Config.main.menuOrder.indexOf(b.name); });


    /**
     * @ngdoc method
     * @name updateMenuItemsState
     * @methodOf vbet5.controller:mainHeaderCtrl
     * @description updates objects passed to ng-class (will be called on location change)
     */
    function updateMenuItemsState() {
        angular.forEach($scope.topMenu, function (menuItem) {
            menuItem.classObject = menuItem.classObject || {};
            switch (menuItem.name) {
            case 'live':
                menuItem.classObject.active = (($location.path() === '/sport/' && Config.env.live) || $location.path() === '/overview/' || $location.path() === '/multiview/');
                break;
            case 'sport':
                menuItem.classObject.active = ($location.path() === '/sport/' && !Config.env.live && ($location.search().sport != '-3' || !Config.main.virtualSportEnabledInTopMenu)) || $location.path() === '/livecalendar/';
                break;
            case 'virtual-sports':
                menuItem.classObject.active = ((Config.main.sportsLayout !== 'asian' && Config.main.sportsLayout !== 'external') ? ($location.path() === '/sport/' && $location.search().sport == '-3') : $location.path() === '/virtualsports/');
                break;
            case 'virtual-betting':
                menuItem.classObject.active = ($location.path() === '/casino/' && $location.search().category == "35");
                break;
            case 'casino':
                menuItem.classObject.active = $location.path() === '/casino/' && ($location.search().category != 35 || !Config.main.virtualBettingEnabledInTopMenu);
                break;
            case 'poker':
                menuItem.classObject.active = ($location.path() === '/poker/' || $location.path() === '/poker');
                break;
            case 'games':
                menuItem.classObject.active = ($location.path() === '/games/' && $scope.fromToGames === 'Games');
                break;
            default:
                menuItem.classObject.active = $location.path() === ('/' + menuItem.name + '/');
                break;
            }
        });
    }

    $rootScope.$on('$locationChangeSuccess', updateMenuItemsState);
    $timeout(updateMenuItemsState); //initial

    var connectionLost = false;

    $scope.$watch('[myGames.length, myCasinoGames.length]', function () {
        $scope.favGamesChange = true;
        $timeout(function () { $scope.favGamesChange = false; }, 350);
    }, true);

    /**
     * @ngdoc method
     * @name toggleSliderTab
     * @methodOf vbet5.controller:mainHeaderCtrl
     * @description toggles slider and switches to specified "tab"
     *
     * @param {string} name block name to switch to
     * @param {boolean} dontClose optional. if true, tab will not be closed if it's open
     * @returns {boolean} block state if after toggling (true: visible, false: hidden)
     */
    $scope.toggleSliderTab = function toggleSliderTab(name, dontClose) {
        if ($scope.env.sliderContent === name && $scope.env.showSlider && !dontClose) {
            $scope.env.showSlider = false;
            $scope.env.sliderContent = '';
            return false;
        } else {
            $scope.env.showSlider = true;
            $scope.env.sliderContent = name;
            analytics.gaSend('send', 'event', 'slider', 'open slider',  {'page': $location.path(), 'eventLabel': name});
            return true;

        }
    };

    $rootScope.$on('toggleSliderTab', function (event, data) { $scope.toggleSliderTab(data); });

    /**
     * @ngdoc method
     * @name openSigninForm
     * @methodOf vbet5.controller:mainHeaderCtrl
     * @description Shows the sign-in block
     *
     */
    function openSigninForm() {

        if ($scope.openCustomDialog('loginiframe')) {
            return;
        }

        $scope.env.showSlider = true;
        $scope.env.sliderContent = 'signInForm';
        $scope.$broadcast('login.formOpened');
        if (Storage.get('lastLoggedInUsername')) {
            $scope.$broadcast('login.formOpened.andUsernameIsAvailable');
        }
    }

    $scope.$on("openLoginForm", openSigninForm);

    /* Server To Server Passing Track Id */
    if ($location.search().track_id) {
        Storage.set('trackId', $location.search().track_id);
        $location.search('track_id', undefined);
    }

    /**
     * listen to messages from other windows to open slider tab when needed
     */
    DomHelper.onMessage(function (message) {
        console.log('got message', message.data);
        if (message.data && message.data.action) {
            if (message.data.action === 'openSlider') {
                if (message.data.tab === 'settings' && message.data.page) {
                    $location.search('settingspage', message.data.page);
                }
                if (!$scope.env.authorized && (message.data.tab === 'deposit' || message.data.tab === 'balanceHistory' || message.data.tab === 'login' || message.data.tab === 'settings')) {
                    openSigninForm();
                    $location.search('action', message.data.tab);
                } else {
                    $scope.toggleSliderTab(message.data.tab, true);
                }
            } else if (message.data.action === 'openHelp' && message.data.page) {
                $location.search('help', message.data.page);
                $rootScope.$broadcast('openDeepLinkedHelpPage');
            } else if (message.data.action === 'closeSlider') {
                $scope.env.showSlider = false;
                $scope.env.sliderContent = null;
            } else if (message.data.action === 'login' && message.data.user_id && message.data.auth_token) {
                AuthData.set({user_id: message.data.user_id, auth_token: message.data.auth_token });
                $scope.restoreLogin();
            } else if (message.data.action === 'logout') {
                logOutUser();
            } else if (message.data.action === 'redirectGame') {
                $rootScope.$broadcast('livedealer.redirectGame', message);
            } else if (message.data.action === 'closeCasinoGame') {
                $rootScope.$broadcast('game.closeCasinoGame', message.data.id);
            } else if (message.data.action === 'closeDialog') {
                $rootScope.globalDialog = null;
            } else if (message.data.action === 'showAlert') {
                $rootScope.globalDialog = message.data;
            }
        }
    });

    /**
     * @ngdoc method
     * @name closeSlider
     * @methodOf vbet5.controller:mainHeaderCtrl
     * @description as the name says, closes the slider
     */
    $scope.closeSlider = function closeSlider() {
        $location.search('action', undefined);
        $scope.env.sliderContent = '';
        $scope.balanceSlider.status = true;
        $scope.env.showSlider = false;
        $scope.verytopMenuExpanded = false;
    };

    $rootScope.$on('slider.close', $scope.closeSlider);

    /**
     * @ngdoc method
     * @name openCustomDialog
     * @methodOf vbet5.controller:mainHeaderCtrl
     * @description Opens custom dialog return false id dialog config doesnt exist
     */
    $scope.openCustomDialog = function openCustomDialog(type) {
        if (Config.dialog && Config.dialog[type]) {
            $rootScope.globalDialog = Config.dialog[type];
            return true;
        } else {
            return false;
        }
    };

    /**
     * @ngdoc method
     * @name signin
     * @methodOf vbet5.controller:mainHeaderCtrl
     * @description Shows/hides the sign-in block
     */
    $scope.signin = function signin() {
        if ($scope.openCustomDialog('loginiframe')) {
            return;
        }

        if ($scope.toggleSliderTab('signInForm')) {
            $scope.$broadcast('login.formOpened');
            if (Storage.get('lastLoggedInUsername')) {
                $scope.$broadcast('login.formOpened.andUsernameIsAvailable');
            }
        }
    };

    /**
     * @ngdoc method
     * @name register
     * @methodOf vbet5.controller:mainHeaderCtrl
     * @description Shows/hides the registration form
     */
    $scope.register = function register() {

        if ($scope.openCustomDialog('regframe')) {
            return;
        }

        console.log('register');
        $scope.toggleSliderTab('registrationForm');
    };

    $scope.$on("openRegForm", function () {
        if ($scope.env.sliderContent !== 'registrationForm') {
            $scope.goToTop();
            $scope.register();
        }
    });

    /**
     * @ngdoc method
     * @name myGamesToggle
     * @methodOf vbet5.controller:mainHeaderCtrl
     * @description Shows/hides saved games block
     *
     * @param {Boolean} open optional. if true, will only open tab (won't close if it's already open)
     */
    $scope.myGamesToggle = function myGamesToggle(open) {
        var myGamesTabName = $rootScope.isInCasino() || !Config.main.sportSavedGamesEnabled || !$rootScope.conf.sportEnabled ? 'casinoSavedGames' : 'savedGames';
        if ($scope.toggleSliderTab(myGamesTabName, open)) {
            $scope.$emit('myGames.load');
        }
    };

    /**
     * @ngdoc method
     * @name myBetsToggle
     * @methodOf vbet5.controller:mainHeaderCtrl
     * @description Shows/hides myBets
     *
     * @param {Boolean} open optional. if true, will only open tab (won't close if it's already open)
     */
    $scope.myBetsToggle = function myBetsToggle(open) {
        var sliderContent;

        if (open === undefined && $rootScope.conf.enableCasinoBetHistory && ($rootScope.isInCasino() || !$rootScope.conf.sportEnabled)) {
            sliderContent = 'casinoBetHistory';
        } else {
            sliderContent = 'recentBets';
        }

        $scope.toggleSliderTab(sliderContent, open);
    };

    $scope.$on('open.mygames', function () {$scope.myGamesToggle(true); });
    $scope.$on('open.history', function () {$scope.myBetsToggle(true); });

    /**
     * @ngdoc method
     * @name clock
     * @methodOf vbet5.controller:mainHeaderCtrl
     * @description controls the clock in top left corner
     */
    function clock() {
        $scope.env.clock = (new Date().getTime() / 1000);
    }
    clock();
    $interval(clock, 1000);


    /**
     * @ngdoc function
     * @name removeAllFavorites
     * @methodOf vbet5.controller:gamesCtrl
     * @description Clean all favorites competitions/games
     */
    function removeAllFavorites() {
        var myGames = angular.copy($rootScope.myGames),
            myCompetitions = angular.copy($rootScope.myCompetitions);

        $scope.$emit('game.removeGameFromMyGames', myGames);
        $scope.$emit('game.removeGameFromMyCompetition', myCompetitions);

    }
    $scope.$on('game.removeAllFavorites', removeAllFavorites);

    /**
     * @ngdoc method
     * @name logOutUser
     * @methodOf vbet5.controller:mainHeaderCtrl
     * @description Logs user out
     * @param {Boolean} dontClearAllData don't clear local storage data
     */
    function logOutUser(dontClearAllData) {
        dontClearAllData = dontClearAllData || false;
        var logoutDone = false;
        var doLogoutStuff = function () {
            if (!logoutDone) {
                logoutDone = true;
                $rootScope.profile = null;
                $scope.env.authorized = false;
                $rootScope.currency_name = null;
                $rootScope.fbLoggedIn = false;
                $rootScope.cannotLoginWIthFbId = false;
                if ($rootScope.odnoModel) {
                    $rootScope.odnoModel.currentAction = null;
                    $rootScope.odnoModel.cannotLoginWIthOdno = null;
                    $rootScope.odnoModel.loggedIn = false;
                }
                $rootScope.loginRestored = $q.reject();
                if (!dontClearAllData) {
                    Storage.remove('betslip');
                    Storage.remove('myGames');
                    removeAllFavorites();
                    Storage.remove('prematchMultiViewGames');
                    Storage.remove('prematchMultiViewCompetitions');
                    Storage.remove('timezone');
                }
                $rootScope.$broadcast('login.loggedOut');
                $scope.closeSlider();
                liveChat.initSFChat();
                Zergling.unsubscribe($rootScope.profileSubId);
                if (Config.main.liveModule.enabled) {
                    intergratedHtmlHelperAvailable.then(function () {
                        $window.htmlHelper.logout();
                    });
                }
            }
        };
        Zergling.logout()['finally'](doLogoutStuff);
        $timeout(doLogoutStuff, Config.main.logoutTimeout); //in case logout fails for some reason (no network, etc.)
    }

    /**
     * @ngdoc method
     * @name logOut
     * @methodOf vbet5.controller:mainHeaderCtrl
     * @description Logs out
     */
    $scope.logOut = function logOut() {
        if ($rootScope.fbLoggedIn) {
            $rootScope.yesNoDialog = Translator.get("Do you want to log out from Facebook as well? If you don't log out from Facebook, you will be automatically logged in next time you open this page.");
            $scope.$on('dialog.yes', function () {
                logOutUser();
                $rootScope.$broadcast('facebook.logout');
            });
            $scope.$on('dialog.no', logOutUser);

        } else {
            logOutUser();
        }
    };

    /**
     * @ngdoc method
     * @name goToTop
     * @methodOf vbet5.controller:mainHeaderCtrl
     * @description Scrolls to beginning of page on small screen resolutions (defined by MIN_HEIGHT_FOR_STICKY_SLIDER)
     * Returns $scope, so it can be chained with scope methods
     * @param {Boolean} [onSmallScreensOnly] optional. if set to true will scroll only on small screens
     * @returns {Object} $scope
     */
    $scope.goToTop = function goToTop(onSmallScreensOnly) {
        DomHelper.goToTop(onSmallScreensOnly);
        return $scope;
    };

    /**
     * @ngdoc method
     * @name updateProfile
     * @methodOf vbet5.controller:mainHeaderCtrl
     * @description Receives profile update messages broadcasted by other controllers and updates profile in $scope
     *
     * @param {Object} event event
     * @param {Object} data profile data
     */
    function updateProfile(event, data) {
        if (!data || Utils.isObjectEmpty(data.profile)) {
            return;
        }
        console.log('updateProfile', event, data);
        $rootScope.profile = $filter('firstElement')(data.profile);
        if ($rootScope.profile && $rootScope.profile.super_bet && $rootScope.profile.super_bet !== -1) {
            $rootScope.$broadcast('checkSuperBet', $rootScope.profile.super_bet);
        }
        if ($rootScope.profile) {
            $rootScope.profile.full_name = $rootScope.profile.first_name + " " + $rootScope.profile.last_name; //need this later
        }
        $rootScope.currency_name = $scope.profile.currency_name;
        console.log('profile', $scope.profile);
        if (Config.main.remindToRenewBalance.enabled && $rootScope.profile && $rootScope.profile.balance !== undefined) {
            if (Storage.get('renewReminded') === undefined  && $rootScope.profile.balance < Config.main.remindToRenewBalance.threshold && $scope.env.sliderContent !== 'cashier') {
                $scope.env.showSlider = true;
                $scope.env.sliderContent = 'warning';
                Storage.set('renewReminded', $rootScope.profile.balance, Config.main.remindToRenewBalance.interval);
            } else { // on balance increase clear the reminder state to remind again when balance is low again
                if ($rootScope.profile.balance > Storage.get('renewReminded')) {
                    Storage.remove('renewReminded');
                }
            }
        }
    }

    $scope.$on('profile', updateProfile);

    /**
     * @ngdoc method
     * @name restoreLogin
     * @methodOf vbet5.controller:mainHeaderCtrl
     * @description Restores login from saved auth session and subscribes to profile updates
     */
    $scope.restoreLogin = function restoreLogin() {
        var deferred = $q.defer();
        if (AuthData.getAuthToken()) {
            console.log('restoring login');
            $rootScope.loginInProgress = true;
            Zergling.login(null).then(
                function (data) {
                    console.log('login restore ok', data);
                    $scope.env.authorized = true;
                    $rootScope.loginInProgress = false;
                    Zergling
                        .subscribe({'source': 'user', 'what': {'profile': []}, 'subscribe': true}, function (data) {updateProfile(null, data); })
                        .then(function (result) {
                            var lastLogin = Storage.get('loginFlow');
                            $rootScope.profileSubId = result.subid;
                            if (lastLogin === 'ODNO') {
                                $rootScope.odnoModel.loggedIn = true;
                            }
                            $rootScope.$broadcast('profile', result.data);
                            $rootScope.$broadcast('loggedIn');
                            deferred.resolve(true);
                        });
                },
                function (response) {
                    console.log('login with stored auth token failed');
                    $rootScope.loginInProgress = false;
                    return deferred.reject(response);
                }
            );
        } else {
            console.log('no saved auth token');
            return $q.reject(null);
        }
        return deferred.promise;
    };

    $scope.$on('zergling.sessionLost', $scope.restoreLogin);

    /**
     * @ngdoc method
     * @name scrollToElement
     * @methodOf vbet5.controller:mainHeaderCtrl
     * @description  smoothly scrolls page to element with specified id
     */
    $scope.scrollToElement = function scrollToElement(elementId) {
        smoothScroll(elementId);
    };


    /**
     * @ngdoc method
     * @name selectLanguage
     * @methodOf vbet5.controller:mainHeaderCtrl
     * @description  changes site language
     *
     *
     * @param {String} code language code
     */
    $scope.selectLanguage = function selectLanguage(code) {
        $scope.showLangSelector = false;
        //Config.env.lang = code;
        $location.search('lang', code);
        $location.search('page', undefined); //clear pages slugs, because
        $location.search('help', undefined); //they are different for different languages
        Storage.set('lang', code);

        if (Config.main.useAuthCookies) {
            var cookieOptions = {
                domain: $window.location.hostname.split(/\./).slice(-2).join("."),
                path: "/",
                expires: Config.main.authSessionLifetime / 1000,
                expirationUnit: 'seconds'
            };
            ipCookie("lang", code, cookieOptions);
        }

        $timeout(function () {$window.location.reload(); }, 100);
    };

    if (Config.main.geoIPLangSwitch && !$location.search().lang) {
        $rootScope.geoDataAvailable = $rootScope.geoDataAvailable || Geoip.getGeoData();
        $rootScope.geoDataAvailable.then(function (data) {
            var switchTo = $scope.GeoIPLangSwitch[data.countryName.toLowerCase()];
            var langs = Config.main.availableLanguages;

            if (switchTo && !Storage.get('languageHasBeenSwitched') && langs[switchTo]) {
                $scope.selectLanguage(switchTo);
            }

            Storage.set('languageHasBeenSwitched', true);
        });
    }

    /**
     * @ngdoc method
     * @name switchSportsbookLayout
     * @methodOf vbet5.controller:mainHeaderCtrl
     * @description  changes site language
     *
     *
     * @param {String} type classic , modern, asian
     */
    $scope.switchSportsbookLayout = function switchSportsbookLayout(type) {
        Storage.set('sportsBookLayout', type);
        partner.call('switchSportsbookLayout', type);
        $location.search('classic', type === "classic" ? 'yes' : undefined);
        $timeout(function () {
            if (Config.main.virtualSportEnabledInTopMenu) { // virtual sport case
                var oldViewStandartType = Config.main.sportsLayout !== 'external' && Config.main.sportsLayout !== 'asian';
                var newViewStandartType = type !== 'asian' && type !== 'external';
                if (oldViewStandartType && !newViewStandartType && $location.path() === '/sport/' && $location.search().sport === -3) {
                    $location.path('/virtualsports/');
                } else if (!oldViewStandartType && newViewStandartType && $location.path() === '/virtualsports/') {
                    $location.path('/sport/');
                    $location.search('type', 0);
                    $location.search('sport', -3);
                }
            }
            $window.document.location.reload();
        }, 500);
    };

    $rootScope.switchSportsbookLayout = $scope.switchSportsbookLayout;

    $scope.$on('switchSportsbookLayout', function (event, layout) {$scope.switchSportsbookLayout(layout); });

    $scope.$on('sportsbook.setLayout', function (event, data) {
        $scope.switchSportsbookLayout(data);
    });

    $scope.dontShowLayoutSwitcherHintAgain = false;

    /**
     * @ngdoc method
     * @name settingsInit
     * @methodOf vbet5.controller:mainHeaderCtrl
     * @description  initializes settings. Checks if odds format was set before and loads it from local storage
     *
     */
    $scope.settingsInit = function settingsInit() {
        if (Storage.get('oddFormat') !== undefined && Config.main.allowSavingOddFormat) {
            $scope.setOddFormat(Storage.get('oddFormat'));
        }
        if (Storage.get('sound') !== undefined) {
            var volume = parseFloat(Storage.get('sound'));
            if (isNaN(volume) || volume === null) {volume = 0; }
            $scope.setSound(volume);
            /*  $scope.setSound(Storage.get('sound'));*/
        }
        if (Storage.get('hideUsername') !== undefined) {
            $scope.setHideUsername(Storage.get('hideUsername'));
        }
        if (Storage.get('hideBalance') !== undefined) {
            $scope.setHideBalance(Storage.get('hideBalance'));
        }
        if (Storage.get('timeFormat') !== undefined) {
            $scope.setTimeFormat(Storage.get('timeFormat'));
        }
    };

    /**
     * @ngdoc method
     * @name setTimeFormat
     * @methodOf vbet5.controller:mainHeaderCtrl
     * @description  sets the time format
     *
     * @param {String} value time format (24 hour format or 12 hour AM/PM format)
     */
    $scope.setTimeFormat = function setTimeFormat(value) {
        Config.env.timeFormat = value;
        Storage.set('timeFormat', value);
    };

    $scope.$on('setTimeFormat', function (event, format) {$scope.setTimeFormat(format); });
    /**
     * @ngdoc method
     * @name setHideUsername
     * @methodOf vbet5.controller:mainHeaderCtrl
     * @description  show/hide username
     *
     * @param {Boolean} value username state (true, false)
     */
    $scope.setHideUsername = function setHideUsername(value) {
        Config.env.hideUsername = value;
        Storage.set('hideUsername', value);
    };

    /**
     * @ngdoc method
     * @name setHideBalance
     * @methodOf vbet5.controller:mainHeaderCtrl
     * @description  show/hide balance
     *
     * @param {Boolean} value balance state (true, false)
     */
    $scope.setHideBalance = function setHideBalance(value) {
        Config.env.hideBalance = value;
        Storage.set('hideBalance', value);
    };

    /**
     * @ngdoc method
     * @name setOddFormat
     * @methodOf vbet5.controller:mainHeaderCtrl
     * @description  sets the odds format
     *
     * @param {String} format odd format (decimal, fractional or american)
     */
    $scope.setOddFormat = function setOddFormat(format) {
        Config.env.oddFormat = format;
        Storage.set('oddFormat', format);
    };

    $scope.$on('set.oddFormat', function (event, format) { $scope.setOddFormat(format); });

    $scope.setSound = GameInfo.setSound;

    $scope.$on('setOddsFormat', function (event, format) {$scope.setOddFormat(format); });

    /**
     * @ngdoc method
     * @name startIntro
     * @methodOf vbet5.controller:mainHeaderCtrl
     * @description  starts the intro(help)
     */
    $scope.startIntro = function () {
        Intro.start();
    };

    $scope.$on('zergling.lostWSConnection', function () {
        connectionLost = true;
        $scope.topMessage = Translator.get('Connection lost. Reconnecting.');
    });

    $scope.$on('zergling.gotSession', function () {
        if (connectionLost) {
            connectionLost = false;
            $scope.topMessage = null;
            Utils.setJustForMoment($scope, 'topMessage', Translator.get('Connection restored'), 5000);
        }

    });

    /**
     * @ngdoc method
     * @name check4DeepLinkedAction
     * @methodOf vbet5.controller:mainHeaderCtrl
     * @description  checks if corresponding slider section has to be opened(if action is speciified in url) and returns its state
     * @param {String} actionPage action section name, e.g. 'deposit', 'cashier', etc.
     * @param {Boolean} andOpenIt if true, corresponding page will be opened, if not specified will just return the state
     *@return {Boolean} if cashier action is specified
     */
    function check4DeepLinkedAction(actionPage, andOpenIt) {
        var action = $location.search().action;
        if (action && action.length && action.toLowerCase() === actionPage.toLowerCase() && $scope.env.sliderContent !== actionPage) {
            if (andOpenIt) {
                $scope.toggleSliderTab(actionPage);
                $location.search('action', undefined);
            }
            return true;
        }
        return false;
    }

    /**
     * @ngdoc method
     * @name goToVirtualBetting
     * @methodOf vbet5.controller:mainHeaderCtrl
     * @description  sends message to casino controller to open Virtual Betting category
     */
    $scope.goToVirtualBetting = function goToVirtualBetting() {
        $rootScope.$broadcast('casino.selectVirtualBetting');
    };

    /**
     * @ngdoc method
     * @name goToSkillGame
     * @methodOf vbet5.controller:mainHeaderCtrl
     * @description  sends message to skillgamesCtrl controller to open skill game
     */
    $scope.goToSkillGame = function goToSkillGame(gameName) {
        var game;
        if (gameName === 'belote') {
            game = CConfig.belote;
        } else if (gameName === 'backgammon') {
            game = CConfig.backgammon;
        }
        if (game) {
            $timeout(function () {
                $rootScope.$broadcast('games.openGame', game);
            }, 0);
        }
    };

    /**
     * @ngdoc method
     * @name updatePoolBettingData
     * @methodOf vbet5.controller:mainHeaderCtrl
     * @description  calculates and updates scope's poolbetting jackpot value
     *
     * @param {Object} response  draw response ibject
     */
    function updatePoolBettingData(response) {
        var draw = response.data && $filter('firstElement')(response.data.draw);
        if (!draw) {
            console.warn('cannot get pool betting draw', response);
            return;
        }
        if (!draw.jackpot || draw.jackpot <= draw.min_jackpot) {
            draw.jackpot = draw.min_jackpot;
        }
        $rootScope.poolBettingJackpot = draw.jackpot;
        console.log('Pool betting jackpot:', response);
    }

    function performDeepLinkedAction() {
        check4DeepLinkedAction('cashier', true);
        check4DeepLinkedAction('deposit', true);
        check4DeepLinkedAction('withdraw', true);
        check4DeepLinkedAction('settings', true);
        check4DeepLinkedAction('balanceHistory', true);
        check4DeepLinkedAction('casinoBalanceHistory', true);
    }

    function needLogin2Continue() {
        return check4DeepLinkedAction('cashier') || check4DeepLinkedAction('deposit') || check4DeepLinkedAction('withdraw') || check4DeepLinkedAction('settings') || check4DeepLinkedAction('balanceHistory') || check4DeepLinkedAction('casinoBalanceHistory');
    }

    /**
     * @ngdoc method
     * @name mainHeaderInit
     * @methodOf vbet5.controller:mainHeaderCtrl
     * @description  main header initialization.
     * restores login, checks if actions are specified in url (like register, cashier) and performs them
     */
    $scope.mainHeaderInit = function mainHeaderInit() {
        $rootScope.loginRestored = $scope.restoreLogin();
        $rootScope.loginRestored.then(
            performDeepLinkedAction,  //login done
            function () { //login failed
                if (needLogin2Continue()) {
                    openSigninForm();
                }
                if ($location.search().action) {
                    Storage.set('ref', $location.search().ref);
                    if ($location.search().action.toLowerCase() === 'register' && $scope.env.sliderContent !== 'registrationForm') {
                        $scope.register();
                        $location.search('action', undefined);
                    } else if ($location.search().action.toLowerCase() === 'login' && $scope.env.sliderContent !== 'signInForm') {
                        openSigninForm();
                        $location.search('action', undefined);
                    } else if ($location.search().action.toLowerCase() === 'forgotpassword' && $scope.env.sliderContent !== 'forgotPasswordForm') {
                        $scope.env.showSlider = true;
                        $scope.env.sliderContent = 'forgotPasswordForm';
                        $location.search('action', undefined);
                    } else if ($location.search().action.toLowerCase() === 'fblead' && $scope.env.sliderContent !== 'registrationForm') {
                        $scope.goToTop();
                        $scope.env.showSlider = true;
                        $scope.env.sliderContent = 'registrationForm';
                        Storage.set('fbRequestIds', $location.search().request_ids);
                        Storage.remove('ref'); //
//                            $location.search('action', undefined);
                    }
                }
            }
        );

        if (Config.main.poolBettingEnabled) {
            Zergling.get({
                'source': 'config.currency',
                'what': {'currency': ['name', 'rounding', 'toto_rate'] },
                'where': { 'currency': { 'name': Config.main.poolBettingCurrencyName}}
            }).then(function (response) {
                if (response.data && response.data.currency) {
                    $rootScope.poolBettingCurrency = $filter('firstElement')(response.data.currency);
                    Zergling.subscribe({
                        'source': 'pool.betting',
                        'what': { 'draw': ['jackpot', 'min_jackpot']},
                        'where': { 'draw': {'status': 1}}
                    }, updatePoolBettingData).then(updatePoolBettingData);
                }
            });
        }

        $scope.sortedAvailableLanguages = Utils.objectToArray(Config.main.availableLanguages, 'code').sort(function (a, b) { return a.order - b.order; });

    };

    $scope.$on('login.loggedIn', performDeepLinkedAction);
    $scope.$on('login.loggedIn', function () {
        if ($location.path() === '/landing/') {
            $location.path("/");
        }
    });

    $scope.$on('$routeUpdate',   function () {
        if (Config.env.authorized) {
            performDeepLinkedAction();
        } else if (needLogin2Continue()) {
            openSigninForm();
        }
    });

    $rootScope.$on('$routeChangeStart', function () {
        $rootScope.casinoGameOpened = 0;
        $rootScope.footerMovable = false;
    });

    /**
     * @ngdoc method
     * @name setGamesType
     * @methodOf vbet5.controller:mainHeaderCtrl
     * @description  sets game type(live or pre-match) by sending a broadcast message to explorerCtrl
     */
    $scope.setGamesType = function setGamesType(type) {
        if ($rootScope.env.live != type) {
            $rootScope.$broadcast('toggleLive');
        }
        if (Config.main.sportsLayout === 'asian') {
            Config.env.live = !!type;
            $rootScope.$broadcast('asianMenu');
        }
        if (Config.main.liveModule.enabled && Config.main.sportsLayout === 'external') {
            Config.env.live = !!type;
            if ($location.path() === '/sport/') {
                $scope.switchIntegratedTo(type ? 'live' : 'prematch');
            } else {
                $location.path('/sport/');
                $location.search('type', type ? 1 : 0);
                $timeout(function () {$window.location.reload(); });
            }
        }
    };

    /**
     * @ngdoc method
     * @name setDefaultIfVirtual
     * @methodOf vbet5.controller:mainHeaderCtrl
     * @description  sets game type(pre-match) to difault if virtual sport is selected
     */
    $scope.setDefaultIfVirtual = function setDefaultIfVirtual() {
        if ($location.search().sport === -3 && Config.main.sportEnabled) {
            $timeout(function () { $route.reload(); }, 100);
            //$location.path("#/sport/?type=0");
        }
    };

    $scope.$on('setGamesType', function (event, type) {$scope.setGamesType(type); });

    $scope.startSFChat = liveChat.startSFChat;
    $scope.startDeskChat = liveChat.startDeskChat;
    $window.startSFChat = $scope.startSFChat; //to use it on wordpress pages

    if (Config.main.liveChat && Config.main.liveChat.isLiveAgent) {
        liveChat.initLiveAgent();
        $scope.isLiveAgent = true;
    }

    $scope.startLiveAgent = function () {
        $rootScope.liveAgentButton.onClick();
    };

    $window.startLiveAgent = $scope.startLiveAgent;

    /**
     * @ngdoc method
     * @name openFaq
     * @methodOf vbet5.controller:mainHeaderCtrl
     * @description  opens FAQ popup window
     */
    $scope.openFaq = function openFaq() {
        //$rootScope.$broadcast('openHelpPage', {slug: '#/popup/?action=help'});
        $rootScope.$broadcast('openHelpPage', {slug: 'faq'});
    };

    /**
     * @ngdoc method
     * @name getAllowedPaymentSystems
     * @description  Retrieve from swarm allowed payment systems
     */
    function getAllowedPaymentSystems() {
        Zergling.get({}, 'payment_services').then(function (response) {
            $rootScope.profile.paymentSystems = response;
        }, function (err) {
            console.log('Payments methods not loaded: ', err);
        });
    }

    $scope.$on('profile', function () {
        if (Config.main.liveChat && (Config.main.liveChat.isSfChat || Config.main.liveChat.isDeskChat)) {
            if ($rootScope.env.authorized && $scope.lastUserId !== $scope.profile.unique_id) {
                $scope.lastUserId = $scope.profile.unique_id;
                Zergling.get({}, 'get_user').then(Config.main.liveChat.isSfChat ? liveChat.setSFChatData : liveChat.setDeskChatData);
            }
        }
        getAllowedPaymentSystems();
    });

    /**
     * @ngdoc method
     * @name openPopup
     * @description  openas a popup window
     * @param {String} url page url
     * @param {String} title page title
     * @param {String} params page additional parameters
     */
    $scope.openPopup = function openPopup(url, title, params) {
        $window.open(url, title, params);
    };

    /**
     * @ngdoc method
     * @name switchIntegratedTo
     * @description  switches integrated sportsbook mode
     * @param {String} type "live" or "prematch"
     */
    $scope.switchIntegratedTo = function switchIntegratedTo(type) {
        //if ($location.path() !== '/sb/') {
        //    $location.path('/sb/');
        //    $window.location.reload();
        //}
        $window.htmlHelper.switchTo(type);
    };

    /**
     * @ngdoc method
     * @name setTheme
     * @description  sets color scheme
     * @param {Object} theme them object
     */
    $scope.setTheme = function setTheme(theme) {
        $rootScope.theme = theme;
        Storage.set('theme', theme.id);
    };

    // load saved or default theme
    if (Config.main.themes && Config.main.themes.length) {
        var savedTheme = Storage.get('theme') ? Utils.getArrayObjectElementHavingFieldValue(Config.main.themes, 'id', Storage.get('theme')) : null;
        $scope.setTheme(savedTheme || Config.main.themes[0]);
    }

    /**
     * Event listener to make bridge between registration ctrl and login ctrl
     * Redirect login request to login controller
     */
    $scope.$on('login.withUserPass', function (event, data) {
        $scope.$broadcast('login.withUsernamePassword', data);
    });

    $scope.openBalancePage = function openBalancePage() {
        $scope.env.showSlider = true;
        $scope.env.sliderContent = $scope.isInSports() ? Config.main.balanceDefaultPage : (Config.main.casinoBalanceDefaultPage || 'cashier');
    };

    /**
    *  Stuff for integrated sportsbook
    *  makes sure htmlHelper object of integrated sportsbook is available before doing some stuff with it
    *  intergratedHtmlHelperAvailable is used for that
    * */
    var d = $q.defer();
    intergratedHtmlHelperAvailable = d.promise;
    function updateHtmlHelperPromise() {
        if (!$window.htmlHelper) {
            $window.setTimeout(updateHtmlHelperPromise, 500);
            return;
        }
        d.resolve($window.htmlHelper);
    }
    if (Config.main.liveModule.enabled) {
        updateHtmlHelperPromise();
    }

    function sendLoginEventToIntegratedApp() {
        if (Config.main.liveModule.enabled) {
            intergratedHtmlHelperAvailable.then(function () {
                $window.htmlHelper.login({ loginType: 2 });
            });
        }
    }

    $scope.$on('login.loggedIn', sendLoginEventToIntegratedApp); //normal login
    $scope.$on('loggedIn', sendLoginEventToIntegratedApp);   // restoring login

    var inactivityTimer = 0, mousemoveCounter = 0;

    function mousemove() {
        mousemoveCounter++;
        if (mousemoveCounter > 20) {
            inactivityTimer = 0;
            mousemoveCounter = 0;
        }
    }

    function mouseup() {
        inactivityTimer = 0;
        mousemoveCounter = 0;
    }

    function countInactivity() {
        inactivityTimer++;
        if (inactivityTimer >= Config.main.logoutTime && Config.env.authorized) {
            inactivityTimer = 0;
            mousemoveCounter = 0;
            logOutUser(true);
            console.log('Auto Logout triggered');
        }
    }

    if (Config.main.logoutTime) {
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
        setInterval(countInactivity, 1000);
    }
}]);