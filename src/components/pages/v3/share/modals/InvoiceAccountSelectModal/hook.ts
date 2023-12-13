import {useModal} from '^v3/share/modals';
import {getInvoiceAccountsQueryAtom, invoiceAccountSelectModalAtom, invoiceAccountsSearchResultAtom} from './atom';
import {useInvoiceAccountsV3} from '^models/InvoiceAccount/hook';

export const useInvoiceAccountSelectModal = () => {
    const {open, close, ...specs} = useModal(invoiceAccountSelectModalAtom);
    const {search, ...res} = useInvoiceAccountsV3(invoiceAccountsSearchResultAtom, getInvoiceAccountsQueryAtom);

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
