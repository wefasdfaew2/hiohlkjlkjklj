/* global BettingModule */
/**
 * @ngdoc controller
 * @name vbet5.controller:gamesCtrl
 * @description
 * Games controller
 */
BettingModule.controller('gamesCtrl', ['$rootScope', '$scope', '$location', '$filter', '$timeout', 'Config', 'Zergling', 'Utils', 'analytics', 'smoothScroll', 'GameInfo', 'DomHelper', 'partner', function ($rootScope, $scope, $location, $filter, $timeout, Config, Zergling, Utils, analytics, smoothScroll, GameInfo, DomHelper, partner) {
    'use strict';

    /**
     * @ngdoc object
     * @name openGames
     * @propertyOf vbet5.controller:gamesCtrl
     * @description holds list of open games with data
     * @type {Object}
     */
    $scope.openGames = {0: [], 1: [], 2: []};

    $scope.pinnedGames = {};

    $scope.isInArray = Utils.isInArray;
    /**
     * @ngdoc method
     * @name gamesInit
     * @methodOf vbet5.controller:gamesCtrl
     * @description  called on games view initialization
     * checks if competition is deep linked and sets it's id in scope to make sure it will be expanded
     * if game from that competition is deep linked
     *
     * also sets location hash if game id is present in search, to scroll to selected game
     */
    $scope.gamesInit = function gamesInit() {
        var searchParams = $location.search();
        if (searchParams.competition !== undefined) {
            $scope.selectedCompetitionId = parseInt(searchParams.competition, 10);
        }
        if (searchParams.game !== undefined) {
            var tries = 10, elementId = 'game' + searchParams.game;
            var scrollToGame = function () {
                console.log('finding', elementId);
                var gameElement = document.getElementById(elementId);
                if (gameElement) {
                    partner.call('selectedGameOffset', DomHelper.getOffset(gameElement)); //requested by goldenpalace.be, see WEB-180
                    smoothScroll(elementId, {easing: 'easeOutCubic', duration: 200});
                } else if (tries--) {
                    $timeout(scrollToGame, 300);
                }

            };
            scrollToGame();
        }
    };

    /**
     * @ngdoc object
     * @name states
     * @propertyOf vbet5.controller:gamesCtrl
     * @description holds states of selected tabs in games and states of different open/closed sections
     * @type {Object}
     */
    var states = {toggles: {}};


    $scope.setInitialVisibility = function setInitialVisibility() {

        var key = '', i, initialState;
        initialState = arguments[0];
        for (i = 1; i < arguments.length; i++) {
            key = key + arguments[i];
        }
        if (states[key] === undefined || !states[key].setByUser) {
            states[key] = {state: initialState, setByUser: false};
        }
        return states[key].state;
    };

    $scope.toggleSaveToMyCompetitions = function toggleSaveToMyCompetitions(competition) {
        if (Utils.isInArray($rootScope.myCompetitions, competition.id) < 0) {
            $scope.$emit('game.addToMyGames', competition.gamesArray);
            $scope.$emit('game.addToMyCompetition', competition);
        }
        else {
            $scope.$emit('game.removeGameFromMyGames', competition.gamesArray);
            $scope.$emit('game.removeGameFromMyCompetition', competition);
        }

    };

    /**
     * @ngdoc function
     * @name removeAllFavorites
     * @methodOf vbet5.controller:gamesCtrl
     * @description Clean all favorites competitions/games
     */
    $scope.removeAllFavorites = function() {
        $rootScope.$broadcast('game.removeAllFavorites');
    };

    /**
     * @ngdoc function
     * @name toggleVisibility
     * @methodOf vbet5.controller:gamesCtrl
     * @description
     * Toggles visibility state for item specified by arguments (can accept any number of string arguments)
     *
     * @returns {Boolean} visibility state after change
     */
    $scope.toggleVisibility = function toggleVisibility() {

        analytics.gaSend('send', 'event', 'explorer', 'show more markets', {'page': $location.path(), 'eventLabel': ($scope.env.live ? 'Live' : 'Prematch')});

        var key = '', i;
        for (i = 0; i < arguments.length; i++) {
            key = key + arguments[i];
        }
        if (states[key] === undefined) {
            states[key] = {state: true, setByUser: true};
        }
        states[key].state = !states[key].state;
        return states[key].state;
    };



    /**
     * @ngdoc function
     * @name getVisibility
     * @methodOf vbet5.controller:gamesCtrl
     * @description Returns visibility state for item specified by arguments (can accept any number of string arguments)
     *
     * @returns {Boolean} visibility state
     */
    $scope.getVisibility = function getVisibility() {

        var key = '', i;
        for (i = 0; i < arguments.length; i++) {
            key = key + arguments[i];
        }
        if (states[key] === undefined) {
            states[key] = {state: false, setByUser: false};
        }
        return states[key].state;
    };

    /**
     * @ngdoc function
     * @name getDefaultSelectedMarketBase
     * @methodOf vbet5.controller:gamesCtrl
     * @description
     * returns the market base of market for which the 2 event price difference is minimal
     *
     * @param {Object} markets markets
     * @returns {number} base market base
     */
    $scope.getDefaultSelectedMarketBase = function getDefaultSelectedMarketBase(markets) {
        var minDiff,
            defaultBase = markets[0].base;

        angular.forEach(markets, function (market) {
            var currDiff,
                events = Utils.objectToArray(market.event);
            if (events.length === 2 && (((currDiff = Math.abs(events[0].price - events[1].price)) < minDiff) || minDiff === undefined)) {
                minDiff = currDiff;
                defaultBase = market.base;
            }
        });
//        console.log('default base:', defaultBase, markets);
        return defaultBase;
    };

    /**
     * @ngdoc function
     * @name marketSelectedBaseExists
     * @methodOf vbet5.controller:gamesCtrl
     * @description  Checks if current selected base for specific market type exists,
     *
     * @param {Object} game game object
     * @param {Array} markets array of markets of same type with different bases
     * @returns {boolean} true if current selected base for this market type exists, false otherwise
     */
    $scope.marketSelectedBaseExists = function marketSelectedBaseExists(game, markets) {
        var exists = false;
        angular.forEach(game.market, function (m) {
            if (states[game.id].markets[markets[0].type] && Utils.getItemBySubItemProperty(m.event, 'base', [states[game.id].markets[markets[0].type].activeBase]) !== null) {
                exists = true;
            }
        });
        return exists;
    };

    /**
     *
     * Ugly function for game tab switching.
     * Have to be refactored later
     *
     */
    $scope.setActiveTab = function setActiveTab(type, game, market, activeId, dontOverwrite) {
        dontOverwrite = dontOverwrite || false;

        if (states[game.id] === undefined) {
            states[game.id] = {markets: {}, marketsGroup: null };
        }
        if (type === 'marketBase') {

            if (states[game.id].markets[market.type] === undefined) {
                states[game.id].markets[market.type] = {activeBase: null};
            }
            if (!dontOverwrite || states[game.id].markets[market.type].activeBase === null) {
                states[game.id].markets[market.type].activeBase = activeId;
            }
        } else if (type === 'marketGroup') {
            if (!game.id) {
                return;
            }
            states[game.id].marketsGroup = activeId;
            return states[game.id].marketsGroup;
        }


    };

    /**
     * @ngdoc function
     * @name getActiveTab
     * @methodOf vbet5.controller:gamesCtrl
     * @description  Returns current active(selected) tab  for (market groups or market base groups)
     *
     * @param {String} type marketBase or marketGroup
     * @param {Object} game game object
     * @param {Object} [market]  used only when type is marketBase. Market object to get market type from.
     * @returns {String} selected tab id
     */
    $scope.getActiveTab = function getActiveTab(type, game, market) {
        if (!states[game.id]) {
            return null;
        }
        if (type === 'marketBase') {
            return states[game.id].markets[market.type].activeBase;
        }
        if (type === 'marketGroup') {
            return states[game.id].marketsGroup;
        }
    };

    /**
     * @ngdoc object
     * @name subIds
     * @propertyOf vbet5.controller:gamesCtrl
     * @description holds list of open games subscription ids
     * @type {Object}
     */
    var subIds = {};


    /**
     * @ngdoc function
     * @name updateGame
     * @methodOf vbet5.controller:gamesCtrl
     * @description Updates open game data and saves it to scope
     * to be accessible from {@link vbet5.controller:gameCtrl gameCtrl} controller
     *
     * @param {Object} data subscription data received from swarm
     */
    function updateGame(data) {
        var sport, region, competition, game;
        if (data && data.sport) {
            sport = $filter('firstElement')(data.sport);
        }

        if (sport && sport.region) {
            region = $filter('firstElement')(sport.region);
        }
        if (region && region.competition) {
            competition = $filter('firstElement')(region.competition);
        }
        if (competition && competition.game) {
            game = Utils.objectToArray(competition.game)[0];
        } else {
            return console.log('competition ended');
        }

        if (game === null) {
            return console.warn('no data received for game', data);
        }

        game.open = true;
        game.loading = false;
        game.sport = {alias: sport.alias, id: sport.id, name: sport.name};
        game.region = {id: region.id};
        game.competition = {id: competition.id};
        $scope.openGames[game.type][game.id] = game;

        $scope.refreshArrows();

        return console.log('update game', game);
    }

    /**
     * @ngdoc function
     * @name subscribeToGame
     * @methodOf vbet5.controller:gamesCtrl
     * @description subscribes to game updates and saves subscription id
     * @param {object} game game object (only id field is used to subscribe)
     * @param {function} callback function that will be called upon successful subscription and further updates
     */
    $scope.subscribeToGame = function subscribeToGame(game, callback) {
        var request = {
            'source': 'betting',
            'what': {
                'game': [],
                'event': [],
                'market': [],
                'sport': ['id', 'alias', 'name'],
                'competition': ['id'],
                'region': ['id']
            },
            'where': {

                'game': {
                    'id': game.id
                }
            }
        };

        var gameUpdateCallback = function gameUpdateCallback(data) {
            updateGame(data);
            callback();
        };

        Zergling.subscribe(request, gameUpdateCallback)
            .then(function (result) {
                if (result.subid) {
                    subIds[game.id] = result.subid;
                }
                gameUpdateCallback(result.data);
            })['catch'](function (reason) {
                console.log('Error:', reason);
            });
    };

    /**
     * @ngdoc function
     * @name unsubscribeFromgame
     * @methodOf vbet5.controller:gamesCtrl
     * @description unsubscribes from game updates
     * @param {object} game game object (only id field is used to find subscription in **subIds**)
     */
    $scope.unsubscribeFromgame = function unsubscribeFromgame(game) {
        if (subIds[game.id]) {
            console.log('unsubscribing from game', game.id);
            Zergling.unsubscribe(subIds[game.id]).then(function () { delete subIds[game.id]; });
        }
//        else {
//            console.warn('cannot unsubscribe from game', game, 'subId not found', subIds);
//        }
    };

    /**
     * Unsubscribe on page change
     */
    $rootScope.$on('$routeChangeSuccess', function () {
        angular.forEach(subIds, function (subId, gameId) {
            Zergling.unsubscribe(subId);
            delete subIds[gameId];
        });
    });

    /**
     * @ngdoc function
     * @name attachPinnedVideo
     * @methodOf vbet5.controller:gamesCtrl
     * @description attaches pinned video back to game container by sending 'game.attachVideo' message to children
     *
     * @param {Object} game game object
     */
    $scope.attachPinnedVideo = function attachPinnedVideo(game) {
        $scope.$broadcast('game.attachVideo', game);
        delete $scope.pinnedGames[game.id];
    };

    /**
     * @ngdoc function
     * @name showDetachedVideo
     * @methodOf vbet5.controller:gamesCtrl
     * @description called when getting 'game.detachVideo' message from child scope.
     * Assigns received game object to current scope's pinnedGame
     */
    $scope.$on('game.detachVideo', function showDetachedVideo(event, game) {
        $scope.pinnedGames[game.id] = game;
    });

    /**
     * this message is coming from flashplayer directive meaning that player is destroyed
     */
    $scope.$on('flashplayer.playerRemoved', function () {
        $scope.$broadcast('game.attachVideo', $scope.pinnedGame);
//        $scope.pinnedGame = null;
    });


    $scope.displayBase = GameInfo.displayBase;


    /**
     * @ngdoc method
     * @name refreshArrows
     * @methodOf vbet5.controller:gamesCtrl
     * @description Refresh arrows animation
     */
    $scope.refreshArrows = function refreshArrows() {
        $scope.arrowHide = 'hide';
        $timeout(function () {
            $scope.arrowHide = '';
        }, 100);
    };

    /**
     * @ngdoc method
     * @name getArrow
     * @methodOf vbet5.controller:gamesCtrl
     * @description Get arrow state based on +-
     */
    $scope.getArrow = function getArrow(input) {

        if ($scope.arrowHide === 'hide') {
            return 'hide-arrow';
        }

        switch (input) {
        case 1:
            return 'top-arrow';
        case -1:
            return 'bot-arrow';
        default:
            return '';
        }
    };

}]);