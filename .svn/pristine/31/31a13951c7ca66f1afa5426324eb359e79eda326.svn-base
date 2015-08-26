/* global VBET5 */
/**
 * @ngdoc controller
 * @name vbet5.controller:globalDialogCtrl
 * @description
 * Custom dialog controller
 */
VBET5.controller('globalDialogCtrl', ['$rootScope', '$scope', '$location', '$window', '$timeout', '$sce', 'Config', 'Storage', 'Utils', 'content',  function ($rootScope, $scope, $location, $window, $timeout, $sce, Config, Storage, Utils, content) {
    'use strict';

    /**
     * @ngdoc method
     * @name dialog
     * @methodOf vbet5.controller:globalDialogCtrl
     * @description returns active dialog
     */
    $scope.dialog = function dialog(param) {
        if (param) {
            return $rootScope.globalDialog[param];
        }
        return $rootScope.globalDialog;
    };

    /**
     * @ngdoc method
     * @name buttonClick
     * @methodOf vbet5.controller:globalDialogCtrl
     * @description Button clicked
     */
    $scope.buttonClick = function buttonClick() {
        if ($rootScope.globalDialog) {
            if ($rootScope.globalDialog.buttonBroadcast) {
                $rootScope.$broadcast($rootScope.globalDialog.buttonBroadcast);
            }
        }
        $scope.closeDialog();
    };

    /**
     * @ngdoc method
     * @name closeDialog
     * @methodOf vbet5.controller:globalDialogCtrl
     * @description Close the dialog
     */
    $scope.closeDialog = function closeDialog() {
        $rootScope.globalDialog = null;
    };

    /**
     * @ngdoc method
     * @name refresh
     * @methodOf vbet5.controller:globalDialogCtrl
     * @description Refresh main window
     */
    $scope.refresh = function refresh() {
        $window.location.reload();
    };

    /**
     * @ngdoc method
     * @name answer
     * @methodOf vbet5.controller:globalDialogCtrl
     * @description closes yes/no dialog and broadcasts user's answer
     * @param {String} usersAnswer user's answer
     */
    $scope.answer = function answer(usersAnswer) {
        console.log('answer', usersAnswer);
        $rootScope.$broadcast('dialog.' + usersAnswer);
        $scope.closeDialog();
    };
}]);