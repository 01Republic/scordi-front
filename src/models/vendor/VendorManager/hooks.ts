import {useMutation, useQueryClient} from '@tanstack/react-query';
import {vendorManagerApi} from '^models/vendor/VendorManager/api';
import {SUBSCRIPTION_HOOK_KEY} from '^models/Subscription/hook/key';
import {UpsertVendorManagerRequestDto} from '^models/vendor/VendorManager/type';

// 연결된 매니저 변경
export const useUpdateVendorManager = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({orgId, vendorMangerId}: {orgId: number; vendorMangerId: number}) =>
            vendorManagerApi.update(orgId, vendorMangerId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [SUBSCRIPTION_HOOK_KEY.base]});
            queryClient.invalidateQueries({queryKey: [SUBSCRIPTION_HOOK_KEY.list]});
            queryClient.invalidateQueries({queryKey: [SUBSCRIPTION_HOOK_KEY.detail]});
        },
    });
};

// 매니저 이메일,전화번호 업데이트
export const useUpsertVendorManager = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({orgId, dto}: {orgId: number; dto: UpsertVendorManagerRequestDto}) =>
            vendorManagerApi.upsert(orgId, dto),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [SUBSCRIPTION_HOOK_KEY.base]});
            queryClient.invalidateQueries({queryKey: [SUBSCRIPTION_HOOK_KEY.list]});
            queryClient.invalidateQueries({queryKey: [SUBSCRIPTION_HOOK_KEY.detail]});
        },
    });
};
