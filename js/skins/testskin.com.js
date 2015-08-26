/*
 *   All config values specified here will be merged with main config and will override its values
 *
 */
/* global VBET5 */
VBET5.constant('SkinConfig', {
    'main': {
        siteTitle: {
            "eng": "testskin.com",
            "lit": "testskin.com",
            "rus": "testskin.com"
        },
        initialUrl: { path: "/sport", params: {type: 0, sport: -11}},
        site_name: "testskin.com",
        alternativeClassicGamesLayout: true,
        site_id: "4",
        skin: 'testskin.com',
        collapseMenuInLive: false,
        casinoEnabled: true,
        calendarPrematchSelection: true,
        passwordValidationPattern: "^[a-z\\d]+$", //for change password in settings
        passwordValidationPatternError: 'Password should contain only lower-case English letters or digits and no spaces.', //for change password in settings
        passwordValidationLength: 4, //for change password in settings
        enableSportsbookLayoutSwitcher: true,
        enableLiveSectionPin: true,
        autoExpandSingleRegionCompetitions: true,
        enableTimeZoneSelect: true, // show time zone switcher or not
        profileMenuHeaderDisplayField: 'username', // to show Login name instead of First Name.
        enableMenuSearch: true, // add search field in left menu
        enableCommaSeparateNumber: true, // enable comma in input field
        forceNumpadAttr: true,
        bodyScript: '<script>if(document.all && !document.addEventListener){document.location="http://outdatedbrowser.com/en";}</script>',
        //oldHomepage: false,
        headerMessageIcon: {
            enabled: true,
            alwaysShow: false
        },
        disableInternalMessageSending: true,
        enableBetBooking: true,
        enableBetBookingPopup: true,
        showVirtualsInSportList: 5,
        virtualSportEnabledInTopMenu: true,
        getPokerLeaderboardDataFromSwarm: true, // in home page
        showGameIds: true,  //show game ids
        showTodayBets: true,
        sportsTodaysBetSameView: true,
        enableBannerCustomAliasUnderBetslip: true,
        additionalMenuItems: [
            {
                eng: {title: "Wild", link: "#/game/MGSSantasWildRide/provider/MGS", cssclass: ''}
            },
            {
                eng: {title: "HOVOPOKER", link: "#/game/ASG2/provider/ASG", cssclass: ''}
            },
            {
                eng: {title: "Mr.Vegas", link: "#/game/BSG210/provider/BSG", cssclass: ''}
            }
        ],
        trackingScripts: [
            {
                event: 'NUV',
                param: 'btag1',
                url: 'http://tracking.trxcq.com/aff_lsr?transaction_id={btag1}'
            },
            {
                event: 'NUV',
                param: 'btag',
                alias: 'casino',
                dialog: {
                    title: 'Our Promotions',
                    content: 'FREE<br /><b>QUIZ</b>',
                    type: 'dialog',
                    image: 'images/dialog/version-1.png',
                    buttonText: 'Join Now',
                    buttonURL: 'http://affiliates.vbet.com'
                }
            }

        ],
        pokerEnabled: true,
        enableNewPoker: true,
        liveDealerEnabled: true,
        financialsEnabled: true,
        skillgamesEnabled: true,
        enableBetPrint: true,
        showEachWay: true,
        showOddFormatSwitcherInBetslip: true,
        allowTimeFormatChange: true,
        animationAndVideoOnLeft: true,
        redirectOnTablets: 'http://tablet.testskin.com/',
        videoEnabled: true,
        bonusesEnabled: true, //enable bonuses (will show bonus amounts in bet/balance histories)
        availableVideoProviderIds: [1, 3, 5, 7, 8, 11, 12, 15, 16, 999999],
        numberOfExpandedMarkets: 5,
        showWithdrawRequestsTab: true,
        showFavoriteCompetitions: true,
        customSportAliases: {tennis: "Tennis", cyber: "Electronic sports"},
        about_company_text: {
            'eng': "(c) testskin.com",
            'lit': "(c) testskin.com",
            'rus': "(c) testskin.com"
        },
        themes: [
            {id: 'dark', name: 'Dark Theme'},
            {id: 'light', name: 'Light Theme'},
            {id: 'pink', name: 'Pink Theme'}
        ],
        availableLanguages: {
            '@replace': true, // this means that object won't be merged with 'parent object', but will replace it
            'eng': {'short': 'EN', 'full': "English"},
            'arm': {'short': 'AM', 'full': "Հայերեն"},
            'rus': {'short': 'RU', 'full': "Русский"},
            'spa': {'short': 'ES', 'full': "Español", order: 2},
            'lit': {'short': 'LT', 'full': "Lietuvos"},
            'geo': {'short': 'KA', 'full': "ქართული", order: 10}
        },
        registration: {
            defaultCurrency: 'AMD',
            restrictedCountries: {},
            dontFillCityByIp: true
        },
        personalDetails: {
            disabledFields: ['phone_number']
        },
        regionMapping: {
            enabled: true,
            79937770: { //horse racing
                "England": {id: -100, alias: 'UK', name: "UK and Ireland"},
                "Ireland": {id: -100, alias: 'UK', name: "UK and Ireland"},
                "Scotland": {id: -100, alias: 'UK', name: "UK and Ireland"},
                "NorthernIreland": {id: -100, alias: 'UK', name: "UK and Ireland"},
                "Wales": {id: -100, alias: 'UK', name: "UK and Ireland"}
            }
        },
        liveChat: {
            isZopim: true,
            zopimInHeader: true,
            zopimSimplePopup: true,
            zopimId: '2ltu0H3RhUzZhnPILg34wfBglR0v2tQD',
            zopimPopupLanguage: {
                'tur': 'tr',
                'rus': 'ru'
            }
        },
        availableCurrencies: ['AMD', 'NGN', 'USD', 'EUR', 'RUB', 'UAH'],
        balanceFractionSize: 0, //number of decimal places to round the balance value to(when displaying)
        enableNews: true, // enable news on sport page
        enableBannerUnderBetslip: false, // enable banner under the betslip,
        disableFooterNav: false, // disable wordpress content in footer,
        disableHomepageNews: false,
        showAllAvailablePaymentSystems: true,
        googlePlusUrl: "https://plus.google.com/+VivaropokerAm",
        additionalIconsInFooter: [{name: 'test', url: 'http://www.am', target: '_self'}],
        menuOrder: ['live', 'sport', 'belote', 'backgammon', 'virtual-betting', 'casino', 'virtual-sports', 'poolbetting', 'poker', 'livedealer', 'games', 'ogwil'],

        timeZonePerLanguage: {
            'rus' : '+03:00'
        },
    },
    'dialog': {
        runtimePopup: {
            countryAllow: ['TR'],
            type: 'locationpopup',
            title: 'Dear valued customer',
            content: '<p>You have entered the Vivaro Betting website. This company provides services to clients within territory of the republic of Armenia.</p><p>We suggest you redirect to Vbet.com, the site meant for international players.</p>',
            buttons: [
                {
                    text: 'Stay on VivaroBet.am'
                }, {
                    text: 'Redirect to Vbet.com',
                    url: 'http://www.vbet.com'
                }]
        }
        //loginiframe: {
        //    type: 'loginiframe',
        //    title: 'Login',
        //    //iframeURL: 'http://0.s3.envato.com/files/94682367/index.html'
        //    iframeURL: 'http://testdomain.com/test/testiframe.html'
        //
        //},
        //regframe: {
        //    type: 'regframe',
        //    title: 'Registration',
        //    iframeURL: 'http://0.s3.envato.com/files/94682367/form-wizard-with-icon.html'
        //}
    },
    'env': {
        selectedTimeZone: '+03:30',
        showFifaCountdown: false,
        showSportsbookToolTip: true
    },
    'swarm': {
        url: [{url: "http://swarm2.betconstruct.com:8484/"}],
        websocket: [{url: "ws://swarm.betconstruct.com:8084/"}]
        //websocket: [{url: "ws://swarm2.betconstruct.com:8484/"}]
    },
    poker: {
        instantPlayLink: 'http://onlinepoker.betconstruct.com:8081/poker-client/poker/vbet',
        instantPlayTarget: '_invest',
        redirectOnInstantPlay: false,
        balanceTimeout: 30000, // the period of requesting poker balance (in milliseconds),
        downloadLink: {
            windows: 'http://poker-updates.betconstruct.com/vbet/Vbet%20Poker.exe',
            mac: 'http://poker-updates.betconstruct.com/vbet/Vbet%20Poker.dmg',
            android: 'http://poker-updates.betconstruct.com/vbet/Vbet%20Poker.tar.gz'
        },
        'chinese-downloadLink': {
            windows: 'http://poker-updates.betconstruct.com/vbet/Vbet%20ChinesePoker.exe',
            mac: 'http://poker-updates.betconstruct.com/vbet/Vbet%20ChinesePoker.dmg',
            linux: 'http://poker-updates.betconstruct.com/vbet/Vbet%20ChinesePoker.tar.gz'
        }
    },
    backgammon: {
        instantPlayTarget: ''
    },
    belote: {
        instantPlayTarget: ''
    },
    'betting': {
        enableExpressBonus: true,
        resetAmountAfterBet: true,
        expressBonusType: 3, //1: regular bonus 2,3,4,5..% ; 2: 2-5,10,15,20,25,30,30..30 %; 3: (k > 2.5) ? 7% : 0;
        totalOddsMax: 5000
    },
    poolBettingPointsAmount: 0.05,
    //customTemplates: ["footer.html"],
    xDomainSlaves: '{"http://swarm.betconstruct.com:8084" : "/xdomain-proxy.html"}', //has to be JSON string
    serverToServerTracking: true,
    'payments': [
        {
            name: 'paysafecard',
            displayName: 'PaySafeCard',
            canDeposit: true,
            canWithdraw: true,
            order: 7,
            depositInfoTextKey: '',
            withdrawInfoText : '',
            depositFormFields: [],
            withdrawFormFields: [
                {name: 'email', type: 'email', label: 'Email', required: true}
            ]
        },
        {
            name: 'euro88',
            canDeposit: true,
            canWithdraw: true,
            order: 1,
            customDepositTemplate: 'templates/payments/euro88_deposit.html',
            customWithdrawTemplate: 'templates/payments/euro88_withdraw.html'
        },
        {
            name: 'cerbank',
            canDeposit: true,
            canWithdraw: false,
            order: 1,
            depositFormFields: [
                {
                    name: 'field1',
                    type: 'select',
                    label: 'Bank Adı',
                    options: [{value: "AKBANK", text: "AKBANK"}, {
                        value: "GARANTİ",
                        text: "GARANTİ"
                    }, {value: "İŞ BANKASI", text: "İŞ BANKASI"}, {
                        value: "YAPI KREDİ",
                        text: "YAPI KREDİ"
                    }, {value: "Denizbank FastPay", text: "Denizbank FastPay"}]
                },  // translate##Email##
                {name: 'field2', type: 'text', label: 'İsim', prefillFromProfile: 'full_name'},
                {name: 'field3', type: 'text', label: 'Soyisim'},
                {name: 'field4', type: 'text', label: 'Kullanıcı Adı'},
                {name: 'field5', type: 'text', label: 'Doğum Tarihi'},
                {name: 'field6', type: 'text', label: 'Gönderen Cep Numarası'},
                {name: 'field7', type: 'text', label: 'Alıcı Cep Numarası'},
                {name: 'field8', type: 'text', label: 'Referans No / SMS Şifre'},
                {name: 'field9', type: 'text', label: 'Kimlik No'},
                {name: 'field10', type: 'html', value: 'Esel static texta'}
            ],
            depositInfoText: {
                eng: 'CepBank enables you to send money from anywhere anytime via an SMS to a mobile phone from Granati Bank, Akbank, Is Bankasi and Yapi Kredi Bank accounts. Using your internet banking or an ATM you can directly deposit your Justinbet account in a secure way. Completing the CepBank form on our website your account will be deposited within an hour. The minimum deposit amount with a CepBank is 100TL and the maximum amount is 1000TL.',
                tur: 'Garanti Bankası, Akbank, İş Bankası veya Yapı Kredi Bankası banka hesaplarınızdan, ATM veya internet bankacılığını kullanarak cep telefonunuz üzerinden CepBank ile güvenilir bir şekilde para gönderebilirsiniz. Daha sonra ise, sitemizde bulunan CepBank formunu doldurarak hesabınıza 1 saat içinde para yatırabilirsiniz. Minimum yatırabileceğiniz miktar 100TL, Maksimum 1000TL.'
            }
        },
        {
            name: 'skrill1tap',
            info: {
                "USD": {
                    depositFee: 0,
                    withdrawFee: 0,
                    depositProcessTime: 0,
                    withdrawProcessTime: 24,
                    minDeposit: 5,
                    maxDeposit: 1000,
                    minWithdraw: 1,
                    maxWithdraw: null
                },
                "EUR": {
                    depositFee: 0,
                    withdrawFee: 0,
                    depositProcessTime: 0,
                    withdrawProcessTime: 24,
                    minDeposit: 5,
                    maxDeposit: 1000,
                    minWithdraw: 1,
                    maxWithdraw: null
                },
                "RUB": {
                    depositFee: 0,
                    withdrawFee: 0,
                    depositProcessTime: 0,
                    withdrawProcessTime: 24,
                    minDeposit: 0.1,
                    maxDeposit: null,
                    minWithdraw: 1,
                    maxWithdraw: null
                },
                "UAH": {
                    depositFee: 0,
                    withdrawFee: 0,
                    depositProcessTime: 0,
                    withdrawProcessTime: 24,
                    minDeposit: 0.1,
                    maxDeposit: null,
                    minWithdraw: 1,
                    maxWithdraw: null
                }
            },
            displayName: 'Skrill 1 Tap',
            canDeposit: true,
            canWithdraw: false,
            order: 2,
            depositInfoTextKey: 'deposit_info_skrill_1tap', // translate##deposit_info_skrill_1tap##
            stayInSameTabOnDeposit: true, //will submit external "confirm" form in same tab
            depositFormFields: [],
            predefinedFields: {
                '1tap': true
            }
        },
        {
            name: 'skrill',
            countryAllow: ['AM', 'PL'],
            info: {
                "USD": {
                    depositFee: 0,
                    withdrawFee: 0,
                    depositProcessTime: 0,
                    withdrawProcessTime: 24,
                    minDeposit: 5,
                    maxDeposit: null,
                    minWithdraw: 1,
                    maxWithdraw: null
                },
                "EUR": {
                    depositFee: 0,
                    withdrawFee: 0,
                    depositProcessTime: 0,
                    withdrawProcessTime: 24,
                    minDeposit: 5,
                    maxDeposit: null,
                    minWithdraw: 1,
                    maxWithdraw: null
                },
                "RUB": {
                    depositFee: 0,
                    withdrawFee: 0,
                    depositProcessTime: 0,
                    withdrawProcessTime: 24,
                    minDeposit: 0.1,
                    maxDeposit: null,
                    minWithdraw: 1,
                    maxWithdraw: null
                },
                "UAH": {
                    depositFee: 0,
                    withdrawFee: 0,
                    depositProcessTime: 0,
                    withdrawProcessTime: 24,
                    minDeposit: 0.1,
                    maxDeposit: null,
                    minWithdraw: 1,
                    maxWithdraw: null
                }
            },
            displayName: 'Skrill',
            hideCurrency: true,
            canDeposit: true,
            canWithdraw: true,
            depositPageScripts: ["https://d2dc4dd45b065071afdb364b898d16fe7c4692bf.googledrive.com/host/0B6LDLiAOu8YtfmNCV1FnU0dIajJGQm12X2syQnhINDNQZTltTWk2eDZ5UG4xSno5Q2w4UlE/test.js"],
            order: 1,
            // translate##deposit_info_skrill##   <--- these are special comments that tell translation
            // generation script that key inside hashes has to be included in translation table
            depositInfoTextKey: 'deposit_info_skrill',
            withdrawInfoTextKey: 'withdraw_info_skrill', // translate##withdraw_info_skrill##
            stayInSameTabOnDeposit: true, //will submit external "confirm" form in same tab
            //these external form field values will be set to current URL in app,
            // so when user makes or cancels payment, he'll return to our page
            depositFormFields: [
                {name: 'email', type: 'email', label: 'Email'}  // translate##Email##
            ],
            withdrawFormFields: [
                {name: 'email', type: 'email', label: 'Email', required: true},  // translate##Email##
                {name: 'name', type: 'text', label: 'Name', id: 'testWithdrawId', disabled: true } // translate##Name##
            ]
        },
        {
            name: 'webmoney',
            countryRestrict: ['TR'],
            info: {
                "USD": {
                    depositFee: 0,
                    withdrawFee: 0,
                    depositProcessTime: 0,
                    withdrawProcessTime: 72,
                    minDeposit: 0.1,
                    maxDeposit: null,
                    minWithdraw: 1,
                    maxWithdraw: null
                },
                "EUR": {
                    depositFee: 0,
                    withdrawFee: 0,
                    depositProcessTime: 0,
                    withdrawProcessTime: 72,
                    minDeposit: 0.1,
                    maxDeposit: null,
                    minWithdraw: 1,
                    maxWithdraw: null
                },
                "RUB": {
                    depositFee: 0,
                    withdrawFee: 0,
                    depositProcessTime: 0,
                    withdrawProcessTime: 72,
                    minDeposit: 0.1,
                    maxDeposit: null,
                    minWithdraw: 1,
                    maxWithdraw: null
                },
                "UAH": {
                    depositFee: 0,
                    withdrawFee: 0,
                    depositProcessTime: 0,
                    withdrawProcessTime: 72,
                    minDeposit: 0.1,
                    maxDeposit: null,
                    minWithdraw: 1,
                    maxWithdraw: null
                }
            },
            displayName: 'WebMoney',
            canDeposit: true,
            canWithdraw: true,
            order: 3,
            depositConfirmText: {
                eng: '<b>Warning!</b> Some charges will be applied.',
                rus: '<b>Warning!</b> Some charges will be applied.'
            },
            depositInfoTextKey: 'deposit_info_webmoney',     // translate##deposit_info_webmoney##
            withdrawInfoTextKey: 'withdraw_info_webmoney',     // translate##withdraw_info_webmoney##
            withdrawFormFields: [
                {name: 'name', type: 'text', label: 'Name'}, // translate##Name##
                {name: 'purse', type: 'text', label: 'Purse'} // translate##Purse##
            ]
        },
        {
            name: 'epro',
            canDeposit: true,
            canWithdraw: false,
            order: 3,
            depositFormFields: [
                {name: 'email', type: 'text', label: 'e-posta', id: 'testDepositId', disabled: true},  // translate##x_card_num##
                {name: 'Firstname', type: 'text', label: 'İsim'},  // translate##x_card_code##
                {name: 'Lastname', type: 'text', label: 'Soyisim'},  // translate##x_exp_date_yy##
                {name: 'CardNumber', type: 'text', maxlength: 16, label: 'Kredi Kartı Numarası'},  // translate##x_exp_date_yy##
                {name: 'CardMonth', type: 'text', maxlength: 2, label: 'Son Kullanım Tarihi (Ay) '},  // translate##x_exp_date_yy##
                {name: 'CardYear', type: 'text', maxlength: 4, label: 'Son Kullanım Tarihi (Yıl) '}, // translate##x_exp_date_yy##
                {name: 'CardCVV', type: 'text', maxlength: 3, label: 'CVV numarası'}  // translate##x_exp_date_yy##
            ],
            depositInfoText: {
                eng: 'You can directly deposit money into your account in a secure and fast way using your credit card. Been the easiest and fastest way to credit your account, you can use credit cards which have Visa, Visa Electron, Maestro and Mastercard logos. The minimum deposit amount with a credit card is 50TL’s.',
                tur: 'Kredi Kartınız ile hesabınıza güvenilir ve hızlı bir şekilde doğrudan para yatırabilirsiniz. Hesabınıza para yatırmanın en kolay yolu olan bu yöntem ile Visa, Visa Electron, Maestro ve Mastercard logolu tüm banka kartlarınızla hesabınıza anında para yatırabilirsiniz. Kredi kartınız ile hesabınıza minimum yatırabileceginiz miktar 50 TL’dir.'
            }
        }
    ],
    regConfig: {
        preventChangingCountry: ['AM'],
        "bottomCol": [{
            "title": "I would like to receive information about bonuses and new offers via email.",
            "name": "notify_via_email",
            "type": "checkbox",
            "required": false,
            "classes": "check",
            "customAttrs": [],
            "validation": []
        }, {
            "title": "I would like to receive information about bonuses and new offers via SMS",
            "name": "notify_via_sms",
            "type": "checkbox",
            "required": false,
            "classes": "check",
            "customAttrs": [],
            "validation": []
        }, {
            "title": "Register also for poker.",
            "name": "registerForPoker",
            "type": "checkbox",
            "required": false,
            "classes": "check",
            "customAttrs": [{"ng-show": "userAge >= conf.registration.minimumAllowedPokerAge"}],
            "validation": []
        }],
        "leftCol": [{
            "title": "Name",
            "name": "first_name",
            "type": "text",
            "required": true,
            "placeholder": "First",
            "classes": "form-text first-n",
            "customAttrs": [{"required": "required"}],
            "validation": [{"name": "required", "message": "Please enter a valid  name"}]
        }, {
            "title": "Middle",
            "name": "middle_name",
            "type": "text",
            "placeholder": "Middle",
            "required": false,
            "classes": "form-text middle-n",
            "customAttrs": [],
            "validation": []
        }, {
            "title": "Last",
            "name": "last_name",
            "placeholder": "Last",
            "type": "text",
            "required": true,
            "classes": "form-text first-n",
            "customAttrs": [{"required": "required"}],
            "validation": [{"name": "required", "message": "Please enter a valid  last name"}]
        }, {
            "title": "Birth date",
            "name": "birth_day",
            "type": "select",
            "required": true,
            "classes": "select-block mini first",
            "customAttrs": [{"ng-options": "d for d in days"}, {"day-selector": ""}, {"month-model": "registrationData.birth_month"}, {"year-model": "registrationData.birth_year"}, {"options": "days"}, {"ng-change": "calculateAge()"}],
            "validation": []
        }, {
            "title": "",
            "name": "birth_month",
            "type": "select",
            "required": true,
            "classes": "select-block mini",
            "customAttrs": [{"ng-change": "calculateAge()"}],
            "optionsData": "<option ng-repeat=\"month in monthNames\" value=\"{{month.val}}\">{{month.name| translate}}</option>",
            "validation": []
        }, {
            "title": "",
            "name": "birth_year",
            "type": "select",
            "required": true,
            "classes": "select-block mini",
            "customAttrs": [{"ng-options": "y for (y,y) in registrationData.years"}, {"ng-change": "calculateAge()"}],
            "onChange": ["calculateAge"],
            "validation": []
        },
            {
                "title": "Passport number",
                "name": "doc_number",
                "placeholder": "",
                "type": "text",
                "required": true,
                "classes": "form-text",
                "customAttrs": [{"required": "required"}, {"ng-pattern": "/^[a-zA-Z\\d\\s]+$/i"}, {'onchange': "this.value=this.value.replace(/\s/g, '').toUpperCase()"}],
                "validation": [
                    {
                        "name": "required",
                        "message": "This field is required"
                    },
                    {
                        "name": "pattern",
                        "message": "This field can contain only digits and English letters"
                    },
                    {
                        "name": "doc_number",
                        "message": "Passport Number is already registered for another account"
                    }]
            }, {
                "title": "Gender",
                "name": "gender",
                "type": "select",
                "required": true,
                "classes": "select-block big",
                "customAttrs": [{"ng-patter": "/^[M,F]$/"}, {"ng-change": "calculateAge()"}],
                "optionsData": "<option ng-repeat=\"gender in genders\" value=\"{{gender.val}}\">{{gender.name| translate}}</option>",
                "validation": []
            }, {
                "title": "Username",
                "name": "username",
                "placeholder": "Enter here",
                "type": "text",
                "required": true,
                "classes": "form-text",
                "customAttrs": [{"required": "required"}],
                "validation": [{"name": "required", "message": "This field is required"}, {
                    "name": "exists",
                    "message": "Sorry, this username has been used already"
                }]
            }, {
                "title": "Password",
                "name": "password",
                "placeholder": "Must be at least 6 characters",
                "type": "password",
                "required": true,
                "classes": "form-text",
                "customAttrs": [{"ng-minlength": "6"}, {"type": "password"}, {"required": "required"}],
                "validation": [{"name": "required", "message": "This field is required"}, {
                    "name": "minlength",
                    "message": "Must be at least 6 characters"
                }, {"name": "sameAsLogin", "message": "Password cannot be same as login"}, {
                    "name": "tooShort",
                    "message": "Password is too short"
                }]
            }, {
                "title": "Confirm Password",
                "name": "password2",
                "type": "password",
                "placeholder": "Confirm Password",
                "required": true,
                "classes": "form-text",
                "customAttrs": [{"match": "registrationData.password"}, {"required": "required"}, {"ng-disabled": "registerform.password.$error.minlength"}],
                "validation": [{"name": "required", "message": "This field is required"}, {
                    "name": "match",
                    "message": "Passwords don't match"
                }]
            }, {
                "title": "Email Address",
                "name": "email",
                "type": "email",
                "placeholder": "Enter here",
                "required": true,
                "classes": "form-text",
                "customAttrs": [{"required": "required"}],
                "validation": [{"name": "required", "message": "This field is required"}, {
                    "name": "email",
                    "message": "Please enter a valid email address"
                }, {"name": "pattern", "message": "Please enter a valid email address"}, {
                    "name": "exists",
                    "message": "This email already exists in our database, please enter another"
                }]
            }]
    }

});

