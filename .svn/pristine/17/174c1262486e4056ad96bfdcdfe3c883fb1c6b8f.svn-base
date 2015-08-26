/* global BettingModule */
/**
 * @ngdoc controller
 * @name betting.controller:betslipCtrl
 * @usage dsa
 * @description
 * Explorer controller
 */
BettingModule.controller('betslipCtrl', ['$q', '$scope', '$rootScope', 'Config', 'Zergling', 'Storage', 'Translator', '$timeout', '$location', '$route', '$window', 'analytics', 'DomHelper', 'Utils', 'partner', function ($q, $scope, $rootScope, Config, Zergling, Storage, Translator, $timeout, $location, $route, $window, analytics, DomHelper, Utils, partner) {
    'use strict';

    var betslipSubscriptionProgress = null; // couldn't come up with a good name for this :/
    $scope.betConf = Config.betting;
	$scope.showBetSettings = $scope.betConf.enableShowBetSettings;
    $scope.enableSigninRegisterLinks =  Config.partner.enableSigninRegisterCallbacks;


    /**
     * @ngdoc object
     * @name sysBetSelectedValue
     * @methodOf betting.controller:betslipCtrl
     * @description System Bet selected value
     */
    $scope.sysBetSelectedValue = 2;

    /**
     * @ngdoc object
     * @name acceptPriceChanges
     * @methodOf betting.controller:betslipCtrl
     * @description indicates if event price changes after adding to betslip are ok for user
     */
    $scope.acceptPriceChanges = '0';

    /**
     * @ngdoc object
     * @name isBetsInProgress
     * @methodOf betting.controller:betslipCtrl
     * @description indicates if betting is in process
     */

    $scope.isBetsInProgress = false;

    /**
     * @ngdoc object
     * @name quickBetEnabled
     * @methodOf betting.controller:betslipCtrl
     * @description indicates if quick bet mode is enabled
     */

    $scope.quickBetEnabled = false;

    /**
     * @ngdoc object
     * @name isBetAccepted
     * @methodOf betting.controller:betslipCtrl
     * @description indicates if current bet is accepted
     */

    $scope.isBetAccepted = false;

    /**
     * @ngdoc object
     * @name quickBet
     * @methodOf betting.controller:betslipCtrl
     * @description Quick Bet Result
     */
    $scope.quickBet = {
        status: 'idle',
        massage: "",
        showTimer: {}
    };

    var betAcceptedWatcherPromise, showQuickBetWatcherPromise;

    /**
     * @ngdoc method
     * @name betEventsToRootScope
     * @methodOf betting.controller:betslipCtrl
     * @description places all event ids from betslip to 'betEvents' object in $rootScope.
     * Needed for showing selected event in game view
     */
    function betEventsToRootScope() {
        $rootScope.betEvents = {};
        $scope.betSlip.bets.map(function (bet) {
            $rootScope.betEvents[bet.eventId] = {selected: true, oddType: bet.oddType};
        });
    }

    $scope.$watch('betSlip', betEventsToRootScope, true);
    $scope.$watch('env.authorized', function (newValue, oldValue) {
        if (oldValue && !newValue) {
            $scope.clearBetslip();
        }
    }, true);

    $scope.$watchCollection('[betSlip.stake, betSlip.unitStake, betSlip.divisionCoefficient]', function (newStakes, oldStakes) {
        if ((!newStakes[0] && !!oldStakes[0]) || (!newStakes[1] && !!oldStakes[1])) {
            if (newStakes[0] === undefined || newStakes[1] === undefined) {
                $scope.betSlip.stake = $scope.betSlip.unitStake = undefined;
            } else {
                $scope.betSlip.stake = $scope.betSlip.unitStake = 0;
            }
        } else {
            if (newStakes[0] !== oldStakes[0] && $scope.betSlip.type.value !== 3) {
                $scope.betSlip.unitStake = $scope.betSlip.stake / $scope.betSlip.divisionCoefficient;
            } else {
                if (!!$scope.betSlip.unitStake) {
                    $scope.betSlip.stake = Math.round($scope.betSlip.divisionCoefficient * $scope.betSlip.unitStake * 100) / 100;
                }
            }
        }
    });


    /**
     * Subscription id
     *
     * @type {number}
     */
    var subId = null;


    /**
     * Copy betType list from config to scope
     * @type {.main.betTypes|*|Array|.main.betTypes|*}
     */
    $scope.betTypes = Config.main.betTypes || [];
    /**
     * @ngdoc method
     * @name updateEventWithAnother
     * @methodOf betting.controller:betslipCtrl
     * @description replaces the event id of provided event with another from same type of market with nearest base
     * then updates betslip subscription after which corresponding bet in betslip gets news event's properties
     *
     * @param {Object} originalEvent betslip event that ned to be replaced
     * @param {Object} data swarm response object (requested events from same game with same market and  event type)
     */
    function updateEventWithAnother(originalEvent, data) {
        var events = [], minBaseDifference, selectedIndex;
        angular.forEach(data.data.market, function (market) {
            angular.forEach(market.event, function (event) {
                events.push({id: event.id, base: event.base || market.base});
            });
        });

        events.map(function (event, index) {
            var diff = Math.abs(event.base - originalEvent.baseInitial);
            if (minBaseDifference === undefined || diff < minBaseDifference) {
                minBaseDifference = diff;
                selectedIndex = index;
            }
        });
        if (selectedIndex !== undefined && events[selectedIndex]) {

            originalEvent.eventId = events[selectedIndex].id;
            originalEvent.deleted = false;
            updateBetslipSubscription();
        } else {
            originalEvent.deleted = true;
        }
    }

    /**
     * @ngdoc method
     * @name updateEventPrices
     * @methodOf betting.controller:betslipCtrl
     * @description updates event prices in betslip according to update received from subsciption and marks deleted events
     * @param {object} data data from swarm
     */
    function updateEventPrices(data) {
        console.log('betslip update:', data);
        $scope.betSlip.thereAreDeletedEvents = false;
        $scope.betSlip.thereAreEventBaseChanges = false;

        angular.forEach($scope.betSlip.bets, function (b) {
            b.deleted = true;
            angular.forEach(data.game, function (game) {
                angular.forEach(game.market, function (market) {
                    angular.forEach(market.event, function (event) {
                        if (b.eventId === event.id) {
                            b.deleted = false;
                            b.priceChange = event.price_change;
                            b.price = event.price;
                            b.base = event.base || market.base;
                            b.blocked = (game.is_blocked || event.price === 1);
                        }
                    });
                });
            });
            if (b.deleted && b.base !== undefined && !$scope.isBetsInProgress) {  // try to replace it with another from same game with same market and event type
                b.deleted = false;
                Zergling
                    .get({
                        'source': 'betting',
                        'what': {
                            'market': ['base'],
                            'event': ['id', 'base']
                        },
                        'where': {
                            'game': {'id': b.gameId},
                            'market': {'type': b.marketType},
                            event: {'type': b.eventType}
                        }
                    })
                    .then(function (data) {updateEventWithAnother(b, data); });
            }
            if (b.baseInitial !== b.base) {
                $scope.betSlip.thereAreEventBaseChanges = true;
            }
            if (b.deleted && !b.blocked) {
                $scope.betSlip.thereAreDeletedEvents = true;
            }
        });
        //$scope.showBetSettings = $scope.thereIsPriceChange(); //temporarily disable show bets settings on price change
    }

    /**
     * @ngdoc method
     * @name broadcastBetslipState
     * @methodOf betting.controller:betslipCtrl
     * @description broadcasts betslip state ('betslip.isEmpty' if theree are no events and 'betslip.hasEvents' if it has)
     */
    function broadcastBetslipState() {
        $rootScope.betSlipBetsCount = $scope.betSlip.bets.length;
        if ($scope.betSlip.bets.length === 0) {
            $rootScope.$broadcast('betslip.isEmpty', $scope.betSlip.bets.length);
        } else {
            $rootScope.$broadcast('betslip.hasEvents', $scope.betSlip.bets.length);
        }
    }

    /**
     * @ngdoc method
     * @name subscribeToBetslipEvents
     * @methodOf betting.controller:betslipCtrl
     * @description subscribes to events which are in betslip.
     * When subscription is done resolves **betslipSubscriptionProgress** promise with subscription id
     */
    function subscribeToBetslipEvents() {

        var subscribingProgress = $q.defer();
        betslipSubscriptionProgress = subscribingProgress.promise;

        var eventIds = $scope.betSlip.bets.map(function (bet) {
            return bet.eventId;
        });
        var gameIds = $scope.betSlip.bets.map(function (bet) {
            return bet.gameId;
        });
        console.log('betslip subscribing to events:', JSON.stringify(eventIds));
        if (eventIds.length === 0) {
            console.log('no betslip events to subscribe');
            betslipSubscriptionProgress = null;
            return;
        }
        Zergling
            .subscribe({
                'source': 'betting',
                'what': {
                    'game': ['is_blocked'],
                    'market': ['base', 'type'],
                    'event': ['id', 'price', 'type', 'name', 'base', 'base1', 'base2']
                },
                'where': {
                    'game': {
                        'id': {'@in': gameIds}
                    },
                    'event': {
                        'id': {'@in': eventIds}
                    }
                }
            }, updateEventPrices).then(function (response) {
                subId = response.subid;
                subscribingProgress.resolve(subId);
                updateEventPrices(response.data);
            });
    }

    /**
     * @ngdoc method
     * @name updateBetslipSubscription
     * @methodOf betting.controller:betslipCtrl
     * @description subscribes to event in betslip after unsubscribing from old subscription(if there's one)
     */
    function updateBetslipSubscription() {
        if (betslipSubscriptionProgress === null) { // first time
            subscribeToBetslipEvents();
        } else {
            betslipSubscriptionProgress.then(function (subId) {
                Zergling.unsubscribe(subId);
                subscribeToBetslipEvents();
            });
        }
    }
    /**
     * @ngdoc method
     * @name acceptChanges
     * @methodOf betting.controller:betslipCtrl
     * @description Cleans up BetSlip to be ready to place bets,
     * i.e. accepts all price changes and removes non-existing events from BetSlip
     */
    $scope.acceptChanges = function acceptChanges() {
       // var newBets = [];
        angular.forEach($scope.betSlip.bets, function (b) {
            b.priceInitial = b.price;
            b.baseInitial = b.base;
            /*if (!b.deleted) {
                newBets.push(b);
            }*/
        });
       // $scope.betSlip.bets = newBets;
        Storage.set('betslip', $scope.betSlip, Config.betting.storedBetslipLifetime);
        broadcastBetslipState();
        updateBetslipSubscription();
    };

    /**
     * @ngdoc object
     * @name betSlip
     * @propertyOf betting.controller:betslipCtrl
     * @type {Object}
     * @description betSlip storage object.
     * Will be retrieved from local storage if present, or initialized with empty structure.
     */
    $scope.betSlip = Storage.get('betslip');

    if ($scope.betSlip === undefined || $scope.betSlip === null) {
        $scope.betSlip = {
            bets: [],
            generalBetResult: "",
            isBettingAllowed: true,
            sysValArray: [],
            stake: "",
            expOdds: "",
            sysOptions: "",
            type: {'name': 'single', 'value': 1},
            mode: 'betting',
            bookingResultId: '',
            eachWayMode: false,
            divisionCoefficient: 1
        };
    } else {
        $scope.betSlip.bets.map(function (bet) {bet.processing = false; });//reset previous state if it remained for some raeason
        $scope.betSlip.stake = '';
        $scope.betSlip.unitStake = '';
        $scope.betSlip.generalBetResult = "",
        updateBetslipSubscription();
        broadcastBetslipState();
    }


    /**
     * @ngdoc method
     * @name repeatSingleStake
     * @methodOf betting.controller:betslipCtrl
     * @param {String} Stake to repeat
     * @description repeat single stake for all single bets
     */
    $scope.repeatSingleStake = function repeatSingleStake(betStake) {
        if (!isNaN(betStake) && betStake > 0) {
            angular.forEach($scope.betSlip.bets, function (value) {
                value.singleStake = betStake;
                value.singleUnitStake = value.singleStake / 2;
            });
        }
    };

    /**
     * @ngdoc method
     * @name getMaxBet
     * @methodOf betting.controller:betslipCtrl
     * @param {Object} Requested bet
     * @description Get Maximum stake amount for selected event
     */
    $scope.getMaxBet = function getMaxBet(betEvents) {
        var request = {
            'events': []
        };
        if (angular.isArray(betEvents)) {
            angular.forEach(betEvents, function(betEvent) {
                request.events.push(betEvent.eventId);
            });
        } else {
            request.events.push(betEvents.eventId);
        }

        var processMaxBetResults = function (result) {
            if (angular.isArray(betEvents)) {
                $scope.lustMaxBetResult = $scope.betSlip.stake = result.result;

            } else {
                betEvents.singleStake =  result.result;
            }
        };

        Zergling
            .get(request, 'get_max_bet').then(processMaxBetResults)['catch'](function (reason) {
                console.log('Error:', reason);
            });
    };

    /**
     * @ngdoc method
     * @name removeBet
     * @methodOf betting.controller:betslipCtrl
     * @param {String} betToRemove bet object.  if field of object is used to find bet in betslip
     * @description removes bet from betslip
     */
    $scope.removeBet = function removeBet(betToRemove) {
        var i;

        angular.forEach($scope.betSlip.bets, function (value) {
            angular.forEach(value.conflicts, function (conflict, index) {
                if (betToRemove.eventId === conflict.eventId) {
                    value.conflicts.splice(index, 1);
                }
            });
        });

        for (i = $scope.betSlip.bets.length - 1; i >= 0; i--) {
            if ($scope.betSlip.bets[i].eventId === betToRemove.eventId) {
                $scope.betSlip.bets.splice(i, 1);
            }
        }

        if ($scope.betSlip.bets.length === 1 && $scope.betSlip.type.value === 2 || ($scope.betSlip.bets.length === 0)) {
            $scope.betSlip.type = {'name': 'single', 'value': 1};
            $scope.betSlip.eachWayMode = false;
            $scope.betSlip.superbetSelector = false;
        }

        $scope.betSlip.generalBetResult = "";
        $scope.betSlip.bookingResultId = "";
        $scope.sysBetSelectedValue = 2;

        Storage.set('betslip', $scope.betSlip, Config.betting.storedBetslipLifetime);
        updateBetslipSubscription();
        broadcastBetslipState();
        if ($scope.lustMaxBetResult == $scope.betSlip.stake) {
            $scope.betSlip.stake = undefined;
        }
        $scope.lustMaxBetResult = undefined;
    };

    $scope.$on('removeBet', function (event, data) { $scope.removeBet(data); });

    /**
     * @ngdoc method
     * @name clearBetslip
     * @methodOf betting.controller:betslipCtrl
     * @description removes all bet from betslip
     */

    $scope.clearBetslip = function clearBetslip() {
        $scope.betSlip.bets.length = 0;

        $scope.betSlip.generalBetResult = "";
        $scope.betSlip.bookingResultId = "";
        $scope.sysBetSelectedValue = 2;
        $scope.betSlip.stake = '';
        $scope.betSlip.eachWayMode = false;
        $scope.betSlip.superbetSelector = false;
        $scope.acceptPriceChanges = '0';
        $scope.betSlip.type = {'name': 'single', 'value': 1};

        Storage.remove('betslip');

        updateBetslipSubscription();
        broadcastBetslipState();
    };

    /**
     * @ngdoc method
     * @name addBet
     * @methodOf betting.controller:betslipCtrl
     * @param {Object} event event object
     * @param {Object} data bet data object
     * @description adds bet to betslip and stores betslip in local storage
     */
    function addBet(event, data) {
        if (!$scope.isBetsInProgress && $scope.quickBet.status !== 'processing' && data.event.price  !== 1 && !data.game.is_blocked && (Config.betting.enableHorseRacingBetSlip || (!Config.betting.enableHorseRacingBetSlip && data.event.price  !== undefined))) {//temporary reject add events without price into betslip

            $scope.isBetAccepted = false;
            $scope.isBetOnHold = false;

            if ($scope.quickBetEnabled) {
                $scope.placeQuickBet(data);
            } else {

                console.log('addBet', data);

                $scope.betSlip.generalBetResult = "";
                $scope.betSlip.bookingResultId = "";

                if (!data.event || !data.game || !data.market) {
                    console.warn('betslip got invalid data:', data);
                    return;
                }
                //check duplicate and delete it
                var isDuplicate = false;
                var conflicts = [];
                angular.forEach($scope.betSlip.bets, function (value) {

                    if (value.eventId === data.event.id) {
                        if (value.oddType === data.oddType) {
                            $scope.removeBet(value);
                        } else {
                            value.oddType = data.oddType;
                        }
                        isDuplicate = true;
                    }
                });
                if (!isDuplicate) {

                    $scope.sysBetSelectedValue = 2;

                    if ($scope.betSlip.bets.length === 1 && $scope.betSlip.type.value === 1) {
                        $scope.betSlip.type = {'name': 'express', 'value': 2};
                    }

                    angular.forEach($scope.betSlip.bets, function (value) {
                        if (value.gameId === data.game.id && (data.market.express_id === undefined || value.expressId === data.market.express_id)) {
                            conflicts.push({
                                title: value.title,
                                pick: value.pick,
                                eventId: value.eventId
                            });
                            value.conflicts.push({
                                title: data.game.team1_name + (data.game.team2_name ? ' - ' + data.game.team2_name : ''),
                                pick: data.event.name,
                                eventId: data.event.id
                            });

                        }

                        if (value.gameId === data.game.exclude_ids || value.excludeIds === data.game.id) {
                            conflicts.push({
                                title: value.title,
                                pick: value.pick,
                                eventId: value.eventId
                            });
                            value.conflicts.push({
                                title: data.game.team1_name + (data.game.team2_name ? ' - ' + data.game.team2_name : ''),
                                pick: data.event.name,
                                eventId: data.event.id
                            });
                        }
                    });

                    $scope.betSlip.bets.push(
                        {
                            title: (data.game.displayTitle ?  data.game.displayTitle + " " : "") + data.game.team1_name + (data.game.team2_name ? ' - ' + data.game.team2_name : ''),
                            pick: data.event.name,
                            price: data.event.price,
                            base: data.event.base !== undefined ? data.event.base : data.market.base,
                            baseInitial: data.event.base !== undefined ? data.event.base : data.market.base,
                            eventBases: (data.event.base1 !== undefined && data.event.base2 !== undefined) ? [data.event.base1, data.event.base2] : null,
                            priceInitial: data.event.price,
                            marketName: data.market.name,
                            marketType: data.market.type,
                            marketBase: data.market.base,
                            ewAllowed: !!data.event.ew_allowed,
                            eachWay: false,
                            ewCoeff: data.market.ew_coeff,
                            spEnabled: data.event.sp_enabled,
                            oddType: data.oddType,
                            priceChange: null,
                            deleted: false,
                            processing: false,
                            blocked: (data.game.is_blocked || data.event.price === 1),
                            excludeIds: data.game.exclude_ids,
                            incInSysCalc: true,
                            expressId: (data.market.express_id !== undefined ? data.market.express_id : 1),
                            gameId: data.game.id,
                            eventId: data.event.id,
                            isLive: !!data.game.type,
                            eventType: data.event.type,
                            team1Name: data.game.team1_name,
                            team2Name: data.game.team2_name,
                            expMinLen: data.game.express_min_len,
                            singleStake: '',
                            singleUnitStake: '',
                            singlePosWin: 0,
                            conflicts: conflicts,
                            gamePointer: {
                                'game': data.game.id,
                                'sport': data.game.isVirtual ? -3 : data.game.sport.id,
                                'vsport':  data.game.isVirtual ? data.game.sport.id : undefined,
                                'competition': data.game.competition.id,
                                'type': data.game.isVirtual ? 0 : data.game.type,
                                'region': data.game.region.id
                            }
                        }
                    );

                    DomHelper.scrollBottom('betEventsContainer');
                    // corresponding input is waiting for this event to get focus.
                    // timeout is needed for input to become available for focusing
                    $timeout(function () {
                        $scope.$broadcast('bet' + data.event.id);
                    }, 100);

                    updateBetslipSubscription();

                    if ($scope.lustMaxBetResult == $scope.betSlip.stake) {
                        $scope.betSlip.stake = undefined;
                    }
                    $scope.lustMaxBetResult = undefined;
                }
                Storage.set('betslip', $scope.betSlip, Config.betting.storedBetslipLifetime);
                broadcastBetslipState();
            }
        }
    }

    /**
     * @ngdoc method
     * @name autoSuperBet
     * @methodOf betting.controller:betslipCtrl
     * @param {Number} Stake amount
     * @returns {Boolean}
     * @description return true in case of stake amount > superbetLimit
     */

    function autoSuperBet(stake) {
        if ($scope.env.authorized && !$scope.betSlip.hasLiveEvents && Config.betting.autoSuperBetLimit && $rootScope.currency.name && Config.betting.autoSuperBetLimit[$rootScope.currency.name] && stake >= Config.betting.autoSuperBetLimit[$rootScope.currency.name]) {
            return true;
        }
        return false;
    }

    /**
     * @ngdoc method
     * @name placeBookingBet
     * @methodOf betting.controller:betslipCtrl
     * @description Place booking bet.
     */

    $scope.placeBookingBet = function placeBookingBet() {
        console.log('placeBookingBet');
        if ($scope.betInProgress) {
            return;
        }
        $scope.betInProgress = true;
        $scope.betSlip.generalBetResult = "";
        analytics.gaSend('send', 'event', 'betting', 'PlaceBookingBet ' + (Config.main.sportsLayout) + ($scope.env.live ? '(LIVE)' : '(PM)'), {'page': $location.path(), 'eventLabel': ({1: 'single', 2: 'express', 3: 'system', 4: 'chain'}[$scope.betSlip.type.value])});
        var requests = [];
        var currentBets;
        switch ($scope.betSlip.type.value) {
        case 1:
            currentBets = [];
            angular.forEach($scope.betSlip.bets, function (bet) {
                currentBets.push({'event_id': bet.eventId, 'amount': parseFloat(bet.singleStake)});
            });
            requests.push({
                'type': $scope.betSlip.type.value,
                'source': Config.betting.bet_source,
                'amount': NaN,
                'bets': currentBets
            });
            break;
        case 2:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
            currentBets = [];
            angular.forEach($scope.betSlip.bets, function (bet) {
                currentBets.push({'event_id': bet.eventId});
            });
            requests.push({
                'type': $scope.betSlip.type.value,
                'source': Config.betting.bet_source,
                'amount': parseFloat($scope.betSlip.stake),
                'bets': currentBets
            });
            break;
        case 3:
            currentBets = [];
            angular.forEach($scope.betSlip.bets, function (bet) {
                currentBets.push({'event_id': bet.eventId});
                bet.processing = true;
            });
            requests.push({
                'type': $scope.betSlip.type.value,
                'source': Config.betting.bet_source,
                'amount': parseFloat($scope.betSlip.stake),
                'bets': currentBets,
                'sys_bet': parseInt($scope.sysBetSelectedValue, 10)
            });
            break;
        case 4:
            currentBets = [];
            angular.forEach($scope.betSlip.bets, function (bet) {
                currentBets.push({'event_id': bet.eventId});
            });
            requests.push({
                'type': $scope.betSlip.type.value,
                'source': Config.betting.bet_source,
                'amount': parseFloat($scope.betSlip.stake),
                'bets': currentBets
            });
            break;

        default:
            break;
        }

        angular.forEach(requests, function (request) {
            var processBetResults = function (result) {
                console.log("request =", request);
                if (result.result === 0) {
                    analytics.gaSend('send', 'event', 'betting', 'AcceptedBookingBet ' + (Config.main.sportsLayout) + ($scope.env.live ? '(LIVE)' : '(PM)'), {'page': $location.path(), 'eventLabel': ({1: 'single', 2: 'express', 3: 'system', 4: 'chain'}[$scope.betSlip.type.value])});
                    Utils.setJustForMoment($scope, 'isBetAccepted', true, 30000);
                    $scope.betSlip.bookingResultId = result.details.number;

                    $scope.bookIdPopup(result.details.number);

                    angular.forEach($scope.betSlip.bets, function (value) {
                        if ($scope.betSlip.type.value !== 1 || request.bets[0].event_id == value.eventId) {
                            value.processing = false;
                            value.result = Translator.get('message_OK');
                        }
                    });
                } else if (result.result === -1) {
                    console.log('Error:', result.details);
                    $scope.betSlip.generalBetResult = Translator.get("Sorry we can't accept your bets now, please try later") + ' (' + result.result + ')';
                    analytics.gaSend('send', 'event', 'betting', 'RejectedBookingBet ' + (Config.main.sportsLayout) + ($scope.env.live ? '(LIVE)' : '(PM)'),  {'page': $location.path(), 'eventLabel': ('err(' + result.result + ') - ' + result.details)});
                    angular.forEach($scope.betSlip.bets, function (value) {
                        value.processing = false;
                    });
                    $scope.betInProgress = false;
                } else {
                    console.log('do bet result', result.result);
                    if (Translator.get('message_' + result.result) !== ('message_' + result.result)) {
                        $scope.betSlip.generalBetResult = Translator.get('message_' + result.result);
                    } else if (Translator.get('message_' + result.result, undefined, 'eng') !== ('message_' + result.result)) {
                        $scope.betSlip.generalBetResult = Translator.get('message_' + result.result, undefined, 'eng');
                    } else {
                        $scope.betSlip.generalBetResult =  Translator.get("Sorry we can't accept your bets now, please try later") + ' (' + result.result + ')';
                    }
                    angular.forEach($scope.betSlip.bets, function (bet) {
                        if (result.details && result.details !== null) {
                            angular.forEach(result.details, function (betResult) {
                                if (bet.eventId == betResult.event_id) {
                                    if (betResult.status === "OK") {
                                        if ($scope.betSlip.type.value !== 1) {
                                            bet.result = Translator.get('message_' + betResult.status);
                                        } else {
                                            bet.isAccepted = false;
                                            bet.result = Translator.get('message_' + result.result);

                                        }
                                    } else {
                                        bet.isAccepted = false;
                                        bet.result = Translator.get('message_' + betResult.status);
                                    }
                                    bet.processing = false;
                                }
                            });
                        } else {
                            bet.processing = false;
                        }

                    });
                    $scope.betInProgress = false;
                }
            };

            Zergling
                .get(request, 'book_bet').then(processBetResults)['catch'](function (reason) {
                console.log('Error:', reason);
                $scope.betSlip.generalBetResult = Translator.get("Sorry we can't accept your bets now, please try later") + ' (' + reason.code + ')';
                analytics.gaSend('send', 'event', 'betting', 'RejectedBookingBet ' + (Config.main.sportsLayout) + ($scope.env.live ? '(LIVE)' : '(PM)'), {'page': $location.path(), 'eventLabel': ('err(' + reason.code + ') - ' + reason.msg)});
                angular.forEach($scope.betSlip.bets, function (value) {
                    value.processing = false;
                });
            });
        });
        $scope.betInProgress = false;
    };


    /**
     * @ngdoc method
     * @name placeQuickBet
     * @methodOf betting.controller:betslipCtrl
     * @param {Object} selected event
     * @description place Quick Bet
     */

    $scope.placeQuickBet = function placeQuickBet(data) {
        console.log('quick bet data', data);
        if ($scope.quickBetEnabled && !$scope.hasWrongStakes && !$scope.hasEmptyStakes && $scope.env.authorized && !$scope.isBetsInProgress && ($scope.betSlip.totalStake <= $scope.profile.balance)) {
            $scope.quickBet.status = 'idle';
            $scope.quickBet.massage = '';

            if (showQuickBetWatcherPromise) {
                $timeout.cancel(showQuickBetWatcherPromise);
            }

            var request = {
                'type': 1,
                'source': Config.betting.bet_source,
                'amount': parseFloat($scope.betSlip.stake),
                'mode': autoSuperBet(parseFloat($scope.betSlip.stake)) ? -1 : parseInt($scope.acceptPriceChanges, 10),
                'bets': [
                    {'event_id': data.event.id, 'price': data.oddType === 'sp' ? -1 : data.event.price}
                ]
            };

            var processQuickBetResults = function (result) {
                console.log("request =", request);
                $scope.isBetsInProgress = false;
                if (result.result === 'OK') {
                    $scope.quickBet.status = 'accepted';
                    $scope.massage = Translator.get('message_' + result.result);
                    if(!data.game.isVirtual){
                        $rootScope.$broadcast('game.addToMyGames', data.game); // add this game to favorites
                    }
                } else if (result.result === -1) {
                    console.log('Error:', result.details);
                    $scope.quickBet.status = 'error';
                } else {
                    $scope.quickBet.status = 'error';
                    $scope.quickBet.massage = Translator.get('message_' + result.result);
                }
            };

            $scope.quickBet.status = 'processing';
            $scope.isBetsInProgress = true;
            analytics.gaSend('send', 'event', 'betting', 'placeQuickBet' + (Config.main.sportsLayout),  {'page': $location.path(), 'eventLabel': ($scope.env.live ? '(LIVE)' : '(PM)')});
            Zergling
                    .get(request, 'do_bet')
                    .then(processQuickBetResults)['catch'](
                    function (reason) {
                        $scope.quickBet.status = 'error';
                        $scope.isBetsInProgress = false;
                        console.log('Error:', reason);
                    }
                );

            showQuickBetWatcherPromise = $timeout(function () {
                if ($scope.quickBet.status === 'processing') {
                    $scope.isBetsInProgress = false;
                }
                $scope.quickBet.status = 'idle';
            }, 15000);
        }
    };

    /**
     * @ngdoc method
     * @name placeBet
     * @methodOf betting.controller:betslipCtrl
     * @description place current bets
     */
    $scope.placeBet = function placeBet() {
        console.log('placeBet');
        if ($scope.betInProgress) {
            return;
        }

        $scope.betInProgress = true;
        $scope.betSlip.generalBetResult = "";
        $scope.betSlip.bookingResultId = "";
        analytics.gaSend('send', 'event', 'betting', 'PlaceBet ' + (Config.main.sportsLayout) + ($scope.env.live ? '(LIVE)' : '(PM)'), {'page': $location.path(), 'eventLabel': ({1: 'single', 2: 'express', 3: 'system', 4: 'chain'}[$scope.betSlip.type.value])});
        var requests = [];
        var currentBets;
        switch ($scope.betSlip.type.value) {
        case 1:
            angular.forEach($scope.betSlip.bets, function (bet) {
                if (!$scope.betSlip.thereAreDeletedEvents && !$scope.thereIsPriceChange() && !isNaN(parseFloat(bet.singleStake))) {
                    requests.push({
                        'type': $scope.betSlip.type.value,
                        'source': Config.betting.bet_source,
                        'amount': parseFloat(bet.singleStake),
                        'mode': autoSuperBet(parseFloat(bet.singleStake)) ? -1 : parseInt($scope.acceptPriceChanges, 10),
                        'each_way': bet.eachWay,
                        'bets': [
                            {'event_id': bet.eventId, 'price': bet.oddType === 'sp' ? -1 : bet.price}
                        ]
                    });
                    bet.processing = true;
                }
            });
            break;
        case 2:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
            currentBets = [];
            angular.forEach($scope.betSlip.bets, function (bet) {
                currentBets.push({'event_id': bet.eventId, 'price': bet.oddType === 'sp' ? -1 : bet.price});
                bet.processing = true;
            });
            requests.push({
                'type': $scope.betSlip.type.value,
                'source': Config.betting.bet_source,
                'amount': parseFloat($scope.betSlip.stake),
                'mode': autoSuperBet(parseFloat($scope.betSlip.stake)) ? -1 : parseInt($scope.acceptPriceChanges, 10),
                'each_way': $scope.betSlip.eachWayMode,
                'bets': currentBets
            });
            break;
        case 3:
            currentBets = [];
            angular.forEach($scope.betSlip.bets, function (bet) {
                currentBets.push({'event_id': bet.eventId, 'price': bet.oddType === 'sp' ? -1 : bet.price});
                bet.processing = true;
            });
            requests.push({
                'type': $scope.betSlip.type.value,
                'source': Config.betting.bet_source,
                'amount': parseFloat($scope.betSlip.stake),
                'mode': autoSuperBet(parseFloat($scope.betSlip.stake)) ? -1 : parseInt($scope.acceptPriceChanges, 10),
                'each_way': $scope.betSlip.eachWayMode,
                'bets': currentBets,
                'sys_bet': parseInt($scope.sysBetSelectedValue, 10)
            });
            break;
        case 4:
            currentBets = [];
            angular.forEach($scope.betSlip.bets, function (bet) {
                currentBets.push({'event_id': bet.eventId, 'price': bet.oddType === 'sp' ? -1 : bet.price});
                bet.processing = true;
            });
            requests.push({
                'type': $scope.betSlip.type.value,
                'source': Config.betting.bet_source,
                'amount': parseFloat($scope.betSlip.stake),
                'mode': autoSuperBet(parseFloat($scope.betSlip.stake)) ? -1 : parseInt($scope.acceptPriceChanges, 10),
                'each_way': $scope.betSlip.eachWayMode,
                'bets': currentBets
            });
            break;

        default:
            break;
        }


        angular.forEach(requests, function (request) {
            var processBetResults = function (result) {
                console.log("request =", request);
                if (result.result === 'OK') {
                    analytics.gaSend('send', 'event', 'betting', 'AcceptedBet ' + (Config.main.sportsLayout) + ($scope.env.live ? '(LIVE)' : '(PM)'), {'page': $location.path(), 'eventLabel': ({1: 'single', 2: 'express', 3: 'system', 4: 'chain'}[$scope.betSlip.type.value])});

                    if (betAcceptedWatcherPromise) {
                        $timeout.cancel(betAcceptedWatcherPromise);
                    }
                    $scope.isBetAccepted = true;

                    betAcceptedWatcherPromise = $timeout(function() { $scope.isBetAccepted = false; }, 3000);
                    angular.forEach($scope.betSlip.bets, function (value) {
                        if(!value.gamePointer.vsport) {
                            console.log("adding game ", value.gameId, "to favorites");
                            $rootScope.$broadcast('game.addToMyGames', {id: value.gameId}); // add this game to favorites
                        }

                        if ($scope.betSlip.type.value !== 1 || request.bets[0].event_id == value.eventId) {
                            value.isAccepted = true;
                            value.result = Translator.get('message_' + result.result);
                            $timeout(function () {
                                $scope.removeBet(value);
                                value.processing = false;
                                if (Config.betting.resetAmountAfterBet) {
                                    $scope.betSlip.stake = undefined;
                                }
                            }, 1000);
                        }
                    });
                } else if (result.result === -1) {
                    console.log('Error:', result.details);
                    $scope.betSlip.generalBetResult = Translator.get("Sorry we can't accept your bets now, please try later") + ' (' + result.result + ')';
                    analytics.gaSend('send', 'event', 'betting', 'RejectedBet ' + (Config.main.sportsLayout) + ($scope.env.live ? '(LIVE)' : '(PM)'),  {'page': $location.path(), 'eventLabel': ('err(' + result.result + ') - ' + result.details)});
                    angular.forEach($scope.betSlip.bets, function (value) {
                        value.processing = false;
                    });
                    $scope.betInProgress = false;
                } else {
                    console.log('do bet result', result.result);
                    if (Translator.get('message_' + result.result) !== ('message_' + result.result)) {
                        $scope.betSlip.generalBetResult = Translator.get('message_' + result.result + ((result.result === '1510' && Config.betting.allowManualSuperBet) ? '_sb' : ''));
                    } else if (Translator.get('message_' + result.result, undefined, 'eng') !== ('message_' + result.result)) {
                        $scope.betSlip.generalBetResult = Translator.get('message_' + result.result, undefined, 'eng');
                    } else {
                        $scope.betSlip.generalBetResult =  Translator.get("Sorry we can't accept your bets now, please try later") + ' (' + result.result + ')';
                    }

                    analytics.gaSend('send', 'event', 'betting', 'RejectedBet ' + (Config.main.sportsLayout) + ($scope.env.live ? '(LIVE)' : '(PM)'),  {'page': $location.path(), 'eventLabel': ('err(' + result.result + ') - ' + Translator.get('message_' + result.result, 'eng'))});
                    if (result.result == '1800') {
                        $scope.showBetSettings = true;
                    }
                    if (result.result == 'ONHOLD') {
                        if (result.details && result.details.bet_id && result.details.bet_id !== -1) {
                            $rootScope.$broadcast('checkSuperBet', result.details.bet_id);
                            $scope.isBetOnHold = true;
                            $rootScope.globalPopupType = 'info';
                            $rootScope.globalPopup = Translator.get('message_' + result.result);
                            $scope.acceptPriceChanges = '0';
                            analytics.gaSend('send', 'event', 'betting', 'SuperBet ' + (Config.main.sportsLayout) + ($scope.env.live ? '(LIVE)' : '(PM)'), {'page': $location.path(), 'eventLabel': 'place superbet'});
                        }
                    }
                    angular.forEach($scope.betSlip.bets, function (bet) {
                        if (result.result == 'ONHOLD') {
                            $timeout(function () {
                                $scope.removeBet(bet);
                                bet.processing = false;
                                if (Config.betting.resetAmountAfterBet) {
                                    $scope.betSlip.stake = undefined;
                                }
                            }, 1000);
                            bet.processing = false;
                        } else if (result.details && result.details !== null) {
                            angular.forEach(result.details, function (betResult) {
                                if (bet.eventId == betResult.event_id) {
                                    if (betResult.status === "OK") {
                                        if ($scope.betSlip.type.value !== 1) {
                                            bet.result = Translator.get('message_' + betResult.status);
                                        } else {
                                            bet.isAccepted = false;
                                            bet.result = Translator.get('message_' + result.result);

                                        }
                                    } else {
                                        bet.isAccepted = false;
                                        bet.result = Translator.get('message_' + betResult.status);
                                    }
                                    bet.processing = false;
                                }
                            });
                        } else {
                            bet.processing = false;
                        }
                    });
                    $scope.betInProgress = false;

                }

            };
            Zergling
                .get(request, 'do_bet').then(processBetResults)['catch'](function (reason) {
                    console.log('Error:', reason);
                    $scope.betSlip.generalBetResult = Translator.get("Sorry we can't accept your bets now, please try later") + ' (' + reason.code + ')';
                    analytics.gaSend('send', 'event', 'betting', 'RejectedBet ' + (Config.main.sportsLayout) + ($scope.env.live ? '(LIVE)' : '(PM)'), {'page': $location.path(), 'eventLabel': ('err(' + reason.code + ') - ' + reason.msg)});
                    angular.forEach($scope.betSlip.bets, function (value) {
                        value.processing = false;
                    });
                });
        });
        $scope.betInProgress = false;
    };

    /**
     * @ngdoc method
     * @name factorial
     * @methodOf betting.controller:betslipCtrl
     * @param {Number} x x
     * @returns {Number} factorial
     * @description calculate factorial
     */
    function factorial(x) {
        if (x !== undefined && !isNaN(x) && x >= 0) {
            return x === 0 ? 1 : (x * factorial(x - 1));
        }
    }

    /**
     * @ngdoc method
     * @name calculateSystemPossibleWin
     * @methodOf betting.controller:betslipCtrl
     * @returns {Object} possible win and options count
     * @description calculate system possible winning sets system selected value
     */
    function calculateSystemPossibleWin() {
        var tempPosWin = 0;
        var tempPosEwWin = 0;
        var indexArray = [];
        var indexMaxArray = [];
        var tempOdd;
        var tempEwOdd;
        var tempIterator;
        var numOfSysOptions;
        var sysPerBetStake;
        var k = $scope.sysBetSelectedValue;
        var i;
        for (i = 0; i < k; i++) {
            indexArray[i] = i;
            indexMaxArray[i] = $scope.betSlip.bets.length - i;
        }

        indexMaxArray = indexMaxArray.reverse();
        tempIterator = k - 1;
        var m, j;
        while (indexArray[0] <= indexMaxArray[0]) {
            if (indexArray[tempIterator] < indexMaxArray[tempIterator]) {
                if (tempIterator !== k - 1) {
                    tempIterator = k - 1;
                    continue;
                }
                tempOdd = 1;
                tempEwOdd = 1;
                for (m = 0; m < k; m++) {
                    if ($scope.betSlip.bets[indexArray[m]].incInSysCalc) {
                        tempOdd *= $scope.betSlip.bets[indexArray[m]].price;
                        tempEwOdd *= $scope.betSlip.bets[indexArray[m]].ewAllowed && $scope.betSlip.bets[indexArray[m]].ewCoeff ? Math.round((($scope.betSlip.bets[indexArray[m]].price - 1) / $scope.betSlip.bets[indexArray[m]].ewCoeff + 1) * 100) / 100 : $scope.betSlip.bets[indexArray[m]].price;
                    } else {
                        tempOdd = 0;
                        tempEwOdd = 0;
                    }
                }

                tempPosWin += tempOdd;
                tempPosEwWin += tempEwOdd;


                indexArray[tempIterator]++;
            } else {
                tempIterator--;

                indexArray[tempIterator]++;

                for (j = tempIterator; j < k - 1; j++) {
                    indexArray[j + 1] = indexArray[j] + 1;
                }
            }

        }

        numOfSysOptions = Math.round(factorial($scope.betSlip.bets.length) / (factorial(k) * factorial($scope.betSlip.bets.length - k)));

        sysPerBetStake = $scope.betSlip.stake / numOfSysOptions;

        if ($scope.betSlip.eachWayMode) {
            sysPerBetStake /= 2;
        }

        return {win: tempPosWin * sysPerBetStake, ewWin: tempPosEwWin * sysPerBetStake, options: numOfSysOptions};
    }

    /**
     * @ngdoc method
     * @name calcSystemOptionsCount
     * @methodOf betting.controller:betslipCtrl
     * @param {Number} number of selected events
     * @description calculate system options count
     */
    $scope.calcSystemOptionsCount = function calcSystemOptionsCount(k) {
        return Math.round(factorial($scope.betSlip.bets.length) / (factorial(k) * factorial($scope.betSlip.bets.length - k)));
    };

    /**
     * @ngdoc method
     * @name expressBonusCalculator
     * @methodOf betting.controller:betslipCtrl
     * @param {Number} type bonus type,
     * @param {Number} n number of events,
     * @param {Number} k odd,
     * @param {Number} s stake,
     * @description calculate express bonus
     */
    function expressBonusCalculator(type, n, k, s) {
        switch (type) {
        case 1:
            return (k * s - s) * n / 100;
        case 2:
            switch (n) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                return (k * s - s) * n / 100;
            case 6:
                return (k * s - s) * 0.1;
            case 7:
                return (k * s - s) * 0.15;
            case 8:
                return (k * s - s) * 0.2;
            case 9:
                return (k * s - s) * 0.25;
            default:
                return (k * s - s) * 0.3;
            }
        case 3:
            if (k > 2.5) {
                return (k * s - s) * 0.07;
            }
            break;
        }
        return;

    }



    /**
     * @ngdoc method
     * @name posWin
     * @methodOf betting.controller:betslipCtrl
     * @description calculate possible Win for current bets
     */
    $scope.posWin = function posWin() {

        var totalOdd = 1;
        var ewOdd = 1;
        var possibleWin = 0;
        $scope.betSlip.hasConflicts = false;
        $scope.betSlip.hasEachWayReadyEvents = false;
        $scope.betSlip.hasSingleOnlyEvents = false;
        $scope.betSlip.hasWrongStakes = false;
        $scope.betSlip.hasEmptyStakes = false;
        $scope.betSlip.hasLockedEvents = false;
        $scope.betSlip.thereAreDeletedEvents = false;
        $scope.betSlip.hasSpOddTypes = false;
        $scope.betSlip.hasLiveEvents = false;

        function setMaxWinLimit(value) {
            if ($scope.env.authorized && $rootScope.currency && $rootScope.currency.rounding !== undefined && !isNaN($rootScope.currency.rounding)) {
                if (Config.betting.maxWinLimit && $rootScope.currency.amd_rate && value > Config.betting.maxWinLimit) {
                    return parseFloat((Config.betting.maxWinLimit / $rootScope.currency.amd_rate).toFixed(Math.abs($rootScope.currency.rounding)));
                }
                return parseFloat(value.toFixed(Math.abs($rootScope.currency.rounding)));
            }
            return parseFloat(value);
        }

        if (!$scope.quickBetEnabled) {
            $scope.isBetsInProgress = false;
            $scope.quickBet.status = 'idle';
        }

        if ($scope.betSlip.sysValArray === undefined || $scope.betSlip.sysValArray.length !== ($scope.betSlip.bets.length - 2)) {
            $scope.betSlip.sysValArray = [];
        }

        if ($scope.betSlip.type.value === 1 && !$scope.quickBetEnabled) {
            $scope.betSlip.totalStake = 0;
        } else {
            $scope.betSlip.totalStake = parseFloat($scope.betSlip.stake);
        }
        angular.forEach($scope.betSlip.bets, function (bet, i) {
            switch ($scope.betSlip.type.value) {
            case 1://single
                if ($scope.betSlip.bets.length === 1) {
                    bet.singleStake = $scope.betSlip.stake;
                    bet.singleUnitStake = $scope.betSlip.unitStake;
                    bet.eachWay = $scope.betSlip.eachWayMode;
                }
                $scope.betSlip.hasWrongStakes = $scope.betSlip.hasWrongStakes || (isNaN(parseFloat(bet.singleStake)) && bet.singleStake != "") || parseFloat(bet.singleStake) < 0;
                $scope.betSlip.hasEmptyStakes = $scope.betSlip.hasEmptyStakes || bet.singleStake == "" || parseFloat(bet.singleStake) == 0;
                if (!isNaN(parseFloat(bet.singleStake)) && parseFloat(bet.singleStake) > 0 && !bet.deleted && bet.oddType !== 'sp' && !bet.blocked) {
                    $scope.betSlip.totalStake += (bet.singleStake * 1);
                    if (bet.eachWay && bet.ewAllowed && bet.ewCoeff) {
                        bet.singlePosWin = setMaxWinLimit(Math.round(((((bet.price - 1) / bet.ewCoeff + 1) + bet.price) * bet.singleUnitStake) * 100 || 0) / 100);
                    } else {
                        bet.singlePosWin = setMaxWinLimit(Math.round((bet.price * bet.singleStake) * 100 || 0) / 100);
                    }
                    possibleWin += bet.singlePosWin;
                } else {
                    bet.singlePosWin = 0;
                }
                break;
            case 2: //express
                totalOdd *= bet.price;
                ewOdd *= bet.ewAllowed && bet.ewCoeff ? Math.round(((bet.price - 1) / bet.ewCoeff + 1) * 100) / 100 : bet.price;
                break;
            case 3: //system
                if ($scope.betSlip.sysValArray.length < ($scope.betSlip.bets.length - 2) && i > 1) {
                    $scope.betSlip.sysValArray.push(i);
                }
                break;
            }
            if ($scope.betSlip.type.value !== 1 && bet.conflicts.length) {
                $scope.betSlip.hasConflicts = true;
            }
            if (bet.ewAllowed) {
                $scope.betSlip.hasEachWayReadyEvents = true;
            }
            if ($scope.betSlip.type.value !== 1 && bet.expMinLen === 1) {
                $scope.betSlip.hasSingleOnlyEvents = true;
            }

            if (bet.blocked) {
                $scope.betSlip.hasLockedEvents = true;
            }

            if (bet.isLive) {
                $scope.betSlip.hasLiveEvents = true;

                if (!Config.betting.allowSuperBetOnLive) {
                    $scope.betSlip.superbetSelector = false;
                }

                if ($scope.acceptPriceChanges === -1) {
                    $scope.acceptPriceChanges = 0;
                }

            }

            if (bet.deleted) {
                $scope.betSlip.thereAreDeletedEvents = true;
            }

            if (bet.processing || ($scope.quickBetEnabled && $scope.quickBet.status === 'processing')) {
                $scope.isBetsInProgress = true;
            }

            if (bet.oddType !== 'odd') {
                $scope.betSlip.hasSpOddTypes = true;
            }

        });

        if (!$scope.betSlip.hasEachWayReadyEvents) {
            $scope.betSlip.eachWayMode = false;
        }

        if (($scope.betSlip.type.value !== 1 || $scope.quickBetEnabled) && (isNaN(parseFloat($scope.betSlip.stake)) && $scope.betSlip.stake != "") || parseFloat($scope.betSlip.stake) < 0) {
            $scope.betSlip.hasWrongStakes = true;
        }

        if (($scope.betSlip.type.value !== 1 || $scope.quickBetEnabled) && ($scope.betSlip.stake == "" || parseFloat($scope.betSlip.stake) == 0)) {
            $scope.betSlip.hasEmptyStakes = true;
        }

        if ($scope.acceptPriceChanges === '-1' && ($scope.betSlip.type.value > 2 || $scope.quickBetEnabled)) {
            $scope.acceptPriceChanges = '0';
        }

        if ($scope.betSlip.bets.length > 0) {
            $scope.betSlip.divisionCoefficient = ($scope.betSlip.eachWayMode ? 2 : 1) * ($scope.betSlip.type.value === 3 && $scope.calcSystemOptionsCount($scope.sysBetSelectedValue) > 0 ? $scope.calcSystemOptionsCount($scope.sysBetSelectedValue) : 1);
        }

        if (($scope.betSlip.type.value !== 1 && ($scope.betSlip.bets.length < 2 || $scope.betSlip.hasSingleOnlyEvents)) || ($scope.betSlip.type.value === 3 && $scope.betSlip.bets.length < 3) ||
            ($scope.betSlip.type.value !== 1 && (isNaN($scope.betSlip.stake) || !$scope.betSlip.stake)) || $scope.betSlip.hasConflicts || $scope.betSlip.hasWrongStakes || $scope.betSlip.hasEmptyStakes || $scope.betSlip.hasLockedEvents || $scope.betSlip.thereAreEventBaseChanges) {
            $scope.betSlip.isBettingAllowed = false;
        } else {
            $scope.betSlip.isBettingAllowed = true;
        }

        switch ($scope.betSlip.type.value) {
        case 1:
            return setMaxWinLimit(Math.round(possibleWin * 100 || 0) / 100);
        case 2:
            if (totalOdd > Config.betting.totalOddsMax) {
                totalOdd = Config.betting.totalOddsMax;
            }
            $scope.betSlip.expOdds = Math.round(totalOdd * 100) / 100;
            $scope.betSlip.expBonus = Math.round(expressBonusCalculator(Config.betting.expressBonusType, $scope.betSlip.bets.length, $scope.betSlip.expOdds,  $scope.betSlip.stake) * 100 || 0) / 100;
            if ($scope.betSlip.eachWayMode && ewOdd > 1 && $scope.betSlip.unitStake) {
                return setMaxWinLimit(Math.round(((totalOdd + ewOdd) * $scope.betSlip.unitStake) * 100 || 0) / 100);
            }
            return setMaxWinLimit(Math.round((totalOdd * $scope.betSlip.stake) * 100 || 0) / 100);
        case 3:
            if ($scope.betSlip.bets.length > 2) {
                var tempResult = calculateSystemPossibleWin();
                $scope.betSlip.sysOptions = tempResult.options;
                if ($scope.betSlip.eachWayMode) {
                    return setMaxWinLimit(Math.round((tempResult.win + tempResult.ewWin) * 1000 || 0) / 1000);
                }
                return setMaxWinLimit(bankersRounding((tempResult.win) * 1000 || 0) / 1000);
            }
            break;
        default:
            return 0;
        }
    };


    $scope.$on('bet', addBet);

    /**
     * @ngdoc method
     * @name setBetSlipType
     * @methodOf betting.controller:betslipCtrl
     * @description sets betslip type

     * @param {object} type betslip type, one of the following: single, express, system, chain
     */
    $scope.setBetSlipType = function setBetSlipType(type) {
        $scope.betSlip.type = type;
        Storage.set('betslip', $scope.betSlip, Config.betting.storedBetslipLifetime);
        if ($scope.acceptPriceChanges === '-1' && type.value > 2) {
            $scope.acceptPriceChanges = 0;
        }
    };

    /**
     * @ngdoc method
     * @name setSystemValue
     * @methodOf betting.controller:betslipCtrl
     * @param {Number} val selected value
     * @description sets system selected value
     */

    $scope.setSystemValue = function setSystemValue(val) {
        $scope.sysBetSelectedValue = val;
    };

    /**
     * @ngdoc method
     * @name openLoginForm
     * @methodOf betting.controller:betslipCtrl
     * @description broadcasts a message to open slider with login form
     *
     * @param {Object} $event click event
     */
    $scope.openLoginForm = function openLoginForm($event) {
        if (!Config.main.integrationMode) {
            $rootScope.$broadcast("openLoginForm");
            $event.stopPropagation();
        } else if (Config.partner.enableSigninRegisterCallbacks) {
            partner.call('login', 'betslip');
        }
    };

    /**
     * @ngdoc method
     * @name openRegisterForm
     * @methodOf betting.controller:betslipCtrl
     * @description broadcasts a message to open slider with register form
     *
     * @param {Object} $event click event
     */
    $scope.openRegForm = function openRegForm($event) {
        if (!Config.main.integrationMode) {
            $rootScope.$broadcast("openRegForm");
            $event.stopPropagation();
        } else if (Config.partner.enableSigninRegisterCallbacks) {
            partner.call('register', 'betslip');
        }
    };

    /**
     * @ngdoc method
     * @name gotoBetGame
     * @methodOf betting.controller:betslipCtrl
     * @description  Navigates to Events game
     *
     * @param {Object} gamePointer game object
     */
    $scope.gotoBetGame = function gotoBetGame(gamePointer) {
        $location.search(gamePointer);
        $route.reload();
    };

    /**
     * @ngdoc method
     * @name thereIsPriceChange
     * @methodOf betting.controller:betslipCtrl
     * @description  Indicate if bet slip events price is changing
     */

    $scope.thereIsPriceChange = function thereIsPriceChange() {
        var indicator = false;
        angular.forEach($scope.betSlip.bets, function (b) {
            if (b.oddType !== 'sp' && ((b.price - b.priceInitial < 0 && $scope.acceptPriceChanges !== '2') || (b.price - b.priceInitial !== 0 && $scope.acceptPriceChanges === '0'))) {
                indicator = true;
            }
        });

        return indicator;
    };

    /**
     * @ngdoc method
     * @name betFromKeyboard
     * @methodOf betting.controller:betslipCtrl
     * @description  Place Bet by pressing Enter key on keyboard
     * @param {Object} $event keypress event
     */

    $scope.betFromKeyboard = function betFromKeyboard($event) {
        if ($event.keyCode == 13 && !($scope.thereIsPriceChange() || !$scope.betSlip.isBettingAllowed || !$scope.env.authorized || $scope.isBetsInProgress || $scope.betSlip.thereAreDeletedEvents || ($scope.env.authorized && $scope.betSlip.totalStake > $scope.profile.balance))) {
            $scope.placeBet();
        }
    };

    /**
     * @ngdoc function
     * @name getDisplayBase
     * @methodOf betting.controller:betslipCtrl
     * @description returns base to display
     *
     * @param {Object} bet bet object
     * @param {Boolean} initial truthy to display initial base, falsy for current
     *
     * @returns {String} base to display
     */
    $scope.getDisplayBase = function getDisplayBase(bet, initial) {
        var baseFieldName = initial ? 'baseInitial' : 'base';
        var prefix = (bet.marketType && bet.marketType.substr(-8) === 'Handicap' && bet[baseFieldName] > 0 ? '+' : '');

        return prefix + (bet.eventBases ? bet.eventBases.join("-") : bet[baseFieldName]);

    };

    $scope.goToTop = DomHelper.goToTop;

    /**
     * @ngdoc method
     * @name openBookingPrintPopup
     * @methodOf betting.controller:betslipCtrl
     * @param {Number} Booking ID
     * @description show booking print popup
     */
    $scope.openBookingPrintPopup = function openBookingPrintPopup(bookingId) {
        var encodedBetData = encodeURIComponent(JSON.stringify({'bets': $scope.betSlip.bets, 'amount': $scope.betSlip.stake, 'betType': $scope.betSlip.type.value, 'sysVal': $scope.sysBetSelectedValue, 'bookId': $scope.betSlip.bookingResultId, 'viewType': Config.main.bookingBetPrintViewType}));
        $window.open($window.document.location.pathname + "#/popup/?action=booking&data=" + encodedBetData, "_blank", "toolbar=no, scrollbars=no, resizable=no, width=700, height=500");
    };

    /**
     * @ngdoc method
     * @name bookIdPopup
     * @methodOf betting.controller:betslipCtrl
     * @param {Number} Booking ID
     * @description show booking popup
     */
    $scope.bookIdPopup = function bookIdPopup(id){
        if (Config.main.enableBetBookingPopup) {
            $rootScope.globalDialog = {
                title: 'bet slip',
                type: 'info',
                content: 'Your Booking ID is:',
                contentBox: id,
                buttonText: 'OK'
            };
        }
    };

}]);
