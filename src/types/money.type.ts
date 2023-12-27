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
}

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
