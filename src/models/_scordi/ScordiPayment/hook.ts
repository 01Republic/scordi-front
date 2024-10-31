import {dPayPaymentsInPaymentListPageAtoms, scordiPaymentsInSettingPageAtoms} from '^models/_scordi/ScordiPayment/atom';
import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';
import {
    CreateScordiPaymentWithCustomerKeyRequestDto,
    FindAllScordiPaymentQueryDto,
    ScordiPaymentDto,
} from '^models/_scordi/ScordiPayment/type';
import {dPayScordiPaymentsApi, postDirectPayApi, scordiPaymentsApi} from '^models/_scordi/ScordiPayment/api';
import {useMutation, useQueryClient} from '@tanstack/react-query';

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

    const {mutate: postDirectPayMutate} = useMutation<void, Error, CreateScordiPaymentWithCustomerKeyRequestDto>({
        mutationFn: (data: CreateScordiPaymentWithCustomerKeyRequestDto) => postDirectPayApi(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['postDirectPay']});
        },
        // onError: () => {
        //     toast.error();
        // },
    });

    return postDirectPayMutate;
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
