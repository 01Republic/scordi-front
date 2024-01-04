import {PartialType} from '^types/utils/partial-type';
import {CreateBillingHistoryRequestDtoV2} from './create-billing-history.request.dto.v2';
import {CurrencyCode, MoneyDto} from '^types/money.type';
import {plainToInstance} from 'class-transformer';

export class UpdateBillingHistoryRequestDtoV3 extends PartialType(CreateBillingHistoryRequestDtoV2) {}

export type CardReceiptPayAmount = {
    domesticAmount: number;
    abroadAmount?: number;
    exchangedCurrency?: CurrencyCode;
};

export const getPayAmount = (payAmount: CardReceiptPayAmount) => {
    const {domesticAmount, abroadAmount, exchangedCurrency} = payAmount;
    return plainToInstance(MoneyDto, {
        text: `${domesticAmount}`,
        amount: domesticAmount,
        code: CurrencyCode.KRW,
        exchangeRate: domesticAmount / (abroadAmount ?? domesticAmount),
        exchangedCurrency: exchangedCurrency ?? CurrencyCode.KRW,
    });
};

/**
 * Notice. 24.01.05
 * code 와 exchangedCurrency 둘 다 원화가 없는 경우에 대한 대응이 안 되어 있음.
 * 즉, 금액이 10$ 이고, 기준 화폐가 유로인 경우 domesticAmount 를 표현해선 안 됨.
 * 하지만 당장 에러를 띄우거나 null 값을 리턴할 수도 없는 노릇이라 우선 로직을 진행합니다.
 *
 * 추후, BillingHistoryDto 의 Subtype 에 따른 로직 분리가 이루어져야 합니다.
 * 위의 경우는 CardReceipt Subtype 보단 Email Invoice Subtype 에서 발생할 가능성이 높습니다.
 */
export const getPayAmounts = (payAmount: MoneyDto) => {
    const {code, amount, exchangeRate, exchangedCurrency} = payAmount;
    const isDomestic = code === CurrencyCode.KRW;
    const isExchangeable = exchangedCurrency !== code;

    if (isDomestic) {
        return {
            domesticAmount: amount,
            abroadAmount: isExchangeable ? amount * exchangeRate : undefined,
            exchangedCurrency,
        };
    } else {
        return {
            domesticAmount: amount / exchangeRate,
            abroadAmount: amount,
            exchangedCurrency,
        };
    }
};
