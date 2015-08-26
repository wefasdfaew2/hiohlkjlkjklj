/*
*   All config values specified here will be merged with main config and will override its values
*
*/
/* global VBET5 */
VBET5.constant('SkinConfig', {
    'main': {
        siteTitle: {
            "eng": "eblon.com",
            "rus": "eblon.com"
        },
        site_name: "eblon.com",
        site_id: "70",
        skin: 'eblon.com',
        enableSportsbookLayoutSwitcher: true,
        casinoEnabled: true,
        pokerEnabled: true,
        liveDealerEnabled: true,
        financialsEnabled: true,
        skillgamesEnabled: true,
        redirectOnTablets: 'http://tablet.eblon.com/',
        videoEnabled: false,
        poweredByInFooter: false,
        about_company_text: {
            'eng' : "(c) eblon.com",
            'rus' : "(c) eblon.com"
        },
        availableLanguages: {
            '@replace': true, // this means that object won't be merged with 'parent object', but will replace it
            'eng' : { 'short': 'EN', 'full': "English"},
            'rus' : { 'short': 'RU', 'full': "Русский"}
        },
        registration: {
            defaultCurrency: 'USD',
            restrictedCountries: {}
        },
        liveChat: {
			isSfChat: true,
            siteId: 32814,
            codePlan: 357
        },
        availableCurrencies: ['EUR', 'USD'],
        balanceFractionSize: 0, //number of decimal places to round the balance value to(when displaying)
        enableNews: true, // enable news on sport page
        enableBannerUnderBetslip: false, // enable banner under the betslip,
        disableFooterNav: false, // disable wordpress content in footer,
        disableHomepageNews: false,
        copyrightSince: 2014
    },
    'env': {
        showFifaCountdown: false
    },
    'swarm': {
        url: [{ url: "http://swarm.betconstruct.com:8084/"}],
        websocket: [{ url: "ws://swarm.betconstruct.com:8084/"}]
    },
    xDomainSlaves: '{"http://swarm.betconstruct.com:8084" : "/xdomain-proxy.html"}', //has to be JSON string

    'payments': [
        {
            name: 'eblontransfer',
            canDeposit: true,
            canWithdraw: true,
            order: 1,
            depositInfoTextKey: 'deposit_info_eblontransfer',     // translate##deposit_info_eblontransfer##
            withdrawInfoTextKey: 'withdraw_info_eblontransfer',     // translate##withdraw_info_eblontransfer##
            withdrawFormFields: [
                {name: 'customer_id', type: 'text', label: 'CustomerID'}, // translate##CustomerID##
                {name: 'customer_password', type: 'password', label: 'Password'} // translate##Password##
            ]
        }
    ]

});

CMS.constant('SkinWPConfig', {
    wpUrl: 'http://www.eblon.com/json',  // WordpResss instance serving pages, banners
    wpBaseHost: 'www.eblon.com',  // this parameter will be passed to JSON api and all links in response(e.g. images) will have this host,
    wpNewsUrl: {
        main: 'http://www.eblon.com/newsjson'
    },  // WordpResss instance serving news
    wpNewsBaseHost: 'www.vbet.com'  // this parameter will be passed to JSON api and all links in NEWS response(e.g. images) will have this host
});

CASINO.constant('SkinCConfig', {});