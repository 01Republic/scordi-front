import {atom, useRecoilState} from 'recoil';
import {AxiosResponse} from 'axios';
import {accountApi} from '^models/Account/api';
import {AccountDto, FindAllAccountsQueryDto} from '^models/Account/types';
import {Paginated} from '^types/utils/paginated.dto';
import {FindAllSubscriptionsQuery, SubscriptionDto} from '^models/Subscription/types';
import {subscriptionApi} from '^models/Subscription/api';

const statelessQueryAtom = atom<FindAllSubscriptionsQuery>({
    key: 'subscriptions/stateless/query',
    default: {},
});

// 실험했으나 실패함.
export const useSubscriptionsStateless = () => {
    // const orgId = useRecoilValue(orgIdParamState);
    const [query, setQuery] = useRecoilState(statelessQueryAtom);

    function search(
        params: FindAllSubscriptionsQuery,
        force = false,
    ): Promise<AxiosResponse<Paginated<SubscriptionDto>> | void> {
        return new Promise((resolve, reject) => {
            if (!force && JSON.stringify(query) === JSON.stringify(params)) {
                resolve();
                return;
            }

            setQuery((oldQuery) => {
                if (!force && JSON.stringify(oldQuery) === JSON.stringify(params)) return oldQuery;

                subscriptionApi.index(params).then((res) => {
                    console.log('res', res.data);
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
