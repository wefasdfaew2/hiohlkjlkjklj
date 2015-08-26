/**
 * Application bootstrapping
 * @ngdoc overview
 * @id index
 * @name index
 * @description <h1>the main application is 'app' which loads all needed modules</h1>
 */
angular.module('app', ['vbet5', 'CMS', 'casino']);
angular.module('app').config(['$compileProvider', function ($compileProvider) {
    'use strict';
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);
}]);

(function () {
    'use strict';
    var initInjector = angular.injector(["ng"]);
    var $http = initInjector.get("$http");
    var runtimeConfig;

    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(document.location.hash) || [, ""])[1].replace(/\+/g, '%20')) || null;
    }

    function loadRuntimeConfig() {
        var configUrlPrefix = "";
        if (getURLParameter('conf')) {
            configUrlPrefix = getURLParameter('conf');
        } else if (document.getElementById("app-config") && document.getElementById("app-config").getAttribute('data-config-url-path')) {
            configUrlPrefix = document.getElementById("app-config").getAttribute('data-config-url-path');
        }

        return $http.get(configUrlPrefix + "conf.json").then(
            function (response) {
                runtimeConfig = response.data;
                angular.module("app").constant("RuntimeConfig", response.data);
            },
            function () {
                angular.module("app").constant("RuntimeConfig", {});
            }
        );
    }

    function getCookie(name) {
        return document.cookie.split('; ').reduce(function (prev, curr) { return curr.indexOf(name + "=") !== -1 ? curr.split("=")[1] : prev; }, null);
    }

    function getLocationParam(name) {
        var match = document.location.hash.match(new RegExp(name + "=([\\w]+)"));
        return match ? match[1] : null;
    }

    function loadTranslations() {
        var defaultLanguage = runtimeConfig && runtimeConfig.env && runtimeConfig.env.lang;
        var lang = getLocationParam("lang") || getCookie('lang') || amplify.store('lang') || defaultLanguage || 'eng';
        var urlPrefix = "";

        if (getURLParameter('trans')) {
            urlPrefix = getURLParameter('trans');
        } else if (document.location.hostname.match(/staging.*\.int/)) {
            urlPrefix = "http://web.betconstruct.int/translations/app/get_language/" + runtimeConfig.main.skin;
        } else if (document.getElementById("bc-main-js") && document.getElementById("bc-main-js").src) {
            var parser = document.createElement('a');
            parser.href = document.getElementById("bc-main-js").src;
            urlPrefix = (parser.protocol + "//" + parser.host + parser.pathname).replace("app.min.js", "");
        }
        var langUrl = urlPrefix + (urlPrefix.substr(-1) === '/' || !urlPrefix.length ? "" : "/") + "languages/" + lang + ".json";
        console.log('loading language:', lang, langUrl);
        return $http.get(langUrl).then(
            function (response) {
                console.log('language load ok', response);
                angular.module('vbet5').constant('Translations', response.data);
            },
            function (response) {
                console.error('language load failed, error: ', response, " url: ", langUrl);
                angular.module('vbet5').constant('Translations', {});
            }
        );
    }

    function bootstrapApplication() {
        angular.element(document).ready(function () {
            angular.bootstrap(document, ["app"]);
        });
    }

    loadRuntimeConfig()['finally'](function () {
        loadTranslations()['finally'](bootstrapApplication);
    });

}());