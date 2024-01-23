import {useModal} from '^v3/share/modals';
import {invoiceAccountSelectModalAtom} from './atom';
import {useInvoiceAccountListInSelectModal} from '^models/InvoiceAccount/hook';

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
