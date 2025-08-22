import {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {ErrorResponse} from '^models/User/types';
import {Paginated} from '^types/utils/paginated.dto';
import {subscriptionApi} from '^models/Subscription/api';
import {
    CreateSubscriptionSeatRequestDto,
    FindAllSubscriptionSeatQueryDto,
    SubscriptionSeatDto,
    UpdateSubscriptionSeatRequestDto,
} from '^models/SubscriptionSeat/type';
import {TEAM_MEMBER_HOOK_KEY} from '^models/TeamMember/hook/key';
import {SUBSCRIPTION_SEAT_HOOK_KEY} from '^models/SubscriptionSeat/hook/key';
import Qs from 'qs';

//구독에 시트 불러오기
export const useSubscriptionSeat = (orgId: number, subscriptionId: number) => {
    const [query, setQuery] = useState<FindAllSubscriptionSeatQueryDto>({
        relations: ['teamMember', 'teamMember.teams'],
    });

    const [sortVal, setSortVal] = useState<'ASC' | 'DESC'>('DESC');

    const {data, isLoading, isFetched, refetch} = useQuery({
        queryKey: [SUBSCRIPTION_SEAT_HOOK_KEY.base, orgId, subscriptionId, query],
        queryFn: () => subscriptionApi.seatsApi.index(orgId, subscriptionId, query).then((res) => res.data),
        initialData: Paginated.init() as Paginated<SubscriptionSeatDto>,
        enabled: !!orgId && !isNaN(orgId) && !!subscriptionId && !isNaN(subscriptionId),
    });

    const orderBy = (sortKey: string) => {
        setSortVal((prev) => {
            const next: 'ASC' | 'DESC' = prev === 'ASC' ? 'DESC' : 'ASC';
            setQuery((prevQ) => ({
                ...prevQ,
                page: 1,
                order: Qs.parse(`${sortKey}=${next}`),
            }));
            return next;
        });
    };

    return {query, setQuery, data, isLoading, isFetched, refetch, sortVal, orderBy};
};

// 구독에 시트 생성
export const useCreateSubscriptionSeat = (orgId: number, subscriptionId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (dto: CreateSubscriptionSeatRequestDto) =>
            subscriptionApi.seatsApi.create(orgId, subscriptionId, dto).then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [SUBSCRIPTION_SEAT_HOOK_KEY.base], exact: false});
            queryClient.invalidateQueries({queryKey: [SUBSCRIPTION_SEAT_HOOK_KEY.counter], exact: false});
            queryClient.invalidateQueries({queryKey: [TEAM_MEMBER_HOOK_KEY.base], exact: false});
        },
    });
};

// 구독에 시트 업데이트
export const useUpdateSubscriptionSeat = () => {
    const queryClient = useQueryClient();
    return useMutation<
        SubscriptionSeatDto,
        ErrorResponse,
        {orgId: number; subscriptionId: number; id: number; dto: UpdateSubscriptionSeatRequestDto}
    >({
        mutationFn: ({orgId, subscriptionId, id, dto}) =>
            subscriptionApi.seatsApi.update(orgId, subscriptionId, id, dto).then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [SUBSCRIPTION_SEAT_HOOK_KEY.base], exact: false});
            queryClient.invalidateQueries({queryKey: [SUBSCRIPTION_SEAT_HOOK_KEY.counter], exact: false});
            queryClient.invalidateQueries({queryKey: [TEAM_MEMBER_HOOK_KEY.base], exact: false});
        },
    });
};

// 구독에 시트 제거
export const useDestroyAllSubscriptionSeat = (orgId: number, subscriptionId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (ids: number[]) =>
            subscriptionApi.seatsApi.destroyAll(orgId, subscriptionId, ids).then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [SUBSCRIPTION_SEAT_HOOK_KEY.base], exact: false});
            queryClient.invalidateQueries({queryKey: [SUBSCRIPTION_SEAT_HOOK_KEY.counter], exact: false});
            queryClient.invalidateQueries({queryKey: [TEAM_MEMBER_HOOK_KEY.base], exact: false});
        },
    });
};
