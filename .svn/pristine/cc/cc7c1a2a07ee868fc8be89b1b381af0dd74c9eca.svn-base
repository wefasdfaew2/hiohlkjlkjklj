VBET5.controller('betMaisPaymentsCtrl', ['$scope', '$rootScope', '$window', 'Zergling', 'Utils', 'Translator', function ($scope, $rootScope, $window, Zergling, Utils, Translator) {
    'use strict';

    $scope.step = 1;
    /**
     * Not sure how this works, just copy/pasted from old version
     * @param inputText
     * @returns {*}
     */
    $scope.amountwrite = $window.amountwrite = function amountWrite(inputText) {
        inputText = inputText.replace(",", "");
        inputText = inputText.replace(".", "");
        var erk = inputText.length;
        var kp, poch1, poch2, poch3;
        if (erk > 2 && erk < 4) {
            poch1 = inputText.substr(-3, 1);
            poch2 = inputText.substr(-2, 2);

            inputText = poch1 + "," + poch2;
        } else if (erk > 3 && erk < 6) {
            kp = erk - 2;
            poch1 = inputText.substr(-7, kp);
            poch2 = inputText.substr(-2, 2);

            inputText = poch1 + "," + poch2;
        } else if (erk > 5 && erk < 8) {
            kp = erk - 5;
            poch1 = inputText.substr(-7, kp);
            poch2 = inputText.substr(-2, 2);
            poch3 = inputText.substr(-5, 3);

            inputText = poch1 + "." + poch3 + "," + poch2;
        } else if (erk > 7) {
            poch1 = inputText.substr(-7, 2);
            poch2 = inputText.substr(-2, 2);
            poch3 = inputText.substr(-5, 3);

            inputText = poch1 + "." + poch3 + "," + poch2;
        }
        return inputText;
    };

    $scope.paymentData = {
        PAYINBANK_CODE: "246	Banco ABC Brasil S.A.",
        PAYINBANK_AGENCY: "",
        PAYINBANK_AGENCY2: "",
        PAYINBANK_ACCOUNT: "",
        PAYINBANK_ACCOUNT2: "",
        PAYINBANK_TYPEACCOUNT: "CONTA CORRENTE",
        PAYINBANK_NAME: "",
        PAYINBANK_USERNAME: $rootScope.profile.username,
        PAYINBANK_DATA: $rootScope.profile.birth_date,
        PAYINBANK_EMAIL: $rootScope.profile.email,
        PAYINBANK_CPF1: "",
        PAYINBANK_CPF2: "",
        PAYINBANK_CPF3: "",
        PAYINBANK_CPF4: "",
        PAYINBANK_SUM: "",
        PAYINBANK_STEPNAME: "" // will be filled on step 2
    };

    /**
     * @ngdoc method
     * @name deposit
     * @methodOf vbet5.controller:betMaisPaymentsCtrl
     * @description  sends deposit request to swarm
     */
    $scope.deposit = function deposit(bankName) {
        $scope.paymentData.PAYINBANK_STEPNAME = bankName;
        $scope.resultError = null;
        $scope.resultMessage = null;
        $scope.busy = true;
        var forProduct = ($rootScope.currentProductPage !== 'sport') ? 'casino' : $rootScope.currentProductPage;
        var request = {
            amount: parseFloat($scope.paymentData.PAYINBANK_SUM.replace(".", "").replace(".", "")),
            service: "bankformbetmais",
            payer: {
                status_urls: {
                    success: "",
                    cancel: "",
                    fail: ""
                },
                forProduct: forProduct
            }
        };
        Utils.MergeRecursive(request.payer, $scope.paymentData);
        Zergling.get(request, 'deposit').then(
            function (data) {
                console.log('deposit request:', request, 'response:', data);
                if (data && data.result !== undefined && data.result === 0 && (!data.details || !data.details.error || data.details.error == 0)) {
                    $scope.step = 3;
                    console.log('success');
                    if (data.details) {
                        $scope.resultMessage = data.details.message;
                    }
                } else {
                    $scope.resultError = (data.details && data.details.error) || Translator.get("Unknown error");
                    $scope.step = 1;
                }
            },
            function (data) {
                console.warn('deposit error', data);
                $scope.resultError = Translator.get("Unknown error");
                $scope.step = 1;
            }
        );
    };

    /**
     * @ngdoc method
     * @name withdraw
     * @methodOf vbet5.controller:betMaisPaymentsCtrl
     * @description  sends withdraw request to swarm
     */
    $scope.withdraw = function withdraw() {
        $scope.resultError = null;
        var forProduct = ($rootScope.currentProductPage !== 'sport') ? 'casino' : $rootScope.currentProductPage;
        var request = {
            amount: parseFloat($scope.paymentData.PAYINBANK_SUM.replace(".", "").replace(",", ".")),
            service: "bankformbetmais",
            payee: {
                forProduct: forProduct
            }
        };
        Utils.MergeRecursive(request.payee, $scope.paymentData);
        Zergling.get(request, 'withdraw').then(
            function (data) {
                console.log('withdraw request', request, 'response', data);
                if (data && data.result !== undefined && data.result === 0) {
                    $scope.step = 2;
                    console.log('success');
                } else {
                    console.log(data);
                    $scope.resultError = (data.details && data.details.error) || Translator.get("Please try later or contact support.");
                    $scope.step = 1;
                }
            },
            function (data) {
                console.warn('withdraw error', data);
                $scope.resultError = Translator.get("Unknown error");
                $scope.step = 1;
            }
        );
    };

    console.clear();
    console.log($rootScope);
}]);

