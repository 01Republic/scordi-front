import {useEffect, useState} from 'react';
import {AxiosResponse} from 'axios';
import {toast} from 'react-hot-toast';
import {atom, useRecoilState} from 'recoil';
import {plainToInstance} from 'class-transformer';
import {useIdParam, useOrgIdParam} from '^atoms/common';
import {useAltForm} from '^hooks/useAltForm';
import {errorNotify} from '^utils/toast-notify';
import {bankAccountApi} from '^models/BankAccount/api';
import {BankAccountDto, UpdateBankAccountRequestDto} from '^models/BankAccount/type';
import {useQuery} from '@tanstack/react-query';
import {codefBankAccountApi} from '^models/CodefBankAccount/api';
import {Paginated} from '^types/utils/paginated.dto';
import {pick} from '^types/utils/one-of-list.type';

export const bankAccountSubjectAtom = atom<BankAccountDto | null>({
    key: 'OrgBankAccountShowPage/bankAccountSubjectAtom',
    default: null,
});

export const useCurrentBankAccount = () => {
    const [currentBankAccount, setCurrentBankAccount] = useRecoilState(bankAccountSubjectAtom);

    const findOne = async (orgId: number, id: number) => {
        return bankAccountApi.show(orgId, id).then((res) => {
            setCurrentBankAccount(res.data);
            return res.data;
        });
    };

    const reload = async () => {
        if (!currentBankAccount) return;
        return findOne(currentBankAccount.organizationId, currentBankAccount.id);
    };

    return {currentBankAccount, setCurrentBankAccount, findOne, reload};
};

export const useCurrentCodefBankAccount = () => {
    const orgId = useOrgIdParam();
    const bankAccountId = useIdParam('bankAccountId');
    const queryResult = useQuery({
        queryKey: ['useCurrentCodefBankAccount', orgId, bankAccountId],
        queryFn: () =>
            codefBankAccountApi
                .index(orgId, {
                    where: {bankAccountId},
                    order: {id: 'DESC'},
                })
                .then((res) => res.data),
        initialData: Paginated.init(),
        enabled: !!orgId && !!bankAccountId,
    });

    const currentCodefBankAccount = pick(queryResult.data.items[0]);

    const isApiConnected = !!currentCodefBankAccount;
    const isManuallyCreated = !isApiConnected;

    return {isManuallyCreated, ...queryResult, currentCodefBankAccount};
};

export const useCurrentBankAccountEdit = () => {
    const orgId = useOrgIdParam();
    const {currentBankAccount, setCurrentBankAccount} = useCurrentBankAccount();
    const {formData, setFormValue} = useAltForm(plainToInstance(UpdateBankAccountRequestDto, {}));
    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (currentBankAccount && !isEditMode) {
            setFormValue({
                name: currentBankAccount.name,
                isPersonal: currentBankAccount.isPersonal,
                usingStatus: currentBankAccount.usingStatus,
                memo: currentBankAccount.memo || '',
                number: currentBankAccount.number || '',
            });
        }
    }, [currentBankAccount, isEditMode]);

    const handleResponse = (req: Promise<AxiosResponse<BankAccountDto, any>>) => {
        req.then((res) => {
            toast.success('변경사항을 저장했어요.');
            setCurrentBankAccount(res.data);
            setIsEditMode(false);
        })
            .catch(errorNotify)
            .finally(() => setLoading(false));
    };

    const onSubmit = async () => {
        if (!currentBankAccount) return;

        const data = plainToInstance(UpdateBankAccountRequestDto, formData);

        if (!data.name) {
            toast.error('계좌 이름을 입력해주세요');
            return;
        }

        setLoading(true);
        handleResponse(bankAccountApi.update(orgId, currentBankAccount.id, data));
    };

    const patch = (data: UpdateBankAccountRequestDto) => {
        if (!currentBankAccount) return;
        const id = currentBankAccount.id;
        setLoading(true);
        handleResponse(bankAccountApi.update(orgId, id, data));
    };

    return {
        currentBankAccount,
        formData,
        setFormValue,
        onSubmit,
        patch,
        isEditMode,
        setIsEditMode,
        isLoading,
    };
};
