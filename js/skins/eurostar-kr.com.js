/*
*   All config values specified here will be merged with main config and will override its values
*
*/
/* global VBET5 */
VBET5.constant('SkinConfig', {
    'main': {
        siteTitle: {
            "eng": "eurostar-kr.com"
        },
        site_name: "eurostar-kr.com",
        site_id: "148",
        skin: 'eurostar-kr.com',
        casinoEnabled: false,
        pokerEnabled: false,
        liveDealerEnabled: false,
        financialsEnabled: false,
		liveCalendarEnabled: true,
		showAllAvailablePaymentSystems:true,
		calendarPrematchSelection: true,
		showTodayBets:1,
        skillgamesEnabled: false,
        redirectOnTablets: 'http://tablet.eurostar-kr.com/',
		enableSportsbookLayoutSwitcher: false,
		alternativeClassicGamesLayout:true,
		sportsClassicLayout: true, //is modern by default
        videoEnabled: false,
		statsHostname: 'http://statistics.betconstruct.com/#/en/external/page/h2h',  // hostname for statistics. when clicking on game statistics icon, popup on this hostname is open,
        headerStatisticsLink: "http://statistics.betconstruct.com/vbet#/en/statistics/competition/566/5358/entity/454",
		enableH2HStat: true,
		headerMessageIcon: {
            enabled: true,
            alwaysShow: true
        },
        about_company_text: {
            'eng' : "(c) eurostar-kr.com"
        },
        availableLanguages: {
            '@replace': true, // this means that object won't be merged with 'parent object', but will replace it
            'eng' : { 'short': 'EN', 'full': "English"},
			'tur' : { 'short': 'TR', 'full': "Türkçe"},
            'pol' : { 'short': 'PL', 'full': "Polski"},
            'ger' : { 'short': 'DE', 'full': "Deutsch"},
            'ita' : { 'short': 'IT', 'full': "Italiano"},
			'geo' : { 'short': 'KA', 'full': "ქართული"},
            'por' : { 'short': 'PT', 'full': "Português"},
            'spa' : { 'short': 'ES', 'full': "Español"},
            'rus' : { 'short': 'RU', 'full': "Русский"},
			'gre' : { 'short': 'GR', 'full': "Ελληνική"},
			'fre' : { 'short': 'FR', 'full': "Français"},
			'cze' : { 'short': 'CZ', 'full': "Český"},
			'chi' : { 'short': 'CH', 'full': "简体中文"},
			'kor' : { 'short': 'KO', 'full': "한국의"}
        },
        registration: {
            defaultCurrency: 'KRW',
            restrictedCountries: {}
        },
          liveChat: null,
		loadPopularGamesForSportsBook: {
            enabled: true,
            level: 'competition',  // game or competition
            type: 'promoted' // promoted or favorite
            //testSiteId: 23 // for debug purpose set to false by default
        },
        availableCurrencies: ['KRW'],
        balanceFractionSize: 0, //number of decimal places to round the balance value to(when displaying)
        enableNews: true, // enable news on sport page
        enableBannerUnderBetslip: false, // enable banner under the betslip,
        disableFooterNav: false, // disable wordpress content in footer,
        disableHomepageNews: false,
        copyrightSince: 2014
    },
	regConfig: {
		"leftCol": [{
        "title": "Last",
        "name": "last_name",
        "placeholder": "Last",
        "type": "text",
        "required": true,
        "classes": "form-text first-n",
        "customAttrs": [{"required": "required"}, {"ng-pattern": "/^[^0-9\\[\\]\\\\`~!@#$%^&*()_+={};:<>|./?,\"'-\\s]+$/"}, {"capitaliseinput": ""}],
        "validation": [{"name": "required", "message": "This field is required"}, {"name": "pattern", "message": "Please enter a valid  last name: only letters - no space, no digits and/or symbols"}]
    },
	{
        "title": "Name",
        "name": "first_name",
        "type": "text",
        "required": true,
        "placeholder": "First",
        "classes": "form-text first-n",
        "customAttrs": [{"required": "required"}, {"ng-pattern": "/^[^0-9\\[\\]\\\\`~!@#$%^&*()_+={};:<>|./?,\"'-\\s]+$/"}, {"capitaliseinput": ""}],
        "validation": [{"name": "required", "message": "This field is required"}, {"name": "pattern", "message": "Please enter a valid  name: only letters - no space, no digits and/or symbols"}]
    },
	 {
        "title": "Username",
        "name": "username",
        "placeholder": "Enter here",
        "type": "text",
        "required": true,
        "classes": "form-text",
        "customAttrs": [{"required": "required"}, {"ng-pattern": "/^[^\\s]+$/"}],
        "validation": [{"name": "required", "message": "This field is required"}, {
            "name": "exists",
            "message": "Sorry, this username has been used already"
        }, {
            "name": "pattern",
            "message": "Please, enter valid Username: only letters, digits and symbols- no space is allowed"
        }]
    },
	{
        "title": "Password",
        "name": "password",
        "placeholder": "Password should contain at least 8 characters",
        "type": "password",
        "required": true,
        "classes": "form-text",
        "customAttrs": [{"ng-minlength": "8"}, {"type": "password"}, {"required": "required"}, {"ng-pattern": "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d\\[\\]\\\\`~!@#$%^&*()_+={};:<>|./?,\"'-]+$/"}],
        "validation": [{"name": "required", "message": "This field is required"}, {
            "name": "minlength",
            "message": "Password should contain at least 8 characters"
        }, {"name": "sameAsLogin", "message": "Password cannot be same as login"}, {
            "name": "tooShort",
            "message": "Password is too short"
        }, {"name": "pattern", "message": "Password should contain upper and lower-case English letters, at least one digit and no spaces."}]
    },
	{
        "title": "Confirm Password",
        "name": "password2",
        "type": "password",
        "placeholder": "Confirm Password",
        "required": true,
        "classes": "form-text",
        "customAttrs": [{"match": "registrationData.password"}, {"required": "required"}, {"ng-disabled": "registerform.password.$invalid"}],
        "validation": [{"name": "required", "message": "This field is required"}, {
            "name": "match",
            "message": "Passwords don't match"
        }]
    },
	{
        "title": "Contact number",
        "name": "phone_code",
        "type": "text",
        "required": true,
        "classes": "form-text phone-code",
        "defaultValue": "82",
        "customAttrs": [{"country-code-validate": ""}, {"deValidate": ""}, {"ng-maxlength": "5"}, {"required": "required"}, {"prevent-input": "[^0-9]+"}],
        "validation": [{"name": "countryCode", "message": "Country code is not correct"}, {
            "name": "required",
            "message": "Country code is not correct"
        }]
    }, {
        "title": "",
        "name": "phone_number",
        "type": "text",
        "required": true,
        "placeholder": "Enter number",
        "hasCustomHtml": true,
        "classes": "reg-form-input-number phone_number",
        "customAttrs": [{"ng-pattern": "/^[0-9 ]+$/"}, {"required": "required"}, {"prevent-input": "/^[\\S ]+$/"}],
        "validation": [{"name": "invalid", "message": "Invalid phone number"}, {
            "name": "duplicate",
            "message": "Duplicate phone number"
        }, {"name": "failedsms", "message": "Failed to send sms"}, {
            "name": "required",
            "message": "This field is required"
        }, {"name": "pattern", "message": "Please, enter valid phone number: only digits are allowed - no spaces, letters and/or symbols"}]
    },
	],

		"rightCol": [{
        "title": "Bank Name",
        "name": "bank_name",
        "type": "text",
        "required": true,
        "placeholder": "Enter here",
        "classes": "form-text",
        "validation": []
    },
	{
        "title": "Bank Account Number",
        "name": "bank_account_number",
        "type": "text",
        "required": true,
        "placeholder": "Enter here",
        "classes": "form-text",
        "validation": []
    },
	{
        "title": "Bank Account Holder",
        "name": "bank_account_holder",
        "type": "text",
        "required": true,
        "placeholder": "Enter here",
        "classes": "form-text",
        "validation": []
    },

	{
        "title": "Currency",
        "name": "currency_name",
        "type": "select",
        "required": true,
        "classes": "select-block big",
        "customAttrs": [{"ng-options": "c for c in  conf.availableCurrencies track by c"}, {"ng-disabled": "currencyDisabled"}],
        "validation": []
    }, {
        "title": "Promo code",
        "name": "promo_code",
        "type": "text",
        "required": false,
        "placeholder": "Enter here",
        "classes": "form-text",
        "customAttrs": [{"ng-disabled": "hasPromoCode"}],
        "validation": []
    }]
	},
    'env': {
        showFifaCountdown: false,
		lang : 'kor'
    },
    'swarm': {
        url: [{ url: "http://swarm.betconstruct.com:8084/"}],
        websocket: [{ url: "ws://swarm.betconstruct.com:8084/"}]
    },
    xDomainSlaves: '{"http://swarm.betconstruct.com:8084" : "/xdomain-proxy.html"}', //has to be JSON string

   'payments': [
	{
            name: 'europayment',
            canDeposit: true,
            canWithdraw: true,
            order: 1,
            customDepositTemplate: "templates/payments/euro88_deposit.html",
            customWithdrawTemplate: "templates/payments/euro88_withdraw.html"
        }
     ]

});

CMS.constant('SkinWPConfig', {
   wpUrl: 'http://www.eurostar-kr.com/json',  // WordpResss instance serving pages, banners
  wpBaseHost: 'www.eurostar-kr.com',  // this parameter will be passed to JSON api and all links in response(e.g. images) will have this host,
//  wpNewsUrl: 'http://www.eurostar-kr.com/newsjson',  // WordpResss instance serving news
    wpNewsBaseHost: 'www.vbet.com'  // this parameter will be passed to JSON api and all links in NEWS response(e.g. images) will have this host
});

CASINO.constant('SkinCConfig', {
    cUrlPrefix: 'http://games.eurostar-kr.com',
    cGamesUrl: '/global/v-play.php',
    cUrl: '/global/casinoGamesLoad.php',
    main: {
        partnerID: '148'
    },
    login: {
        url: '/global/partners/rml.php'
    },
    balance: {
        url: '/global/cashier/cashier.php'
    }
});

VBET5.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/', {redirectTo: '/livecalendar/'});

}]);