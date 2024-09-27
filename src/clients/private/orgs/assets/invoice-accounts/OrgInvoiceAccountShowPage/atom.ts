import {atom, useRecoilState, useRecoilValue} from 'recoil';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {orgIdParamState} from '^atoms/common';
import {useEffect, useState} from 'react';

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
    //
    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (currentInvoiceAccount && !isEditMode) {
            // initialize form values
        }
    }, [isEditMode]);

    const onSubmit = async () => {
        if (!currentInvoiceAccount) return;
    };

    return {
        currentInvoiceAccount,
        onSubmit,
        //
        isEditMode,
        setIsEditMode,
        isLoading,
    };
};
