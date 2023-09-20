import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useRecoilState} from 'recoil';
import {getAccountsQueryAtom, accountsSearchResultAtom} from '^atoms/accounts.atom';
import {FindAllAccountsQueryDto} from '^types/account.type';
import {accountApi} from '^api/account.api';

export const useAccounts = () => {
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const [result, setResult] = useRecoilState(accountsSearchResultAtom);
    const [query, setQuery] = useRecoilState(getAccountsQueryAtom);

    async function search(params: FindAllAccountsQueryDto) {
        if (JSON.stringify(query) === JSON.stringify(params)) return;

        const data = await accountApi.index(orgId, params).then((res) => res.data);
        setResult(data);
        setQuery(params);
    }

    const movePage = (page: number) => search({...query, page});

    return {query, result, search, movePage};
};
