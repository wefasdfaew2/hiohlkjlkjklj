/**
 * @ngdoc module
 * @name CASINO.module:CASINO
 * @description
 *
 * casino module.  Responsible for retrieving data from  casino server.
 *
 */

var CASINO = angular.module('casino', ['ngRoute']);

CASINO.run(['Utils', 'CConfig', 'SkinCConfig', function (Utils, CConfig, SkinCConfig) {
    'use strict';

    Utils.MergeRecursive(CConfig, SkinCConfig); //load skin specific config overrides

}]);