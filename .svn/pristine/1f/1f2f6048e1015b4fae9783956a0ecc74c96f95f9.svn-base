/* global VBET5 */
/**
 * @ngdoc service
 * @name vbet5.service:Tracking
 * @description tracking integration helper service
 *
 */
VBET5.service('Tracking', ['$rootScope', '$location', 'Config', 'Storage', 'Zergling',  function ($rootScope, $location, Config, Storage, Zergling) {
    'use strict';
    var Tracking = {};

    /**
     * @description initializes Tracking and stores parameters in the storage
     */
    Tracking.init = function init() {
        var key, keys = Config.tracking || Config.main.trackingScripts;
        var locationSearch = $location.search();

        for (key in keys) {
            Storage.set('tracking_param_' + keys[key].param, locationSearch[keys[key].param]);
            $location.search(keys[key].param, undefined);
        }
    };

    /**
     * @description fix alias url
     */
    Tracking.fixURL = function fixURL(url) {
        return url.replace(/^\/+|\/+$/gm, '');
    };

    /**
     * @description replaces tokens
     */
    Tracking.tokens = function tokens(content, tokens) {
        var token, val;

        for (token in tokens) {
            val = tokens[token];
            if (!val) {
                val = Storage.get('tracking_param_' + token);
            }
            content = content.replace('{' + token + '}', val);
        }
        return content;
    };

    /**
     * @description check is event exists
     */
    Tracking.getEvent = function getEvent(evt) {
        var key, keys = Config.tracking || Config.main.trackingScripts;

        for (key in keys) {
            if (keys[key].event === evt) {
                return keys[key];
            }
        }
        return false;
    };

    /**
     * @description fires a custom event
     */
    Tracking.event = function event(evt, data, force) {
        data = data || {};

        if (Storage.get('tracking_event_fired_' + evt) && !$location.search().debug && !force) {
            return;
        }

        Storage.set('tracking_event_fired_' + evt, true);

        var callURL = '', key, keys = Config.tracking || Config.main.trackingScripts;

        var calbbackBackend = function calbbackBackend(data) {
            console.log(data);
        };

        for (key in keys) {
            if (keys[key].event === evt && (!keys[key].alias || Tracking.fixURL($location.path()) === keys[key].alias)) {
                // track by postback
                if (keys[key].postback) {
                    Zergling
                        .get({param: keys[key].param, value: Storage.get('tracking_param_' + keys[key].param)}, 'backend_tracking')
                        .then(calbbackBackend, calbbackBackend);
                }

                // track by url
                if (keys[key].url) {
                    data[keys[key].param] = Storage.get('tracking_param_' + keys[key].param);
                    callURL = Tracking.tokens(keys[key].url, data);

                    var tracking = document.createElement(keys[key].tag || "IMG");
                    tracking.src = callURL;
                    tracking.style.display = 'none';
                    document.body.appendChild(tracking);
                }

                if (keys[key].callback) {
                    keys[key].callback($rootScope);
                }

                if (keys[key].popup) {
                    window.open(keys[key].popup, 'trackingPopup', 'height=320,width=240');
                }

                if (keys[key].dialog) {
                    $rootScope.globalDialog = keys[key].dialog;
                }
            }
        }

        console.log('Tracking:', evt, callURL);

    };

    return Tracking;
}]);
