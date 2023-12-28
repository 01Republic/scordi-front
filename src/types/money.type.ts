import {plainToInstance} from 'class-transformer';

export enum CurrencyCode {
    USD = 'USD', // 미국 달러
    KRW = 'KRW', // 한국 원
    EUR = 'EUR', // 유럽 유로
    GBP = 'GBP', // 영국 파운드 스털링
    CAD = 'CAD', // 캐나다 달러
    CNY = 'CNY', // 중국 위안
    JPY = 'JPY', // 일본 엔
    VND = 'VND', // 베트남 동
    ARS = 'ARS', // 아르헨티나 페소
    INR = 'INR', // 인도 루피
    TWD = 'TWD', // 대만 달러
    AUD = 'AUD', // 호주 달러
    HKD = 'HKD', // 홍콩 달러
    IDR = 'IDR', // 인도네시아 루피아
    MXN = 'MXN', // 멕시코 페소
    NZD = 'NZD', // 뉴질랜드 달러
    SGD = 'SGD', // 싱가포르 달러
    CHF = 'CHF', // 스위스 프랑
    THB = 'THB', // 태국 바트
    BRL = 'BRL', // 브라질 레알
    TRY = 'TRY', // 터키 리라
    RUB = 'RUB', // 러시아 루블
    NOK = 'NOK', // 노르웨이 크로네
    DKK = 'DKK', // 덴마크 크로네
    SEK = 'SEK', // 스웨덴 크로나
    ILS = 'ILS', // 이스라엘 세켈
    ZAR = 'ZAR', // 남아프리카 공화국 랜드
    PLN = 'PLN', // 폴란드 즐로티
    PHP = 'PHP', // 필리핀 페소
    CZK = 'CZK', // 체코 코루나
    CLP = 'CLP', // 칠레 페소
    COP = 'COP', // 콜롬비아 페소
    EGP = 'EGP', // 이집트 파운드
    MYR = 'MYR', // 말레이시아 링깃
    HUF = 'HUF', // 헝가리 포린트
    AED = 'AED', // 아랍에미리트 디르함
    SAR = 'SAR', // 사우디아라비아 리얄
    RON = 'RON', // 루마니아 레우
    BGN = 'BGN', // 불가리아 레프
}

export type CurrencyInfo = {
    code: CurrencyCode;
    symbol: string;
    local?: string;
    unit?: string;
    abbreviation?: string;
    format: string;
    desc: string;
};

