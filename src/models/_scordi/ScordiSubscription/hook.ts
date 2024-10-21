import {useRecoilState} from 'recoil';
import {currentScordiSubscriptionAtom, currentScordiSubscriptionIsLoadingAtom} from './atom';
import {scordiSubscriptionApi} from '^models/_scordi/ScordiSubscription/api';
import {ScordiSubscriptionDto} from '^models/_scordi/ScordiSubscription/type';

export const useCurrentScordiSubscription = () => {
    const [isLoading, setIsLoading] = useRecoilState(currentScordiSubscriptionIsLoadingAtom);
    const [currentSubscription, setCurrentSubscription] = useRecoilState(currentScordiSubscriptionAtom);

    /**
     * 조직의 현재 구독정보 불러오기
     * - 조직 아이디에 대하여 반복요청 되지 않도록 로딩결과가 캐싱됨.
     * - 캐싱을 무시하고 강제로 로딩할 수 있는 옵션 제공
     */
    const fetch = async (orgId: number, force = false): Promise<ScordiSubscriptionDto | null> => {
        if (!force && currentSubscription && currentSubscription.organizationId === orgId) {
            return currentSubscription;
        }

        setIsLoading(true);
        return scordiSubscriptionApi
            .show(orgId)
            .then((res) => {
                setCurrentSubscription(res.data);
                return res.data;
            })
            .finally(() => setIsLoading(false));
    };

    /**
     * 조직의 현재 구독정보 새로고침
     */
    const reload = async () => {
        if (!currentSubscription) return null; // 로딩된 적 없으면, 새로고침 불가
        return fetch(currentSubscription.organizationId, true);
    };

    /**
     * 조직의 스코디 구독 등록 (신규 & 수정)
     */
    const update = async (orgId: number, planId: number) => {
        return scordiSubscriptionApi.create(orgId, planId).then(() => fetch(orgId, true));
    };

    return {
        isLoading,
        currentSubscription,
        fetch,
        reload,
        update,
    };
};
