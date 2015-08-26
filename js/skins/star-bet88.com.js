/*
*   All config values specified here will be merged with main config and will override its values
*
*/
/* global VBET5 */
VBET5.constant('SkinConfig', {
    'main': {
        siteTitle: {
            "eng": "good365.com"
        },
        site_name: "good365.com",
        site_id: "24",
        skin: 'good365.com',
        casinoEnabled: true,
        //oldHomepage: false,
        pokerEnabled: false,
        liveDealerEnabled: true,
        skillgamesEnabled: false,
		showTodayBets:1,
		fantasyEnabled: true,
		calendarPrematchSelection: true,
		enablePromotions: true,
        ogwilEnabled: true,
		liveCalendarEnabled: true,
		virtualSportEnabledInTopMenu: true,
		statsHostname: 'http://statistics.betconstruct.com/#/en/external/page/h2h',  // hostname for statistics. when clicking on game statistics icon, popup on this hostname is open,
        headerStatisticsLink: "http://statistics.betconstruct.com/good365#/en/statistics/competition/566/5358/entity/454",
		financialsEnabled: true,
		showVirtualsInSportList: 5,
		menuOrder: ['sport', 'live', 'virtual-sports', 'belote', 'backgammon', 'virtual-betting', 'freebet', 'livedealer',  'poolbetting', 'casino',  'poker',  'games', 'ogwil', 'fantasy', 'financials'],
        redirectOnTablets: 'http://tablet.good365.com/',
		//theVeryTopMenuItems: {promos: true},
		 theVeryTopMenu: [{href: "#/promos/", label: "Promotions"}],

        videoEnabled: true,
        availableVideoProviderIds: [6,15,16],
		freeBetEnabled: true,
        enableSportsbookLayoutSwitcher: true,
        sportsClassicLayout: true,
        about_company_text: {
            'eng' : "(c) good365.com"
        },
		/*additionalMenuItems: [
            {
                rus: {title: "Live Calendar", link: "#/livecalendar", cssclass: ''},
                eng: {title: "Live Calendar", link: "#/livecalendar", cssclass: ''}
            }
        ],*/
        availableLanguages: {
            '@replace': true, // this means that object won't be merged with 'parent object', but will replace it
            'eng' : { 'short': 'EN', 'full': "English"},
			'kor' : { 'short': 'KO', 'full': "한국의"}
        },
        registration: {
            defaultCurrency: 'KRW',
            restrictedCountries: {}
        },
        liveChat: {
			isSfChat:false,
            siteId: 196788,
            codePlan: 511
        },
        availableCurrencies: ['KRW'],
        balanceFractionSize: 0, //number of decimal places to round the balance value to(when displaying)
		facebookUrl: "https://www.facebook.com/goodbet365",
		instagramUserName : "goodsports365",
		twitterAccount: 'goodbet365',
		additionalIconsInFooter: [{name: 'blogicon', url: 'http://goodbet365.blogspot.com/', target: 'blank'}],
        enableNews: true, // enable news on sport page
        enableBannerUnderBetslip: true, // enable banner under the betslip,
		underBetslipBannersRotationPeriod:0,
        disableFooterNav: false, // disable wordpress content in footer,
		poweredByInFooter: false,  // false - don't show,  true -show with link,  -1 - show without link
        disableHomepageNews: true,
		additionalLink: {
            eng:  { link: 'http://mobile.good939.com', text: 'Mobile'},
            kor:  { link: 'http://mobile.good939.com', text: 'Mobile'}
        },
		/*additionalMenuItems: [
            {
                eng: {title: "E-Games", link: "#/sport/?type=0&sport=282514758&classic=yes&region=5242881&game=-1&competition=245316316", cssclass: ''},
                kor: {title: "E-Games", link: "#/sport/?type=0&sport=282514758&classic=yes&region=5242881&game=-1&competition=245316316", cssclass: ''}
            }

        ],*/
        copyrightSince: 2014
    },
	regConfig: {
		"rightCol": [{
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
        "title": "Bank Name",
        "name": "bank_name",
        "type": "select",
        "required": true,
		"classes": "select-block big",
		"optionsData": "<option value=\"KB Kookmin\">{{'KB Kookmin' | translate}}</option><option value=\"IBK\">{{'IBK' | translate}}</option><option value=\"NH Bank\">{{'NH Bank' | translate}}</option><option value=\"NH Local\">{{'NH Local' | translate}}</option><option value=\"Standardchartered\">{{'Standardchartered' | translate}}</option><option value=\"Shinhan\">{{'Shinhan' | translate}}</option><option value=\"Woori\">{{'Woori' | translate}}</option><option value=\"KEB\">{{'KEB' | translate}}</option><option value=\"Hana\">{{'Hana' | translate}}</option><option value=\"Citibank Korea\">{{'Citibank Korea' | translate}}</option><option value=\"Kyongnam\">{{'Kyongnam' | translate}}</option><option value=\"Kwangju\">{{'Kwangju' | translate}}</option><option value=\"Daegu\">{{'Daegu' | translate}}</option><option value=\"Busan\">{{'Busan' | translate}}</option><option value=\"KDB\">{{'KDB' | translate}}</option><option value=\"FSB\">{{'FSB' | translate}}</option><option value=\"KFCC\">{{'KFCC' | translate}}</option><option value=\"CU\">{{'CU' | translate}}</option><option value=\"Suhyup\">{{'Suhyup' | translate}}</option><option value=\"ePostbank\">{{'ePostbank' | translate}}</option><option value=\"Jeonbuk\">{{'Jeonbuk' | translate}}</option><option value=\"Daiichi\">{{'Daiichi' | translate}}</option><option value=\"Deutsche\">{{'Deutsche' | translate}}</option><option value=\"Mitsubishi UFJ\">{{'Mitsubishi UFJ' | translate}}</option>		<option value=\"Bank of America\">{{'Bank of America' | translate}}</option><option value=\"NFCF\">{{'NFCF' | translate}}</option><option value=\"ABN AMRO\">{{'ABN AMRO' | translate}}</option><option value=\"HSBC\">{{'HSBC' | translate}}</option>",
        "validation": []
    },
	{
        "title": "Account Number",
        "name": "bank_account_number",
        "type": "text",
        "required": true,
        "placeholder": "Enter here",
        "classes": "form-text",
        "validation": []
    },
	{
        "title": "Account Holder",
        "name": "bank_account_holder",
        "type": "text",
        "required": true,
        "placeholder": "Enter here",
        "classes": "form-text",
        "validation": []
    },
	{
        "title": "Remarks",
        "name": "remarks",
        "type": "text",
        "required": false,
        "placeholder": "Enter here",
        "classes": "form-text",
        "validation": []
    }]
	},

    'env': {
        showFifaCountdown: false
    },
    'swarm': {
        url: [{ url: "http://swarm.betconstruct.com:8084/"}],
        websocket: [{ url: "ws://swarm.betconstruct.com:8084/"}]
    },
	customTemplates: ["homepage/center.html"],
    xDomainSlaves: '{"http://swarm.betconstruct.com:8084" : "/xdomain-proxy.html"}', //has to be JSON string

    'payments': [
     ]

});

CMS.constant('SkinWPConfig', {
	hiddenNewsCategoryIds: [113, 119],
   wpUrl: 'http://www.good959.com/json',  // WordpResss instance serving pages, banners
  wpBaseHost: 'www.good959.com',  // this parameter will be passed to JSON api and all links in response(e.g. images) will have this host,
   wpPromoUrl: 'http://www.good959.com/json',
//  wpNewsUrl: 'http://www.good365.com/newsjson',  // WordpResss instance serving news
    wpNewsBaseHost: 'www.vbet.com'  // this parameter will be passed to JSON api and all links in NEWS response(e.g. images) will have this host
});

CASINO.constant('SkinCConfig', {
    cUrlPrefix: 'http://casino.good959.com',
    cGamesUrl: '/global/v-play.php',
    cUrl: '/global/casinoGamesLoad.php',
    main: {
        partnerID: '24'
    },
    login: {
        url: '/global/partners/rml.php'
    },
    balance: {
        url: '/global/cashier/cashier.php'
    }
});