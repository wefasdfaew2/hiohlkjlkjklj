angular.module('vbet5').config(['$routeProvider', '$anchorScrollProvider', 'SkinConfig', function ($routeProvider, $anchorScrollProvider, SkinConfig) {
    'use strict';

    $anchorScrollProvider.disableAutoScrolling();

    function getTemplate(path) {
        if (SkinConfig.customTemplates && SkinConfig.customTemplates.indexOf(path.substr(10)) !== -1) { // substr's "10" param is the length of "templates/"
            return "skins/" + SkinConfig.main.skin + "/" + path;
        }
        return path;
    }

    $routeProvider
//        .when('/:page/', {
//            templateUrl: function (params) { return 'templates/' + params.page + '/main.html'; }
//        })
        .when('/about/:section?', {
            templateUrl: getTemplate('templates/about/main.html'),
            reloadOnSearch: false
        })
        .when('/sb/', {
            templateUrl: getTemplate('templates/external/sportsbook.html'),
            reloadOnSearch: false
        })
        .when('/sport/', {
            templateUrl: getTemplate('templates/sport/main.html'),
            reloadOnSearch: false
        })
        .when('/overview/', {
            templateUrl: getTemplate('templates/sport/overview/main.html'),
            reloadOnSearch: false
        })
        .when('/multiview/', {
            templateUrl: getTemplate('templates/sport/multiview/main.html'),
            reloadOnSearch: false
        })
        .when('/customsport/:section/', {
            templateUrl: getTemplate('templates/sport/main.html'),
            reloadOnSearch: false
        })
        .when('/virtualsports/', {
            templateUrl: getTemplate('templates/sport/virtualsportseastern.html'),
            reloadOnSearch: false
        })
        .when('/poolbetting/', {
            templateUrl: getTemplate('templates/sport/main.html'),
            reloadOnSearch: false
        })
        .when('/freebet/', {
            templateUrl: getTemplate('templates/freebet/main.html'),
            reloadOnSearch: false
        })
        .when('/page/:slug', {
            templateUrl: getTemplate('templates/pages/main.html')
        })
        .when('/section/:slug', {
            templateUrl: getTemplate('templates/section/main.html')
        })
        .when('/casino/', {
            templateUrl: getTemplate('templates/casino/main.html'),
            reloadOnSearch: false
        })
        .when('/promos/', {
            templateUrl: getTemplate('templates/promos/main.html'),
            reloadOnSearch: false
        })
        .when('/livedealer/', {
            templateUrl: getTemplate('templates/livedealer/main.html'),
            reloadOnSearch: false
        })
        .when('/keno/', {
            templateUrl: getTemplate('templates/livedealer/keno.html'),
            reloadOnSearch: false
        })
        .when('/fantasy/', {
            templateUrl: getTemplate('templates/specialgames/main.html'),
            reloadOnSearch: false
        })
        .when('/ogwil/', {
            templateUrl: getTemplate('templates/specialgames/main.html'),
            reloadOnSearch: false
        })
        .when('/poker/:type?', {
            templateUrl: getTemplate('templates/poker/main.html'),
            reloadOnSearch: false
        })
        .when('/belote/', {
            templateUrl: getTemplate('templates/belote/main.html'),
            reloadOnSearch: false
        })
        .when('/backgammon/', {
            templateUrl: getTemplate('templates/backgammon/main.html'),
            reloadOnSearch: false
        })
        .when('/iphone/', {
            templateUrl: getTemplate('templates/golg/main.html'),
            reloadOnSearch: false
        })
        .when('/lottery/', {
            templateUrl: getTemplate('templates/lottery/main.html'),
            reloadOnSearch: false
        })
        .when('/affiliate/', {
            templateUrl: getTemplate('templates/affiliate/main.html'),
            reloadOnSearch: false
        })
        .when('/landing/', {
            templateUrl: getTemplate('templates/landing/main.html'),
            reloadOnSearch: false
        })
        .when('/winners/', {
            templateUrl: getTemplate('templates/free/main.html'),
            reloadOnSearch: false
        })
        .when('/games/', {
            templateUrl: getTemplate('templates/skillgames/main.html'),
            reloadOnSearch: false
        })
        .when('/game/:slug/provider/:slug/exid/:slug', {
            templateUrl: getTemplate('templates/specialgames/main.html'),
            reloadOnSearch: false
        })
        .when('/jackpot/', {
            templateUrl: getTemplate('templates/jackpot/main.html'),
            reloadOnSearch: false
        })
        .when('/financials/', {
            templateUrl: getTemplate('templates/specialgames/main.html'),
            reloadOnSearch: false
        })
        .when('/', {
            templateUrl: getTemplate('templates/homepage/main.html'),
            reloadOnSearch: false
        })
        .when('/popup/', {
            templateUrl: getTemplate('templates/popup/main.html'),
            reloadOnSearch: false
        })
        .when('/news/', {
            templateUrl: getTemplate('templates/news/main.html'),
            reloadOnSearch: false
        })
        .when('/livecalendar/', {
            templateUrl: getTemplate('templates/livecalendar/main.html'),
            reloadOnSearch: false
        })
        .when('/results/', {
            templateUrl: getTemplate('templates/results/main.html'),
            reloadOnSearch: false
        })
        .when('/exchange/', {
            templateUrl: getTemplate('templates/exchange/main.html'),
            reloadOnSearch: false
        })
        .when('/mobile/', {
            templateUrl: getTemplate('templates/mobile/main.html'),
            reloadOnSearch: false
        })
        .otherwise({
            redirectTo: '/games/'
        });

}]);