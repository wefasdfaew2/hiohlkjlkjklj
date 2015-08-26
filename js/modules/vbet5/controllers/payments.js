/* global VBET5 */
/**
 * @ngdoc controller
 * @name vbet5.controller:paymentsCtrl
 * @description
 *  payments controller
 */
VBET5.controller('paymentsCtrl', ['$scope', '$rootScope', '$sce', '$location', '$timeout', '$interval', '$filter', 'Utils', 'Config', 'Zergling', 'Translator', 'AuthData', 'Moment', 'analytics', 'Storage', 'Script', 'Tracking', function ($scope, $rootScope, $sce, $location, $timeout, $interval, $filter, Utils, Config, Zergling, Translator, AuthData, Moment, analytics, Storage, Script, Tracking) {
    'use strict';

    $scope.authData = AuthData.get();



    $scope.withdrawFormData = {};
    $scope.depositFormData = {};
    $scope.withdrawHistory = [];
    $scope.withdrawStatus = ['Pending', 'Canceled', 'Confirmed', 'Paid'];
    $scope.cancelButton = {disabled : false };

    $scope.amountMinLimit = 1 / Math.pow(10, $rootScope.conf.balanceFractionSize);


    /**
     * @ngdoc method
     * @name filterPaymentsByCountry
     * @methodOf vbet5.controller:paymentsCtrl
     * @description Returns payments filtered by user country if needed
     * @param {Array} input all payment methods
     * @returns {Array} filtered payment methods
     */
    function filterPaymentsByCountry(input) {
        var countryCode = $scope.userDetails.country_code;
        if (!countryCode) {
            return input;
        }
        return input.reduce(function (availablePayments, current) {
            if ((current.countryAllow && current.countryAllow.indexOf(countryCode) === -1) || (current.countryRestrict && current.countryRestrict.indexOf(countryCode) !== -1)) {
                console.log(countryCode, "restricted for", current.name);
            } else {
                availablePayments.push(current);
            }
            return availablePayments;
        }, []);
    }

    var getUserPromise = null;

    function initPaymentConfig(type) {

        if (!$scope.userDetails) {
            getUserPromise = getUserPromise || Zergling.get({}, 'get_user');
            getUserPromise.then(function (data) {
                $scope.userDetails = data;
                initPaymentConfig(type);
            });
            return;
        }
        if (Config.main.showAllAvailablePaymentSystems) {
            $scope.paymentConfig = Config.payments;
        } else {
            $scope.paymentConfig = $filter('allowedPayments')(Config.payments, type);
        }

        $scope.paymentConfig = filterPaymentsByCountry($scope.paymentConfig);

        //payment description text may contain html, mark it as safe to show
        angular.forEach($scope.paymentConfig, function (pSystem) {
            if (pSystem.depositInfoText && pSystem.depositInfoText[Config.env.lang] && pSystem.depositInfoText[Config.env.lang].length) {
                pSystem.depositText = $sce.trustAsHtml(pSystem.depositInfoText[Config.env.lang]);
            } else {
                pSystem.depositText = $sce.trustAsHtml(Translator.get(pSystem.depositInfoTextKey));
            }

            if (pSystem.depositConfirmText && pSystem.depositConfirmText[Config.env.lang] && pSystem.depositConfirmText[Config.env.lang].length && typeof pSystem.depositConfirmText[Config.env.lang] === 'string') {
                pSystem.depositConfirmText = $sce.trustAsHtml(pSystem.depositConfirmText[Config.env.lang]);
            } else if (typeof pSystem.depositConfirmText === 'string') {
                console.log(Translator.get(pSystem.depositConfirmText));
                pSystem.depositConfirmText = $sce.trustAsHtml(Translator.get(pSystem.depositConfirmText));
            }

            if (pSystem.withdrawInfoText && pSystem.withdrawInfoText[Config.env.lang] && pSystem.withdrawInfoText[Config.env.lang].length) {
                pSystem.withdrawText = $sce.trustAsHtml(pSystem.withdrawInfoText[Config.env.lang]);
            } else {
                pSystem.withdrawText = $sce.trustAsHtml(Translator.get(pSystem.withdrawInfoTextKey));
            }

        });
    }

    /**
     * @ngdoc method
     * @name getWithdrawAmount
     * @methodOf vbet5.controller:paymentsCtrl
     * @description Return balance casino/sportsbook to show on a mount part
     */
    $scope.getWithdrawAmount = function getWithdrawAmount() {  //TODO:  remove this function call from template, instead call it once and store result(s) in scope
        var balance;
        if ($rootScope.isInSports()) {
            balance = $scope.profile.balance;
        } else {
            balance = $rootScope.env.casinoBalance.balance;
        }
        return balance;
    };

    /**
     * @ngdoc method
     * @name init
     * @methodOf vbet5.controller:paymentsCtrl
     * @description selects the firs available payment system initially
     * @param {String} type deposit or withdraw
     */
    $scope.init = function init(type) {
        $scope.balancePageType = type;
        function doInit() {
            if (!$scope.paymentConfig || !$rootScope.profile || !$rootScope.profile.paymentSystems) {
                $timeout(doInit, 500);
                initPaymentConfig(type);
                return;
            }
            initPaymentConfig(type);
            var i;
            var defaultPaymentIndex = NaN;
            for (i = 0; i < $scope.paymentConfig.length; i++) {
                if ($scope.paymentConfig[i]['can' + ($scope.balancePageType === 'withdraw' ? 'Withdraw' : 'Deposit')]) {
                    if ($location.search().system && $location.search().system.toLowerCase() === $scope.paymentConfig[i].name) {
                        $scope.selectPaymentSystem($scope.paymentConfig[i]);
                        defaultPaymentIndex = NaN;
                        break;
                    }
                    if (isNaN(defaultPaymentIndex) && (($scope.balancePageType === 'withdraw' && (!$rootScope.isInCasino() || $scope.paymentConfig[i].canWithdrawFromCasino === undefined || $scope.paymentConfig[i].canWithdrawFromCasino)) || ($scope.balancePageType === 'deposit' && Config.enableDepositDefaultPayment))) {
                        defaultPaymentIndex = i;
                    }
                }
            }
            if (!isNaN(defaultPaymentIndex)) {
                $scope.selectPaymentSystem($scope.paymentConfig[defaultPaymentIndex]); //by default select the first one
            }
        }
        if (Config.env.authorized) {
            doInit();
        } else {
            $rootScope.loginRestored.then(doInit);
        }
    };


    /**
     * @ngdoc method
     * @name reorderCitiesAndBetshops
     * @methodOf vbet5.controller:paymentsCtrl
     * @param cities {Array} list of cities with betshops
     * @param topBetshops {Array} list of betshops ids that should be brought to top
     * @description reorders cities and betshops so that topBetshops are brought to top
     */
    function reorderCitiesAndBetshops(cities, topBetshops) {
        var i, j, k, m;
        var reorderedBetshops = [];
        var topCities = [];
        //loop through cities
        for (i = cities.length - 1; i >= 0; i--) {
           // for each city loop through betshops and find top betshops
            for (j = 0; j < topBetshops.length; j++) {
                for (k = 0; k < cities[i].betshops.length; k++) {
                    if (cities[i].betshops[k].id === topBetshops[j].id) {
                        cities[i].betshops[k].type = topBetshops[j].type || "";
                        reorderedBetshops.push(cities[i].betshops[k]);
                        cities[i].betshops.splice(k, 1);
                        break;
                    }
                }
            }
            if (reorderedBetshops.length) {
                cities[i].betshops = reorderedBetshops.concat(cities[i].betshops);
                topCities.push(cities[i]);
                cities.splice(i, 1);
                reorderedBetshops = [];
            }
        }
        for (m = 0; m < topCities.length; m++) {
            cities.splice(0, 0, topCities[m]);
        }
    }



    /**
     * @ngdoc method
     * @name loadBetShops
     * @methodOf vbet5.controller:paymentsCtrl
     * @description  loads bet shops from swarm
     */
    $scope.loadBetShops = function loadBetShops() {
        Zergling.get({}, 'get_bet_shops').then(function (data) {
            $scope.selectedPaymentSystem.betShops = data.result;

            var cities = $scope.selectedPaymentSystem.betShops.cities;
            // make default selection
            if (cities && cities.length && cities[0].betshops && cities[0].betshops.length) {

                reorderCitiesAndBetshops(cities, $scope.selectedPaymentSystem.topBetshops);


                if (cities.length === 1 && cities[0].betshops.length === 1 && cities[0].betshops[0].address == '') {
                    $scope.withdrawFormData.office_id  = cities[0].betshops[0].id;
                } else if ($scope.selectedPaymentSystem.defaultBetShop) {
                    concludes:
                    for (var i = 0, citiesLength = cities.length; i < citiesLength; i += 1) {
                        for (var j = 0, betshopsLength = cities[i].betshops.length; j < betshopsLength; j += 1) {
                            if (cities[i].betshops[j].id === $scope.selectedPaymentSystem.defaultBetShop) {
                                $scope.withdrawFormData.office_id  = cities[i].betshops[j].id;
                                break concludes;
                            }
                        }
                    }
                }
            }
        });
    };


    $scope.closePopup = function closePopup() {
        $scope.popupInfo = null;
        if ($scope.closeSliderOnPopupClose) {
            $scope.closeSliderOnPopupClose = false;
            $scope.$emit('slider.close');
        }
    };

    var knownErrors = {
        '-20099': Translator.get('Unknown error'),
        '-20001': Translator.get('Unsupported service'),
        '-20002': Translator.get('Currency unsupported'),
        '-20003': Translator.get('Amount is less than minimum allowed'),
        '-20004': Translator.get('Amount is greater than maximum allowed'),
        '-20005': Translator.get('Entered payee information is not correct.'),
        '-20006': Translator.get('Entered payer information is not correct.'),
        '-20007': Translator.get('Internal service fault'),
        '-20008': Translator.get('Withdraw request blocked.'),
        '21': Translator.get('User link blocked, please contact support.'),
        '22': Translator.get('Day limit reached. Please try later.'),
        '-2403': Translator.get('Withdraw request is already in progress')
    };

    /**
     * @ngdoc method
     * @name getLinkedInfo
     * @methodOf vbet5.controller:paymentsCtrl
     * @description  loads poker info from swarm
     */
    $scope.getLinkedInfo = function getLinkedInfo() {

        $scope.selectedPaymentSystem.linkedInfo = {firstTime: false};
        $scope.selectedPaymentSystem.linkedInfoLoaded = false;
        var message = null;
        Zergling.get({service: $scope.selectedPaymentSystem.name}, 'get_linked_user').then(function (data) {
            $scope.selectedPaymentSystem.linkedInfoLoaded = true;
            $scope.selectedPaymentSystem.linkedInfo = data;
            console.log('linked Info:', data);
        })['catch'](
            function (reason) {
                console.log('Error:', reason);
                $scope.messageType = 'error';
                if (reason.code !== undefined && knownErrors[reason.code] !== undefined) {
                    message = knownErrors[reason.code];
                } else {
                    message = Translator.get("Please try later or contact support.");
                }
                $scope.popupInfo = message;
            }
        );
    };



    /**
     * @ngdoc method
     * @name currentLocationWithParam
     * @methodOf vbet5.controller:paymentsCtrl
     * @description  returns current page location with additional parameter(if specified)
     * @param {String} [paramName] parameter name
     * @param {String} [paramValue] parameter value
     * @returns {String} location
     */
    function currentLocationWithParam(paramName, paramValue) {
        var location = $location.absUrl();
        if (!paramName) {
            return location;
        }
        var prefix =  location.substr(location.length - 1) === '/' ? '?' : '&';
        return location + prefix + paramName + '=' + encodeURIComponent(paramValue);
    }

    /**
     * @ngdoc method
     * @name doDepositRequest
     * @methodOf vbet5.controller:paymentsCtrl
     * @description  Do deposit command to Zergling, getting the response and iterate with $scope
     * @param {Object} request request object
     * @param {String} message message
     * @returns {String} location
     */
    function doDepositRequest(request, message) {
        Zergling.get(request, 'deposit').then(
            function (data) {
                console.log('buyVC request:', request, 'response:', data);

                if (data && data.result !== undefined && data.result === 0 && (!data.details || !data.details.error || data.details.error == 0)) {
                    //on success
                    analytics.gaSend('send', 'event', 'slider', 'deposit',  {'page': $location.path(), 'eventLabel': 'Success -' + request.service});
                    if (data.details.method && (data.details.method.toLowerCase() === 'post' || data.details.method.toLowerCase() === 'get')) {
                        $scope.showConfirmation = true;
                        $scope.externalFormParams = data.details;
                        $scope.depositExternalForm = true;

                        Tracking.event('deposit_completed', {'amount': request.amount, 'translation_id': $scope.profile.unique_id}, true);

                    } else if (data.details.method && data.details.method.toLowerCase() === 'form') {
                        $scope.showGetStatusForm = true;
                        $scope.depositStatus = 'pending';
                        $scope.depositInProgress = true;
                        $scope.externalFormParams = data.details;
                    } else if (data.details.method && data.details.method.toLowerCase() === 'formdraw') {
                        $scope.drawPaymentFormResponse(data.details, 'deposit');
                        return;
                    } else {  //payment is done already
                        $scope.paymentIsDone = true;
                        $scope.paymentStatusMessage = data.details.message;
                    }


                } else if (data && data.result !== undefined && knownErrors[data.result.toString()] !== undefined) {
                    message += knownErrors[data.result.toString()];
                    $scope.popupInfo = message;
                    $scope.messageType = 'error';
                    analytics.gaSend('send', 'event', 'slider', 'deposit',  {'page': $location.path(), 'eventLabel': 'Error -' + request.service + ' (' + message + ')'});
                } else if (data.details && data.details.error) {
                    message += (data.details.message || '') + ' (' + data.details.error + ')';
                    $scope.popupInfo = message;
                    $scope.messageType = 'error';
                    analytics.gaSend('send', 'event', 'slider', 'deposit',  {'page': $location.path(), 'eventLabel': 'Error -' + request.service + ' (' + message + ')'});
                } else {
                    message += Translator.get("Unknown error");
                    $scope.popupInfo = message;
                    $scope.messageType = 'error';
                    analytics.gaSend('send', 'event', 'slider', 'deposit',  {'page': $location.path(), 'eventLabel': 'Error -' + request.service + ' (' + message + ')'});
                }
            },
            function (data) {
                console.warn('deposit error', data);
                $scope.popupInfo = message;
                analytics.gaSend('send', 'event', 'slider', 'deposit',  {'page': $location.path(), 'eventLabel': 'Error -' + request.service + ' (' + message + ')'});
            }
        )['finally'](function () {
            $scope.busy = false;
        });
    }

    /**
     * @ngdoc method
     * @name withdraw
     * @methodOf vbet5.controller:paymentsCtrl
     * @description  sends withdraw request to swarm
     */
    $scope.withdraw = function withdraw() {
        $scope.busy = true;
        var forProduct = $rootScope.isInSports() ? "sport" : "casino";
        var request = {
            amount: $scope.selectedPaymentSystem.withdrawPrefilledAmount !== undefined ? $scope.selectedPaymentSystem.withdrawPrefilledAmount : ($scope.withdrawAmount === null ? null : parseFloat($scope.withdrawAmount)),
            service: $scope.selectedPaymentSystem.name,
            payee: {
                forProduct: forProduct
//                status_urls: {
//                    success: currentLocationWithParam('message', Translator.get('Withdrawal was successful.')),
//                    cancel: currentLocationWithParam(),
//                    fail: currentLocationWithParam('message', Translator.get('Withdraw failed.'))
//                }
//                test_mode: true,// @TODO remove after testing
//                test_mode_db: true
            }
        };
        if ($scope.selectedPaymentSystem.hasBetShops || $scope.selectedPaymentSystem.isTransferToLinkedService  || ($scope.selectedPaymentSystem.withdrawFormFields && $scope.selectedPaymentSystem.withdrawFormFields.length)) {
            angular.forEach($scope.selectedPaymentSystem.withdrawFormFields, function (field) {
                if ($scope.withdrawFormData[field.name] === undefined) {
                    $scope.withdrawFormData[field.name] = null;
                }
            });
            Utils.MergeRecursive(request.payee, $scope.withdrawFormData);
        }
        request.payee.office_id = request.payee.office_id && parseInt(request.payee.office_id, 10);
        console.log(request);


        Zergling.get(request, 'withdraw').then(function (data) {
            console.log('withdraw request response', data);
            var message = Translator.get("There was an error processing your request.");
            if (data && data.result !== undefined && data.result === 0) {
                message = Translator.get('Withdrawal was successful');
                $scope.messageType = 'success';
            } else if (data && data.result !== undefined && knownErrors[data.result.toString()] !== undefined) {
                message += "\n" + knownErrors[data.result.toString()];
                if (data.details && data.details.error) {
                    message += ' (' + data.details.error + ')';
                }
                $scope.messageType = 'error';
            } else if (data.details && data.details.error) {
                message += (data.details.message || '') + ' (' + data.details.error + ')';
                $scope.messageType = 'error';
            } else {
                message += Translator.get("Please try later or contact support.");
                $scope.messageType = 'error';
            }
            $scope.popupInfo = message;
        })['finally'](function () {
            $scope.busy = false;
        });
    };

    /**
     * @ngdoc method
     * @name selectPaymentSystem
     * @methodOf vbet5.controller:paymentsCtrl
     * @description  selects payment system
     *
     * @param {Object} paymentSystem payment system
     */
    $scope.selectPaymentSystem = function selectPaymentSystem(paymentSystem) {
        $scope.selectedPaymentSystem = paymentSystem;
        if ($scope.selectedPaymentSystem.twoStepWithdraw && $scope.balancePageType === 'withdraw') {
            Zergling
                .get({'service': $scope.selectedPaymentSystem.name}, 'get_withdraw_status')
                .then(function (response) {
                    console.log('withdraw status  response', response);
                    if (response.withdraw_id) {
                        $scope.selectedPaymentSystem.withdrawFormFields = $scope.selectedPaymentSystem.withdraw2FormFields;
                        $scope.withdrawAmount = null;
                        $scope.hideWithdrawAmount = true;
                        $scope.closeSliderOnPopupClose = true;
                    }
                    $scope.withdrawReady = true;

                });
        } else {
            $scope.closeSliderOnPopupClose = !!$scope.selectedPaymentSystem.twoStepWithdraw;
            $scope.withdrawReady = true;
            $scope.hideWithdrawAmount = false;
        }

        $scope.preparePaymentForm(paymentSystem);

    };

    /**
     * @ngdoc method
     * @name drawPaymentFormResponse
     * @methodOf vbet5.controller:paymentsCtrl
     * @description  selects payment system
     *
     * @param {Object} paymentSystem payment system
     */
    $scope.drawPaymentFormResponse = function drawPaymentFormResponse(paymentSystem, type) {

        var fields = [];
        var r, item, itemKey;

        if ($scope.selectedPaymentSystem) {
            for (itemKey in $scope.selectedPaymentSystem) {
                if ($scope.selectedPaymentSystem[itemKey] && !paymentSystem[itemKey]) {
                    paymentSystem[itemKey] = $scope.selectedPaymentSystem[itemKey];
                }
            }
        }

        for (r = 0; r < paymentSystem.fields.length; r++) {
            item = paymentSystem.fields[r];

            if (item.value) {
                for (itemKey in item.value) {
                    if (item.value[itemKey]) {
                        item[itemKey] = item.value[itemKey];
                    }
                }
            }

            fields.push(item);
        }

        if (type === 'deposit') {
            paymentSystem.depositFormFields = fields;
        }

        if (type === 'withdraw') {
            paymentSystem.withdrawFormFields = fields;
        }

        paymentSystem.hideDepositAmmount = true;
        paymentSystem.depositButtonCaption = 'Next';

        $scope.selectedPaymentSystem = paymentSystem;
        $scope.preparePaymentForm(paymentSystem);
    };

    /**
     * @ngdoc method
     * @name preparePaymentForm
     * @methodOf vbet5.controller:paymentsCtrl
     * @description  selects payment system
     *
     * @param {Object} paymentSystem payment system
     */
    $scope.preparePaymentForm = function preparePaymentForm(paymentSystem) {
        $scope.withdrawFormData = {};
        $scope.depositFormData = {};

        // pre-fill deposit fields from profile if needed
        angular.forEach(paymentSystem.depositFormFields, function (field) {

            if (!field.type) {
                field.type = 'text';
            }

            if (field.prefillFromProfile) {
                $scope.depositFormData[field.name] = $rootScope.profile[field.prefillFromProfile];
            }

            if (field.setValue) {
                $scope.depositFormData[field.name] = field.setValue;
            }

            if(field.type === 'html') {
                field.html = $sce.trustAsHtml(field.value);
            }
        });

        // pre-fill withdraw fields from profile if needed
        angular.forEach(paymentSystem.withdrawFormFields, function (field) {

            if (!field.type) {
                field.type = 'text';
            }

            if (field.prefillFromProfile) {
                $scope.withdrawFormData[field.name] = $rootScope.profile[field.prefillFromProfile];
            }

            if (field.setValue) {
                $scope.withdrawFormData[field.name] = field.setValue;
            }

            if(field.type === 'select' && $scope.withdrawFormData[field.name] === undefined){
                $scope.withdrawFormData[field.name] = field.options[0].value;
            }
        });

        //external scripts part
        if ($scope.balancePageType === 'deposit' && paymentSystem.depositPageScripts && paymentSystem.depositPageScripts.length) {
            $timeout(function() {
                angular.forEach(paymentSystem.depositPageScripts, function (url) { Script(url + '?' + Date.now());});
            });
        }
        if ($scope.balancePageType === 'withdraw' && paymentSystem.withdrawPageScripts && paymentSystem.withdrawPageScripts.length) {
            $timeout(function() {
                angular.forEach(paymentSystem.withdrawPageScripts, function (url) { Script(url + '?' + Date.now());});
            });
        }

        $scope.showConfirmation = false;
        $scope.showGetStatusForm = false;
        $scope.depositInProgress = false;
        $scope.paymentIsDone = false;
    };


    $scope.getBcString = function getBcString() {
        // TODO: implement
    };

    /**
     * @ngdoc method
     * @name deposit
     * @methodOf vbet5.controller:paymentsCtrl
     * @description  sends deposit request to swarm, gets result, displays "external" form
     */
    $scope.deposit = function deposit() {
        $scope.busy = true;
        var forProduct = $rootScope.isInSports() ? "sport" : "casino";
        var request = {
            amount: parseFloat($scope.selectedPaymentSystem.depositPrefilledAmount || $scope.depositAmount),
            service: $scope.selectedPaymentSystem.name,
            payer: {
                status_urls: {
                    success: currentLocationWithParam('message', Translator.get('Deposit was successful.')),
                    cancel: currentLocationWithParam(),
                    fail: currentLocationWithParam('message', Translator.get('Deposit failed.'))
                },
                forProduct: forProduct
//                test_mode: true // @TODO remove after testing
//                test_mode_db: true // not needed
            }
        };
        if ($scope.selectedPaymentSystem.depositFormFields && $scope.selectedPaymentSystem.depositFormFields.length) {
            angular.forEach($scope.selectedPaymentSystem.depositFormFields, function (field) {
                if ($scope.depositFormData[field.name] === undefined) {
                    $scope.depositFormData[field.name] = null;
                }
            });
            Utils.MergeRecursive(request.payer, $scope.depositFormData);
        }
        if ($scope.selectedPaymentSystem.predefinedFields) {
            Utils.MergeRecursive(request.payer, $scope.selectedPaymentSystem.predefinedFields);
        }
        var message = Translator.get("There was an error processing your request.");
        $scope.messageType = 'error';

        /* Server To Server Passing Track Id */
        if (Storage.get('trackId') && Config.serverToServerTracking) {
            request.payer.track_id = Storage.get('trackId');
            Storage.set('trackId', '');
        }
        //console.log('test test test test test test test test test test test');
        //console.log(request);

        doDepositRequest(request, message);
    };

    /**
     * @ngdoc method
     * @name confirmDeposit
     * @methodOf vbet5.controller:paymentsCtrl
     * @description  called when "Confirm" button is clicked on deposit page. Just closes the slider.
     * @param {Function} formSubmitFunc a callback function provided by externalForm directive, will call this to submit the form
     */
    $scope.confirmDeposit = function confirmDeposit(formSubmitFunc) {
        if (angular.isFunction(formSubmitFunc)) {
            formSubmitFunc();
        }
        $timeout(function () { //required for Firefox, otherwise form will not be submitted
            $scope.showConfirmation = false;
            $scope.paymentIsDone = false;
            $scope.env.showSlider = false;
        }, 1);

    };

    /**
     * @ngdoc method
     * @name getDepositStatus
     * @methodOf vbet5.controller:paymentsCtrl
     * @description  called when " " button is clicked on deposit page. Just closes the slider.
     * @param {Function} formSubmitFunc a callback function provided by externalForm directive, will call this to submit the form
     */
    $scope.getDepositStatus = function getDepositStatus(formSubmitFunc) {
        console.log('getDepositStatus', $scope.externalFormParams);

        $scope.getDepositStatusInProgress = true;
        var transId = Utils.getArrayObjectElementHavingFieldValue($scope.externalFormParams.fields, 'name', 'transaction_id').value;
        Zergling.get({service: $scope.selectedPaymentSystem.name, "transaction_id": transId}, 'get_deposit_status').then(function (data) {
            $scope.depositStatus = data.status;
            $scope.depositedAmount = data.amount;
        })['finally'](function (response) {
            console.log('get_deposit_status response', response);
            $scope.getDepositStatusInProgress = false;
        });

    };

    //---------------------------  Renew  ------------------------------------------

    var renewClockPromise;
    $scope.renewInit = function renewInit() {
        function clock() {
            if (!$rootScope.profile) {
                return;
            }
            $scope.timer = Moment.get().unix() < $rootScope.profile.credit_renew_time ? Moment.get().preciseDiff($rootScope.profile.credit_renew_time * 1000) : null;
        }
        if (Config.main.enableFreeRenew) {
            clock();
            renewClockPromise = $interval(clock, 1000);
        }
    };

    $scope.renew = function renew() {
        $scope.renewInProgress = true;
        $scope.renewDone = $scope.renewFailed = false;//reset state
        Zergling.get({}, 'renew_user_credits').then(function (response) {
            console.log('renew_user_credits repsponse', response);
            if (response.result === 0) {
                $rootScope.profile.credit_renew_time =  response.details.next_re_new_time;  //@TODO:
                $scope.renewDone = true;
            } else {
                $scope.renewFailed = true;
            }
        })['finally'](function () {
            $scope.renewInProgress = false;
        });
    };

    $scope.$on('$destroy', function () {
        $interval.cancel(renewClockPromise);
        $scope.renewDone = $scope.renewFailed = false;//reset state
    });
    //--------------------------- ! Renew  ------------------------------------------


    /**
     * @ngdoc method
     * @name buyVC
     * @methodOf vbet5.controller:paymentsCtrl
     * @description  Buy virtual credit throught paypal
     * @param {Object}  point contains the price and amount of selected point
     */
    $scope.buyVC = function (point) {
        $scope.selectedPoint = point;
        var credit = parseFloat(point.vc),
            request = {
                amount: credit,
                service: 'paypal',
                payer: {
                    status_urls: {
                        success: currentLocationWithParam('message', Translator.get('Deposit was successful.')),
                        cancel: currentLocationWithParam(),
                        fail: currentLocationWithParam('message', Translator.get('Deposit failed.'))
                    }
                }
            },

            message = Translator.get("There was an error processing your request.");
        $scope.messageType = 'error';
        doDepositRequest(request, message);
    };


    /**
     * @ngdoc method
     * @name openVerifyAccountPage
     * @methodOf vbet5.controller:paymentsCtrl
     * @description  Opens settings slider tab "verify account" page by sending broadcast message to mainheader controller
     */
    $scope.openVerifyAccountPage = function openVerifyAccountPage() {
        $location.search('settingspage', 'verifyaccount');
        $rootScope.$broadcast('toggleSliderTab', 'settings');
    };


	/**
	 * @ngdoc method
	 * @name loadWithdrawStatus
	 * @methodOf vbet5.controller:paymentsCtrl
	 * @description  Loads withdraw statuses
	 */
	$scope.loadWithdrawStatuses = function loadWithdrawStatuses () {
		Zergling.get({}, 'get_withdrawals').then(function (response) {
			if (response && response.withdrawal_requests && response.withdrawal_requests.request) {
				$scope.withdrawHistory = response.withdrawal_requests.request.reverse();
            }

            if (response && response.result_status === "OK") {
                $scope.withdrawListLoaded = true;
            }
		});
	};

	/**
	 * @ngdoc method
	 * @name loadWithdrawStatus
	 * @methodOf vbet5.controller:paymentsCtrl
	 * @description  Cancels pending withdraw request
	 */
	$scope.cancelWithdrawRequest = function cancelWithdrawRequest () {
            $scope.cancelButton.disabled = true;
            Zergling.get({}, 'withdraw_cancel').then(function () {
                $scope.loadWithdrawStatuses();
                $scope.cancelButton.disabled = false;
            });
	};

}]);
