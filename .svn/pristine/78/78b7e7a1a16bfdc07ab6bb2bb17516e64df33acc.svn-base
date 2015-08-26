/**
 * @ngdoc controller
 * @name CMS.controller:pagePrint
 * @description Page Print
 */
angular.module('CMS').controller('pagePrint', ['$scope', '$location', 'content', '$sce', function ($scope, $location, content, $sce) {
    'use strict';

    /**
     * @ngdoc method
     * @name loadPage
     * @methodOf CMS.controller:pagePrint
     * @description load and print page(s) from CMS
     *
     * @param {String} slug page slug
     * @param {Boolean} withChildren whether to load page children or not
     */
    $scope.loadPage = function loadPage(slug, withChildren) {
        content.getPage(slug, withChildren).then(function (data) {
            console.log('loadPage', data);
            $scope.pages = data.data.page ? data.data.page.children : [];
            var i, length = $scope.pages.length;
            for (i = 0; i < length; i++) {
                $scope.pages[i].title = $sce.trustAsHtml($scope.pages[i].title);
                $scope.pages[i].content = $sce.trustAsHtml($scope.pages[i].content);
            }
            console.log('loaded pages:', $scope.pages);
            $scope.selectedPage = $scope.getPageBySlug($scope.pages, $location.search().pageSlug);
            $scope.selectedPage.content = $sce.trustAsHtml($scope.selectedPage.content);
            $scope.$apply();
            print();
        });
    };


    /**
     * @ngdoc method
     * @name getPageBySlug
     * @methodOf CMS.controller:pagePrint
     * @description selects page from given page array by slug
     * @param {Array} pages pages array
     * @param {String} slug page slug
     * @returns {Object} page having specified slug
     */

    $scope.getPageBySlug = function getPageBySlug(pages, slug) {
        if (!pages || !slug) {
            return;
        }
        for (var i = 0; i < pages.length; i++) {
            for (var j = 0; j < pages[i].children.length; j++) {
                if (pages[i].children[j].slug === slug) {
                    return pages[i].children[j];
                }
            }
        }
    };


    $scope.loadPage($location.search().rootPageSlug, true);

}]);