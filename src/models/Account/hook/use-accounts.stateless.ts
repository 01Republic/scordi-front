import {atom, useRecoilState, useRecoilValue} from 'recoil';
import {AxiosResponse} from 'axios';
import {orgIdParamState} from '^atoms/common';
import {accountApi} from '^models/Account/api';
import {AccountDto, FindAllAccountsQueryDto} from '^models/Account/types';
import {Paginated} from '^types/utils/paginated.dto';

const statelessQueryAtom = atom<FindAllAccountsQueryDto>({
    key: 'accounts/stateless/query',
    default: {},
});

// 실험했으나 실패함.
export const useAccountsStateless = () => {
    const orgId = useRecoilValue(orgIdParamState);
    const [query, setQuery] = useRecoilState(statelessQueryAtom);

    function search(
        params: FindAllAccountsQueryDto,
        force = false,
    ): Promise<AxiosResponse<Paginated<AccountDto>> | void> {
        return new Promise((resolve, reject) => {
            if (!force && JSON.stringify(query) === JSON.stringify(params)) {
                resolve();
                return;
            }

            setQuery((oldQuery) => {
                if (!force && JSON.stringify(oldQuery) === JSON.stringify(params)) return oldQuery;

                accountApi.index(orgId, params).then((res) => {
                    resolve(res);
                });

                return params;
            });
        });
    }

    const reload = () => search(query, true);

    const movePage = (page: number) => search({...query, page});
    const resetPage = () => movePage(1);

    return {query, search, reload, movePage, resetPage};
};
