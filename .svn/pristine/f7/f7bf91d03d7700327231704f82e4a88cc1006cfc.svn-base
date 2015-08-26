/*
 *   All config values specified here will be merged with main config and will override its values
 *
 */
/* global VBET5 */
VBET5.constant('SkinConfig', {
    'main': {
        siteTitle: {
            "eng": "fartbet.com"
        },
        site_name: "fartbet.com",
        site_id: "11",
        skin: 'fartbet.com',
        casinoEnabled: true,
        pokerEnabled: false,
        enableSportsbookLayoutSwitcher: true,
        sportsClassicLayout: true,
        liveDealerEnabled: true,
        financialsEnabled: false,
        poolBettingEnabled: true, //enable pool betting
        freeBetEnabled: true,
        skillgamesEnabled: false,
        showGameIds:true,
        ogwilEnabled: true,
        redirectOnTablets: 'http://tablet.fartbet.com/',
        videoEnabled: false,
        about_company_text: {
            'eng' : "(c) fartbet.com"
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
            isSfChat:false,
            siteId: 32814,
            codePlan: 1177
        },
        availableCurrencies: ['USD','RUB'],
        balanceFractionSize: 0, //number of decimal places to round the balance value to(when displaying)
        enableNews: true, // enable news on sport page
        enableBannerUnderBetslip: false, // enable banner under the betslip,
        disableFooterNav: false, // disable wordpress content in footer,
        disableHomepageNews: false,
        additionalMenuItems: [
            {
                rus: {title: "Кено", link: "http://www.fartbet.com/#/casino/?category=35&provider=all&sport=844&region=-1&game=566&type=demo", cssclass: ''},
                eng: {title: "Keno", link: "http://www.fartbet.com/#/casino/?category=35&provider=all&sport=844&region=-1&game=566&type=demo", cssclass: ''}
            },
            {
                rus: {title: "Результаты", link: "http://liveresults.fartbet.com/?lg=rus", cssclass: '', target: '_popup'},
                eng: {title: "Results", link: "http://liveresults.fartbet.com/?lg=eng", cssclass: '', target: '_popup'}
            }
        ],
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
            name: 'cash',
            displayName: "Cash",
            canDeposit: true,
            canWithdraw: true,
            hideDepositButton: true,
            order: 1,
            hasBetShops: true,
            depositInfoText:  {
                eng : "",
                rus : "При внесении средств необходимо будет кассиру назвать номер вашего счета в БК Фартбет,который Вы получаете во время регистрации на нашем сайте"
            },
            withdrawInfoText:  {
                eng : "",
                rus : "Заказанную на выплату сумму Вы сможете получить на Пунктах Приема Ставок в тот же день или на следующий день после оформления запроса.При получении денег Вы обязаны предъявить ваш паспорт.<br/>Заказ действителен в течении 3-х дней.В случае,если Вы не сможете получить деньги в течение этого срока,заявка будет аннулирована,заказанная сумма возвращена на игровой счет.<br/>Минимальная сумма заказа 50р.<br/>Максимальная сумма заказа 300 000р. в сутки.<br/>ВНИМАНИЕ: игрок не может снять средства ,не сделав ставки на сумму,которую желает снять,то есть не прокрутив их."
            }
        },
        {
            name: 'DengiOnline_WebMoney',
            canDeposit: true,
            canWithdraw: true,
            order: 2,
            depositInfoText:  {
                eng : "",
                rus : "«WebMoney» - это электронная платежная система, не являющаяся банковской, которая позволяет интернет-пользователям совершать безопасные транзакции в режиме реального времени с использованием виртуальных единиц. Для осуществления платежей необходимо быть зарегистрированным в системе «WebMoney». Управление лицевым счетом в системе «WebMoney» производится с помощью клиентского программного обеспечения (WebMoney Keeper)."
            },
            withdrawInfoText: 'withdraw_info_DengiOnline_WebMoney',
            withdrawFormFields: [
                {name: 'field1', type: 'text', label: 'WMR', required: true}
            ]

        },
        {
            name: 'DengiOnline_QIWI',
            canDeposit: true,
            canWithdraw: true,
            order: 3,
            depositInfoText:  {
                eng : "",
                rus : "«QIWI Кошелек» - один из передовых платежных сервисов, предназначенный для оплаты различных повседневных услуг, от мобильной связи до банковских кредитов. Особенность сервиса «QIWI-Кошелек» состоит в том, что оплата может производиться как наличными, через сеть платежных терминалов «QIWI», так и через интернет-сервис или приложение для мобильных устройств. Фактически пользователь может совершать оплату со своего счета в системе «QIWI», находясь в удобном для него месте и в удобное время. Причем, почти все виды электронных переводов осуществляются без комиссии."
            },
            withdrawInfoText:  {
                eng : "",
                rus : "Вы может оформить запрос на вывод средств со своего действующего игрового счета в полной сумме или частично. Любой запрос на вывод средств, вне зависимости от метода вывода, в обязательном порядке проверяется службой безопасности. Любой запрос на вывод средств может рассматриваться службой безопасности от 10 мин. до 24-х часов."
            },
            withdrawFormFields: [
                {name: 'field1', type: 'text', label: 'Qiwi number', required: true}
            ]

        },
        {
            name: 'DengiOnline_Yandex',
            canDeposit: true,
            canWithdraw: false,
            order: 4,
            depositInfoText:  {
                eng : "",
                rus : ""

            }
        },
        {
            name: 'DengiOnline_LiqPay',
            canDeposit: true,
            canWithdraw: false,
            order: 5,
            depositInfoText:  {
                eng : "",
                rus : "Liqpay - это электронная платежная система, которая представляет собой универсальный платежный инструмент для расчетов за товары и услуги в интернет-магазинах. Это платежная система, которая позволяет легко и быстро отправлять деньги с пластиковых карт VISA или MasterCard на виртуальный счет в системе «LiqPAY». Виртуальный счет в системе «LiqPAY» - это номер мобильного телефона в международном формате. Вывод денег с виртуального счета в системе «LiqPAY» возможен только на пластиковые карты VISA."
            }
        },
        {
            name: 'DengiOnline_MoneyX',
            canDeposit: true,
            canWithdraw: false,
            order: 6,
            depositInfoText:  {
                eng : "",
                rus : "«MoneXy» - это электронная платежная система, которая представляет собой универсальный платежный инструмент для расчетов за товары и услуги в интернет-магазинах. Виртуальный счет в системе «MoneXy» - это номер мобильного телефона в международном формате. Так же, данная платежная система предлагает своим клиентам универсальный продукт - пластиковую карту «MoneXy», которая предоставляет пользователям системы удобный доступ к своим средствам и возможность совершать расчеты за товары и услуги в повседневной жизни."
            }
        },
        {
            name: 'DengiOnline_EasyPay',
            canDeposit: true,
            canWithdraw: false,
            order: 7,
            depositInfoText:  {
                eng : "",
                rus : "Как оплачивать услуги за EasyPay: 1. Пользователь на сайте Fartbet выбирает оплата при помощи EasyPay. 2. Заполняет предлагаемый счет. 3. Входит в свой электронный кошелек EasyPay и оплачивает счет в разделе 'Оплата'.<br />Минимальная сумма пополнения: 50 RUR"
            }
        },
        {
            name: 'DengiOnline_IPay',
            canDeposit: true,
            canWithdraw: false,
            order: 8,
            depositInfoText:  {
                eng : "",
                rus : "Интернет-Банк “Альфа-Клик” – это современный, удобный и практичный комплекс банковских услуг и возможность проведения электронных платежей через интернет с максимальной скоростью и надежностью.<br/>Интернет-банк «Альфа-Клик» бесплатно подключается любому клиенту Альфа-Банка. Просто заполните небольшую заявку и вам перезвонят для подключения<br/>Если вы еще не являетесь клиентом, предлагаем заполнить онлайн-анкету на открытие счета и выпуск дебетовой карты. При получении карты в отделении банка вам подключат Интернет-банк «Альфа-Клик»:Подключить Альфа-Клик"
            }
        },
        {
            name: 'DengiOnline_DengiMail',
            canDeposit: true,
            canWithdraw: false,
            order: 9,
            depositInfoText: 'deposit_info_DengiOnline_DengiMail'
        },
        {
            name: 'bankform',
            canDeposit: false,
            canWithdraw: true,
            order: 10,
            withdrawInfoText:  {
                eng : "",
                rus : 'Вы может оформить запрос на вывод средств со своего действующего игрового счета в полной сумме или частично. Любой запрос на вывод средств, вне зависимости от метода вывода, в обязательном порядке проверяется службой безопасности. Любой запрос на вывод средств может рассматриваться службой безопасности от 10 мин. до 3 дней(Срок зачисления зависит от выбранного способа для вывода средств.)<br/>Все поля обязательны к заполнению. "Комментарий к выплате” – в данном поле, пожалуйста, укажите комментарий – Вывод денежных средств.<br/>Минимальная сумма заказа на вывод: 10 RUR<br/>Максимальная сумма заказа на вывод: 14 500 RUR'
            },
            withdrawFormFields:[
                {name: 'field1', type: 'text', label: 'Номер карты'},
                {name: 'field2', type: 'text', label: 'Фамилия и имя владельца карты'},
                {name: 'field3', type: 'text', label: 'Комментарий к выплате'}
            ]
        }
    ]

});

CMS.constant('SkinWPConfig', {
    wpUrl: 'http://www.fartbet.com/json',  // WordpResss instance serving pages, banners
    wpBaseHost: 'www.fartbet.com',  // this parameter will be passed to JSON api and all links in response(e.g. images) will have this host,
//  wpNewsUrl: 'http://www.fartbet.com/newsjson',  // WordpResss instance serving news
    wpNewsBaseHost: 'www.vbet.com'  // this parameter will be passed to JSON api and all links in NEWS response(e.g. images) will have this host
});

CASINO.constant('SkinCConfig', {
    cUrlPrefix: 'http://games.fartbet.com',
    cGamesUrl: '/global/v-play.php',
    cUrl: '/global/casinoGamesLoad.php',
    main: {
        partnerID: '11',
        filterByProviderEnabled: false

    },
    login: {
        url: '/global/partners/rml.php'
    },
    balance: {
        url: '/global/cashier/cashier.php'
    }
});