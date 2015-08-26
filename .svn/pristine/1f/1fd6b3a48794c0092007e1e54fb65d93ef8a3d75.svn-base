/*
*   All config values specified here will be merged with main config and will override its values
*
*/
/* global VBET5 */
VBET5.constant('SkinConfig', {
    'main': {
        siteTitle: {
            "eng": "6starr.asia"
        },
        site_name: "6starr.asia",
        site_id: "95",
        skin: '6starr.asia',
        casinoEnabled: true,
        pokerEnabled: false,
        liveDealerEnabled: false,
        financialsEnabled: false,
        skillgamesEnabled: false,
        redirectOnTablets: 'http://tablet.6starr.asia/',
        videoEnabled: false,
        about_company_text: {
            'eng' : "(c) 6starr.asia"
        },
        availableLanguages: {
            '@replace': true, // this means that object won't be merged with 'parent object', but will replace it
            'eng' : { 'short': 'EN', 'full': "English"}
        },
        registration: {
            defaultCurrency: 'USD',
            restrictedCountries: {}
        },
        liveChat: {
            siteId: 32814,
            codePlan: 357
        },
        availableCurrencies: ['USD', 'MYR', 'CPY'],
        balanceFractionSize: 0, //number of decimal places to round the balance value to(when displaying)
        enableNews: true, // enable news on sport page
        enableBannerUnderBetslip: false, // enable banner under the betslip,
        disableFooterNav: false, // disable wordpress content in footer,
        disableHomepageNews: false,
        disableDepositPage: true,
        poweredByInFooter: false,
        copyrightSince: 2014,
        balanceDefaultPage: 'balanceHistory'
    },
    'env': {
        showFifaCountdown: false
    },
    'swarm': {
        url: [{ url: "http://swarm.betconstruct.com:8084/"}],
        websocket: [{ url: "ws://swarm.betconstruct.com:8084/"}]
    },
    xDomainSlaves: '{"http://swarm.6starr.asia:8084" : "/xdomain-proxy.html"}', //has to be JSON string

    'payments': [
        {
            name: 'cash',
            canDeposit: false,
            canWithdraw: true,
            hideDepositButton: true,
            order: 1,
            hasBetShops: true,
            depositInfoTextKey: '', // translate##deposit_info_cash##
            withdrawInfoTextKey: '', // translate##withdraw_info_cash##
            withdrawInfoText: {
                'eng': 'To withdraw funds from your account simply enter the amount you want to transfer below and click "Withdraw".'
            }
        }
    ]

});

CMS.constant('SkinWPConfig', {
    wpUrl: 'http://www.6starr.asia/json',  // WordpResss instance serving pages, banners
    wpBaseHost: 'www.6starr.asia',  // this parameter will be passed to JSON api and all links in response(e.g. images) will have this host,
    wpNewsUrl: {
        main: 'http://www.6starr.asia/newsjson'
    },  // WordpResss instance serving news
    wpNewsBaseHost: 'www.vbet.com'  // this parameter will be passed to JSON api and all links in NEWS response(e.g. images) will have this host
});

CASINO.constant('SkinCConfig', {
    cUrlPrefix: 'http://games.6starr.asia',
    cGamesUrl: '/global/v-play.php',
    cUrl: '/global/casinoGamesLoad.php',
    main: {
        partnerID: '95'
    },
    login: {
        url: '/global/partners/rml.php'
    },
    balance: {
        url: '/global/cashier/cashier.php'
    }

});