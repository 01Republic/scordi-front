import {RecoilState, useRecoilState, useRecoilValue} from 'recoil';
import {FindAllInvoiceAccountQueryDto, InvoiceAccountDto} from '^models/InvoiceAccount/type';

import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {getInvoiceAccountsQueryAtom, invoiceAccountsSearchResultAtom} from '^models/InvoiceAccount/atom';
import {cachePagedQuery, makeAppendPagedItemFn, makeExceptPagedItemFn} from '^hooks/usePagedResource';
import {Paginated} from '^types/utils/paginated.dto';

export const useInvoiceAccounts = () => {
    return useInvoiceAccountsV3(invoiceAccountsSearchResultAtom, getInvoiceAccountsQueryAtom);
};

export const useInvoiceAccountsV3 = (
    resultAtom: RecoilState<Paginated<InvoiceAccountDto>>,
    queryAtom: RecoilState<FindAllInvoiceAccountQueryDto>,
    mergeMode = false,
) => {
    const defaultMergeMode = mergeMode;
    const orgId = useRecoilValue(orgIdParamState);
    const [result, setResult] = useRecoilState(resultAtom);
    const [query, setQuery] = useRecoilState(queryAtom);

    async function search(params: FindAllInvoiceAccountQueryDto, mergeMode = defaultMergeMode, force = false) {
        if (!orgId || isNaN(orgId)) return;
        const request = () => invoiceAccountApi.index(orgId, params);
        cachePagedQuery(setResult, setQuery, params, request, mergeMode, force);
    }

    const reload = () => search({...query}, false, true);
    const movePage = (page: number, append = false) => search({...query, page}, append);
    const resetPage = () => search({...query, page: 1}, false, true);
    const append = makeAppendPagedItemFn(setResult);
    const except = makeExceptPagedItemFn(setResult, (it, item) => it.id !== item.id);

    return {query, result, search, reload, movePage, resetPage, except};
};
