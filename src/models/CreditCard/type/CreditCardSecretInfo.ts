export class CreditCardSecretInfo {
    number1?: string;
    number2?: string;
    number3?: string;
    number4?: string;
    password?: string;
    cvc?: string;
    expiry?: string;

    get fullNumber(): string {
        const number1 = this.number1 || '****';
        const number2 = this.number2 || '****';
        const number3 = this.number3 || '****';
        const number4 = this.number4 || '****';

        return `${number1}-${number2}-${number3}-${number4}`;
    }
}
