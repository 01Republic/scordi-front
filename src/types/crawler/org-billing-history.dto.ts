import {CurrencyDto} from '^types/crawler/currency.dto';

export class OrgBillingHistoryDto {
    uid!: string;
    issuedDate!: Date;
    paymentMethod!: string;
    amount!: CurrencyDto;
    isSuccessfulPaid!: boolean;
    receiptUrl!: string;
}