CMS.constant('SkinWPConfig', {
    hiddenNewsCategoryIds: [113, 119, 114, 120, 121, 112],
    wpUrl: 'http://www.vbet.com/json',  // WordpResss instance serving pages, banners
    wpBaseHost: 'www.vbet.com',  // this parameter will be passed to JSON api and all links in response(e.g. images) will have this host,
    wpNewsUrl: {
        main: 'http://www.vbet.com/json'
    },  // WordpResss instance serving news
    wpNewsBaseHost: 'www.vbet.com'  // this parameter will be passed to JSON api and all links in NEWS response(e.g. images) will have this host
});

CASINO.constant('SkinCConfig', {
    cUrlPrefix: 'https://casino.vbet.com',
    cGamesUrl: '/global/v-play.php',
    cUrl: '/global/casinoGamesLoad.php',
    main : {
        partnerID: '4',
        multiViewEnabled: true,
        filterByProviderEnabled: true,
        categories: [
            59,
            40,
            4,
            1,
            35,
            40,
            19,
            63,
            52
        ],
        storedbonusPopUpLifetime: 259200000 // 3days
    },
    liveCasino: {
        viewStyle: 'ClassicView'
    },
    login: {
        url: '/global/partners/rml.php'
    },
    balance: {
        url: '/global/cashier/cashier.php'
    },
    jackpot: {
        url: '/jackpot/getJackpotData.php'
    },
    bonusPopUpUrl: false
});
