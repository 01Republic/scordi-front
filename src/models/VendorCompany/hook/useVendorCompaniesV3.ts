import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';
import {FindAllVendorCompaniesQueryDto, VendorCompanyDto} from '^models/VendorCompany/type';
import {vendorCompanyApi} from '^models/VendorCompany/api';

export const useVendorCompaniesV3 = (
    atoms: PagedResourceAtoms<VendorCompanyDto, FindAllVendorCompaniesQueryDto>,
    mergeMode = false,
) => {
    return usePagedResource(atoms, {
        useOrgId: true,
        endpoint: (params, orgId) => vendorCompanyApi.index(orgId, params),
        buildQuery: (params, orgId) => {
            params.where = {organizationId: orgId, ...params.where};
            return params;
        },
        getId: 'id',
        mergeMode,
    });
};
