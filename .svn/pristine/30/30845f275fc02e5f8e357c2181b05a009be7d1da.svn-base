/**
 * @ngdoc module
 * @name CMS.module:CMS
 * @description
 *
 * CMS module.  Responsible for retrieving data from  CMS.
 */
var CMS = angular.module('CMS', ['ngRoute', 'snapscroll']);

CMS.run(['Utils', 'WPConfig', 'SkinWPConfig', function (Utils, WPConfig, SkinWPConfig) {
    'use strict';

    Utils.MergeRecursive(WPConfig, SkinWPConfig); //load skin specific config overrides

}]);
