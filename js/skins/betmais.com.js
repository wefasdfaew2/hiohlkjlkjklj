/*
 *   All config values specified here will be merged with main config and will override its values
 *
 */
/* global VBET5 */
VBET5.constant('SkinConfig', {
    'main': {
        siteTitle: {
            "eng": "betmais.com",
            "cze": "betmais.com",
            "rus": "betmais.com"
        },
        site_name: "betmais.com",
        site_id: "20",
        skin: 'betmais.com',
        casinoEnabled: false,
        pokerEnabled: false,
        liveDealerEnabled: false,
        financialsEnabled: false,
        skillgamesEnabled: false,
        enableSportsbookLayoutSwitcher: true,
        sportsClassicLayout: true, //is modern by default
        redirectOnTablets: 'http://tablet.betmais.com/',
        videoEnabled: true,
        availableVideoProviderIds: [6,15,16],
        about_company_text: {
            'eng' : "(c) betmais.com"
        },
        availableLanguages: {
            '@replace': true, // this means that object won't be merged with 'parent object', but will replace it
            'eng' : { 'short': 'EN', 'full': "English"},
            //'por' : { 'short': 'PT', 'full': "Português"},
            'pt-br' : { 'short': 'PT-BR', 'full': "Português do Brasil"},
            'spa' : { 'short': 'ES', 'full': "Español"}
        },
        registration: {
            defaultCurrency: 'EUR',
            restrictedCountries: {}
        },
        liveChat: {
            siteId: 209115,
            codePlan: 117
        },
        availableCurrencies: ['EUR', 'BRL'],
        //facebookUrl: "https://www.facebook.com/ibetup",
        //twitterAccount: 'IBetUpOfficial',
        balanceFractionSize: 0, //number of decimal places to round the balance value to(when displaying)
        enableNews: true, // enable news on sport page
        enableBannerUnderBetslip: true, // enable banner under the betslip,
        disableFooterNav: false, // disable wordpress content in footer,
        disableHomepageNews: false,
        copyrightSince: 2014,
        poweredByInFooter: false,
        showAllAvailablePaymentSystems: true,
        cssFiles: ['soccer-control.css', 'tennis-control.css', 'main.css', 'media.css', 'classic.css', 'flags.css',  'transitions.css', 'lib/introjs.min.css']
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
            name: 'bankformbetmais',
            canDeposit: true,
            canWithdraw: true,
            order: 2,
            customDepositTemplate: "skins/betmais.com/templates/deposit.html",
            customWithdrawTemplate: "skins/betmais.com/templates/withdraw.html"
        }
    ]

});

CMS.constant('SkinWPConfig', {
    wpUrl: 'http://new.betmais.com/json',  // WordpResss instance serving pages, banners
    wpBaseHost: 'new.betmais.com',  // this parameter will be passed to JSON api and all links in response(e.g. images) will have this host,
//  wpNewsUrl: 'http://www.betmais.com/newsjson',  // WordpResss instance serving news
    wpNewsBaseHost: 'www.vbet.com'  // this parameter will be passed to JSON api and all links in NEWS response(e.g. images) will have this host
});

CASINO.constant('SkinCConfig', {
    cGamesUrl: 'http://games.ibetup.com/global/v-play.php',
    cUrl: 'http://games.ibetup.com/global/casinoGamesLoad.php',
    skillGamesUrl: 'http://games.ibetup.com',
    main : {
        partnerID: '20',
        multiViewEnabled: true,
        filterByProviderEnabled: true
    },
    login: {
        url: 'http://games.betmais.com/global/partners/rml.php'
    },
    balance: {
        url: 'http://games.betmais.com/global/cashier/cashier.php'
    }
});