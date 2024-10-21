import {useRecoilState} from 'recoil';
import {currentScordiSubscriptionAtom, currentScordiSubscriptionIsLoadingAtom} from './atom';
import {scordiSubscriptionApi} from '^models/_scordi/ScordiSubscription/api';

export const useCurrentScordiSubscription = () => {
    const [isLoading, setIsLoading] = useRecoilState(currentScordiSubscriptionIsLoadingAtom);
    const [currentSubscription, setCurrentSubscription] = useRecoilState(currentScordiSubscriptionAtom);

    /**
     * 조직의 현재 구독정보 불러오기
     * - 조직 아이디에 대하여 반복요청 되지 않도록 로딩결과가 캐싱됨.
     * - 캐싱을 무시하고 강제로 로딩할 수 있는 옵션 제공
     */
    const fetch = (organizationId: number, force = false) => {
        if (!force && currentSubscription && currentSubscription.organizationId === organizationId) return;

        setIsLoading(true);
        scordiSubscriptionApi
            .show(organizationId)
            .then((res) => setCurrentSubscription(res.data))
            .finally(() => setIsLoading(false));
    };

    /**
     * 조직의 현재 구독정보 새로고침
     */
    const reload = () => {
        if (!currentSubscription) return; // 로딩된 적 없으면, 새로고침 불가
        fetch(currentSubscription.organizationId, true);
    };

    return {
        isLoading,
        currentSubscription,
        fetch,
        reload,
    };
};
