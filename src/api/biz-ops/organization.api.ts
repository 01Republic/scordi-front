import {api} from '^api/api';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {OrganizationDto} from '^types/organization.type';
import {Paginated} from '^types/utils/paginated.dto';
import {TaskFileDto} from '^api/biz-ops/progress.api';

export default {
    collectionPath: () => '/biz-ops/organizations',
    memberPath: (id: number) => `/biz-ops/organizations/${id}`,

    index(params?: FindAllQueryDto<OrganizationDto>) {
        return api.get<Paginated<OrganizationDto>>(this.collectionPath(), {params});
    },

    excelToNotion(data: ExcelToNotionRequestDto) {
        const url = `${this.collectionPath()}/excel-to-notion`;
        return api.post<TaskFileDto>(url, data, {
            headers: {'Content-Type': 'multipart/form-data'},
        });
    },

    destroy(id: number) {
        return api.delete(this.memberPath(id));
    },
};

export type ExcelToNotionRequestDto = {
    approvedListFile: File;
    overseasPurchaseListFile: File;
};
