/**
 * @ngdoc controller
 * @name vbet5.controller:registration
 * @description
 * registration controller
 */
angular.module('vbet5').controller('RegistrationController', ['$scope', '$rootScope', '$location', '$window', '$timeout', 'Tracking', 'Script', 'Config', 'Zergling', 'Storage', 'Translator', 'Geoip', 'UserAgent', 'Utils', 'content', 'analytics', 'CountryCodes', 'RegConfig',
    function ($scope, $rootScope,  $location, $window, $timeout, Tracking, Script, Config, Zergling, Storage, Translator, Geoip,  UserAgent, Utils, content, analytics, CountryCodes, RegConfig) {
        'use strict';

        var REG_FORM_BIRTH_YEAR_LOWEST = 1900;
        var minimumAllowedAge = Config.main.registration.minimumAllowedAge;

        $scope.RegConfig = RegConfig;

        /**
         * @ngdoc object
         * @name showFieldsValidation
         * @propertyOf vbet5.controller:loginCtrl
         * @description indicates whether to show validation messages or not (this is IE browser fix, as IE doesn't properly render $dirty state of input field)
         */
        $scope.showFieldsValidation = !UserAgent.IEVersion();

        $scope.monthNames = Config.main.monthNames;
        $scope.genders = [{val: 'M', name: 'Male'}, {val: 'F', name: 'Female'}];

        /**
         * RegistratioinData model for registration form
         * @type {{gender: *, username: string, email: string, address: string, city: string, currency_name: *, country_id: string, password: string, password2: string, promo_code: string, doc_number: string, years: {}, language: (Config.env.lang|*), secQuest: String, birth_day: string, birth_month: string, birth_year: string, phone_code: string, phone_number: string, agree: boolean}}
         */
        $scope.registrationData = {
            first_name: '',
            years: {},
            gender: $scope.genders[0].val,
            currency_name: Config.main.registration.defaultCurrency,
            language: Config.env.lang,
            birth_day: '01',
            birth_month: $scope.monthNames[0].val,
            phone_code: '1',
            agree: false
        };

        /**
         * @ngdoc method
         * @name calculateAge
         * @methodOf vbet5.controller:loginCtrl
         * @description Recalculate user age and set to userAge
         */
        $scope.calculateAge = function calculateAge() {
            var d1 = new Date($scope.registrationData.birth_year, $scope.registrationData.birth_month - 1, $scope.registrationData.birth_day);
            var d2 = new Date();
            var diff = d2.getTime() - d1.getTime();
            $scope.userAge = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        };

        /**
         * @description Automatically set currency if it enabled and defined in config
         * @param {String} newVal
         * @param {String} oldVal
         */
        function autoSetCurrency(newVal, oldVal) {
            if (oldVal === newVal) {
                return;
            }
            if (Config.main.registration.autoSetCurrency.availableList[newVal]) {
                $scope.registrationData.currency_name = Config.main.registration.autoSetCurrency.availableList[newVal];
                if (Config.main.registration.autoSetCurrency.disableChangeAfterSelect) {
                    $scope.currencyDisabled = true;
                }
            } else {
                $scope.currencyDisabled = false;
            }
        }

        /**
         * @ngdoc method
         * @name regFormInit
         * @methodOf vbet5.controller:RegistrationController
         * @description initializes registration form. Generates years range for select box
         */
        $scope.regFormInit = function regFormInit() {
            var i;
            for (i = REG_FORM_BIRTH_YEAR_LOWEST; i <= new Date().getFullYear() - minimumAllowedAge; i++) {
                $scope.registrationData.years[i] = i.toString();
            }
            $scope.registrationData.birth_year = $scope.registrationData.years[i - 1].toString();


            if (Storage.get('promo_code')) {
                $scope.registrationData.promo_code = Storage.get('promo_code');
                $scope.hasPromoCode = true;
            }

            $scope.calculateAge();

            angular.forEach($scope.RegConfig, function (item) {
                angular.forEach(item, function (regItem) {
                    if (regItem.defaultValue !== undefined) {
                        $scope.registrationData[regItem.name] = regItem.defaultValue;
                    }
                });
            });

            if (Config.main.registration.autoSetCurrency && Config.main.registration.autoSetCurrency.enabled) {
                $scope.$watch('registrationData.country_id', autoSetCurrency);
            }

        };

        /**
         * @description Automatically set phone_code when it changed
         * @param id
         */
        function setCountryCode(id) {
            $scope.registrationData.phone_code = CountryCodes[id];
        }

        $scope.$watch('registrationData.country_id', function (newVal, oldVal) {
            if (newVal === oldVal) {
                return;
            }
            setCountryCode(newVal);
        });

        /**
         * @ngdoc method
         * @name preFillRegionalData
         * @methodOf vbet5.controller:loginCtrl
         * @description
         * determines user location via {@link vbet5.service:Geoip Geoip} service
         * and sets country and city and country values (if not selected yet)
         */
        $scope.preFillRegionalData = function preFillRegionalData() {
            Geoip.getGeoData().then(function (data) {
                $scope.registrationData.country_id = $scope.registrationData.country_id || data.countryCode;
                if ($scope.RegConfig.preventChangingCountry && $scope.RegConfig.preventChangingCountry.length && $scope.RegConfig.preventChangingCountry.indexOf(data.countryCode) !== -1) {
                    $timeout(function() {
                        $scope.registerform.country_id.disabled = true;
                        console.log("disabling country selection for ", data.countryCode);
                    }, 1000);
                }
                $scope.checkIfCountryIsRestricted();

                if (!Config.main.registration.dontFillCityByIp) {
                    $scope.registrationData.city = $scope.registrationData.city || data.cityName;
                }

                setCountryCode($scope.registrationData.country_id);
            });
            $scope.virginRegistrationData = angular.copy($scope.registrationData);
        };

        /**
         * @ngdoc method
         * @name resetRegForm
         * @methodOf vbet5.controller:loginCtrl
         * @description
         * reset registration form to its initial state
         */
        $scope.resetRegForm = function resetRegForm() {
            if ($scope.virginRegistrationData !== undefined) {
                $scope.registrationData = angular.copy($scope.virginRegistrationData);
                $scope.registerform.$setPristine();
            }
        };

        /**
         * @ngdoc method
         * @name checkIfCountryIsRestricted
         * @methodOf vbet5.controller:loginCtrl
         * @description
         *  checks if selected country is in restricted list(in config)
         *  and  sets corresponding **countryIsRestricted** scope variable value
         */
        $scope.checkIfCountryIsRestricted = function checkIfCountryIsRestricted() {
            if (Config.main.registration.restrictedCountries[$scope.registrationData.country_id] !== undefined) {
                $scope.countryIsRestricted = true;
                $scope.altUrl4RestrictedCountry = Config.main.registration.restrictedCountries[$scope.registrationData.country_id];
            } else {
                $scope.countryIsRestricted = false;
            }

            if (!$scope.registerform.city.$dirty) {
                $scope.registrationData.city = $scope.virginRegistrationData.city;
                $scope.registerform.city.$setPristine();
            }
        };

        /**
         *
         */
        function setDefaultPromoCode() {
            var promoCode = $scope.registrationData.promo_code;
            if (!promoCode) {
                if (Config.main.registration.deaultPromocodePerDomain &&
                        Config.main.registration.deaultPromocodePerDomain[$window.location.hostname] !== undefined &&
                        Config.main.registration.deaultPromocodePerDomain[$window.location.hostname].code !== undefined
                        ) {
                    promoCode = Config.main.registration.deaultPromocodePerDomain[$window.location.hostname].code;
                } else if (Config.main.registration.defaultPromoCode && Config.main.registration.defaultPromoCode.length > 0) {
                    promoCode = Config.main.registration.defaultPromoCode;
                }
            }
            if (Config.main.registration.deaultPromocodePerDomain &&
                    Config.main.registration.deaultPromocodePerDomain[$window.location.hostname] &&
                    Config.main.registration.deaultPromocodePerDomain[$window.location.hostname].suffix) {
                promoCode = promoCode + Config.main.registration.deaultPromocodePerDomain[$window.location.hostname].suffix;
            }
            return promoCode;
        }

        /**
         * Returns registration object which will be send to swarm
         * @returns {Object} registrationInfo
         */
        function getRegistrationInfo() {
            var regInfo = {},
                customDataType = {
                    birth_day: function () {
                        regInfo.birth_date =  $scope.registrationData.birth_year + '-' + $scope.registrationData.birth_month + '-' + $scope.registrationData.birth_day;
                    },
                    birth_month: function () {
                        regInfo.birth_date =  $scope.registrationData.birth_year + '-' + $scope.registrationData.birth_month + '-' + $scope.registrationData.birth_day;
                    },
                    birth_year: function () {
                        regInfo.birth_date =  $scope.registrationData.birth_year + '-' + $scope.registrationData.birth_month + '-' + $scope.registrationData.birth_day;
                    },
                    phone_number: function () {
                        regInfo.phone = $scope.registrationData.phone_code + $scope.registrationData.phone_number;
                    },
                    promo_code: function () {
                        return setDefaultPromoCode();
                    },
                    country_id: function () {
                        regInfo.country_code = $scope.registrationData.country_id;
                    }
                };

            regInfo.site_id = Config.main.site_id;
            regInfo.language = Config.env.lang;

            angular.forEach($scope.RegConfig, function (item) {
                angular.forEach(item, function (regItem) {
                    var fieldName = regItem.name;
                    if (fieldName in customDataType) {
                        regInfo[fieldName] = customDataType[fieldName].call();
                    } else {
                        regInfo[fieldName] = $scope.registrationData[fieldName];

                    }
                });
            });

            return regInfo;
        }
        /**
         * @ngdoc method
         * @name register
         * @methodOf vbet5.controller:loginCtrl
         * @description registers the user
         */
        $scope.register = function register() {
            $scope.busy = true;

            if ($scope.registerform.$invalid || $scope.countryIsRestricted) {
                $scope.busy = false;
                return;
            }
            console.log('----> Reg Object', getRegistrationInfo());
            Zergling
                .get({user_info: getRegistrationInfo()}, 'register_user')
                .then(
                    function (data) {
                        console.log('registration response:', data);
                        if (data.result === 'OK') {
                            $scope.registrationComplete = true;
                            if (Config.main.registration.loadExternalScriptAfterRegistration) {
                                Script(Config.main.registration.loadExternalScriptAfterRegistration);
                            }
                            Storage.set('lastLoggedInUsername', $scope.registrationData.username);
                            if (Config.main.remindToRenewBalance.enabled) {  //not to open low balance warning right after registration
                                Storage.set('renewReminded', 0, Config.main.remindToRenewBalance.interval);
                            }
                            if (Config.main.registration.loginRightAfterRegistration) {
                                $scope.$emit('login.withUserPass', {
                                    user: $scope.registrationData.username,
                                    password: $scope.registrationData.password
                                });
                            }
                            if (Config.main.allowCustomHtml) {
                                content.getWidget('tracking').then(function (resp) {
                                    var html = '';
                                    resp.data.widgets.forEach(function (item) {
                                        html = html + item.widget;
                                    });
                                    $scope.scriptContent = html;
                                });
                            }
                            analytics.gaSend('send', 'event', 'slider', 'registration', {
                                'page': $location.path(),
                                'eventLabel': 'Success'
                            });
                            $scope.resetRegForm();
                        } else {
                            $scope.registerform.$dirty = true;
                            analytics.gaSend('send', 'event', 'slider', 'registration', {
                                'page': $location.path(),
                                'eventLabel': 'Failed (' + data.result + ')'
                            });
                            switch (data.result) {
                                case '-1013': // password is too short
                                    $scope.registerform.username.$dirty = $scope.registerform.password.$invalid = $scope.registerform.password.$error.tooShort = true;
                                    break;
                                case '-1012': // Incorrect phone number
                                    $scope.registerform.username.$dirty = $scope.registerform.phone_number.$invalid = $scope.registerform.phone_number.$error.invalid = true;
                                    break;
                                case '-1127': // Duplicate phone number
                                    $scope.registerform.username.$dirty = $scope.registerform.phone_number.$invalid = $scope.registerform.phone_number.$error.duplicate = true;
                                    break;
                                case '-1014': // Failed to send sms
                                    $scope.registerform.username.$dirty = $scope.registerform.phone_number.$invalid = $scope.registerform.phone_number.$error.failedsms = true;
                                    break;
                                case '-1118': // user exists
                                    $scope.registerform.username.$dirty = $scope.registerform.username.$invalid = $scope.registerform.username.$error.exists = true;
                                    break;
                                case '-1119': // email exists
                                    $scope.registerform.email.$dirty = $scope.registerform.email.$invalid = $scope.registerform.email.$error.exists = true;
                                    break;
                                case '-1010': // password same as login
                                    $scope.registerform.password.$dirty = $scope.registerform.password.$invalid = $scope.registerform.password.$error.sameAsLogin = true;
                                    break;
                                case '-1123': // dublicate docnum
                                    $scope.registerform.email.$dirty = $scope.registerform.doc_number.$invalid = $scope.registerform.doc_number.$error.exists = true;
                                    break;
                                default:
                                    $scope.registrationFailed = Translator.get('Unknown error');
                                    break;
                            };
                        }
                    },
                    function (response) {
                        console.log('registration failed:', response);
                        $scope.registrationFailed = response.data;
                    }
                )['finally'](function () {
                    $scope.busy = false;
                    Tracking.event($scope.registrationComplete ? 'registration_completed' : 'registration_failed', {}, true);
                });
        };

        /**
         * @ngdoc method
         * @name registrationDone
         * @methodOf vbet5.controller:loginCtrl
         * @description closes the "registration done" message and slider
         */
        $scope.closeRegistrationResult = function closeRegistrationResult() {
            if ($rootScope.env.authorized) {
                if (['deposit', 'withdraw', 'renew', 'cashier', 'casinoBalanceHistory', 'balanceHistory'].indexOf(Config.main.registration.sliderPageAfterRegistration) !== -1) {
                    $location.search({});
                    $rootScope.env.sliderContent = Config.main.registration.sliderPageAfterRegistration;
                    $rootScope.env.showSlider = true;
                } else {
                    $rootScope.env.sliderContent = Config.main.registration.sliderPageAfterRegistration;
                }
            } else {
                $location.path('/');
                $location.search({});
                $rootScope.env.sliderContent = '';
                $rootScope.env.showSlider = false;
            }
            $scope.registrationComplete = false;
            $scope.registrationFailed = false;
        };


        //$scope.closeRegistrationResult = function closeRegistrationResult() {
        //    if (!$rootScope.env.authorized) {
        //        $rootScope.env.sliderContent = 'signInForm';
        //    } else if (Config.main.registration.sliderPageAfterRegistration) {
        //        if (['deposit', 'withdraw', 'renew', 'cashier', 'casinohistory', 'history'].indexOf(Config.main.registration.sliderPageAfterRegistration) !== -1) {
        //            $location.path('/balance/' + Config.main.registration.sliderPageAfterRegistration);
        //           $rootScope.env.sliderContent = '';
        //            $rootScope.env.showSlider = false;
        //        } else {
        //            $rootScope.env.sliderContent = Config.main.registration.sliderPageAfterRegistration;
        //        }

        //    } else {
        //        $rootScope.env.sliderContent = '';
        //       $rootScope.env.showSlider = false;
        //    }
        //    $scope.registrationComplete = false;
        //    $scope.registrationFailed = false;
        //};

        /**
         * @ngdoc method
         * @name verifySmsCode
         * @methodOf vbet5.controller:loginCtrl
         * @description verify registration sms code
         */
        $scope.verifySmsCode = function verifySmsCode() {
            $scope.smsErrMsg = "";
            Zergling
                .get({
                    'username': $scope.user.username,
                    'code': $scope.user.smsCode
                }, 'verify_user_phone')
                .then(function (response) {
                    if (response.result === 0) {
                        $scope.login();
                    } else {
                        $scope.signinform.$setPristine();
                        if (Math.abs(response.result) === 1012) {
                            $scope.smsErrMsg = Translator.get('Wrong phone number');
                        } else {
                            $scope.smsErrMsg = Translator.get('Invalid verification code');
                        }
                    }
                })['catch'](function (response) {
                    console.log(response);
                    $scope.smsErrMsg = Translator.get('Invalid verification code');
                });
        };

        /**
         * @ngdoc method
         * @name resendSMS
         * @methodOf vbet5.controller:loginCtrl
         * @description resend verification sms
         */
        $scope.resendSMS = function resendSMS() {
            Utils.setJustForMoment($scope, 'allowSMSResend', false, 5000);
            Zergling
                .get({
                    'username': $scope.user.username
                }, 'reverify_user_phone')
                .then(function () {
                    $scope.smsErrMsg = Translator.get('Code has been sent, please check your mobile phone');
                })['catch'](function (response) {
                    console.log(response);
                });
        };

        /**
         * @ngdoc method
         * @name openTC
         * @methodOf vbet5.controller:loginCtrl
         * @description Open Terms and Conditions
         */
        $scope.openTC = function openTC() {
            if (Config.main.registration && Config.main.registration.termsLink) {
                if (Config.main.registration.termsLink === true) {
                    $rootScope.$broadcast('openHelpPage', {slug: 'general-terms-and-conditions'});
                } else {
                    $window.open(Config.main.registration.termsLink, Config.main.skin + 'help.popup', "scrollbars=1,width=1000,height=600,resizable=yes");
                }
            }
        };
    }]);
