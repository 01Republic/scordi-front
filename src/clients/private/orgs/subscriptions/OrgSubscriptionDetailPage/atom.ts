import {atom, useRecoilState} from 'recoil';
import {subscriptionApi} from '^models/Subscription/api';
import {SubscriptionDto} from '^models/Subscription/types';

// 구독 상세 페이지에서 다루고 있는 주제 구독 데이터
export const subscriptionSubjectAtom = atom<SubscriptionDto | null>({
    key: 'OrgSubscriptionDetailPage/subscriptionSubjectAtom',
    default: null,
});

// 구독 상세 페이지에서 다루고 있는 주제 구독
export const useCurrentSubscription = () => {
    const [currentSubscription, setCurrentSubscription] = useRecoilState(subscriptionSubjectAtom);

    const findOne = async (id: number) => {
        return subscriptionApi
            .show(id, {
                relations: ['invoiceAccounts.googleTokenData'],
            })
            .then((res) => {
                setCurrentSubscription(res.data);
                return res.data;
            });
    };

    const reload = async () => {
        if (!currentSubscription) return;
        return findOne(currentSubscription.id);
    };

    return {
        currentSubscription,
        setCurrentSubscription,
        findOne,
        reload,
    };
};
