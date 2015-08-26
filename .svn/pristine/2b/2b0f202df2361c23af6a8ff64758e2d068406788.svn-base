/**
 * @ngdoc controller
 * @name vbet5.controller:loginCtrl
 * @description
 * login controller
 */
angular.module('vbet5').controller('loginCtrl', ['$scope', '$rootScope', '$timeout', '$filter', '$q', '$location', '$window', 'Script', 'Config', 'Zergling', 'Storage', 'Translator', 'Geoip', 'partner', 'UserAgent', 'Utils', 'content', 'analytics', 'RegConfig', function ($scope, $rootScope, $timeout, $filter, $q, $location, $window, Script, Config, Zergling, Storage, Translator, Geoip, partner, UserAgent, Utils, content, analytics, RegConfig) {
    'use strict';

    var ERROR_SERVICE_UNAVAILABLE = 3;

    /**
     * @ngdoc object
     * @name user
     * @propertyOf vbet5.controller:loginCtrl
     * @property {string} username user name
     * @property {string} password user password
     * @description user object
     */
    $scope.user = {username: $location.search().username || Storage.get('lastLoggedInUsername')};

    /**
     * @ngdoc object
     * @name busy
     * @propertyOf vbet5.controller:loginCtrl
     * @description indicates if login is still in process
     */
    $scope.busy = false;

    /**
     * @ngdoc object
     * @name userAge
     * @propertyOf vbet5.controller:loginCtrl
     * @description calculated user age
     */
    $scope.userAge = 0;

    $scope.countryIsRestricted = false;
    $scope.needVerification = false;
    $scope.allowSMSResend = true;

    /*
    var rr;
    $scope.regConfigConst = {};
    for (rr = 0;rr < RegConfig.leftCol.length;rr++) {
        $scope.regConfigConst[RegConfig.leftCol[rr].name] = RegConfig.leftCol[rr];
    }
    */

    // make sure to call this part only once
    if (!$rootScope.loginActionInitialized) {

        $rootScope.loginActionInitialized = true;

        // mail confirmation and mail password reset
        if ($location.search().action && $location.search().code) {



            if ($location.search().action === 'reset_password') {
                Config.env.showSlider = true;
                Config.env.sliderContent = 'sendNewPasswordForm';
            }

            if ($location.search().action === 'verify') {
                Zergling.get({
                    'verification_code': $location.search().code
                }, 'verify_user').then(function (response) {
                    if (response.result === 0) {
                        $rootScope.globalPopup = Translator.get('Your E-mail Has been confirmed');
                    }
                });
            }

        }
    }
    /**
     * Broadcasts 'profile' message with profile data on rootScope
     *
     * @param {Object} data profile data
     */
    var updateProfile = function updateProfile(data) {
        $rootScope.$broadcast('profile', data);
    };


    /**
     * @ngdoc method
     * @name keepAlive
     * @methodOf vbet5.controller:loginCtrl
     * @description keeps user session and data alive while browser window is open and user is logged in.
     * We don't have to do this when user is not logged in because data like betslip and favorite games will not expire
     */
    function keepAlive() {
        if ($rootScope.env.authorized) {
            angular.forEach(['auth_data', 'myGames'], function (key) {
                var val = Storage.get(key);
                if (val) {
                    Storage.set(key, val, Config.main.authSessionLifetime);
                }
            });
            $rootScope.blockingPopup = undefined;
            $timeout(keepAlive, parseInt(Config.main.authSessionLifetime / 2, 10)); //this has to run more often than session lifetime
        }
    }


    /**
     * @ngdoc method
     * @name refreshBalance
     * @methodOf vbet5.controller:loginCtrl
     * @description
     * sends command to refresh balance if corresponding Config.main.balanceRefreshPeriod is set
     * should get response of same format as 'profile' command
     */
    function refreshBalance() {
        if (!Config.partner.balanceRefreshPeriod) {
            return;
        }
        Zergling.get({}, 'get_balance').then(function (response) {
            console.log(response, $filter('firstElement')(response.data.profile));
            updateProfile(response.data);
            partner.call('balance', $filter('firstElement')(response.data && response.data.profile));
        })['finally'](function () {
            $timeout(refreshBalance, Config.partner.balanceRefreshPeriod);
        })['catch'](function (response) {
            partner.call('balance', response);
        });
    }

    $scope.$on('loggedIn', keepAlive); // receiving this when restoring login
    $scope.$on('loggedIn', refreshBalance); // receiving this when restoring login

    $scope.$on('login.loggedOut', function () {
        $scope.user = {};
        Storage.remove('lastLoggedInUsername');
        $scope.registrationComplete = false;
    });

    /**
     * @ngdoc method
     * @name loginWithUsernamePassword
     * @methodOf vbet5.controller:loginCtrl
     * @description logs user in, subscribes to profile
     *
     * @param {String} user username
     * @param {String} password password
     * @returns {Promise} promise that will be resolved with swarm response data object
     */
    function loginWithUsernamePassword(user, password) {
        console.log('loginWithUsernamePassword', user, password);
        var login = $q.defer();
        var promise = login.promise;
        var loginObj = {username: user, password: password};
        $rootScope.loginInProgress = true;
        Zergling
            .login(loginObj)
            .then(
                function (data) {
                    console.log('login ok', data);
                    $rootScope.loginInProgress = false;
                    analytics.gaSend('send', 'event', 'slider', 'login',  {'page': $location.path(), 'eventLabel': 'Success'});
                    $scope.env.authorized = true;
                    Storage.set('lastLoggedInUsername', loginObj.username);
                    if (!Config.partner.profileNotAvailable) { // for some skins profile is not available in swarm
                        Zergling
                            .subscribe({'source': 'user', 'what': {'profile': []}, 'subscribe': true}, updateProfile)
                            .then(function (result) {
                                $rootScope.profileSubId = result.subid;
                                $rootScope.$broadcast('login.loggedIn');
                                updateProfile(result.data);
                                keepAlive();

                            });
                    }
                    login.resolve(data);
                },
                function (data) {
                    console.log('login failed', data);
                    $rootScope.loginInProgress = false;
                    analytics.gaSend('send', 'event', 'slider', 'login',  {'page': $location.path(), 'eventLabel': 'Failed (' + data.data.status + ')'});
                    login.reject(data);
                }
            );
        return promise;
    }

    $scope.$on('login.withUsernamePassword', function (event, data) {
        console.log('got event login.withUsernamePassword', event, data);
        loginWithUsernamePassword(data.user, data.password);
    });

    /**
     * @ngdoc method
     * @name login
     * @methodOf vbet5.controller:loginCtrl
     * @description handles the sing-in form, logs user in  and hides the login form
     */
    $scope.login = function login() {
        $scope.busy = true;
        $scope.needVerification = false;
        console.log($scope.signinform);
        if ($scope.signinform.$valid) {
            loginWithUsernamePassword($scope.user.username, $scope.user.password)
                .then(
                    function () {

                        $scope.user.password = '';
                        $timeout(function () {
                            if ($scope.env.sliderContent === 'signInForm') {
                                $scope.env.showSlider = false;
                                $scope.env.sliderContent = '';
                            }
                        }, 500);
                    },
                    function (data) {

                        $scope.busy = false;
                        $scope.signInError = Translator.get(data.msg || data.data || data.code || true);
                        if (data.code !== ERROR_SERVICE_UNAVAILABLE) {
                            $scope.signinform.$setPristine();
                        } else {
                            $scope.popupInfo = $scope.signInError;
                            $scope.messageType = 'error';
                        }

                        // Verify SMS
                        if (data.data === "login error (1008)" || data.data.status === "1008") {
                            $scope.needVerification = true;
                        }

                        // Verify E-mail
                        if (data.data === "login error (1023)" || data.data.status === "1023") {
                            $scope.needVerification = true;
                        }

                        // Account locked
                        if (data.data === "login error (1022)" || data.data.status === "1022") {
                            $rootScope.globalPopup = Translator.get('You account has been locked. Please try again later !');
                        }
                    }
                )['finally'](
                    function () {
                        $scope.busy = false;
                        $scope.env.showSignInForm = false;
                    }
                );

        } else {
            $scope.busy = false;
        }
    };

    /**
     * @ngdoc method
     * @name loginWithFbUserId
     * @methodOf vbet5.controller:loginCtrl
     * @description logs in with facebook user id
     */
    function loginWithFbUserId(event, fbAuthData) {
        console.log('got facebook.loggedIn', event, fbAuthData);
        $rootScope.loginRestored.then(function () {
            console.log('already logged in with access token, will not attempt facebook login');
        }, function () {
            console.log('trying to login with facebook');
            $rootScope.loginInProgress = true;
            Zergling
                .login({access_token: fbAuthData.accessToken, facebook: true}, true)
                .then(
                    function (data) {
                        console.log('facebook login ok', data);
                        $rootScope.loginInProgress = false;
                        Config.env.authorized = true;
                        Storage.set('loginFlow', 'FACEBOOK');
                        $timeout(function () {
                            if ($scope.env.sliderContent === 'signInForm' || $rootScope.env.sliderContent === 'registrationForm' || $rootScope.env.sliderContent === 'forgotPasswordForm') {
                                $scope.env.showSlider = false;
                                $scope.env.sliderContent = '';
                            }
                        }, 200);
                        Zergling
                            .subscribe({'source': 'user', 'what': {'profile': []}, 'subscribe': true}, updateProfile)
                            .then(function (result) {
                                $rootScope.profileSubId = result.subid;
                                $rootScope.$broadcast('login.loggedIn');
                                updateProfile(result.data);
                                keepAlive();
                            });
                        Storage.set('lastLoggedInUsername', $scope.user.username);
                    },
                    function (data) {
                        console.log('cannot login with facebook user id', data);
                        $rootScope.loginInProgress = false;
                        $rootScope.$broadcast('facebook.loginWIthIdFailed');
                    }
                );
        });


    }

    $scope.$on('facebook.loggedIn', loginWithFbUserId);



    $scope.resetPasswordData = {
        email: '',
        username: '',
        password: '',
        password1: '',
        password2: '',
        error: {}
    };

    /**
     * @ngdoc method
     * @name resetPassword
     * @methodOf vbet5.controller:loginCtrl
     * @description sends password reset command to swarm
     */
    $scope.resetPassword = function resetPassword() {

        // override call by config
        if (Config.main.passwordNewResetMode) {
            $scope.forgotPassword();
            return;
        }

        console.log($scope.resetPasswordData);
        Zergling
            .get({email: $scope.resetPasswordData.email, username: $scope.resetPasswordData.username}, 'reset_user_password')
            .then(
                function (successResponse) {
                    if (successResponse.result === 0) {
                        $scope.passwordResetComplete = true;
                        $scope.message = Translator.get('Username or email invalid');
                    } else {

                        // Verify E-mail
                        if (successResponse.result === -1117 || successResponse.result === "-1117") {
                            $scope.usernameOrEmailInvalid = true;
                        }
                    }
                },
                function (failResponse) {

                    $scope.passwordResetFailed = true;
                }
            );
    };

    /**
     * @ngdoc method
     * @name forgotPassword
     * @methodOf vbet5.controller:loginCtrl
     * @description sends forgot password command to swarm
     */
    $scope.forgotPassword = function forgotPassword() {

        if ($scope.sendingForgotPassword) {
            return;
        }

        $scope.sendingForgotPassword = true;

        console.log($scope.resetPasswordData);
        Zergling
            .get({email: $scope.resetPasswordData.email}, 'forgot_password')
            .then(
                function (successResponse) {
                    if (successResponse.result === 0) {
                        $scope.passwordResetComplete = true;
                        //$scope.message = Translator.get('Invalid email');
                    } else {
                        $scope.passwordResetFailed = true;
                    }
                    $scope.sendingForgotPassword = false;
                },
                function (failResponse) {
                    $scope.passwordResetFailed = true;
                    $scope.sendingForgotPassword = false;
                }
            );
    };

    /**
     * @ngdoc method
     * @name sendNewPassword
     * @methodOf vbet5.controller:loginCtrl
     * @description sends the new password command to swarm
     */
    $scope.sendNewPassword = function sendNewPassword() {

        $scope.resetPasswordData.error = {};

        if ($scope.resetPasswordData.password1.length < 8) {
            $scope.resetPasswordData.error.password1 = true;
            return;
        }

        var passwordValidation = new RegExp(Config.main.passwordValidationPattern);

        if (!passwordValidation.test($scope.resetPasswordData.password1)) {
            $scope.resetPasswordData.error.password1 = true;
            return;
        }

        if ($scope.resetPasswordData.password1 !== $scope.resetPasswordData.password2) {
            $scope.resetPasswordData.error.password2 = true;
            return;
        }

        if ($scope.sendingNewPassword) {
            return;
        }

        $scope.sendingNewPassword = true;

        console.log($scope.resetPasswordData);
        Zergling
            .get({new_password: $scope.resetPasswordData.password1, reset_code: $location.search().code}, 'reset_password')
            .then(
                function (successResponse) {
                    if (successResponse.result === 0) {
                        $scope.passwordResetComplete = true;
                        //$scope.message = Translator.get('Invalid email');
                    } else {
                        $scope.passwordResetFailed = true;
                    }
                    $scope.sendingNewPassword = false;
                },
                function (failResponse) {
                    $scope.passwordResetFailed = true;
                    $scope.sendingNewPassword = false;
                }
            );
    };

    /**
     * @ngdoc method
     * @name closePasswordResetResult
     * @methodOf vbet5.controller:loginCtrl
     * @description closes the "passsword reset done" message and slider
     */
    $scope.closePasswordResetResult = function closePasswordResetResult() {
        $rootScope.env.sliderContent = '';
        $rootScope.env.showSlider = false;
        $scope.passwordResetComplete = false;
        $scope.passwordResetFailed = false;
        $scope.usernameOrEmailInvalid = false;
    };

}]);

