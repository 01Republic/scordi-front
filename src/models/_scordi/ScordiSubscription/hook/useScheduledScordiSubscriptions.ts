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

    // const fetch = async (orgId: number, force = false) => {
    //     if (!force && query === orgId) return;
    //
    //     setIsLoading((_isLoading) => {
    //         if (_isLoading) return true;
    //
    //         scordiSubscriptionApi
    //             .scheduledItems(orgId)
    //             .then((res) => {
    //                 setQuery(orgId);
    //                 setResult(res.data);
    //             })
    //             .finally(() => setIsLoading(false));
    //
    //         return true;
    //     });
    // };

    const fetch2 = async (orgId: number, force = false) => {
        // setQuery(orgId);
        // return scordiSubscriptionApi.scheduledItems(orgId).then((res) => {
        //     setResult(res.data);
        //     return res.data;
        // });
    };

    const reload = (orgId?: number) => fetch2(orgId || query, true);

    return {
        isLoading,
        result,
        fetch: fetch2,
        reload,
    };
};
