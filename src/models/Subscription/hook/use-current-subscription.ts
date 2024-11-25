import {useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {subscriptionIdParamState} from '^atoms/common';
import {subscriptionApi} from '../api';
import {currentSubscriptionAtom, currentSubscriptionIsLoadingAtom} from '../atom';
import {errorToast} from '^api/api';

/**
 * 실험적인 상태. react-query 를 쿼리 백엔드로 사용하는 실험 진행 중.
 */
export const useCurrentSubscription = () => {
    const subscriptionId = useRecoilValue(subscriptionIdParamState);
    const [currentSubscription, setCurrentSubscription] = useRecoilState(currentSubscriptionAtom);
    const queryClient = useQueryClient();
    const {mutateAsync, isPending} = useMutation(
        {
            mutationFn: (id: number) => subscriptionApi.show(id),
            onSuccess: async (res, variables, context) => {
                await queryClient.invalidateQueries({
                    queryKey: ['page/subject', 'subscriptions', 'detail', subscriptionId],
                });
                setCurrentSubscription(res.data);
            },
            onError: errorToast,
        },
        queryClient,
    );

    useEffect(() => {
        if (!subscriptionId || isNaN(subscriptionId)) return;
        mutateAsync(subscriptionId);
    }, [subscriptionId]);

    return {
        currentSubscription,
        isLoading: isPending,
        findOne: (id: number) => mutateAsync(id),
        reload: () => mutateAsync(subscriptionId),
        clear: () => setCurrentSubscription(null),
    };
};
