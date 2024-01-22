import {PartialType} from '^types/utils/partial-type';
import {CreateBillingHistoryRequestDtoV2} from '^models/BillingHistory/type/create-billing-history.request.dto.v2';
import {OmitType} from '^types/utils/omit-type';
import {CreateMoneyRequestDto, CurrencyCode} from '^models/Money';
import {plainToInstance} from 'class-transformer';

export class CreateBillingHistoryByCardReceiptDto extends PartialType(
    OmitType(CreateBillingHistoryRequestDtoV2, ['payAmount', 'vatAmount']),
) {
    domesticAmount: number;
    abroadAmount?: number;
    exchangedCurrency?: string;
    vatAmount?: number;

    get payAmount(): CreateMoneyRequestDto {
        return plainToInstance(CreateMoneyRequestDto, {
            text: `${this.domesticAmount}`,
            amount: this.domesticAmount,
            code: CurrencyCode.KRW,
            exchangeRate: this.domesticAmount / (this.abroadAmount ?? this.domesticAmount),
            exchangedCurrency: this.exchangedCurrency ?? CurrencyCode.KRW,
        });
    }

    get vatAmountDto(): CreateMoneyRequestDto | undefined {
        if (!this.vatAmount) return undefined;

        return plainToInstance(CreateMoneyRequestDto, {
            text: `${this.vatAmount}`,
            amount: this.vatAmount,
            code: CurrencyCode.KRW,
            exchangeRate: 1,
            exchangedCurrency: CurrencyCode.KRW,
        });
    }
}
