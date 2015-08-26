/*
*   All config values specified here will be merged with main config and will override its values
*
*/
/* global VBET5 */
VBET5.constant('SkinConfig', {
    'main': {
        siteTitle: {
            "eng": "betkurus.com",
            "rus": "betkurus.com"
        },
        site_name: "betkurus.com",
        site_id: "107",
        skin: 'betkurus.com',
        casinoEnabled: true,
        pokerEnabled: false,
        allowCustomHtml: true,
        googleAnalyticsId: 'UA-55864609-1',
        liveDealerEnabled: true,
        financialsEnabled: true,
        skillgamesEnabled: true,
        redirectOnTablets: 'http://tablet.betkurus.com/',
        videoEnabled: false,
        about_company_text: {
            'eng' : "(c) betkurus.com",
            'tur' : "(c) betkurus.com"
        },
        availableLanguages: {
            '@replace': true, // this means that object won't be merged with 'parent object', but will replace it
            'eng' : { 'short': 'EN', 'full': "English"},
            'tur' : { 'short': 'TR', 'full': "Türkçe"}
        },
        registration: {
            defaultCurrency: 'cBTC',
            restrictedCountries: {},
            loadExternalScriptAfterRegistration: "http://cts.adssend.net/conversion?cpid=22995" //  script that will be loaded after registration is complete
        },
        liveChat: {
            isDeskChat: true,
            deskChatUrl: "https://betkurus.desk.com/customer/widget/chats/new"
        },
        availableCurrencies: ['cBTC', 'USD', 'EUR', 'TRY'],
        balanceFractionSize: 0, //number of decimal places to round the balance value to(when displaying)
        enableNews: true, // enable news on sport page
        enableBannerUnderBetslip: false, // enable banner under the betslip,
        disableFooterNav: false, // disable wordpress content in footer,
        disableHomepageNews: false,
        copyrightSince: 2014,
        poweredByInFooter: false
    },
    'env': {
        showFifaCountdown: false,
        lang: 'tur'
    },
    'swarm': {
        url: [{ url: "http://swarm.betconstruct.com:8084/"}],
        websocket: [{ url: "ws://swarm.betconstruct.com:8084/"}]
    },
    customTemplates: ["homepage/sportnews.html"],
    xDomainSlaves: '{"http://swarm.betkurus.com:8084" : "/xdomain-proxy.html"}', //has to be JSON string

    'payments': [
        {
            name: 'cash',
            canDeposit: false,
            canWithdraw: false,
            hideDepositButton: true,
            order: 2,
            hasBetShops: true,
            depositInfoText: {
                eng: '',
                tur: ''
            },
            withdrawInfoText: {
                eng: '',
                tur: ''
            }
        },
        {
            name: 'blockio',
            canDeposit: true,
            canWithdraw: false,
            order: 1,
            depositPrefilledAmount: 1, //amount field won't be shown, instead will send this number
            depositInfoText:  {
                eng : 'Bitcoin is a digital currency payment system that is both instant and anonymous to anyone, anywhere in the world.<br />1. If currency of choice for your account is BTC, make the instantaneous transfer to our Bitcoin address shown in the field in the deposit section on the right.<br />2. If you are opening your account in USD/EUR/TRY, please make Bitcoin deposit to our wallet below, send us an email to <a href=mailto:payments@betkurus.com>payments@betkurus.com</a> stating the deposit amount, and we will convert the Bitcoins in your account.<br />Our wallet for accounts in USD/EUR/TRY: <b>3AGM7rC9dEGmPzSKjk2TZ1aojHTXnuqJDW</b>',
                tur: 'Bitcoin ile yat&#305;r&#305;m&#305;n&#305;z&#305; ger&ccedil;ekle&#351;tirebilmek ve bonusumuzdan yararlanmak i&ccedil;in ana sayfada bulunan Bitcoin Nedir? sekmesini inceleyin:<br />                1. E&#287;er hesab&#305;n&#305;z&#305; a&ccedil;arken bitcoin (cBTC) para birimi olarak se&ccedil;mi&#351;seniz para yat&#305;rmak i&ccedil;in PARA YATIRMA sekmesinin sa&#287; taraf&#305;nda bulunan bitcoin adresini kullanabilirsiniz.<br />2. E&#287;er hesab&#305;n&#305;z&#305; a&ccedil;arken TRY/EUR/USD para birimi olarak se&ccedil;mi&#351;seniz ve Bitcoin ile yat&#305;r&#305;m yapmak istiyorsan&#305;z, alttaki Bitcoin adresine bitcoinlerinizi g&ouml;ndermelisiniz:<br />3AGM7rC9dEGmPzSKjk2TZ1aojHTXnuqJDW<br />Yat&#305;r&#305;m&#305;n&#305;z&#305; ger&ccedil;ekle&#351;tirdikten sonra l&uuml;tfen kullan&#305;c&#305; bilgilerinizi ve yat&#305;rd&#305;&#287;&#305;n&#305;z miktar&#305; belirterek  <a href=mailto:payments@betkurus.com>payments@betkurus.com</a> adresine mail g&ouml;nderiniz. Miktar&#305; se&ccedil;mi&#351; oldu&#287;unuz para birimi olarak hesab&#305;n&#305;za yans&#305;taca&#287;&#305;z.'
            },
            withdrawInfoTextKey: ''
        },
        {
            name: 'pbspayment',
            canDeposit: true,
            canWithdraw: true,
            order: 2,
            depositInfoText:  {
                eng : '',
                tur: ''
            },
            withdrawInfoTextKey: '',
            withdrawFormFields: [
                {name: 'email', type: 'email', label: 'Email', required: true},  // translate##Email##
                {name: 'name', type: 'text', label: 'Name'} // translate##Name##
            ]
        }
    ]

});

CMS.constant('SkinWPConfig', {
    wpUrl: 'http://www.betkurus.com/json',  // WordpResss instance serving pages, banners
    wpBaseHost: 'www.betkurus.com',  // this parameter will be passed to JSON api and all links in response(e.g. images) will have this host,
    wpNewsUrl: {
        main: 'http://www.betkurus.com/newsjson'
    },  // WordpResss instance serving news
    wpNewsBaseHost: 'www.vbet.com'  // this parameter will be passed to JSON api and all links in NEWS response(e.g. images) will have this host
});

CASINO.constant('SkinCConfig', {
    cUrlPrefix: 'http://games.betkurus.com',
    cGamesUrl: '/global/v-play.php',
    cUrl: '/global/casinoGamesLoad.php',
    main : {
        partnerID: '107',
        multiViewEnabled: true,
        filterByProviderEnabled: true
    },
    login: {
        url: '/global/partners/rml.php'
    },
    balance: {
        url: '/global/cashier/cashier.php'
    }
});