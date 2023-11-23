import {ProductDto} from '^models/Product/type';
import {ReportGroupedByProductMemberDto} from './report.grouped-by-product-member.dto';

export class ReportGroupedByProductItemDto {
    key: string;
    appName: string;
    product?: ProductDto;
    members: ReportGroupedByProductMemberDto[];
}
