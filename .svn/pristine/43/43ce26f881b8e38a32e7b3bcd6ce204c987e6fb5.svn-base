/* global VBET5 */

/**
 * @ngdoc controller
 * @name vbet5.controller:messagesCtrl
 * @description
 *  messages controller
 */
VBET5.controller('messagesCtrl', ['$scope', '$rootScope', '$sce', 'Utils', 'Zergling', 'Translator', 'Config',  function ($scope, $rootScope, $sce, Utils, Zergling, Translator, Config) {
    'use strict';
    var TYPE_INCOMING = 0, TYPE_OUTGOING = 1,
        SYSTEM_MESSAGES = {
            'BET_APPROVED_TITLE': Translator.get('APPROVED BET'),
            'BET_APPROVED_MESSAGE:': Translator.get('YOUR BET HAS BEEN APPROVED'),
            'BET_DECLINE_TITLE': Translator.get('DECLINED BET'),
            'BET_DECLINE_MESSAGE:': Translator.get('YOUR BET HAS BEEN DECLINED')
        };

    function replaceSystemMessages(text) {
        var replaced;
        angular.forEach(SYSTEM_MESSAGES, function (value, key) {
            if (text.indexOf(key) > -1) {
                replaced = text.replace(key, value);
            }
        });
        return (replaced) ? replaced : text;
    }

    $scope.messagesPage = 'inbox';
    $scope.newMessage = {subject: '', body: ''};

    /**
     * @ngdoc method
     * @name loadMessages
     * @methodOf vbet5.controller:messagesCtrl
     * @description loads incoming and outgoing messages and marks their bodies and subjects as safe for displaying html
     * @param {Boolean} inbox whether to load inbox messages
     * @param {Boolean} outbox whether to load outbox messages
     */
    $scope.loadMessages = function loadMessages(inbox, outbox) {
        inbox = inbox === undefined ? true : inbox;
        outbox = outbox === undefined ? true : outbox;

        if (inbox) {
            $scope.inboxLoading = true;
            Zergling.get({where: {type: TYPE_INCOMING}}, 'user_messages').then(function (response) {
                $scope.inboxMessages = response.messages;
                angular.forEach($scope.inboxMessages, function (message) {
                    message.body = replaceSystemMessages(message.body);
                    message.subject = replaceSystemMessages(message.subject);
                    message.body = $sce.trustAsHtml(message.body.substr(0, 6).toLowerCase() === '<html>' ? message.body : Utils.nl2br(message.body));
                    message.subject = $sce.trustAsHtml(message.subject);
                    message.isSystem = false;
                    message.isSystem = !message.hasOwnProperty('checked');

                });
                $scope.inboxLoading = false;
            });
        }

        if (outbox && !Config.main.disableInternalMessageSending) {
            $scope.outboxLoading = true;
            Zergling.get({where: {type: TYPE_OUTGOING}}, 'user_messages').then(function (response) {
                $scope.sentMessages = response.messages;
                angular.forEach($scope.sentMessages, function (message) {
                    message.body = $sce.trustAsHtml(Utils.nl2br(message.body));
                    message.subject = $sce.trustAsHtml(message.subject);
                });
                $scope.outboxLoading = false;
            });
        }

    };

    function updateUnreadCount() {
        if ($rootScope.profile.unread_count > 0) {
            $rootScope.profile.unread_count--;
        }
    }

    /**
     * @ngdoc method
     * @name openMessage
     * @methodOf vbet5.controller:messagesCtrl
     * @description opens message and marks as read
     */
    $scope.openMessage = function openMessage(message, messageType) {
        message.open = !message.open;
        if (messageType !== TYPE_INCOMING) {
            return;
        }
        if (message.checked == 0 || message.isSystem) {
            Zergling.get({'message_id': message.id}, 'read_user_message').then(function (resp) {
                if (!message.isSystem) {
                    message.checked = 1;
                    updateUnreadCount();
                }
            });
        }

    };

    /**
     * @ngdoc method
     * @name sendMessage
     * @methodOf vbet5.controller:messagesCtrl
     * @description sends message using $scope.newMessage form model and clears form on success
     */
    $scope.sendMessage = function sendMessage() {
        $scope.working = true;
        Zergling.get({
            subject: $scope.newMessage.subject,
            body: $scope.newMessage.body
        }, 'add_user_message').then(function (response) {
            console.log(response);
            $scope.popupInfo = Translator.get('Message sent');
            $scope.popupType = 'success';
            $scope.working = false;
            $scope.newMessage = {subject: '', body: ''};
            $scope.sendMessageForm.$setPristine();
            $scope.loadMessages(false, true); // to make sent message visible in sent messages
        });

        console.log($scope.newMessage);
    };
}]);
