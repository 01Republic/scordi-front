import {ProductDto} from '^models/Product/type';
import {ReportGroupedByProductMemberDto} from './report.grouped-by-product-member.dto';

export class ReportGroupedByProductItemDto {
    key: string;
    appName: string;
    product?: ProductDto;
    members: ReportGroupedByProductMemberDto[];

    isPersisted = true;
    isEdited = false;
    isNew = false;

    get memberList() {
        return this.members.filter((member) => member.email !== 'noname');
    }
}
