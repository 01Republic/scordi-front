import {Exclude, Expose} from 'class-transformer';
import {TypeCast} from '^types/utils/class-transformer';
import {FromToQueryDto} from '^types/billing.type';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {ProductDto} from '^models/Product/type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';

/**
 * 대시보드 / 청구서계정 섹션 > 청구서계정 항목
 */
@Exclude()
export class DashboardInvoiceAccountsSectionItemDto {
    @Expose() @TypeCast(() => Number) invoiceAccountId: number; // 청구서계정 ID
    @Expose() @TypeCast(() => Number) organizationId: number; // 조직 ID
    @Expose() @TypeCast(() => Number) productId: number | null; // 대표 서비스 ID
    @Expose() @TypeCast(() => Number) subscriptionCount: number; // 구독 갯수

    // relation
    @Expose() @TypeCast(() => InvoiceAccountDto) invoiceAccount: InvoiceAccountDto; // 청구서계정
    @Expose() @TypeCast(() => ProductDto) product: ProductDto | null; // 대표 서비스 (구독 갯수가 0인 경우, 제시할 서비스가 없으므로 null 로 표기)
}

export class DashboardInvoiceAccountsSectionQueryDto extends FindAllQueryDto<DashboardInvoiceAccountsSectionItemDto> {
    // @ApiProperty({ description: '기간 시작일' })
    // @IsDateString()
    // from: Date;
    //
    // @ApiProperty({ description: '기간 종료일' })
    // @IsDateString()
    // to: Date;
}
