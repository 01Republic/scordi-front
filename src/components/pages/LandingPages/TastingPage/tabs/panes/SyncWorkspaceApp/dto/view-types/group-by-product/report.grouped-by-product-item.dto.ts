import {ProductDto} from '^models/Product/type';
import {ReportGroupedByProductMemberDto} from './report.grouped-by-product-member.dto';
import {ReportItemFormDataDto} from '../../../../SyncWorkspaceApp/dto/report-item-form.dto';

export class ReportGroupedByProductItemDto {
    key: string;
    appName: string;
    product?: ProductDto;
    members: ReportGroupedByProductMemberDto[];

    isPersisted = true;
    isEdited = false;
    isNew = false;

    formData: ReportItemFormDataDto;

    get memberList() {
        return this.members.filter((member) => member.email !== 'noname');
    }
}
