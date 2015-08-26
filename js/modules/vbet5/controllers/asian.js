/* global VBET5 */
/**
 * @ngdoc controller
 * @name vbet5.controller:asianController
 * @description
 *  asian view controller
 */
VBET5.controller('asianController', ['$rootScope', '$scope', '$filter', '$location', '$timeout', 'Utils', 'Zergling', 'Moment', '$q', 'Translator', 'GameInfo', 'AsianMarkets', 'Storage', 'Config',
    function ($rootScope, $scope, $filter, $location, $timeout, Utils, Zergling, Moment, $q, Translator, GameInfo, AsianMarkets, Storage, Config) {
        'use strict';

        $scope.selectedCompetitionsModel = {};
        $scope.competitionsList = [];
        $scope.isEventInBetSlip = GameInfo.isEventInBetSlip;
        $scope.orderedByTime = Config.main.competitionsOrderByTimeInAsianView;
        $scope.marketGameCounts = {};
        $scope.sortAscending = true;
        $scope.visibleSetsNumber = 5;
        $scope.framesCount = GameInfo.framesCount;
        $scope.getStatWidth = GameInfo.getStatWidth;
        $scope.getCurrentTime = GameInfo.getCurrentTime;
        $scope.conf = Config.main;

        $scope.bet = function bet(event, market, openGame, oddType) {
            console.log("bet", event, market, openGame, oddType);
            oddType = oddType || 'odd';
            var game = Utils.clone(openGame);
            $rootScope.$broadcast('bet', {event: event, market: market, game: game, oddType: oddType});
        };

        var gamesSubsciptionProgress = null, competitionsFilterSubsciptionProgress = null, loadAllEventsProgress = null;
        var allSubscriptions = {}, gameCountSubscriptions = {}, gamesSubId = null, leftMenuSubId = null, competitionsFilterSubId = null, singleGameSubId = null;

        $scope.asianMarkets = AsianMarkets;
        var lastCenterData = {};
        var LEFT_MENU = {
            FUTURE: 0,
            LIVE: 1,
            TODAY: 2
        };

        $scope.selectedMenuType = {active: LEFT_MENU.LIVE};
        $scope.LEFT_MENU = LEFT_MENU;

        $scope.leftMenuSports = [];
        $scope.dayFilter = [];
        $scope.filters = {
            selectedDays: [],
            allDays: {name: "All", selected: null}
        };
        $scope.filterName = 'All';

        function updateLeftMenu(data) {
            console.log('updateLeftMenu', data);
            $scope.leftMenuSports = Utils.objectToArray(data.sport);
        }

        function unsubscribe(id) {
            if (id) {
                Zergling.unsubscribe(id);
            }
        }

        $scope.setMenuType = function setMenuType(value) {
            value === 2 ? Config.env.live = false : Config.env.live = value;
            $scope.selectedMenuType.active = value;
            $location.search('type', value);
        };

        $scope.$on('asianMenu', function () {
            $scope.selectedMenuType.active = +!$scope.selectedMenuType.active;
        });

        /**
         * @ngdoc method
         * @name setTimeFilter
         * @methodOf vbet5.controller:asianController
         * @description adds time conditions to request according to type selected in left menu (future, live, today)
         *
         * @param {Object} request request object
         */
        function setTimeFilter(request) {
            request.where.game = request.where.game || {};
            if ($scope.selectedMenuType.active === LEFT_MENU.FUTURE) {
                request.where.game.type = 0;
            }
            if ($scope.selectedMenuType.active === LEFT_MENU.LIVE) {
                request.where.game.type = 1;
            }
            if ($scope.selectedMenuType.active === LEFT_MENU.TODAY) {
                request.where.game['@or'] = [{
                    'start_ts': {
                        '@gte': $scope.dayFilter[0].from,
                        '@lt': $scope.dayFilter[0].to
                    }
                }];
            }
        }

        /**
         * @ngdoc method
         * @name subscribeToLiveGameCounts
         * @methodOf vbet5.controller:asianController
         * @description  Subscribes to live games counts and updates $scope's liveGamesCount object properties
         */
        function subscribeToLiveGameCounts() {
            var request = {
                'source': 'betting',
                'what': {'game': '@count'},
                'where': {'game': {'type': 1}, market: {show_type: {"@gt": ""}}}
            };

            Zergling.subscribe(
                request,
                function (data) {
                    $scope.liveGamesCount = data.game;
                }
            )
                .then(function (result) {
                    if (result.subid) {
                        allSubscriptions[result.subid] = result.subid;
                    }
                    if (result.data) {
                        $scope.liveGamesCount = result.data.game;
                    }
                })['catch'](function (reason) {
                    console.warn('subscribeToLiveGameCounts error:', reason);
                });
        }

        var correctScorePattern = /\d:\d/;
        function eventCompareFunc(a, b) { return a.price - b.price;}

        /**
         * @ngdoc method
         * @name groupMarketEvents
         * @methodOf vbet5.controller:asianController
         * @description Performs special event grouping for market if needed
         *
         * @param {Object} market the market object
         * @returns {boolean} true if market events still need the generic grouping, false if no(when needed grouping is already done in this function)
         */
        function groupMarketEvents(market) {
            if (market.show_type === 'CORRECTSCORE') {
                var scores, index1 = 0, index2 = 0, index3 = 0;
                market.linesEvents = [];
                angular.forEach(market.event, function (event) {
                    event.scores = '' + (correctScorePattern.exec(event.name) || event.name);
                    scores =  event.scores.split(":");
                    if (scores[0] > scores[1]) {
                        market.linesEvents[index1] = market.linesEvents[index1] || {};
                        market.linesEvents[index1++].firstWin = event;
                    } else if (scores[0] < scores[1]) {
                        market.linesEvents[index2] = market.linesEvents[index2] || {};
                        market.linesEvents[index2++].secondWin = event;
                    } else {
                        market.linesEvents[index3] = market.linesEvents[index3] || {};
                        market.linesEvents[index3++].handicap = event;
                    }
                });
                return false;
            }
            if (market.show_type === 'OUTRIGHT') {
                market.events = Utils.objectToArray(market.event).sort(eventCompareFunc);
                return false;
            }
            return true;
        }

        function handicapSortFunc(market1, market2) {
            if (!market1.hasOwnProperty('Handicap1') || !market1.hasOwnProperty('Handicap2')) {
                return 1;
            }
            if (!market2.hasOwnProperty('Handicap1') || !market2.hasOwnProperty('Handicap2')) {
                return -1;
            }
            return Math.abs(market1.Handicap1.price - market1.Handicap2.price) - Math.abs(market2.Handicap1.price - market2.Handicap2.price);
        }
        function overUnderSortFunc(market1, market2) {
            if (!market1.hasOwnProperty('OVER') || !market1.hasOwnProperty('UNDER')) {
                return 1;
            }
            if (!market2.hasOwnProperty('OVER') || !market2.hasOwnProperty('UNDER')) {
                return -1;
            }
            return Math.abs(market1.OVER.price - market1.UNDER.price) - Math.abs(market2.OVER.price - market2.UNDER.price);
        }

        /**
         * @ngdoc method
         * @name groupBySequenceAndTypes
         * @methodOf vbet5.controller:asianController
         * @description Performs grouping of markets by sequence and show_type.
         * additionally groups events inside markets
         *
         * @param {Object} game the game object
         */
        function groupBySequenceAndTypes(game) {
            //console.log('groupBySequenceAndTypes');
            var markets = {};
            game.marketRows = {};
            game.availableSequences = game.availableSequences || [];
            angular.forEach(game.market, function (market) {
                var groupingNeeded = groupMarketEvents(market);          // if special grouping is needed for market,
                if (groupingNeeded) {                                    // the normal grouping won't be done
                    angular.forEach(market.event, function (event) {
                        market[event.show_type || event.type] = event;
                    });
                }
                game.avalableMarketTypes = game.avalableMarketTypes || {};
                game.avalableMarketTypes[market.show_type] = market.show_type;

                if (market.sequence) {
                    if (game.availableSequences.indexOf(market.sequence) === -1) {
                        game.availableSequences.push(market.sequence);
                    }
                    markets[market.sequence] = markets[market.sequence] || {};
                    markets[market.sequence][market.show_type] = markets[market.sequence][market.show_type] || [];
                    markets[market.sequence][market.show_type].push(market);
                    game.marketRows[market.sequence] = Math.max(markets[market.sequence][market.show_type].length, game.marketRows[market.sequence] || 0);
                }
            });
            if (game.availableSequences.length) {
                game.availableSequences.sort();
            } else {
                markets = Utils.objectToArray(game.market);
            }

            if (!game.selectedSequence) {
                game.selectedSequence = game.availableSequences[0];
            }
            if (game.avalableMarketTypes.HANDICAP) {
                angular.forEach(markets, function (seq) {
                    if (seq.HANDICAP && seq.HANDICAP.length > 1) {
                        seq.HANDICAP.sort(handicapSortFunc);
                    }
                });
            }

            var sportType = AsianMarkets.marketsBySport[game.sport.alias] || AsianMarkets.marketsBySport.Default;
            var pointsTypeForMarket = sportType.HDP[sportType.HDP.length - 1];
            if (game.avalableMarketTypes[pointsTypeForMarket]) {
                angular.forEach(markets, function (seq) {
                    if (seq[pointsTypeForMarket] && seq[pointsTypeForMarket].length > 1) {
                        seq[pointsTypeForMarket].sort(overUnderSortFunc);
                    }
                });
            }

            angular.forEach(game.marketRows, function (marketRow, key) {
                game.marketRows[key] = new Array(game.marketRows[key] - 1);
            });
            game.halfTimeSequence = '1STHALF'; //  markets['1STHALF'] ? '1STHALF' : '2NDHALF';  //for now it always 1st half
            game.moreMarketsCount = game.markets_count - $filter("count")(game.avalableMarketTypes);
            game.markets = markets;
        }

        /**
         * @ngdoc method
         * @name groupBySequenceAndTypes
         * @methodOf vbet5.controller:asianController
         * @description Performs grouping of markets by sequence and show_type.
         * additionally groups events inside markets
         *
         * @param {Object} game the game object
         */
        function groupByTypesAndSequence(game) {
            //console.log('groupBySequenceAndTypes');
            var markets = {};
            game.marketRows = {};
            game.otherMarkets = [];
            game.otherMarkets = [];
            game.availableSequences = {};
            game.selectedSequence = game.selectedSequence || {};
            angular.forEach(game.market, function (market) {

                var groupingNeeded = groupMarketEvents(market);          // if special grouping is needed for market,
                if (groupingNeeded) {                                    // the normal grouping won't be done
                    angular.forEach(market.event, function (event) {
                        market[event.show_type || event.type] = event;
                    });
                }
                if (market.show_type) {
                    game.availableSequences[market.show_type] = game.availableSequences[market.show_type] || [];
                    if (market.sequence) {
                        if (game.availableSequences[market.show_type].indexOf(market.sequence) === -1) {
                            game.availableSequences[market.show_type].push(market.sequence);
                        }
                        game.availableSequences[market.show_type].sort();
                        game.selectedSequence[market.show_type] = game.selectedSequence[market.show_type] || game.availableSequences[market.show_type][0];

                    }
                    markets[market.show_type] = markets[market.show_type] || {};
                    markets[market.show_type][market.sequence] = markets[market.show_type][market.sequence] || [];
                    markets[market.show_type][market.sequence].push(market);
                } else {
                    game.otherMarkets.push(market);
                }
            });
            if (markets.HANDICAP) {
                angular.forEach(markets.HANDICAP, function (seq) {
                    if (seq.length > 1) {
                        seq.sort(handicapSortFunc);
                    }
                });
            }
            angular.forEach(game.marketRows, function (marketRow, key) {
                game.marketRows[key] = new Array(game.marketRows[key] - 1);
            });

            game.markets = markets;
        }

        function updateGames(data) {
            var centerData = {};
            centerData.competitions = [];
            angular.forEach(data.sport, function (sportData) {
                angular.forEach(sportData.region, function (region) {
                    angular.forEach(region.competition, function (competition) {
                        competition.name = $filter('removeParts')(competition.name, [sportData.name]);
                        if (competition.game) {
                            competition.games = Utils.objectToArray(competition.game);
                            angular.forEach(competition.games, function (game) {
                                game.sport = {'alias': sportData.alias, name: sportData.name, id: sportData.id};
                                game.region = {'alias': region.alias, name: region.name, id: region.id};
                                game.competition = {name: competition.name, id: competition.id};
                                groupBySequenceAndTypes(game);
                            });
                        }
                        centerData.competitions.push(competition);
                    });
                });
            });
            centerData.competitions.sort($scope.sortAscending ? Utils.orderSortingFn : Utils.orderSortingFnReverse);

            if ($scope.orderedByTime) {
                $scope.orderByTime(centerData);
            } else {
                $scope.centerData = centerData;
            }
            lastCenterData = centerData;
            $scope.marketGamesAreLoading = false;

            if(centerData.competitions.length === 0 && $scope.filters.allDays.selected) {
                $scope.openMarket({key: 'OUR'});
            }
        }

        function updateOpenGame(data) {
            console.log('updateOpenGame', data);
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
                            $scope.openGame.setsOffset = $scope.openGame.setsOffset || 0;
                            if ($scope.openGame.type === 1 && $scope.openGame.sport.alias === "Soccer") {
                                GameInfo.updateSoccerStatistics($scope.openGame);
                            }
                            console.log("openGame", $scope.openGame);
                            if ($scope.openGame.sport.alias === "HorseRacing") {
                                GameInfo.getHorseRaceInfo($scope.openGame.info, $scope.openGame.market, "Winner");
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
            });
            groupByTypesAndSequence($scope.openGame);
        }

        $scope.goBackFromOpenGame = function goBackFromOpenGame() {
            $scope.openMarket({key: $scope.previouslyOpenedMarketKey});
            $scope.previouslyOpenedMarketKey = null;
        };

        /**
         * @ngdoc method
         * @name loadAllEvents
         * @methodOf vbet5.controller:asianController
         * @description load all events when more is clicked
         */
        $scope.loadAllEvents = function loadAllEvents(gameId) {
            Zergling.unsubscribe(gamesSubId);
            $scope.previouslyOpenedMarketKey = $scope.selectedMarket.key;
            $scope.selectedMarket = {key: 'FULLGAME'};
            function doSubscribe() {
                var deferred = $q.defer();
                loadAllEventsProgress = deferred.promise;
                var request = {
                    'source': 'betting',
                    'what': {
                        sport: ['id', 'name', 'alias'],
                        competition: ['name', 'order', 'id'],
                        region: ['name', 'alias', 'id'],
                        game: ['id', 'team1_name', 'team2_name', 'info', 'start_ts', 'type', 'text_info', 'stats', 'last_event'],
                        market: [],
                        event: []
                    },
                    'where': {
                        'sport': {'id': $scope.selectedSport.id},
                        'game': {'id': gameId}
                    }
                };
                Zergling.subscribe(
                    request,
                    updateOpenGame
                )
                    .then(function (result) {
                        if (result.subid) {
                            singleGameSubId = result.subid;
                            allSubscriptions[result.subid] = result.subid;
                            deferred.resolve(gamesSubId);

                        }
                        if (result.data) {
                            updateOpenGame(result.data);
                        }

                    })['catch'](function (reason) {
                        console.log('Error:', reason);
                        deferred.resolve(null);
                    });
            }
            if (loadAllEventsProgress === null) {
                doSubscribe();
            } else {
                loadAllEventsProgress.then(function (subId) {
                    Zergling.unsubscribe(subId);
                    doSubscribe();
                    loadAllEventsProgress = null;
                });
            }
        };

        /**
         * @ngdoc method
         * @name loadGames
         * @methodOf vbet5.controller:asianController
         * @description
         */
        $scope.loadGames = function loadGames() {
            $scope.marketGamesAreLoading = true;
            function doSubscribe() {

                var deferred = $q.defer();
                gamesSubsciptionProgress = deferred.promise;
                var showTypes = ($scope.asianMarkets.marketsBySport[$scope.selectedSport.alias] || $scope.asianMarkets.marketsBySport.Default)[$scope.selectedMarket.key];
                var request = {
                    'source': 'betting',
                    'what': {
                        sport: ['id', 'name', 'alias'],
                        competition: ['name', 'order', 'id'],
                        region: ['name', 'alias', 'id'],
                        'game': ['id', 'team1_name', 'team2_name', 'info', 'start_ts', 'type', 'text_info', 'events_count', 'markets_count'],
                        market: ['base', 'id', 'name', 'order', 'sequence', 'show_type'],
                        event: ['name', 'id', 'base', 'type', 'price', 'show_type']
                    },
                    'where': {
                        'sport': {'id': $scope.selectedSport.id},
                        'market': {'show_type': {'@in': showTypes}}
                    }
                };
                setTimeFilter(request);
                if ($scope.competitionsList && $scope.competitionsList.length) {
                    request.where.competition = request.where.competition || {}; // ???
                    request.where.competition.id = {'@in' : $scope.competitionsList};
                }

                if (($scope.selectedMenuType.active === LEFT_MENU.FUTURE) && $scope.filters.selectedDaysTimeIntervals && $scope.filters.selectedDaysTimeIntervals.length > 0) {
                    request.where.game['@or'] = $scope.filters.selectedDaysTimeIntervals;
                }
                console.log('loadGames request', request);
                Zergling.subscribe(
                    request,
                    updateGames
                )
                    .then(function (result) {
                        if (result.subid) {
                            gamesSubId = result.subid;
                            allSubscriptions[result.subid] = result.subid;
                            deferred.resolve(gamesSubId);
                        }
                        if (result.data) {
                            updateGames(result.data);
                        }

                    })['catch'](function (reason) {
                        console.log('Error:', reason);
                        deferred.resolve(null);
                    });
            }

            if (gamesSubsciptionProgress === null) {
                doSubscribe();
            } else {
                gamesSubsciptionProgress.then(function (subId) {
                    Zergling.unsubscribe(subId);
                    doSubscribe();
                    gamesSubId = null;
                });
            }
        };

        /**
         * @ngdoc method
         * @name updateCompetitionsFilterData
         * @methodOf vbet5.controller:asianController
         * @description receives available competitions list from swarm and stroes in corresponding scope variable
         */
        function updateCompetitionsFilterData(data) {
            //$scope.competitionsFilter = Utils.objectToArray(data.competition).sort(Utils.orderSortingFn);
            $scope.competitionsFilter = Utils.objectToArray(data.competition).sort(Utils.orderSortingFnAlphabetic);

            angular.forEach($scope.competitionsFilter, function (competition) {
                competition.name = $filter('removeParts')(competition.name, [$scope.selectedSport.name]);
            });
            $scope.selectedAll = true;
            $scope.checkAll();
            $scope.updateCompetitionsFilter();
        }

        /**
         * @ngdoc method
         * @name updateCompetitionsFilter
         * @methodOf vbet5.controller:asianController
         * @description updates competitions filter (when OK cis clicked)
         */
        $scope.updateCompetitionsFilter = function updateCompetitionsFilter() {
            $scope.competitionsList = [];
            angular.forEach($scope.selectedCompetitionsModel, function (value, competition) {
                if (value) {
                    $scope.competitionsList.push(+competition);
                }
            });
        };

        /**
         * @ngdoc method
         * @name loadAvailableCompetitionsForSelectedMarket
         * @methodOf vbet5.controller:asianController
         * @description loads available competitions list for competitions filter
         */
        function loadAvailableCompetitionsForSelectedMarket() {
            $scope.selectedCompetitions = null;
            function doSubscribe() {
                var deferred = $q.defer();
                competitionsFilterSubsciptionProgress = deferred.promise;
                var showTypes = ($scope.asianMarkets.marketsBySport[$scope.selectedSport.alias] || $scope.asianMarkets.marketsBySport.Default)[$scope.selectedMarket.key];
                var request = {
                    'source': 'betting',
                    'what': {competition: ['name', 'order', 'id']},
                    'where': {
                        'sport': {'id': $scope.selectedSport.id},
                        'market': {'show_type': {'@in': showTypes}}
                    }
                };
                setTimeFilter(request);

                console.log('loadAvailableCompetitionsForSelectedMarket request', request);
                Zergling.subscribe(
                    request,
                    function (data) {
                        updateCompetitionsFilterData(data, true);
                    }
                )
                    .then(function (result) {
                        if (result.subid) {
                            competitionsFilterSubId = result.subid;
                            allSubscriptions[result.subid] = result.subid;
                            deferred.resolve(competitionsFilterSubId);
                        }
                        if (result.data) {
                            updateCompetitionsFilterData(result.data);
                        }

                    })['catch'](function (reason) {
                        console.log('Error:', reason);
                        deferred.resolve(null);
                    });
            }

            if (competitionsFilterSubsciptionProgress === null) {
                doSubscribe();
            } else {
                competitionsFilterSubsciptionProgress.then(function (subId) {
                    Zergling.unsubscribe(subId);
                    doSubscribe();
                    competitionsFilterSubId = null;
                });
            }
        }

        function updateMarketGameCounts(data, sportAlias, marketsGroup) {
            console.log('updateMarketGameCounts', data, sportAlias, marketsGroup);
            $scope.marketGameCounts[sportAlias] = $scope.marketGameCounts[sportAlias] || {};
            $scope.marketGameCounts[sportAlias][marketsGroup] = data.game;
        }

        function loadSportMarketGameCounts(sport, showTypes, marketsGroup) {
            var request = {
                'source': 'betting',
                'what': {
                    'game': '@count'
                },
                where: {
                    "sport": {id: sport.id},
                    "market": {"show_type": {'@in': showTypes}}
                }
            };
            setTimeFilter(request);
            Zergling.subscribe(
                request,
                function (data) {
                    updateMarketGameCounts(data, sport.alias, marketsGroup);
                }
            )
                .then(function (result) {
                    if (result.subid) {
                        allSubscriptions[result.subid] = result.subid;
                        gameCountSubscriptions[result.subid] = result.subid;
                    }
                    if (result.data) {
                        updateMarketGameCounts(result.data, sport.alias, marketsGroup);
                    }

                })['catch'](function (reason) {
                    console.log('Error:', reason);
                });
        }

        function closeOpenGame() {
            $scope.openGame = null;
            if (singleGameSubId) {
                Zergling.unsubscribe(singleGameSubId);
            }

        }

        $scope.openSport = function openSport(sport, market, initial) {
            console.log("openSPort", sport, market, initial);
            closeOpenGame();
            if ($scope.selectedSport && !initial) {
                if (sport.id === $scope.selectedSport.id) {
                    $scope.selectedSport.closedTab = !$scope.selectedSport.closedTab;
                    if (market && $scope.previouslyOpenedMarketKey) {
                        $scope.openMarket(market);
                        $scope.previouslyOpenedMarketKey = null;
                    }
                    return;
                }
            }
            $scope.selectedSport = sport;
            Zergling.unsubscribe(Utils.objectToArray(gameCountSubscriptions))['finally'](function () {
                angular.forEach(AsianMarkets.marketsBySport[sport.alias] || AsianMarkets.marketsBySport.Default, function (markets, marketsGroup) {
                    loadSportMarketGameCounts(sport, markets, marketsGroup);
                });
            });

            if (market) {
                $scope.openMarket(market);
            }
        };

        /**
         * @ngdoc method
         * @name openMarket
         * @methodOf vbet5.controller:asianController
         * @description selects sport market and loads right side view for it
         */
        $scope.openMarket = function openMarket(market) {
            closeOpenGame();
            $scope.selectedCompetitionsModel = {};
            $scope.competitionsList = [];
            console.log('openMarket', market);
            $scope.marketGamesAreLoading = true;
            $scope.selectedMarket = market;
            if (market.key === 'HDP') {
                var sport = AsianMarkets.marketsBySport[$scope.selectedSport.alias] || AsianMarkets.marketsBySport.Default;
                $scope.pointsTypeForMarket = sport.HDP[sport.HDP.length - 1];
            }
            loadAvailableCompetitionsForSelectedMarket();
            $scope.loadGames();
        };

        function loadLeftMenu() {
            unsubscribe(leftMenuSubId);
            $scope.leftMenuIsLoading = true;
            var request = {
                'source': 'betting',
                'what': {
                    'sport': ['id', 'name', 'alias', 'order'],
                    'game': '@count'
                },
                where: {
                    "market": {"show_type": {"@gt": ""}}
                }
            };
            setTimeFilter(request);

            Zergling.subscribe(
                request,
                updateLeftMenu
            )
                .then(function (result) {
                    if (result.subid) {
                        leftMenuSubId = result.subid;
                    }
                    if (result.data) {
                        updateLeftMenu(result.data);
                        $scope.openSport($scope.leftMenuSports[0], {key: 'HDP'}, true);
                    }
                    $scope.leftMenuIsLoading = false;
                })['catch'](function (reason) {
                    console.log('Error:', reason);
                });
        }

        $scope.$watch('selectedMenuType.active', loadLeftMenu);

        function createDayNames() {
            var i;
            for (i = 0; i < 7; i++) {
                $scope.dayFilter.push({
                    to: Moment.get().add(i, 'days').endOf("day").unix(),
                    from: Moment.get().add(i, 'days').startOf("day").unix(),
                    id: i,
                    name: Moment.get().add(i, 'days').startOf("day").format("ddd D")
                });
            }
        }

        function defaultSelectedDays(count) {
            var i, days = [];
            for (i = 0; i < count; i += 1) {
                days.push({'@gte': $scope.dayFilter[i].from, '@lt': $scope.dayFilter[i].to});
                $scope.filters.selectedDays[i] = true;
            }
            $scope.filters.selectedDaysTimeIntervals = days.map(function (element) {
                return {'start_ts': element};
            });
        }

        function initDateFilters() {
            var name, count = 0;

            if (Storage.get('asianViewDateFilter')) {
                count = Storage.get('asianViewDateFilter')[0], name = '';
                $scope.filters = Storage.get('asianViewDateFilter')[1];
                $scope.filters.selectedDaysTimeIntervals = Storage.get('asianViewDateFilter')[2];
                angular.forEach($scope.dayFilter, function (selected, id) {
                    if ($scope.filters.selectedDays[id]) {
                        name = $scope.dayFilter[id].name;
                    }
                });
            } else {
                defaultSelectedDays(Config.main.asianLoadDays);
                count = $scope.filters.selectedDaysTimeIntervals.length;
                name = $scope.dayFilter[0].name;
            }
            if (count !== 0) {
                $scope.filterName = count === 1 ? name : "...";
            } else {
                $scope.filterName = Translator.get("All");
            }
        }

        /**
         * Initialize controller
         */
        function init() {
            if ($location.search().type) {
                $scope.selectedMenuType.active = parseInt($location.search().type, 10);
            }
            createDayNames();
            initDateFilters();
            loadLeftMenu();
            subscribeToLiveGameCounts();
        }

        /**
         * Handle allDay checkbox
         */
        $scope.toggleAllDays = function toggleAllDays() {
            if($scope.filters.allDays.selected) {
                $scope.filters.filterNameTemp = $scope.filterName;
                $scope.filters.selectedDaysTemp = $scope.filters.selectedDays;
                $scope.filters.selectedDaysTimeIntervalsTemp = $scope.filters.selectedDaysTimeIntervals;
                $scope.filters.selectedDays = [];
                $scope.filters.selectedDaysTimeIntervals = [];
                $scope.filterName = Translator.get("All");
            } else {
                $scope.filters.selectedDays = $scope.filters.selectedDaysTemp;
                $scope.filters.selectedDaysTimeIntervals = $scope.filters.selectedDaysTimeIntervalsTemp;
                $scope.filterName = $scope.filters.filterNameTemp;
            }

            $scope.loadGames();
        };

        /**
         * Handle day checkboxes select then load games
         */
        $scope.toggleDay = function toggleDay() {
            var days = [], count = 0, name = '';
            //console.table($scope.dayFilter);
            if($scope.filters.allDays.selected) {
                $scope.filters.allDays.selected = false;
            }

            angular.forEach($scope.dayFilter, function (selected, id) {
                if ($scope.filters.selectedDays[id]) {
                    name = $scope.dayFilter[id].name;
                    count++;
                    if ($scope.filters.selectedDays[id - 1]) {
                        days[days.length - 1] = {'@gte': days[days.length - 1]['@gte'], '@lt': $scope.dayFilter[id].to};
                    } else {
                        days.push({'@gte': $scope.dayFilter[id].from, '@lt': $scope.dayFilter[id].to});
                    }
                }
            });
            $scope.filters.selectedDaysTimeIntervals = days.map(function (element) {
                return {'start_ts': element};
            });
            if (count !== 0) {
                $scope.filterName = count === 1 ? name : "...";
            } else {
                $scope.filterName = Translator.get("All");
                $scope.filters.allDays.selected = true;
            }

            //for save Data in Local Storage
            var asianViewDateFilter = [];
            asianViewDateFilter.push(count);
            asianViewDateFilter.push($scope.filters);
            asianViewDateFilter.push($scope.filters.selectedDaysTimeIntervals);
            Storage.set('asianViewDateFilter', asianViewDateFilter, 86400000);

            $scope.loadGames();
        };

        $scope.changeSortOrder = function changeSortOrder() {
            $scope.sortAscending = !$scope.sortAscending;
            $scope.orderByTime();
        };

        /**
         * @ngdoc method
         * @name sortByDate
         * @methodOf vbet5.controller:sortByDate
         * @description Order games by time
         */

        function doOrderByTime(centerData) {
            if (!$scope.orderedByTime) {
                $scope.centerData = lastCenterData;
                $scope.centerData.competitions.sort($scope.sortAscending ? Utils.orderSortingFn : Utils.orderSortingFnReverse);
                return;
            }
            var orderedGames = [], orderedCompetitions = [];

            var dataToOrder = (centerData && centerData.competitions) || $scope.centerData.competitions;
            angular.forEach(dataToOrder, function (competition) {
                orderedGames = orderedGames.concat(competition.games);
            });

            var compareFn = $scope.sortAscending ? function (a, b) { return a.start_ts - b.start_ts; } : function (a, b) { return b.start_ts - a.start_ts; };

            orderedGames.sort(compareFn);

            var i;
            for (i = 0; i < orderedGames.length; i++) {
                if (orderedCompetitions.length && orderedCompetitions[orderedCompetitions.length - 1].id === orderedGames[i].competition.id) {
                    console.log(orderedGames[i].competition.id);
                } else {
                    orderedCompetitions.push({name: orderedGames[i].competition.name, id: orderedGames[i].competition.id, games: []});
                }
                orderedCompetitions[orderedCompetitions.length - 1].games.push(orderedGames[i]);

            }

            $scope.centerData.competitions = orderedCompetitions;
        }

        /**
        * @ngdoc method
        * @name orderByTime
        * @methodOf vbet5.controller:orderByTime
        * @description the function used only in template; it calls function in the local scope with some delay
        */
        $scope.orderByTime = function orderByTime(param) {
            $scope.filterLoading = true;
            $timeout(function () {
                doOrderByTime(param);
                $scope.filterLoading = false;
            }, 100);

        };

        /**
         * @ngdoc method
         * @name checkAll
         * @methodOf vbet5.controller:asianController
         * @description Marks all checkboxes if checkAll button is checked and unmarks them if checkAll is not checked
         */
        $scope.checkAll = function checkAll() {
            if ($scope.selectedAll) {
                angular.forEach($scope.competitionsFilter, function (competition) {
                    $scope.selectedCompetitionsModel[competition.id] = true;
                });
            } else {
                $scope.selectedCompetitionsModel = {};
            }
        };

        /**
         *@ngdoc method
         * @name cancelCompetitionsSelector
         * @methodOf vbet5.controller:asianController
         * @description Revert temporary changes
         */
        $scope.cancelCompetitionsSelector = function cancelCompetitionsSelector() {
            $scope.showCompetitionsSelector = false;
            $scope.selectedCompetitionsModel = {};
            angular.forEach($scope.competitionsList, function (competition) {
                $scope.selectedCompetitionsModel[competition] = true;
            });
            $scope.selectedAll = ($scope.competitionsList.length === $scope.competitionsFilter.length);
        };

        /**
         * @ngdoc method
         * @name allCompatitionsCheck
         * @methodOf vbet5.controller:asianController
         * @description Checks if one of the checkboxes is not marked removes the mark from checkAll button as well
         * @param state:{boolean} the state of the clicked element
         */
        $scope.allCompatitionsCheck = function allCompatitionsCheck(state) {
            if (!state) {
                $scope.selectedAll = state;
            }
        };

        /**
         * @ngdoc method
         * @name allowFiltering
         * @methodOf vbet5.controller:asianController
         * @description Checks whether at list one competition is chosen to allow the filtering
         * @returns {boolean}
         */
        $scope.allowFiltering = function allowFiltering() {
            if (!Object.keys($scope.selectedCompetitionsModel).length) {
                return false;
            }
            var allow = false, key;
            for (key in $scope.selectedCompetitionsModel) {
                if ($scope.selectedCompetitionsModel[key]) {
                    allow = true;
                    break;
                }
            }
            return allow;
        };

        $scope.prefixBase = function prefixBase(base) {
            return (base <= 0 ? '' : '+') + base;
        };

        /**
         * @ngdoc method
         * @name slide
         * @methodOf vbet5.controller:asianController
         * @description  slides to next/previous set
         * @param direction
         * @param allSets
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
         * @name fixDisplayTime
         * @methodOf vbet5.controller:asianController
         * @description  removes reduntant text from game time info
         * @param {String} gameTime
         */
        $scope.fixDisplayTime = function fixDisplayTime(gameTime) {
            if (!gameTime) {
                return;
            }
            return gameTime.split(' ').length === 2 ? gameTime.split(' ')[1] : gameTime.split(' ')[0];
        };

        init();
}]);
