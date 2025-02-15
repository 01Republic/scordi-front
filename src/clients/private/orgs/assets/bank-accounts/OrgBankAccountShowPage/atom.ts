import {useEffect, useState} from 'react';
import {AxiosResponse} from 'axios';
import {toast} from 'react-hot-toast';
import {atom, useRecoilState} from 'recoil';
import {plainToInstance} from 'class-transformer';
import {useOrgIdParam} from '^atoms/common';
import {useAltForm} from '^hooks/useAltForm';
import {errorNotify} from '^utils/toast-notify';
import {bankAccountApi} from '^models/BankAccount/api';
import {BankAccountDto, UpdateBankAccountRequestDto} from '^models/BankAccount/type';

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
                number: currentBankAccount.displayNumber || '',
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
            toast.error('계좌 별칭을 입력해주세요');
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
