import {atom, useRecoilState} from 'recoil';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';

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
