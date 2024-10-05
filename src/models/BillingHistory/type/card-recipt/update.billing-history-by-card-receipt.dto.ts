import {PartialType} from '^types/utils/partial-type';
import {OmitType} from '^types/utils/omit-type';
import {CreateMoneyRequestDto, CurrencyCode} from '^models/Money';
import {plainToInstance} from 'class-transformer';
import {UpdateBillingHistoryRequestDtoV2} from '^models/BillingHistory/type/update-billing-history.request.dto.v2';

export class UpdateBillingHistoryByCardReceiptDto extends PartialType(
    OmitType(UpdateBillingHistoryRequestDtoV2, ['payAmount', 'vatAmount']),
) {
    domesticAmount: number;
    abroadAmount?: number;
    exchangedCurrency?: CurrencyCode;
    vatAmount?: number;

    get _exchangeRate() {
        if (!this.abroadAmount) return 1;
        if (this.abroadAmount <= 0) return 1;
        return this.domesticAmount / this.abroadAmount;
    }
    get payAmount(): CreateMoneyRequestDto {
        const exchangeRate = this._exchangeRate;
        return plainToInstance(CreateMoneyRequestDto, {
            text: `${this.domesticAmount}`,
            amount: this.domesticAmount,
            code: CurrencyCode.KRW,
            exchangeRate,
            exchangedCurrency: exchangeRate === 1 ? CurrencyCode.KRW : this.exchangedCurrency,
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

    toRequestDto(): UpdateBillingHistoryRequestDtoV2 {
        const {domesticAmount, abroadAmount, exchangedCurrency, vatAmount, ...data} = this;
        return plainToInstance(UpdateBillingHistoryRequestDtoV2, {
            ...data,
            payAmount: this.payAmount,
            vatAmount: this.vatAmountDto,
        });
    }
}
