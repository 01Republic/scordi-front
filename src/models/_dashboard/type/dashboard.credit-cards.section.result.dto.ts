import {Exclude, Expose} from 'class-transformer';
import {TypeCast} from '^types/utils/class-transformer';
import {CurrencyCode} from '^models/Money';
import {CreditCardDto} from '^models/CreditCard/type';
import {FromToQueryDto} from '^types/billing.type';

/**
 * 대시보드 / 결제수단 섹션 > 총계
 */
@Exclude()
export class DashboardCreditCardsSectionOverViewDto {
    @Expose() @TypeCast(() => String) payAmountCode: CurrencyCode; // 화폐 코드
    @Expose() @TypeCast(() => Number) payAmountSum: number; // 결제금액
    @Expose() @TypeCast(() => Number) totalItemCount: number; // 전체 결제수단 갯수
    @Expose() @TypeCast(() => Number) itemsPerPage: number; // 페이지당 결제수단 데이터 갯수
}

/**
 * 대시보드 / 결제수단 섹션 > 결제수단 항목
 */
@Exclude()
export class DashboardCreditCardsSectionItemDto {
    @Expose() @TypeCast(() => Number) id: number; // 결제수단 ID
    @Expose() @TypeCast(() => Number) organizationId: number; // 조직 ID
    @Expose() @TypeCast(() => String) payAmountCode: CurrencyCode; // 화폐 코드
    @Expose() @TypeCast(() => Number) payAmountSum: number; // 결제금액

    // relation
    @Expose() @TypeCast(() => CreditCardDto) creditCard?: CreditCardDto; // 결제수단
}

/**
 * 대시보드 / 결제수단 섹션 데이터 조회 결과
 */
@Exclude()
export class DashboardCreditCardsSectionResultDto {
    // 조회기간
    @Expose()
    @TypeCast(() => FromToQueryDto)
    query: FromToQueryDto;

    // 기간 총계
    @Expose()
    @TypeCast(() => DashboardCreditCardsSectionOverViewDto)
    total: DashboardCreditCardsSectionOverViewDto;

    // 기간 상위 n개 항목
    @Expose()
    @TypeCast(() => DashboardCreditCardsSectionItemDto)
    items: DashboardCreditCardsSectionItemDto[];
}
