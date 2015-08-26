/**
 * @ngdoc controller
 * @name CASINO.controller:casinoLoginCtrl
 * @description
 * casino login controller
 */

CASINO.controller('casinoLoginCtrl', ['$rootScope', '$scope', '$timeout', '$filter', '$http', '$location', 'CConfig', 'AuthData', 'Zergling', function ($rootScope, $scope, $timeout, $filter, $http, $location, CConfig, AuthData, Zergling) {
    'use strict';

    var casinoBalanceTimer, isInCasino;

    /**
     * @ngdoc method
     * @name getCasinoBalance
     * @methodOf CASINO.controller:casinoLoginCtrl
     * @description
     * @param {Boolean} [once] optional. If true, request will be made once (no timer will be registered to make request again)
     */
    function getCasinoBalance(once) {
        if (casinoBalanceTimer) {
            $timeout.cancel(casinoBalanceTimer);
        }
        if (!isInCasino || !$rootScope.env.authorized) {
            casinoBalanceTimer = $timeout(getCasinoBalance, CConfig.balance.timeout);
            return console.log('skipping casino balance request');
        }
        Zergling.get({product: 'Casino'}, 'get_balance').then(function (response) {
            console.log('Casino balance(swarm)', response);
            $rootScope.env.casinoBalance = response;
            if (once) {
                return;
            }
            casinoBalanceTimer = $timeout(getCasinoBalance, CConfig.balance.timeout);
        });
    }

    function checkIfisInCasino() {
        if ($rootScope.isInCasino() || $rootScope.isInPoker() || !$rootScope.conf.sportEnabled) {
            isInCasino = true;
            getCasinoBalance(true); //make an extraordinary request for not having a delay displaying casino balance when switching to casino pages
        } else {
            isInCasino = false;
        }
    }
    checkIfisInCasino();

    $scope.$on('$routeChangeSuccess', checkIfisInCasino);

    $scope.$on("profile", function (event, data) {
        getCasinoBalance();
    });

    $scope.$on('login.loggedOut', function () {
        $timeout.cancel(casinoBalanceTimer);
        casinoBalanceTimer = false;
    });
}]);