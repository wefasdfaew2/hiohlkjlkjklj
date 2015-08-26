/*
 *   All config values specified here will be merged with main config and will override its values
 *
 */
/* global VBET5 */
VBET5.constant('SkinConfig', {
    'main': {
        siteTitle: {
            "eng": "justinbet.com",
            "rus": "justinbet.com"
        },
        site_name: "justinbet.com",
        site_id: "89",
        skin: 'justinbet.com',
        casinoEnabled: true,
        ogwilEnabled: true,
        pokerEnabled: true,
        allowCustomHtml: true,
        haveFaq: true,
        liveDealerEnabled: true,
        googleAnalyticsId: 'UA-59356367-1',
        fantasyEnabled: true,
        showVirtualsInSportList: 5,
        backGammonEnabledInTopMenu: true,
        financialsEnabled: false,
        virtualSportEnabledInTopMenu: true,
        availableVideoProviderIds: [15],
        skillgamesEnabled: true,
        enableSportsbookLayoutSwitcher: true,
        poolBettingEnabled: true, //enable pool betting
        sportsClassicLayout: true, //is modern by default
        redirectOnTablets: 'http://tablet.justinbet.com/',
        videoEnabled: true,
        about_company_text: {
            'eng' : "Justinbet is operated by Netzone B.V. registered in the Commercial register of Curacao no. 134321 and has a sublicense CIL pursuant to Master Gaming License №5536/JAZ",
            'tur' : "Netzone B.V. tarafından işletilen Justinbet, Curacao’da 134321 no ile kayıtlı olup №5536/JAZ lisans numarası ile CIL’e uygun bir şekilde Master Gaming lisansına sahiptir."
        },
        availableLanguages: {
            '@replace': true, // this means that object won't be merged with 'parent object', but will replace it
            'eng' : { 'short': 'EN', 'full': "English"},
            'tur' : { 'short': 'TR', 'full': "Türkçe"}
        },
        registration: {
            defaultCurrency: 'TRY',
            restrictedCountries: {},
            loadExternalScriptAfterRegistration: "http://cts.adssend.net/conversion?cpid=22995" //  script that will be loaded after registration is complete
        },
        liveChat: {
            isSfChat: false,
            siteId: 208271,
            codePlan: 277
        },
        availableCurrencies: ['TRY', 'USD', 'EUR'],
        facebookUrl: "https://www.facebook.com/trjustinbet",
        twitterAccount: "trjustinbet",
        balanceFractionSize: 0, //number of decimal places to round the balance value to(when displaying)
        enableNews: true, // enable news on sport page
        enableBannerUnderBetslip: true, // enable banner under the betslip,
        underBetslipBannersRotationPeriod: null,
        disableFooterNav: false, // disable wordpress content in footer,
        disableHomepageNews: true,
        additionalMenuItems: [
            {
                eng: {title: "News", link: "#/news", cssclass: ''},
                tur: {title: "Haberler", link: "#/news", cssclass: ''}
            }
        ],
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
    customTemplates: ["homepage/center.html", "affiliate/main.html"],

    xDomainSlaves: '{"http://swarm.betconstruct.com:8084" : "/xdomain-proxy.html"}', //has to be JSON string

    poker: {
        downloadLink: {
            windows: 'http://poker-updates.betconstruct.com/justinbet/JustinPoker.exe',
            mac: 'http://poker-updates.betconstruct.com/justinbet/JustinPoker.dmg',
            linux: 'http://poker-updates.betconstruct.com/justinbet/JustinPoker.tar.gz'
        },
        instantPlayLink: "http://onlinepoker.betconstruct.com:8081/poker-client/poker/justinbet"
    },
    backgammon: {
        instantPlayLink: 'http://backgammon.justinbet.com',
        downloadLink: {
            windows: 'http://games.justinbet.com/nardi/JustinGammon-1.1.24-Setup.exe'
        }
    },
    'payments': [
        {
            name: 'epro',
            canDeposit: true,
            canWithdraw: false,
            order: 5,
            depositFormFields: [
                {name: 'email', type: 'text', label: 'e-posta'},  // translate##x_card_num##
                {name: 'Firstname', type: 'text', label: 'İsim'},  // translate##x_card_code##
                {name: 'Lastname', type: 'text', label: 'Soyisim'},  // translate##x_exp_date_yy##
                {name: 'CardNumber', type: 'text', maxlength: 16, label: 'Kredi Kartı Numarası'},  // translate##x_exp_date_yy##
                {name: 'CardMonth', type: 'text', maxlength: 2, label: 'Son Kullanım Tarihi (Ay) '},  // translate##x_exp_date_yy##
                {name: 'CardYear', type: 'text', maxlength: 4, label: 'SKT (Y?l) (4 Hane olarak giriniz)'}, // translate##x_exp_date_yy##
                {name: 'CardCVV', type: 'text', maxlength: 3, label: 'CVV numarası'}  // translate##x_exp_date_yy##
            ],
            depositInfoText:  {
                eng : 'You can directly deposit money into your account in a secure and fast way using your credit card. Been the easiest and fastest way to credit your account, you can use credit cards which have Visa, Visa Electron, Maestro and Mastercard logos. The minimum deposit amount with a credit card is 50TL’s.',
                tur: 'Kredi Kartınız ile hesabınıza güvenilir ve hızlı bir şekilde doğrudan para yatırabilirsiniz. Hesabınıza para yatırmanın en kolay yolu olan bu yöntem ile Visa, Visa Electron, Maestro ve Mastercard logolu tüm banka kartlarınızla hesabınıza anında para yatırabilirsiniz. Kredi kartınız ile hesabınıza minimum yatırabileceginiz miktar 50 TL’dir.'
            }
        },
        {
            name: 'cerbank',
            canDeposit: true,
            canWithdraw: false,
            order: 1,
            depositFormFields: [
                {name: 'field1', type: 'select', label: 'Bank Adı', options: [{value: "AKBANK", text: "AKBANK"}, {value: "GARANTİ", text: "GARANTİ"}, {value: "İŞ BANKASI", text: "İŞ BANKASI"}, {value: "YAPI KREDİ", text: "YAPI KREDİ"}, {value: "Denizbank FastPay", text: "Denizbank FastPay"}]},  // translate##Email##
                {name: 'field2', type: 'text', label: 'İsim'},
                {name: 'field3', type: 'text', label: 'Soyisim'},
                {name: 'field4', type: 'text', label: 'Kullanıcı Adı'},
                {name: 'field5', type: 'text', label: 'Doğum Tarihi'},
                {name: 'field6', type: 'text', label: 'Gönderen Cep Numarası'},
                {name: 'field7', type: 'text', label: 'Alıcı Cep Numarası'},
                {name: 'field8', type: 'text', label: 'Referans No / SMS Şifre'},
                {name: 'field9', type: 'text', label: 'Kimlik No'}
            ],
            depositInfoText:  {
                eng : 'CepBank enables you to send money from anywhere anytime via an SMS to a mobile phone from Granati Bank, Akbank, Is Bankasi and Yapi Kredi Bank accounts. Using your internet banking or an ATM you can directly deposit your Justinbet account in a secure way. Completing the CepBank form on our website your account will be deposited within an hour. The minimum deposit amount with a CepBank is 100TL and the maximum amount is 1000TL.',
                tur: 'Garanti Bankası, Akbank, İş Bankası veya Yapı Kredi Bankası banka hesaplarınızdan, ATM veya internet bankacılığını kullanarak cep telefonunuz üzerinden CepBank ile güvenilir bir şekilde para gönderebilirsiniz. Daha sonra ise, sitemizde bulunan CepBank formunu doldurarak hesabınıza 1 saat içinde para yatırabilirsiniz. Minimum yatırabileceğiniz miktar 100TL, Maksimum 1000TL.'
            }
        },
        {
            name: 'bankform',
            canDeposit: true,
            canWithdraw: true,
            order: 2,
            depositInfoText:  {
                eng : 'You can deposit money into your account directly with a bank transfer. The minimum deposit amount with a Bank Transfer is 500TL.',
                tur: 'Banka hesabınızdan direkt olarak anında JustinBet hesabınıza para yatırabilirsiniz. Banka havalesi yöntemi ile hesabınıza Minimum 500TL yatırabilirsiniz.'
            },
            depositInfoTextKey: 'deposit_info_bankform', // translate##deposit_info_bankform##
            depositFormFields:[
                {name: 'field1', type: 'text', label: 'Banka adı'}, // translate##IBAN##
                {name: 'field2', type: 'text', label: 'Gönderen İsim'}, // translate##SWIFT##
                {name: 'field3', type: 'text', label: 'Gönderilen Miktar'}, // translate##SWIFT##
                {name: 'field4', type: 'text', label: 'İşlem Tarihi ve Referans'}
            ],
            withdrawInfoText:  {
                eng : '',
                tur: "Banka Havalesi ile haftanın her günü çekim talebinde bulunabilirsiniz. İşlemlerinizin maksimum 2-3 saat içinde gerçekleşmesi için, çekim taleplerinizi sabah 11'den önce tamamlamış olmalısınız.<br/>Minimum Para Çekme Limiti 200TL'dir. Banka konusunda sınırlandırma bulunmamaktadır. Para çekim üst limiti ve maksimum kazanç için lütfen sitenin kural ve şarlarına göz atın.<br/>Hesap başına günlük sadece 1 çekme işlemine onay verilmektedir. Aynı gün içinde verilmiş olan çekme talepleri birleştirilerek tek bir işlem olarak ertesi gün gönderilecektir. Herhangi bir sorunuzun yada sorununuzun olduğu durumlarda lütfen bizimle irtibata geçin. Sizin için buradayız ve memnuniyetle yardımcı olacağız."
            },
            withdrawInfoTextKey: 'withdraw_info_bankform', // translate##withdraw_info_bankform##
            withdrawFormFields:[
                {name: 'field1', type: 'text', label: 'Bank Adı'},
                {name: 'field2', type: 'text', label: 'İsim'},
                {name: 'field3', type: 'text', label: 'Soyisim'},
                {name: 'field4', type: 'text', label: 'Kullanıcı Adı'},
                {name: 'field5', type: 'text', label: 'Doğum Tarihi'},
                {name: 'field6', type: 'text', label: 'Banka Hesap no / Şube Kodu'},
                {name: 'field7', type: 'text', label: 'Cep No'},
                {name: 'field8', type: 'text', label: 'Kimlik No'}
            ]
        },
        {
            name: 'astropay',
            canDeposit: true,
            canWithdraw: false,
            order: 4,
            depositInfoText:  {
                eng : 'AstroPay Card is an international prepaid virtual card system which can be used to make payments on the internet. AstroPay card is sold with standard amounts in USD’s, you can buy an AstroPay Card in 25 USD, 50 USD, 75 USD, 100 USD, 200 USD and 500 USD’s; and credit your Justinbet account with an amount of your choice.',
                tur: 'AstroPayCard, internet üzerinden ödeme yapabileceğiniz uluslararası ön ödemeli bir kart sistemidir. Dolar bakiyelerinde satılan AstroPayCard’ı, 25 Dolar, 50 Dolar, 75 Dolar, 100 Dolar, 200 Dolar ve 500 Dolar değerlerinde satın alabilir ve dilediğiniz miktarda parayı hesabınıza anında yatırabilirsiniz.<br>*Astropaycard üzerinde bulunan dolar miktarını, aşağıdaki miktar kutucuğuna girmeniz gerekmektedir. Hesabınızın para cinsi TL yahut EUR ise, miktar otomatik olarak kura göre çevrilecektir. Örneğin; 20 dolarlık bir kart, kutucuğa 20 yazıp işlem tamamlandığında hesabınıza otomatik olarak kura göre TL karşılığı yansıyacaktır.'
            },
            depositFormFields: [
                {name: 'x_card_num', type: 'text', maxlength: 16, label: 'Kart numarası'},  // translate##x_card_num##
                {name: 'x_card_code', type: 'text', maxlength: 4, label: 'Kod'},  // translate##x_card_code##
                {name: 'x_exp_date_mm', type: 'text', maxlength: 2, label: 'Son kullanma tarihi (ay)'},  // translate##x_exp_date_yy##
                {name: 'x_exp_date_yy', type: 'text', maxlength: 4, label: 'Son kullanma tarihi (yıl)'}  // translate##x_exp_date_yy##
            ],
            withdrawInfoTextKey: 'withdraw_info_astropay', // translate##withdraw_info_astropay##
            withdrawFormFields:[
                {name: 'email', type: 'text', label: 'Email'} // translate##Email##
            ]
        },
        {
            name: 'ecopayznew',
            canDeposit: true,
            canWithdraw: true,
            order: 6,
            depositInfoText:  {
                eng : 'Ecopayz is one of the most convenient and secure online payment systems. You could top-up your Ecopayz account with your preferred payment method (credit card, bank wire) and then fund your Justinbet account 7/24. <br/>Minimum deposit limit for Ecopayz is 20EUR/USD/GBP and maximum limit is your Ecopayz accounts daily limit.  ',
                tur: "EcoPayz güvenli ve uygun ödeme hizmeti sunan bir online ödeme sistemidir. Banka havalesi veya kredi kartınız ile ecoPayz hesabınıza yatırdığınız parayı daha sonra anında hesabınıza aktarabilirsiniz.<br/>Ecopayz ile sitemize minimum 20TL/EUR/USD maksimum Ecopayz'in size sunmuş olduğu günlük limit kadar para yatırabilirsiniz."
            },
            withdrawInfoText:  {
            },
            depositFormFields: [],
            withdrawFormFields: [
                {name: 'account', type: 'text', label: 'Account Id'} // translate##Account Id##
            ]
        },
        {
            name: 'papaya',
            canDeposit: true,
            canWithdraw: true,
            order: 10,
            depositInfoText: '',
            depositFormFields: [],
            withdrawFormFields:[
                {name: 'papayaid', type: 'text', label: 'Papaya ID'} // translate##Email##
            ]
        },
        {
            name: 'voucherapi',
            canDeposit: true,
            canWithdraw: false,
            order: 11,
            depositPrefilledAmount: 1,
            depositFormFields: [
                {name: 'voucher', type: 'text', label: 'Voucher'}
            ],
            depositInfoText:  {
                eng : '',
                tur: ''
            }
        }
    ]

});

CMS.constant('SkinWPConfig', {
    wpUrl: 'http://www.justinbet.com/json',  // WordpResss instance serving pages, banners
    wpBaseHost: 'www.justinbet.com',  // this parameter will be passed to JSON api and all links in response(e.g. images) will have this host,
//  wpNewsUrl: 'http://www.tbilisibet.com/newsjson',  // WordpResss instance serving news
    wpNewsBaseHost: 'www.vbet.com'  // this parameter will be passed to JSON api and all links in NEWS response(e.g. images) will have this host
});
CASINO.constant('SkinCConfig', {
    cUrlPrefix: 'http://games.justinbet.com',
    cGamesUrl: '/global/v-play.php',
    cUrl: '/global/casinoGamesLoad.php',
    main : {
        partnerID: '89',
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