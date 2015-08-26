/*
 *   All config values specified here will be merged with main config and will override its values
 *
 */
/* global VBET5 */
VBET5.constant('SkinConfig', {
    'main': {
        siteTitle: {
            "eng": "betboro.com"
        },
        site_name: "betboro.com",
        site_id: "138",
        skin: 'betboro.com',
        enableSportsbookLayoutSwitcher: false,
        sportsClassicLayout: true, //is modern by default
        casinoEnabled: true,
        ogwilEnabled: true,
        pokerEnabled: false,
        liveDealerEnabled: false,
        fantasyEnabled: true,
        poolBettingEnabled: true, //enable pool betting
        enablePromotions: false,
        googleAnalyticsId: 'UA-46775142-1',
        financialsEnabled: true,
        haveFaq: true,
        backGammonEnabledInTopMenu: true,
        skillgamesEnabled: true,
        allowCustomHtml: true,
        virtualSportEnabledInTopMenu: true,
        showVirtualsInSportList: 5,
        theVeryTopMenu: [{}],
        statsHostname: 'http://statistics.betconstruct.com/#/en/external/page/h2h',  // hostname for statistics. when clicking on game statistics icon, popup on this hostname is open,
        headerStatisticsLink: "http://statistics.betconstruct.com/betboro#/en/statistics/competition/566/5358/entity/454",
        enableH2HStat: true,
        availableVideoProviderIds: [6, 15, 16],
        videoEnabled: true,
        betTypes: [
            {name: 'single', value: 1},
            {name: 'express', value: 2},
            {name: 'system', 'value': 3}
            //{'name': 'Trixie', 'value': 10},
            //{'name': 'Patent', 'value': 11},
            //{'name': 'Yankee', 'value': 12},
            //{'name': 'Lucky 15', 'value': 13},
            //{'name': 'Canadian', 'value': 14},
            //{'name': 'Lucky 31', 'value': 15},
            //{'name': 'Heinz', 'value': 16},
            //{'name': 'Lucky 63', 'value': 17},
            //{'name': 'Super Heinz', 'value': 18},
            //{'name': 'Goliath', 'value': 19}
        ],
        redirectOnTablets: 'http://tablet.betboro.com/',
        about_company_text: {
            'eng': "Webmedia Development N.V., registered in Curacao under number 130645 (0), operates the brand name betboro.com.<br/>Webmedia Development N.V. is authorized and regulated by Curacao E-Gaming. The company holds the license from the government of Curacao for gambling. <br/>© 2015 Webmedia Development N.V., E-Commerce Park Vredenberg, Curacao - all rights reserved.<br/><br/><a href=' http://www.gaminglicences.com/pages/validate.php?lid=8048-W2706154' target='_blank'><img src='skins/betboro.com/images/license.png' class='license-logo'></a>",
            'tur': "Webmedia Development N.V., registered in Curacao under number 130645 (0), operates the brand name betboro.com.<br/>Webmedia Development N.V. is authorized and regulated by Curacao E-Gaming. The company holds the license from the government of Curacao for gambling. <br/>© 2015 Webmedia Development N.V., E-Commerce Park Vredenberg, Curacao - all rights reserved.<br/><br/><a href=' http://www.gaminglicences.com/pages/validate.php?lid=8048-W2706154' target='_blank'><img src='skins/betboro.com/images/license.png' class='license-logo'></a>"
        },
        availableLanguages: {
            '@replace': true, // this means that object won't be merged with 'parent object', but will replace it
            'eng': {'short': 'EN', 'full': "English"},
            'spa': {'short': 'ES', 'full': "Español"},
            'por': {'short': 'PT', 'full': "Português"},
            'ger': {'short': 'DE', 'full': "Deutsch"},
            'tur': {'short': 'TR', 'full': "Türkçe"},
            'fre': {'short': 'FR', 'full': "Français"},
            'fas': {'short': 'FA', 'full': "Farsi", rtl: true}
        },
        registration: {
            defaultCurrency: 'EUR',
            restrictedCountries: {}
        },
        liveChat: {
            olarkId: '6479-916-10-2534'
        },
        additionalMenuItems: [
            {
                eng: {title: "News", link: "#/news", cssclass: ''},
                tur: {title: "Haberler", link: "#/news", cssclass: ''}
            }
        ],
        availableCurrencies: ['EUR', 'GBP', 'CHF', 'TOM'],
        balanceFractionSize: 0, //number of decimal places to round the balance value to(when displaying)
        enableNews: true, // enable news on sport page
        enableBannerUnderBetslip: false, // enable banner under the betslip,
        disableFooterNav: false, // disable wordpress content in footer,
        disableHomepageNews: true,
        poweredByInFooter: false,  // false - don't show,  true -show with link,  -1 - show without link
        copyrightSince: 2014
    },
    regConfig: {
        "rightCol": [{
            "title": "Country",
            "name": "country_id",
            "type": "select",
            "required": true,
            "classes": "city-form-block new",
            "customAttrs": [{"ng-include": "getTemplate(\"templates/slider/countries.html\")"}, {"ng-init": "preFillRegionalData()"}, {"ng-change": "checkIfCountryIsRestricted();"}],
            "customValidation": "<div class=\"city-form-block\" ng-class=\"{error: countryIsRestricted}\"> <div class=\"form-error-text\"> <div class=\"error-icon-f\"></div><p trans ng-show=\"countryIsRestricted\">Registration on this site is not permitted in selected country.</p><p ng-show=\"altUrl4RestrictedCountry\"><span trans>You can register here:</span> <a href=\"{{altUrl4RestrictedCountry}}\">{{altUrl4RestrictedCountry}}</a></p></div>"
        }, {
            "title": "City",
            "name": "city",
            "placeholder": "Enter here",
            "type": "text",
            "required": true,
            "classes": "registration-form-city city",
            "customAttrs": [{"required": "required"}],
            "validation": [{"name": "required", "message": "This field is required"}]
        }, {
            "title": "Address",
            "name": "address",
            "type": "text",
            "placeholder": "Enter here",
            "required": true,
            "classes": "form-text",
            "customAttrs": [{"required": "required"}],
            "validation": [{"name": "required", "message": "This field is required"}]
        }, {
            "title": "Contact number",
            "name": "phone_code",
            "type": "text",
            "required": true,
            "classes": "form-text phone-code",
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
            }, {
                "name": "pattern",
                "message": "Please, enter valid phone number: only digits are allowed - no spaces, letters and/or symbols"
            }]
        }, {
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
        },
            {
                "title": "Partner",
                "name": "partner",
                "type": "text",
                "required": false,
                "placeholder": "Enter here",
                "classes": "form-text",
                "validation": []
            }]
    },
    'env': {
        showFifaCountdown: false,
        preMatchMultiSelection: true
    },
    'swarm': {
        url: [{url: "http://swarm.vbet.com:8880/"}],
        websocket: [{url: "ws://swarm.vbet.com:8880/"}]
    },
    customTemplates: ["homepage/center.html"],
    backgammon: {
        instantPlayLink: 'http://backgammon.betboro.com',
        redirectOnInstantPlay: true,
        downloadLink: {
            windows: 'http://games.betboro.com/nardi/BetBoroGammon-1.1.26-Setup.exe'
        }
    },
    xDomainSlaves: '{"http://swarm.vbet.com:8880" : "/xdomain-proxy.html"}', //has to be JSON string

    'payments': [
        {
            name: 'wirecardnew',
            canDeposit: true,
            canWithdraw: true,
            order: 5,
            withdrawInfoText: 'wirecard',
            withdrawFormFields: [
                {name: 'CreditCardNumber', type: 'text', label: 'Credit Card Number', required: true},  // translate##Phone##
                {name: 'ExpirationYear', type: 'text', label: 'Expiration Year', required: true},  // translate##Phone##
                {name: 'ExpirationMonth', type: 'text', label: 'Expiration Month', required: true},  // translate##Phone##
                {name: 'CardHolderName', type: 'text', label: 'CardHolder Name', required: true}  // translate##Phone##
            ]

        },
        {
            name: 'ukash',
            displayName: 'UKash',
            canDeposit: true,
            canWithdraw: false,
            order: 4,
            depositInfoTextKey: 'deposit_info_ukash', // translate##deposit_info_ukash##
            withdrawInfoTextKey: 'withdraw_info_ukash' // translate##withdraw_info_ukash##
        },
        {
            name: 'icepay',
            canDeposit: true,
            canWithdraw: false,
            order: 3,
            depositInfoText: 'Paysafe'
        },
        {
            name: 'netellernew',
            canDeposit: true,
            canWithdraw: true,
            order: 2,
            depositInfoText: '',
            depositFormFields: [
                {name: 'email', type: 'text', label: 'Email'},
                {name: 'secure_id', type: 'password', label: 'Secure Id'}
            ],
            withdrawInfoText: '',
            withdrawFormFields: [
                {name: 'email', type: 'text', label: 'Email'}
            ]

        },
        {
            name: 'skrillnew',
            displayName: 'Skrill',
            canDeposit: true,
            canWithdraw: true,
            order: 1,
            depositInfoTextKey: 'deposit_info_skrill',
            withdrawInfoText: '',
            depositFormFields: [
                {name: 'email', type: 'email', label: 'Email'}  // translate##Email##
            ],
            withdrawFormFields: [
                {name: 'email', type: 'email', label: 'Email', required: true},
                {name: 'name', type: 'text', label: 'Name'}
            ]
        },
        {
            name: 'bankform',
            canDeposit: true,
            canWithdraw: true,
            order: 6,
            depositInfoTextKey: 'deposit_info_bankform',
            depositFormFields: [
                {name: 'field1', type: 'text', label: 'Voucher No.'}  // translate##Email##
            ],
            withdrawInfoText: '',
            withdrawInfoTextKey: 'withdraw_info_bankform', // translate##withdraw_info_bankform##
            withdrawFormFields: [
                {name: 'field1', type: 'text', label: 'Bank Name'},
                {name: 'field2', type: 'text', label: 'Swift/BIC'},
                {name: 'field3', type: 'text', label: 'IBAN'},
                {name: 'field4', type: 'text', label: 'Account-Nr'}
            ]
        }
    ]

});

CMS.constant('SkinWPConfig', {
    hiddenNewsCategoryIds: [113, 119],
    wpUrl: 'http://www.betboro.com/json',  // WordpResss instance serving pages, banners
    wpBaseHost: 'www.betboro.com',  // this parameter will be passed to JSON api and all links in response(e.g. images) will have this host,
//  wpNewsUrl: 'http://www.betboro.com/newsjson',  // WordpResss instance serving news
    wpNewsBaseHost: 'www.vbet.com'  // this parameter will be passed to JSON api and all links in NEWS response(e.g. images) will have this host
});

CASINO.constant('SkinCConfig', {
    cUrlPrefix: 'http://games.betboro.com',
    cGamesUrl: '/global/v-play.php',
    cUrl: '/global/casinoGamesLoad.php',
    main: {
        partnerID: '138'
    },
    login: {
        url: '/global/partners/rml.php'
    },
    balance: {
        url: '/global/cashier/cashier.php'
    }
});