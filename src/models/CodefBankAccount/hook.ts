/* 코드에프 계좌 조회 */
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {CodefLoginType} from '^models/CodefAccount/type/enums';
import {FindAllBankAccountQueryDto} from '^models/CodefBankAccount/type/find-all.bank-account.query.dto';
import {Paginated} from '^types/utils/paginated.dto';
import {codefBankAccountApi} from '^models/CodefBankAccount/api';
import {ErrorResponse} from '^models/User/types';
import {codefAccountApi} from '^models/CodefAccount/api';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';

export const useCodefBankAccount = () => {
    const queryClient = useQueryClient();
    const params: FindAllBankAccountQueryDto = {
        sync: true,
        itemsPerPage: 0,
    };

    // codef 연결된 계좌 조회
    const useCodefBankAccountsInConnector = (orgId: number, params?: FindAllBankAccountQueryDto) => {
        return useQuery({
            queryKey: ['codefAccount', orgId, params],
            queryFn: () => codefBankAccountApi.index(orgId, params).then((res) => res.data),
            enabled: !!orgId && !isNaN(orgId),
            initialData: Paginated.init(),
        });
    };

    // 스코디 계좌 생성
    const {mutateAsync: createScordiBankAccount} = useMutation<
        CodefBankAccountDto,
        ErrorResponse,
        {orgId: number; accountId: number}
    >({
        mutationFn: ({orgId, accountId}) =>
            codefBankAccountApi.createBankAccount(orgId, accountId).then((res) => res.data),
        onSuccess: (_, {orgId}) => {
            queryClient.invalidateQueries({queryKey: ['codefAccount', orgId, params]});
        },
    });

    return {useCodefBankAccountsInConnector, createScordiBankAccount};
};
