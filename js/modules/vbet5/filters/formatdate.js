/* global VBET5 */
/**
 * @ngdoc filter
 * @name vbet5.filter:formatDate
 * @description
 * formats date
 *
 * @param {Number|String} unix timestamp in seconds or ISO date string
 * @param {String} [format] optional.
 * @param {Number} [calendarDays] optional. Closeness to now(in days) after which date will be displayed in default format instead of .calendar()
 * Date format to use (see {@link http://momentjs.com/docs/#/displaying/format/ moment.js docs})
 * If 'full' default full format will be used
 * If not specified 'relative' format will be used
 */
VBET5.filter('formatDate', [ 'Moment', 'Config',  function (Moment, Config) {
    'use strict';
    var DEFAULT_FORMAT = Config.env.lang === 'tur' ? "DD MMM YYYY LT" : "ll LT";

    return function (timestamp, format, calendarDays, longDateFormat) {
        calendarDays = calendarDays || 1;
        if (typeof timestamp === 'string' && timestamp.indexOf(':') !== -1 && timestamp.indexOf('-') !== -1) {
            timestamp = Moment.get(timestamp);
        } else {
            timestamp = Moment.moment.unix(timestamp);
        }
        Moment.setLongDateFormat(longDateFormat || Config.env.timeFormat);
        if (format) {
            if (format === 'full') {
                format = DEFAULT_FORMAT;
            }
            return Moment.get(timestamp).format(format);
        }
        if (Math.abs(Moment.get().diff(timestamp, 'days')) < calendarDays) {
            return timestamp.calendar();
        } else {
            return timestamp.format(DEFAULT_FORMAT);
        }
    };

}]);