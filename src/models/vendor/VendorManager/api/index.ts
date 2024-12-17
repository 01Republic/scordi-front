import {api} from '^api/api';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {
    CreateVendorManagerRequestDto,
    UpsertVendorManagerRequestDto,
    VendorManagerDto,
} from '^models/vendor/VendorManager/type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';

export const vendorManagerApi = {
    index(orgId: number, params?: FindAllQueryDto<VendorManagerDto>) {
        const url = `organizations/${orgId}/vendor-managers`;
        return api.get(url, {params}).then(paginatedDtoOf(VendorManagerDto));
    },

    show(orgId: number, id: number) {
        const url = `organizations/${orgId}/vendor-managers/${id}`;
        return api.get(url).then(oneDtoOf(VendorManagerDto));
    },

    // 벤더사 담당자 생성
    create(orgId: number, dto: CreateVendorManagerRequestDto) {
        const url = `organizations/${orgId}/vendor-managers`;
        return api.post(url, dto).then(oneDtoOf(VendorManagerDto));
    },

    // 벤더사 담당자 수정 또는 생성 (벤더사 생성포함)
    upsert(orgId: number, dto: UpsertVendorManagerRequestDto) {
        const url = `organizations/${orgId}/vendor-managers`;
        return api.put(url, dto).then(oneDtoOf(VendorManagerDto));
    },

    update(orgId: number, id: number) {
        const url = `organizations/${orgId}/vendor-managers/${id}`;
        return api.patch(url).then(oneDtoOf(VendorManagerDto));
    },

    destroy(orgId: number, id: number) {
        const url = `organizations/${orgId}/vendor-managers/${id}`;
        return api.delete(url).then(oneDtoOf(VendorManagerDto));
    },
};
