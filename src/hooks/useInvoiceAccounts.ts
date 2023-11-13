import {useRecoilState} from 'recoil';
import {FindAllInvoiceAccountQueryDto} from '^types/invoiceAccount.type';
import {getInvoiceAccountsQueryAtom, invoiceAccountsSearchResultAtom} from '^atoms/invoiceAccounts.atom';
import {invoiceAccountApi} from '^api/invoiceAccount.api';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';

export const useInvoiceAccounts = () => {
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const [result, setResult] = useRecoilState(invoiceAccountsSearchResultAtom);
    const [query, setQuery] = useRecoilState(getInvoiceAccountsQueryAtom);

    async function search(params: FindAllInvoiceAccountQueryDto) {
        if (!orgId) return;

        const data = await invoiceAccountApi.index(orgId, params).then((res) => res.data);
        setResult(data);
        setQuery(params);

        return data;
    }

    const movePage = (page: number) => search({...query, page});

    return {query, result, search, movePage};
};
