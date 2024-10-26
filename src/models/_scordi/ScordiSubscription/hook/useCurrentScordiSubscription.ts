import {useRecoilState} from 'recoil';
import {toast} from 'react-hot-toast';
import {yyyy_mm_dd} from '^utils/dateTime';
import {ScordiSubscriptionDto} from '../type';
import {scordiSubscriptionApi} from '../api';
import {currentScordiSubscriptionAtom, currentScordiSubscriptionIsLoadingAtom} from '../atom';

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
            .then(async (res) => {
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
        if (!orgId || isNaN(orgId)) return;

        setIsLoading(true);
        return scordiSubscriptionApi
            .create(orgId, planId)
            .then((res) => {
                const newSub = res.data;
                if (newSub.isActive) {
                    toast.success('플랜을 변경했어요');
                } else {
                    const startAt = yyyy_mm_dd(newSub.startAt!, '. ');
                    toast.success(`변경을 예약 했어요.\n다음 구독 주기부터 적용됩니다.\n적용예정: ${startAt}`);
                }
                return res;
            })
            .then(() => fetch(orgId, true));
    };

    return {
        isLoading,
        currentSubscription,
        fetch,
        reload,
        update,
    };
};
