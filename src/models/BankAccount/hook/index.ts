import {PagedResourceAtoms, usePagedResource, usePaginateUtils} from '^hooks/usePagedResource';
import {BankAccountDto, FindAllBankAccountQueryDto} from '^models/BankAccount/type';
import {bankAccountApi} from '^models/BankAccount/api';
import {bankAccountListResultAtom} from '^models/BankAccount/atom';
import {CreditCardDto} from '^models/CreditCard/type';
import {creditCardApi} from '^models/CreditCard/api';
import {plainToast as toast} from '^hooks/useToast';
import {ApiError} from '^api/api';
import {BANK_ACCOUNT_HOOK_KEY} from '^models/BankAccount/hook/key';
import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {SUBSCRIPTION_HOOK_KEY} from '^models/Subscription/hook/key';
import {subscriptionApi} from '^models/Subscription/api';
import {Paginated} from '^types/utils/paginated.dto';

export const useBankAccounts = (
    atoms: PagedResourceAtoms<BankAccountDto, FindAllBankAccountQueryDto>,
    mergeMode = false,
) => {
    const pagedResource = usePagedResource(atoms, {
        useOrgId: true,
        endpoint: (params, orgId) => bankAccountApi.index(orgId, params),
        buildQuery: (params) => ({
            relations: ['holdingMember', 'creditCards'],
            ...params,
        }),
        getId: 'id',
        mergeMode,
    });

    const deleteBankAccount = async (bankAccount: BankAccountDto, orgId: number) => {
        let msg = '이 결제수단을 정말로 삭제할까요?';

        const arr: string[] = [];
        if (bankAccount.subscriptions?.length) {
            arr.push(`[${bankAccount.subscriptions?.length}개]의 구독`);
        }
        if (bankAccount.billingHistories?.length) {
            arr.push(`[${bankAccount.billingHistories?.length}개]의 결제내역`);
        }
        if (arr.length) {
            msg += `\n${arr.join('과 ')}을 담고있어요`;
        }

        if (!confirm(msg)) return;

        return bankAccountApi
            .destroy(orgId, bankAccount.id)
            .then((res) => {
                if (res) toast.success('삭제했습니다.');
                return res;
            })
            .catch((e: ApiError) => {
                const apiErrorObj = e.response?.data;
                if (apiErrorObj) toast.error(apiErrorObj.message);
            });
    };

    return {...pagedResource, deleteBankAccount};
};

export const useBankAccountListForListPage = () => useBankAccounts(bankAccountListResultAtom);

export const useBankAccounts2 = (orgId: number, params: FindAllBankAccountQueryDto, manual?: boolean) => {
    const [query, setQuery] = useState(params);
    const queryResult = useQuery({
        queryKey: [BANK_ACCOUNT_HOOK_KEY.base, orgId, query],
        queryFn: () => bankAccountApi.index(orgId, query).then((res) => res.data),
        initialData: Paginated.init(),
        enabled: manual ? false : !!orgId,
    });

    return usePaginateUtils({
        query,
        setQuery,
        queryResult,
    });
};
