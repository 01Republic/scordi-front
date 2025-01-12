import {Exclude, Expose} from 'class-transformer';
import {TypeCast} from '^types/utils/class-transformer';
import {FromToQueryDto} from '^types/billing.type';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {ProductDto} from '^models/Product/type';

/**
 * 대시보드 / 청구서계정 섹션 > 총계
 */
@Exclude()
export class DashboardInvoiceAccountsSectionOverViewDto {
    @Expose() @TypeCast(() => Number) billingHistoryCount: number; // 결제 건수
    @Expose() @TypeCast(() => Number) totalItemCount: number; // 전체 청구서계정 갯수
    @Expose() @TypeCast(() => Number) itemsPerPage: number; // 페이지당 청구서계정 데이터 갯수
}

/**
 * 대시보드 / 청구서계정 섹션 > 청구서계정 항목
 */
@Exclude()
export class DashboardInvoiceAccountsSectionItemDto {
    @Expose() @TypeCast(() => Number) id: number; // 청구서계정 ID
    @Expose() @TypeCast(() => Number) organizationId: number; // 조직 ID
    @Expose() @TypeCast(() => Number) productId: number | null; // 대표 서비스 ID
    @Expose() @TypeCast(() => Number) billingHistoryCount: number; // 결제 건수

    // relation
    @Expose() @TypeCast(() => InvoiceAccountDto) invoiceAccount?: InvoiceAccountDto; // 청구서계정
    @Expose() @TypeCast(() => ProductDto) product?: ProductDto; // 대표 서비스
}

/**
 * 대시보드 / 청구서계정 섹션 데이터 조회 결과
 */
@Exclude()
export class DashboardInvoiceAccountsSectionResultDto {
    // 조회기간
    @Expose()
    @TypeCast(() => FromToQueryDto)
    query: FromToQueryDto;

    // 기간 총계
    @Expose()
    @TypeCast(() => DashboardInvoiceAccountsSectionOverViewDto)
    total: DashboardInvoiceAccountsSectionOverViewDto;

    // 기간 상위 n개 항목
    @Expose()
    @TypeCast(() => DashboardInvoiceAccountsSectionItemDto)
    items: DashboardInvoiceAccountsSectionItemDto[];
}
