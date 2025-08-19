import {CurrencyCode} from './CurrencyCode.enum';
import {CurrencyInfo} from './CurrencyInfo.type';

// Deprecated
export const CurrencyList = {
    en: {code: CurrencyCode.USD, symbol: '$', format: '%u%n', exchangeRate: 1},
    ko: {code: CurrencyCode.KRW, symbol: '₩', format: '%u%n', exchangeRate: 1300},
    vn: {code: CurrencyCode.VND, symbol: '₫', format: '%u%n', exchangeRate: 1},
} as const;

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
        unit: '원',
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
    [CurrencyCode.CHF]: {code: CurrencyCode.CHF, symbol: '₣', format: '%s%u', desc: 'Swiss Franc', unit: '프랑'},
    [CurrencyCode.THB]: {code: CurrencyCode.THB, symbol: '฿', format: '%s%u', desc: 'Thai Baht', unit: '밧'},
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

export const currencyDecimalMap: Record<CurrencyCode, number> = {
    [CurrencyCode.USD]: 2, // 미국 달러
    [CurrencyCode.KRW]: 0, // 한국 원
    [CurrencyCode.EUR]: 2, // 유럽 유로
    [CurrencyCode.JPY]: 0, // 일본 엔
    [CurrencyCode.GBP]: 2, // 영국 파운드 스털링
    [CurrencyCode.CAD]: 2, // 캐나다 달러
    [CurrencyCode.CNY]: 2, // 중국 위안
    [CurrencyCode.VND]: 0, // 베트남 동
    [CurrencyCode.ARS]: 2, // 아르헨티나 페소
    [CurrencyCode.INR]: 2, // 인도 루피
    [CurrencyCode.TWD]: 2, // 대만 달러
    [CurrencyCode.AUD]: 2, // 호주 달러
    [CurrencyCode.HKD]: 2, // 홍콩 달러
    [CurrencyCode.IDR]: 2, // 인도네시아 루피아
    [CurrencyCode.MXN]: 2, // 멕시코 페소
    [CurrencyCode.NZD]: 2, // 뉴질랜드 달러
    [CurrencyCode.SGD]: 2, // 싱가포르 달러
    [CurrencyCode.CHF]: 2, // 스위스 프랑
    [CurrencyCode.THB]: 2, // 태국 바트
    [CurrencyCode.BRL]: 2, // 브라질 레알
    [CurrencyCode.TRY]: 2, // 터키 리라
    [CurrencyCode.RUB]: 2, // 러시아 루블
    [CurrencyCode.NOK]: 2, // 노르웨이 크로네
    [CurrencyCode.DKK]: 2, // 덴마크 크로네
    [CurrencyCode.SEK]: 2, // 스웨덴 크로나
    [CurrencyCode.ILS]: 2, // 이스라엘 세켈
    [CurrencyCode.ZAR]: 2, // 남아프리카 랜드
    [CurrencyCode.PLN]: 2, // 폴란드 즐로티
    [CurrencyCode.PHP]: 2, // 필리핀 페소
    [CurrencyCode.CZK]: 2, // 체코 코루나
    [CurrencyCode.CLP]: 2, // 칠레 페소
    [CurrencyCode.COP]: 2, // 콜롬비아 페소
    [CurrencyCode.EGP]: 2, // 이집트 파운드
    [CurrencyCode.MYR]: 2, // 말레이시아 링깃
    [CurrencyCode.HUF]: 2, // 헝가리 포린트
    [CurrencyCode.AED]: 2, // 아랍에미리트 디르함
    [CurrencyCode.SAR]: 2, // 사우디 리얄
    [CurrencyCode.RON]: 2, // 루마니아 레우
    [CurrencyCode.BGN]: 2, // 불가리아 레프
};
