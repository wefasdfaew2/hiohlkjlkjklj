/**
 * @ngdoc controller
 * @name CASINO.controller:jackpotCtrl
 * @description
 * jackpot page controller
 */

CASINO.controller('jackpotCtrl', ['$rootScope', '$scope', '$sce', '$location', '$timeout', 'casinodata', 'content', 'CConfig', 'Config', 'CasinoUtils', 'CasinoCache', function ($rootScope, $scope, $sce, $location, $timeout, casinodata, content, CConfig, Config, CasinoUtils, CasinoCache) {
    'use strict';

    $scope.iconsUrl = CConfig.cUrlPrefix + CConfig.iconsUrl;
    $scope.LEADERS_TO_SHOW = 10;
    $scope.offset = 0;
    $scope.jackpotPageLoaded = false;

    var jackpotLeaders = [];
    /**
     * @ngdoc method
     * @name loadJackpotPages
     * @methodOf CASINO.controller:jackpotCtrl
     * @description loads jackpot
     */
    $scope.loadJackpotPages = function loadJackpotPages() {

        //load jackpot rules
        getJackpotRules();

        //load jackpot games
        getJackpotGames();

        //load Jackpot leaders data list
        getLeadersList();
    };

    function getJackpotRules() {
        content.getPage('jackpot-' + $rootScope.env.lang, true).then(function (response) {
            $scope.jackpotRules = [];

            if (response.data && response.data.page && response.data.page.children) {
                var rules = response.data.page.children;
                for(var i = 0, children = rules.length; i < children; i += 1) {
                    rules[i].title = $sce.trustAsHtml(rules[i].title);
                    rules[i].content = $sce.trustAsHtml(rules[i].content);
                }
                $scope.jackpotRules = rules;
            }
            checkIfPageLoaded();
        }, function(reason) {
            $scope.jackpotRules = [];
            checkIfPageLoaded();
        });
    };

    /**
     * @ngdoc method
     * @name getJackpotBanners
     * @methodOf CASINO.controller:jackpotCtrl
     * @description   populates $scope's **getJackpotBanners** variable with banner information got from cms
     **/
    $scope.getJackpotBanners = function getJackpotBanners(containerId) {
        containerId = containerId || 'jackpot-banners-' +  $rootScope.env.lang;
        content.getWidget(containerId).then(function (response) {
            $scope.jackpotBanners = [];

            if (response.data && response.data.widgets && response.data.widgets[0]) {
                var widgets = response.data.widgets;
                for (var i = 0, lenght = widgets.length; i < lenght; i += 1) {
                    $scope.jackpotBanners.push(widgets[i].instance);
                }
            }
            checkIfPageLoaded();
        }, function (reason) {
            $scope.jackpotBanners = [];
            checkIfPageLoaded();
        });
    };

    /**
     * @ngdoc method
     * @name openJBlink
     * @methodOf CASINO.controller:jackpotCtrl
     * @description   Track big-slider banners click
     *
     * @param {string} [link] optional. url of casino game to open game for
     */
    $scope.openJBlink = function openJBlink(link) {
        if (link === undefined || link === '') {
            return;
        }
        analytics.gaSend('send', 'event', 'news',  {'page': $location.path(), 'eventLabel': 'jackpot banner click'});

    };

    function getJackpotGames() {
        var games = CasinoCache.get('jachpotGames_' + CConfig.main.partnerID);
        if (games !== undefined) {
            $scope.jackpotGames = games;
            checkIfPageLoaded();
        } else {
            casinodata.getAction('jackpot', CConfig.main.partnerID).then(function (response) {
                $scope.jackpotGames = [];
                if (response.data) {
                    $scope.jackpotGames = response.data;
                    CasinoCache.put('jachpotGames_' + CConfig.main.partnerID, $scope.jackpotGames);
                }
                checkIfPageLoaded();
            }, function(reason) {
                $scope.jackpotGames = [];
                checkIfPageLoaded();
            });
        }
    };

    function getLeadersList() {
        var savedLeaders = CasinoCache.get('jachpotLeaders_' + CConfig.main.partnerID);
        if (savedLeaders !== undefined) {
            jackpotLeaders = savedLeaders;
            $scope.leaderCount = jackpotLeaders.length;
            $scope.leaders = getVisibleLeaders(jackpotLeaders);
            checkIfPageLoaded();
        } else {
            casinodata.getJackpotLeadersList(CConfig.main.partnerID).then(function (response) {
                $scope.leaders = [];
                if (response.data && response.data.length) {
                    var allleaders = response.data, index = 0;
                    $scope.leaderCount = allleaders.length / 4;
                    for (var i = 0; i < $scope.leaderCount; i += 1) {
                        var leader = [];
                        leader.push(i + 1);
                        for (var j = 0; j < 4; j += 1) {
                            leader.push(allleaders[index]);
                            index++;
                        }
                        jackpotLeaders.push(leader);
                    }
                    $scope.leaders = getVisibleLeaders(jackpotLeaders);
                    CasinoCache.put('jachpotLeaders_' + CConfig.main.partnerID, jackpotLeaders);
                }
                checkIfPageLoaded();
            }, function (reason) {
                $scope.leaders = [];
                checkIfPageLoaded();
            });
        }
    };

    function getVisibleLeaders(leaders) {
        return leaders.slice($scope.offset, $scope.offset + $scope.LEADERS_TO_SHOW);
    }

    /**
     * @ngdoc method
     * @name slide
     * @methodOf CASINO.controller:jackpotCtrl
     * @description Slides visible leaders bottom or top by changing $scope's **offset** variable
     *
     * @param {String} direction direction, 'bottom' or 'top'
     */
    $scope.slide = function slide(direction) {
        if (direction === 'top') {
            if ($scope.offset > 0) {
                $scope.offset -= $scope.LEADERS_TO_SHOW;
            }
        } else if (direction === 'bottom') {
            if ($scope.offset < jackpotLeaders.length - $scope.LEADERS_TO_SHOW) {
                $scope.offset += $scope.LEADERS_TO_SHOW;
            }
        }
        $scope.leaders = getVisibleLeaders(jackpotLeaders);
    };

    /**
     * @ngdoc method
     * @name toggleSaveToMyCasinoGames
     * @methodOf CASINO.controller:jackpotCtrl
     * @description send events for adds or removes(depending on if it's already there) game from 'my casino games'
     * @param {Object} game Object
     */
    $scope.toggleSaveToMyCasinoGames = function toggleSaveToMyCasinoGames(game) {
        CasinoUtils.toggleSaveToMyCasinoGames($rootScope, game);
    };

    /**
     * @ngdoc method
     * @name isFromSaved
     * @methodOf CASINO.controller:jackpotCtrl
     * @description  checks if game (that has gameID) is in myCasinoGames
     * @param {Number} gameId Number
     * @returns {boolean} true if current game is in myCasinoGames, false otherwise
     */
    $scope.isFromSaved = function isFromSaved(gameId) {
        var games = $rootScope.myCasinoGames || [], i, j;

        for (i = 0, j = games.length; i < j; i += 1) {
            if (games[i].id === gameId) {
                return true;
            }
        }

        return false;
    };

    /**
     * @ngdoc method
     * @name openJackGame
     * @methodOf CASINO.controller:jackpotCtrl
     * @description  open selected game
     *
     * @param {Object} game the game object
     * @param {String} gameType string which contains the value 'fun' or  'real'
     */

    $scope.openJackpotGame = function openJackpotGame(game, gameType) {
        if (gameType === 'real' && !$rootScope.env.authorized) {
            $rootScope.$broadcast("openLoginForm");
            return;
        }

        var unregisterRouteChangeSuccess =  $rootScope.$on('$routeChangeSuccess', function () {
            if (!$location.$$replace) {
                $rootScope.$broadcast('casino.openGame', game, gameType);
                unregisterRouteChangeSuccess();
            }
        });

        $location.url('/casino/');
    };

    function checkIfPageLoaded() {
        $scope.jackpotPageLoaded = $scope.jackpotRules !== undefined && $scope.jackpotBanners !== undefined && $scope.jackpotGames !== undefined && $scope.leaders !== undefined;
    }
}]);
