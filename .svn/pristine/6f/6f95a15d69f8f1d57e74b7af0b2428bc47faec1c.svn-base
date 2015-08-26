/**
 * @ngdoc controller
 * @name vbet5.controller:classicGameCtrl
 * @description
 * Classic mode game controller
 *
 *          ATTENTION!
 *          when adding dependencies to this controller, you must add them also in classicExplorerCtrl
 *          and pass it to this controller when extending it
 */
angular.module('vbet5.betting').controller('classicGameCtrl', ['$rootScope', '$scope', '$timeout', '$filter', '$q', 'Config', 'Zergling', 'Utils', 'Storage', 'GameInfo', 'partner', function ($rootScope, $scope, $timeout, $filter, $q, Config, Zergling, Utils, Storage, GameInfo, partner) {
    'use strict';

    var openGameSubId;
    var gameSubscriptionProgress = null;
    var firstTimeLoaded = false;
    var openGameId;

    $scope.eachWayPlace = GameInfo.eachWayPlace;
    $scope.getTimelinePosition = GameInfo.getTimelinePosition;
    $scope.framesCount = GameInfo.framesCount;
    $scope.isExtraTime = GameInfo.isExtraTime;
    $scope.getCurrentTime = GameInfo.getCurrentTime;
    $scope.getStatWidth = GameInfo.getStatWidth;
    $scope.showFrameAlias = GameInfo.showFrameAlias;
    $scope.displayBase = GameInfo.displayBase;
    $scope.isEventInBetSlip = GameInfo.isEventInBetSlip;


    //make video available as soon as user logs in
    $scope.$on('login.loggedIn', function () {
        GameInfo.getVideoData($scope.openGame);
    });
    //and unavailable when he logs out
    $scope.$on('login.loggedOut', function () {
        $scope.openGame.video_data = null;
    });



    /**
     * @ngdoc method
     * @name populateExpandedMarkets
     * @methodOf vbet5.controller:classicGameCtrl
     * @description
     *
     * @param {Object} marketsPack contains  markets
     * @param {Number} numberToExpand number of markets that should be expanded by default
     */
    var populateExpandedMarkets = function populateExpandedMarkets(marketsPack, numberToExpand) {
        var index = 1, key;
        if (numberToExpand !== 'all') {
            for (key in marketsPack) {
                if (index > numberToExpand) {
                    break;
                }
                if (marketsPack.hasOwnProperty(key)){
                    if (!$scope.expandedMarkets[$scope.openGame.id]) {
                        $scope.expandedMarkets[$scope.openGame.id] = [];
                        $scope.expandedMarkets[$scope.openGame.id].push(marketsPack[key][0].name);
                    } else if (Utils.isInArray($scope.expandedMarkets[$scope.openGame.id], marketsPack[key][0].name) === -1) {
                        $scope.expandedMarkets[$scope.openGame.id].push(marketsPack[key][0].name);
                    }
                    index++;

                }
            }
        }

    };

    /**
     * @ngdoc method
     * @name divideMarketsArray
     * @description  divinding the openGame.markets into two parts for making ng-repeat in two different columns
     * @methodOf vbet5.controller:classicGameCtrl
     * @param {Array} markets markets
     */
    function divideMarketsArray(markets) {
        if (!angular.isArray(markets)) {
            $scope.marketsFirstPack = $scope.marketsSecondPack = null;
            return;
        }
        var halfLength = Math.ceil(markets.length / 2);
        $scope.marketsFirstPack = markets.filter(function (value, index) {
            return index < halfLength;
        });
        $scope.marketsSecondPack = markets.filter(function (value, index) {
            return index >= halfLength;
        });
        if (firstTimeLoaded && Config.main.numberOfExpandedMarkets) {
            populateExpandedMarkets($scope.marketsFirstPack, Config.main.numberOfExpandedMarkets);
        }
    }




    /**
     * @ngdoc method
     * @name updateOpenGame
     * @methodOf vbet5.controller:classicGameCtrl
     * @description  updates open game data object
     *
     * @param {Object} data game data object
     */
    function updateOpenGame(data) {
        console.log('updateOpenGame', data);
        if (Utils.isObjectEmpty(data.sport) && openGameId) {
            $rootScope.$broadcast('liveGame.gameRemoved', openGameId);
        }
        angular.forEach(data.sport, function (sport) {
            angular.forEach(sport.region, function (region) {
                angular.forEach(region.competition, function (competition) {
                    angular.forEach(competition.game, function (game) {
                        game.sport = {id: sport.id, alias: sport.alias, name: sport.name};
                        game.region = {id: region.id};
                        game.competition = {id: competition.id, name: competition.name};
                        $scope.openGame = game;
                        $scope.openGame.setsOffset = $scope.openGame.setsOffset || 0;
                        // if teams shirt colors equal we change them to default colors
                        if ($scope.openGame.info && $scope.openGame.info.shirt1_color === $scope.openGame.info.shirt2_color) {
                            $scope.openGame.info.shirt1_color = "ccc";
                            $scope.openGame.info.shirt2_color = "f00";
                        }
                        if ($scope.openGame.last_event && $scope.openGame.last_event.type) {
                            $scope.openGame.last_event.type = $scope.openGame.last_event.type.replace(/ /g, '');
                        }
                        if ($scope.openGame.type === 1 && $scope.openGame.sport.alias === "Soccer") {
                            GameInfo.updateSoccerStatistics($scope.openGame);
                            GameInfo.generateTimeLineEvents($scope.openGame, $scope);
                            if ($scope.openGame.live_events) { //need this for sorting
                                $scope.openGame.live_events.map(function (event) {
                                    event.add_info_order = parseInt(event.add_info, 10);
                                });
                            }
                            if ($scope.openGame.last_event && $scope.openGame.last_event.type === "Goal") {
                                generateAutostopAnimationEvent($scope.openGame);
                            }
                        } else if ($scope.openGame.type === 1 && $scope.openGame.last_event && $scope.openGame.sport.alias === "Tennis") {
                            GameInfo.addGameScorePerTeam($scope.openGame.last_event, $scope.openGame);
                            GameInfo.setTennisCourtSide($scope.openGame.last_event, $scope.openGame);
                        }
                        if ($scope.openGame.sport.alias === "HorseRacing") {
                            GameInfo.getHorseRaceInfo($scope.openGame.info, $scope.openGame.market, "Winner");
                        }

                        var hasVideo = GameInfo.hasVideo($scope.openGame);
                        if (hasVideo) {
                            if ($scope.openGame.video_data === undefined) {
                                $scope.openGame.video_data = null; //not to call this several times before getVideoData fills the field
                                if ($scope.pinnedGames && !$scope.pinnedGames[$scope.openGame.id]) {
                                    GameInfo.getVideoData($scope.openGame);
                                } else {
                                    $scope.openGame.activeFieldType = 'field';
                                }
                            }
                        }
                        if (hasVideo && (Config.env.authorized || !$scope.openGame.last_event) && $scope.openGame.activeFieldType === undefined) {
                            $scope.openGame.activeFieldType = 'video';
                        } else if ($scope.openGame.activeFieldType === undefined) {
                            $scope.openGame.activeFieldType = 'field';
                        }

                        angular.forEach(game.market, function (market) {
                            angular.forEach(market.event, function (event) {
                                event.name = $filter('improveName')(event.name, game);
                                event.name = $filter('removeParts')(event.name, [market.name]);
                            });
                            market.events = Utils.objectToArray(market.event);
                        });
                    });
                });
            });

            $scope.refreshArrows();
        });

        if ($scope.openGame) {
            $scope.openGame.markets = Utils.objectToArray(Utils.groupByItemProperties($scope.openGame.market, ['type', 'name']));


            if ($scope.openGame.markets) {
                $scope.openGame.markets.sort(function (a, b) {
                    return a[0].order - b[0].order;
                });
                angular.forEach($scope.openGame.markets, function (groupedMarkets) {
                    groupedMarkets[0].name = $filter('improveName')(groupedMarkets[0].name, $scope.openGame);
                });
            }
            angular.forEach($scope.openGame.markets, function (market) {
                market.events = Utils.objectToArray(market.event);
            });
            divideMarketsArray($scope.openGame.markets);
            console.log('open game', $scope.openGame);
        }
    }


    /**
     * @ngdoc method
     * @name openGameFullDetails
     * @methodOf vbet5.controller:classicGameCtrl
     * @description  expands(or collapses if expanded) region menu (loads and subscribes/unsibscribes to game)
     *
     * @param {Object} game game data object
     * @param {Boolean} fromCustomWidget if it from custom widget
     * @param {Object} competition competition data object
     */
    $scope.openGameFullDetails = function openGameFullDetails(game, competition, fromCustomWidget) {
        firstTimeLoaded = true;
        openGameId = game.id;
        if (Config.main.customSportsBook.enabled && fromCustomWidget && !Config.main.customSportsBook.classic.showMarkets) {
            partner.handleGameClick(game, competition, $scope.selectedSport.id);
            return;
        }
        console.log('openGameFullDetails', game, competition);
        $scope.selectedGame = game;

        $scope.favoriteGameIsSelected = ($rootScope.myGames.indexOf(game.id) !== -1);

        if (competition) {
            $scope.selectedCompetition = competition;
        }
        $scope.openGameLoading = true;
        $scope.selectGame(game.id);

        function doSubscribe() {
            var subscribingProgress = $q.defer();
            gameSubscriptionProgress = subscribingProgress.promise;
            Zergling.subscribe(
                {
                    'source': 'betting',
                    'what': {
                        'sport': ['id', 'name', 'alias'],
                        'competition': ['id', 'name'],
                        'region': ['id'],
                        'game': [],
                        'market': [],
                        'event': []
                    },
                    'where': {'game': {'id': game.id}}
                },
                updateOpenGame
            )
                .then(function (result) {
                    if (result.subid) {
                        openGameSubId = result.subid;
                        subscribingProgress.resolve(result.subid);
                    }
                    if (result.data) {
                        updateOpenGame(result.data);
                    }
                    $scope.openGameLoading = false;

                })['catch'](function (reason) {
                    $scope.openGameLoading = false;
                    subscribingProgress.resolve(null);
                    console.log('Error:', reason);
                });
        }

        if (gameSubscriptionProgress === null) {
            doSubscribe();
        } else {
            gameSubscriptionProgress.then(function (subId) {
                Zergling.unsubscribe(subId);
                doSubscribe();
                openGameSubId = null;
            });
        }
    };

    $scope.selectGame = function (id) {
        console.log('selected game id: ' + id);
    };

    var lastAnimationType, lastAnimationSide, lastAnimationStart;
    /**
     * @ngdoc method
     * @name generateAutostopAnimationEvent
     * @methodOf vbet5.controller:classicGameCtrl
     * @description  generates animation event that will be stopped some time after occurring
     * @param {Object} game game object
     */
    function generateAutostopAnimationEvent(game) {
        var theEvent = game.last_event;
        if (lastAnimationType === theEvent.type && lastAnimationSide === theEvent.side) {
            return;
        }
        var currentMinute = game.info.currMinute || 0;
        var eventMinute = null;
        //event minute exists only for goal, corner, yellow and red card, for the rest events the timeout part will be working
        if (game.live_events.length && (game.live_events[game.live_events.length - 1].event_type === theEvent.type.toLowerCase())) {
            eventMinute = game.live_events[game.live_events.length - 1].add_info_order;
        }
        lastAnimationStart = new Date().getTime();

        if (currentMinute && eventMinute && (currentMinute - eventMinute > 2)) {
            theEvent.type = "StopAnimation";
        } else {
            $timeout(function () {
                if (lastAnimationStart < new Date().getTime() - 9000) {
                    theEvent.type = "stopAnimation";
                }
            }, 10000);
        }
    }




    $scope.toggleAnimationSound = function toggleAnimationSound(isMute) {
        if ($scope.openGame) {
            if (isMute) {
                $scope.openGame.isAnimationMute = !isMute;
            } else {
                $scope.openGame.isAnimationMute = true;
            }
        }
    };

    /**
     * @ngdoc method
     * @name changeStatsMode
     * @methodOf vbet5.controller:classicGameCtrl
     * @description  changes live games stats mode from chart to details and back
     */
    $scope.changeStatsMode = function changeStatsMode() {
        $scope.flipMode = $scope.flipMode || 0;
        $scope.flipMode = ($scope.flipMode + 1) % 3;
    };

    /**
     * @ngdoc method
     * @name toggleStatsVisibility
     * @methodOf vbet5.controller:classicGameCtrl
     * @description  toggles live game statistics visibility
     */
    $scope.toggleStatsVisibility = function toggleStatsVisibility() {
        $scope.showStatsBlock = !$scope.showStatsBlock;
    };

    /**
     * @ngdoc method
     * @name slide
     * @methodOf vbet5.controller:classicGameCtrl
     * @description  slides to next/previous set
     */
    $scope.slide = function slide(direction, allSets) {
        if (direction === 'left') {
            if ($scope.openGame.setsOffset > 0) {
                $scope.openGame.setsOffset--;
            }
        } else if (direction === 'right') {
            if ($scope.openGame.setsOffset < allSets - $scope.visibleSetsNumber) {
                $scope.openGame.setsOffset++;
            }
        }
    };



    /**
     * @ngdoc method
     * @name toggleLiveSectionPin
     * @methodOf vbet5.controller:classicGameCtrl
     * @description pins/unpin live score section at the top of middle section
     */
    $scope.toggleLiveSectionPin = function toggleLiveSectionPin() {
        $scope.isLiveGamePinned = !$scope.isLiveGamePinned;
        if ($scope.isLiveGamePinned && Config.env.hideLiveStats) {
            Config.env.hideLiveStats = false;
        }
        Storage.set('LiveGamePin', $scope.isLiveGamePinned);
    };

    if (Storage.get('LiveGamePin')) {
        $scope.isLiveGamePinned = Storage.get('LiveGamePin');
    }

    //initial values for ordering of horse_cards
    $scope.raceCardsPredicate = 'cloth';
    $scope.raceCardsReverce = false;

    /**
     * @ngdoc method
     * @name raceCardsColumnClick
     * @methodOf vbet5.controller:classicGameCtrl
     * @description changes data that  used for ordering raceCards elements
     *
     * @param {String} orderItem orderItem string: value of predicate
     */
    $scope.raceCardsColumnClick = function raceCardsColumnClick(orderItem) {
        if (orderItem === 'price' && !$scope.openGame.info.race.horseStats[0].event.price) {
            return;
        }
        if ($scope.raceCardsPredicate === orderItem) {
            $scope.raceCardsReverce = !$scope.raceCardsReverce;
        } else {
            $scope.raceCardsReverce = false;
            $scope.raceCardsPredicate = orderItem;
        }
    };

    /**
     * @ngdoc method
     * @name raceCardsOrder
     * @methodOf vbet5.controller:classicGameCtrl
     * @description to be used by the comparator to determine the order of  raceCards elements
     *
     * @param {Object} horseStat horseStat object
     */
    $scope.raceCardsOrder = function raceCardsOrder(horseStat) {
        switch ($scope.raceCardsPredicate) {
        case 'cloth':
            return parseInt(horseStat.cloth, 10);
        case 'price':
            return parseFloat(horseStat.event.price);
        }

        return -1;
    };

    /**
     * @ngdoc method
     * @name bet
     * @methodOf vbet5.controller:classicGameCtrl
     * @description  sends a message to betslip[ to add a bet
     *
     * @param {Object} event event object
     * @param {Object} market event's market object
     * @param {Object} openGame game object
     * @param {String} [oddType] odd type (odd or sp)
     */
    $scope.bet = function bet(event, market, openGame, oddType) {
        oddType = oddType || 'odd';
        var game = Utils.clone(openGame);
        if (Config.main.phoneOnlyMarkets && Config.main.phoneOnlyMarkets.enable && game.type == 1) {
            return;
        }
        $rootScope.$broadcast('bet', {event: event, market: market, game: game, oddType: oddType});
    };

    $scope.expandedMarkets = {};

    /**
     * @ngdoc method
     * @name toggleGroupedMarket
     * @methodOf vbet5.controller:classicGameCtrl
     * @description expanding/collapsing grouped markets
     * @param {String} marketName grouped marketName
     */
    $scope.toggleGroupedMarket = function (marketName) {
        firstTimeLoaded = false;
        if ($scope.expandedMarkets[$scope.openGame.id] && Utils.isInArray($scope.expandedMarkets[$scope.openGame.id], marketName) > -1) {
            Utils.removeElementFromArray($scope.expandedMarkets[$scope.openGame.id], marketName);
        } else {
            if (!$scope.expandedMarkets[$scope.openGame.id]) {
                $scope.expandedMarkets[$scope.openGame.id] = [];
            }
            $scope.expandedMarkets[$scope.openGame.id].push(marketName);
        }
    };

    $scope.isMarketClosed = function isMarketClosed(marketName) {
        if ($scope.openGame) {
            var result = $scope.expandedMarkets[$scope.openGame.id] && Utils.isInArray($scope.expandedMarkets[$scope.openGame.id], marketName) !== -1;
            if (!Config.main.numberOfExpandedMarkets || Config.main.numberOfExpandedMarkets === 'all') {
                return result;
            }
            return !result;
        }
    };

    var maxBetRequests = {};

    /**
     * @ngdoc method
     * @name displayEventLimit
     * @methodOf vbet5.controller:classicGameCtrl
     * @param {Object} event  event object
     * @description loads max bet for event and stores it in event's maxBet property
     */
    $scope.displayEventLimit = function displayEventLimit(event) {
        if (!Config.main.displayEventsMaxBet || !Config.env.authorized || maxBetRequests[event.id]) {
            return;
        }
        //console.log("displayEventLimit", event);
        maxBetRequests[event.id] = $timeout(function () {
            Zergling.get({events: [event.id]}, 'get_max_bet').then(function (response) {
                event.maxBet =  (response && response.result);
                maxBetRequests[event.id] = undefined;
            });
        }, 500);

    };

    /**
     * @ngdoc method
     * @name cancelDisplayEventLimit
     * @methodOf vbet5.controller:classicGameCtrl
     * @param {Object} event  event object
     * @description cancels displayEventLimit request for event
     */
    $scope.cancelDisplayEventLimit = function cancelDisplayEventLimit(event) {
        if (maxBetRequests[event.id]) {
            $timeout.cancel(maxBetRequests[event.id]);
            maxBetRequests[event.id] = undefined;
        }
        //console.log("cancelDisplayEventLimit", event);
    };

    /**
     * @ngdoc method
     * @name refreshArrows
     * @methodOf vbet5.controller:classicGameCtrl
     * @description Refresh arrows animation
     */
    $scope.refreshArrows = function refreshArrows() {
        $scope.arrowHide = 'hide';
        $timeout(function () {
            $scope.arrowHide = '';
        }, 100);
    };

    $scope.$on('$destroy', function () {
        console.log("unsubscribing from open game", openGameSubId);
        if (openGameSubId) {
            Zergling.unsubscribe(openGameSubId);
        }
    });
}]);