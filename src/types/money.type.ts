export enum Currency {
    VND = 'VND',
    USD = 'USD',
    KRW = 'KRW',
}

export const CurrencyList = {
    en: {code: Currency.USD, symbol: '$', format: '%u%n', exchangeRate: 1},
    ko: {code: Currency.KRW, symbol: '₩', format: '%u%n', exchangeRate: 1300},
    vn: {code: Currency.VND, symbol: '₫', format: '%u%n', exchangeRate: 1},
} as const;

export type MoneyDto = {
    text: string; // 금액 관련 원본 텍스트
    format: string; // 원본 문자열 형식
    amount: number; // 금액
    code: Currency; // 화폐 코드
    symbol: string; // 화폐 기호
    exchangeRate: number; // 달러 환율
};

export type CreateMoneyRequestDto = {
    text: string; // 금액 관련 원본 텍스트
    amount: number; // 금액
    code: Currency; // 화폐 코드
    exchangeRate: number; // 달러 대비 환율
};

export type MoneyLike = Pick<MoneyDto, 'text' | 'format' | 'amount' | 'code' | 'symbol' | 'exchangeRate'>;
