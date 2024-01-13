import {FindAllInvoiceAccountQueryDto, InvoiceAccountDto} from '^models/InvoiceAccount/type';

import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {invoiceAccountListAtom} from '^models/InvoiceAccount/atom';
import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';

export const useInvoiceAccounts = () => useInvoiceAccountsV3(invoiceAccountListAtom);

export const useInvoiceAccountsV3 = (
    atoms: PagedResourceAtoms<InvoiceAccountDto, FindAllInvoiceAccountQueryDto>,
    mergeMode = false,
) => {
    return usePagedResource(atoms, {
        useOrgId: true,
        endpoint: (params, orgId) => invoiceAccountApi.index(orgId, params),
        getId: 'id',
        mergeMode,
    });
};