// references
// https://www.newbridgefx.com/currency-codes-symbols/
// https://en.wikipedia.org/wiki/Mexican_peso
export const CurrencyListV2: {[key in CurrencyCode]: CurrencyInfo} = {
    [CurrencyCode.USD]: {
        code: CurrencyCode.USD,
        symbol: '$',
        local: 'dollar',
        format: '%s%u',
        desc: 'United States Dollar',
        unit: '달러',
    },
    [CurrencyCode.EUR]: {
        code: CurrencyCode.EUR,
        symbol: '€',
        format: '%s%u',
        desc: 'Euro (European Union)',
        unit: '유로',
    },
    [CurrencyCode.KRW]: {
        code: CurrencyCode.KRW,
        symbol: '₩',
        local: '원',
        format: '%s%u',
        desc: 'South Korean Won',
    },
    [CurrencyCode.GBP]: {
        code: CurrencyCode.GBP,
        symbol: '£',
        format: '%s%u',
        desc: 'British Pound Sterling',
        unit: '파운드',
    },
    [CurrencyCode.CAD]: {code: CurrencyCode.CAD, symbol: '$', format: '%s%u', desc: 'Canadian Dollar', unit: '달러'},
    [CurrencyCode.CNY]: {
        code: CurrencyCode.CNY,
        symbol: '¥',
        local: '元',
        format: '%s%u',
        desc: 'Chinese Yuan',
        unit: '위안',
    },
    [CurrencyCode.JPY]: {
        code: CurrencyCode.JPY,
        symbol: '¥',
        local: '円',
        format: '%s%u',
        desc: 'Japanese Yen',
        unit: '엔',
    },
    [CurrencyCode.VND]: {code: CurrencyCode.VND, symbol: '₫', format: '%s%u', desc: 'Vietnamese Dong', unit: '동'},
    [CurrencyCode.ARS]: {code: CurrencyCode.ARS, symbol: '$', format: '%s%u', desc: 'Argentine Peso', unit: '페소'},
    [CurrencyCode.INR]: {code: CurrencyCode.INR, symbol: '₹', format: '%s%u', desc: 'Indian Rupee', unit: '루피'},
    [CurrencyCode.TWD]: {
        code: CurrencyCode.TWD,
        symbol: 'NT$',
        format: '%s%u',
        desc: 'New Taiwan Dollar',
        unit: '달러',
    },
    [CurrencyCode.AUD]: {code: CurrencyCode.AUD, symbol: '$', format: '%s%u', desc: 'Australian Dollar', unit: '달러'},
    [CurrencyCode.HKD]: {code: CurrencyCode.HKD, symbol: '$', format: '%s%u', desc: 'Hong Kong Dollar', unit: '달러'},
    [CurrencyCode.IDR]: {
        code: CurrencyCode.IDR,
        symbol: 'Rp',
        format: '%s%u',
        desc: 'Indonesian Rupiah',
        unit: '루피아',
    },
    [CurrencyCode.MXN]: {code: CurrencyCode.MXN, symbol: '$', format: '%s%u', desc: 'Mexican Peso', unit: '페소'},
    [CurrencyCode.NZD]: {code: CurrencyCode.NZD, symbol: '$', format: '%s%u', desc: 'New Zealand Dollar', unit: '달러'},
    [CurrencyCode.SGD]: {code: CurrencyCode.SGD, symbol: '$', format: '%s%u', desc: 'Singapore Dollar', unit: '달러'},
    [CurrencyCode.CHF]: {code: CurrencyCode.CHF, symbol: '₣', format: '%s%u', desc: 'Swiss Franc'},
    [CurrencyCode.THB]: {code: CurrencyCode.THB, symbol: '฿', format: '%s%u', desc: 'Thai Baht', unit: '바트'},
    [CurrencyCode.BRL]: {code: CurrencyCode.BRL, symbol: 'R$', format: '%s%u', desc: 'Brazilian Real', unit: '레알'},
    [CurrencyCode.TRY]: {
        code: CurrencyCode.TRY,
        symbol: '₺',
        abbreviation: 'TL',
        format: '%s%u',
        desc: 'Turkish Lira',
        unit: '리라',
    },
    [CurrencyCode.RUB]: {code: CurrencyCode.RUB, symbol: '₽', format: '%s%u', desc: 'Russian Ruble', unit: '루블'},
    [CurrencyCode.NOK]: {code: CurrencyCode.NOK, symbol: 'kr', format: '%s%u', desc: 'Norwegian Krone', unit: '크로네'},
    [CurrencyCode.DKK]: {code: CurrencyCode.DKK, symbol: 'kr', format: '%s%u', desc: 'Danish Krone', unit: '크로네'},
    [CurrencyCode.SEK]: {code: CurrencyCode.SEK, symbol: 'kr', format: '%s%u', desc: 'Swedish Krona', unit: '크로나'},
    [CurrencyCode.ILS]: {code: CurrencyCode.ILS, symbol: '₪', format: '%s%u', desc: 'Israeli New Shekel', unit: '셰켈'},
    [CurrencyCode.ZAR]: {code: CurrencyCode.ZAR, symbol: 'R', format: '%s%u', desc: 'South African Rand', unit: '랜드'},
    [CurrencyCode.PLN]: {code: CurrencyCode.PLN, symbol: 'zł', format: '%s%u', desc: 'Polish Zloty', unit: '즐로티'},
    [CurrencyCode.PHP]: {code: CurrencyCode.PHP, symbol: '₱', format: '%s%u', desc: 'Philippine Peso', unit: '페소'},
    [CurrencyCode.CZK]: {code: CurrencyCode.CZK, symbol: 'Kč', format: '%s%u', desc: 'Czech Koruna', unit: '코루나'},
    [CurrencyCode.CLP]: {code: CurrencyCode.CLP, symbol: '$', format: '%s%u', desc: 'Chilean Peso', unit: '페소'},
    [CurrencyCode.COP]: {code: CurrencyCode.COP, symbol: '$', format: '%s%u', desc: 'Colombian Peso', unit: '페소'},
    [CurrencyCode.EGP]: {code: CurrencyCode.EGP, symbol: 'E£', format: '%s%u', desc: 'Egyptian Pound', unit: '파운드'},
    [CurrencyCode.MYR]: {
        code: CurrencyCode.MYR,
        symbol: 'RM',
        local: '令吉',
        format: '%s%u',
        desc: 'Malaysian Ringgit',
        unit: '링깃',
    },
    [CurrencyCode.HUF]: {
        code: CurrencyCode.HUF,
        symbol: 'Ft',
        format: '%s%u',
        desc: 'Hungarian Forint',
        unit: '포린트',
    },
    [CurrencyCode.AED]: {
        code: CurrencyCode.AED,
        symbol: 'د.إ',
        format: '%s%u',
        desc: 'United Arab Emirates Dirham',
        unit: '디르함',
    },
    [CurrencyCode.SAR]: {code: CurrencyCode.SAR, symbol: '﷼', format: '%s%u', desc: 'Saudi Riyal', unit: '리얄'},
    [CurrencyCode.RON]: {
        code: CurrencyCode.RON,
        symbol: 'L',
        local: 'lei',
        format: '%s%u',
        desc: 'Romanian Leu',
        unit: '레우',
    },
    [CurrencyCode.BGN]: {code: CurrencyCode.BGN, symbol: 'лв', format: '%s%u', desc: 'Bulgarian Lev', unit: '레프'},
};

