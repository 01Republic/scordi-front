import {PartialType} from '^types/utils/partial-type';
import {OmitType} from '^types/utils/omit-type';
import {CreateMoneyRequestDto, CurrencyCode} from '^models/Money';
import {plainToInstance} from 'class-transformer';
import {UpdateBillingHistoryRequestDtoV3} from '^models/BillingHistory/type/update-billing-history.request.dto.v2';

export class UpdateBillingHistoryByCardReceiptDto extends PartialType(
    OmitType(UpdateBillingHistoryRequestDtoV3, ['payAmount', 'vat']),
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

    get vat(): CreateMoneyRequestDto | undefined {
        if (!this.vatAmount) return undefined;

        return plainToInstance(CreateMoneyRequestDto, {
            text: `${this.vatAmount}`,
            amount: this.vatAmount,
            code: CurrencyCode.KRW,
            exchangeRate: 1,
            exchangedCurrency: CurrencyCode.KRW,
        });
    }

    toRequestDto(): UpdateBillingHistoryRequestDtoV3 {
        const {domesticAmount, abroadAmount, exchangedCurrency, vatAmount, ...data} = this;
        return plainToInstance(UpdateBillingHistoryRequestDtoV3, {
            ...data,
            payAmount: this.payAmount,
            vat: this.vat,
        });
    }
}
