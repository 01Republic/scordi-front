import {useRecoilState} from 'recoil';
import {scordiSubscriptionApi} from '../api';
import {
    scordiSubscriptionIsScheduledListLoadingAtom as scheduledIsLoadingAtom,
    scordiSubscriptionIsScheduledListQueryAtom as scheduledQueryAtom,
    scordiSubscriptionScheduledListAtom as scheduledListAtom,
} from '../atom';

export const useScheduledScordiSubscriptions = () => {
    const [isLoading, setIsLoading] = useRecoilState(scheduledIsLoadingAtom);
    const [query, setQuery] = useRecoilState(scheduledQueryAtom);
    const [result, setResult] = useRecoilState(scheduledListAtom);

    const fetch = async (orgId: number, force = false) => {
        if (!force && query === orgId) return;

        setIsLoading(true);
        setQuery((_query) => {
            if (!force && orgId === _query) return _query;

            new Promise((resolve, reject) => {
                scordiSubscriptionApi
                    .scheduledItems(orgId)
                    .then((res) => {
                        setResult(res.data);
                        resolve(res.data);
                    })
                    .catch(reject)
                    .finally(() => setIsLoading(false));
            });

            return orgId;
        });
    };

    // const fetch2 = async (orgId: number, force = false) => {
    //     // setQuery(orgId);
    //     // return scordiSubscriptionApi.scheduledItems(orgId).then((res) => {
    //     //     setResult(res.data);
    //     //     return res.data;
    //     // });
    // };

    const reload = (orgId?: number) => fetch(orgId || query, true);

    return {
        isLoading,
        scheduledSubscriptions: result,
        fetch,
        reload,
    };
};
