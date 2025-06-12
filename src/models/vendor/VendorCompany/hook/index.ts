import {useMutation, useQueryClient} from '@tanstack/react-query';
import {ErrorResponse} from '^models/User/types';
import {vendorCompanyApi} from '^models/vendor/VendorCompany/api';
import {SUBSCRIPTION_HOOK_KEY} from '^models/Subscription/hook/key';
import {CreateVendorCompanyRequestDto, VendorCompanyDto} from '^models/vendor/VendorCompany/type';

export * from './useVendorCompanyListInCreateSubscription';

// 파트너사 기업 정보 추가
export const useCreateVendorCompany = () => {
    const queryClient = useQueryClient();
    return useMutation<VendorCompanyDto, ErrorResponse, {orgId: number; dto: CreateVendorCompanyRequestDto}>({
        mutationFn: ({orgId, dto}) => vendorCompanyApi.upsert(orgId, dto).then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [SUBSCRIPTION_HOOK_KEY.base]});
            queryClient.invalidateQueries({queryKey: [SUBSCRIPTION_HOOK_KEY.list]});
            queryClient.invalidateQueries({queryKey: [SUBSCRIPTION_HOOK_KEY.detail]});
        },
    });
};
