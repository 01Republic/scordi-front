import {CurrencyDto} from '^types/crawler/currency.dto';

export class WorkspaceBillingHistoryDto {
    uid!: string;
    issuedDate!: Date;
    paidDate?: Date | null;
    paymentMethod!: string;
    amount!: CurrencyDto;
    isSuccessfulPaid!: boolean;
    receiptUrl!: string;
}
