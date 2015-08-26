'use strict';
//
///**
// * @ngdoc function
// * @name exchangevivaroApp.controller:MainCtrl
// * @description
// * # MainCtrl
// * Controller of the exchangevivaroApp
// */

//'use strict';
//
//
var app = angular
  .module('exchange', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngLodash',
    'ui.router'
  ]);


app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('exchange', {
      url: "/exchange",
      views: {
        "leftMenu": {
          controller: "leftMenu",
          templateUrl: "../views/exchange.leftMenu.html"
        },
        "markets": {
          controller: "markets",
          templateUrl: "../views/exchange.markets.html"
        },
        "betSlip": {
          controller: "betSlip",
          templateUrl: "../views/exchange.betSlip.html"
        }
      }
    })

    .state('exchange.market', {
      url: "/:sportId/:regionId/:competitionId/:gameId/",
      views: {
        "leftMenu": {
          controller: "leftMenu",
          templateUrl: "views/exchange.leftMenu.html"
        },
        "markets": {
          controller: "markets",
          templateUrl: "views/exchange.markets.html"
        },
        "betSlip": {
          controller: "betSlip",
          templateUrl: "views/exchange.betSlip.html"
        }
      }
    });

      $urlRouterProvider.otherwise("/exchange");
  });


var MainCtrl = function($rootScope, $scope, $stateParams, $timeout, Zergling) {

  var gameId = $stateParams.gameId;
  var competitionId = $stateParams.competitionId;
  var sportId = $stateParams.sportId;
  var regionId = $stateParams.regionId;

 // Zergling.init();

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams , exchange) {
    // var request = {
    //       "source": "betting",
    //       "what": {
    //         "competition": [
    //           "id",
    //           "name",
    //           "order"
    //         ]
    //       },
    //       "where": {
    //         "game": {
    //           "type": 0,
    //           "is_fair": 1
    //         },
    //         "region": {
    //           "id": id
    //         }
    //       },
    //       "subscribe": true
    //     };
    // Zergling.request()
    $timeout(function() {
      $rootScope.$broadcast('GameBroadcastToMarket', toParams);
    }, 0);


  });
};

MainCtrl.prototype.onInit = function() {

};

//angular.module('exchange')
app.controller('MainCtrl', MainCtrl);
