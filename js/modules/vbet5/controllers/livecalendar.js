/**
 * @ngdoc controller
 * @name vbet5.controller:LiveCalendarController
 * @description
 * LiveCalendarController controller
 */
angular.module('vbet5.betting').controller('LiveCalendarController', ['$scope', '$q', '$rootScope', '$location', '$window', 'Zergling', 'Moment', 'Translator', 'Utils', 'Config', 'GameInfo',
    function ($scope, $q, $rootScope, $location, $window, Zergling, Moment, Translator, Utils, Config, GameInfo) {
        'use strict';
        var leftMenuSubId, gamesSubId, linkedGameSubId, i, gamesSubscriptionProgress = null, excludeIdsKey;
        var excludeIds, liveCalendarSelectedDaysSavedState, initialLoadDone = false;
        var prematchFlow = Config.main.calendarPrematchSelection;
        $scope.liveCalendarSelectedSports = {};
        $scope.liveCalendarSelectedDays = {};
        $scope.liveCalendarSelectedDaysAll = false;
        $scope.dayFilter = [];
        $scope.marketEvents = {};
        $scope.collapsedSports = {};

        $scope.isEventInBetSlip = GameInfo.isEventInBetSlip;


        /**
         * @ngdoc method
         * @name doInitialLoad
         * @methodOf vbet5.controller:LiveCalendarController
         * @description  selects initial values for sport and day and loads games
         */
        function doInitialLoad() {
            if($scope.leftMenuSports && $scope.leftMenuSports.length > 0) {
                $scope.liveCalendarSelectedSports[$scope.leftMenuSports[0].id] = true;
                $scope.selectedSports = [$scope.leftMenuSports[0].id];
                $scope.liveCalendarSelectedDays[0] = true;
                $scope.toggleDay();
                initialLoadDone = true;
            }
        }

        /**
         * @ngdoc method
         * @name updateLeftMenu
         * @methodOf vbet5.controller:LiveCalendarController
         * @description  updates sports object and does the initial load
         * @param {Object} data sports data object
         */
        function updateLeftMenu(data) {
            console.log('updateLeftMenu', data);
            $scope.leftMenuSports = Utils.objectToArray(data.sport).sort(Utils.orderSortingFn);
            if (!initialLoadDone) {
                doInitialLoad();
            }
        }


        function updateLinkedGames(data) {
            angular.forEach(data.sport, function (sport) {
                angular.forEach(sport.region, function (region) {
                    angular.forEach(region.competition, function (competition) {
                        angular.forEach(competition.game, function (game) {
                            var groupedMarkets = Utils.groupByItemProperty(game.market, 'type');
                            var gameObj = {
                                sport: {id: sport.id},
                                region: {id: region.id},
                                competition: {id: competition.id},
                                id: game.id,
                                team1_name: game.team1_name,
                                team2_name: game.team2_name,
                                events_count: game.events_count,
                                type: game.type
                            };
                            if (groupedMarkets.P1XP2 !== undefined && groupedMarkets.P1XP2[0] && groupedMarkets.P1XP2[0].event) {
                                $scope.marketEvents[game.id] = {
                                    events: Utils.groupByItemProperty(groupedMarkets.P1XP2[0].event, 'type'),
                                    market: groupedMarkets.P1XP2[0],
                                    game: gameObj
                                };
                            } else if (groupedMarkets.P1P2 !== undefined && groupedMarkets.P1P2[0] && groupedMarkets.P1P2[0].event) {
                                $scope.marketEvents[game.id] = {
                                    events: Utils.groupByItemProperty(groupedMarkets.P1P2[0].event, 'type'),
                                    market: groupedMarkets.P1P2[0],
                                    game: gameObj
                                };
                            }
                        });
                    });
                });
            });
        }

        function getLinkedGames() {
            if (linkedGameSubId) {
                Zergling.unsubscribe(linkedGameSubId);
            }
            var request = {
                'source': 'betting',
                'what': {
                    'sport': ['id', 'name', 'alias', 'order'],
                    'competition': ['id'],
                    'region': ['id'],
                    'game': ['id', 'team1_name', 'team2_name', 'type', 'events_count', 'markets_count'],
                    'market': ['type', 'name', 'id', 'base', 'express_id'],
                    'event': ['type', 'id', 'price', 'name', 'base']
                },
                'where': {
                    'game': {
                        'id': {'@in': excludeIds}
                    },
                    'market': {
                        'type': {'@in': ['P1XP2', 'P1P2']}
                    }
                }
            };
            Zergling.subscribe(request, updateLinkedGames).then(function (result) {
                    if (result.subid) {
                        linkedGameSubId = result.subid;
                    }
                    if (result.data) {
                        updateLinkedGames(result.data);
                    }
                })['catch'](function (reason) {
                    console.log('Error:', reason);
                });
        }

        /**
         * @ngdoc method
         * @name updateGames
         * @methodOf vbet5.controller:LiveCalendarController
         * @description  creates main game objects array from received data
         *
         * @param {Object} data games data object
         */
        function updateGames(data) {
            console.log('updateGames', data);
            excludeIds = [];
            $scope.liveCalendarGames = [];
            angular.forEach(data.sport, function (sport) {
                var allGames = [];
                angular.forEach(sport.region, function (region) {
                    angular.forEach(region.competition, function (competition) {
                        angular.forEach(competition.game, function (game) {
                            game.region = {id: region.id};
                            game.title = game.team1_name + " - " + game.team2_name;
                            game.competition = {id: competition.id, name: competition.name};
                            for (i = 0; i < $scope.dayFilter.length - 1; i++) {
                                if (game.start_ts >= $scope.dayFilter[i].from && game.start_ts < $scope.dayFilter[i].to) {
                                    game.day = $scope.dayFilter[i];
                                    game.dayOffset = $scope.dayFilter[i].id;
                                }
                            }
                            if (game.exclude_ids) {
                                game.pointerId = game.exclude_ids;
                                excludeIds.push(game.exclude_ids);
                            } else {
                                game.pointerId = game.id;
                            }
                            allGames.push(game);
                        });
                    });
                });
                if (excludeIds.length > 0 && !prematchFlow) {
                    if (excludeIdsKey !== excludeIds.join()) {
                        getLinkedGames();
                        excludeIdsKey = excludeIds.join();
                    }
                } else if (prematchFlow) {
                    updateLinkedGames(data);
                }
                $scope.liveCalendarGames.push({sport: sport, games: Utils.groupByItemProperty(allGames, 'dayOffset')});
            });
        }

        /**
         * @ngdoc method
         * @name loadLeftMenu
         * @methodOf vbet5.controller:LiveCalendarController
         * @description  loads the sports menu data
         */
        function loadLeftMenu() {
            $scope.leftMenuIsLoading = true;
            var request = {
                'source': 'betting',
                'what': {'sport': ['id', 'name', 'alias', 'order']},
                'where': {
                    'game': {
                        'type': prematchFlow ? 0 : 2
                    }
                }
            };
            Zergling.subscribe(request, updateLeftMenu).then(function (result) {
                    if (result.subid) {
                        leftMenuSubId = result.subid;
                    }
                    if (result.data) {
                        updateLeftMenu(result.data);
                    }
                    $scope.leftMenuIsLoading = false;
                })['catch'](function (reason) {
                    console.log('Error:', reason);
                });
        }

        $scope.$on('$destroy', function () {
            Zergling.unsubscribe(leftMenuSubId);
            Zergling.unsubscribe(gamesSubId);
            if (linkedGameSubId) {
                Zergling.unsubscribe(linkedGameSubId);
            }
        });

        /**
         * @ngdoc method
         * @name loadSelectedGames
         * @methodOf vbet5.controller:LiveCalendarController
         * @description  loads selected games according to sport and time filters
         */
        function loadSelectedGames() {
            function doSubscribe() {
                var deferred = $q.defer();
                gamesSubscriptionProgress = deferred.promise;
                $scope.gamesAreLoading = true;
                var request = {
                    'source': 'betting',
                    'what': {
                        'sport': ['id', 'name', 'alias', 'order'],
                        'region': ['id'],
                        'competition': ['id', 'name'],
                        'game': ['id', 'game_number', 'team1_name', 'team2_name', 'start_ts', 'title', 'info', 'text_info', 'events_count', 'exclude_ids']
                    },
                    'where': {
                        'sport': {'id': {'@in': $scope.selectedSports}},
                        'game': {
                            'type': prematchFlow ? 0 : 2
                        }
                    }
                };
                // if prematch selection
                if (prematchFlow) {
                    request.what.market = ['type', 'name', 'id', 'base', 'express_id'];
                    request.what.event = ['type', 'id', 'price', 'name', 'base'];
                    request.where.market = {type: {'@in': ['P1XP2', 'P1P2']}};
                }

                if ($scope.selectedDays && $scope.selectedDays.length > 0) {
                    request.where.game['@or'] = $scope.selectedDays;
                }
                Zergling.subscribe(request, updateGames).then(function (result) {
                        if (result.subid) {
                            gamesSubId = result.subid;
                            deferred.resolve(result.subid);
                        }
                        if (result.data) {
                            updateGames(result.data);
                        }
                        $scope.gamesAreLoading = false;
                    })['catch'](function (reason) {
                        console.log('Error:', reason);
                        deferred.resolve(null);
                    });
            }

            if (gamesSubscriptionProgress === null) {
                doSubscribe();
            } else {
                gamesSubscriptionProgress.then(function (subId) {
                    Zergling.unsubscribe(subId);
                    doSubscribe();
                    gamesSubId = null;
                });
            }
        }

        /**
         * @ngdoc method
         * @name bet
         * @methodOf vbet5.controller:LiveCalendarController
         * @description  sends a message to betslip to add a bet
         *
         * @param {Object} event event object
         * @param {Object} market event's market object
         * @param {Object} openGame game object
         * @param {String} [oddType] odd type (odd or sp)
         */
        $scope.bet = function bet(event, market, openGame, oddType) {
            if (!event) {
                return;
            }
            oddType = oddType || 'odd';
            var game = Utils.clone(openGame);
            console.log('betsslip', arguments);
            $rootScope.$broadcast('bet', {event: event, market: market, game: game, oddType: oddType});
        };

        $scope.openMore = function openMore(sportId, game) {
            if (!game) {
                return;
            }
            $location.url('/sport/?type=0&sport=' + sportId + '&region=' + game.region.id + '&competition=' + game.competition.id + '&game=' + game.id);
        };

        $scope.openSport = function openMore(live) {
            $location.url('/sport/?type=' + live);
        };

        /**
         * @ngdoc method
         * @name toggleSport
         * @methodOf vbet5.controller:LiveCalendarController
         * @description  updates sport filter and loads corresponding data
         */
        $scope.toggleSport = function toggleSport() {
            var sports = [];
            angular.forEach($scope.liveCalendarSelectedSports, function (selected, id) {
                if (selected) {
                    sports.push(parseInt(id, 10));
                }
            });
            $scope.selectedSports = sports;
            loadSelectedGames();
        };

        /**
         * @ngdoc method
         * @name toggleDayAll
         * @methodOf vbet5.controller:LiveCalendarController
         * @description  toggles all days or restores selection, then load corresponding data
         */
        $scope.toggleDayAll = function toggleDayAll() {
            if ($scope.liveCalendarSelectedDaysAll) {
                liveCalendarSelectedDaysSavedState = Utils.clone($scope.liveCalendarSelectedDays);
                $scope.liveCalendarSelectedDays = {0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true};
            } else {
                $scope.liveCalendarSelectedDays = liveCalendarSelectedDaysSavedState;
            }
            $scope.toggleDay();
        };

        /**
         * @ngdoc method
         * @name printCoupon
         * @methodOf vbet5.controller:LiveCalendarController
         * @description prints the coupon
         */
        $scope.printCoupon = function printCoupon() {
            var popup = $window.open('#/popup/?action=couponprintpreview&anticache=' + Math.floor((Math.random() * 1000)), Config.main.skin + 'couponprintpreview.popup', "scrollbars=1,width=1000,height=600,resizable=yes");
            popup.topLevelLiveCalendarGames = $scope.liveCalendarGames;
            popup.topLevelMarketEvents = $scope.marketEvents;
        };

        /**
         * @ngdoc method
         * @name toggleDay
         * @methodOf vbet5.controller:LiveCalendarController
         * @description  updates time filter and loads corresponding data
         */
        $scope.toggleDay = function toggleDay() {
            var days = [];
            //console.table($scope.dayFilter);
            angular.forEach($scope.dayFilter, function (selected, id) {
                if ($scope.liveCalendarSelectedDays[id]) {
                    if ($scope.liveCalendarSelectedDays[id - 1]) {
                        days[days.length - 1] = {'@gte': days[days.length - 1]['@gte'], '@lt': $scope.dayFilter[id].to};
                    } else {
                        days.push({'@gte': $scope.dayFilter[id].from, '@lt': $scope.dayFilter[id].to});
                    }
                }
            });
            $scope.selectedDays = days.map(function (element) {
                return {'start_ts': element};
            });
            console.log($scope.liveCalendarSelectedDays);
            loadSelectedGames();
        };

        /**
         * @ngdoc method
         * @name initLiveCalendar
         * @methodOf vbet5.controller:LiveCalendarController
         * @description  does the initial load
         */
        function initLiveCalendar() {
            $scope.setTitle(Translator.get('LiveCalendar'));
            loadLeftMenu();
            for (i = 0; i < 7; i++) {
                $scope.dayFilter.push({
                    to: Moment.get().add(i, 'days').endOf("day").unix(),
                    from: Moment.get().add(i, 'days').startOf("day").unix(),
                    id: i,
                    name: Moment.get().add(i, 'days').startOf("day").format("dd D")
                });
            }
        }

        initLiveCalendar();
    }]);