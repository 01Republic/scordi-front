import {usePagedResource} from '^hooks/usePagedResource';
import {productApi} from '^models/Product/api';
import {searchProductResultsAtom} from '^admin/factories/codef-bank-account-parsers/form/SearchProductPanel/atom';

export const useSearchProductInCodefBankAccountParser = () =>
    usePagedResource(searchProductResultsAtom, {
        getId: 'id',
        useOrgId: false,
        endpoint: (params) => productApi.index(params),
        buildQuery: (params) => params,
    });
