/* global VBET5 */
/**
 * @author Narek Mamikonyn
 * @ngdoc directive
 * @name VBET5.directive:TimezoneSwitcher
 * @description
 * @restrict AE
 * @example
 <example>
    <div timezone-switcher timezone-class="your-class"></div>
    <timezone-switcher timezone-class="your-class"></timezone-switcher>
 </example
 */
VBET5.directive('timezoneSwitcher', ['$window', '$rootScope', 'Config', 'Storage', 'Moment', function ($window, $rootScope, Config, Storage, Moment) {
    'use strict';

    function getTimeZone() {
        // try to get through lang if it enabled
        if (Config.main.timeZonePerLanguage[Config.env.lang]) {
            return Config.main.timeZonePerLanguage[Config.env.lang];
        } else { // return default time zone from navigator
            return Config.env.selectedTimeZone || Moment.get().lang('en').format('Z');
        }
    }

    Config.env.selectedTimeZone = Storage.get('timezone') || getTimeZone();

    return {
        template: '<div ng-class="timezoneClass">' +
            '<div class="arrow-sport"></div>' +
                '<ul>' +
                    '<li class="title-sep" ng-click="setNewZone(zone.value)" ng-class="{active: (zone.value == env.selectedTimeZone)}" ng-repeat="zone in zones track by $index"><span>{{zone.name}}</span></li> ' +
                '</ul>' +
            '</div>',
        restrict: 'AE',
        scope: {
            timezoneClass: '@'
        },
        replace: false,
        link: function postLink($scope) {
            var storageExpireTime = 1 * 24 * 60 * 60 * 1000; //  1 - days , 2 - hours , 3- minutes , 4 -seconds , 5 -milliseconds
            $scope.zones = [
                {"value": "-12:00", "name": "GMT -12:00"},
                {"value": "-11:00", "name": "GMT -11:00"},
                {"value": "-10:00", "name": "GMT -10:00"},
                {"value": "-09:00", "name": "GMT -09:00"},
                {"value": "-08:00", "name": "GMT -08:00"},
                {"value": "-07:00", "name": "GMT -07:00"},
                {"value": "-06:00", "name": "GMT -06:00"},
                {"value": "-05:00", "name": "GMT -05:00"},
                {"value": "-04:00", "name": "GMT -04:00"},
                {"value": "-03:00", "name": "GMT -03:00"},
                {"value": "-02:00", "name": "GMT -02:00"},
                {"value": "-01:00", "name": "GMT -01:00"},
                {"value": "+00:00", "name": "GMT +00:00"},
                {"value": "+01:00", "name": "GMT +01:00"},
                {"value": "+02:00", "name": "GMT +02:00"},
                {"value": "+03:00", "name": "GMT +03:00"},
                {"value": "+04:00", "name": "GMT +04:00"},
                {"value": "+05:00", "name": "GMT +05:00"},
                {"value": "+06:00", "name": "GMT +06:00"},
                {"value": "+07:00", "name": "GMT +07:00"},
                {"value": "+08:00", "name": "GMT +08:00"},
                {"value": "+09:00", "name": "GMT +09:00"},
                {"value": "+10:00", "name": "GMT +10:00"},
                {"value": "+11:00", "name": "GMT +11:00"},
                {"value": "+12:00", "name": "GMT +12:00"},
                {"value": "+13:00", "name": "GMT +13:00"},
                {"value": "+14:00", "name": "GMT +14:00"}
            ];

            /**
             * @description Handle clicks on time zone and set value to $scope and set in storage then update config.env.selectedTimezone
             * @param {String} value timezone
             */
            $scope.setNewZone = function (value) {
                if (Config.env.selectedTimeZone !== value) {
                    Config.env.selectedTimeZone = value;
                    Storage.set('timezone', value, storageExpireTime);
                    $window.location.reload();//integrated sportsbook requirement: needs to be reloaded when changing timezone
                }
            };
            function init() {
                var initialValue = Storage.get('timezone') || getTimeZone();
                $scope.setNewZone(initialValue);
            }

            init();
        }
    };
}]);
