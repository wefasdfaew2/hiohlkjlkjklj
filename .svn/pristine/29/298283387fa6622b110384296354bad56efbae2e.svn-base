/* global VBET5 */
/**
 * @ngdoc controller
 * @name vbet5.controller:settingsCtrl
 * @description
 *  settings controller
 */
VBET5.controller('settingsCtrl', ['$scope', '$rootScope', '$location', 'Zergling', 'Translator', 'AuthData', 'Config', function ($scope, $rootScope, $location, Zergling, Translator, AuthData, Config) {
    'use strict';

    $scope.settingsPage = $location.search().settingspage || Config.main.settingsDefaultPage; //deep linking
    $location.search('settingspage', undefined);


    $scope.changepasswordData = {
        oldpassword: '',
        password: '',
        password2: ''
    };


    $scope.preferences = {
        oddFormat: 'american',
        language: $rootScope.env.lang
    };


    /**
     * @ngdoc method
     * @name changePassword
     * @methodOf vbet5.controller:settingsCtrl
     * @description changes user password using data from corresponding form
     */
    $scope.changePassword = function changePassword() {
        $scope.changepasswordForm.oldpassword.$invalid = $scope.changepasswordForm.oldpassword.$error.incorrect = false;
        $scope.working = true;
        $scope.changepasswordForm.$setPristine();
        var request = {
            password: $scope.changepasswordData.oldpassword,
            new_password: $scope.changepasswordData.password
        };
        Zergling.get(request, 'update_user_password').then(function (response) {
            $scope.working = false;
            console.log(response);
            if (response.auth_token) {
                var authData = AuthData.get();
                authData.auth_token = response.auth_token;
                AuthData.set(authData);
                $scope.message = Translator.get('Password changed');
                $scope.messageType = 'success';
            } else {
                throw response;
            }
        })['catch'](function (response) {
            $scope.working = false;
            if (response.data.match("1006")) {
                $scope.changepasswordForm.oldpassword.$invalid = $scope.changepasswordForm.oldpassword.$error.incorrect = true;
                return;
            }
            $scope.message = Translator.get('Error occured') + ' : ' + response.msg;
            $scope.messageType = 'error';
        });

    };

    /**
     * @ngdoc method
     * @name changeDetails
     * @methodOf vbet5.controller:settingsCtrl
     * @description changes user details using data from corresponding form
     */
    $scope.changeDetails = function changeDetails() {
        $scope.working = true;
        var request = {
            user_info: {
                'password': $scope.details.password,
                'email': Config.main.personalDetails.editableFields.indexOf('email') !== -1 ? $scope.details.email : undefined,
                'city': Config.main.personalDetails.editableFields.indexOf('city') !== -1 ? $scope.details.city : undefined,
                'address': Config.main.personalDetails.editableFields.indexOf('address') !== -1 ? $scope.details.address : undefined,
                'country_code': Config.main.personalDetails.editableFields.indexOf('country_code') !== -1 ? $scope.details.country_code : undefined,
                'phone': Config.main.personalDetails.editableFields.indexOf('phone_number') !== -1 ? $scope.details.phone : undefined
//            'first_name': $scope.detailsForm.first_name.value,
//            'middle_name': '',
//            'last_name': $scope.detailsForm.last_name.value,
//            'doc_number': $scope.detailsForm.doc_number.value
            }
        };
        Zergling.get(request, 'update_user').then(function (response) {
            $scope.working = false;
            if (response.result === 0) {
                $scope.message = Translator.get('Personal information updated.');
                $scope.messageType = 'success';
            } else if (response.result === '-1002') {
                $scope.message = Translator.get('Invalid password.');
                $scope.messageType = 'error';
            } else if (response.result === '-1119') {
                $scope.detailsForm.email.$invalid = $scope.detailsForm.email.$error.dublicate = true;
            }
            console.log(response);
        })['catch'](function (response) {
            $scope.working = false;
            $scope.message = Translator.get('Error occured') + ' : ' + response.data;
            $scope.messageType = 'error';
            console.log(response);
        });

    };

    /**
     * @ngdoc method
     * @name savePreferences
     * @methodOf vbet5.controller:settingsCtrl
     * @description changes user preferences using data from corresponding form
     */
    $scope.savePreferences = function savePreferences() {
        $scope.working = true;

    };

    /**
     * @ngdoc method
     * @name loadUserInfo
     * @methodOf vbet5.controller:settingsCtrl
     * @description loads user information from swarm
     */
    $scope.loadUserInfo = function loadUserInfo() {
        $scope.loadingInfo = true;
        Zergling.get({}, 'get_user').then(function (data) {
            $scope.details = data;
            $scope.details.gender = Translator.get({'M': 'Male', 'F': 'Female'}[data.sex]);
            $scope.loadingInfo = false;
            console.log(data);
        });
    };


    $scope.depositLimitsData = {
        amount: '',
        day: '',
        week: '',
        month: ''
    };

    $scope.selfExclusionData = {period: ''};


    /**
     * @ngdoc method
     * @name getLimits
     * @methodOf vbet5.controller:settingsCtrl
     * @description loads deposit limits into $scope.depositLimitsData
     */
    $scope.getLimits = function getLimits() {
        Zergling.get({type : 'deposit'}, 'user_limits').then(function (response) {
            $scope.working = false;
            if (response.result === 0) {
                console.log(response.details);
                $scope.depositLimitsData = response.details;
            }

        })['catch'](function (response) {
            $scope.working = false;
            $scope.message = Translator.get('Error occured') + ' : ' + response.data;
            $scope.messageType = 'error';
            console.log(response);
        });
    };


    /**
     * @ngdoc method
     * @name setDepositLimits
     * @methodOf vbet5.controller:settingsCtrl
     * @description sets deposit limits
     */
    $scope.setDepositLimits = function setDepositLimits() {
        $scope.working = true;
        var request = {
            type: 'deposit',
            limits: {
                single: $scope.depositLimitsData.max_single_deposit,
                daily: $scope.depositLimitsData.max_day_deposit,
                weekly: $scope.depositLimitsData.max_week_deposit,
                monthly: $scope.depositLimitsData.max_month_deposit
            }
        };
        Zergling.get(request, 'set_user_limits').then(function (response) {
            $scope.working = false;
            if (response.result === 0 || response.result === 'OK') {
                $scope.message = Translator.get('Deposit limits set.');
                $scope.messageType = 'success';
            } else {
                $scope.message = Translator.get('Please try later or contact support.');
                $scope.messageType = 'error';
            }
            console.log(response);
        })['catch'](function (response) {
            $scope.working = false;
            $scope.message = Translator.get('Error occured') + ' : ' + response.data;
            $scope.messageType = 'error';
            console.log(response);
        });
        console.log(request);
    };

    /**
     * @ngdoc method
     * @name setSelfExclusion
     * @methodOf vbet5.controller:settingsCtrl
     * @description sets self-exclusion periods
     */
    $scope.setSelfExclusion = function setSelfExclusion() {
        $scope.working = true;
        var limits = {
            '1-year' : {years: "1"},
            '6-month' : {months: "6"}
        };
        var request = {
            type: 'self-exclusion',
            limits: limits[$scope.selfExclusionData.period]
        };
        Zergling.get(request, 'set_user_limits').then(function (response) {
            $scope.working = false;
            if (response.result === 0 || response.result === 'OK') {
                $scope.message = Translator.get('Self-Exclusion period set.');
                $scope.messageType = 'success';
            } else {
                $scope.message = Translator.get('Error occured');
                $scope.messageType = 'error';
            }
            console.log(response);
        })['catch'](function (response) {
            $scope.working = false;
            $scope.message = Translator.get('Error occured') + ' : ' + response.data;
            $scope.messageType = 'error';
            console.log(response);
        });
        console.log(request);
    };

}]);
