import {plainToInstance} from 'class-transformer';
import {CurrencyCode} from './CurrencyCode.enum';
import {CurrencyList} from '^models/Money';

export class MoneyDto {
    text: string; // 금액 관련 원본 텍스트
    format: string; // 원본 문자열 형식
    amount: number; // 금액
    code: CurrencyCode; // 화폐 코드
    symbol: string; // 화폐 기호
    exchangeRate: number; // 환율
    exchangedCurrency: CurrencyCode; // 환율 기준 화폐 코드
    dollarPrice: number; // 달러 환산 금액

    static dup(base: Partial<MoneyDto>) {
        return plainToInstance(MoneyDto, base);
    }

    get originalAmount() {
        return this.amount / this.exchangeRate;
    }

    // 화폐에 따라서 출력시 허용되는 소숫점 자릿수가 다릅니다.
    // (예를들어 원화는 출력시 정수만 허용합니다.)
    get roundedAmount() {
        const onlyInteger = [CurrencyCode.KRW].includes(this.code);
        if (onlyInteger) return Math.round(this.amount);

        return this.amount;
    }

    get dollar() {
        // const currentCurrency = Object.values(CurrencyList).find((item) => item.code === this.code);
        // const dollarExchangeRate = currentCurrency?.exchangeRate || 1;
        // return this.amount / dollarExchangeRate;
        return this.dollarPrice || 0;
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

    to_s(format?: string) {
        const amount = this.roundedAmount.toLocaleString();
        return (format || this.format).replace('%u', this.symbol).replace('%n', amount);
    }

    /**
     * 환율 계산하는 부분 리팩토링이 필요함.
     * 현재로서는 정적인 달러 변환만 유효한 상태.
     */
    toDisplayPrice(currencyCode = CurrencyCode.KRW) {
        if (!this.amount) return 0;

        // 얻으려는 화폐와 실결제된 화폐가 같으면 그대로 가격을 반환하고
        if (this.code === currencyCode) return this.roundedAmount;

        // 얻으려는 화폐가 달러라면, 미리 입력된 달러값으로 반환하고
        if (currencyCode === CurrencyCode.USD) return this.dollar;

        // 얻으려는 화폐와 서비스의 화폐가 같으면, 기록해둔 환율로 계산해 반환하고
        if (this.exchangedCurrency === currencyCode) return this.amount / this.exchangeRate;

        const targetCurrency = Object.values(CurrencyList).find((item) => item.code === currencyCode);
        const dollarExchangeRate = targetCurrency?.exchangeRate || 1;
        return this.dollar * dollarExchangeRate;
    }
}
