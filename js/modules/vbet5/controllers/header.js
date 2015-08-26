/* global VBET5 */
/**
 * @ngdoc controller
 * @name vbet5.controller:headerCtrl
 * @description
 * header controller
 */
VBET5.controller('headerCtrl', ['$scope', '$rootScope', '$sce', '$location', '$filter', '$timeout', 'Zergling', 'Utils', '$route', function ($scope, $rootScope, $sce, $location, $filter, $timeout, Zergling, Utils, $route) {
    'use strict';

    /**
     * displays messagebox if corresponding param in url is set
     */
    if ($location.search().message) {
        $rootScope.globalPopup = $location.search().message;
        if ($location.search().messagetype) {
            $rootScope.globalPopupType = $location.search().messagetype;
        }
        $location.search('message', undefined); //remove it after displaying
    }

    var initialCurrecyConfigDone = false;

    /**
     * @ngdoc method
     * @name setCurrencyConfig
     * @methodOf vbet5.controller:headerCtrl
     * @description
     * retrieves currency config from swarm and if successful overrides main config **balanceFractionSize** and
     * sets $rootScope **currency** variable with retrieved data
     * currency name sent to swarm is taken from config(default for site) or from user profile if user is logged in
     */
    function setCurrencyConfig(event, data) {
        if (event === undefined && initialCurrecyConfigDone) { //this happens when called by timeout, but was already called by 'profile' event
            return;
        }
        initialCurrecyConfigDone = true;
        var currencyName;
        console.log('setCurrencyConfig', data, event, initialCurrecyConfigDone);
        if (data && data.profile && !Utils.isObjectEmpty(data.profile)) {
            currencyName = $filter('firstElement')(data.profile).currency_name;
        } else {
            currencyName = $rootScope.conf.registration.defaultCurrency;
        }
        Zergling.get({
            'source': 'config.currency',
            'what': {
                'currency': []
            },
            'where': {
                'currency': {
                    'name': currencyName
                }
            }
        }).then(function (response) {
            if (response.data && response.data.currency) {
                console.log('currency:', response);
                $rootScope.currency = $filter('firstElement')(response.data.currency);
                if ($rootScope.currency && $rootScope.currency.rounding !== undefined) {
                    $rootScope.conf.balanceFractionSize = Math.abs($rootScope.currency.rounding);
                    console.log('balanceFractionSize', $rootScope.conf.balanceFractionSize);
                }

            }
        });

    }

    /**
     * @ngdoc method
     * @name getPartnerConfig
     * @methodOf vbet5.controller:headerCtrl
     * @description get partner Config
     */
    function getPartnerConfig() {
        $rootScope.partnerConfig = {};
        function updatePartnerConfig(response) {
            console.log(response);
            if (response && response.data && response.data.partner) {
                $rootScope.partnerConfig = Utils.objectToArray(response.data.partner)[0];
            }
        }
        Zergling.subscribe({
            "source": "partner.config",
            'what': {'partner': []}
            //'where': {}
        }, updatePartnerConfig).then(updatePartnerConfig);
    }

    if ($rootScope.partnerConfig === undefined) {
        getPartnerConfig();
    }

    /**
     * @ngdoc method
     * @name answer
     * @methodOf vbet5.controller:headerCtrl
     * @description closes yes/no dialog and broadcasts user's answer
     * @param {String} usersAnswer user's answer
     */
    $scope.answer = function answer(usersAnswer) {
        console.log('answer', usersAnswer);
        $rootScope.$broadcast('dialog.' + usersAnswer);
        $rootScope.yesNoDialog = null;
    };

    $scope.$on('profile', setCurrencyConfig);

    function gotoSelectedGame(event, data) {
        $location.path('/sport');
        $location.search(data);
        $route.reload();
        $rootScope.$broadcast('slider.close');
    }

    $rootScope.$on('gotoSelectedGame', gotoSelectedGame);

    $timeout(setCurrencyConfig, 1000); //call once in the beginning(with delay to let user login happen if user is logged in)

    $scope.$on('youtube.videourl', function (event, url) {
        $scope.youtubeVideoUrl = $sce.trustAsResourceUrl(url);
    });
}]);