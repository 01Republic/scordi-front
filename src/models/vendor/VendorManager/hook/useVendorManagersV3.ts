import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';
import {FindAllVendorManagersQueryDto, VendorManagerDto} from '^models/vendor/VendorManager/type';
import {vendorManagerApi} from '^models/vendor/VendorManager/api';

export const useVendorManagersV3 = (
    atoms: PagedResourceAtoms<VendorManagerDto, FindAllVendorManagersQueryDto>,
    mergeMode = false,
) => {
    return usePagedResource(atoms, {
        useOrgId: true,
        endpoint: (params, orgId) => vendorManagerApi.index(orgId, params),
        buildQuery: (params, orgId) => {
            return params;
        },
        getId: 'id',
        mergeMode,
    });
};
