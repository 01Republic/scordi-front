import {atom, useRecoilState, useRecoilValue} from 'recoil';
import {InvoiceAccountDto, UpdateInvoiceAccountDto} from '^models/InvoiceAccount/type';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {orgIdParamState} from '^atoms/common';
import {useEffect, useState} from 'react';
import {useAltForm} from '^hooks/useAltForm';
import {plainToInstance} from 'class-transformer';
import {AxiosResponse} from 'axios';
import {toast} from 'react-hot-toast';
import {errorNotify} from '^utils/toast-notify';
import {useSubscriptionListOfInvoiceAccount} from '^models/Subscription/hook';
import {useBillingHistoryListOfInvoiceAccount} from '^models/BillingHistory/hook';
import {useInvoiceAccountSync} from '^models/InvoiceAccount/hook';

export const invoiceAccountSubjectAtom = atom<InvoiceAccountDto | null>({
    key: 'OrgInvoiceAccountShowPage/invoiceAccountSubjectAtom',
    default: null,
});

export const useCurrentInvoiceAccount = () => {
    const [currentInvoiceAccount, setCurrentInvoiceAccount] = useRecoilState(invoiceAccountSubjectAtom);

    const findOne = async (orgId: number, id: number) => {
        return invoiceAccountApi.show(orgId, id).then((res) => {
            setCurrentInvoiceAccount(res.data);
            return res.data;
        });
    };

    const reload = async () => {
        if (!currentInvoiceAccount) return;
        return findOne(currentInvoiceAccount.organizationId, currentInvoiceAccount.id);
    };

    return {currentInvoiceAccount, setCurrentInvoiceAccount, findOne, reload};
};

export const useCurrentInvoiceAccountEdit = () => {
    const orgId = useRecoilValue(orgIdParamState);
    const {currentInvoiceAccount, setCurrentInvoiceAccount} = useCurrentInvoiceAccount();
    const {formData, setFormValue} = useAltForm(plainToInstance(UpdateInvoiceAccountDto, {}));
    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (currentInvoiceAccount && !isEditMode) {
            setFormValue({
                email: currentInvoiceAccount.email,
                memo: currentInvoiceAccount.memo,
                holdingMemberId: currentInvoiceAccount.holdingMemberId,
            });
        }
    }, [currentInvoiceAccount, isEditMode]);

    const handleResponse = (req: Promise<AxiosResponse<InvoiceAccountDto>>) => {
        req.then((res) => {
            toast.success('저장완료');
            setCurrentInvoiceAccount(res.data);
            setIsEditMode(false);
        })
            .catch(errorNotify)
            .finally(() => setLoading(false));
    };

    const onSubmit = async () => {
        if (!currentInvoiceAccount) return;

        setLoading(true);
        handleResponse(invoiceAccountApi.updateV3(orgId, currentInvoiceAccount.id, formData));
    };

    const patch = (data: UpdateInvoiceAccountDto) => {
        if (!currentInvoiceAccount) return;
        const id = currentInvoiceAccount.id;
        setLoading(true);
        handleResponse(invoiceAccountApi.updateV3(orgId, id, data));
    };

    return {
        currentInvoiceAccount,
        formData,
        setFormValue,
        onSubmit,
        patch,
        //
        isEditMode,
        setIsEditMode,
        isLoading,
    };
};

export const invoiceAccountIsValidTokenAtom = atom({
    key: 'OrgInvoiceAccountShowPage/invoiceAccountIsValidTokenAtom',
    default: true,
});

export const useCurrentInvoiceAccountCheckValidToken = () => {
    const checkIsValidToken = (invoiceAccount: InvoiceAccountDto) => {
        const {organizationId, id} = invoiceAccount;
        return invoiceAccountApi.isValidToken(organizationId, id).then((res) => res.data);
    };
    return {checkIsValidToken};
};

export const useCurrentInvoiceAccountSync = () => {
    const {currentInvoiceAccount, reload: reloadCurrentInvoiceAccount} = useCurrentInvoiceAccount();
    const {reload: reloadSubscriptions, isNotLoaded: subscriptionIsNotLoaded} = useSubscriptionListOfInvoiceAccount();
    const {reload: reloadBillingHistories, isNotLoaded: billingHistoryIsNotLoaded} =
        useBillingHistoryListOfInvoiceAccount();
    const {syncAccountWithConfirm, isSyncRunning} = useInvoiceAccountSync();

    const onFinish = () => {
        return Promise.allSettled([
            reloadCurrentInvoiceAccount(),
            !subscriptionIsNotLoaded && reloadSubscriptions(),
            !billingHistoryIsNotLoaded && reloadBillingHistories(),
        ]);
    };

    const startSync = async () => {
        if (!currentInvoiceAccount) return;
        const {organizationId} = currentInvoiceAccount;
        syncAccountWithConfirm(organizationId, currentInvoiceAccount).then(onFinish);
    };

    const renewSync = async () => {
        if (!currentInvoiceAccount) return;
        const {organizationId} = currentInvoiceAccount;
    };

    return {startSync, isSyncRunning, onFinish};
};
