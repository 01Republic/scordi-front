import {useModal} from '^v3/share/modals';
import {invoiceAccountSelectModalAtom, invoiceAccountsInSelectModal} from './atom';
import {useInvoiceAccountsV3} from '^models/InvoiceAccount/hook';

export const useInvoiceAccountListInSelectModal = () => useInvoiceAccountsV3(invoiceAccountsInSelectModal);

export const useInvoiceAccountSelectModal = () => {
    const {open, close, ...specs} = useModal(invoiceAccountSelectModalAtom);
    const {search, ...res} = useInvoiceAccountListInSelectModal();

    const show = async (subscriptionId?: number) => {
        search({
            relations: ['subscriptions'],
            where: {
                // @ts-ignore
                subscriptions: {id: subscriptionId},
            },
            order: {id: 'DESC'},
        });
        open();
    };

    const hide = async () => {
        close();
    };

    return {...specs, show, hide, ...res, search};
};
