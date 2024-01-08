import {plainToInstance} from 'class-transformer';
import {CurrencyCode} from './CurrencyCode.enum';

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

    isExchangeable() {
        return this.exchangedCurrency !== this.code;
    }

    isNotDomestic() {
        return !this.isDomestic();
    }

    to_s() {
        const amount = this.amount.toLocaleString();
        return this.format.replace('%u', this.symbol).replace('%n', amount);
    }
}
