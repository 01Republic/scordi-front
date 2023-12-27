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
    },
    [CurrencyCode.EUR]: {code: CurrencyCode.EUR, symbol: '€', format: '%s%u', desc: 'Euro (European Union)'},
    [CurrencyCode.KRW]: {
        code: CurrencyCode.KRW,
        symbol: '₩',
        local: '원',
        format: '%s%u',
        desc: 'South Korean Won',
    },
    [CurrencyCode.GBP]: {code: CurrencyCode.GBP, symbol: '£', format: '%s%u', desc: 'British Pound Sterling'},
    [CurrencyCode.CAD]: {code: CurrencyCode.CAD, symbol: '$', format: '%s%u', desc: 'Canadian Dollar'},
    [CurrencyCode.CNY]: {code: CurrencyCode.CNY, symbol: '¥', local: '元', format: '%s%u', desc: 'Chinese Yuan'},
    [CurrencyCode.JPY]: {code: CurrencyCode.JPY, symbol: '¥', local: '円', format: '%s%u', desc: 'Japanese Yen'},
    [CurrencyCode.VND]: {code: CurrencyCode.VND, symbol: '₫', format: '%s%u', desc: 'Vietnamese Dong'},
    [CurrencyCode.ARS]: {code: CurrencyCode.ARS, symbol: '$', format: '%s%u', desc: 'Argentine Peso'},
    [CurrencyCode.INR]: {code: CurrencyCode.INR, symbol: '₹', format: '%s%u', desc: 'Indian Rupee'},
    [CurrencyCode.TWD]: {code: CurrencyCode.TWD, symbol: 'NT$', format: '%s%u', desc: 'New Taiwan Dollar'},
    [CurrencyCode.AUD]: {code: CurrencyCode.AUD, symbol: '$', format: '%s%u', desc: 'Australian Dollar'},
    [CurrencyCode.HKD]: {code: CurrencyCode.HKD, symbol: '$', format: '%s%u', desc: 'Hong Kong Dollar'},
    [CurrencyCode.IDR]: {code: CurrencyCode.IDR, symbol: 'Rp', format: '%s%u', desc: 'Indonesian Rupiah'},
    [CurrencyCode.MXN]: {code: CurrencyCode.MXN, symbol: '$', format: '%s%u', desc: 'Mexican Peso'},
    [CurrencyCode.NZD]: {code: CurrencyCode.NZD, symbol: '$', format: '%s%u', desc: 'New Zealand Dollar'},
    [CurrencyCode.SGD]: {code: CurrencyCode.SGD, symbol: '$', format: '%s%u', desc: 'Singapore Dollar'},
    [CurrencyCode.CHF]: {code: CurrencyCode.CHF, symbol: '₣', format: '%s%u', desc: 'Swiss Franc'},
    [CurrencyCode.THB]: {code: CurrencyCode.THB, symbol: '฿', format: '%s%u', desc: 'Thai Baht'},
    [CurrencyCode.BRL]: {code: CurrencyCode.BRL, symbol: 'R$', format: '%s%u', desc: 'Brazilian Real'},
    [CurrencyCode.TRY]: {code: CurrencyCode.TRY, symbol: '₺', abbreviation: 'TL', format: '%s%u', desc: 'Turkish Lira'},
    [CurrencyCode.RUB]: {code: CurrencyCode.RUB, symbol: '₽', format: '%s%u', desc: 'Russian Ruble'},
    [CurrencyCode.NOK]: {code: CurrencyCode.NOK, symbol: 'kr', format: '%s%u', desc: 'Norwegian Krone'},
    [CurrencyCode.DKK]: {code: CurrencyCode.DKK, symbol: 'kr', format: '%s%u', desc: 'Danish Krone'},
    [CurrencyCode.SEK]: {code: CurrencyCode.SEK, symbol: 'kr', format: '%s%u', desc: 'Swedish Krona'},
    [CurrencyCode.ILS]: {code: CurrencyCode.ILS, symbol: '₪', format: '%s%u', desc: 'Israeli New Shekel'},
    [CurrencyCode.ZAR]: {code: CurrencyCode.ZAR, symbol: 'R', format: '%s%u', desc: 'South African Rand'},
    [CurrencyCode.PLN]: {code: CurrencyCode.PLN, symbol: 'zł', format: '%s%u', desc: 'Polish Zloty'},
    [CurrencyCode.PHP]: {code: CurrencyCode.PHP, symbol: '₱', format: '%s%u', desc: 'Philippine Peso'},
    [CurrencyCode.CZK]: {code: CurrencyCode.CZK, symbol: 'Kč', format: '%s%u', desc: 'Czech Koruna'},
    [CurrencyCode.CLP]: {code: CurrencyCode.CLP, symbol: '$', format: '%s%u', desc: 'Chilean Peso'},
    [CurrencyCode.COP]: {code: CurrencyCode.COP, symbol: '$', format: '%s%u', desc: 'Colombian Peso'},
    [CurrencyCode.EGP]: {code: CurrencyCode.EGP, symbol: 'E£', format: '%s%u', desc: 'Egyptian Pound'},
    [CurrencyCode.MYR]: {
        code: CurrencyCode.MYR,
        symbol: 'RM',
        local: '令吉',
        format: '%s%u',
        desc: 'Malaysian Ringgit',
    },
    [CurrencyCode.HUF]: {code: CurrencyCode.HUF, symbol: 'Ft', format: '%s%u', desc: 'Hungarian Forint'},
    [CurrencyCode.AED]: {code: CurrencyCode.AED, symbol: 'د.إ', format: '%s%u', desc: 'United Arab Emirates Dirham'},
    [CurrencyCode.SAR]: {code: CurrencyCode.SAR, symbol: '﷼', format: '%s%u', desc: 'Saudi Riyal'},
    [CurrencyCode.RON]: {code: CurrencyCode.RON, symbol: 'L', local: 'lei', format: '%s%u', desc: 'Romanian Leu'},
    [CurrencyCode.BGN]: {code: CurrencyCode.BGN, symbol: 'лв', format: '%s%u', desc: 'Bulgarian Lev'},
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