export const CurrencyList = {
    en: {code: CurrencyCode.USD, symbol: '$', format: '%u%n', exchangeRate: 1},
    ko: {code: CurrencyCode.KRW, symbol: '₩', format: '%u%n', exchangeRate: 1300},
    vn: {code: CurrencyCode.VND, symbol: '₫', format: '%u%n', exchangeRate: 1},
} as const;

export class MoneyDto {
    text: string; // 금액 관련 원본 텍스트
    format: string; // 원본 문자열 형식
    amount: number; // 금액
    code: CurrencyCode; // 화폐 코드
    symbol: string; // 화폐 기호
    exchangeRate: number; // 환율
    exchangedCurrency: CurrencyCode; // 환율 기준 화폐 코드

    static dup(base: MoneyDto) {
        return plainToInstance(MoneyDto, base);
    }

    get dollar() {
        return this.amount / this.exchangeRate;
    }

    changeAmount(amount: number) {
        this.amount = amount;
        this.updateText();
        return this.amount;
    }

    updateText() {
        this.text = this.to_s();
        return this.text;
    }

    isDomestic() {
        return this.code === CurrencyCode.KRW;
    }

    isNotDomestic() {
        return !this.isDomestic();
    }

    to_s() {
        const amount = this.amount.toLocaleString();
        return this.format.replace('%u', this.symbol).replace('%n', amount);
    }
}

export class CreateMoneyRequestDto {
    text: string; // 금액 관련 원본 텍스트
    amount: number; // 금액
    code: CurrencyCode; // 화폐 코드
    exchangeRate: number; // 환율
    exchangedCurrency: CurrencyCode; // 환율 기준 화폐 코드
}

export type MoneyLike = Pick<MoneyDto, 'text' | 'format' | 'amount' | 'code' | 'symbol' | 'exchangeRate'>;

export class CreateMoneyWithSubscriptionRequestDto {
    amount: number; // 금액
    currency: CurrencyCode; // 화폐 코드
}
