/* global VBET5 */
/**
 * @ngdoc controller
 * @name vbet5.controller:myBetsCtrl
 * @description
 *  bet history controller.
 */
VBET5.controller('myBetsCtrl', ['$scope', 'Utils', 'Zergling', 'Moment', 'Translator', 'Config', 'GameInfo', '$rootScope', '$window', function ($scope, Utils, Zergling, Moment, Translator, Config, GameInfo, $rootScope, $window) {
    'use strict';

    $scope.BETS_TO_SHOW = 4;
    $scope.offset = 0;
    $scope.allBetsCount = 0;
    $scope.myBetsLoaded = false;
    $scope.betHistoryLoaded = false;

    $scope.poolBettingMap = {
        '1': Translator.get('W1'),
        '2': 'X',
        '3': Translator.get('W2')
    };

    if (!$rootScope.gamePointers) {
        $rootScope.gamePointers = {};
    }
    var betHistory, BETS_PER_HISTORY_PAGE = 6;

    $scope.betHistoryParams = {
        dateRanges: [],
        dateRange: null,
        betType: -1,
        outcome: -1,
        category: 0,
        game: 0

    };
    var allBets;

    function getVisibleBets(bets) {
        return bets.slice($scope.offset, $scope.offset + $scope.BETS_TO_SHOW);
    }

    function convertStringFiledsToNumbers(arr) {
        arr.map(function (bet) { //convert string fields to numbers
            ['amount', 'bonus', 'bonus_amount', 'bonus_bet_amount', 'payout'].map(function (field) {
                bet[field] = parseFloat(bet[field]);
                bet[field] = isNaN(bet[field]) ? 0 : bet[field];
            });
        });
    }

    /**
     * @ngdoc method
     * @name fillBetsPointerInfo
     * @methodOf vbet5.controller:myBetsCtrl
     * @description  get game regions and fill game Pointer info
     *
     * @param {Object} gameevents
     */
    function fillBetsPointerInfo(currentBets) {

        var betGameIdsObj = {};
        angular.forEach(currentBets, function (bet) {
            angular.forEach(bet.events, function (betEvent) {
                if (betEvent.game_id && !isNaN(betEvent.game_id) && !$rootScope.gamePointers[betEvent.game_id])
                    betGameIdsObj[betEvent.game_id] = parseInt(betEvent.game_id, 10);

            });
        });
        var betGameIds = Utils.objectToArray(betGameIdsObj);
        var request = {
            'source': 'betting',
            'what': {
                'region': ['id'],
                'game': ['id']
            },
            'where': {
                'game': {
                    'id': {'@in': betGameIds}
                }
            }
        };
        if (betGameIds.length > 0) {
            Zergling.get(request).then(function (result) {
                if (result.data && result.data.region) {
                    angular.forEach(result.data.region, function (region) {
                        angular.forEach(region.game, function (game) {
                            angular.forEach(currentBets, function (bet) {
                                angular.forEach(bet.events, function (betEvent) {
                                    if (betEvent.game_id == game.id) {
                                        $rootScope.gamePointers[betEvent.game_id] = {
                                            'game': betEvent.game_id,
                                            'sport': betEvent.sport_id,
                                            'competition': betEvent.competition_id,
                                            'type': betEvent.is_live,
                                            'region': region.id
                                        };
                                    }
                                });
                            });
                        });
                    });
                }
            })['catch'](function (reason) {
                console.log('Error:', reason);
            });
        }
    }


    function updateMyBets(data) {
        console.log('my bets', data.bets);
        if (data && data.bets) {
            allBets = Utils.objectToArray(data.bets);
            fillBetsPointerInfo(allBets);
            convertStringFiledsToNumbers(allBets);
            $scope.allBetsCount = allBets.length;
            console.log(allBets, allBets.length);
            $scope.myBets = getVisibleBets(allBets);

            //console.log('BETS -------------------');
            //console.log($scope.myBets);
        }
    }


    /**
     * @ngdoc method
     * @name slide
     * @methodOf vbet5.controller:myBetsCtrl
     * @description Slides visible bets left or right by changing $scope's **offset** variable
     *
     * @param {String} direction direction, 'left' or 'right'
     */
    $scope.slide = function slide(direction) {
        if (direction === 'left') {
            if ($scope.offset > 0) {
                $scope.offset--;
            }
        } else if (direction === 'right') {
            if ($scope.offset < allBets.length - $scope.BETS_TO_SHOW) {
                $scope.offset++;
            }
        }
        $scope.myBets = getVisibleBets(allBets);
    };

    /**
     * @ngdoc method
     * @name loadMyBets
     * @methodOf vbet5.controller:myBetsCtrl
     * @description loads
     */
    $scope.loadMyBets = function loadMyBets() {
        console.log('bet history init');

        $scope.myBetsLoaded = false;
        Zergling.get({
            'where': {
//             'from_date': int(time.time()) - 24*3600,
//             'to_date': int(time.time()),
//             'outcome': 3,
//             'bet_type': 1,
                'with_pool_bets' : true
            }
        }, 'bet_history')
            .then(
                function (response) {
                    fillBetsPointerInfo(response);
                    updateMyBets(response);
                    $scope.myBetsLoaded = true;
                },
                function (failResponse) {
                    console.log('failed loading my bets', failResponse);
                    $scope.errorLoadingBets = true;
                }
            );

    };

    /**
     * @ngdoc method
     * @name gotoBetGame
     * @methodOf vbet5.controller:myBetsCtrl
     * @description  Navigates to Events game
     *
     * @param {Object} bet history Event
     */
    $scope.gotoBetGame = function gotoBetGame(betEvent) {
        if (GameInfo.VIRTUAL_SPORT_IDS.indexOf(parseInt(betEvent.sport_id)) === -1 && $rootScope.gamePointers[betEvent.game_id]) {
            $rootScope.$broadcast('gotoSelectedGame', $rootScope.gamePointers[betEvent.game_id]);
        }
    };

    /**
     * @ngdoc method
     * @name initBetHistory
     * @methodOf vbet5.controller:myBetsCtrl
     * @description init function. Generates  month and weeks data for select box and loads bets for the first month
     */
    $scope.initBetHistory = function initBetHistory(product) {
        var i, time;
        for (i = 0; i < 6; i++) {
            time = Moment.get().subtract('months', i).startOf('month');
            $scope.betHistoryParams.dateRanges.push({fromDate: time.unix(), toDate: time.clone().add('months', 1).unix(), str: time.format('MMMM YYYY'), type: 'month'});

            var monthDays = i === 0 ? Moment.get().lang('en').format('D') :  time.clone().endOf('month').lang('en').format('D'),
                wCount = parseInt(monthDays / 7, 10),
                moreDaysCount = monthDays % 7;
            var j, fromDate, toDate, weekDates = [];
            for (j = 0; j < wCount; j++) {
                fromDate = time.clone().add('days', j * 7);
                toDate = time.clone().add('days', (j + 1) * 7);
                weekDates.push({fromDate: fromDate.unix(), toDate: toDate.unix(), str: "· " + (fromDate.format('DD MMM') + " - " + toDate.format('DD MMM')), type: 'week'})
            }
            if (moreDaysCount > 0) {
                fromDate = time.clone().add('days', j * 7);
                toDate = fromDate.clone().add('days', moreDaysCount);
                var str = moreDaysCount == 1 ? toDate.format('DD MMM') : fromDate.format('DD MMM') + " - " + toDate.format('DD MMM');
                weekDates.push({fromDate: fromDate.unix(), toDate: toDate.unix(), str: "· " + str, type: 'week'});
            }
            $scope.betHistoryParams.dateRanges = $scope.betHistoryParams.dateRanges.concat(weekDates.reverse());
        }
        $scope.dataSelectedIndex  =  product === 'Casino' ? 1 : 0;
        $scope.loadBetHistory(product);
    };


    /**
     * @ngdoc method
     * @name loadBetHistory
     * @methodOf vbet5.controller:myBetsCtrl
     * @description loads bet history according to selected parameters from  **$scope.betHistoryParams**
     * and selects first page
     */
    $scope.loadBetHistory = function loadBetHistory(product) {
        $scope.betHistoryParams.dateRange = $scope.betHistoryParams.dateRanges[$scope.dataSelectedIndex];

        var where = {},
            betType = parseInt($scope.betHistoryParams.betType, 10),
            outcome = parseInt($scope.betHistoryParams.outcome, 10);

        if ($scope.betHistoryParams.dateRange.fromDate !== -1) {
            where.from_date = $scope.betHistoryParams.dateRange.fromDate;
            where.to_date = $scope.betHistoryParams.dateRange.toDate;
        }
        if (outcome !== -1) {
            where.outcome = outcome;
        }
        if (betType !== -1) {
            where.bet_type = betType;
        }
        if (Config.main.poolBettingEnabled) {
            where.with_pool_bets = true;
        }
        var request = {'where': where};
        if (product) {
            request.product = product;

            if (product === 'Casino') {
                var category = parseInt($scope.betHistoryParams.category, 10), game = 0;
                if (category === 706) {
                    category = 4;
                    game = 15; // the game is Financials; the actual Financials game id is 706
                } else if (category === 1297) {
                    category = 4;
                    game = 55; // the game is Fantasy; the actual Fantasy game id is 1297
                } else if (category === 547) {
                    category = 3;
                    game = 10; // the game is Belote; the actual Belote game id is 547
                } else if (category === 599) {
                    category = 3;
                    game = 11; // the game is Backgammon; the actual Backgammon game id is 599
                } else if (category === 1) {
                    game =  parseInt($scope.betHistoryParams.game, 10);
                }
                where.category_id = category;
                where.game_id = game;
            }
        }
        $scope.betHistoryLoaded = false;
        Zergling.get(request, 'bet_history')
            .then(
                function (response) {
                    betHistory = response.bets;
                    if (response.result === -1) {
                        $scope.errorLoadingHistory = true;
                        return;
                    }
                    fillBetsPointerInfo(betHistory);
                    convertStringFiledsToNumbers(response.bets);
                    $scope.betHistoryGotoPage(1);
                    $scope.betHistoryLoaded = true;
                    console.log('bet history:', betHistory, where);
                },
                function (failResponse) {
                    console.log('failed loading bets history', failResponse);
                    $scope.errorLoadingHistory = true;
                }
            );
    };


    /**
     * @ngdoc method
     * @name betHistoryGotoPage
     * @methodOf vbet5.controller:myBetsCtrl
     * @description selects slice of bet history data according to given page number
     *
     * @param {Number} page page number
     */
    $scope.betHistoryGotoPage = function betHistoryGotoPage(page) {

        $scope.totalPages = parseInt(betHistory.length / BETS_PER_HISTORY_PAGE + (betHistory.length % BETS_PER_HISTORY_PAGE ? 1 : 0), 10);
        $scope.betHistoryPages = Utils.createPaginationArray($scope.totalPages, page, 10);
        $scope.betHistoryActivePage = page;
        var start = (page - 1) * BETS_PER_HISTORY_PAGE;
        var end = page * BETS_PER_HISTORY_PAGE;
        end = end > betHistory.length ? betHistory.length : end;
        $scope.betHistory = betHistory.slice(start, end);
    };


    /**
     * @ngdoc method
     * @name openPrintPreview
     * @methodOf vbet5.controller:myBetsCtrl
     * @description opens printPreview page specified by bet
     *
     * @param {object} betData bet data
     */
    $scope.openPrintPreview = function openPrintPreview(betData) {
        if (Config.main.enableBetPrint) {
            var userId = $rootScope.profile && $rootScope.profile.unique_id ? $rootScope.profile.unique_id : '';
            var encodedBetData = encodeURIComponent(JSON.stringify(betData));
            $window.open('#/popup/?action=betprintpreview&userId=' + userId + '&data=' + encodedBetData, Config.main.skin + 'betprintpreview.popup', "scrollbars=1,width=1000,height=600,resizable=yes");
        }
    };

    /**
     * @ngdoc method
     * @name doCashout
     * @methodOf vbet5.controller:myBetsCtrl
     * @description sends cashout requets
     *
     * @param {object} bet bet data
     */
    $scope.doCashout = function doCashout(bet, suggested) {
        console.log("cashout", bet, suggested);
        $scope.cashoutRequestInProgress = true;
        $scope.newCashoutData = null;
        var price = parseFloat(suggested && suggested.new_price ? suggested.new_price : bet.cash_out);
        Zergling.get({bet_id: bet.id, price: price}, 'cashout')
            .then(
                function (response) {
                    console.log("cashout response", response);
                    if (response.result === "Ok") {
                        $scope.cashoutDialogType = 'confirm';
                        $scope.cashoutSuccess = (response.details && response.details.cash_out_price) || true;
                    } else if (response.result === "Fail" && response.details && response.details.new_price) {
                        $scope.cashoutDialogType = 'cashout';
                        $scope.newCashoutData = response.details;
                        bet.cash_out = $scope.newCashoutData.new_price;
                    } else if (response.result === "NotAvailable" || response.result === "Fail") {
                        $scope.cashoutDialogType = 'confirm';
                        $scope.cashoutSuccess = false;
                    } else {
                        $scope.cashoutDialogType = 'confirm';
                        $scope.cashoutSuccess = false;
                        $scope.unknownError = true;
                    }
                },
                function (failResponse) {
                    $scope.showCashoutPopup = true;
                    $scope.cashoutDialogType = 'confirm';
                    $scope.cashoutSuccess = false;
                    console.log('cashout failed', failResponse);
                }
            )['finally'](function () {
                $scope.cashoutRequestInProgress = false;
            });
    };

    /**
     * @ngdoc method
     * @name poolBettingSelection
     * @methodOf vbet5.controller:myBetsCtrl
     * @description Translates backend selection to readable format 1 = W1, 2 = X, 3 = W2
     *
     * @param {string} backend selection data
     */
    $scope.poolBettingSelection = function poolBettingSelection(data) {
        if (!data) {
            return '';
        }

        var r;
        var out = [];

        for (r = 0; r < data.length; r++) {
            if (data[r] && $scope.poolBettingMap[data[r]]) {
                out.push($scope.poolBettingMap[data[r]]);
            }
        }

        return out.join(', ');
    };

    $scope.$on('open.cashoutDialog', function (event, data) {
        $scope.showCashoutPopup = true;
        $scope.cashoutDialogType = 'cashout';
        $scope.cashoutBet = data;
        $scope.cashoutBet.originalPrice = data.cash_out;
        $scope.newCashoutData = null;
        console.log('open.cashoutDialog', event, data);
    });

}]);
