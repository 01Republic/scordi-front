import {BillingHistoryDto} from '^models/BillingHistory/type';
import {OmitType} from '^types/utils/omit-type';
import {CurrencyCode} from '^models/Money';

export class BillingHistoryByCardReceiptDto extends OmitType(BillingHistoryDto, [
    'invoiceApp',
    'invoiceAppId',
    'invoiceUrl',
    'emailOriginId',
    'emailContent',
    'vatAmount',
]) {
    domesticAmount: number;
    abroadAmount?: number;
    exchangedCurrency?: CurrencyCode;
    vatAmount?: number;

    /**
     * Notice. 24.01.05
     * code 와 exchangedCurrency 둘 다 원화가 아닌 경우에 대한 대응이 필요함.
     * 즉, 금액이 10$ 이고, 기준 화폐가 유로인 경우 domesticAmount 를 표현해선 안 됨.
     * 하지만 당장 에러를 띄우거나 null 값을 리턴할 수도 없는 노릇이라 우선 로직을 진행합니다.
     *
     * 추후, BillingHistoryDto 의 Subtype 에 따른 로직 분리가 이루어져야 합니다.
     * 위의 경우는 CardReceipt Subtype 보단 Email Invoice Subtype 에서 발생할 가능성이 높습니다.
     */
    constructor(billingHistory: BillingHistoryDto) {
        super(billingHistory);

        const {payAmount, vatAmount} = billingHistory;
        // if (!payAmount) throw new Error('payAmount is null');

        const code = payAmount?.code;
        const amount = payAmount?.amount || 0;
        const exchangeRate = payAmount?.exchangeRate || 1;
        const exchangedCurrency = payAmount?.exchangedCurrency;
        const isDomestic = payAmount ? code === CurrencyCode.KRW : true;
        const isExchangeable = isDomestic && exchangedCurrency !== code && exchangeRate !== 1;

        this.domesticAmount = amount;
        this.abroadAmount = isExchangeable ? amount / exchangeRate : undefined;
        this.exchangedCurrency = this.abroadAmount ? exchangedCurrency : CurrencyCode.KRW;
        this.vatAmount = vatAmount?.amount;
    }
}
