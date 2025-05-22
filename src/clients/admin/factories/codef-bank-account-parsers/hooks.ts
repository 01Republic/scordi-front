import {usePagedResource} from '^hooks/usePagedResource';
import {productApi} from '^models/Product/api';
import {searchProductResultsAtom} from '^admin/factories/codef-bank-account-parsers/form/SearchProductPanel/atom';
import {useQuery} from '@tanstack/react-query';
import {adminCodefBankAccountParserApi} from '^models/_codef/CodefBankAccountParser/api';
import {useRecoilState} from 'recoil';
import {codefBankAccountParserAtom} from '^admin/factories/codef-bank-account-parsers/atoms';

export const useCodefBankAccountParser = (id: number) => {
    return useQuery({
        queryKey: ['codef-bank-account-parser', id],
        queryFn: () => adminCodefBankAccountParserApi.show(id).then((res) => res.data),
    });
};

export const useCurrentBankAccountParser = () => {
    return useRecoilState(codefBankAccountParserAtom);
};

export const useSearchProductInCodefBankAccountParser = () =>
    usePagedResource(searchProductResultsAtom, {
        getId: 'id',
        useOrgId: false,
        endpoint: (params) => productApi.index(params),
        buildQuery: (params) => params,
    });
