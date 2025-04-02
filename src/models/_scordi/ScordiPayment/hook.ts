import {dPayPaymentsInPaymentListPageAtoms, scordiPaymentsInSettingPageAtoms} from '^models/_scordi/ScordiPayment/atom';
import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';
import {
    CreateScordiPaymentWithCustomerKeyRequestDto,
    DPayFindAllScordiPaymentQueryDto,
    FindAllScordiPaymentQueryDto,
    ScordiPaymentDto,
} from '^models/_scordi/ScordiPayment/type';
import {dPayScordiPaymentsApi, scordiPaymentsApi} from '^models/_scordi/ScordiPayment/api';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';
import {Paginated} from '^types/utils/paginated.dto';
import {scordiPlanApi} from '^models/_scordi/ScordiPlan/api';

// 설정 - 결제관리 페이지 / 결제내역 섹션에서 사용
export const useScordiPaymentsInSettingPage = () => useScordiPayments(scordiPaymentsInSettingPageAtoms);

const useScordiPayments = (
    atoms: PagedResourceAtoms<ScordiPaymentDto, FindAllScordiPaymentQueryDto>,
    mergeMode = false,
) => {
    return usePagedResource(atoms, {
        useOrgId: true,
        endpoint: (params, orgId) => scordiPaymentsApi.index(orgId, params),
        getId: 'id',
        mergeMode,
    });
};

export const usePostDirectPay = () => {
    const queryClient = useQueryClient();

    const {mutateAsync: postDirectPayMutate, isPending} = useMutation({
        mutationFn: (data: CreateScordiPaymentWithCustomerKeyRequestDto) => {
            return dPayScordiPaymentsApi.createWithCustomerKey(data).then((res) => res.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['postDirectPay']});
        },
        // onError: () => {
        //     toast.error();
        // },
    });

    return {postDirectPayMutate, isPending};
};

// d-pay / 결제내역 페이지에서 사용
export const useDPayPaymentsInPaymentListPage = () => useDPayScordiPayments(dPayPaymentsInPaymentListPageAtoms);

const useDPayScordiPayments = (
    atoms: PagedResourceAtoms<ScordiPaymentDto, FindAllScordiPaymentQueryDto>,
    mergeMode = false,
) => {
    return usePagedResource(atoms, {
        useOrgId: false,
        endpoint: dPayScordiPaymentsApi.index,
        getId: 'id',
        mergeMode,
    });
};

// d-pay / 결제내역 페이지에서 사용 2
export const useDPayScordiPayments2 = (enabled: boolean, params?: DPayFindAllScordiPaymentQueryDto) => {
    const [query, setQuery] = useState(params);
    const queryResult = useQuery({
        queryKey: ['useDPayPaymentsInPaymentListPage', query],
        queryFn: () => dPayScordiPaymentsApi.index(query).then((res) => res.data),
        initialData: Paginated.init(),
        enabled,
    });

    return {
        ...queryResult,
        query,
        search: setQuery,
        reload: queryResult.refetch,
        clearCache: () => setQuery(params),
    };
};

export const useDPayPlan = (secretCode?: string) => {
    const [query, setQuery] = useState(secretCode);
    const queryResult = useQuery({
        queryKey: ['useDPayPlan', query],
        queryFn: () => {
            return scordiPlanApi
                .index({
                    where: {secretCode: query},
                    order: {id: 'DESC'},
                    itemsPerPage: 1,
                })
                .then((res) => res.data || [])
                .then((list) => list[0]);
        },
        initialData: undefined,
        enabled: !!query,
    });

    return {
        ...queryResult,
        search: setQuery,
        reload: queryResult.refetch,
        clearCache: () => setQuery(secretCode),
    };
};
