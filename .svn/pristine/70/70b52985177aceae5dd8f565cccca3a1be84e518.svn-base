/*
*   All config values specified here will be merged with main config and will override its values
*
*/
/* global VBET5 */
VBET5.constant('SkinConfig', {
    'main': {
        siteTitle: {
            "eng": "ubc365.ng",
            "rus": "ubc365.ng"
        },
        site_name: "ubc365.ng",
        site_id: "57",
        skin: 'ubc365.ng',
        casinoEnabled: true,
        pokerEnabled: false,
        liveDealerEnabled: false,
        financialsEnabled: false,
        skillgamesEnabled: false,
		ageRestrictionInFooter: 18,
        redirectOnTablets: 'http://tablet.ubc365.ng/',
        videoEnabled: false,
        about_company_text: {
            'eng' : "",
            'rus' : ""
        },
        availableLanguages: {
            '@replace': true, // this means that object won't be merged with 'parent object', but will replace it
            'eng' : { 'short': 'EN', 'full': "English"},
            'rus' : { 'short': 'RU', 'full': "Русский"}
        },
        registration: {
            defaultCurrency: 'NGN',
            restrictedCountries: {}
        },
        liveChat: {
			isSfChat: true,
            siteId: 32814,
            codePlan: 357
        },
        availableCurrencies: ['NGN'],
        balanceFractionSize: 0, //number of decimal places to round the balance value to(when displaying)
        enableNews: true, // enable news on sport page
        enableBannerUnderBetslip: false, // enable banner under the betslip,
        disableFooterNav: false, // disable wordpress content in footer,
        disableHomepageNews: false,
        copyrightSince: 2014,
		facebookUrl: "https://www.facebook.com/UBC365",
        twitterAccount: 'UBC365',
        poweredByInFooter: -1  // false - don't show,  true -show with link,  -1 - show without link
    },
    'env': {
        showFifaCountdown: false
    },
    'swarm': {
        url: [{ url: "http://swarm.ubc365.ng:8084/"}],
        websocket: [{ url: "ws://swarm.ubc365.ng:8084/"}]
    },
    xDomainSlaves: '{"http://swarm.ubc365.ng:8084" : "/xdomain-proxy.html"}', //has to be JSON string

    'payments': [
        {
            name: 'card',
            canDeposit: false,
            canWithdraw: false,
            order: 2,
            depositInfoTextKey: 'deposit_info_card', // translate##deposit_info_card##
            depositFormFields: [
                {name: 'pin_code', type: 'text', label: 'PinCode'} // translate##PinCode##
            ],
            depositPrefilledAmount: 1 //amount field won't be shown, instead will send this number
        },
        {
            name: 'cash',
            canDeposit: true,
            canWithdraw: true,
            hideDepositButton: true,
            order: 1,
            hasBetShops: true,
            depositInfoText: {
                eng : "<p>To deposit money you should tell the bookmaker-cashier your ubc365 account number which you were granted after the registration on our website.</p><p>At any branch of ubc365 in Nigeria you can replenish your game account and receive your winning.</p>",
                rus : "<p>При внесении денег необходимо будет сказать букмекеру-кассиру номер вашего счета в БК \"ubc365\", который Вы получаете во время регистрации на нашем сайте.</p><p>В Нигерии,в любом фелиале  Ubc365,Вы можете пополнить Ваш игровой аккаунт и получить выигрыш.</p>" 
            },
             withdrawInfoText: {
                eng : "<p>You can receive the sum ordered in the betting offices on the same or next day after the registration of inquiry. You should present your passport to receive your winning. The order is valid within 3 days. If you cannot receive the winning sum during this term, the inquiry will be cancelled, the ordered sum will return on the game account. The minimal sum of the order is not limited. There are no additional charges for this payment method.</p><p>At any ubc branch you can receive  your winnings from 10:00 AM till 8:00 PM </p>",
                rus : "<p>Заказанную на выплату сумму Вы сможете получить в Пунктах Приема Ставок в тот же или на следующий день после оформления запроса. При получении денег Вы обязаны предъявить Ваш паспорт. Заказ действителен в течение 3-х дней. В случае, если Вы не сможете получить деньги в течение этого срока, заявка будет аннулирована, заказанная сумма возвращена на игровой счет. Минимальная сумма заказа не ограничена. Этот способ выплаты не предусматривает дополнительных расходов.</p><p>В любом фелиале Ubc365,Вы можете получить Ваш выигрыш с 10.00 до 20.00.</p>"
                
            }
        }
     ]

});

CMS.constant('SkinWPConfig', {
    wpUrl: 'http://www.ubc365.ng/json',  // WordpResss instance serving pages, banners
    wpBaseHost: 'www.ubc365.ng',  // this parameter will be passed to JSON api and all links in response(e.g. images) will have this host,
    wpNewsUrl: {
        main: 'http://www.ubc365.ng/newsjson'
    },  // WordpResss instance serving news
    wpNewsBaseHost: 'www.vbet.com'  // this parameter will be passed to JSON api and all links in NEWS response(e.g. images) will have this host
});

CASINO.constant('SkinCConfig', {
    cUrlPrefix: 'http://games.ubc365.ng',
    cGamesUrl: '/global/v-play.php',
    cUrl: '/global/casinoGamesLoad.php',
    main : {
        partnerID: '57',
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