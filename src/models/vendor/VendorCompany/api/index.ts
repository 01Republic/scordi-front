import {CreateVendorCompanyRequestDto, UpdateVendorCompanyRequestDto, VendorCompanyDto} from '../type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {api} from '^api/api';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';

export const vendorCompanyApi = {
    index(orgId: number, params?: FindAllQueryDto<VendorCompanyDto>) {
        const url = `organizations/${orgId}/vendor-companies`;
        return api.get(url, {params}).then(paginatedDtoOf(VendorCompanyDto));
    },

    show(orgId: number, id: number) {
        const url = `organizations/${orgId}/vendor-companies/${id}`;
        return api.get(url).then(oneDtoOf(VendorCompanyDto));
    },

    create(orgId: number, dto: CreateVendorCompanyRequestDto) {
        const url = `organizations/${orgId}/vendor-companies`;
        return api.post(url, dto).then(oneDtoOf(VendorCompanyDto));
    },

    upsert(orgId: number, dto: CreateVendorCompanyRequestDto) {
        const url = `organizations/${orgId}/vendor-companies`;
        return api.put(url, dto).then(oneDtoOf(VendorCompanyDto));
    },

    update(orgId: number, id: number, dto: UpdateVendorCompanyRequestDto) {
        const url = `organizations/${orgId}/vendor-companies/${id}`;
        return api.patch(url, dto).then(oneDtoOf(VendorCompanyDto));
    },

    destroy(orgId: number, id: number) {
        const url = `organizations/${orgId}/vendor-companies/${id}`;
        return api.delete(url).then(oneDtoOf(VendorCompanyDto));
    },
};
