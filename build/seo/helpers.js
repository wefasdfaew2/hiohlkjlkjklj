/* global module, require */
(function () {
    'use strict';
    var http = require('http');

    module.exports = {
        getLocation: function getLocation(href) {
            var match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)(\/[^?#]*)(\?[^#]*|)(#.*|)$/);
            return match && {
                protocol: match[1],
                host: match[2],
                hostname: match[3],
                port: match[4],
                pathname: match[5],
                search: match[6],
                hash: match[7]
            };
        },
        callWithSecondParam: function callWithSecondParam(func, param) {return function (a) {func(a, param); }; },

        getJson: function getJson(options, successCallback, failCallback) {
            var body = '';
            http.get(options, function (resp) {
                resp.on('data', function (chunk) {
                    body = body + chunk;
                });
                resp.on("end", function () {
                    successCallback(body);
                });
            }).on("error", function (e) {
                failCallback(e);
                console.log("Got error: " + e.message);
            });
        }
    };
}());