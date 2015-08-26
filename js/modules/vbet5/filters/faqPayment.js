/* global VBET5 */
/**
 * @ngdoc filter
 * @name vbet5.filter:faqPayment
 * @description Filter config payment systems by selected currency
 *
 */
VBET5.filter('faqPayment', ['SkinConfig', function (SkinConfig) {
    'use strict';
    var TYPES = [
        'deposit',
        'withdraw'
    ];

    return function (paymentSystem, TYPE, currency) {
        var payments = SkinConfig.paymentByCurrency,
            output;
        // check if have given type
        if (TYPES.indexOf(TYPE) === -1) {
            return;
        }
        // check if we have given currency
        if (!payments[TYPE][currency]) {
            return;
        }
        function filterPayment(element) {
            if (payments[TYPE][currency].indexOf(element.name) > -1) {
                return element;
            }
        }

        output = paymentSystem.filter(filterPayment);
        return output;

    };
}]);

