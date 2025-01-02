import {Exclude, Expose} from 'class-transformer';
import {TypeCast} from '^types/utils/class-transformer';
import {MoneyDto} from '^models/Money';
import {CreditCardDto} from '^models/CreditCard/type';
import {FromToQueryDto} from '^types/billing.type';

@Exclude()
export class DashboardCreditCardsSectionOverViewDto {
    @Expose() @TypeCast(() => String) payAmountCode: MoneyDto['code'];
    @Expose() @TypeCast(() => Number) payAmountSum: MoneyDto['amount'];
    @Expose() @TypeCast(() => Number) totalItemCount: number;
    @Expose() @TypeCast(() => Number) itemsPerPage: number;
}

@Exclude()
export class DashboardCreditCardsSectionItemDto {
    @Expose() @TypeCast(() => Number) id: number; // credit-card id
    @Expose() @TypeCast(() => Number) organizationId: number;
    @Expose() @TypeCast(() => String) payAmountCode: MoneyDto['code'];
    @Expose() @TypeCast(() => Number) payAmountSum: MoneyDto['amount'];

    // relation
    @Expose() @TypeCast(() => CreditCardDto) creditCard?: CreditCardDto;
}

@Exclude()
export class DashboardCreditCardsSectionResultDto {
    @Expose()
    @TypeCast(() => FromToQueryDto)
    query: FromToQueryDto;

    @Expose()
    @TypeCast(() => DashboardCreditCardsSectionOverViewDto)
    total: DashboardCreditCardsSectionOverViewDto;

    @Expose()
    @TypeCast(() => DashboardCreditCardsSectionItemDto)
    items: DashboardCreditCardsSectionItemDto[];
}
