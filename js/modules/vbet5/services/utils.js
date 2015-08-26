/* global VBET5 */
/**
 * @ngdoc service
 * @name vbet5.service:Utils
 * @description
 * Utility functions
 */

VBET5.service('Utils', ['$timeout', '$filter', function ($timeout, $filter) {
    'use strict';
    var Utils = {};

    /**
     * @ngdoc method
     * @name objectToArray
     * @methodOf vbet5.service:Utils
     * @description Converts object to array.
     *
     * Needed mainly because data from swarm is Object but angular needs Arrays for ng-repeat, sorting, etc.
     *
     * @param {Object} obj  object to convert
     * @param {String} [addKeyNameAsProperty]  optional. if set, the object key name will be added to array item under this name
     * @returns {Array} array
     */
    Utils.objectToArray = function objectToArray(obj, addKeyNameAsProperty) {

        if (!(obj instanceof  Object)) {
            console.warn('Utils.objectToArray - not an object:', obj);
            return obj;
        }
        var ret = [];

        angular.forEach(obj, function (item, key) {
            if (addKeyNameAsProperty) {
                item[addKeyNameAsProperty] = key;
            }
            ret.push(item);
        });

        return ret;
    };

    /**
     * @ngdoc method
     * @name createMapFromObjItems
     * @methodOf vbet5.service:Utils
     * @description Converts object map, using specified item property value as key
     *
     *
     * @param {Object} obj the object
     * @param {String} itemPropertyNameToUseAsKey property name to use as key
     * @returns {Object} created map object
     */
    Utils.createMapFromObjItems = function createMapFromObjItems(obj, itemPropertyNameToUseAsKey) {
        if (!(obj instanceof  Object)) {
            console.warn('Utils.createMapFromObjItems - not an object:', obj);
            return obj;
        }
        var ret = {};
        angular.forEach(obj, function (item) {
            ret[item[itemPropertyNameToUseAsKey]] = item;
        });
        return ret;
    };

    /**
     * @ngdoc method
     * @name getItemBySubItemProperty
     * @methodOf vbet5.service:Utils
     * @description returns object's items which have property with specified name and one of specified values
     *
     * e.g. if we have:
     *
     *      obj =  {
     *              1: {type:'a', data: 'foo'},
     *              2: {type:'b', data: 'bar'}
     *              3: {type:'c', data: 'baz'}
     *      }
     *
     * if we need to get the {type:'b', data: 'bar'} object, we can do it
     * by calling
     *
     *      getItemBySubArrayProperty(obj, 'type', ['b']);
     *      or
     *      getItemBySubArrayProperty(obj, 'type', {'b':true});
     *
     * which will return
     *
     *      {b: {type:'b', data: 'bar'}}
     *
     * if we need to get the objects with types 'b' or 'c' , we can do it
     * by calling
     *
     *      getItemBySubArrayProperty(obj, 'type', ['b','c']);
     *      or
     *      getItemBySubArrayProperty(obj, 'type', {'b':true,'c':true});
     * which will return
     *
     *      {'b': {type:'b', data: 'bar'}, 'c': {type:'c', data: 'baz'}}
     *
     * @param {Object} obj object containing needed item
     * @param {String} propertyName  name of property(field)
     * @param {Array|Object} propertyValues desired values of property.
     * Can be array or hashmap. Hashmap is faster on large objects, while array is more readable.
     *
     * @returns {Object} map of items having 'propertyName' with value 'propertyValue' or null if nothing was found
     */
    Utils.getItemBySubItemProperty = function getItemBySubItemProperty(obj, propertyName, propertyValues) {
        var ret = {};
        if (propertyValues instanceof Array) {
            angular.forEach(obj, function (item) {
                if (!item) {
                    return;
                }
                var pos = propertyValues.indexOf(item[propertyName]);
                if (pos !== -1) {
                    ret[propertyValues[pos]] = item;
                }
            });
        } else if (propertyValues instanceof Object) {
            angular.forEach(obj, function (item) {
                if (!item) {
                    return;
                }
                if (propertyValues[item[propertyName]] !== undefined) {
                    ret[item[propertyName]] = item;
                }
            });
        }


        return Utils.isObjectEmpty(ret) ? null : ret;
    };


    /**
     * @ngdoc method
     * @name groupByItemProperty
     * @methodOf vbet5.service:Utils
     * @description returns object's items grouped by item's property values
     *
     * e.g. if we have:
     *
     *      obj =  {
     *              1: {type:'a', data: 'foo'},
     *              2: {type:'b', data: 'bar'}
     *              3: {type:'c', data: 'foo'}
     *              4: {type:'a', data: 'baz'}
     *      }
     *
     *
     * **groupByItemProperty(obj, 'type');**
     *
     * will return
     *
     *      {
     *          a: [{type:'a', data: 'foo'}, {type:'a', data: 'baz'}],
     *          b: [{type:'b', data: 'bar'}],
     *      }   c: [{type:'c', data: 'foo'}]
     *
     *
     *  **groupByItemProperty(obj, 'data');**
     *
     * will return
     *
     *      {
     *          foo: [{type:'a', data: 'foo'}, {type:'c', data: 'foo'}],
     *          bar: [{type:'b', data: 'bar'}],
     *          baz: [{type:'a', data: 'baz'}]
     *      }
     *
     *
     * @param {Object} obj object containing needed items
     * @param {String} propertyName  name of property(field) to group by
     * @param {String} [setMissingPropertyValue]  if set, for items not having the property it will be added with this value
     * @returns {Object} array of groups
     */
    Utils.groupByItemProperty = function groupByItemProperty(obj, propertyName, setMissingPropertyValue) {
        var groups = {},
            defaultGroupName = setMissingPropertyValue || '_';
        angular.forEach(obj, function (item) {
            if (!item) {
                return;
            }
            if (item[propertyName] !== undefined) {
                if (groups[item[propertyName]] === undefined) {
                    groups[item[propertyName]] = [];
                }
                groups[item[propertyName]].push(item);
            } else {
                if (groups[defaultGroupName] === undefined) {
                    groups[defaultGroupName] = [];
                }
                if (setMissingPropertyValue) {
                    item[propertyName] = setMissingPropertyValue;
                }
                groups[defaultGroupName].push(item);
            }
        });
        return Utils.isObjectEmpty(groups) ? null : groups;
    };

    /**
     * @ngdoc method
     * @name groupByItemProperties
     * @methodOf vbet5.service:Utils
     * @description returns object's items grouped by several of item's property values
     *
     * e.g. if we have:
     *
     *      obj =  {
     *              1: {type1:'a', type2: '1', data: 'foo'},
     *              2: {type1:'b', type2: '2', data: 'bar'}
     *              3: {type1:'c', type2: '3', data: 'foo'}
     *              4: {type1:'a', type2: '2', data: 'bazbaz'}
     *              5: {type1:'a', type2: '1', data: 'baz'}
     *              6: {type1:'a', type2: '2', data: 'baz'}
     *      }
     *
     *
     * **groupByItemProperty(obj, ['type1'. 'type2']);**
     *
     * will return
     *
     *      {
     *          '_a1': [{type1:'a', type2: '1', data: 'foo'}, {type1:'a', type2: '1', data: 'baz'}],
     *          '_a2': [{type1:'a', type2: '2', data: 'baz'}, {type1:'a', type2: '2', data: 'bazbaz'}],
     *          '_b2': [{type1:'b', type2: '2', data: 'bar'}],
     *         '_c3': [{type1:'c', type2: '3', data: 'foo'}]
     *      }
     *
     *
     * @param {Object} obj object containing needed items
     * @param {Array} propertyNames  name of property(field) to group by
     * @returns {Object} array of groups
     */
    Utils.groupByItemProperties = function groupByItemProperties(obj, propertyNames) {
        var groups = {};
        angular.forEach(obj, function (item) {
            if (!item) {
                return;
            }
            var key = '_';
            angular.forEach(propertyNames, function (propertyName) {
                if (item[propertyName] !== undefined) {
                    key = key + item[propertyName];
                }
            });

            if (groups[key] === undefined) {
                groups[key] = [];
            }
            groups[key].push(item);

        });
        return Utils.isObjectEmpty(groups) ? null : groups;
    };

    /**
     * @ngdoc method
     * @name isObjectEmpty
     * @methodOf vbet5.service:Utils
     * @description checks if object is empty
     *
     * @param {Object} obj object to check
     * @returns {boolean} true if empty, false otherwise
     */
    Utils.isObjectEmpty = function isObjectEmpty(obj) {
        var prop;
        for (prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                return false;
            }
        }
        return true;
    };



    /**
     * @ngdoc method
     * @name getPartToShowInColumns
     * @methodOf vbet5.service:Utils
     * @description
     * Gets the remaining items(which don't fit in list and should be shown at "more" dropdown block)
     * of array and groups them by columns.  Each column is an array, containing array of lettergroups.
     * Lettergroup is and array containing items grouped by letter.
     *
     * Method is used to construct list from Sports and Regions dropdown blocks, as it cannot be done with CSS
     *
     * @param {Array} initialList list of items to group by columns/letters (sports list or regions list)
     * @param {Number} startFrom index of **initialList** to start from
     * @param {Number} columnNumber number of columns to divide to
     * @param {String} fieldToUseForLetter name of filed which will be used to divide by letter and sort. Default is 'name'
     *
     * @returns {Array} array of columns(array of lettergroups(array of items staring with letter))
     */
    Utils.getPartToShowInColumns = function getPartToShowInColumns(initialList, startFrom, columnNumber, fieldToUseForLetter) {
        fieldToUseForLetter = fieldToUseForLetter || 'name';
        var i, j, sortedByLetter = [], columns = [], moreGames = [],  maxColumnHight;
        var compare = function (a, b) {
            if (a[fieldToUseForLetter] < b[fieldToUseForLetter]) {
                return -1;
            }
            if (a[fieldToUseForLetter]  > b[fieldToUseForLetter]) {
                return 1;
            }
            return 0;
        };
        if (initialList) {
            if (initialList.length > startFrom) {
                moreGames = initialList.slice(startFrom).sort(compare);
            } else {
                return null;
            }

            sortedByLetter[0] = [];
            sortedByLetter[0].push(moreGames[0]);
            for (i = 1, j = 0; i < moreGames.length; i++) {
                if (moreGames[i][fieldToUseForLetter].charAt(0).toLowerCase() === moreGames[i - 1][fieldToUseForLetter].charAt(0).toLowerCase()) {
                    sortedByLetter[j].push(moreGames[i]);
                } else {
                    sortedByLetter[++j] = [];
                    sortedByLetter[j].push(moreGames[i]);
                }
            }
            columns[0] = [];
            maxColumnHight = Math.floor(moreGames.length / columnNumber);
            var currentColLength = 0;
            var residualLength = moreGames.length;
            for (i = 0, j = 0; i < sortedByLetter.length; i++) {
                if (columns[j].length === 0 || currentColLength + sortedByLetter[i].length <= maxColumnHight || ((i !== sortedByLetter.length - 1) && (currentColLength + sortedByLetter[i].length < sortedByLetter[i].length + sortedByLetter[i + 1].length))) {
                    columns[j].push(sortedByLetter[i]);
                    currentColLength += sortedByLetter[i].length;
                } else {
                    residualLength -= currentColLength;
                    columns[++j] = [];
                    columns[j].push(sortedByLetter[i]);
                    currentColLength = sortedByLetter[i].length;
                    maxColumnHight = Math.floor(residualLength / (columnNumber - j));
                }
            }
            return columns;
        }
        return null;
    };

    /**
     * @ngdoc method
     * @name arrayMove
     * @methodOf vbet5.service:Utils
     * @description Move array element from "from" position to "to" position
     *
     * @param {Array} array the array
     * @param {Number} from source index
     * @param {Number} to target index
     *
     * @returns {Array} array
     */

    Utils.arrayMove = function arrayMove(array, from, to) {
        array.splice(to, 0, array.splice(from, 1)[0]);

        return array;
    };


    /**
     * @ngdoc method
     * @name setJustForMoment
     * @methodOf vbet5.service:Utils
     * @description sets **scope**'s variable value to provided one for some time, then changes it back
     *
     * @param {Object} scope the scope
     * @param {string} name scope variable name
     * @param {mixed} value value to set
     * @param {number} [time] optional. time in milliseconds, default is 500
     */
    Utils.setJustForMoment = function setJustForMoment(scope, name, value, time) {
        time = time || 500;
        var prevValue = scope[name];
        scope[name] = value;
        $timeout(function () {
            scope[name] = prevValue;
        }, time);
    };


    /**
     * @ngdoc method
     * @name MergeRecursive
     * @methodOf vbet5.service:Utils
     * @description merges 2 objects recursively
     * @param {Object} to destination object
     * @param {Object} from source object
     * @return {Object} returns changed destination object
     */
    Utils.MergeRecursive = function MergeRecursive(to, from) {
        var p;
        for (p in from) {
            if (from.hasOwnProperty(p)) {
                try {
                    if (from[p].constructor === Object) {
                        if (from[p]['@replace'] === true) {  //replace field instead of merging if specified
                            to[p] = from[p];
                            delete to[p]['@replace'];
                        } else {
                            to[p] = Utils.MergeRecursive(to[p], from[p]);
                        }

                    } else {
                        to[p] = from[p];
                    }
                } catch (e) {
                    to[p] = from[p];
                }
            }
        }
        return to;
    };

    /**
     * @ngdoc method
     * @name createPaginationArray
     * @methodOf vbet5.service:Utils
     * @description
     * creates array for pagination
     * (list of pages arount the selected one to fit into some amount + first and last)
     * like   1 2 3 ... 10 11 12 13 14
     * or 1 ... 5 6 7 8 ... 20
     *
     * the '...' items are just negative numbers
     *
     * @param {Number} totalPages  total amount of pages
     * @param {Number} selectedPage  selected page number
     * @param {Number} visibleAmount amount of pages that will be visible
     *
     * @return {Array} array of page numbers (negative numbers instead of '...'s)
     */
    Utils.createPaginationArray = function createPaginationArray(totalPages, selectedPage, visibleAmount) {
        visibleAmount = visibleAmount || 10;
        var visibleAmountHalf = parseInt(visibleAmount / 2, 10);
        var i, startPage, endPage, diff, visiblePages = [];
        startPage = (selectedPage < visibleAmountHalf + 1) ? 1 : selectedPage - visibleAmountHalf;
        endPage = startPage + visibleAmount;
        endPage = (endPage > totalPages) ? totalPages : endPage;
        diff = startPage - endPage + visibleAmount - 1;
        startPage -= (startPage - diff > 0) ? diff : 0;
        if (startPage > 1) {
            visiblePages.push(1);
        }
        if (startPage > 2) {
            visiblePages.push(-1);
        }
        for (i = startPage; i <= endPage; i++) {
            visiblePages.push(i);
        }
        if (endPage < totalPages - 1) {
            visiblePages.push(-2);
        }
        if (endPage < totalPages) {
            visiblePages.push(totalPages);
        }
        if (totalPages === visiblePages.length) {  // a quick dirty fix, actually this whole function has to be rewritten
            visiblePages.map(function (current, i, arr) { arr[i] = current > 0 ? current : arr[i - 1] + 1; });
        }
        return visiblePages;
    };

    /**
     * @ngdoc method
     * @name nl2br
     * @methodOf vbet5.service:Utils
     * @description converts newlines to <br> in goven string
     * @param {String} str string to convert
     *
     * @return {String} string with <br>s instead of new lines
     */
    Utils.nl2br = function nl2br(str) {
        return str.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
    };

    /**
     * @ngdoc method
     * @name getKeyOfMinValue
     * @methodOf vbet5.service:Utils
     * @description returns key ob object having minimal value
     * @param {Object} obj the object
     *
     * @return {String} key (name of property) with minimal value
     */
    Utils.getKeyOfMinValue = function getKeyOfMinValue(obj) {
        var min = Infinity, keyOfMin = null;
        angular.forEach(obj, function (val, key) {
            if (val < min) {
                min = val;
                keyOfMin = key;
            }
        });
        return keyOfMin;
    };

    /**
     * @ngdoc method
     * @name getWeightedRandom
     * @methodOf vbet5.service:Utils
     * @description returns "weighted" random element of array
     * @param {Array} array the array
     * @param {String} weightFieldName aray's objects' field name that contains it's weight
     *
     * @return {Object} random weighted array item
     */
    Utils.getWeightedRandom = function getWeightedRandom(array, weightFieldName) {
        weightFieldName = weightFieldName || 'weight';
        var variants = [], i;
        angular.forEach(array, function (item) {
            for (i = 0; i < (item[weightFieldName] || 1); i++) {
                variants.push(item);
            }
        });

        var index = Math.floor(Math.random() * variants.length);

        return variants[index];
    };

    /**
     * @ngdoc method
     * @name getAdditionalItems
     * @methodOf vbet5.service:Utils
     * @description returns array of menu items that don't fit in main section, each group preceded by it's first letter item
     * @param {Array} allItems the array
     * @param {Number} startFrom start index
     * @param {String} groupBy field name to group by
     * @param {String} type items type(name of field in result objects)
     *
     * @return {Array} additional items
     */
    Utils.getAdditionalItems = function getAdditionalItems(allItems, startFrom, groupBy, type) {
        if (!allItems || !allItems.length || allItems.length <= startFrom) {
            return;
        }
        var letterClasses = {}, i = 0, ret = [], currentLetter;
        angular.forEach($filter('orderBy')(allItems.slice(startFrom), groupBy), function (item) {
            var sportFirstLetter = item[groupBy].charAt(0);
            letterClasses[sportFirstLetter] = letterClasses[sportFirstLetter] || 'letter-' + i++;
            if (currentLetter !== sportFirstLetter) {
                currentLetter = sportFirstLetter;
                ret.push({type: 'letter', letter: currentLetter, cssClass: letterClasses[sportFirstLetter]});
            }
            var obj = {type: type, cssClass: letterClasses[sportFirstLetter]};
            obj[type] = item;
            ret.push(obj);
        });
        return ret;
    };

    /**
     * @ngdoc method
     * @name groupNewsToGroups
     * @methodOf vbet5.service:Utils
     * @description returns an array of objects. every object has the id and array of news.
     * @param {Array} news the array
     * @param {int} newsPerGroup the int
     *
     * @return {Array} groups the array
     */
    Utils.groupNewsToGroups = function groupNewsToGroups(news, newsPerGroup) {
        var i, g, groups = [];
        for (i = 0, g = 0; i < news.length; i++) {
            if (groups[g] === undefined) {
                groups[g] = {news: [], id: g};
            }
            groups[g].news.push(news[i]);
            if (groups[g].news.length === newsPerGroup) {
                g++;
            }
        }
        return groups;
    };


    /**
     * @ngdoc method
     * @name makeSelectedVisible
     * @methodOf vbet5.service:Utils
     * @description  Resorts **arr** array(which is sports or regions list) in a way
     * that item specified by **selector** is made visible by moving it to tail of visible block from 'more'
     *
     * @param {Array} arr array of objects (sports or regions)
     * @param {Object} selector selector object. e.g. {id: 1} will select element having field id=1
     * @param {Number} visibleItemsCount count of visible items after which rest is hidden in 'more' block
     * @returns {Array} resorted array
     */
    Utils.makeSelectedVisible = function makeSelectedVisible(arr, selector, visibleItemsCount) {

        var i, removed, field, value, found = false;
        if (!arr || !arr.length) {
            return arr;
        }

        // get field and value from selector
        for (i in selector) {
            if (selector.hasOwnProperty(i)) {
                field = i;
                value = selector[field];
                break;
            }
        }

        // get index of selected item
        for (i = 0; i < arr.length; i++) {
            if (arr[i][field] === value) {
                found = true;
                break;
            }
        }

        if (i < visibleItemsCount || !found) { // selected item is already visible
            return arr;
        }
        removed = arr.splice(i, 1);                         // remove selected element from it's place
        arr.splice(visibleItemsCount - 1, 0, removed[0]);   // and put as last visible one

        return arr.slice(0); //need to return a copy, otherwise $watch will think that arr haven't changed
    };

    /**
     * @ngdoc method
     * @name clone
     * @methodOf vbet5.service:Utils
     * @description  returns object clone
     *
     * @param {Object} obj object to clone
     * @returns {Object} clone of object
     */
    Utils.clone = function clone(obj) {

        if (null === obj || "object" !== typeof obj) {
            return obj;
        }
        var copy = obj.constructor();
        var attr;
        for (attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = obj[attr];
            }
        }
        return copy;
    };


    /**
     * @ngdoc method
     * @name gamesArrayToObjectArray
     * @methodOf vbet5.service:Utils
     * @description  returns array with objects depended on games array
     * for example if you pass game array [12321,45687789,656211] output will be [[id:12321},[id:45687789},[id:656211}]
     * @param {Array} gamesArray games array
     * @returns {Array} array
     */
    Utils.gamesArrayToObjectArray = function (gamesArray) {
        if (!angular.isArray(gamesArray)) {
            return;
        }
        var output = [], i,
            length = gamesArray.length;
        for (i = 0; i < length; i++) {
            output.push({id: gamesArray[i]});
        }
        return output;

    };

    /**
     * @ngdoc method
     * @name arrayEquals
     * @methodOf vbet5.service:Utils
     * @description  returns true if array and array2 is equals
     * @param {Array} array 1st array
     * @param {Array} array2 2nd array
     * @returns {Boolean} equals
     */

    Utils.arrayEquals = function (array, array2) {
        // if the other array is a falsy value, return
        if (!array2) {
            return false;
        }
        var i, l;
        for (i = 0, l = array2.length; i < l; i++) {
            // Check if we have nested arrays
            if (array2[i] instanceof Array && array[i] instanceof Array) {
                // recurse into the nested arrays
                if (!Utils.arrayEquals(array2[i], array[i])) {
                    return false;
                }
            } else if (array2[i] !== array[i]) {
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;
            }
        }
        return true;
    };


    /**
     * @ngdoc method
     * @name removeElementFromArray
     * @methodOf vbet5.service:Utils
     * @description  removes element from given array
     * @param {Array} array array
     * @param {Number/String} el element
     */
    Utils.removeElementFromArray = function (array, el) {
        var index = array.indexOf(el);
        if (index > -1) {
            array.splice(index, 1);
        }
    };

    /**
     * @ngdoc method
     * @name isInArray
     * @methodOf vbet5.service:Utils
     * @description  checks if given element exist in given array, same jQuery.inArray
     * @param {Array} array An array through which to search.
     * @param {Number/String} elem The value to search for.
     * @return {Number}  element index (or -1 if not found).
     */
    Utils.isInArray = function (array, elem, i) {
        var len, arr = array;
        if (arr) {
            if (arr.indexOf(elem)) {
                return arr.indexOf.call(arr, elem, i);
            }

            len = arr.length;
            i = i ? i < 0 ? Math.max(0, len + i) : i : 0;

            for (; i < len; i++) {
                // Skip accessing in sparse arrays
                if (i in arr && arr[i] === elem) {
                    return i;
                }
            }
        }
        return -1;
    };

    /**
     * @ngdoc method
     * @name getArrayObjectElementHavingFieldValue
     * @methodOf vbet5.service:Utils
     * @description  returns array element object having field with specified value
     * @param {Array} array array of objects
     * @param {String} field the field name
     * @param {Object|String|Number} value field value
     * @return {Object|null}  object or null if not found
     */
    Utils.getArrayObjectElementHavingFieldValue = function getArrayObjectElementHavingFieldValue(array, field, value) {
        var i;
        for (i = 0; i < array.length; i++) {
            if (array[i][field] === value) {
                return array[i];
            }
        }
        return null;
    };

    /**
     * @ngdoc method
     * @name orderSortingFn
     * @methodOf vbet5.service:Utils
     * @description  compares 2 items based on their "order" field
     * @param {Object} a first item
     * @param {Object} b second item
     */
    Utils.orderSortingFn = function orderSortingFn (a, b) {
        return a.order - b.order;
    };
    /**
     * @ngdoc method
     * @name orderSortingFnReverse
     * @methodOf vbet5.service:Utils
     * @description  compares 2 items based on their "order" field
     * @param {Object} a first item
     * @param {Object} b second item
     */
    Utils.orderSortingFnReverse = function orderSortingFnReverse (a, b) {
        return b.order - a.order;
    };
    /**
     * @ngdoc method
     * @name orderSortingFnAlphabetic
     * @methodOf vbet5.service:Utils
     * @description  compares 2 items based on their "name" field
     * @param {Object} a first item
     * @param {Object} b second item
     */
    Utils.orderSortingFnAlphabetic = function orderSortingFnAlphabetic (a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    };
    /**
     * @ngdoc method
     * @name ucfirst
     * @methodOf vbet5.service:Utils
     * @description  Capitalises first letter of string
     * @param {String} str string
     * @returns {String} Capitalised string
     */
    Utils.ucfirst = function ucfirst(str) {
        str += '';
        var f = str.charAt(0)
            .toUpperCase();
        return f + str.substr(1);
    };


    /**
     * @ngdoc method
     * @name objectToArrayFromProperty
     * @methodOf vbet5.service:Utils
     * @description  Makes array from the object by the given property
     * @param {object} obj - the object from wich the array should be made
     * @returns {String} property - the property of the object
     */
    Utils.objectToArrayFromProperty = function objectToArrayFromProperty(obj, property) {
        if (!(obj instanceof  Object)) {
            return obj;
        }
        var key, arr = [];
        for (key in obj) {
            if (obj[key][property]) {
                arr.push(obj[key][property]);
            }
        }
        return arr;
    };

    return Utils;
}]);