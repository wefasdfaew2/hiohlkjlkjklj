/**
 * @ngdoc controller
 * @name vbet5.controller:FeedbackController
 * @description
 *  FeedbackController to send users feedback's to our backend
 */
angular.module('vbet5').controller('FeedbackController', ['$scope', 'Zergling', function ($scope, Zergling) {
    'use strict';



    $scope.toggleView = function () {
        $scope.showFeedBackPopup = !$scope.showFeedBackPopup;
        $scope.hideForm = false;
        $scope.messageBody = '';
    };

    $scope.$on('feedback.toggle', $scope.toggleView);

    $scope.sendMessage = function () {
        Zergling.get({body: $scope.messageBody, email: $scope.email}, 'user_feedback').then(function (response) {
            if (response.result) {
                $scope.hideForm = true;
            } else {
                console.warn('ERROR WHILE sending message', response);
            }
        });
    };
}]);
